window.addEventListener('load', async function() {
    await starshipList();
})

async function starshipList() {

    fetch('/listShips')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la respuesta del servidor');
        })

        .then(data => {
            const starshipContainer = document.getElementById('cardStarships') || '';

            data.forEach(starship => {

                const card = document.createElement('div');
                card.classList.add('col');
                card.classList.add('mb-5');

                const cardSh = document.createElement('div');
                cardSh.classList.add('card');
                cardSh.classList.add('h-100');
                card.appendChild(cardSh);

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.classList.add('p-4');
                cardSh.appendChild(cardBody);

                const name = document.createElement('h5');
                name.textContent = `Name: ${starship.name}`;
                name.classList.add('fw-bolder');
                cardBody.appendChild(name);

                const passengers = document.createElement('p');
                passengers.textContent = `Passengers: ${starship.passengers}`;
                passengers.classList.add('text-card');
                cardBody.appendChild(passengers);

                const maxSpeed = document.createElement('p');
                maxSpeed.textContent = `Max Speed: ${starship.max_atmosphering_speed}`;
                maxSpeed.classList.add('text-card');
                cardBody.appendChild(maxSpeed);

                const consumables = document.createElement('p');
                consumables.textContent = `Consumables: ${starship.consumables}`;
                consumables.classList.add('text-card');
                cardBody.appendChild(consumables);

                const cardFooter = document.createElement('div');
                cardFooter.classList.add('card-footer');
                cardFooter.classList.add('p-4');
                cardFooter.classList.add('pt-0');
                cardFooter.classList.add('border-top-0');
                cardFooter.classList.add('bg-transparent');
                cardSh.appendChild(cardFooter);

                const cardFooterdiv = document.createElement('div');
                cardFooterdiv.classList.add('text-center');
                cardFooter.appendChild(cardFooterdiv);


                const openModalButton = document.createElement('button');
                openModalButton.classList.add('btn');
                openModalButton.classList.add('btn-outline-dark');
                openModalButton.textContent = 'Update';
                openModalButton.setAttribute('data-bs-toggle', 'modal');
                openModalButton.setAttribute('data-bs-target', `#${starship.name}`);
                cardFooterdiv.appendChild(openModalButton);

// Crear el contenedor principal del modal
                const modalContainer = document.createElement('div');
                modalContainer.classList.add('modal');
                modalContainer.classList.add('fade');
                modalContainer.id = starship.name;
                document.body.appendChild(modalContainer);

// Crear el contenido del modal
                const modalContent = document.createElement('div');
                modalContent.classList.add('modal-dialog');
                modalContent.classList.add('modal-dialog-centered');
                modalContainer.appendChild(modalContent);

// Crear el contenido interno del modal
                const modalInternalContent = document.createElement('div');
                modalInternalContent.classList.add('modal-content');
                modalContent.appendChild(modalInternalContent);

// Agregar el encabezado del modal
                const modalHeader = document.createElement('div');
                modalHeader.classList.add('modal-header');
                modalInternalContent.appendChild(modalHeader);

// Agregar el título del modal
                const modalTitle = document.createElement('h5');
                modalTitle.classList.add('modal-title');
                modalTitle.textContent = starship.name;
                modalHeader.appendChild(modalTitle);

// Agregar el cuerpo del modal
                const modalBody = document.createElement('div');
                modalBody.classList.add('modal-body');
                modalInternalContent.appendChild(modalBody);

// Agregar el contenido del cuerpo del modal
                const modalText = document.createElement('p');
                modalText.textContent = 'Este es el contenido del modal.';
                modalBody.appendChild(modalText);

// Agregar el pie del modal
                const modalFooter = document.createElement('div');
                modalFooter.classList.add('modal-footer');
                modalInternalContent.appendChild(modalFooter);

// Agregar el botón de cierre del modal
                const closeButton = document.createElement('button');
                closeButton.classList.add('btn');
                closeButton.classList.add('btn-secondary');
                closeButton.setAttribute('data-bs-dismiss', 'modal');
                closeButton.textContent = 'Cerrar';
                modalFooter.appendChild(closeButton);


                $(`#${starship.name}`).modal('show');


                const cardButtonDelete = document.createElement('a');
                cardButtonDelete.classList.add('btn');
                cardButtonDelete.classList.add('btn-outline-dark');
                cardButtonDelete.classList.add('mt-auto');
                cardButtonDelete.classList.add('ml-2');
                cardButtonDelete.textContent = 'Delete';
                cardButtonDelete.addEventListener('click',function (){
                    deleteStarship(starship.name)
                })
                cardFooterdiv.appendChild(cardButtonDelete);

                // Agregar la card al contenedor
                starshipContainer.appendChild(card);

            });
        })
        .catch(error => {
            console.error(error);
        });
}

async function deleteStarship(name) {
    if (!confirm('¿Desea eliminar esta Starship?')) {
        return;
    }
    const request = await fetch('/deleteship/' + name, {
        method: 'DELETE',
        headers: {
            'Accep':'aplication/json',
            'Content-Type':'aplication/json'
        }
    });

    location.reload()
}
