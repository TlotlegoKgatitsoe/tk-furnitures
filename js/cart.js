/* File name: script.js
 * Author: Tlotlego Kgatitsoe
 * Date created: 19 February 2020
 * Last modified: 19 February 2020
 * Description: Ths JS file for "cart.html"
 */

// ********** MODEL ********** //

const model = {
    accountPageURL: 'account.html',
    accountPageURL: 'cart.html',
    currentUserStorageKey: 'tk-furnitures-current-user',
    productPageURL: 'product.html',
    productsStorageKey: 'tk-furnitures-products',

    default() {

    	// Get the user.
        this.user = JSON.parse( localStorage.getItem( this.currentUserStorageKey ) );
    }
}


// ********** APP ********** //

const app = {
    default() {
    	model.default();
    },

    calcVat( productPrice ) {
    	return Math.round( ( productPrice / 100 ) * 15, 1 );
    },

    getCart() {
    	return this.getUser().cart;
    },

    getProducts() {
    	return this.getCart().items;
    },

    getTotal() {
    	return this.getCart().total;
    },

    getUser() {
        return model.user;
    },
}


// ********** VIEW ********** //

const view = {
    default() {
    	app.default();
    	this.createProductsTable();
    },

    createProductsTable() {

        // Create all needed variables
        const noItemsElem = document.querySelector( '#noItems' );
        const tableElem = document.querySelector( 'table' );
        let count = 0;
		let products = app.getProducts();

		// Check if there are products in the cart
		if ( products.length > 0 ) {
			tableElem.style.display = 'block';
		} else {
			noItemsElem.style.display = 'block';
		}

		// Adds all the products to the table
		for ( let product of products ) {
			tableElem.innerHTML += `
				<tr>
					<td class='number'> ${ ++count } </td>
					<td> ${ product.name } </td>
					<td> <img src='${ product.src }' alt='${ product.name }' /> </td>
					<td> R${ app.calcVat( product.price ) } </td>
					<td> R${ product.price } </td>
				</tr>`;
		}

		// Create the last row of the table.
		tableElem.innerHTML += `
			<tr>
				<td colspan='4'> Total: </td>
				<td id='total'> R${ app.getTotal() } </td>
			</tr>`;
    }
}

// Start the app
window.onload = view.default();