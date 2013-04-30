define([], function () {
  return function ShowMajorHelper (self) {
    var

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
      getRequiredCourses: getRequiredCourses
    }; // public API
  }; // ShowMajorHelper
}); // definition
