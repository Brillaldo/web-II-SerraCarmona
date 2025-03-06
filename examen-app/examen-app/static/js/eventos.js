document.getElementById('evento-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form); // Enviar como FormData

    fetch(form.action, {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData // Se envía directamente sin JSON.stringify
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Evento agregado exitosamente') {
            const newRow = document.createElement('tr');
            newRow.id = `evento-${data.id}`;
            newRow.innerHTML = `
                <td>${data.name}</td>
                <td>${data.fecha_inicio}</td>
                <td>${data.fecha_fin}</td>
                <td>${data.localidad}</td>
                <td><button class="btn-eliminar" onclick="eliminarEvento(${data.id})">Eliminar</button></td>
            `;
            document.getElementById('eventos-list').prepend(newRow);
            form.reset();
            alert('Evento agregado exitosamente');
        } else {
            alert('Error al agregar el evento: ' + JSON.stringify(data.errors));
        }
    })
    .catch(error => console.error('Error:', error));
});

function eliminarEvento(eventoId) {
    if (!confirm("¿Estás seguro de que deseas eliminar este evento?")) {
        return;
    }

    fetch(`/examen/eventos/eliminar/${eventoId}/`, {
        method: 'POST',  // Cambiamos DELETE a POST
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),  // CSRF obligatorio
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Se envía un cuerpo vacío, pero es necesario en POST
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data); // Depuración
        if (data.message === 'Evento eliminado exitosamente') {
            document.getElementById(`evento-${eventoId}`).remove();
            alert('Evento eliminado exitosamente');
        } else {
            alert('Error al eliminar el evento: ' + data.message);
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
