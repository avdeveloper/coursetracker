define(["knockout", "ShowMajorHelper", "jquery-ui"], function (ko, ShowMajorHelper) {
  return function ShowMajorViewModel (options) {
    var

    // ~private properties
    self = this,
    helper = new ShowMajorHelper(self);

    // ~private methods

    // ~public properties
    self.userName = ko.observable();
    self.userEmail = ko.observable();
    self.userPassword = ko.observable();
    self.major = ko.observable();
    self.coursesTaken = ko.observableArray();

    // ~public methods

    /**
     * Add the user
     */
    self.saveUser = function () {
      helper.saveUser(self.user(), function (redirectURI) {
        window.location = redirectURI;
      });
    },

    /**
     * Return the required courses from the active major
     */
    self.requiredCourses = ko.computed(function () {
      return helper.getRequiredCourses();
    }, self);

    /**
     * Return the user data
     */
    self.user = ko.computed(function () {
      return {
        username: self.userName(),
        email: self.userEmail(),
        password: self.userPassword(),
        major: helper.trim(self.major()),
        coursesTaken: helper.objectifyCoursesTaken(self.coursesTaken())
      };
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
