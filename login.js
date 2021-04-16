const loginUser = document.querySelector('.login-user')

const usernameValue = document.getElementById('username-value');
const passValue = document.getElementById('password-value');

const url = 'https://localhost:5001/api/Login/authenticate';
const successMessage = document.getElementById("success-message")

//Create users
// METODO POST
loginUser.addEventListener('submit', (e) => {
    e.preventDefault();

    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            userName:usernameValue.value,
            password:passValue.value
        })
    })
    .then(function(response) {
	    if (!response.ok) {
	    throw Error(response.statusText);
		}
		// Here is where you put what you want to do with the response.
        window.location.href = "http://127.0.0.1:5500/users.html";
        alert("Te has logueado correctamente");
	})
	.catch(function(error) {
		console.log('Looks like there was a problem: \n', error);
	});

    

    
})