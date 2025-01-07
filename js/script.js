const products = document.getElementById("products");
const arrowExpand = document.querySelector(".arrow-expand");
const productsListInfo = document.querySelector(".products-list-info");
const listItem = document.querySelector(".list-item ");
const closeList = document.querySelector("main");

const cart = document.querySelector(".cart");
const closeCart = document.querySelector(".background-cart");
const containerCart = document.querySelector(".container-cart");
const productsToCart = document.querySelector(".container-info-to-cart");

const chatBot = document.querySelector(".chat-bot");
const chatBotButton = document.querySelector(".chatbot-button");
const closeChatBot = document.querySelector(".background-chatbot");

const promotionListOne = document.querySelector(".container-promotion-info-1")
const promotionListTwo = document.querySelector(".container-promotion-info-2")
const promotionListTree = document.querySelector(".container-promotion-info-3")
const promotionListFour = document.querySelector(".container-promotion-info-4")

const iphoneListOne = document.querySelector(".iphone-list-1");
const iphoneListTwo = document.querySelector(".iphone-list-2");

const smartphonesListOne = document.querySelector(".smartphone-list-1");
const smartphonesListTwo = document.querySelector(".smartphone-list-2");
const smartphonesListTree = document.querySelector(".smartphone-list-3");

const smartwatchsList = document.querySelector(".smartwatch-list");

const accessoriesListOne = document.querySelector(".accessories-list-1");
const accessoriesListTwo = document.querySelector(".accessories-list-2");
const accessoriesListTree = document.querySelector(".accessories-list-3");

function buttonScrolled() {
  const buttonLogin = document.getElementById("myButton");

  window.addEventListener('scroll', () => {
    if (window.scrollY > 220) {
      buttonLogin.classList.add('scrolled');
    } else {
      buttonLogin.classList.remove('scrolled');
    }
  });
} 
buttonScrolled();

function visibleProductsList() {
  productsListInfo.style.visibility = "visible"
  productsListInfo.style.transform = "translateY(0)"
  productsListInfo.style.opacity = "1"
  productsListInfo.style.transition = "0.3s ease-in-out"
  addRotateArrow();
}

function hiddenProductsList() {
  productsListInfo.style.visibility = "hidden"
  productsListInfo.style.transform = "translateY(-10%)"
  productsListInfo.style.opacity = "0"
  productsListInfo.style.transition = "0.1s ease"
  removeRotateArrow();
}

function addRotateArrow() {
  arrowExpand.classList.add("rotate");
}

function removeRotateArrow() {
  arrowExpand.classList.remove("rotate");
}

products.addEventListener("click", () => {
  if (productsListInfo.style.visibility === "visible") {
    hiddenProductsList();
  } else {
    visibleProductsList();
  }
});
productsListInfo.addEventListener("click", hiddenProductsList);
closeList.addEventListener("click", hiddenProductsList);


function visibleCartItens() {
  containerCart.style.visibility = "visible"
  closeCart.style.visibility = "visible"
}

function hiddenCartItens() {
  containerCart.style.visibility = "hidden"
  closeCart.style.visibility = "hidden"
}

cart.addEventListener("click", visibleCartItens);
closeCart.addEventListener("click", hiddenCartItens);


function visibleChatBot() {
  chatBot.style.visibility = "visible"
  chatBot.style.transform = "translateY(0)"
  chatBot.style.opacity = "1"
  chatBot.style.transition = "0.3s ease-in-out"
  closeChatBot.style.visibility = "visible"
}

function hiddenChatBot() {
  chatBot.style.visibility = "hidden"
  chatBot.style.transform = "translateY(30%)"
  chatBot.style.opacity = "0"
  chatBot.style.transition = "0.1s ease"
  closeChatBot.style.visibility = "hidden"
}

chatBotButton.addEventListener("click", visibleChatBot);
closeChatBot.addEventListener("click", hiddenChatBot);


let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function getAllProducts() {
  const promotionalProducts = [
    ...listPromotionProducts1,
    ...listPromotionProducts2,
    ...listPromotionProducts3,
    ...listPromotionProducts4
  ];

  const regularProducts = [
    ...productsiPhonesListOne,
    ...productsiPhonesListTwo,
    ...productsSmartphonesListOne,
    ...productsSmartphonesListTwo,
    ...productsSmartphonesListTree,
    ...productsSmartwatchsList,
    ...productsAccessoriesListOne,
    ...productsAccessoriesListTwo,
    ...productsAccessoriesListTree
  ];

  return [
    ...promotionalProducts.map((product, index) => ({
      ...product,
      globalIndex: index,
      isPromotional: true
    })),
    ...regularProducts.map((product, index) => ({
      ...product,
      globalIndex: promotionalProducts.length + index,
      isPromotional: false
    }))
  ];
}

