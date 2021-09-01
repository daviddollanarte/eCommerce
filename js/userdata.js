function userdata() {
    document.getElementById("UserName").innerHTML = sessionStorage.getItem("user")
}
userdata();
document.getElementById("logout").addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "login.html"
})