document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("loginpg").addEventListener("submit", function(){
        localStorage.setItem("user", document.getElementById("user").value)
    })
})

