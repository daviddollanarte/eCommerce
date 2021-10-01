function userdata() {
    document.getElementById("UserName").innerHTML = localStorage.getItem("user")
}
userdata();//Carga el nombre de usuario de local storage en el botón desplegable
document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear()//Elimina los datos de local storage que tiene la info del usuario
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {//Cierra sesión si está ingresado con google
        console.log('User signed out.');
        localStorage.clear();
        login()
    }
    )
})