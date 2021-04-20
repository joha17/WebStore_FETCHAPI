const usersDetail = document.querySelector('.user-detail');
const editUser = document.querySelector('.edit-user');

let output = '';
let userNameSession = sessionStorage.userName;
const url = 'https://localhost:5001/api/User/'+ userNameSession;
const urlId = 'https://localhost:5001/api/User';

const userNameValue = document.getElementById('username-value');
const firstNameValue = document.getElementById('firstname-value');
const lastNameValue = document.getElementById('lastname-value');
const emailValue = document.getElementById('emailid-value');
const passValue = document.getElementById('password-value');
const phoneValue = document.getElementById('phone-value');
let idValue = '';

let userContent = '';
let firstNameContent = '';
let lastNameContent = '';
let emailContent = '';
let passwordNameContent = '';
let phoneNameContent = '';


document.getElementById("editUser").style.display = "none";
const successMessage = document.getElementById("success-message");

if (typeof(Storage) !== 'undefined') {
    console.log(`Si es compatible, Mi nombres es ${userNameSession}`);
  } else {
    console.log("No es compatible");
  }


//Get users
//fetch(`${url}/${username}`)
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        output = 
        `
        <div class="card mt-4 col-md-6 bg-light">
            <div class="card-body" data-id=${data.id}>
                <h3>Detalle</h3>
                <h5 class="card-title">${data.userName}</h5>
                <p class="card-text">${data.firstName}</p>
                <p class="card-text lastname">${data.lastName}</p>
                <p class="card-text email">${data.emailId}</p>
                <p class="card-text password d-none">${data.password}</p>
                <p class="card-text phonenumber">${data.phoneNumber}</p>
                <a href="#" class="card-link" id="delete-user">Delete</a>
                <a href="#" class="card-link" id="edit-user">Editar</a>
            </div>
        </div>
        `
        if (data.id == null) {
          usersDetail.innerHTML = `<h3>Usuario no existe</h3>`
        }
        else{
          usersDetail.innerHTML = output;
        }
    })
    
  usersDetail.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'delete-user';
    let editButtonIsPrecced = e.target.id == 'edit-user';

    idValue = e.target.parentElement.dataset.id;
    let usernameId = e.target.parentElement.querySelector('.card-title').textContent;
    console.log(usernameId);

    //Delete user
    if (delButtonIsPressed) {
        fetch(`${urlId}/${idValue}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => location.reload())
    }

    if(editButtonIsPrecced){
        document.getElementById("editUser").style.display = "block";
        const parent = e.target.parentElement;
        userContent = parent.querySelector('.card-title').textContent;
        firstNameContent = parent.querySelector('.card-text').textContent;
        lastNameContent = parent.querySelector('.lastname').textContent;
        emailContent = parent.querySelector('.email').textContent;
        passwordNameContent = parent.querySelector('.password').textContent;
        phoneNameContent = parent.querySelector('.phonenumber').textContent;

        userNameValue.value = userContent;
        firstNameValue.value = firstNameContent;
        lastNameValue.value = lastNameContent;
        emailValue.value = emailContent;
        passValue.value = passwordNameContent;
        phoneValue.value = phoneNameContent;
        idValue = e.target.parentElement.dataset.id;

        console.log(userContent, firstNameContent, lastNameContent, emailContent,passwordNameContent,phoneNameContent,idValue);
    }  
});


  editUser.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log(idValue);
      fetch(`${urlId}/${idValue}`, {
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
              phoneNumber: phoneValue.value,
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
  });
  
