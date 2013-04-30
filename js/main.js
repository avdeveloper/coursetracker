requirejs.config({
  paths: {
    "bootstrap": "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.3.1/js/bootstrap.min",
    "knockout": "//cdnjs.cloudflare.com/ajax/libs/knockout/2.2.1/knockout-min",
    "parse": "//www.parsecdn.com/js/parse-1.2.7.min",
    "jquery-ui": "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min"
  },
  shim: {
    "bootstrap": ["jquery"]
  }
});

require(["knockout", "FindMajorViewModel", "ShowMajorViewModel", "bootstrap"], function (ko, FindMajorViewModel, ShowMajorViewModel) {
  var 

  searchBoxContainer = document.getElementById("step1"),
  courseListingsContainer = document.getElementById("courseListing"),
  
  showMajorViewModel = new ShowMajorViewModel({
    container: courseListingsContainer
  }),

  findMajorViewModel = new FindMajorViewModel({
    searchBox: $("#step1 input"),
    updateActiveMajor: showMajorViewModel.updateActiveMajor
  });

  ko.applyBindings(findMajorViewModel, searchBoxContainer);
  ko.applyBindings(showMajorViewModel, courseListingsContainer);
});
