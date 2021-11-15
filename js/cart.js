var productCart,
  shippingCost = 0,
  shippingType = 0,
  flag = false,
  subTotal = document.getElementById("subTotal"),
  total = document.getElementById("total");

document.addEventListener("DOMContentLoaded", function (e) {
  fetch(CART_INFO_URL)
    .then(resp => (resp.json())
      .then(function (data) {
        productCart = data;
        showProductsAtCart();
      }))
});
function showProductsAtCart() {
  var
    cartContent = document.getElementById("content");
  cartContent.innerHTML = "";
  for (let i = 0; i < productCart.articles.length; i++) {
    cartContent.innerHTML += `
    <hr>
    <div class="row">
      <div class="col-3 d-none d-md-flex">
        <img src="${productCart.articles[i].src}" width="150em">
      </div>
      <div class="col-12 col-md-4">
        <br><br>
        <h5>${productCart.articles[i].name}</h5>
      </div>
      <div class="col-12 col-md-2">
        <br><br>
        <h5 class="border-primary">${productCart.articles[i].currency}$ ${productCart.articles[i].unitCost}
        </h5>
      </div>
      <div class="col-6 col-md-1">
        <br><br>
        <input id="productCount${i}" onchange="changeTotals(${i})" min="1" value="${productCart.articles[i].count}" type="number" style="width: 3em;">
      </div>
      <div class="col-6 col-md-2">
        <br>
        <br>
        <h5>
          ${productCart.articles[i].currency}$ <span id="totCost${i}"></span>
        </h5>
      </div>
    </div>`
  }
  for (let i = 0; i < productCart.articles.length; i++) {
    changeTotals(i);
  }
}
function changeTotals(k) {
  var
    totCost = document.getElementById(`totCost${k}`),
    sum = 0,
    count = document.getElementById(`productCount${k}`).value;
  totCost.innerHTML = productCart.articles[k].unitCost * count;
  for (let i = 0; i < productCart.articles.length; i++) {
    if (productCart.articles[i].currency == "UYU") {
      sum += parseInt(document.getElementById(`totCost${i}`).innerHTML);
    } else {
      sum += parseInt(document.getElementById(`totCost${i}`).innerHTML) * 40;
    }
  }
  subTotal.innerHTML = sum;
  if (document.getElementById("totCurrency").innerHTML == "UYU$") {
    total.innerHTML = (parseInt(subTotal.innerHTML) + shippingCost);
  } else {
    total.innerHTML = (parseInt(subTotal.innerHTML) + shippingCost) / 40;
  }
  document.getElementById("shippingFee").innerHTML = `${shippingCost}`
}
function changeCurrency() {
  if (document.getElementById("totCurrency").innerHTML == "UYU$") {
    total.innerHTML = (parseInt(subTotal.innerHTML) + shippingCost) / 40;
    document.getElementById("totCurrency").innerHTML = "USD$"
  } else {
    total.innerHTML = parseInt(subTotal.innerHTML) + shippingCost;
    document.getElementById("totCurrency").innerHTML = "UYU$"
  }

}

function shippingData() {

  shippingType = document.getElementById("selectShipping").value;
  if (shippingType == 2 || shippingType == 3 || shippingType == 4) {

    document.getElementById("trigger2").click();
    flag = false;
  }

};

function enableSubmit(i) {
  if (i <= 3) {
    if ((document.getElementById(`address1`).value !== "") && (document.getElementById(`address2`).value !== "") && (document.getElementById(`address3`).value !== "")) {
      document.getElementById("saveData1").classList.remove("disabled");
      document.getElementById("saveDataDiv1").removeAttribute("data-bs-original-title");
      document.getElementById("saveDataDiv1").removeAttribute("title");
    } else {
      document.getElementById("saveData1").classList.add("disabled");
      document.getElementById("saveDataDiv1").setAttribute("data-bs-original-title", "Completa todos los campos");
      document.getElementById("saveDataDiv1").removeAttribute("title");
    }
  }
  if (i > 3 && i <= 6) {
    if ((document.getElementById(`address4`).value !== "") && (document.getElementById(`address5`).value !== "") && (document.getElementById(`address6`).value !== "")) {
      document.getElementById("saveData2").classList.remove("disabled");
      document.getElementById("saveDataDiv2").removeAttribute("data-bs-original-title");
      document.getElementById("saveDataDiv2").removeAttribute("title");
    } else {
      document.getElementById("saveData2").classList.add("disabled");
      document.getElementById("saveDataDiv2").setAttribute("data-bs-original-title", "Completa todos los campos");
      document.getElementById("saveDataDiv2").removeAttribute("title");
    }
  }
}

