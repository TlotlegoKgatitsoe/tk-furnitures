/* File name: index.js
 * Author: Tlotlego Kgatitsoe
 * Date created: 14 February 2020
 * Last modified: 21 February 2020
 * Description: Ths JS file for "index.html"
 */

//****** MODEL ******//

const model = {
    currentUserStorageKey: 'tk-furnitures-current-user',
    cataloguePageURL: 'catalogue.html',
    userStorageKey: 'tk-furnitures-current-user',
    usersStorageKey: 'tk-furnitures-users',
    
    default() {
        this.user = {};
        this.users = JSON.parse( localStorage.getItem( this.usersStorageKey ) );

        if ( !this.users ) {
            this.users = [];
        }
    }
}



// ******* APP ******* //

const app = {
    addUser( newUser ) {
        this.getUsers().push( newUser );
        console.log( `Created a new user: ${ newUser.name.original } ${ newUser.surname.original }` );
    },

    createUserId() {
        return new Date().toString();
    },

    getUserByPassword( userPassword ) {
        let users = this.getUsers();
        for ( let user of users ) {
            if ( user.password === userPassword ) {
                return user;
            }
        }
        return null;
    },

    getCataloguePageURL() {
        return model.cataloguePageURL;
    },

    getCurrentUserStorageKey() {
        return model.currentUserStorageKey;
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

    goToCataloguePage() {
        window.location.href = this.getCataloguePageURL();
    },

    save() {
        localStorage.setItem( this.getCurrentUserStorageKey(), JSON.stringify( this.getUser() ) );
        localStorage.setItem( this.getUsersStorageKey(), JSON.stringify( this.getUsers() ) );
        console.log( 'Save done' );
    }
}


// ******* VIEW ******* //

const view = {
    default() {
        model.default();
        // Create all the variables
        this.nameElem = document.querySelector( '#userName' );
        this.surnameElem = document.querySelector( '#userSurname' );
        this.passwordElem = document.querySelector( '#userPassword' );
        this.passwordRepeatElem = document.querySelector( '#userPasswordRepeated' );
        this.newUserElem = document.querySelector( '#newUser' );
        this.oldUserElem = document.querySelector( '#oldUser' );
        this.submitBtn = document.querySelector( '#id_btn_submit' );
        this.isNewUser = false;
        this.currentUserPassword = 0;

        // Add event listeners to the html elements
        this.newUserElem.onchange = () => { 
            this.passwordRepeatElem.style.display = 'block';
            this.isNewUser = true;
        }
        this.oldUserElem.onchange = () => { 
            this.passwordRepeatElem.style.display = 'none';
            this.isNewUser = false; 
        }
        this.submitBtn.onclick = () => {
            if ( this.isNewUser ) {
            
                // Validate the app
                if ( Number( this.passwordElem.value ) !== Number( this.passwordRepeatElem.value ) ) {
                    alert( 'Your passwords are not the same. Please retype your password.' );
                    this.passwordElem.value = null;
                    this.passwordRepeatElem.value = null;
                    return;
                }

                // If the passwords are identical then we create the user
                let user = app.getUser();
                user.name = {
                    original: this.nameElem.value,
                    lowercase: this.nameElem.value.toLowerCase()
                };
                user.surname = {
                    original: this.surnameElem.value,
                    lowercase: this.surnameElem.value.toLowerCase()
                };
                user.cart = {
                    items: [],
                    total: 0
                };
                user.password = Number( this.passwordElem.value );
                user.id = app.createUserId();
                
                // Adds the new user to the users array.
                app.addUser( user );

                // Saves the new user as the current user and saves the users array.
                app.save();

                // Notify the user that 
                alert( `Your account has been created. You are now logged in.` );

                // Goes to the next page.
                app.goToCataloguePage();
            } else {

                // Find the user in the users array using the password of the user
                let user = app.getUserByPassword( Number( this.passwordElem.value ) );
                if ( !user ) {
                    alert( 'The user could not be found. Make sure that your password is typed correctly.' );
                } else {
                    alert( `Welcome back, ${ user.name.original } ${ user.surname.original }.` );
                    app.save();
                    app.goToCataloguePage();
                }
            }
        }
    }
}

// Start the app.
window.onload = view.default();