window.addEventListener('load', async function() {
    await getPlanets();
})

async function getPlanets() {
    fetch('/listplanets')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {

                const planetContainer = document.getElementById('cardPlanet') || '';

            data.forEach(planet => {

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

                const getPlanetButton = document.createElement('a');
                getPlanetButton.classList.add('btn');
                getPlanetButton.classList.add('btn-outline-dark');
                getPlanetButton.classList.add('mt-auto');
                getPlanetButton.classList.add('ml-2');
                getPlanetButton.textContent = 'See';
                getPlanetButton.addEventListener('click',function (){
                    getPlanetByName(planet.name)
                })
                cardFooterdiv.appendChild(getPlanetButton);

                const cardButtonDelete = document.createElement('a');
                cardButtonDelete.classList.add('btn');
                cardButtonDelete.classList.add('btn-outline-dark');
                cardButtonDelete.classList.add('mt-auto');
                cardButtonDelete.classList.add('ml-2');
                cardButtonDelete.textContent = 'Delete';
                cardButtonDelete.addEventListener('click',function (){
                    deletePlanet(planet.name)
                })
                cardFooterdiv.appendChild(cardButtonDelete);


                // Agregar la card al contenedor
                planetContainer.appendChild(card);
        });

        })
        .catch(error => {
            console.error(error);
        });
}
async function deletePlanet(name) {
    if (!confirm('¿Desea eliminar este planeta?')) {
        return;
    }
    const request = await fetch('/deletplanet/' + name, {
        method: 'DELETE',
        headers: {
            'Accep':'aplication/json',
            'Content-Type':'aplication/json'
        }
    });

    location.reload()
}
async function getPlanetByName(name) {
    fetch('/planetidlist/' + name)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(planet => {
            if (planet) {
                const planetContainer = document.getElementById('updatePlanet') || '';
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

                const tittle = document.createElement('h5');
                tittle.textContent = "Update Planet";
                tittle.classList.add('fw-bolder');
                tittle.classList.add('mb-2');
                cardBody.appendChild(tittle);

                const labelTerrain = document.createElement('label');
                labelTerrain.textContent = 'Terrain:';
                labelTerrain.classList.add('mb-1');
                cardBody.appendChild(labelTerrain);

                const terrain = document.createElement('input');
                terrain.type = "text";
                terrain.classList.add('form-control');
                terrain.classList.add('mb-3');
                terrain.value = planet.terrain;
                cardBody.appendChild(terrain);

                const labelPopulation = document.createElement('label');
                labelPopulation.textContent = 'Population:';
                labelPopulation.classList.add('mb-1');
                cardBody.appendChild(labelPopulation);

                const population = document.createElement('input');
                population.type = "text";
                population.classList.add('form-control');
                population.classList.add('mb-3');
                population.value = planet.population;
                cardBody.appendChild(population);


                const cardFooterdiv = document.createElement('div');
                cardFooterdiv.classList.add('text-center');
                cardFooterdiv.classList.add('mt-3');
                cardBody.appendChild(cardFooterdiv);

                const getStarshipButton = document.createElement('a');
                getStarshipButton.classList.add('btn');
                getStarshipButton.classList.add('btn-outline-dark');
                getStarshipButton.classList.add('mt-auto');
                getStarshipButton.classList.add('ml-2');
                getStarshipButton.textContent = 'Update';
                cardFooterdiv.appendChild(getStarshipButton);


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