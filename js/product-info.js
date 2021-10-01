var productInfoArray = [],
    productComments = [],
    pag = document.getElementById("products-info"),
    commentBox = document.getElementById("commentBox"),
    newCommentBox = document.getElementById("newCommentBox"),
    starRating = 0;

function showProductInfo() {
    pag.innerHTML = "";
    //Agrega al inicio de la página los datos del artículo, el nombre, una descripción, el costo, la cantidad de vendidos y un carrusel con las imágenes del producto
    pag.innerHTML += `<div class="container">
    <div class="pb-5 p-4">
    <h1 style="font-weight: bold">`+ productInfoArray.name + `</h1><hr>`
        + productInfoArray.description + `<hr>
        <span style="font-weight:bold">`+ productInfoArray.currency + `</span> ` + productInfoArray.cost + `<hr>
    Cantidad de vendidos: `+ productInfoArray.soldCount + `<hr>
    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>

  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src="`+ productInfoArray.images[1] + `" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="`+ productInfoArray.images[2] + `" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="`+ productInfoArray.images[3] + `" alt="Third slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="`+ productInfoArray.images[4] + `" alt="Fourth slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Anterior</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Siguiente</span>
  </a>
</div>
    </div>
    <a type="button" class="btn btn-light btn-lg btn-block" id="commentsBtn">Mostrar comentarios</a>
  </div>`
}//El último div agrega un botón para acceder a los comentarios
function showDate(dateString) {
    let dateSplit = dateString.split(" "),//Divide el string entre fecha y hora
        dateDay = dateSplit[0].split("-"),//Divide la fecha en dia, mes y año
        dateHour = dateSplit[1].split(":");//Divide la horas y minutos
        
    return dateDay[2] + "/" + dateDay[1] + "/" + dateDay[0] + " " + dateHour[0] + ":" + dateHour[1];//Carga la fecha en el formato deseado
}

function showName(nameString) {//nameString viene en formato nombre_apellido y deseamos mostrarlos en un formato más agradable.
    if (nameString != localStorage.getItem("user")) {//Formatea el nombre si el comentario no lo esté haciendo el... 
        //usuario que está logeado actualmente.
        var newName = "";
        let nameArr = nameString.split("_");
        for (i = 0; i < nameArr.length; i++) {
            let word = nameArr[i]
            newName += word.charAt(0).toUpperCase() + word.slice(1) + " ";//Cambia a mayúscula el primer caracter de cada palabra del nombre.
        }
        return newName;
    }
    else {
        return nameString;//Si el comentario que se quiere mostrar lo hizo el usuario que está logueado actualmente el...
        //formato del nombre puede no tener un patrón reconocible para poder formatearlo por lo tanto se lo muestra como está
    }
}
function showStars(rating) {
    let content = "";
    for (i = 0; i < 5; i++) {//Muestra cinco estrellas.
        if (i < rating) {
            content += `<span class="fa fa-star checked"></span>`//Toma el puntaje que le dió el usuario y muestra esa cantidad en amarillo.
        } else {
            content += `<span class="fa fa-star"></span>`//El resto las muestra en negro.

        }
    }
    return content;
}
function boxColor(rating) {//Dependiendo de la puntuación el borde del comentario lo muestra en rojo, amarillo o verde
    if (rating < 5) {
        if (rating < 3) {
            return "border border-danger";
        }
        return "border border-warning";
    }
    return "border border-success";
}
function showComments() {
    commentBox.innerHTML += `
    <h3>Comentarios:</h3>
    <hr>
    `
    for (let i = 0; i < productComments.length; i++) {//Muestra el cada comentario en el arreglo con el formato deseado
        commentBox.innerHTML += `
        <div class="container rounded bg-light `+ boxColor(productComments[i].score) + `">
        <h4>`+ showName(productComments[i].user) + `:</h4>
        <p class="text-muted">`+ showDate(productComments[i].dateTime) + `</p>
        <p>`+ productComments[i].description + `</p>
        <p>`+ showStars(productComments[i].score) + `</p>
        </div>
        <hr>
        <br>
        `;

    }
}
function showNewCommentBox() {//Muestra el cuadro de texto para escribir el comentario, las cinco estrellas y el botón de enviar comentario.
    newCommentBox.innerHTML = `
    <div class="container">
        <div class="row">
            <div class="col">
                    <h2>Tienes un comentario para hacer?</h2>
                    <br>
                    <textarea id="newComment" placeholder="Escribelo aquí..." cols="60" rows="5"></textarea>
                    <br>
                    <div class="col">
                    <a><span id="star1" onclick="saveStarRating(1)" onmouseover="changeStarCheck(1)" onmouseout="resetCheck(1)" class="fa fa-star checked"></span></a>
                    <a><span id="star2" onclick="saveStarRating(2)" onmouseover="changeStarCheck(2)" onmouseout="resetCheck(2)" class="fa fa-star"></span></a>
                    <a><span id="star3" onclick="saveStarRating(3)" onmouseover="changeStarCheck(3)" onmouseout="resetCheck(3)" class="fa fa-star"></span></a>
                    <a><span id="star4" onclick="saveStarRating(4)" onmouseover="changeStarCheck(4)" onmouseout="resetCheck(4)" class="fa fa-star"></span></a>
                    <a><span id="star5" onclick="saveStarRating(5)" onmouseover="changeStarCheck(5)" onmouseout="resetCheck(5)" class="fa fa-star"></span></a>
                    </div>
                    <div class="col-2">
                        <button id="sendBtn" class="btn btn-primary">Comentar</button>" 
                    </div>
            </div>
        </div>
    </div>

    `
}
function saveStarRating(rating) {//Cuando se hace click en una estrella se guarda el puntaje correspondiente en la variable starRating.
    starRating = rating;
};
function changeStarCheck(index) {//Cambia las estrellas de negro a amarillo cuando pasamos el mouse encima de ellas
    for (i = 0; i < index; i++) {
        let currentStar = "star" + (i + 1),
            starElement = document.getElementById(currentStar);
        starElement.classList.add("checked");
    }
};
function resetCheck() {
    if (starRating != 0) {//Si se ha dado click a alguna de las estrellas las estrellas anteriores quedan en amarillo y las siguientes vuelven a negro.
        for (i = starRating; i < 5; i++) {
            let currentStar = "star" + (i + 1),
                starElement = document.getElementById(currentStar);
            starElement.classList.remove("checked");
        }
    } else {
        for (i = 1; i < 5; i++) {//Si no se ha dado click a ninguna estrella entonces todas menos la primera estrella quedan negras al quitar el mouse.
            let currentStar = "star" + (i + 1),
                starElement = document.getElementById(currentStar);
            starElement.classList.remove("checked");
        }
    }
}

