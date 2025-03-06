from django.contrib import admin

from .models import Evento, Boleto, Localidad, Producto

admin.site.register(Evento)
admin.site.register(Boleto) 
admin.site.register(Localidad)