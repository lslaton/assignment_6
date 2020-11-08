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

//Save desired item into new roll object
function addToCart() {
    // Need name, qualities, price, image
    let name = document.getElementById("pb-name").innerText;
    let quantity = parseInt(document.getElementById("drop-qty").value);
    let glaze = document.getElementById("drop-glaze").value;
    let delivery = document.getElementById("drop-deliv").value;
    let img = document.getElementById("cp-img");
    let imageSource = img.src;

    // Format description and price for containers
    let desc = bodyText(name, quantity, glaze, delivery);
    let price = calculatePrice(name, quantity);

    // Create new roll object and push to array, set in local storage
    let roll = new Roll(desc, price, imageSource);


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
    let storageArray = JSON.parse(localStorage.getItem("myItem"));
    let storageCount = storageArray.length;
    localStorage.setItem("navCount", storageCount);
    document.getElementById("cart-num").innerText = storageCount.toString();
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
    removeLink.onclick = function (){
        // Remove card from divContainer from https://www.w3schools.com/jsref/met_node_removechild.asp
        parent.removeChild(divContainer);

        // Create updated array with cart items and price counter
        let containerArray = []
        let totalPrice = 0.00;

        // Iterate through remaining child elements and save values from https://www.w3schools.com/jsref/prop_element_childelementcount.asp
        for (let i = 0; i < parent.childElementCount; i++) {
            let child = parent.children[i];
            let containerText = child.getElementsByClassName("item-cart");
            let rollDesc = containerText[0].innerHTML;
            let containerPrice = child.getElementsByClassName("price");
            let rollPrice = containerPrice[0].innerText;
            let containerImg = child.getElementsByClassName("cart-pic");
            let rollImg = containerImg[0].src;

            // Create new Roll Object for each child and add to new array
            let newRoll = new Roll(rollDesc, rollPrice, rollImg);
            totalPrice = totalPrice + totalPriceCart(newRoll.price);
            containerArray.push(newRoll);
        }

        // Save new array to local storage
        const jsonItem = JSON.stringify(containerArray);
        localStorage.setItem("myItem", jsonItem);

        // Update nav bar count
        localStorage.setItem("navCount", JSON.stringify(containerArray.length));
        document.getElementById("cart-num").innerText = containerArray.length.toString();

        // Update total text
        totalPriceString(totalPrice);

        // If there are no items in cart, display empty cart text
        if (containerArray.length === 0) {
            emptyCartText();
        }

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

// onLoad function for cart that updates nav bar and loads items from local storage
function onLoadCart() {
    // Call onLoad() to set nav bar count
    onLoad();

    // Pull items from local storage
    const cart = localStorage.getItem("myItem");

    // If cart is empty, generate empty cart text and set total to 0
    if ((cart === null) || (cart === "[]")) {
        emptyCartText();
        totalPriceString(0);
    }

    // If cart has items, make card templates and calculate price
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

        // Insert total price text
        totalPriceString(totalPrice);
    }
}

// Makes the description text for the item in the cart, including name, quantity, glaze, and delivery method
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

// Calculates price according to quantity
function calculatePrice(rollType, quantity) {

    // If roll is original or original GF, price is $4.00
    if (rollType === "original" || rollType === "originalGF") {
        let priceOriginal;
        if (quantity === 1) {
            priceOriginal = 4.00.toFixed(2);
        }
        else if (quantity === 3) {
            priceOriginal = 9.00.toFixed(2);
        }
        else if (quantity === 6){
            priceOriginal = 18.00.toFixed(2);
        }
        else {
            priceOriginal = 30.00.toFixed(2);
        }
        let stringPriceOriginal = priceOriginal.toString();
        return "$" + stringPriceOriginal;
    }

    // Any other type of roll, price is $4.50
    else {
        let price;
        if (quantity === 1) {
            price = 4.50.toFixed(2);
        }
        else if (quantity === 3) {
            price = 10.00.toFixed(2);
        }
        else if (quantity === 6){
            price = 20.00.toFixed(2);
        }
        else {
            price = 34.00.toFixed(2);
        }
        let stringPrice = price.toString();
        return "$" + stringPrice;
    }
}

// Calculates int value of total price of cart
function totalPriceCart(price) {
    // I can't find my exact source because I cleared my history, but this strategy
    // to convert the number with a decimal into a whole number and saving it as an int
    // was suggested on StackOverflow to help with adding numbers with decimals and
    // keeping the number to two decimal places
    let stringPrice = price.substring(1);
    let intPrice = stringPrice.replace(".", "");
    intPrice = parseInt(intPrice);
    return intPrice;
}

// Converts int value of total price of cart to a string, and inserts it into HTML
function totalPriceString(price) {
    let wholeNumber;

    // If price is $0
    if (price === 0) {
        wholeNumber = "0.00"
    }

    else {
        // Source: https://stackoverflow.com/questions/10741899/how-to-select-last-two-characters-of-a-string
        let stringTotal =  price.toString();
        let decimal = stringTotal.slice(-2);
        wholeNumber = stringTotal.substring(0, stringTotal.length-2) + "." + decimal;
    }

    // Insert string into HTML element
    let totalText = document.getElementById("totalText");
    totalText.innerHTML = "Total <br> $" + wholeNumber;
    let totalDiv = document.getElementById("totalDiv");
    totalDiv.appendChild(totalText);
}

// Create text to display when cart is empty
function emptyCartText() {
    let emptyCart = document.createElement("h2");
    emptyCart.className = "text";
    emptyCart.innerHTML = "Nothing in Cart!";
    document.getElementById("cart-items").appendChild(emptyCart);
}