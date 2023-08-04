document.addEventListener("DOMContentLoaded", function () {
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartIcon = document.getElementById("cart-icon");
  const closeSidebar = document.getElementById("close-sidebar");

  cartIcon.addEventListener("click", function () {
    cartSidebar.classList.add("show-cart");
    cartOverlay.style.display = "block";
    toggleCartContentOverflow(true); // Show the scrollbar when the cart is shown
  });

  closeSidebar.addEventListener("click", function () {
    cartSidebar.classList.remove("show-cart");
    cartOverlay.style.display = "none";
    toggleCartContentOverflow(false); // Hide the scrollbar when the cart is hidden
  });
});

function toggleCartContentOverflow(show) {
  const cartContent = document.querySelector(".cart-content");
  cartContent.style.overflowY = show ? "auto" : "hidden";
}

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  console.log(removeCartButtons);
  for (var i = 0; i < removeCartButtons.length; i++) {
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  //quantity changes
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  // Add To Cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //buy Button work
  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

{
  /* // Buy Button */
}
function buyButtonClicked() {
  alert("Your Order is placed");
  var cartContent = document.getElementsByClassName("cart-content")[0]; // Corrected the class name
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
}

{
  /* // remove item from cart */
}
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

{
  /* //quantity changes */
}
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

{
  /* // Add To Cart */
}
function addCartClicked(event) {
  event.preventDefault(); // Add this line to prevent the default behavior

  var button = event.target;
  var shopProduct = button.closest(".card");
  var titleElement = shopProduct.querySelector(".card-title");
  var priceElement = shopProduct.querySelector(
    ".card-body .d-flex div:first-child"
  );
  var productImg = shopProduct.querySelector(".card-img-top");

  if (titleElement && priceElement && productImg) {
    var title = titleElement.innerHTML;
    var price = priceElement.innerText;
    var imgSrc = productImg.src;
    addProductToCart(title, price, imgSrc);
    updatetotal();
  }
}

function addProductToCart(title, price, imgSrc) {
  var cartShopBox = document.createElement("div");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

  for (var i = 0; i < cartItemsNames.length; i++) {
    alert("you have already add this item to cart");
  }

  var cartBoxContent = `
   <img
      src="${imgSrc}"
      alt=""
      class="cart-img col-4 col-md-3 col-lg-2"
      style="
        width: 100px;
        height: 100px;
        object-fit: contain;
        padding: 10px;
      "
    />
    <div class="detail-box col-7 col-md-6 col-lg-5 ms-2 ">
      <div class="cart-product-title text-uppercase fs-6 ">${title}</div>
      <div class="cart-price font-weight-bold ">${price}</div>
      <input
        type="number"
        value="1"
        class="cart-quantity form-control mt-2"
        style="
          border: 1px solid white;
          outline-color: rgb(255, 0, 0);
          text-align: center;
          font-size: 1rem;
          width: 60px;
        "
      />
      <!-- remove cart -->
    
  
    </div>
      <i
      class="bx bxs-trash-alt col-1 col-md-2 col-lg-1 text-danger fs-3 cart-remove"
      style="cursor: pointer"
    ></i>
  `;

  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  cartShopBox.innerHTML = cartBoxContent;

  cartItems.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

  updatetotal();
}

{
  /* //update Total */
}
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerHTML.replace("$", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;

    //if price contains some cents value
    total = Math.round(total * 100) / 100;
  }

  document.getElementsByClassName("total-price")[0].innerHTML = "$" + total;
}
