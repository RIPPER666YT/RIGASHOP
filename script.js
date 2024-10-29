function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function toggleFavorite(button) {
    button.classList.toggle('active');
}

// Функция для поиска товаров (здесь можно добавить логику)
function searchProducts(event) {
    event.preventDefault();
    const query = document.getElementById('searchInput').value;
    // Логика поиска товаров по query
    console.log('Искать товары: ', query);
}
