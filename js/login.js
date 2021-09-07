var googlelogin = false;
function login(googleUser) {
  console.log(JSON.stringify(googleUser.getBasicProfile()))
  googlelogin = (googleUser.getId() != "");
  if ((!localStorage.getItem('logedin')) && !(googlelogin)) {
    window.location.replace("login.html");
  }
}
function login2(googleUser) {

}
document.addEventListener("DOMContentLoaded", login());