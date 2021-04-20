const usersList = document.querySelector('.users-list');
const url = 'https://localhost:5001/api/User';

const editUser = document.querySelector('.edit-user');

const userNameValue = document.getElementById('username-value');
const firstNameValue = document.getElementById('firstname-value');
const lastNameValue = document.getElementById('lastname-value');
const emailValue = document.getElementById('emailid-value');
const passValue = document.getElementById('password-value');
const phoneValue = document.getElementById('phone-value');
let idValue = '';

document.getElementById("editUser").style.display = "none";
const successMessage = document.getElementById("success-message");

let output = '';

const renderUsers = (users) => {
    users.forEach(user => {
        output += `
        <div class="card mt-4 col-md-6 bg-light">
        <img src="${user.phoneNumber}" class="card-img-top" alt="...">
            <div class="card-body" data-id=${user.id}>
                <h5 class="card-title" data-id=${user.userName}>${user.userName}</h5>
                <p class="card-text">${user.firstName}</p>
                <p class="card-text lastname">${user.lastName}</p>
                <p class="card-text email">${user.emailId}</p>
                <p class="card-text password d-none">${user.password}</p>
                <p class="card-text phonenumber d-none">${user.phoneNumber}</p>
                <a href="#" class="card-link" id="edit-user" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</a>
                <a href="#" class="card-link" id="delete-user">Delete</a>
                <a href="#" class="card-link" id="detail-user">Detalle</a>
            </div>
        </div>
        `;
        });
        usersList.innerHTML = output;
}

//Get users
fetch(url)
    .then(response => response.json())
    .then(data => renderUsers(data))
    

usersList.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'delete-user';
    let editButtonIsPrecced = e.target.id == 'edit-user';
    let detailButtonIsPrecced = e.target.id == 'detail-user';

    let id = e.target.parentElement.dataset.id;
    let usernameId = e.target.parentElement.querySelector('.card-title').textContent;
    console.log(usernameId);

    //Delete user
    if (delButtonIsPressed) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => location.reload())
    }

    if (detailButtonIsPrecced) {
        sessionStorage.userNameDetail = usernameId;
        window.location.href = "http://127.0.0.1:5500/WebStore_FETCHAPI/userDetail.html";
    }

    if(editButtonIsPrecced){
        document.getElementById("editUser").style.display = "block";
        const parent = e.target.parentElement;
        let userContent = parent.querySelector('.card-title').textContent;
        let firstNameContent = parent.querySelector('.card-text').textContent;
        let lastNameContent = parent.querySelector('.lastname').textContent;
        let emailContent = parent.querySelector('.email').textContent;
        let passwordNameContent = parent.querySelector('.password').textContent;
        let phoneNameContent = parent.querySelector('.phonenumber').textContent;

        userNameValue.value = userContent;
        firstNameValue.value = firstNameContent;
        lastNameValue.value = lastNameContent;
        emailValue.value = emailContent;
        passValue.value = passwordNameContent;
        phoneValue.value = phoneNameContent;
        idValue = e.target.parentElement.dataset.id;

        console.log(userContent, firstNameContent, lastNameContent, emailContent,passwordNameContent,phoneNameContent,idValue);
    }

    editUser.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id:idValue.value,
                userName:userNameValue.value,
                firstName:firstNameValue.value,
                lastName:lastNameValue.value,
                emailId:emailValue.value,
                password:passValue.value,
                confirmPassword:passValue.value,
                userRole:"User"
            })
        })
        .then(function(response) {
            if (!response.ok) {
                successMessage.innerHTML = `
                <div class="alert alert-warning" role="alert">
                    Error en actualizar!!
                </div>
            `;  
            throw Error(response.statusText);
            }
            // Here is where you put what you want to do with the response.
            location.reload();
            successMessage.innerHTML = `
                <div class="alert alert-success" role="alert">
                    Se ha actualizado correctamente!!
                </div>
            `;
        })
        .catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
        });
    })
    
});