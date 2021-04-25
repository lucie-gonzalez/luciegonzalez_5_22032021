(() => {
    
    const cartRepository = new CartRepository();
    const totalCartCost = document.getElementById('finalCheckout');
    const result = cartRepository.getCart();
    let title = document.querySelector('#checkoutTitle');
    let productContainer = document.getElementById('productContainer');
    let finalCheckout = 0;
    let closeForm = document.getElementById('close');
    let validateForm = document.getElementById('validate');
    let form = document.getElementById('postData'); 
   

    if (result === null || result.length === 0) {                                     // Si le panier est vide on affiche à la place un texte indiquat que le panier est vide et on cache le formulaire
      title.textContent = 'Désolé, votre panier est vide, merci de séléctionner un produit !' 
              document.getElementById('viderPanier').style.display="none";
              document.getElementById('finalPrice').style.display="none";
              document.getElementById('container').style.paddingBottom="0";
              document.getElementById('container').style.minHeight="80vh";
              document.querySelector('#container').style.display="flex";
              document.querySelector('.hiddenOnForm').style.justifySelf="center";
              document.querySelector('.hiddenOnForm').style.margin='auto';

    } else {    

        title.textContent = 'Votre panier :';

        result.forEach(cartItem => {                             // Création du HTML pour chaque Item présent dans le LocalStorage

          productContainer.innerHTML += `
          <div class=" container jumbotron"
           <div class="card-sm shadow"  
            <div class="col-md-6 m-3 px-0  ">
              <div class=" row justify-content-center ">
                <div class="productImg col-md-6 ">
                    <img src="${cartItem.product.imageUrl}" alt="Image du produit ${cartItem.product.name}"class="img card-img-top img-responsive "/>
                </div>
                <div id="texte class=" col-md-6 card">
                <div class="productName" id="name">
                  <h2 class="productNameTitle"><a href="product.html?id=${cartItem.product._id}">${cartItem.product.name}</a></h2>
                  <div class="productColor" id="color" >
                    <p> Options : </br> ${cartItem.color} </p>
                  
                <div class="card-sm ">
                <h3 id="new" class="card-sm "> Quantité : <span class="test1" id="test1">${cartItem.quantity}</span></h3>
                  <button type="button" id="up"; class="btn-up btn btn-danger" data-id="${cartItem.product._id}" data-color="${cartItem.color}">  
                    <i class="fas fa-plus-square"></i> </button>
                  <button type="button" id="down"; class="btn-down btn btn-danger" data-id="${cartItem.product._id}" data-color="${cartItem.color}">
                    <i class="fas fa-minus-square"></i>
                  </button>
                
                <div class="productPrix ">
                  <p class="productPrice"> Prix unitaire : ${cartItem.product.price/100} € </p></div>
                  <div class="productTotalPrice ">
                    <h3 class="productTotalPrice-Title">Prix total pour cet article</h3>
                    <p><span class="productTotalPrice-Amount">${cartItem.quantity * cartItem.product.price/100} €</span></p>
                  </div>
                  </div>
                   </div>
                </div>
              </div> 
              </div>
              </div>
              </div>    
            </div>`;  // On ajoute data Id et Data Color sur le bouttons pour pouvoir vérifier si c'est bien le même produit avant de modifier la quantité

        });  
            
        const ProductsTotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
           
        ProductsTotalPrice.forEach(product => {                     // Calcul du prix total pour chaque article
          let productTotalPrice = parseInt(product.innerHTML, 10);   
          finalCheckout += productTotalPrice;   
        })

        totalCartCost.innerHTML = finalCheckout + ' €';     // Calcul du prix total du panier

        let up = document.querySelectorAll('.btn-up');

        up.forEach((button) => {
          button.addEventListener('click', function(e) {    // Application de la méthode AddItem (augmentation quantité) pour chaque article (sur chaque boutton up)
            let id = button.dataset.id;
            let color = button.dataset.color;          
            let cart = cartRepository.addItem(id, color);
            
              for(let i = 0; i < cart.length; i++) {
                if (cart[i].product._id == id && cart[i].color == color) {
                 
                  let newQuantity = [...document.getElementsByClassName('test1')];
                  newQuantity.forEach(quantity => {
                    newQuantity[i].innerHTML =  `${cart[i].quantity}`;
                  })
                  let totalPrice = cart[i].quantity * cart[i].product.price /100;
                  let TotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
                  TotalPrice.forEach(price => {
                    TotalPrice[i].innerHTML = totalPrice + ' €';
                  })
          
                }
              }
            
             const ProductsTotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
             let finalCheckout = 0;  
             ProductsTotalPrice.forEach(product => {                     // Calcul du prix total pour chaque article
               let productTotalPrice = parseInt(product.innerHTML, 10);
               finalCheckout += productTotalPrice;   
               })
             totalCartCost.innerHTML = finalCheckout + ' €';  
          })
        })

                          
        let down = document.querySelectorAll('.btn-down');
    
        down.forEach((button) => {
          button.addEventListener('click', function(e) {    // Application de la méthode RemoveItem (diminution quantité) pour chaque article (sur chaque boutton down)
            let id = button.dataset.id;
            let color = button.dataset.color;
            let cart = cartRepository.removeItem(id, color);
          
            for(let i = 0; i < cart.length; i++) {
              if (cart[i].product._id == id && cart[i].color == color) {
               
                let newQuantity = [...document.getElementsByClassName('test1')];
                newQuantity.forEach(quantity => {
                  newQuantity[i].innerHTML =  `${cart[i].quantity}`;
                })
                let totalPrice = cart[i].quantity * cart[i].product.price /100;
                let TotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
                TotalPrice.forEach(price => {
                  TotalPrice[i].innerHTML = totalPrice + ' €';
                })
        
              } 
              
            }
          
           const ProductsTotalPrice = [...document.getElementsByClassName('productTotalPrice-Amount')];
           let finalCheckout = 0;  
           ProductsTotalPrice.forEach(product => {                     // Calcul du prix total pour chaque article
             let productTotalPrice = parseInt(product.innerHTML, 10);
             finalCheckout += productTotalPrice;   
             })
           totalCartCost.innerHTML = finalCheckout + ' €';  
           
            
            
            
          })
            
        })
            
            
        emptyCart.addEventListener('click', cartRepository.emptyCart); // Vider le panier

        confirmCart.addEventListener('click',  function(e) { // Confirmer le panier et affichage du formulaire caché jusqu'à présent

          document.getElementById("form").style.display="block";
          document.querySelector(".hiddenOnForm").style.display="none";
          document.querySelector('#container').style.backgroundColor="#f2f2f2";

        });

        closeForm.addEventListener('click', function(e) {  // Ferme le formulaire et retourne au panier

          document.getElementById("form").style.display="none";
          document.querySelector(".hiddenOnForm").style.display="block";
          document.querySelector('#container').style.backgroundColor="#fff";

        });

        validateForm.addEventListener('click', function(e) {    // Validation du formulaire et récupération de l'Order ID grâce à la méthode order() dans OrderRepository

          const orderRepository = new OrderRepository();
          let totalCost = totalCartCost.innerHTML;
          let firstName = document.getElementById('firstName').value;
          let lastName = document.getElementById('lastName').value;
          let address = document.getElementById('address').value;
          let city = document.getElementById('city').value;
          let email = document.getElementById('email').value;
          let contact = new Contact(firstName, lastName, address, city, email);  
          if (form.checkValidity() === false){
            swal("Attention", "Merci de bien vouloir vérifier le formulaire et réessayer", "error")
          } else if (form.checkValidity() === true) {
     
            orderRepository.saveOrder(contact, totalCost);
            swal("Merci pour votre commande !", "Vous allez être redirigé vers la page de confirmation dans un instant", "success");
            setTimeout(function() {window.location = 'order.html'; }, 3000);  // Redirection vers page order au bout de 3 secondes

          }
        
           
                         
        })
        
    }
   
})();



