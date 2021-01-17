/* File name: account.js
 * Author: Tlotlego Kgatitsoe
 * Date created: 19 February 2020
 * Last modified: 19 February 2020
 * Description: Ths JS file for "account.html"
 */

// All the variables

// ******** MODEL ******** //

const model = {
    currentUserStorageKey: 'tk-furnitures-current-user',

    default() {
        this.user = JSON.parse( localStorage.getItem( this.currentUserStorageKey ) );

        if ( !this.user ) {
            alert( 'An error occured. Please clear all the storage for this page and create a new account.' );
        } else {
            console.log( 'Model loaded successfully.' );
        }
    }
}


// ******** APP ******** //

const app = {
    default() {
        model.default();
    },

    getUser() {
        return model.user;
    }
}


// ******** VIEW ******** //


const view = {
    default() {
        app.default();
        view.showUserInfo();
    },

    showUserInfo() {
        let user = app.getUser();
        document.querySelector( '#user-name' ).textContent = user.name.original;
        document.querySelector( '#user-surname' ).textContent = user.surname.original;
        document.querySelector( '#user-password' ).textContent = user.password;
    }
}

// Start the app
window.onload = () => {
    view.default();
}