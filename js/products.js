document.addEventListener("DOMContentLoaded", function (e) {
    var lista = document.getElementById("lista");
    fetch(PRODUCTS_URL)
        .then(resp => (resp.json())
            .then(data => {
                lista.innerHTML = `
            <div class="text-center pb-5 p-4">
            <h2>Productos</h2>
            <p class="lead">Verás aquí todos los productos de esta categoría.</p>
        </div>
            <ul></ul>`
                for (let i = 0; i < data.length; i++) {
                    lista.innerHTML += `
                <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + data[i].imgSrc + `" alt="` + data[i].name + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ data[i].name + `</h4>
                        </div>
                        <p class="mb-1">` + data[i].description + `</p>
                        <br>
                        <p class="mb-1">` + data[i].currency + data[i].cost + `</p>
                    </div>
                </div>
            </a>
            `
                }
            }))
})