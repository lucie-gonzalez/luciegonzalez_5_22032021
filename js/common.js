  
function createTag(tag, className, content, parent, attributes) {
    const element = document.createElement(tag)
    element.className = className
    element.innerHTML = content
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    parent.appendChild(element)
    return element
}


function teddiesNumber() {
    const storedTeddies = JSON.parse(localStorage.getItem('addTeddy'))
    const basketTeddies = document.getElementById("basket_teddies")
    if (storedTeddies) {
        const count = storedTeddies.reduce((sum, item) => sum += item.quantity, 0)
        const counter = createTag('span', 'd-none d-sm-block bg-dark text-light px-2 rounded-circle', count, basketTeddies, null)
    }
}
teddiesNumber()