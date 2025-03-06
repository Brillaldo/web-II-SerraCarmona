from django import forms
from django.core.exceptions import ValidationError
from .models import Evento, Producto
from datetime import datetime

class DateInput(forms.DateInput):
    input_type = 'date'

class EventoForm(forms.ModelForm):
    class Meta:
        model = Evento
        fields = ['name', 'fecha_inicio', 'fecha_fin', 'localidad']
        widgets = {
            'fecha_inicio': DateInput(),
            'fecha_fin': DateInput(),
        }

    def clean(self):
        cleaned_data = super().clean()
        fecha_inicio = cleaned_data.get('fecha_inicio')
        fecha_fin = cleaned_data.get('fecha_fin')
        localidad = cleaned_data.get('localidad')

        if not fecha_inicio or not fecha_fin or not localidad:
            raise ValidationError("Ningún campo debe quedar vacío.")

        if fecha_fin < fecha_inicio:
            raise ValidationError("La fecha de fin no puede ser anterior a la fecha de inicio.")

        if fecha_inicio.date() <= datetime.now().date():
            raise ValidationError("La fecha de inicio debe ser posterior al día de hoy.")

        # Verificar eventos consecutivos en la misma localidad
        ultimo_evento = Evento.objects.filter(localidad=localidad).order_by('-fecha_fin').first()
        if ultimo_evento and ultimo_evento.fecha_fin >= fecha_inicio:
            raise ValidationError("No puedes agregar dos eventos consecutivos en la misma localidad.")

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['name', 'precio', 'localidad']
