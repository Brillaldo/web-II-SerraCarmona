from django.shortcuts import render
from django.http import HttpResponse
from .models import Boleto, Evento

def index(request):
    return HttpResponse("Hola, mundo. Esta es la página de inicio de la aplicación examen.")

def boletos(request):
    boletos = Boleto.objects.all()  # Recupera todos los boletos desde la base de datos
    for i, boleto in enumerate(boletos, start=1):
        boleto.name = f"Boleto {i}"  # Asigna nombres secuenciales a cada boleto
    data = {
        "boletos": boletos,
        "titulo": "Lista de Boletos",
        "total_boletos": boletos.count(),
        "total_eventos": 10,  # Ejemplo de dato adicional
        "eventos": [
            {
                "id": 1, "name": "Evento 1", "image": 'images/boletos.jpg'
            },
            {
                "id": 2, "name": "Evento 2", "image": "https://example.com/evento2.jpg"
            },
            {
                "id": 3, "name": "Evento 3", "image": "https://example.com/evento3.jpg"
            },
            {
                "id": 4, "name": "Evento 4", "image": "https://example.com/evento4.jpg"
            },
            {
                "id": 5, "name": "Evento 5", "image": "https://example.com/evento5.jpg"
            },
            {
                "id": 6, "name": "Evento 6", "image": "https://example.com/evento6.jpg"
            },
            {
                "id": 7, "name": "Evento 7", "image": "https://example.com/evento7.jpg"
            },
            {
                "id": 8, "name": "Evento 8", "image": "https://example.com/evento8.jpg"
            },
            {
                "id": 9, "name": "Evento 9", "image": "https://example.com/evento9.jpg"
            },
            {
                "id": 10, "name": "Evento 10", "image": "https://example.com/evento10.jpg"
            }
        ]
    }
    return render(request, 'boletos/boletos.html', data)

def eventos(request):
    eventos = Evento.objects.all()  # Recupera todos los eventos desde la base de datos
    data = {
        "eventos": eventos,
        "titulo": "Lista de Eventos",
        "total_eventos": eventos.count(),
    }
    return render(request, 'eventos/eventos.html', data)
