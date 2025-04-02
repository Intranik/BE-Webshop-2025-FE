// // Function to load the cart from localStorage and display it
// const loadCart = () => {
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const cartProductList = document.getElementById('cart-product-list');
//     const totalProducts = cart.length;
//     let totalPrice = 0;

//     // Clear the cart list before adding items
//     cartProductList.innerHTML = '';

//     cart.forEach(product => {
//       // Create a list item for each product in the cart
//       const productLi = document.createElement('li');
//       productLi.classList.add('list-group-item', 'shadow-sm');
      
//       const productTitle = document.createElement('p');
//       productTitle.classList.add('text-dark');
//       productTitle.textContent = product.name;

//       const productPrice = document.createElement('p');
//       productPrice.classList.add('text-danger', 'fs-4');
//       productPrice.textContent = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(product.price);
      
//       productLi.append(productTitle, productPrice);
//       cartProductList.appendChild(productLi);

//       // Update total price
//       totalPrice += product.price;
//     });

//     // Display total products and total price
//     document.getElementById('total-products').textContent = totalProducts;
//     document.getElementById('total-price').textContent = new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(totalPrice);
//   }

//   // Call the function when the page loads
//   window.addEventListener('DOMContentLoaded', loadCart);