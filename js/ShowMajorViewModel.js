define(["knockout", "ShowMajorHelper", "jquery-ui"], function (ko, ShowMajorHelper) {
  return function ShowMajorViewModel (options) {
    var

    // ~private properties
    self = this,
    helper = new ShowMajorHelper(self);

    // ~private methods

    // ~public properties
    self.major = ko.observable();
    self.coursesTaken = ko.observableArray();

    // ~public methods

    /**
     * Return the required courses from the active major
     */
    self.requiredCourses = ko.computed(function () {
      return helper.getRequiredCourses();
    }, self);

    /**
     * Update the active major with the one passed by the caller
     * @param (Object) major The major to update the view with
     */
    self.updateActiveMajor = function (major) {
      helper.updateActiveMajor(major);
    };

  }; // ShowMajorViewModel
}); // definition
