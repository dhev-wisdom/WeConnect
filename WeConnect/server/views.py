from django.db.models import Count
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from rest_framework.response import Response
from .models import Server
from .schema import server_list_docs
from .serializer import ServerSerializer


class ServerListViewSet(viewsets.ViewSet):
    """
    Querying all the Servers from the database
    """

    queryset = Server.objects.all()

    @server_list_docs
    def list(self, request):
        """
        Returns a list of servers filtered by various parameters.

        The following query parameters are supported:

        - 'category': filters servers by category name.
        - 'qty': limits the number of servers returned
        - 'by_user': filters servers by user ID,
                     only returning servers that the user ID is a member of.
        - 'by_server_id': filters servers by server ID.
        - 'with_num_members': Annotates each server with number of members it has.

        Args:
            request: A Django Request object containing query parameters.

        Returns:
            A queryset of servers filtered by the specified parameters.

        Raises:
            AuthenticationFailed: If the query includes the 'by_user' or
            'by_server_id' parameters and the user is not authenticated.

            ValidationError: If there is an error parsing or validating the
            query parameters.

        Example:
        GET /api/server/select/?category=gaming&with_num_members=true&qty=10

        """
        # Extracting query parameters from the request
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_server_id = request.query_params.get("by_server_id")
        with_num_members = request.query_params.get("with_num_members") == "true"

        if with_num_members:
            """
            If with_num_members query parameter is given,
            then annotate queryset with num_members field
            """
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        if category:
            """
            if category query parameter is given, then filter queryset by category name
            """
            self.queryset = self.queryset.filter(category__name=category)

        if by_user:
            """
            if by_user query parameter is given, then filter queryset by member id
            """
            if by_user and request.user.is_authenticated:
                user_id = request.user.id
                self.queryset = self.queryset.filter(member=user_id)
            else:
                raise AuthenticationFailed()

        if by_server_id:
            """
            if server_id query parameter is given, then filter queryset by server id
            """
            if request.user.is_authenticated:
                try:
                    self.queryset = self.queryset.filter(id=by_server_id)
                    if not self.queryset.exists():
                        raise ValidationError(detail=f"Server with id {by_server_id} not found")
                except ValueError:
                    raise ValidationError(detail=f"id {by_server_id} not found. Server id must be a postitive integer")
            else:
                raise AuthenticationFailed()
        if qty:
            """
            if qty query parameter is given, then slice the queryset based on qty value
            """
            self.queryset = self.queryset[:int(qty)]

        # Serializing queryset and returning response with serialized data
        serializer = ServerSerializer(self.queryset, many=True, context={"num_members": with_num_members})
        return Response(serializer.data)
