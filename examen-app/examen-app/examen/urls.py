from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('boletos/', views.boletos, name='boletos'),
    path('eventos/', views.eventos, name='eventos'),  # Nueva ruta para eventos
]
