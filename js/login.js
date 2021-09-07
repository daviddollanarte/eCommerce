var googlelogin=false;
function login(){
 if((!localStorage.getItem('logedin')) && !(googlelogin)) {
    window.location.replace("login.html");
  } 
}
function login2(googleUser){
  googlelogin=(googleUser.getId()!="");
}
document.addEventListener("DOMContentLoaded", login());