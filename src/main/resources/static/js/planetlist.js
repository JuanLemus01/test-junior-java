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

                const openModalButton = document.createElement('button');
                openModalButton.classList.add('btn');
                openModalButton.classList.add('btn-outline-dark');
                openModalButton.textContent = 'Update';
                openModalButton.setAttribute('data-bs-toggle', 'modal');
                openModalButton.setAttribute('data-bs-target', `#${planet.name}`);
                cardFooterdiv.appendChild(openModalButton);

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