function saveNewComment() {//Agrega el comentario que se realizó a la lista de comentarios mostrados
    var newComment = document.getElementById("newComment"),//Accedo al cuadro de texto.
        sendBtn = document.getElementById("sendBtn");//Accedo al botón de enviar comentario
    sendBtn.addEventListener("click", function () {
        if ((starRating == 0) || (newComment.value == "")) {
            alert("Completa todos los campos antes de comentar!")//Si el texto está vacío o no se seleccionó puntaje con las estrellas se manda una alerta que pide que complete todos los campos.
        } else {
            let newDate = new Date(),//Carga en la variable newDate la fecha y hora de en que se realizó el comentario.
                formatedDate = "";
            formatedDate = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate() + " " + newDate.getHours() + ":" + newDate.getMinutes();//Guarda la fecha en el mismo formato que la fecha que viene en el JSON.
            var newCommentArray = {//Crea un objeto isomorfo a los comentarios presentes en el JSON.
                score: starRating,
                description: newComment.value,
                user: localStorage.getItem("user"),
                dateTime: formatedDate,
            };
            newComment.value = "";//Vacía el cuadro de texto luego que se realizó el comentario
            starRating=0;//Resetea el valor de la calificación
            resetCheck();//Las estrellas vuelven a estar desmarcadas
            productComments.push(newCommentArray);//Agrega el nuevo comentario al arreglo que contiene los anteriores
            if (sessionStorage.getItem("commentsOn?")) {//Si ya se habían desplegado los comentarios, los borra y los vuelve a desplegar para que aparezca el que acabamos de mandar.
                commentBox.innerHTML = "";
                showComments();
            }

        }
    })
}
function addRelatedProducts() {
    fetch(PRODUCTS_URL)//Va a buscar el listado de productos completo.
        .then(resp => (resp.json())
            .then(function (data) {
                let relatedProducts = document.getElementById("relatedProducts");//Agrego la información de los productos relacionados, foto y nombre en un link.
                relatedProducts.innerHTML = `
            <div class="container">
            <h3>Productos relacionados:</h3>
            <br><br>
                <div class="row">
                    <div class="col-2">
                    </div>
                    <div class="col">
                        <a href="products.html">
                            <img src="`+data[productInfoArray.relatedProducts[0]].imgSrc+//Accedo a la ruta de la imagen...
                            //..que está en el arreglo que contiene el listado de productos utilizando el índice de artículo...
                            //..que viene en el atributo relatedProducts del objeto con la información del producto
                            `" width="200px">
                            <h4 style="color:black">`+data[productInfoArray.relatedProducts[0]].name+
                            //Mismo procedimiento que con la imagen
                            `</h4>         
                        </a>
                    </div>
                    <div class="col">
                        <a href="products.html">
                        <img src="`+data[productInfoArray.relatedProducts[1]].imgSrc+`" width="200px">
                        <h4 style="color:black">`+data[productInfoArray.relatedProducts[1]].name+`</h4>         
                        </a>
                    </div>
                </div>
            </div>
            `        }))

}
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCT_INFO_URL)
        .then(resp => (resp.json())
            .then(function (data) {
                productInfoArray = data;
                showProductInfo()
                let commentsBtn = document.getElementById("commentsBtn");
                sessionStorage.removeItem("commentsOn?");
                showNewCommentBox();
                addRelatedProducts();
                commentsBtn.addEventListener("click", function () {
                    if (!(sessionStorage.getItem("commentsOn?"))) {//Si los comentarios están ocultos los muestra
                        sessionStorage.setItem("commentsOn?", true)
                        fetch(PRODUCT_INFO_COMMENTS_URL)
                            .then(resp => (resp.json())
                                .then(function (data) {
                                    for (let i = 0; i < data.length; i++) {
                                        productComments.push(data[i]);
                                    }
                                    commentsBtn.innerHTML = "Ocultar comentarios"
                                    showComments()
                                }))
                    } else {//Si los comentarios están activados el botón va a mostrar "Ocultar comentarios" y al hacer click los va a ocultar.
                        sessionStorage.removeItem("commentsOn?");
                        commentBox.innerHTML = "";
                        commentsBtn.innerHTML = "Mostrar comentarios";
                        productComments = [];
                    }
                })
                saveNewComment();

            }))
});
