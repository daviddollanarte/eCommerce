var googlelogin = false;
function login(googleUser) {
  if (!localStorage.getItem('logedin')) { 
    window.location.replace("login.html");
  }
}
document.addEventListener("DOMContentLoaded", login());