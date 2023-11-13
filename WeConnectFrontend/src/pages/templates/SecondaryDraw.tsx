import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import useAxiosWIthInterceptor from "../../helpers/jwt_interceptor";
import { ReactNode } from "react";

type SecondaryDrawProp = {
    children: React.ReactNode,
}

const SecondaryDraw = ({ children }: SecondaryDrawProp) => {
    const theme = useTheme();
    // const jwtAxios = useAxiosWIthInterceptor();
    
    // jwtAxios.get("http://127.0.0.1:8000/api/server/select/?category=category_1")
    // .then(response => {
    //     console.log(response.data);
    // })
    // .catch(error => {
    //     console.error(error);
    // });
    return (
        <Box sx={{ 
            mt: `${theme.primaryAppBar.height}px`,
            minWidth: `${theme.secondaryDraw.width}px`,
            height: `calc(100vh - ${theme.primaryAppBar.height}px)`,
            borderRight: `1px solid ${theme.palette.divider}`,
            display: { xs: "none", sm: "block"},
            overflowY: "auto",
             }}>
            {children}
        </Box>
    );
}

export default SecondaryDraw;