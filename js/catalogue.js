/* File name: catalogue.js
 * Author: Tlotlego Kgatitsoe
 * Date created: 17 February 2020
 * Last modified: 21 February 2020
 * Description: Ths JS file for "catalogue.html"
 */

// ******* MODEL ******* //

const model = {
    addToCartText: 'Quick Add To Cart',
    currentUserStorageKey: 'tk-furnitures-current-user',
    inCartText: 'In Cart',
    productPageURL: 'product.html',
    productsStorageKey: 'tk-furnitures-products',
    removeFromCartText: 'Remove From Cart',
    shownProductStorageKey: 'tk-furnitures-shown-product',
    usersStorageKey: 'tk-furnitures-users',
    oldProducts: [
        { number: 1, src: 'images/bed-couch.jpg', name: 'Bed Couch', description: 'A couch that seats about two people. It can be tilted back to create a kind of matress.', price: 4300, inCart: false },
        { number: 2, src: 'images/bedroom-set.jpg', name: 'Bedroom Set', description: 'A bed that comes with two drawers for extra space. It has a modern wooden make.', price: 8800, inCart: false },
        { number: 3, src: 'images/black-shiny-couches.jpg', name: 'Black Shiny Couches', description: 'Dark brown couches that have a light fly finish. Perfect for an apartment with a small number of people.', price: 7600, inCart: false },
        { number: 4, src: 'images/chair.jpg', name: 'Chair', description: 'Single lounge chair to complete your living room. It is made with high quality wood, the couch pillow is also included in this deal.', price: 4600, inCart: false },
        { number: 5, src: 'images/double-stool.jpg', name: 'Double Stool', description: 'Old-style soft comfortable chair. Perfect for people who occassional back pain as it was created to massage your back. Quite useful when you came from work tired.', price: 3900, inCart: false },
        { number: 6, src: 'images/home-suite.jpg', name: 'Home Suite', description: 'Full family couch suite. Chairs that are joint have a compartment in the middle that holds beverages. ( PS: Set does not include the table).', price: 9900, inCart: false },
        { number: 7, src: 'images/lounge-suite.jpg', name: 'Lounge Suite', description: 'Modern family sitting room set. Buy this set to have a place where you can enjoy family dinners and make some of those special family moments.', price: 5100, inCart: false },
        { number: 8, src: 'images/lounge-table.jpg', name: 'Lounge Table', description: 'Nigerian made table. Made from Maple, it guarantees quality and durability and also has a storage area underneath.', price: 3300, inCart: false },
        { number: 9, src: 'images/office-chair.jpg', name: 'Office Chair', description: 'Modern office chair for "office workers". The bck rest is curved to suit align your spine in the natural position. This ensures that your spine does not strain as you do what you do best. Comes with a modern office table that can be adjusted to your specific preference.', price: 5600, inCart: false },
        { number: 10, src: 'images/two-grey-couches.jpg', name: 'Two Grey Couches', description: 'Two grey couches, they come with extra soft wool for that cloud-like feeling. They are incredibly sensitive, so they need covers to protect their natural skin. This offer comes with three couch pillows, like the one you see on the image.', price: 6700, inCart: false },
        { number: 11, src: 'images/table.jpg', name: 'Artistic Table', description: 'Imported from Kenya, a new table painted with a beautiful lake that runs across the opposite sides of the table. It could have been motivated by their famous Lake Nakuru. Made from thick Oak trees so you can rest assured that this table will last for years.', price: 4900, inCart: false },
        { number: 12, src: 'images/stool.jpg', name: 'Artist Chair', description: 'A chair of high quality locally made from the best acrylic in SA. You support local and get the best quality and comfort. Perfect for pianists and artists who are looking to create magic.', price: 2300, inCart: false },
    ],
    
    default() {
        // Get the container, current user and all the users who have registered.
        this.user = JSON.parse( localStorage.getItem( this.currentUserStorageKey ) );
        this.users = JSON.parse( localStorage.getItem( this.usersStorageKey ) );
        console.log( 'Got user and users.' );

        // Checks if the products are in the storage. If they are, they are used as they are the most recent.
        // If not, the "model.products" are added to storage
        this.products = JSON.parse( localStorage.getItem( this.productsStorageKey ) );
        if ( !this.products ) {
            this.products = this.oldProducts;
            localStorage.setItem( this.productsStorageKey, JSON.stringify( this.products ) );
            console.log( 'Products received from storage.' );
        }
        console.log( 'The model is done!' );
    }
}


// ******* APP ******* //

