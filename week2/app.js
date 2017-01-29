(function () {
'use strict';

// Since the service is required to be created as a .service,
//it is a Singleton and cannot be configured
angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    console.log("in ToBuyController");

    var showListToBuy = this;

    console.log("in ToBuyController");
//Requirement: toBuy list should be pre-populated with 5 items

    // ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    // ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    // ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    // ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    // ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    // ShoppingListCheckOffService.addItemToBuy("cookies", "10");

    showListToBuy.items = ShoppingListCheckOffService.getItemsToBuy();
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var buys = this;
    console.log("in AlreadyBoughtController ");

    ShoppingListCheckOffService.addItemToBought("cookies", "10");
    console.log("in AlreadyBoughtController; added item ");

    buys.items = ShoppingListCheckOffService.getBoughtItems();
    console.log("in AlreadyBoughtController; finished");

  }

  function ShoppingListCheckOffService() {
    var service = this;

    console.log("in service");

    //Requirement: initally empty
    var boughtItems = [];
    var toBuyItems = [];

    service.addItemToBuy = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      toBuyItems.push(item);
    };

    service.addItemToBought = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      toBuyItems.push(item);
    };


    service.getItemsToBuy = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }

})();
