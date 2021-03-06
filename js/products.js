var
    productsArray = [],
    minPrice = "",
    maxPrice = "",
    criterio = ""
    minPriceInt=0,
    maxPriceInt=0;

function showProducts() {
    data = productsArray
    var lista = document.getElementById("lista");
    lista.innerHTML = ``
    for (let i = 0; i < data.length; i++) {
        if ((minPrice == "" || data[i].cost >= minPriceInt) &&
            (maxPrice == "" || data[i].cost <= maxPriceInt))
        {
            lista.innerHTML += `
            <div class="col-lg-3 col-md-4 col-sm-6">
              <a href="product-info.html" class="list-group-item list-group-item-action">
                  <img src="` + data[i].imgSrc + `" alt="` + data[i].name + `" style="width: 18em" class="img-thumbnail">
                  <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ data[i].name + `</h4>
                  </div>
                  <p class="mb-1">` + data[i].description + `</p>
                  <br>
                  <p class="mb-1">` + data[i].currency + data[i].cost + `</p>
              </a>
            </div>
        `
        }
    }
}


function sortProducts () {
    if (criterio == "Asc") {
        result = productsArray.sort(
            function (a,b) {
                if (a.cost > b.cost) {
                    return 1;
            }
                if (a.cost < b.cost) {
                    return -1; 
                }
            return 0;
        })
        return result;
    }

if (criterio == "Desc") {
    result = productsArray.sort(
        function (a,b) {
            if (a.cost < b.cost) {
                return 1;
        }
            if (a.cost > b.cost) {
                return -1; 
            }
        return 0;
    })
    return result;
}
if (criterio == "count") {
    result = productsArray.sort(
        function (a,b) {
            if (a.soldCount < b.soldCount) {
                return 1;
        }
            if (a.soldCount > b.soldCount) {
                return -1; 
            }
        return 0;
    })
    return result;
}
}

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(PRODUCTS_URL)
        .then(resp => (resp.json())
            .then(function (data) {
                productsArray = data;
                showProducts()
            }))
    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;
        minPriceInt = parseInt(minPrice);
        maxPriceInt = parseInt(maxPrice);
        showProducts()
    })
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minPrice = "";
        maxPrice = "";
        showProducts()
    })
    document.getElementById("sortAsc").addEventListener("click", function () {
        criterio = "Asc"
        productsArray= sortProducts();
        showProducts()
    })
    document.getElementById("sortDesc").addEventListener("click", function () {
        criterio = "Desc"
        productsArray= sortProducts();
        showProducts()
    })
    document.getElementById("sortByCount").addEventListener("click", function () {
        criterio = "count"
        productsArray= sortProducts();
        showProducts()
    })

})