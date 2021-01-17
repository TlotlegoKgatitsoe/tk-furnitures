/* File name: product.js
 * Author: Tlotlego Kgatitsoe
 * Date created: 18 February 2020
 * Last modified: 18 February 2020
 * Description: Ths JS file for "product.html"
 * TODO: create app.updateUser, app.updateProduct, app.
 */

// ******* MODEL ******* //

const model = {
    accountPageURL: 'account.html',
    addToCartText: 'Add To Cart',
    cartPageURL: 'cart.html',
    currentUserStorageKey: 'tk-furnitures-current-user',
    productPageURL: 'product.html',
    productsStorageKey: 'tk-furnitures-products',
    removeFromCartText: 'Remove From Cart',
    currentProductStorageKey: 'tk-furnitures-shown-product',
    usersStorageKey: 'tk-furnitures-users',

    default() {
        this.currentProduct = JSON.parse( localStorage.getItem( this.currentProductStorageKey ) );
        this.user = JSON.parse( localStorage.getItem( this.currentUserStorageKey ) );
        this.users = JSON.parse( localStorage.getItem( this.usersStorageKey ) );
        this.products = JSON.parse( localStorage.getItem( this.productsStorageKey ) );
    }
}


// ******* APP ******* //

const app = {
    default() {
        model.default();
    },

    addToCart() {
        let currentProduct = this.getCurrentProduct();
        currentProduct.inCart = true;
        this.getCart().items.push( currentProduct );
        console.log( `${ currentProduct.name } added to cart.` );
    },

    alertPrice( price ) {
        alert( `Total: R${ price }` );
    },

    getAccountPageURL() {
        return model.accountPageURL;
    },

    getAddToCartText() {
        return model.addToCartText;
    },

    getCart() {
        return this.getUser().cart;
    },

    getCurrentProduct() {
        return model.currentProduct;
    },

    getCurrentUserStorageKey() {
        return model.currentUserStorageKey;
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

    getTotal() {
        let total = 0;
        for ( let product of app.getCart().items ) {
            total += product.price;
        }
        return total;
    },

    getUser() {
        return model.user;
    },

    getUserById( userId ) {
        let users = this.getUsers();
        for ( let user of users ) {
            if ( user.id === userId ) {
                return user;
            }
        }
        return null;
    },

    getUsers() {
        return model.users;
    },

    getUsersStorageKey() {
        return model.usersStorageKey;
    },

    inCart( productNumber ) {
        let currentProduct = this.getCurrentProduct();
        for ( let product of this.getCart().items ) {
            if ( product.number === productNumber ) {
                console.log( `${ currentProduct.name } is in cart.` );
                return true;
            }
        }
        console.log( `${ currentProduct.name } is not in cart.` );
        return false;
    },

    removeFromCart( userProduct ) {
        let cart = app.getCart();
        for ( let product of cart.items ) {
            if ( product.number === userProduct.number ) {
                let productIndex = cart.items.indexOf( product );
                cart.items.splice( productIndex, 1 );
                cart.total -= userProduct.price;
                console.log( `Removed ${ userProduct.name } from user's cart.` );
            }
        }
    },

    save() {
        localStorage.setItem( this.getCurrentUserStorageKey(), JSON.stringify( app.getUser() ) ); // Save the user
        localStorage.setItem( this.getProductsStorageKey(), JSON.stringify( app.getProducts() ) ); // Save the products
        localStorage.setItem( this.getUsersStorageKey(), JSON.stringify( app.getUsers() ) ); // Save all the user's
        console.log( 'Saved successfully!' );
    },

    updateProduct( updatedProduct ) {
        let products = this.getProducts();
        for ( let product of products ) {
            if ( product.number === updatedProduct.number ) {
                let productIndex = products.indexOf( product );
                products[ productIndex ] = updatedProduct;
                console.log( `Updated ${ updatedProduct.name } successfully.` );
                break;
            }
        }
    },

    updateTotal() {
        app.getCart().total = this.getTotal();
    },

    updateUser( updatedUser ) {
        let users = this.getUsers();
        for ( let user of users ) {
            if ( user.id === updatedUser.id ) {
                let userIndex = users.indexOf( user );
                users[ userIndex ] = updatedUser;
                console.log( `Updated ${ user.name.original } ${ user.surname.original } successfully.` );
                break;
            }
        }
    }
}



// ******* VIEW ******* //

const view = {
    default() {
        app.default();

        // Add the data of the product to the page
        let product = app.getCurrentProduct();
        document.querySelector( '#product-name' ).textContent = product.name;
        document.querySelector( '#product-description' ).textContent = product.description;
        document.querySelector( '#product-price' ).textContent = `R${ product.price }`;
        productImageElem = document.querySelector( '#product-image' );
        productImageElem.src = product.src;
        productImageElem.alt = product.name;
        
        // Checks if the product is in the cart
        const addToCartBtn = document.querySelector( '#id_btn_add_to_cart' );
        let inCart = app.inCart( product.number );
        let total = app.getTotal();

        if ( !inCart ) {
            console.log( 'Not in cart.' );
            addToCartBtn.textContent = app.getAddToCartText();
        } else {
            console.log( 'In cart.' );
            addToCartBtn.textContent = app.getRemoveFromCartText();
        }

        // Add an event listener to the add to cart button
        addToCartBtn.onclick = () => {

            // If the product is not in the cart, we add it.
            if ( !inCart ) {
                total += product.price;
                app.updateTotal();
                app.addToCart( product );
                app.updateProduct( product );
                app.updateUser( app.getUser() );
                app.save();
                inCart = true;
                addToCartBtn.textContent = app.getRemoveFromCartText();
                app.alertPrice( total );
                console.log( `${ product.name } added to cart.` );
            } else {
                
                // The product is already in the cart, we remove it.
                total -= product.price;
                app.updateTotal();
                product.inCart = false;
                app.removeFromCart( product );
                app.updateProduct( product );
                app.updateUser( app.getUser() );
                app.save();
                inCart = false;
                addToCartBtn.textContent = app.getAddToCartText();
                app.alertPrice( total );
                console.log( `${ product.name } removed from cart.` );
            }
        }
    }
}

// Start the app.
window.onload = view.default();