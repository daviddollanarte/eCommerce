document.addEventListener("DOMContentLoaded", function(e){
 if(!sessionStorage.getItem('logedin')) {
            window.location.replace("login.html");
            sessionStorage.setItem("logedin","true");
          } 
    }
    
);