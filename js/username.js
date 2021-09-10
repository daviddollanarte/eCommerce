function chargeLoginData(nombre) { 
    localStorage.setItem("logedin","true")
    localStorage.setItem("user", nombre)
}

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("loginpg").addEventListener("submit", chargeLoginData(document.getElementById("user").value))
})

