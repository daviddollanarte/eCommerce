var productCart,
shippingCost=0;

document.addEventListener("DOMContentLoaded", function (e) {
    fetch(CART_INFO_URL)
        .then(resp => (resp.json())
            .then(function (data) {
                productCart = data;
                showProductsAtCart();
            }))
});
function changeTotals(k){
    var
    totCost=document.getElementById(`totCost${k}`),
    sum=0,
    subTotal=document.getElementById("subTotal"),
    total=document.getElementById("total"),
    count=document.getElementById(`productCount${k}`).value;
    totCost.innerHTML=productCart.articles[k].unitCost*count;
    for (let i=0; i<productCart.articles.length; i++){
        if (productCart.articles[i].currency=="UYU"){
            sum+=parseInt(document.getElementById(`totCost${i}`).innerHTML);
        }else{
            sum+=parseInt(document.getElementById(`totCost${i}`).innerHTML)*40;
        }
    }
    subTotal.innerHTML=sum;
    if (document.getElementById("totCurrency").innerHTML=="UYU$"){
      total.innerHTML=(parseInt(subTotal.innerHTML)+shippingCost);
    } else{
      total.innerHTML=(parseInt(subTotal.innerHTML)+shippingCost)/40;
    }
    
  }
function changeCurrency(){
  if (document.getElementById("totCurrency").innerHTML=="UYU$"){
    total.innerHTML=(parseInt(subTotal.innerHTML)+shippingCost)/40;
    document.getElementById("totCurrency").innerHTML="USD$"
  } else{
    total.innerHTML=parseInt(subTotal.innerHTML)+shippingCost;
    document.getElementById("totCurrency").innerHTML="UYU$"
  }

}
function shippingTotal(){
  var shippingType=document.getElementById("selectShipping").value;

  if (shippingType==3){
    shippingCost=100;
  } else if(shippingType==2){
    shippingCost=20;
  } else {
    shippingCost=0;
  }
  for (let i=0; i<productCart.articles.length; i++){
    changeTotals(i);
}}

function checkShipping(){
  var warning=document.getElementById("warning"),
  shippingType=document.getElementById("selectShipping").value,
  payment=document.getElementById("selectPayment").value;
    if (((shippingType==2)||(shippingType==3))&&(payment==1)){
      warning.classList.remove("d-none")
    } else if (!(warning.classList.contains("d-none"))){
      warning.classList.add("d-none")
    }
  }
function showProductsAtCart() {
    var 
    cartContent=document.getElementById("content");
    cartContent.innerHTML="";
    for (let i=0; i<productCart.articles.length; i++){
        cartContent.innerHTML+=`
    <hr>
    <div class="row">
      <div class="col-3">
        <img src="${productCart.articles[i].src}" width="200em">
      </div>
      <div class="col-4">
        <br><br>
        <h5>${productCart.articles[i].name}</h5>
      </div>
      <div class="col-2">
        <br><br>
        <h5 class="border-primary">${productCart.articles[i].currency}$ ${productCart.articles[i].unitCost}
        </h5>
      </div>
      <div class="col-1">
        <br><br>
        <input id="productCount${i}" onchange="changeTotals(${i})" min="1" value="${productCart.articles[i].count}" type="number" style="width: 3em;">
      </div>
      <div class="col-2">
        <br>
        <br>
        <h5>
          ${productCart.articles[i].currency}$ <span id="totCost${i}"></span>
        </h5>
      </div>
    </div>`
    }
    for (let i=0; i<productCart.articles.length; i++){
        changeTotals(i);
    }
}