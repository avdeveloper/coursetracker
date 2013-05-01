define(["UserModel"], function (UserModel) {
  return function ShowMajorHelper (self) {
    var

    // ~private properties
    model = new UserModel(),

    /**
     * Save a user to the database
     * @param (Object) user The user data to save
     * @param (Function*) next The function to call when the user is saved
     */
    saveUser = function (user, next) {
      model.save(user, next);
    },

    /**
     * Trim off the fat that bloats a Parse object
     * @param (Object) parseObject An object whose Parse methods need to be trimmed off
     * @param (Object) only return the attributes and the object id
     */
    trim = function (parseObject) {
      if (!parseObject) return {};
      var returnable = parseObject.attributes;
      returnable.id = parseObject.id;
      return returnable;
    },

    /**
     * Convert an array of courses taken to an object which includes a GPA value
     * @param ([String]) coursesTaken An array of courses the user has checked and marked as complete
     * @return (Object) an object that contains an uninitialized GPA
     */
    objectifyCoursesTaken = function (coursesTaken) {
      return coursesTaken.map(function (course) {
        return {
          gpa: -1,
          course: JSON.parse(course)
        };
      });
    },

    /**
     * Convert an object to an array whose value includes the index and data contained within
     * @param (Object) object The object that needs to be converted to an array
     * @return ([Object]) An array of tuples
     */
    convertToArray = function (object) {
      var returnable = [];

      for (var i in object) {
        returnable.push({
          department: i,
          courses: object[i]
        });
      }

      return returnable;
    },

    /**
     * Return the required courses object from the active major
     */
    getRequiredCourses = function () {
      try {
        return self.major().get("requiredCourses");
      }
      catch (MajorNotInitializedError) {
        return [];
      }
    },

    /**
     * Move a single course to the object of departments
     * @param (Object) course The course that needs to be moved to a specific department
     * @param (Object) this The object containing the departments
     */
    moveCourseToDepartment = function (course) {
      var department = course.department;
      if (this[department])
        this[department].push(course);
      else
        this[department] = [course];
    },

    /**
     * Checks if the item passed to this function is an object
     * @param (?) item The item whose type we need to check
     * @return (Boolean) true if the item is an object type
     */
    isObject = function (item) {
      return typeof item === "object";
    },

    /**
     * Convert an array of courses to a hash wherein each key is a department
     * @param ([Object]) courses The array of courses that need to be categorized
     * @return (Object) An object whose index match the departments and value is an array of courses that belong to that department
     */
    categorizeCoursesByDepartments = function (courses) {
      var returnable = {};

      courses.filter(isObject)
             .forEach(moveCourseToDepartment, returnable);

      return convertToArray(returnable);
    },

    /**
     * Sets the active major being displayed to the one specified by the caller
     * @param (Object) major The major to replace the view with
     */
    updateActiveMajor = function (major) {
      if (major) {
        var requiredCourses = major.get("requiredCourses");

        major.set("requiredCourses", categorizeCoursesByDepartments(requiredCourses));
        self.major(major);
      }
      else {
        console.error("The major is empty");
      }
    };
  
    return {
      updateActiveMajor: updateActiveMajor,
      getRequiredCourses: getRequiredCourses,
      objectifyCoursesTaken: objectifyCoursesTaken,
      trim: trim,
      saveUser: saveUser
    }; // public API
  }; // ShowMajorHelper
}); // definition
