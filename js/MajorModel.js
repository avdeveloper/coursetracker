define(["parse"], function (parse) {
  return function MajorModel () {
    var

    // ~private properties
    MajorQuery = new Parse.Query("Major"),
    majorsArray = [],

    // ~private methods

    /**
     * Just retrieve the name attribute from the object 
     * representation of the specified major
     * @param (Object) major The object representation of a major
     * @return (String) the name of the major
     */
    getName = function (major) {
      return major.get("name");
    },

    /**
     * Set the majorsArray to the array fetched from the database
     * @param ([Object]) majors An array of majors in Object format
     */
    sendMajorsArray = function (majors) {
      majorsArray = majors.map(getName);
    },

    /**
     * Just fetch all the majors in the beginning
     */
    findAllMajors = function () {
      MajorQuery.find().then(sendMajorsArray);
    },

    /**
     * Get the current value of the majors array
     * @return ([String]) An array of majors by their name
     */
    getMajors = function () {
      return majorsArray;
    },

    /**
     * Find a major that matches the name specified by the caller
     * @param (Object) request The query object containing the name of the major to look for
     * @param (Function*) next The function to call when a major/undefined is fetched
     */
    find = function (request, next) {
      MajorQuery.equalTo("name", request.name).first().then(next);
    };

    // ~constructor
    Parse.initialize('U9fUNVz6nQHRDZqIM3DaR9ydC3Vb6pMWhq5eyj60', 'eZ79KBnlJ3siGkndjM1LOsmcOsBhIAJXAXOd8rf1');
    findAllMajors();

    return {
      majorsArray: getMajors,
      find: find
    }; // return public API
  }; // return function
});
