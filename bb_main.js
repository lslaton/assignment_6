// This is the beginning of implementation for 6B; still in progress, please disregard for 6A
var cartArray = [];

// Roll object for cart
class roll{
    constructor(name, quantity, glaze, delivery , img) {
        this.name = name;
        this.quantity = quantity;
        this.glaze = glaze;
        this.delivery = delivery;
        this.img = img;
    }
}

// Begins cart count at 0
var cartCount = 0;

function addToCart() {
    cartCount = cartCount + 1; //Increase by 1 every time Add to Cart button is clicked
    document.getElementById('cart-num').innerText = cartCount; // Update nav bar number
    localStorage.setItem("cartCount", cartCount); // Save total items in cart in local storage
    var name = document.getElementById("pb-name").innerText; // Save item info into new object; beginning of implementation for 6B
    var quantity = document.getElementById("drop-qty").value;
    var glaze = document.getElementById("drop-glaze").value;
    var delivery = document.getElementById("drop-deliv").value;
    var img = document.getElementsByClassName("cp-img").src;
    const cartItem = new roll(name, quantity, glaze, delivery, img);
    const jsonItem = JSON.stringify(cartItem); // Beginning of implementation for 6B to save in local storage and load into cart page
    localStorage.setItem("cartObj", jsonItem);
    cartArray.push(jsonItem);
}

function onLoad(){
    var cartNum = localStorage.getItem("cartCount"); // Update each page with current cart count
    document.getElementById('cart-num').innerText = cartNum;
}

