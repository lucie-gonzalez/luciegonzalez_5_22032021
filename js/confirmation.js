// récupération de l'id de la commande
let orderId = localStorage.getItem('Order')

// récupération du prix total de la commande
let totalPrice = localStorage.getItem('totalPrice')


// Récapitulatif de votre commande
const divRow = document.getElementById('content-top')
const divCol = createTag('div', 'jumbotron col-md-8 teddys m-3 px-0', null, divRow, null)
const h2 = createTag('h2', 'card-title bg-danger text-light font-weight-bold text-center', 'Récapitulatif de votre commande: ', divCol, null)
const order = createTag('p', 'card-text text-center', 'Numéro de commande: ' + orderId, divCol, null)
const price = createTag('p', 'card-text text-center', 'Montant total de votre commande: ' + totalPrice + ' €', divCol, null)
const thanksMessage = createTag('p', 'card-text text-center text-danger font-weight-bold mt-3', "Vos teddies seront bientôt chez vous! Merci d'avoir commandé chez Oriteddies!", divCol, null)

// Efface localStorage
localStorage.clear()