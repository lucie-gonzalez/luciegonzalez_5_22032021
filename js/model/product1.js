class Product {
	constructor(id, name, price) {
	  this.name = name;
	  this.price = price;
	  this.id = id;
	}
  
	formattedPrice() {
	  return `${parseFloat(this.price)}&#128`; // parseFloat .00
	}
  }
  
const products = [
    new Product(1, 'product_2', 300),
    new Product(2, 'product_3', 180),
    new Product(3, 'product_4', 20)
]