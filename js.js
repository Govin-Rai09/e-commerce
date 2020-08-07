if (document.readyState == `loading`) {
  document.addEventListener(`DOMContentLoaded`, ready);
} else {
  ready();
}
function ready() {
  const remBtn = document.querySelectorAll(`.cart-btn`);
  for (let i = 0; i < remBtn.length; i++) {
    let btn = remBtn[i];
    btn.addEventListener(`click`, removeItem);
  }
  const quanIn = document.querySelectorAll(`.quan`);
  for (let i = 0; i < quanIn.length; i++) {
    let btn = quanIn[i];
    btn.addEventListener(`change`, quanChange);
  }
  const addItem = document.querySelectorAll(`.item-btn`);
  for (let i = 0; i < addItem.length; i++) {
    let add = addItem[i];
    add.addEventListener(`click`, addItemC);
  }
  document
    .getElementsByClassName(`btn-pur`)[0]
    .addEventListener(`click`, purchCli);
}
function removeItem(e) {
  const item = e.target;
  item.parentElement.parentElement.remove();
  updateCart();
}
function quanChange(e) {
  const item = e.target;
  if (isNaN(item.value) || item.value <= 0) {
    item.value = 1;
  }
  updateCart();
}
function addItemC(e) {
  const item = e.target;
  let shopItems = item.parentElement.parentElement;
  let title = shopItems.getElementsByClassName(`item-t`)[0].innerText;
  let price = shopItems.getElementsByClassName(`item-p`)[0].innerText;
  let imgSrc = shopItems.getElementsByClassName(`item-img`)[0].src;
  addToCon(title, price, imgSrc);
  updateCart();
}
function addToCon(title, price, imgSrc) {
  const cartRow = document.createElement(`div`);
  cartRow.classList.add(`cart-r`);
  const cartItems = document.getElementsByClassName(`cart-items`)[0];
  const cartItmTit = cartItems.getElementsByClassName(`cart-t`);
  for (let i = 0; i < cartItmTit.length; i++) {
    if (cartItmTit[i].innerText == title) {
      alert(`its added`);
      return;
    }
  }
  let cartCon = `<div class="cart-r cart-c">
            <img
              src="${imgSrc}"
              alt=""
              class="cart-img"
              height="100"
              width="100"
            />
            <span class="cart-t">${title}</span>
            <span class="cart-p">${price}</span>
            </div>
            <div class="cart-q cart-c">
              <input type="number" value="1" class="quan" />
              <button class="btn btn-primary cart-btn">remove</button>
          </div>`;
  cartRow.innerHTML = cartCon;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName(`cart-btn`)[0]
    .addEventListener(`click`, removeItem);
  cartRow
    .getElementsByClassName(`quan`)[0]
    .addEventListener(`change`, quanChange);
}
function purchCli() {
  alert(`thanks for visiting`);
  const cartItems = document.getElementsByClassName(`cart-items`)[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCart();
}
function updateCart() {
  const cartRows = document.getElementsByClassName(`cart-r`);
  let tot = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    const priceEl = cartRow.getElementsByClassName(`cart-p`)[0];
    const quanEl = cartRow.getElementsByClassName(`quan`)[0];
    if (priceEl == null || quanEl == null) continue;
    let price = parseFloat(priceEl.innerText.replace(`$`, ``));
    let quantity = parseInt(quanEl.value);
    tot += price * quantity;
  }
  tot = Math.round(tot * 100) / 100;
  document.getElementsByClassName(`tot-p`)[0].innerText = `$` + tot;
}
