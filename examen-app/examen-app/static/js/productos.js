document.getElementById('producto-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = document.querySelector("#producto-form");
    const formData = new FormData(form);
    const data = {};
    const token = document.querySelector("[name=csrfmiddlewaretoken]").value;
    formData.forEach((value, key) => {
        data[key] = value;
    });
    fetch(form.action, {
        method: 'POST',
        headers: {
            "X-CSRFToken": token,
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Producto agregado exitosamente') {
            const newRow = document.createElement('tr');
            newRow.id = `producto-${data.id}`;
            newRow.innerHTML = `
                <td>${data.name}</td>
                <td>${data.precio}</td>
                <td>${data.localidad}</td>
                <td><button class="btn-eliminar" onclick="eliminarProducto(${data.id})">Eliminar</button></td>
            `;
            document.getElementById('productos-list').appendChild(newRow);
            form.reset();
        } else {
            alert('Error al agregar el producto');
        }
    })
    .catch(error => console.error('Error:', error));
});

function eliminarProducto(productoId) {
    fetch(`/examen/productos/eliminar/${productoId}/`, {
        method: 'DELETE',
        headers: {
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Producto eliminado exitosamente') {
            document.getElementById(`producto-${productoId}`).remove();
        } else {
            alert('Error al eliminar el producto');
        }
    })
    .catch(error => console.error('Error:', error));
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
