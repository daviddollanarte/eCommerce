var productInfoArray = [],
    productComments = [],
    pag = document.getElementById("products-info"),
    commentBox=document.getElementById("commentBox"),
    newCommentBox=document.getElementById("newCommentBox"),
    starRating=0;

function showProductInfo() {
    pag.innerHTML = "";
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
}
function showDate(dateString) {
    let dateSplit = dateString.split(" "),
        dateDay = dateSplit[0].split("-"),
        dateHour = dateSplit[1].split(":"),
        dateFinal = "";
    dateFinal = dateDay[2] + "/" + dateDay[1] + "/" + dateDay[0] + " " + dateHour[0] + ":" + dateHour[1];
    return dateFinal;
}

function showName(nameString) {
    var newName = "";
    let nameArr = nameString.split("_");
    for (i = 0; i < nameArr.length; i++) {
        let word = nameArr[i]
        newName += word.charAt(0).toUpperCase() + word.slice(1) + " ";
    }
    return newName;
}
function showStars(rating) {
    let content = "";
    for (i = 0; i < 5; i++) {
        if (i < rating) {
            content += `<span class="fa fa-star checked"></span>`
        } else {
            content += `<span class="fa fa-star"></span>`

        }
    }
    return content;
}
function boxColor(rating){
    if (rating<5){
        if ( rating<3){
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
    for (let i = 0; i < productComments.length; i++) {
        commentBox.innerHTML += `
        <div class="container rounded bg-light `+boxColor(productComments[i].score)+`">
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
function showNewCommentBox(){
    newCommentBox.innerHTML=`
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
function saveStarRating(rating){
    //add flag variable
    starRating = rating;
};
function changeStarCheck(index){
    for (i=0; i<index; i++){
        let currentStar="star"+(i+1),
            starElement=document.getElementById(currentStar);
        starElement.classList.add("checked");
    }
};
function resetCheck(){
    for (i=1; i<5; i++){
        let currentStar="star"+(i+1),
        starElement=document.getElementById(currentStar);
        starElement.classList.remove("checked");
    }
}

function saveNewComment(){
    var newComment=document.getElementById("newComment"),
        sendBtn=document.getElementById("sendBtn");
        sendBtn.addEventListener("click", function(){
            if (!(sessionStorage.getItem("commentsOn?"))){
                let newCommentArray={
                    score: starRating,
                    description: newComment.value,
                    user: localStorage.getItem("user"),
                    dateTime: new Date(),
                };
                newComment.value="";
                console.log(newCommentArray)

                /*agregar el comentario directo al array con comentarios */
            }
            else {
                commentBox.innerHTML+=``+newComment+``;
            }
        })
}
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCT_INFO_URL)
        .then(resp => (resp.json())
            .then(function (data) {
                productInfoArray = data;
                showProductInfo()
                let commentsBtn=document.getElementById("commentsBtn");
                sessionStorage.removeItem("commentsOn?");
                showNewCommentBox();
                saveNewComment();
                console.log(new Date())
                commentsBtn.addEventListener("click", function () {
                    if (!(sessionStorage.getItem("commentsOn?"))) {
                        sessionStorage.setItem("commentsOn?",true)
                        fetch(PRODUCT_INFO_COMMENTS_URL)
                            .then(resp => (resp.json())
                                .then(function (data) {
                                    productComments = data;
                                    commentsBtn.innerHTML = "Ocultar comentarios"
                                    showComments()
                                }))
                    } else {
                        console.log(sessionStorage.getItem("commentsOn?"));
                        sessionStorage.removeItem("commentsOn?");
                        commentBox.innerHTML="";
                        commentsBtn.innerHTML="Mostrar comentarios";
                    }
                })

            }))
});
