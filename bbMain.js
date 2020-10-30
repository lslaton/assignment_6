 var cartArray = [];

class Roll{
    constructor(name, quantity, glaze, delivery , img) {
        this.name = name;
        this.quantity = quantity;
        this.glaze = glaze;
        this.delivery = delivery;
        this.img = img;
    }
}

// function cardTemplate(parent, img, name, qty, glaze, deliv, price)

var cartCount = 0;

function addToCart() {
    cartCount = cartCount + 1; //increase by 1 every time Add to Cart button is clicked
    document.getElementById('cart-num').innerText = cartCount; // update nav bar number
    localStorage.setItem("cartCount", cartCount);
    var name = document.getElementById("pb-name").innerText;
    var quantity = document.getElementById("drop-qty").value;
    var glaze = document.getElementById("drop-glaze").value;
    var delivery = document.getElementById("drop-deliv").value;
    var img = document.getElementsByClassName("cp-img").src;
    const cartItem = new Roll(name, quantity, glaze, delivery, img);
    const jsonItem = JSON.stringify(cartItem);
    localStorage.setItem("cartObj", jsonItem);
    cartArray.push(jsonItem);
    console.log(localStorage.getItem("cartObj"));
    console.log(cartArray);
}

function onLoad(){
    var cartNum = localStorage.getItem("cartCount");
    console.log(cartNum);
    document.getElementById('cart-num').innerText = cartNum;
    console.log(document.getElementById('cart-num').innerText);
}

