from django import template
from django.templatetags.static import static

register = template.Library()

@register.filter
def image_url(image):
    if image.startswith('http'):
        return image
    return static(image)
