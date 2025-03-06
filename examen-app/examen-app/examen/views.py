from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from .models import Boleto, Evento, Producto
from .forms import EventoForm, ProductoForm

def index(request):
    return HttpResponse("Hola, mundo. Esta es la página de inicio de la aplicación examen.")

def boletos(request, evento_id=None):
    if evento_id:
        boletos = Boleto.objects.filter(evento_id=evento_id)  # Filtra los boletos por evento
        evento = Evento.objects.get(id=evento_id)
    else:
        boletos = Boleto.objects.all()  # Recupera todos los boletos
        evento = None

    for i, boleto in enumerate(boletos, start=1):
        boleto.name = f"Boleto {i}"  # Asigna nombres secuenciales a cada boleto

    data = {
        "boletos": boletos,
        "titulo": f"Boletos para {evento.name}" if evento else "Lista de Boletos",
        "total_boletos": boletos.count(),
        "evento": evento,
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

def agregar_evento(request):
    if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        form = EventoForm(request.POST)
        if form.is_valid():
            evento = form.save()
            return JsonResponse({
                'message': 'Evento agregado exitosamente',
                'id': evento.id,
                'name': evento.name,
                'fecha_inicio': evento.fecha_inicio.strftime('%Y-%m-%d'),
                'fecha_fin': evento.fecha_fin.strftime('%Y-%m-%d'),
                'localidad': evento.localidad.name
            }, status=200)
        else:
            return JsonResponse({'message': 'Error al agregar el evento', 'errors': form.errors}, status=400)
    else:
        form = EventoForm()
        eventos = Evento.objects.all().order_by('-id')[:5]  # Últimos 5 eventos
        return render(request, 'eventos/agregar_evento.html', {'form': form, 'eventos': eventos})

def eliminar_evento(request, evento_id):
    if request.method == 'POST':  # Cambiamos de DELETE a POST
        try:
            evento = get_object_or_404(Evento, id=evento_id)
            evento.delete()
            return JsonResponse({'message': 'Evento eliminado exitosamente'}, status=200)
        except Exception as e:
            return JsonResponse({'message': 'Error al eliminar el evento', 'error': str(e)}, status=400)
    return JsonResponse({'message': 'Método no permitido'}, status=405)

def agregar_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            producto = form.save()
            return JsonResponse({
                'message': 'Producto agregado exitosamente',
                'id': producto.id,
                'name': producto.name,
                'precio': producto.precio,
                'localidad': producto.localidad.name
            }, status=200)
        else:
            return JsonResponse({'message': 'Error al agregar el producto', 'errors': form.errors}, status=400)
    else:
        form = ProductoForm()
        productos = Producto.objects.all().order_by('-id')[:5]  # Muestra los últimos 5 productos
    return render(request, 'productos/agregar_producto.html', {'form': form, 'productos': productos})

def eliminar_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    producto.delete()
    return JsonResponse({'message': 'Producto eliminado exitosamente'}, status=200)

def productos(request):
    productos = Producto.objects.all()  # Recupera todos los productos desde la base de datos
    data = {
        "productos": productos,
        "titulo": "Lista de Productos",
        "total_productos": productos.count(),
    }
    return render(request, 'productos/productos.html', data)
