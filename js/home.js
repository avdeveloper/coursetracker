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

require(["knockout", "HomeViewModel", "bootstrap"], function (ko, HomeViewModel) {
  ko.applyBindings(new HomeViewModel());
});
