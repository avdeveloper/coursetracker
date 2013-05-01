define(["knockout", "UserModel"], function (ko, UserModel) {
  return function HomeHelper (self) {
    var
    
    // ~private properties
    userModel = new UserModel(),

    // ~private methods
    calculateCredits = function (courses) {
      var credits = 0;
      for (var i = 0, len = courses.length; i < len; i++) {
        credits += parseInt(courses[i].course.credits);
      }
      return credits;
    },

    getNames = function (course) {
      return course.course.name;
    },

    updateCurrentUser = function (user) {
      if (!user) return undefined;

      self.user(user.attributes);
      self.coursesTaken(user.attributes.coursesTaken.map(getNames));
      self.credits(calculateCredits(user.attributes.coursesTaken));
      console.log(self.credits());
    };

    // ~public properties
    self.user = ko.observable();
    self.credits = ko.observable();
    self.coursesTaken = ko.observable();

    // ~public methods
    self.isCompleted = function (course) {
      return self.coursesTaken().indexOf(course.name) > -1;
    };

    // ~constructor
    userModel.getCurrentUser(updateCurrentUser);
    
    return {
    }; // public API
  }; // HomeHelper
}); // definition
