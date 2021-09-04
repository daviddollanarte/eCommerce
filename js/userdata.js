function userdata() {
    document.getElementById("UserName").innerHTML = localStorage.getItem("user")
}
userdata();
document.getElementById("logout").addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "login.html"
})