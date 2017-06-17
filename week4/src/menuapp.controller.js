(function () {
  'use strict';



  angular.module('NarrowItDownApp')
  .controller('NarrowItDownController', NarrowItDownController);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;

    list.found = [];
    list.searchTerm = "";
    list.warning= "";

    list.isListEmpty = function () {
      if (list.found.length == 0 ) {
        return true;
      }
      return false;
    }

    list.foundItems = function() {
      //reset the list
      list.found = [];
      var foundItemsPromise = MenuSearchService.getMatchedMenuItems(list.searchTerm);
      foundItemsPromise.then(function (response) {
          var rawItems =response.data.menu_items;

          //check if there is a search term
          if (Object.keys(list.searchTerm).length == 0 ) {
            list.warning = "Nothing found";
            return;
          } else {
            list.warning="";
          }

          angular.forEach(rawItems, function(item){
              if (item.description.includes(list.searchTerm)) {
                var itemToInsert = {
                  name: item.name,
                  short: item.short_name,
                  description : item.description
                }
                list.found.push(itemToInsert);
              }
            });
            console.log("FoundItems: ", list.found);

            //ugly but running out of time
            if (list.found.length == 0) {
              list.warning = "Nothing found";
            } else {
              list.warning = "";
            }

        })
        .catch(function (errorResponse) {
          console.log('Error: ', errorResponse.message);
        });
      }
  }
});
