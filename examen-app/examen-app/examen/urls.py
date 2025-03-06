from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('boletos/', views.boletos, name='boletos'),
    path('boletos/<int:evento_id>/', views.boletos, name='boletos_por_evento'),  # Nueva ruta para boletos por evento
    path('eventos/', views.eventos, name='eventos'),
    path('eventos/agregar/', views.agregar_evento, name='agregar_evento'),  # Nueva ruta para agregar evento
    path('eventos/eliminar/<int:evento_id>/', views.eliminar_evento, name='eliminar_evento'),  # Nueva ruta para eliminar evento
    path('productos/', views.productos, name='productos'),  # Nueva ruta para listar productos
    path('productos/agregar/', views.agregar_producto, name='agregar_producto'),  # Nueva ruta para agregar producto
    path('productos/eliminar/<int:producto_id>/', views.eliminar_producto, name='eliminar_producto'),  # Nueva ruta para eliminar producto
]
