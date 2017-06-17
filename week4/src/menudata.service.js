(function () {
  'use strict';

  angular.module('NarrowItDownApp')
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/");

  function MenuSearchService() {
    var service = this;

    service.getAllCategories = function {

    };

    service.getItemForCategory  = function (categoryShortName) {

    };

  }

});
