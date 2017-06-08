(function () {
  'use strict';



  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/")
  .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var found = [];
    //get the search term
    var searchTerm = "chicken broth with egg drop";

    this.foundItems = function(searchTerm) {
      var foundItemsPromise = MenuSearchService.getMatchedMenuItems(searchTerm);

      foundItemsPromise.then(function (response, searchTerm) {
          //console.log('Resposne: ', response.data);
          var rawItems =response.data.menu_items;

          angular.forEach(rawItems, function(item){
                  //console.log(item);
              if (item.description.includes(searchTerm)) {
                  var itemToInsert = {
                    description : item.description
                  }
                  found.push(itemToInsert);
              }
            });
            console.log("FoundItems: ", found);

        })
        .catch(function (errorResponse) {
          console.log('Error: ', errorResponse.message);
        });
      }

  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'items',
      bindToController: true
    };

    return ddo;
  }

  FoundItemsDirectiveController.$inject = ['MenuSearchService'];
  function FoundItemsDirectiveController(MenuSearchService) {
    var listItem =this;

    listItem.remove = function(itemIndex) {
      MenuSearchService.removeItem(itemIndex);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        console.log("In call: ", ApiBasePath);
        var response = $http(
          {
            method: 'GET',
            url: (ApiBasePath + 'menu_items.json')
          });
          return response;
        };

      service.removeItem = function (itemIndex) {
        console.log("Removing: ", itemIndex);
  //          items.splice(itemIndex, 1);
      };

    }
})();
