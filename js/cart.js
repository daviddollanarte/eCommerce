var productCart;

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(CART_INFO_URL)
        .then(resp => (resp.json())
            .then(function (data) {
                productCart = data;
                showProductsAtCart();
                changeSubTotal();
            }))
});
function changeSubTotal(){
    document.getElementById("productCount").addEventListener("change", function() {
        var
        subTotal=productCart.articles[0].unitCost*document.getElementById("productCount").value;
        document.getElementById("totalArts").innerHTML=`${subTotal}`;
        document.getElementById("subTotal").innerHTML=`${subTotal}`;
        document.getElementById("total").innerHTML=`${subTotal+parseInt(document.getElementById("shippingCost").innerHTML)}`
    });
}
function showSubTotal(){
    return productCart.articles[0].unitCost*productCart.articles[0].count;
};
function showTotal(){
    document.getElementById("totalArts").innerHTML=showSubTotal();
    document.getElementById("total").innerHTML=showSubTotal()+parseInt(document.getElementById("shippingCost").innerHTML);
}
function showProductsAtCart() {
    var 
    cartContent=document.getElementById("content");
    cartContent.innerHTML=`
    <div class="row">
      <div class="col-3">
        <img src="${productCart.articles[0].src}">
      </div>
      <div class="col-4">
        <br><br>
        <h5>${productCart.articles[0].name}</h5>
      </div>
      <div class="col-2">
        <br><br>
        <h5 class="border-primary">${productCart.articles[0].currency}$ ${productCart.articles[0].unitCost}
        </h5>
      </div>
      <div class="col-1">
        <br><br>
        <input id="productCount" class="quantity" min="1" value="${productCart.articles[0].count}" type="number" style="width: 3em;">
      </div>
      <div class="col-2">
        <br>
        <br>
        <h5>
          ${productCart.articles[0].currency}$ <span id="subTotal">${showSubTotal()}</span>
        </h5>
      </div>
    </div>`;
    showTotal();
}