function getRegularProducts() {
  const regularProducts = [
    ...productsiPhonesListOne,
    ...productsiPhonesListTwo,
    ...productsSmartphonesListOne,
    ...productsSmartphonesListTwo,
    ...productsSmartphonesListTree,
    ...productsSmartwatchsList,
    ...productsAccessoriesListOne,
    ...productsAccessoriesListTwo,
    ...productsAccessoriesListTree
  ];

  const promotionalProducts = [
    ...listPromotionProducts1,
    ...listPromotionProducts2,
    ...listPromotionProducts3,
    ...listPromotionProducts4
  ];

  return regularProducts.map((product, index) => ({
    ...product,
    globalIndex: promotionalProducts.length + index,
    isPromotional: false
  }));
}

function generateProductHTML(product, index, listType) {
  let baseHTML = `
    <div class="${listType}">
      <h2>${product.name}</h2>
      <img src="${product.src}" alt="${product.name}" class="smartphones-image">
      <div class="avaliation">
        <div class="stars">
          <img src="assets/Star.png" alt="estrela de avaliação">
          <img src="assets/Star.png" alt="estrela de avaliação">
          <img src="assets/Star.png" alt="estrela de avaliação">
          <img src="assets/Star.png" alt="estrela de avaliação">
          <img src="assets/Star.png" alt="estrela de avaliação">
        </div>
        <p class="number-of-reviews">${product.avaliation}</p>
      </div>
      <h4>R$${product.price} <span>à vista</span></h4>
      <p class="installment">${product.installment}</p>
      ${product.details ? `<p class="details">${product.details}</p>` : ''}
      <div class="buttons-product">
        <button class="buy-now">Comprar</button>
        <button class="add-to-cart" data-id="${index}">+<img src="assets/cart.png" alt="shopping cart icon"></button>
      </div>
    </div>
  `;
  return baseHTML;
}

function generatePromotionHTML(product, index) {
  return `
    <div class="promotion-info">
      <p class="info-of-the-day">Promoção do Dia</p>
      <h1>${product.name}</h1>
      <h3 class="new-value">De: <spam>R$${product.price}</spam> por apenas</h3>
      <h4>R$${product.newPrice} <span>à vista</span></h4>
      <p class="installment">${product.installment}</p>
      <div class="buttons-product">
        <button class="buy-now">Comprar</button>
        <button class="add-to-cart" data-id="${index}">+ <img src="assets/cart.png" alt="shopping cart icon"></button>
      </div>
    </div>
    <div class="phone">
      <img src="assets/nuvem-mascara.png" class="nuvem-img">
      <img src=${product.src} alt="imagem item promotion" class="image-item">
    </div>
  `;
}

function renderList(products, container, listType, startIndex) {
  let html = '';
  products.forEach((product, i) => {
    const globalIndex = startIndex + i;
    if (listType === 'promotion') {
      html += generatePromotionHTML(product, globalIndex);
    } else {
      html += generateProductHTML(product, globalIndex, listType);
    }
  });
  container.innerHTML = html;
}

function initializeLists() {
  let promotionIndex = 0;

  renderList(listPromotionProducts1, promotionListOne, 'promotion', promotionIndex);
  promotionIndex += listPromotionProducts1.length;

  renderList(listPromotionProducts2, promotionListTwo, 'promotion', promotionIndex);
  promotionIndex += listPromotionProducts2.length;

  renderList(listPromotionProducts3, promotionListTree, 'promotion', promotionIndex);
  promotionIndex += listPromotionProducts3.length;

  renderList(listPromotionProducts4, promotionListFour, 'promotion', promotionIndex);
  promotionIndex += listPromotionProducts4.length;

  const totalPromotionalProducts = listPromotionProducts1.length +
    listPromotionProducts2.length +
    listPromotionProducts3.length +
    listPromotionProducts4.length;

  let regularIndex = totalPromotionalProducts;

  renderList(productsiPhonesListOne, iphoneListOne, 'list-iphones', regularIndex);
  regularIndex += productsiPhonesListOne.length;

  renderList(productsiPhonesListTwo, iphoneListTwo, 'list-iphones', regularIndex);
  regularIndex += productsiPhonesListTwo.length;

  renderList(productsSmartphonesListOne, smartphonesListOne, 'list-smartphones', regularIndex);
  regularIndex += productsSmartphonesListOne.length;

  renderList(productsSmartphonesListTwo, smartphonesListTwo, 'list-smartphones', regularIndex);
  regularIndex += productsSmartphonesListTwo.length;

  renderList(productsSmartphonesListTree, smartphonesListTree, 'list-smartphones', regularIndex);
  regularIndex += productsSmartphonesListTree.length;

  renderList(productsSmartwatchsList, smartwatchsList, 'list-smartwatchs', regularIndex);
  regularIndex += productsSmartwatchsList.length;

  renderList(productsAccessoriesListOne, accessoriesListOne, 'list-accessories', regularIndex);
  regularIndex += productsAccessoriesListOne.length;

  renderList(productsAccessoriesListTwo, accessoriesListTwo, 'list-accessories', regularIndex);
  regularIndex += productsAccessoriesListTwo.length;

  renderList(productsAccessoriesListTree, accessoriesListTree, 'list-accessories', regularIndex);
}

