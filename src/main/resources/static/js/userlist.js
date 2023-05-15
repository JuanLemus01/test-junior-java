window.addEventListener('load', async function() {
    await userList();
})

async function userList() {

    fetch('/listusers')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la respuesta del servidor');
        })

        .then(data => {
            const usersContainer = document.getElementById('cardUser') || '';

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
                image.src = user.picture.large;
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

                const getUserButton = document.createElement('a');
                getUserButton.classList.add('btn');
                getUserButton.classList.add('btn-outline-dark');
                getUserButton.classList.add('mt-auto');
                getUserButton.classList.add('ml-2');
                getUserButton.textContent = 'See';
                getUserButton.addEventListener('click',function (){
                    getUserByEmail(user.email)
                })
                cardFooterdiv.appendChild(getUserButton);


                const cardButtonDelete = document.createElement('a');
                cardButtonDelete.classList.add('btn');
                cardButtonDelete.classList.add('btn-outline-dark');
                cardButtonDelete.classList.add('mt-auto');
                cardButtonDelete.classList.add('ml-2');
                cardButtonDelete.textContent = 'Delete';
                cardButtonDelete.addEventListener('click',function (){
                    deleteUser(user.email)
                })
                cardFooterdiv.appendChild(cardButtonDelete);

                // Agregar la card al contenedor
                usersContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

async function deleteUser(email) {
    if (!confirm('¿Desea eliminar este usuario?')) {
        return;
    }
    const request = await fetch('/deleteuser/' + email, {
        method: 'DELETE',
        headers: {
            'Accep':'aplication/json',
            'Content-Type':'aplication/json'
        }
    });

    location.reload()
}
async function getUserByEmail(email) {
    fetch('/useridlist/' + email)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(user => {
            if (user) {
                const userContainer = document.getElementById('updateUser') || '';
                userContainer.innerHTML = "";

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
                tittle.textContent = "Update User";
                tittle.classList.add('fw-bolder');
                tittle.classList.add('mb-2');
                cardBody.appendChild(tittle);

                const labelFistN = document.createElement('label');
                labelFistN.textContent = 'First:';
                labelFistN.classList.add('mb-1');
                cardBody.appendChild(labelFistN);

                const first = document.createElement('input');
                first.type = "text";
                first.classList.add('form-control');
                first.classList.add('mb-3');
                first.value = user.name.first;
                first.readOnly = true;
                cardBody.appendChild(first);

                const labelLastN = document.createElement('label');
                labelLastN.textContent = 'Last:';
                labelLastN.classList.add('mb-1');
                cardBody.appendChild(labelLastN);

                const last = document.createElement('input');
                last.type = "text";
                last.classList.add('form-control');
                last.classList.add('mb-3');
                last.value = user.name.last;
                last.readOnly = true;
                cardBody.appendChild(last);

                const labelphone = document.createElement('label');
                labelphone.textContent = 'Phone:';
                labelphone.classList.add('mb-1');
                cardBody.appendChild(labelphone);

                const phone = document.createElement('input');
                phone.type = "text";
                phone.classList.add('form-control');
                phone.classList.add('mb-3');
                phone.value = user.phone;
                phone.id = "phone";
                cardBody.appendChild(phone);

                const labelnat = document.createElement('label');
                labelnat.textContent = 'Nat:';
                labelnat.classList.add('mb-1');
                cardBody.appendChild(labelnat);

                const nat = document.createElement('input');
                nat.type = "text";
                nat.classList.add('form-control');
                nat.classList.add('mb-3');
                nat.value = user.nat;
                nat.id = "nat";
                cardBody.appendChild(nat);

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
                     updateUser(user.email)
                })
                cardFooterdiv.appendChild(updateButton);

                // Agregar la card al contenedor
                userContainer.appendChild(card);
            }
            else{
                const starshipContainerNull = document.getElementById('updateUser') || '';
                starshipContainerNull.innerHTML = "";

                const card = document.createElement('div');
                card.classList.add('text-center');

                const name = document.createElement('h5');
                name.textContent = `No se ha encontrado nungun usuario  con ese email`;
                name.classList.add('fw-bolder');
                card.appendChild(name);

                starshipContainerNull.appendChild(card);
            }
        })
        .catch(error => {
            console.error(error);
        });
}
async function updateUser(email) {
    const phone = document.getElementById("phone").value;
    const nat = document.getElementById("nat").value;

    const user = {
        phone: phone,
        nat: nat
    };

    fetch(`/userupdate/${email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(updatedUser => {
            alert("Usuario actualizado correctamente")
            location.reload()
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
        });
}