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
            usersContainer.innerHTML = "";

            data.forEach(user => {
                if (user) {
                    const card = document.createElement('div');
                    card.classList.add('col');
                    card.classList.add('mb-5');

                    const cardUs = document.createElement('div');
                    cardUs.classList.add('card');
                    cardUs.classList.add('h-100');
                    card.appendChild(cardUs);

                    const image = document.createElement('img');
                    image.src = user.picture.medium;
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

                    // Agregar la card al contenedor
                    usersContainer.appendChild(card);
                }else{
                    const userContainerNull = document.getElementById('cardUserFind') || '';
                    userContainerNull.innerHTML = "";

                    const card = document.createElement('div');
                    card.classList.add('text-center');

                    const name = document.createElement('h5');
                    name.textContent = `No se ha encontrado ningun usuario mayor a esa edad`;
                    name.classList.add('fw-bolder');
                    card.appendChild(name);

                    userContainerNull.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error(error);
        });
}