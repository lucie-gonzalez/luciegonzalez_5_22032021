(() => {
    
    const productRepository = new ProductRepository();
    const addProduct = document.getElementById("container"); 

    const viewModel = {
      selectProduct() {
        const link = window.location.href;                          // Récupération de l'ID du produit dans l'URL
        const url = new URL(link)
        const params = new URLSearchParams(url.search);
        const ID = params.get('id');    
        const result = productRepository.findId(ID)                       // Utilisation de findID pour récupérer 1 seul produit
            .then(product => {   
                const { name, price, imageUrl, description, colors } = product; // Création du HTML pour le produit sélectionné avec image / nom / description et prix
                addProduct.innerHTML +=
                    `<div class="product"> 
                        <div class="image">
                            <h3 class="productName">${name}</h3>
                            <img src="${imageUrl}" alt="Photo de ${name}" class="productPic img card-img-top img-responsive"></img>
                        </div>
                        <div class="productInfo"> 
                            <div class="productDescription">
                                <h3 id="description">Description : </h3>
                                <p>${description}</p>
                                <h3 id="price">Prix:</h3> 
                                <p> ${price/100}€</p> 
                            <form class="productOptions optionsBox">
                                <h3><label for="option">Options : </label></h3>
                                <select name="option" id="options"></select>
                            </form>
                            <div class="quantityDiv">
                                <h3><label for="quantityInput">Combien souhaitez-vous en ajouter au panier ?</label></h3>
                                <input 
                                    step="number" 
                                    placeholder="Quantité" 
                                    class="quantity-input" 
                                    id="quantityInput" 
                                    name="quantityInput" 
                                    type="number" 
                                    min="1" max="99" 
                                    value='1'>
                                </input>
                            </div>   
                        </div>
                        </div>`;

                    let optionItem = document.getElementById("options");   // Ajout du choix de l'option
                    let options = "";
                    (product.colors).forEach(color => {
                        options += `
                        <option value="${color}" selected>${color}</option>`
                    });
                optionItem.innerHTML = options;

                panier.addEventListener('click', function(e) {              // Clique sur bouton ajouter au panier
                        
                    let color = document.querySelector('select').value;
                    let quantity = document.getElementById('quantityInput').value;
               
                    if (quantity < 1) {                                            
                    
                        swal("Veuillez sélectionner un produit", "", "error");
                
                    } else {
                 
                        swal("Produit ajouté au panier", "", "success");

                        const cartRepository = new CartRepository();                  // fonction ajouter au panier (addToCart) de CartRepository
                        cartRepository.addToCart(product, color, quantity);
                                          
                    } 
                    
                });
            
            })
        }
    }

    viewModel.selectProduct();
   
})();