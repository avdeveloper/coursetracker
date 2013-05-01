define(["parse"], function (parse) {
  return function UserModel () {
    var

    // ~private properties
    User = new Parse.Object.extend("User"),

    // ~private methods

    getCurrentUser = function (next) {
      next(Parse.User.current());
    },

    /**
     * Generate a profile url from the user Parse object
     * @param (Object) user The Parse document for a user
     */
    getUserProfileURL = function (user) {
      this("/home.html");
    },

    /**
     * Save the user data to Parse database
     * @param (Object) userData The user's data retrieved from the form
     * @param (Function*) next The function to call when the user data is saved
     */
    save = function (userData, next) {
      var user = new User();
      console.log(userData);
      user.signUp(userData)
          .then(getUserProfileURL.bind(next));
    };

    // ~constructor
    Parse.initialize("U9fUNVz6nQHRDZqIM3DaR9ydC3Vb6pMWhq5eyj60", "eZ79KBnlJ3siGkndjM1LOsmcOsBhIAJXAXOd8rf1");

    return {
      save: save,
      getCurrentUser: getCurrentUser
    }; // public API
  }; // UserModel
}); // defintion
