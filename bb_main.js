// Make Roll class
class Roll {
    constructor(desc, price, image) {
        this.desc = desc
        this.price = price
        this.image = image
    }
}

// Initialize array to hold cart items
let cartArray = [];

// Begins cart count at 0
let cartCount = 0;

// onLoad function to keep cart count on non-cart pages
function onLoad(){
    let count = localStorage.getItem("navCount");

    // If there's no value stored, start count at 0
    if (count === null) {
        document.getElementById("cart-num").innerText = "0";
    }

    // If there's a value stored, set navigation bar counter to that value
    else {
        document.getElementById("cart-num").innerText = count;
    }
}

// Creating card elements for div
function CardTemplate(parent, imgURL, text, price) {

    // Set up card
    let divContainer = document.createElement("div");
    divContainer.className = "card";
    parent.appendChild(divContainer);

    // Set up edit/remove container
    let erContainer = document.createElement("div");
    erContainer.className = "edit-remove";
    divContainer.appendChild(erContainer);

    // Set up text container
    let textContainer = document.createElement("div");
    textContainer.className = "text";
    divContainer.appendChild(textContainer);

    // Set up price container
    let priceContainer = document.createElement("div");
    priceContainer.className = "price";
    divContainer.appendChild(priceContainer);

    // Create image element --> need to come up with non-hacky way to get image
    let img = document.createElement("img");
    img.className = "cart-pic";
    img.src = imgURL;
    erContainer.appendChild(img);

    // Make link to edit
    let editLink = document.createElement('button');
    editLink.className = "edit-remove";
    editLink.innerHTML = "Edit";
    erContainer.appendChild(editLink);

    // Make link to remove
    let removeLink = document.createElement('button');
    removeLink.className = "edit-remove";
    removeLink.innerHTML = "Remove";
    erContainer.appendChild(removeLink);
    removeLink.onclick = function (index){
        parent.removeChild(divContainer);
        let containerArray = []
        for (let i = 0; i < parent.childElementCount; i++) {
            let child = parent.children[i];
            let containerText = child.getElementsByClassName("item-cart");
            let rollDesc = containerText[0].innerHTML;
            let containerPrice = child.getElementsByClassName("price");
            let rollPrice = containerPrice[0].innerText;
            let containerImg = child.getElementsByClassName("cart-pic");
            let rollImg = containerImg[0].src;

            let newRoll = new Roll(rollDesc, rollPrice, rollImg);
            containerArray.push(newRoll);
        }
        const jsonItem = JSON.stringify(containerArray);
        localStorage.setItem("myItem", jsonItem);
    }

    // Make description of item in cart
    let itemText = document.createElement("p");
    itemText.className = "item-cart";
    itemText.innerHTML = text;
    textContainer.appendChild(itemText);

    // Make price elements
    let itemPrice = document.createElement("p");
    itemPrice.className = "price";
    itemPrice.innerHTML = price;
    priceContainer.appendChild(itemPrice);

    return divContainer;
}

// This makes the description text for the item in the cart, including name, quantity, glaze, and delivery method
function bodyText(name, quantity, glaze, delivery) {

    name.className = "prod-name";

    // Singular roll in description
    if (quantity === 1) {
        return name + "\n" + quantity + " Roll" + "\n" + glaze + "\n" + delivery;
    }

    // Plural roll in description
    else{
        return name + "\n" + quantity + " Rolls" + "\n" + glaze + "\n" + delivery;
    }

}

// Functions to calculate price according to quantity
function calculatePrice(rollType, quantity) {

    // If roll is original or original GF, price is $4.00
    if (rollType === "original" || rollType === "originalGF") {
        let priceOriginal = (4.00 * quantity).toFixed(2);
        let stringPriceOriginal = priceOriginal.toString();
        return "$" + stringPriceOriginal;
    }

    // Any other type of roll, price is $4.50
    else {
        let price = (4.50 * quantity).toFixed(2);
        let stringPrice = price.toString();
        return "$" + stringPrice;
    }
}

//Save desired item into new roll object
function addToCart() {
    // Need name, qualities, price, image
    let name = document.getElementById("pb-name").innerText;
    let quantity = parseInt(document.getElementById("drop-qty").value);
    let glaze = document.getElementById("drop-glaze").value;
    let delivery = document.getElementById("drop-deliv").value;
    let img = document.getElementById("cp-img");
    let imgsrc = img.src;

    // Format description and price for containers
    let desc = bodyText(name, quantity, glaze, delivery);
    let price = calculatePrice(name, quantity);

    // Create new roll object and push to array, set in local storage
    let roll = new Roll(desc, price, imgsrc);

    // If local storage is null, start new array and push to local storage
    if (localStorage.getItem("myItem") === null) {
        cartArray.push(roll);
        const jsonItem = JSON.stringify(cartArray);
        localStorage.setItem("myItem", jsonItem);
    }
    // If local storage has something in it, pull it and add new item
    else {
        let savedArray = JSON.parse(localStorage.getItem("myItem"));
        savedArray.push(roll);
        const jsonItem = JSON.stringify(savedArray);
        localStorage.setItem("myItem", jsonItem);
    }

    // Update cart count in navigation bar
    let storageCount = localStorage.getItem("navCount");

    // If there's no value stored, start count at 0
    if (storageCount === null) {
        cartCount = cartCount + 1;
    }

    // If there's a value saved in local storage, convert to int and continue count
    else {
        let storedCount = parseInt(storageCount);
        cartCount = storedCount + 1;
    }

    // Update value in local storage and assign it to nav bar
    localStorage.setItem("navCount", cartCount.toString());
    document.getElementById("cart-num").innerText = cartCount.toString();
}

// onLoad function for cart that updates nav bar and loads items from local storage
function onLoadCart() {
    // Call onLoad() to set nav bar count
    onLoad();

    // Pull items from local storage
    const cart = localStorage.getItem("myItem");
    if (cart === null) {
        let emptyCart = document.createElement("h2");
        emptyCart.innerHTML = "Cart is Empty";
        document.getElementById("cart-items").appendChild(emptyCart);

        // Update total to $0.00
        let totalText = document.getElementById("totalText");
        totalText.innerHTML = "Total <br> $0.00";
        let totalDiv = document.getElementById("totalDiv");
        totalDiv.appendChild(totalText);
    }
    else {
        const savedItems = JSON.parse(cart);
        let totalPrice = 0.00;
          for (let index in savedItems){
              if (savedItems.hasOwnProperty(index)) {
                  let savedRoll = savedItems[index];
                  CardTemplate(document.getElementById("cart-items"), savedRoll.image, savedRoll.desc, savedRoll.price);
                  cartArray.push(savedRoll);
                  totalPrice = totalPrice + totalPriceCart(savedRoll.price);
              }
         }
         let stringTotal =  totalPrice.toString();
          let decimal = stringTotal.slice(-2);
          let wholeNumber = stringTotal.substring(0, stringTotal.length-2) + "." + decimal;
        // Update total of cart
        let totalText = document.getElementById("totalText");
        totalText.innerHTML = "Total <br> $" + wholeNumber;
        let totalDiv = document.getElementById("totalDiv");
        totalDiv.appendChild(totalText);
    }
}

function totalPriceCart(price) {
    let stringPrice = price.substring(1);
    let intPrice = stringPrice.replace(".", "");
    intPrice = parseInt(intPrice);
    return intPrice;
}