function updateCartCounter() {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartButton = document.querySelector('.cart');
  let counterElement = document.querySelector('.cart-counter');

  if (!counterElement) {
    const counter = document.createElement('div');
    counter.className = 'cart-counter';
    cartButton.style.position = 'relative';
    cartButton.appendChild(counter);
  }

  counterElement = document.querySelector('.cart-counter');
  if (counterElement) {
    if (totalItems > 0) {
      counterElement.textContent = totalItems;
      counterElement.style.display = 'flex';
    } else {
      counterElement.style.display = 'none';
    }
  }
}

function addToCart(event) {
  const button = event.currentTarget;
  const productIndex = parseInt(button.getAttribute('data-id'));
  const allProducts = getAllProducts();
  const selectedProduct = allProducts[productIndex];

  if (!selectedProduct) {
    console.error('Produto não encontrado:', productIndex);
    return;
  }

  const existingProduct = cartItems.find(item => item.name === selectedProduct.name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cartItems.push({ ...selectedProduct, quantity: 1 });
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartDisplay();
}

function updateQuantity(index, change) {
  const newQuantity = cartItems[index].quantity + change;
  if (newQuantity > 0) {
    cartItems[index].quantity = newQuantity;
  } else {
    cartItems.splice(index, 1);
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartDisplay();
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  updateCartDisplay();
}

function formatPrice(price) {
  if (typeof price === 'string') {
    return parseFloat(price.replace('.', '').replace(',', '.'));
  }
  return price;
}

function calculateTotal() {
  return cartItems.reduce((total, item) => {
    return total + (formatPrice(item.price) * item.quantity);
  }, 0);
}

function updateCartDisplay() {
  const cartContainer = document.querySelector('.container-info-to-cart');

  if (cartItems.length === 0) {
    cartContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio</p>';
  } else {
    let cartHTML = cartItems.map((product, index) => `
      <div class="info-to-cart" data-index="${index}">
        <div class="image-item">
          <img class="img-item-cart" src="${product.src}" alt="${product.name}">
        </div>
        <div class="info-item">
          <div>
            <p class="info-product-to-cart">${product.name}</p>
          </div>
          <div class="price-product-to-cart">
            <div class="counter-item">
              <button class="decrement" onclick="updateQuantity(${index}, -1)">
                <p class="button-">-</p>
              </button>
              <span class="count">${product.quantity}</span>
              <button class="increment" onclick="updateQuantity(${index}, 1)">
                <p class="button+">+</p>
              </button>
            </div>
            <p class="price-product">R$ ${(formatPrice(product.price) * product.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
        <div class="container-delet-button">
          <button class="delet-icon" onclick="removeItem(${index})">
            <img src="assets/lixo-icon.png" alt="delet-icon" width="18px">
          </button>
        </div>
      </div>
    `).join('');

    const total = calculateTotal();
    cartHTML += `
      <div class="cart-total">
        <h3>Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
      </div>
    `;

    cartContainer.innerHTML = cartHTML;
  }

  updateCartCounter();
}

function createSearchResultsContainer() {
  let container = document.querySelector('.search-results-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'search-results-container';
    const searchForm = document.querySelector('.search-form');
    searchForm.appendChild(container);
  }
  return container;
}

function displaySearchResults(results) {
  const containerSearch = createSearchResultsContainer();

  if (results.length === 0) {
    containerSearch.innerHTML = '<p class="no-results">Produto não encontrado</p>';
    return;
  }

  const resultsHTML = results.map((product) => `
  <div class="search-result-item">
    <div class="search-result-image">
      <img src="${product.src}" alt="${product.name}" class="result-image-item">
    </div>
    <div class="search-result-info">
      <h3>${product.name}</h3>
      <p class="search-result-price">R$${product.price}</p>
    </div>
    <button class="add-to-cart" data-id="${product.globalIndex}">
      +<img src="assets/cart.png" alt="shopping cart icon">
    </button>
  </div>
`).join('');

containerSearch.innerHTML = resultsHTML;
containerSearch.style.display = 'block';

containerSearch.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });
}

function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector('.input-search');
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm === '') {
    const containerSearch = document.querySelector('.search-results-container');
    if (containerSearch) {
      containerSearch.style.display = 'none';
    }
    return;
  }

  const regularProducts = getRegularProducts();
  const results = regularProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  displaySearchResults(results);
}

const style = document.createElement('style');

document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  initializeLists();

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
  });

  const searchForm = document.querySelector('.search-form');
  searchForm.addEventListener('submit', handleSearch);

  const searchInput = document.querySelector('.input-search');
  searchInput.addEventListener('input', handleSearch);

  document.addEventListener('click', (event) => {
    const containerSearch = document.querySelector('.search-results-container');
    const searchForm = document.querySelector('.search-form');

    if (containerSearch && !searchForm.contains(event.target)) {
      containerSearch.style.display = 'none';
    }
  });

  updateCartCounter();
  updateCartDisplay();
});

document.querySelectorAll('.products-list-info a, a[href="#contact"], a[href="#home"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    hiddenProductsList();
  });
});

$(document).ready(function () {
  $('#carouselExampleControls, #carouselExampleControls1, #carouselExampleControls2').carousel({
    interval: false
  });
});

$(document).ready(function () {
  $('#carouselExampleIndicators').carousel({
    interval: 3500
  });
});