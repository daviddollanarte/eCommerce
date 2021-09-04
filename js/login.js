function login(){
 if(!localStorage.getItem('logedin')) {
  console.log(localStorage.getItem("logedin"))
    window.location.replace("login.html");
    localStorage.setItem("logedin","true");
  } 
}

document.addEventListener("DOMContentLoaded", login());