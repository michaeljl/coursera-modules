(function () {
'use strict';

angular.module('NarrowItDownApp', [])
      .controller('NarrowDownController', NarrowDownController)
      .service('MenuSearchService', MenuSearchService)
      .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

NarrowDownController.$inject = ['MenuSearchService'];
function NarrowDownController(MenuSearchService) {
  var list = this;
  list.items = MenuSearchService.getItems();


}

MenuSearchService.$inject('$http', 'ApiBasePath');
function MenuSearchService() {
  var service = this;

  service.getMatchedMenuItems(searchTerm) {
    function () {
    var response = $http({
      method: "LIST",
      url: (ApiBasePath + "/categories.json"),
      params: searchTerm
    });

    return response;
  };
}

})();
