(() => {

  const productRepository = new ProductRepository();
  const addProduct = document.getElementById("mainPage");
  const viewModel = {

      createProductRow(result) { // Création du HTML pour chaqque produit grâce au résultat de la fonction findAll appelée en argument
          result.then(products => {
              if (!!products && products.length) {
                  products.forEach(element => {
                      const {
                          _id,
                          name,
                          price,
                          imageUrl
                      } = element;
                      addProduct.innerHTML +=
                          `
            <div class="row col-md-5 m-3 px-0">
              <div class="card shadow ">
                    <img src="${imageUrl}"width="200" height="350"  alt="Photo de ${name}" class="img card-img-top img-responsive"></img>
                
              <div class="text-center mx-auto">
                    <h3 class=productName>${name}</h3>
                    <p id="price">Prix: ${price/100}€</p>
                    </div> 
                    <button onclick='location.href="./product.html?id=${_id}"' type="button" id="btnCustom" class=" btn btn-danger">
                      Personnaliser ${name}
                    </button>
                    
                </div>
            </div>`;

                  });
              }
          });
      },

  };

  viewModel.createProductRow(productRepository.products()); // Passage en argument de la fonction findAll()

})();