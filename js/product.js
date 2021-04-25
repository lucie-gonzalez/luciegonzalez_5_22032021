   //Récupération id dans l'URL
const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get('id')


const getTeddy = async function (url) {
    //Récupération des données du teddy sélectionné par son id
    try {
        let response = await fetch(url)
        if (response.ok) {
            let teddy = await response.json()


            //Création des éléments dans le DOM
            const divRow = document.getElementById('content-top')
            const divCol = createTag('div', 'col-md-5 m-3 px-0', null, divRow, null)
            const card = createTag('div', 'card shadow', null, divCol, null)
            const image = createTag('img', 'card-img-top img-responsive', null, card, {
                'src': teddy.imageUrl,
                'alt': teddy.name
            })
            const cardBody = createTag('div', 'card-body', null, card, null)
            const h2 = createTag('h2', 'card-title', teddy.name, cardBody, null)
            const description = createTag('p', 'card-text', teddy.description, cardBody, null)
            const price = createTag('h3', 'card-text', (teddy.price / 100).toFixed(2) + ' €', cardBody, null)
            const label = createTag('label', null, 'Personnalisez sa couleur: ', cardBody, {
                'for': 'Choix de coueurs de ' + teddy.name
            })
            const select = createTag('select', 'form-control', null, cardBody, {
                'name': 'Choix de couleurs de ' + teddy.name
            });
            const button = createTag('button', 'btn btn-danger mt-2', 'Ajoutez' + ' ' + teddy.name + ' ' + 'au panier', cardBody, null)


            //Récupération couleurs Teddy
            const colors = teddy.colors
            for (const color of colors) {
                const selectColors = createTag('option', null, color, select, {
                    'value': color
                })
            }

            function clickAddBasket(event) {
                event.preventDefault()

                //Stockage du teddy sélectionné dans le localStorage
                let teddiesChoosen = {
                    teddyName: teddy.name,
                    teddyId: teddy._id,
                    teddyColor: select.value,
                    quantity: 1,
                    teddyPrice: teddy.price / 100,
                }

                let storedTeddies = JSON.parse(localStorage.getItem('addTeddy'))
                if (storedTeddies === null || storedTeddies === undefined) {
                    storedTeddies = []
                }
                const teddyColor = select.value;
                if (storedTeddies) {
                    const line = storedTeddies.find(teddyTmp => teddyTmp.teddyId == teddy._id && teddyColor == teddyTmp.teddyColor)
                    if (line === undefined) {
                        storedTeddies.push(teddiesChoosen);
                    } else {
                        line.quantity++
                    }
                    localStorage.setItem('addTeddy', JSON.stringify(storedTeddies));

                    if (window.confirm(teddy.name + " " + teddyColor + ' a bien été ajouté à votre panier! Souhaitez-vous continuer vos achats? ')) {
                        window.location.href = "index.html";
                    } else {
                        window.location.href = "basket.html";
                    }
                }
            }

            //Ecoute de l'évènement sur le bouton
            button.addEventListener("click", clickAddBasket)
        }
    } catch (error) {
        alert("Erreur : " + error);
    }
}
//Appel de la fonction getTeddies
getTeddy(APIURL + id)