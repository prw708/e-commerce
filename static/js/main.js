window.addEventListener("load", setup, false);

function setup() {
  var collapseCart = document.getElementById("collapseCart");
  if (collapseCart) {
    collapseCart.addEventListener("shown.bs.collapse", cartAddHandler, false);
    collapseCart.addEventListener("hidden.bs.collapse", cartRemoveHandler, false);
  }
}

function cartAddHandler(event) {
  document.addEventListener("click", cartHandler, false);
}

function cartRemoveHandler(event) {
  document.removeEventListener("click", cartHandler, false);
}

function cartHandler(event) {
  var collapseCart = document.getElementById("collapseCart");
  var cart = document.getElementById("cart");
  var cartBtn = document.getElementById("cartButton");
  var closeBtn = document.getElementById("closeCart");
  if (!cart.contains(event.target) && !cartBtn.contains(event.target) || closeBtn.contains(event.target)) {
    new bootstrap.Collapse(collapseCart, { hide: true });
  }
}