function isValid(i) {

  let address = document.getElementById(`address${i}`);
  if (address.value == "") {

    document.getElementById(`addAddress${i}`).classList.remove("d-none");
    address.classList.add("is-invalid");
    return false
  } else {

    document.getElementById(`addAddress${i}`).classList.add("d-none");
    address.classList.remove("is-invalid");
    address.classList.add("is-valid");
    return true;


  }
}

function saveData(i) {
  flag = true;
  document.getElementById(`closeModalBtn${i}`).click();
}

function closeModal(i) {
  if (i == 1) {
    if (!flag) {
      document.getElementById('selectShipping').selectedIndex = 0;
      shippingCost = 0;
      for (let i = 0; i < productCart.articles.length; i++) {
        changeTotals(i);
      }
      document.getElementById("shippingFee").innerHTML = `${shippingCost}`;

    }
  } else if (i == 2) {
    if (!flag) {
      document.getElementById('selectPayment').selectedIndex = 0;
    }
  } else if (i == 3) {
    if (!flag) {
      document.getElementById('selectPayment').selectedIndex = 0;
    }
  }
}

function paymentData() {
  let selectPayment = document.getElementById("selectPayment").value;
  let paymentData = document.getElementById("paymentData");
  let paymentData2 = document.getElementById("paymentData2");

  if (selectPayment == 2) {
    document.getElementById("trigger3").click();
    flag = false;
  } else if (selectPayment == 3) {
    document.getElementById("trigger4").click();
    flag = false;
  } else {
    paymentData.classList.add("d-none");
    paymentData2.classList.add("d-none");
  }
}

function enableFileSubmit() {
  var ticket = document.getElementById("ticketFile");
  if (ticket.files.length !== 0) {
    document.getElementById("fileName").classList.remove("d-none");
    document.getElementById("fileName").innerHTML += ` ${ticket.files[0].name}`
    document.getElementById("saveData3").classList.remove("disabled");
    document.getElementById("saveDataDiv3").removeAttribute("data-bs-original-title");
    document.getElementById("saveDataDiv3").removeAttribute("title");
  } else {
    document.getElementById("fileName").classList.add("d-none");
    document.getElementById("fileName").innerHTML = `Archivo: `
    document.getElementById("saveData3").classList.add("disabled");
    document.getElementById("saveDataDiv3").setAttribute("data-bs-original-title", "Completa todos los campos");
    document.getElementById("saveDataDiv3").removeAttribute("title");
  }


}

function shippingTotal() {
  let shippingType = document.getElementById("selectShipping").value;
  if (shippingType == 4) {
    shippingCost = Math.round(subTotal.innerHTML * 0.15);
  } else if (shippingType == 3) {
    shippingCost = Math.round(subTotal.innerHTML * 0.07);
  } else if (shippingType == 2) {
    shippingCost = Math.round(subTotal.innerHTML * 0.05);
  } else {
    shippingCost = 0;
  }
  for (let i = 0; i < productCart.articles.length; i++) {
    changeTotals(i);
  }
  document.getElementById("shippingFee").innerHTML = `${shippingCost}`
}

function checkShipping() {
  var warning = document.getElementById("warning"),
    shippingType = document.getElementById("selectShipping").value,
    payment = document.getElementById("selectPayment").value;
  if (((shippingType == 2) || (shippingType == 3) || (shippingType == 4)) && (payment == 1)) {
    warning.classList.remove("d-none")
  } else if (!(warning.classList.contains("d-none"))) {
    warning.classList.add("d-none")
  }
}
