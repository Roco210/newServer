
const formulario = document.getElementById("send")
const newpass = document.getElementById("newPass")
const newpass2 = document.getElementById("newPass2")

formulario.addEventListener("click", (e) => {
    
    if (newpass.value != newpass2.value) {
        e.preventDefault();
        console.log("hola")
        Swal.fire(
            {
                icon: "error",
                title: "Por favor no repetiste de forma correcta la contraseña",
            }
        )
    }
})

