document.addEventListener("DOMContentLoaded", function(e){
 if(!localStorage.getItem('logedin')) {
            window.location.replace("login.html");
            localStorage.setItem("logedin","true");
          } 
    }
    
);