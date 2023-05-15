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


                const getStarshipButton = document.createElement('a');
                getStarshipButton.classList.add('btn');
                getStarshipButton.classList.add('btn-outline-dark');
                getStarshipButton.classList.add('mt-auto');
                getStarshipButton.classList.add('ml-2');
                getStarshipButton.textContent = 'See';
                getStarshipButton.addEventListener('click',function (){
                    getStarshipByName(starship.name)
                })
                cardFooterdiv.appendChild(getStarshipButton);


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
async function getStarshipByName(name) {
    fetch('/shipidlist/' + name)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(starship => {
            if (starship) {
                const starshipContainer = document.getElementById('updateStarship') || '';
                starshipContainer.innerHTML = "";

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

                const tittle = document.createElement('h5');
                tittle.textContent = "Update Starship";
                tittle.classList.add('fw-bolder');
                tittle.classList.add('mb-2');
                cardBody.appendChild(tittle);

                const labelPassenger = document.createElement('label');
                labelPassenger.textContent = 'Passengers:';
                labelPassenger.classList.add('mb-1');
                cardBody.appendChild(labelPassenger);

                const passengers = document.createElement('input');
                passengers.type = "text";
                passengers.classList.add('form-control');
                passengers.classList.add('mb-3');
                passengers.value = starship.passengers;
                passengers.id = "passengers";
                cardBody.appendChild(passengers);

                const labelSpeed = document.createElement('label');
                labelSpeed.textContent = 'Max Speed:';
                labelSpeed.classList.add('mb-1');
                cardBody.appendChild(labelSpeed);

                const speed = document.createElement('input');
                speed.type = "text";
                speed.classList.add('form-control');
                speed.classList.add('mb-3');
                speed.value = starship.max_atmosphering_speed;
                speed.id = "max_atmosphering_speed";
                cardBody.appendChild(speed);

                const labelConsumables = document.createElement('label');
                labelConsumables.textContent = 'Consumables:';
                labelConsumables.classList.add('mb-1');
                cardBody.appendChild(labelConsumables);

                const consumables = document.createElement('input');
                consumables.type = "text";
                consumables.classList.add('form-control');
                consumables.classList.add('mb-3');
                consumables.value = starship.consumables;
                consumables.id = "comsumables";
                cardBody.appendChild(consumables);

                const cardFooterdiv = document.createElement('div');
                cardFooterdiv.classList.add('text-center');
                cardFooterdiv.classList.add('mt-3');
                cardBody.appendChild(cardFooterdiv);

                const updateButton = document.createElement('a');
                updateButton.classList.add('btn');
                updateButton.classList.add('btn-outline-dark');
                updateButton.classList.add('mt-auto');
                updateButton.classList.add('ml-2');
                updateButton.textContent = 'Update';
                updateButton.addEventListener('click',function (){
                    updateStarship(starship.name)
                })
                cardFooterdiv.appendChild(updateButton);

                // Agregar la card al contenedor
                starshipContainer.appendChild(card);
            }
            else{
                const starshipContainerNull = document.getElementById('updateStarship') || '';
                starshipContainerNull.innerHTML = "";

                const card = document.createElement('div');
                card.classList.add('text-center');

                const name = document.createElement('h5');
                name.textContent = `No se ha encontrado ninguna nave con esa capacidad`;
                name.classList.add('fw-bolder');
                card.appendChild(name);

                starshipContainerNull.appendChild(card);
            }
        })
        .catch(error => {
            console.error(error);
        });
}
async function updateStarship(name) {
    const passengers = document.getElementById("passengers").value;
    const comsumables = document.getElementById("comsumables").value;
    const max_atmosphering_speed = document.getElementById("max_atmosphering_speed").value;

    const starship = {
        consumables: comsumables,
        passengers: passengers,
        max_atmosphering_speed: max_atmosphering_speed
    };

    fetch(`/starshiprupdate/${name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(starship)
    })
        .then(response => response.json())
        .then(updatedStarship => {
            alert("Starship actualizada correctamente")
            location.reload()
        })
        .catch(error => {
            console.error('Error al actualizar la starship:', error);
        });
}

