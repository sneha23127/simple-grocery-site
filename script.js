const items = [
    { id: 1, name: 'Apples', price: 2.5, img: 'https://img.icons8.com/color/96/apple.png' },
    { id: 2, name: 'Bananas', price: 1.2, img: 'https://img.icons8.com/color/96/banana.png' },
    { id: 3, name: 'Carrots', price: 1.8, img: 'https://img.icons8.com/color/96/carrots.png' },
    { id: 4, name: 'Milk', price: 2.0, img: 'https://img.icons8.com/color/96/milk-bottle.png' },
    { id: 5, name: 'Bread', price: 2.2, img: 'https://img.icons8.com/color/96/bread.png' },
    { id: 6, name: 'Eggs', price: 3.0, img: 'https://img.icons8.com/color/96/eggs.png' }
];

const cart = [];

function renderItems() {
    const list = document.getElementById('items-list');
    list.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        list.appendChild(div);
    });
}

function addToCart(id) {
    const found = cart.find(i => i.id === id);
    if (found) {
        found.qty += 1;
    } else {
        const item = items.find(i => i.id === id);
        cart.push({ ...item, qty: 1 });
    }
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function renderCart() {
    const ul = document.getElementById('cart-items');
    ul.innerHTML = '';
    if (cart.length === 0) {
        ul.innerHTML = '<li>Your cart is empty.</li>';
        return;
    }
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} x${item.qty} - $${(item.price * item.qty).toFixed(2)}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        ul.appendChild(li);
    });
}

function removeFromCart(id) {
    const idx = cart.findIndex(i => i.id === id);
    if (idx > -1) {
        cart[idx].qty -= 1;
        if (cart[idx].qty === 0) cart.splice(idx, 1);
    }
    updateCartCount();
    renderCart();
}

document.getElementById('cart-btn').onclick = function() {
    document.getElementById('cart-modal').classList.remove('hidden');
    renderCart();
};
document.getElementById('close-cart').onclick = function() {
    document.getElementById('cart-modal').classList.add('hidden');
};

renderItems();
updateCartCount();
