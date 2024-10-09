document.addEventListener('DOMContentLoaded', () => {
    const products = [
      { id: 1, name: "item1", price: 23 },
      { id: 2, name: "item2", price: 33 },
      { id: 3, name: "item3", price: 43 },
      { id: 4, name: "item4", price: 53 },
      { id: 5, name: "item5", price: 63 },
    ];
    const cart = [];

    const productLists = document.querySelector(".products");
    const cartTotal = document.querySelector(".total");
    const cartItem = document.querySelector(".cart-item");
    const checkoutBtn = document.querySelector(".checkout");

    products.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>`
        productLists.appendChild(productDiv);
    })

    productLists.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const prodId = parseInt(e.target.getAttribute('data-id'))
            const product = products.find((p) => p.id === prodId);
            addTOCart(product);
        }
    })

    const addTOCart = (product) => {
        const cartItem = cart?.find((item) => item.id === product.id);

        if (cartItem) {
            if (cartItem.quantity < 10) {
                cartItem.quantity += 1;
                cartItem.totalPrice = cartItem.quantity * product.price;
            } else {
                alert('Maximum quantity reached for this item.');
            }
        } else {
            cart.push({ ...product, quantity: 1, totalPrice: product.price });
        }
      renderCart();
    };

    const renderCart = () => {
      cartItem.innerText = "";
      let totalPrice = 0;
      if (cart.length > 0) {
        cart.forEach((prod) => {
          totalPrice += prod.totalPrice;
          let itemDiv = document.createElement("div");
          itemDiv.classList.add("cart-item-container");
          itemDiv.innerHTML = `<span>${prod.name} - $${prod.totalPrice.toFixed(
            2
          )} -qty ${prod.quantity}</span>`;
          cartItem.append(itemDiv);
          cartTotal.textContent = `$${totalPrice}`;
        });
      } else {
        cartTotal.textContent = "$0.00";
      }
    };
    checkoutBtn.addEventListener('click', () => {
        cart.length = 0;
        alert('Checkout is successfull');
        renderCart();
    })
})
