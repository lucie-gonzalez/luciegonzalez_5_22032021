const getTeddies = async function (url) {
    //Récupération des données de l'API
    try {
        let response = await fetch(url)
        if (response.ok) {
            let teddies = await response.json()
            //Création des éléments dans le DOM
            for (let teddy of teddies) {
                const divRow = document.getElementById('content-top')
                const divCol = createTag('div', 'col-md-5 teddys m-3 px-0', null, divRow, null)
                const card = createTag('div', 'card shadow', null, divCol, null)
                const image = createTag('img', 'card-img-top img-responsive', null, card, {
                    'src': teddy.imageUrl,
                    'alt': teddy.name
                })
                const cardBody = createTag('div', 'card-body', null, card, null)
                const h2 = createTag('h2', 'card-title', teddy.name, cardBody, null)
                const price = createTag('h3', 'card-text', (teddy.price / 100).toFixed(2) + ' €', cardBody, null)
                const button = createTag('a', 'btn btn-danger', 'Personnalisez' + ' ' + teddy.name + '!', cardBody, {
                    'href': './product.html?id=' + teddy._id
                })
            }
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (error) {
        alert("Erreur : " + error)
    }
}
//Appel de la fonction getTeddies
getTeddies(APIURL)