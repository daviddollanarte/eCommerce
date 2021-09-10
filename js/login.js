function login() {
  if (!localStorage.getItem('logedin')) { 
    window.location.replace("login.html");
  }
}
document.addEventListener("DOMContentLoaded", login());