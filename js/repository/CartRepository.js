class CartRepository {

    saveCart(cart) { // Méthode permettant de définir une paire clé valeur au localStorage 
        localStorage.setItem("productCart", JSON.stringify(cart));

    }

    getCart() {

        let cart = JSON.parse(localStorage.getItem('productCart')) || []; // Récupération des informations contenues dans le localStorage (le valeur de la clé "productCart")

        return cart;

    }

    addToCart(product, color, quantity) { // Méthode permettant de sauvegarder les données du produit sélectionné dans le localStorage 

        let cartItem = new CartItem(product, color, quantity)
        let cart = this.getCart();

        if (localStorage.getItem('productCart') === null) {

            cart.push(cartItem);

        } else {

            let itemHasChanged = false;

            for (let i = 0; i < cart.length; i++) {

                if ((cart[i].product.name == cartItem.product.name) && cart[i].color == cartItem.color) { // Vérification si produit exactement identique ou non (en fonction du nom et de la couleur)

                    let cartItemsQuantityNumber = Number(cart[i].quantity); // quantité dans le LocalStorage 

                    let cartQuantityNumber = Number(cartItem.quantity); // quantité produit sélectionné

                    let sumQuantity = cartItemsQuantityNumber + cartQuantityNumber;

                    cart[i].quantity = sumQuantity.toString();

                    itemHasChanged = true;
                }
            }

            if (itemHasChanged == false) {

                cart.push(cartItem);

            }
        }

        this.saveCart(cart);

    }




    removeItem(id, color) { // Diminution de la quantité d'un produit dans le panier

        let cart = this.getCart();

        for (let i = 0; i < cart.length; i++) { // vérification que le produit est bien le bon grâce à son ID et sa couleur sélectionnée
            if ((cart[i].product._id == id) && (cart[i].color == color)) {
                cart[i].quantity--;
                this.saveCart(cart);

                //location.reload();
            } else {
                continue;
            }

            if (cart[i].quantity === 0) { // Suppression du produit si quantité = 0
                cart.splice(i, 1);
                this.saveCart(cart);
                location.reload();

            }

        }
        return cart;

    }



    addItem(id, color) { // Augmentation de la quantité d'un produit dans le panier (même principe que removeItem)

        let cart = this.getCart();

        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product._id == id && cart[i].color == color) {
                cart[i].quantity++;

                this.saveCart(cart);
                return cart;
                //location.reload();
            } else {
                continue;
            }

        }
    }




    emptyCart() { // Fonction permettant de vider le panier (On vide le localStorage)

        swal.setActionValue({
            confirm: false,
            cancel: true
        })
        swal({
                title: 'Êtes vous sur ?',
                text: "",
                icon: 'warning',
                buttons: {
                    cancel: "Retour au panier",
                    confirm: "Vider mon panier"
                },
                dangerMode: true,
            })
            .then((result) => {
                if (result != null) {
                    if (result.false) {
                        swal('Panier vidé', '', 'success')
                    } else {
                        localStorage.clear();
                        location.reload(); // Trouver autre solution que de recharger la page
                    }
                }
            })
    }


}

 
  







