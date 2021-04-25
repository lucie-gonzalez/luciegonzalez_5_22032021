const APIURL = 'http://localhost:3000/api/teddies/'
class ProductRepository {
    products() {
        return this.findAll()   // Tous les produits
            .then(data => data)
    }

    product() {
        return this.findId() // 1 seul produit
            .then(ID => ID)
    }

    

    async findAll() {               // Méthode permettant de récupérer tous les produits en appellant l'API 
        const products = []; 
        let response = await fetch(APIURL);          
        let data = await response.json()               
            .then((data) => {
            data.forEach((product) => { 
                products.push(new Product(product.colors, product._id, product.name, product.price, product.imageUrl, product.description)) 
                })        
            return products;
            }) 
        return data;  
    }

    

   async findId(ID) {               // Méthode permettant de récupérer un seul produit grâce à son ID
       let response = await fetch(APIURL + ID)
       let product = await response.json()
       return  new Product(product.colors, product._id, product.name, product.price, product.imageUrl, product.description);
    };
                
}

        

       

     
                 







