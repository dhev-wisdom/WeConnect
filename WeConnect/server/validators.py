from PIL import Image
from django.core.exceptions import ValidationError
import os

def validate_icon_image_size(image):
    try:
        if image:
            with Image.open(image) as img:
                if img.width > 70 or img.height > 70:
                    raise ValidationError(
                        f"The allowed maximum image dimension is 70x70; Size of the image you uploaded is {img.size}"
                    )
    except Exception as err:
        raise ValidationError(err)
            
def validate_image_file_extension(value):
    try:
        ext = os.path.splitext(value.name)[1]
        valid_extensions = [".jpeg", ".jpg", ".png", ".gif", ".svg"]
        if not ext.lower in valid_extensions:
            raise ValidationError("Unsupported file extension")
    except Exception as err:
        raise ValidationError(err)