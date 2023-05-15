
async function getpassengersValue() {
    const value = document.getElementById("passengers").value;
    await getStarship(value);
}

async function getStarship(passengersQuantity) {
    fetch('/starships/' + passengersQuantity)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(starship => {
            if (starship) {
                const starshipContainer = document.getElementById('cardStarships') || '';
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

                console.log(starship.films, starship)

                const film = document.createElement('p');
                film.textContent = `Films: ${starship.films.map(f => f.film)}`;
                film.classList.add('text-card');
                cardBody.appendChild(film);

                const consumables = document.createElement('p');
                consumables.textContent = `Consumables: ${starship.consumables}`;
                consumables.classList.add('text-card');
                cardBody.appendChild(consumables);


                // Agregar la card al contenedor
                starshipContainer.appendChild(card);
            }
            else{
                const starshipContainerNull = document.getElementById('cardStarships') || '';
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