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

function onLoad(){
    var count = localStorage.getItem("navCount");
    if (count === null) { // If there's no value stored, start count at 0
        document.getElementById("cart-num").innerText = 0;
    }
    else { // If there's a value stored, set navigation bar counter to that value
        document.getElementById("cart-num").innerText = count;
    }
}

function addToCart() {
    //Save desired item into new roll object
    var name = document.getElementById("pb-name").innerText;
    var quantity = document.getElementById("drop-qty").value;
    var glaze = document.getElementById("drop-glaze").value;
    var delivery = document.getElementById("drop-deliv").value;
    var img = document.getElementsByClassName("cp-img").src;
    const cartItem = new roll(name, quantity, glaze, delivery, img);
    if (localStorage.getItem("navCount") === null) { //If there's no value stored, start count at 0
        cartCount = cartCount + 1;
    }
    else { //If there's a value saved in local storage, convert to int and continue count
        var storedCount = parseInt(localStorage.getItem("navCount"));
        cartCount = storedCount + 1;
    }
    console.log("storedCount is " + storedCount);
    console.log("cartCount is " + cartCount);
    localStorage.setItem("navCount", cartCount);
    console.log("local storage count is " + localStorage.getItem("navCount"));
    document.getElementById("cart-num").innerText = localStorage.getItem("navCount");

    // Beginning of implementation for 6B to save in local storage and load into cart page
    //const jsonItem = JSON.stringify(cartItem);
    //localStorage.setItem("cartObj", jsonItem);
    //cartArray.push(jsonItem);
}

