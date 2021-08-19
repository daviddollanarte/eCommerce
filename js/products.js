//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var lista=document.getElementById("lista");
    fetch (PRODUCTS_URL)
        .then(resp=>(resp.json()) 
        .then(data =>{
            lista.innerHTML=`<ul></ul>`
            for (i in data[i]){

            }
        }))
})