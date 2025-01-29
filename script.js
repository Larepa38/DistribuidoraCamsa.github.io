let allProducts = []; 

document.getElementById('load-products').addEventListener('click', () => {
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(products => {
            const filteredProducts = allProducts.filter(
                product => product.categoria === selectedCategory
            );
            displayProducts(filteredProducts);  

            allProducts = products; 
            displayProducts(allProducts); 

        })
        .catch(error => {
            console.error('Error:', error);
        });
});

document.getElementById('filter-category').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === 'all') {
        displayProducts(allProducts); 
    } else {
        const filteredProducts = allProducts.filter(
            product => product.categoria === selectedCategory
        );
        displayProducts(filteredProducts); 
    }
});

function displayProducts(products) {
    const container = document.getElementById('product-container');
    container.innerHTML = ''; 
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
            <h3>${product.nombre}</h3>
            <p>Precio: $${product.precio}</p>
            <p>Categoría: ${product.categoria}</p>
        `;
        container.appendChild(productDiv);
    });
}
