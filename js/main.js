document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    const loader = document.getElementById('loader');
    let allProducts = [];

    loader.style.display = 'block';

    // Fetch products from JSON
    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);

            loader.style.display = 'none';
        });

    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            const formattedPrice = Number(product.price).toLocaleString();
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${formattedPrice} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // Inefficient Search
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredProducts = allProducts.filter(product => {
            // Simple search, not very efficient
            return product.name.toLowerCase().includes(searchTerm);
        });
        displayProducts(filteredProducts);
    });
});