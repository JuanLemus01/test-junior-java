async function getTerrainValue() {
    const value = document.getElementById("terrain").value;
    await getPlanet(value);
}

async function getPlanet(terrainFind) {
    fetch('/planet/' + terrainFind)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(planet => {
            if (planet) {
                const planetContainer = document.getElementById('cardPlanet') || '';
                planetContainer.innerHTML = "";

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
                name.textContent = `Name: ${planet.name}`;
                name.classList.add('fw-bolder');
                cardBody.appendChild(name);

                const terrain = document.createElement('p');
                terrain.textContent = `Terrain: ${planet.terrain}`;
                terrain.classList.add('text-card');
                cardBody.appendChild(terrain);

                const population = document.createElement('p');
                population.textContent = `Population: ${planet.population}`;
                population.classList.add('text-card');
                cardBody.appendChild(population);


                // Agregar la card al contenedor
                planetContainer.appendChild(card);
            }
            else{
                const planetContainerNull = document.getElementById('cardPlanet') || '';
                planetContainerNull.innerHTML = "";

                const card = document.createElement('div');
                card.classList.add('text-center');

                const name = document.createElement('h5');
                name.textContent = `No se ha encontrado ningun planeta con ese terreno`;
                name.classList.add('fw-bolder');
                card.appendChild(name);

                planetContainerNull.appendChild(card);
            }
        })
        .catch(error => {
            console.error(error);
        });
}