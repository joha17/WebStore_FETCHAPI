const usersDetail = document.querySelector('.user-detail');

let output = '';
let userNameSession = sessionStorage.userName;
const url = 'https://localhost:5001/api/User/'+userNameSession;

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
            <div class="card-body">
                <h3>Detalle</h3>
                <h5 class="card-title"><strong>Usuario: </strong> ${data.userName}</h5>
                <p class="card-text"><strong>Nombre: </strong> ${data.firstName}</p>
                <p class="card-text lastname"> <strong>Apellido: </strong> ${data.lastName}</p>
                <p class="card-text email"><strong>Correo: </strong> ${data.emailId}</p>
                <p class="card-text password d-none"><strong>Contrasena: </strong> ${data.password}</p>
                <p class="card-text phonenumber d-none"><strong>Telefono: </strong> ${data.phoneNumber}</p>
            </div>
        </div>
        `
        usersDetail.innerHTML = output;
    })
    
