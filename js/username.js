document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("loginpg").addEventListener("submit", function(){
        sessionStorage.setItem("user", document.getElementById("user").value)
    })
})

