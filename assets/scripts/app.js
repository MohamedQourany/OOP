class Product {
    title = "Default";
    imageUrl;
    description;
    price;
    constructor(title,imageUrl,description,price){
        this.title = title,
        this.imageUrl = imageUrl,
        this.description = description,
        this.price = price
    }
}
class Component{
    constructor(renderHookID){
        this.hookID = renderHookID
    }
    createRootElement(tag,cssClasses,attributes){
        const rootElement = document.createElement(tag)
        if (cssClasses) {
            rootElement.className = cssClasses
        } 
        if (attributes && attributes.length > 0) {
            for (const atrr of attributes) {
                rootElement.setAttribute(atrr.name,atrr.value)
            }
        }
document.getElementById(this.hookID).append(rootElement)
return rootElement
    }

}
class ProductItem extends Component {
    constructor(product){
        super("app")
this.product = product
    }
    addToCart(){
        App.addProductToCart(this.product)
    }
    render(){
        const prodEl = this.createRootElement("li","product-item");
        prodEl.innerHTML = `
                  <div>
                  <img src="${this.product.imageUrl}" alt="${this.product.title}">
                  <div class="product-item__content">
                  <h2>${this.product.title}</h2>
                  <h3>\$ ${this.product.price}</h3>
                  <p>${this.product.description}</p>
                  <button>Add to cart</button>
                  </div>
                  </div>
              `;
              const addTo = prodEl.querySelector("button")
              addTo.addEventListener("click",this.addToCart.bind(this))
    }
}

class ElementAtrribute {
constructor(atrrName,atrrValue){
this.name = atrrName
this.value = atrrValue 
}
}
class ShoppingCart extends Component {
    items=[];
    set cartItems (value){
        this.items = value
        this.totalOutput.innerHTML = `<h2>Total : \$ ${this.totalAmount}</h2>`
    }
    get totalAmount(){
        const sum = this.items.reduce((prevValue,currItem)=> prevValue+currItem.price,0)
    return sum
    }
    constructor(renderHookID){
        super(renderHookID)
    }
    addProduct(product){
        const updatedItems = [...this.items]
        updatedItems.push(product)
        this.cartItems = updatedItems;    
    }
    orderProduct(){
        console.log("Ordering...");
        console.log(this.items);
    }
    render(){
       const cartEl =  this.createRootElement("section","cart")
        cartEl.innerHTML = `
        <h2>Total : \$ ${0}</h2>
        <button>Order Now !</button>
        `
        const orderButton = cartEl.querySelector("button")
        orderButton.addEventListener("click",()=>this.orderProduct())
        this.totalOutput = cartEl.querySelector("h2")
    }
}
const productList = {
  products: [
    new Product("iPhone 13",
    "https://tradelinestores.s3.amazonaws.com/media/product_images/8beed3df-488d-4c8a-b808-bd2ef6c2fe86.png",
    "iphone 13 128gb",
    19.99
    ),
    new Product("iPhone 11",
    "https://tradelinestores.s3.amazonaws.com/media/product_images/fa6ac02c-29f9-4bef-8f30-22a021f11be5.png",
    "iphone 11 128gb",
    19.99

    ),
  ],
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem =  new ProductItem(prod)
      const prodEl = productItem.render()
      prodList.append(prodEl);
    }
    return prodList
  },
};
class Shop {
    render(){
         this.cart = new ShoppingCart('app')
         this.cart.render()
        const renderHook = document.getElementById("app");
       const prodListEl = productList.render();
       renderHook.appendChild(prodListEl)

    }
}
class App {
    static cart;
    static init(){
        const shop = new Shop()
        shop.render()
        this.cart = shop.cart
    }
    static addProductToCart(product){
        this.cart.addProduct(product)
    }
}

App.init()