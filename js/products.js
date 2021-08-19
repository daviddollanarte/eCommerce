document.addEventListener("DOMContentLoaded", function (e) {
    var lista=document.getElementById("lista");
    fetch ("https://japdevdep.github.io/ecommerce-api/product/all.json")
        .then(resp=>(resp.json()) 
        .then(data =>{
            lista.innerHTML=`
            <div class="text-center pb-5 p-4">
            <h2>Productos</h2>
            <p class="lead">Verás aquí todos los productos de esta categoría.</p>
        </div>
            <ul></ul>`
            for (let i = 0; i < data.length; i++) {
                lista.innerHTML+=
                `<div class="container pb-5 my-3 list-group">
                <li>`+data[i].name+`
                <hr>
                `+data[i].currency+` `+data[i].cost+`
                <hr>
                `+data[i].description+`</li>
                <hr>
                </div>
                `
            }
        }))
})