document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("loginpg").addEventListener("submit", function() { 
        var nombre=document.getElementById("user");
        localStorage.setItem("logedin","true");
        localStorage.setItem("user", nombre.value)
})})

