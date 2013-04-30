define(["MajorModel"], function (MajorModel) {
  return function FindMajorHelper (self) {
    var

    // ~private properties
    model = new MajorModel();

    /**
     * Suggest majors that User may be looking for
     * @param (jQuery DOM) element The search box element
     */
    initializeAutoComplete = function (element) {
      element.typeahead({
        source: model.majorsArray
      });
    },

    /**
     * Find a major given by the major name
     * @param (String) majorName The name of major to look for
     * @param (Function*) next The function to call when data is received
     */
    findMajor = function (majorName, next) {
      model.find({ name: majorName }, next);
    };

    return {
      initializeAutoComplete: initializeAutoComplete,
      findMajor: findMajor
    }; // return public API
  }; // return function
});
