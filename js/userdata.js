function userdata() {
    document.getElementById("UserName").innerHTML = localStorage.getItem("user")
}
userdata();
document.getElementById("logout").addEventListener("click", function () {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.clear();
        login()
    }
    )
    localStorage.clear()
})