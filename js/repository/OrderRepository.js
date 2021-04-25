
class OrderRepository {

    order(contact) {   // Méthode permettant d'envoyer les données au serveur avec Post

        const products = [];
        let cart = JSON.parse(localStorage.getItem('productCart')) || [];
        const postUrlAPI = "http://localhost:3000/api/teddies/order";
        for (let i = 0; i < cart.length; i++) {
            products.push(cart[i].product._id)
        }
       
        const request = new Request(postUrlAPI, {
            method: 'POST',
            body: JSON.stringify({contact, products}),  
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
            
        });

        return request;
      
    }


    saveOrder(contact, totalCost) {
       const request = this.order(contact);
       fetch(request)
        .then(response => response.json()) // récupération de l'Order ID
            .then( (response) => {
                let getOrderId = response.orderId;  
                
                localStorage.clear();  
                let orderRecap = { getOrderId, totalCost, contact };  
                
                localStorage.setItem("orderIsConfirmed", JSON.stringify(orderRecap));
                
            })
    
    }

    getOrderId() { // Méthode permettant de récupérer la valeur de orderIsConfirmed (ID et montant de la commande)
    
    const checkoutItems = JSON.parse(localStorage.getItem('orderIsConfirmed')) || []; 
    return checkoutItems;
    
    }

}




