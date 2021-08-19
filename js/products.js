document.addEventListener("DOMContentLoaded", function (e) {
    var lista=document.getElementById("lista");
    fetch ("https://japdevdep.github.io/ecommerce-api/product/all.json")
        .then(resp=>(resp.json()) 
        .then(data =>{
            lista.innerHTML=`
            <h2 class="pb-5 text-center p-4">Productos</h2>
            <p class="lead">Verás aquí todos los productos de esta categoría.</p>
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