var
    firstNameForm = document.getElementById("firstName"),
    lastNameForm = document.getElementById("lastName"),
    birthDateForm = document.getElementById("birthDate"),
    emailForm = document.getElementById("email"),
    telForm = document.getElementById("cellphone");


document.addEventListener("DOMContentLoaded", function (e) {
    if (localStorage.getItem("userDataJSON")) {
        let userData = JSON.parse(localStorage.getItem("userDataJSON"));
        firstNameForm.value = userData.firstName;
        lastNameForm.value = userData.lastName;
        birthDateForm.value = userData.birthDate;
        emailForm.value = userData.email;
        telForm.value = userData.tel;
    }
});
function updateImageDisplay() {
    let preview = document.getElementById("preview");
    let input = document.getElementById("profilePic");
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    const curFiles = input.files;
    if (curFiles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No files currently selected for upload';
        preview.appendChild(para);
    } else {
        const list = document.createElement('ol');
        preview.appendChild(list);

        for (const file of curFiles) {
            const listItem = document.createElement('li');
            const para = document.createElement('p');
            const image = document.createElement('img');
            image.src = URL.createObjectURL(file);
            image.style.width = "10em"
            listItem.appendChild(image);
            listItem.appendChild(para);
            para.textContent = `Archivo: ${file.name}`;
            listItem.appendChild(para);

            list.appendChild(listItem);
        }
    }
}

function saveData() {
    var userData = {
        firstName: "",
        lastName: "",
        birthDate: 0,
        email: "",
        tel: 0
    };


    userData.firstName = firstNameForm.value;
    userData.lastName = lastNameForm.value;
    userData.birthDate = birthDateForm.value;
    userData.email = emailForm.value;
    userData.tel = telForm.value;
    localStorage.setItem("userDataJSON", JSON.stringify(userData))
    console.log(localStorage.getItem("userDataJSON"))
}
function clearData() {

    localStorage.removeItem("userDataJSON");

    firstNameForm.value = "";
    lastNameForm.value = "";
    birthDateForm.value = "";
    emailForm.value = "";
    telForm.value = "";
}