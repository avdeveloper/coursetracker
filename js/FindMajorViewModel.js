define(["knockout", "FindMajorHelper"], function (ko, FindMajorHelper) {
  return function FindMajorViewModel (options) {
    var
    
    // ~private properties
    self = this,
    helper = new FindMajorHelper(self);

    // ~public properties
    self.keywords = ko.observable("");

    // ~public methods
    self.findMajor = function () {
      helper.findMajor(self.keywords(), options.updateActiveMajor);
    };

    // ~constructor
    helper.initializeAutoComplete(options.searchBox);
  };
});
