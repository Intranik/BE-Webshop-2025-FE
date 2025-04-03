const cart = JSON.parse(localStorage.getItem("cart")) || [];
const shippingCost = 49; // Fixed shipping cost
const taxRate = 0.12;

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateSummary();
}

function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";
    
    cart.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("card", "mb-2", "p-2", "d-flex", "align-items-center", "flex-row");

        const productImg = document.createElement("img");
        productImg.src = product.image_url;
        productImg.style.width = "50px";
        
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("btn", "btn-danger", "btn-sm", "px-2", "py-1");
        removeBtn.onclick = () => removeFromCart(product.id);

        const productInfo = document.createElement("div");
        productInfo.classList.add("mx-3");
        productInfo.innerHTML = `<strong>${product.name}</strong> - ${product.price} SEK`;

        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("d-flex", "align-items-center", "ms-auto");
        
        const minusBtn = document.createElement("button");
        minusBtn.textContent = "-";
        minusBtn.classList.add("btn", "btn-outline-secondary", "me-1");
        minusBtn.onclick = () => changeQuantity(product.id, -1);
        
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = product.quantity;
        quantityInput.classList.add("form-control", "text-center");
        quantityInput.style.width = "50px";
        quantityInput.readOnly = true;
        
        const plusBtn = document.createElement("button");
        plusBtn.textContent = "+";
        plusBtn.classList.add("btn", "btn-outline-secondary", "ms-1");
        plusBtn.onclick = () => changeQuantity(product.id, 1);
        
        quantityContainer.append(minusBtn, quantityInput, plusBtn);
        productCard.append(removeBtn, productImg, productInfo, quantityContainer);
        cartContainer.append(productCard);
    });
    
    if (cart.length > 0) {
        const continueBtnContainer = document.createElement("div");
        continueBtnContainer.classList.add("card", "p-3", "mt-2", "text-center");
        
        const continueBtn = document.createElement("button");
        continueBtn.textContent = "Continue";
        continueBtn.classList.add("btn", "btn-primary");
        
        continueBtnContainer.append(continueBtn);
        cartContainer.append(continueBtnContainer);
    }
    updateSummary();
}

function changeQuantity(id, amount) {
    let product = cart.find(item => item.id === id);
    if (product) {
        product.quantity += amount;
        if (product.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    updateCart();
}

function updateSummary() {
    const totalProductPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalTax = totalProductPrice * taxRate;
    const totalCost = totalProductPrice + shippingCost;
    
    document.getElementById("total-product-price").textContent = `${totalProductPrice} SEK`;
    document.getElementById("tax").textContent = `${totalTax.toFixed(2)} SEK`;
    document.getElementById("shipping-cost").textContent = `${shippingCost} SEK`;
    document.getElementById("total-cost").textContent = `${totalCost} SEK`;
}