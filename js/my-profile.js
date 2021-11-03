var
    firstNameForm = document.getElementById("firstName"),
    lastNameForm = document.getElementById("lastName"),
    birthDateForm = document.getElementById("birthDate"),
    emailForm = document.getElementById("email"),
    telForm = document.getElementById("cellphone"),
    profilePic = document.getElementById("preview");



document.addEventListener("DOMContentLoaded", function (e) {
    if (localStorage.getItem("userDataJSON")) {
        let userData = JSON.parse(localStorage.getItem("userDataJSON"));
        if (userData.imgSrc == "") {
            firstNameForm.value = userData.firstName;
            lastNameForm.value = userData.lastName;
            birthDateForm.value = userData.birthDate;
            emailForm.value = userData.email;
            telForm.value = userData.tel;
        } else {
            firstNameForm.value = userData.firstName;
            lastNameForm.value = userData.lastName;
            birthDateForm.value = userData.birthDate;
            emailForm.value = userData.email;
            telForm.value = userData.tel;
            profilePic.innerHTML = `<img src="${userData.imgSrc}" style="width : 10em;">`
        }
    }
});
function updateImageDisplay() {
    let preview = document.getElementById("preview");
    let input = document.getElementById("profilePic");
    while (preview.firstChild) {
        preview.removeChild(preview.firstChild);
    }

    var h = document.getElementById("saveData");
    var typ = document.createAttribute("disabled");
    h.attributes.setNamedItem(typ);

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
            image.style = "width: 10em"
            listItem.appendChild(image);
            listItem.appendChild(para);
            para.textContent = `Archivo: ${file.name}`;
            listItem.appendChild(para);

            list.appendChild(listItem);
        }
    }
    var form = new FormData();
    form.append("image", input.files[0]);

    var settings = {
        "url": "https://api.imgbb.com/1/upload?key=ab08589427fa93ce699f9d524c00dfd4",
        "method": "POST",
        "timeout": 0,
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
    };


    $.ajax(settings).done(function (response) {
        console.log(response);
        var jx = JSON.parse(response);
        console.log(jx.data.url);
        h.attributes.removeNamedItem("disabled");
        h.addEventListener("click", function () {
            var userData = {
                firstName: "",
                lastName: "",
                birthDate: 0,
                email: "",
                tel: 0,
                imgSrc: "",
            };

            if (jx.data.url) {
                userData.firstName = firstNameForm.value;
                userData.lastName = lastNameForm.value;
                userData.birthDate = birthDateForm.value;
                userData.email = emailForm.value;
                userData.tel = telForm.value;
                userData.imgSrc = jx.data.url;
                localStorage.setItem("userDataJSON", JSON.stringify(userData))
                console.log(localStorage.getItem("userDataJSON"))
            } else {
                userData.firstName = firstNameForm.value;
                userData.lastName = lastNameForm.value;
                userData.birthDate = birthDateForm.value;
                userData.email = emailForm.value;
                userData.tel = telForm.value;
                localStorage.setItem("userDataJSON", JSON.stringify(userData))
                console.log(localStorage.getItem("userDataJSON"))
            }
        })
    })
}

function clearData() {

    localStorage.removeItem("userDataJSON");

    firstNameForm.value = "";
    lastNameForm.value = "";
    birthDateForm.value = "";
    emailForm.value = "";
    telForm.value = "";
    profilePic.innerHTML="";
}