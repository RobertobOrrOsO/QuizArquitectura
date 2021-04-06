const inputMail = document.querySelector("#inputMail");
const inputPassword = document.querySelector("#inputPassword");
const btnContinue = document.querySelector("#btnContinue");

btnContinue.addEventListener("click", goAdmin);

function goAdmin(){
    fetch('/Admin', {
        method: 'POST',
        body: JSON.stringify({
            user: inputMail.value, 
            password: inputPassword.value
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.status == 400){
            alert(data.message);
            window.location.href="login.html";

            console.log("1", data);
        }
        else if(data.status == 200){
            window.location.href="admin.html";
            alert(data.message)
        }
        else if(data.status == 401){
            window.location.href="login.html";
            alert(data.message)
        }
    }
)};