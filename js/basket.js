//Récupération des données du Localstorage
function getStoredTeddies() {
    let storedTeddies = JSON.parse(localStorage.getItem('addTeddy'))
    if (storedTeddies === null || storedTeddies === undefined) {
        storedTeddies = []
    }
    return storedTeddies
}
let storedTeddies = getStoredTeddies()

//Création des bases du panier
const divRow = document.getElementById('content-top')
const divCol = createTag('div', 'jumbotron col-md-8 teddys m-3 px-0', null, divRow, null)
const h2 = createTag('h2', 'card-title bg-danger text-light font-weight-bold text-center', 'Vos Teddies:', divCol, null)




if (storedTeddies === null || storedTeddies.length === 0) {
    // si le panier est vide
    const emptyBasket = createTag('p', 'card-text text-center', 'Votre panier est vide', divCol, null)
    localStorage.clear()
} else {
    // si des teddies sont présents dans le panier : récupération des teddies
    for (let storedTeddy of storedTeddies) {
        const listTeddies = createTag('ul', 'list-inline', null, divCol, null)
        const eachTeddy = createTag('li', 'list-item m-2 d-flex justify-content-between', null, divCol, null)
        const teddiesDetails = createTag('div', null, 'x' + storedTeddy.quantity + ' ' + storedTeddy.teddyName + ", " + storedTeddy.teddyColor, eachTeddy, null)
        const teddyPrice = createTag('div', 'd-flex justify-content-between align-items-center', null, eachTeddy, null)
        const price = createTag('div', null, storedTeddy.teddyPrice * storedTeddy.quantity + '€ ', teddyPrice, null)
        // Création bouton Supprimer
        const deleteBtn = createTag('button', 'btn btn-secondary ml-md-3 fas fa-trash-alt', null, teddyPrice, {
            'data-id': storedTeddy.teddyId,
            'data-color': storedTeddy.teddyColor
        })
        // Ecoute de l'évènement sur le boutton
        function deleteTeddy(e) {
            e.preventDefault()
            const storedTeddy = storedTeddies.filter(teddy => teddy.teddyId == e.target.getAttribute('data-id') && teddy.teddyColor == e.target.getAttribute('data-color'))[0]
            if (storedTeddy.quantity >= 1) {
                storedTeddy.quantity--
                if (storedTeddy.quantity === 0) {
                    const index = storedTeddies.indexOf(storedTeddy)
                    storedTeddies.splice(index, 1)
                }
            }
            //Enregistrement du nouveau localStorage
            localStorage.setItem('addTeddy', JSON.stringify(storedTeddies))
            JSON.parse(localStorage.getItem('addTeddy'))

            alert('Cet article a bien été supprimé !')
            window.location.href = "basket.html"
        }
        deleteBtn.addEventListener('click', deleteTeddy)
    }

    let calculPrice = []
    for (storedTeddy of storedTeddies) {
        let article = storedTeddy.teddyPrice * storedTeddy.quantity
        calculPrice.push(article)
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const totalPrice = calculPrice.reduce(reducer, 0)

    const total = createTag('p', 'card-text text-center text-danger font-weight-bold m-3', 'Montant total du panier = ' + totalPrice + ' €', divCol, null)

    // Création bouton vider le panier
    const deleteDivCol = createTag('div', 'col-md-5 text-center mx-auto', null, divCol, null)
    const deleteAll = createTag('button', 'btn btn-danger', 'Vider le panier', deleteDivCol, null)

    function deleteBasket(e) {
        e.preventDefault();
        localStorage.removeItem('addTeddy')
        alert('Votre panier a bien été vidé !')
        window.location.href = "basket.html"
    }
    deleteAll.addEventListener("click", deleteBasket)

    // Création du formulaire de commande
    const form = createTag('form', 'card-body text-center col-md-8 m-3 mx-auto shadow', null, divCol, null)
    const h3 = createTag('h3', 'm-md-5 text-center', 'Merci de remplir ce formulaire pour valider votre commande', form, null)

    // Création fonctions validité prénom, nom, ville, code postal, mail
    function validName(value) {
        return /^[A-Z-a-zéèàùôê\s]{3,40}$/.test(value)
    }

    // Création fonctions validité adresse
    function validAddress(value) {
        return /^[A-Z-a-z-0-9éèàùôê\s]{5,80}$/.test(value)
    }

    // Création fonctions validité code postal
    function validPostalCode(value) {
        return /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/.test(value)
    }

    // Création fonctions validité mail
    function validMail(value) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
    }

    // Ajout formulaire prénom
    const formFirstName = createTag('div', 'form-group', null, form, null)
    const labelFirstName = createTag('label', null, 'Votre prénom:', formFirstName, {
        'for': 'prénom'
    })
    const firstName = createTag('input', null, null, formFirstName, {
        'type': 'text',
        'class': 'form-control',
        'name': 'Prénom',
        'required': 'true'
    })

    // Vérification de la validité du prénom
    firstName.addEventListener('change', function (event) {
        if (validName(firstName.value)) {} else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            event.preventDefault()
        }
    })

    // Ajout formulaire nom
    const formLastName = createTag('div', 'form-group', null, form, null)
    const labelLastName = createTag('label', null, 'Votre nom: ', formLastName, {
        'for': 'nom'
    })
    const lastName = createTag('input', null, null, formLastName, {
        'type': 'text',
        'class': 'form-control',
        'name': 'nom',
        'required': 'true'
    })

    // Vérification validité du nom
    lastName.addEventListener('change', function (e) {
        if (validName(lastName.value)) {} else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            e.preventDefault()
        }
    })

    // Ajout formulaire adresse
    const formAddress = createTag('div', 'form-group', null, form, null)
    const labelAddress = createTag('label', null, 'Votre adresse: ', formAddress, {
        'for': 'adresse'
    })
    const address = createTag('textarea', null, null, formAddress, {
        'type': 'text',
        'class': 'form-control',
        'name': 'Adresse',
        'required': 'true'
    })

    // Vérification validité de l'adresse
    address.addEventListener('change', function (e) {
        if (validAddress(address.value)) {} else {
            e.preventDefault()
            alert("Aucun symbole n'est autorisé.")
        }
    })

    // Ajout formulaire code postal
    const formPostalCode = createTag('div', 'form-group', null, form, null)
    const labelPostalCode = createTag('label', null, 'Votre code postal: ', formPostalCode, {
        'for': 'code postal'
    })
    const postalCode = createTag('input', null, null, formPostalCode, {
        'type': 'text',
        'class': 'form-control',
        'name': 'code postal',
        'required': 'true'
    })

    // Vérification validité du code postal
    postalCode.addEventListener('change', function (e) {
        if (validPostalCode(postalCode.value)) {} else {
            alert("Aucune lettre ou symbole n'est autorisé.")
            e.preventDefault()
        }
    })
    // Ajout formulaire ville
    const formCity = createTag('div', 'form-group', null, form, null)
    const labelCity = createTag('label', null, 'Votre ville: ', formCity, {
        'for': 'ville'
    })
    const city = createTag('input', null, null, formCity, {
        'type': 'text',
        'class': 'form-control',
        'name': 'Ville',
        'required': 'true'
    })

    //Vérification validité de la ville
    city.addEventListener('change', function (e) {
        if (validName(city.value)) {} else {
            alert("Aucun chiffre ou symbole n'est autorisé.")
            e.preventDefault()
        }
    })

    // Ajout formulaire mail
    const formMail = createTag('div', 'form-group', null, form, null)
    const labelMail = createTag('label', null, 'Votre adresse mail: ', formMail, {
        'for': 'email'
    })
    const mail = createTag('input', null, null, formMail, {
        'type': 'email',
        'class': 'form-control',
        'name': 'mail',
        'required': 'true'
    })

    // Vérification de la validité du mail
    mail.addEventListener("change", function (e) {
        if (validMail(mail.value)) {} else {
            e.preventDefault()
            alert("Veuillez saisir une adresse mail valide (exemple : abcd@mail.com).")
        }
    })

    // Création bouton validation de commande
    const submit = createTag('button', 'btn btn-danger', 'Validez votre commande', form, {
        'type': 'submit',
        'name': 'add',
        'id': 'valid'
    })

    // Envoi des données panier + contact au serveur si le formulaire est valide
    function confirmation(e) {
        if (validName(firstName.value) && validName(lastName.value) && validAddress(address.value) && validName(city.value) && validMail(mail.value)) {
            e.preventDefault()

            // Envoi du totalPrice au localStorage
            localStorage.setItem('totalPrice', totalPrice)
            const storagePrice = localStorage.getItem('totalPrice')

            // Création de l'objet contact
            let contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                postalCode: postalCode.value,
                city: city.value,
                email: mail.value,
            }


            // Création du tableau products
            let products = []
            for (storedTeddy of storedTeddies) {
                let productsId = storedTeddy.teddyId
                products.push(productsId)
            }


            // Création d'un objet regroupant contact et produits
            let send = {
                contact,
                products,
            }
            // Envoi des données au serveur
            const post = async function (data) {
                try {
                    let response = await fetch(APIURL + 'order', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    if (response.ok) {
                        let data = await response.json()
                        localStorage.setItem('Order', data.orderId)
                        window.location = 'confirmation.html'
                        localStorage.removeItem('addTeddy')

                    } else {
                        e.preventDefault();
                        console.error('Retour du serveur : ', response.status)
                        alert('Erreur rencontrée : ' + response.status)
                    }
                } catch (error) {
                    alert("Erreur : " + error)
                }
            }
            post(send)
        }
    }
    submit.addEventListener('click', confirmation)
}