const app = {
    default() {
        model.default();
    },

    addToCart( buttonElem, productNumber ) {
        // Removes the addToCart button and shows the "In Cart"
        // element to shows the user that the product has been
        // added to the cart.
        view.updateUI( buttonElem );

        // Get the user and users
        let user = this.getUser();
        let product = this.getProductByNumber( Number( productNumber ) );

        // Updates the product by making it's inCart flag to be true
        // Adds the product to the cart
        product.inCart = true;
        user.cart.items.push( product );
        user.cart.total += product.price;

        // Alert the user of the total price for all the items in cart
        this.alertPrice();

        // Updates the product in the products array
        this.updateProduct( product );

        // Updates the user in the users array
        this.updateUser( user );

        // Saves the user, the current user and the products in storage
        this.save();
    },

    alertPrice() {
        let cart = app.getCart();
        if ( cart.items.length === 0 ) { cart.total = 0; }
        alert( `Total: R${ cart.total }` );
    },

    getCurrentUserStorageKey() {
        return model.currentUserStorageKey;
    },

    getAddToCartText() {
        return model.addToCartText;
    },

    getCart() {
        return this.getUser().cart;
    },

    getInCartText() {
        return model.inCartText;
    },

    getProductByNumber( productNumber ) {
        for ( let product of this.getProducts() ) {
            if ( product.number === productNumber ) {
                return product;
            }
        }
    },

    getProductPageURL() {
        return model.productPageURL;
    },

    getProducts() {
        return model.products;
    },

    getProductsStorageKey() {
        return model.productsStorageKey;
    },

    getRemoveFromCartText() {
        return model.removeFromCartText;
    },

    getShownProductStorageKey() {
        return model.shownProductStorageKey;
    },

    getUser() {
        return model.user;
    },

    getUsers() {
        return model.users;
    },

    getUsersStorageKey() {
        return model.usersStorageKey;
    },

    goToProductPage() {
        window.location.href = this.getProductPageURL();
    },

    save() {
        localStorage.setItem( this.getUsersStorageKey(), JSON.stringify( this.getUsers() ) );
        localStorage.setItem( this.getCurrentUserStorageKey(), JSON.stringify( this.getUser() ) );
        localStorage.setItem( this.getProductsStorageKey(), JSON.stringify( this.getProducts() ) );
        console.log( 'Saved done!' );
    },

    saveProductToShow( updatedProduct ) {
        localStorage.setItem( this.getShownProductStorageKey(), JSON.stringify( updatedProduct ) );
    },

    showMore( productNumber ) {
        let product = this.getProductByNumber( Number( productNumber ) );

        // Save the product in storage so that the product page will be able to get 
        // it from storage and show it.
        this.saveProductToShow( product );

        // Go to the product page. It has all the information about the product.
        this.goToProductPage();
    },

    updateProduct( updatedProduct ) {
        let products = this.getProducts();
        for ( let product of this.getProducts() ) {
            if ( product.number === updatedProduct.number ) {
                let productIndex = products.indexOf( product );
                products[ productIndex ] = updatedProduct;
                console.log( `${ updatedProduct.name } updated in storage.` );
                break;
            }
        }
    },

    updateUser( updatedUser ) {
        let users = this.getUsers();
        for ( let user of users ) {
            if ( user.password === updatedUser.password ) {
                let userIndex = users.indexOf( user );
                users[ userIndex ] = updatedUser;
                console.log( `${ updatedUser.name } ${ updatedUser.surname } updated in storage.` );
                break;
            }
        }
    }
}


// ******* VIEW ******* //

const view = {
    default() {
        this.container = document.querySelector( '#container' );
        app.default();
        this.createProductBars();
    },

    createProductBars() {
        let products = app.getProducts();
        for ( let product of products ) {
            if ( product.inCart ) {
                this.container.innerHTML += `<div class='product-box'>
                        <div class='product-number'> ${ product.number } </div>
                        <div class='product-image'>
                            <img src='${ product.src }' alt='${ product.name }' />
                        </div>
                        <div class='product-price'> 
                            <i><b> Price: </b></i>
                            R${ product.price } 
                        </div>
                        <div>
                            <div class='inCart'> In cart </div>
                            <button class='product-button btn btn-primary' type='button' 
                                onclick='app.showMore( ${ product.number } )'> MORE </button>
                        </div>
                    </div>`;
            } else {
                this.container.innerHTML += `<div class='product-box'>
                        <div class='product-number'> ${ product.number } </div>
                        <div class='product-image'>
                            <img src='${ product.src }' alt='${ product.name }' />
                        </div>
                        <div class='product-price'> 
                            <i><b> Price: </b></i>
                            R${ product.price } 
                        </div>
                        <div>
                            <div class='inCart'></div>
                            <button class='product-button btn btn-primary text-button addToCartButtons' type='button' onclick='app.addToCart( this, ${ product.number } )'> ${ app.getAddToCartText() } </button>
                            <button class='product-button btn btn-primary' type='button' 
                                onclick='app.showMore( ${ product.number } )'> MORE </button>
                        </div>
                    </div>`;
            }
        }
    },

    updateUI( buttonElem ) {
        buttonElem.previousElementSibling.textContent = app.getInCartText();
        buttonElem.remove();
    }
}

// Start the app.
window.onload = view.default();

// I had to submit this task unfinished. I am falling behind.