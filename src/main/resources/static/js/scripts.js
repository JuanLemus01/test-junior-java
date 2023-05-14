

window.addEventListener('load', async function() {
    console.log("Ya cargo")
    await usersListOrder();
})

async function usersListOrder() {

    fetch('/users-order')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la respuesta del servidor');
        })

        .then(data => {
            const usersContainer = document.getElementById('cardUser') || '';

            console.log(data);
            data.forEach(user => {

                const card = document.createElement('div');
                card.classList.add('col');
                card.classList.add('mb-5');

                const cardUs = document.createElement('div');
                cardUs.classList.add('card');
                cardUs.classList.add('h-100');
                card.appendChild(cardUs);

                const image = document.createElement('img');
                //image.src = user.picture.medium;
                image.src = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
                image.classList.add('card-img-top')
                cardUs.appendChild(image);

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.classList.add('p-4');
                cardUs.appendChild(cardBody);


                const name = document.createElement('h5');
                name.textContent = `${user.name.first} ${user.name.last}`;
                name.classList.add('fw-bolder');
                cardBody.appendChild(name);

                const gender = document.createElement('p');
                gender.textContent = `Gender: ${user.gender}`;
                gender.classList.add('text-card');
                cardBody.appendChild(gender);

                const phone = document.createElement('p');
                phone.textContent = `Phone: ${user.phone}`;
                phone.classList.add('text-card');
                cardBody.appendChild(phone);

                const email = document.createElement('p');
                email.textContent = ` ${user.email}`;
                email.classList.add('text-card');
                cardBody.appendChild(email);

                const cardFooter = document.createElement('div');
                cardFooter.classList.add('card-footer');
                cardFooter.classList.add('p-4');
                cardFooter.classList.add('pt-0');
                cardFooter.classList.add('border-top-0');
                cardFooter.classList.add('bg-transparent');
                cardUs.appendChild(cardFooter);

                const cardFooterdiv = document.createElement('div');
                cardFooterdiv.classList.add('text-center');
                cardFooter.appendChild(cardFooterdiv);

                const cardButton = document.createElement('a');
                cardButton.classList.add('btn');
                cardButton.classList.add('btn-outline-dark');
                cardButton.classList.add('mt-auto');
                cardButton.textContent = 'Add';
                cardFooterdiv.appendChild(cardButton);

                // Agregar la card al contenedor
                usersContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

async function getFindValue(){
    const value = document.getElementById("age").value;
    await userFind(value);
}
async function userFind(age) {

    fetch('/users-find/'+age)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la respuesta del servidor');
        })

        .then(data => {
            const usersContainer = document.getElementById('cardUserFind');

            console.log(data);
            data.forEach(user => {

                const card = document.createElement('div');
                card.classList.add('col');
                card.classList.add('mb-5');

                const cardUs = document.createElement('div');
                cardUs.classList.add('card');
                cardUs.classList.add('h-100');
                card.appendChild(cardUs);

                const image = document.createElement('img');
                //image.src = user.picture.medium;
                image.src = "https://dummyimage.com/450x300/dee2e6/6c757d.jpg";
                image.classList.add('card-img-top')
                cardUs.appendChild(image);

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.classList.add('p-4');
                cardUs.appendChild(cardBody);


                const name = document.createElement('h5');
                name.textContent = `${user.name.first} ${user.name.last}`;
                name.classList.add('fw-bolder');
                cardBody.appendChild(name);

                const gender = document.createElement('p');
                gender.textContent = `Gender: ${user.gender}`;
                gender.classList.add('text-card');
                cardBody.appendChild(gender);

                const phone = document.createElement('p');
                phone.textContent = `Phone: ${user.phone}`;
                phone.classList.add('text-card');
                cardBody.appendChild(phone);

                const age = document.createElement('p');
                age.textContent = `Age: ${user.dob.age}`;
                age.classList.add('text-card');
                cardBody.appendChild(age);

                const email = document.createElement('p');
                email.textContent = ` ${user.email}`;
                email.classList.add('text-card');
                cardBody.appendChild(email);

                const cardFooter = document.createElement('div');
                cardFooter.classList.add('card-footer');
                cardFooter.classList.add('p-4');
                cardFooter.classList.add('pt-0');
                cardFooter.classList.add('border-top-0');
                cardFooter.classList.add('bg-transparent');
                cardUs.appendChild(cardFooter);

                const cardFooterdiv = document.createElement('div');
                cardFooterdiv.classList.add('text-center');
                cardFooter.appendChild(cardFooterdiv);

                const cardButton = document.createElement('a');
                cardButton.classList.add('btn');
                cardButton.classList.add('btn-outline-dark');
                cardButton.classList.add('mt-auto');
                cardButton.textContent = 'Add';
                cardFooterdiv.appendChild(cardButton);

                // Agregar la card al contenedor
                usersContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

