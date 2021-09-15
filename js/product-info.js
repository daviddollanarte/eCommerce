var productInfoArray = [],
    pag = document.getElementById("products-info"),
    commentBox=document.getElementById("commentBox");
;

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
        if ( rating<4){
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
    for (let i = 0; i < productInfoArray.length; i++) {
        commentBox.innerHTML += `
        <div class="container rounded bg-light `+boxColor(productInfoArray[i].score)+`">
        <h4>`+ showName(productInfoArray[i].user) + `:</h4>
        <p class="text-muted">`+ showDate(productInfoArray[i].dateTime) + `</p>
        <p>`+ productInfoArray[i].description + `</p>
        <p>`+ showStars(productInfoArray[i].score) + `</p>
        </div>
        <hr>
        <br>
        `;

    }
}
document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCT_INFO_URL)
        .then(resp => (resp.json())
            .then(function (data) {
                productInfoArray = data;
                showProductInfo()
                let commentsBtn=document.getElementById("commentsBtn");
                commentsBtn.addEventListener("click", function () {
                    if (!(sessionStorage.getItem("commentsOn?"))) {
                        sessionStorage.setItem("commentsOn?",true)
                        fetch(PRODUCT_INFO_COMMENTS_URL)
                            .then(resp => (resp.json())
                                .then(function (data) {
                                    productInfoArray = data;
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
