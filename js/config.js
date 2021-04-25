const APIURL = 'http://localhost:3000/api/teddies/'


function productNumber() {
    const cartRepository = JSON.parse(localStorage.getItem('productCart'))
    const cart_produits = document.getElementById("cart_produits")
    if (cartRepository) {
        const count = cartRepository.reduce((sum, item) => sum += item.quantity, 0)
        const counter = createTag('span', 'd-none d-sm-block bg-dark text-light px-2 rounded-circle', count, cart_produits, null)
    }
}
productNumber()