(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
      .controller('ToBuyController', ToBuyController)
      .controller('AlreadyBoughtController', AlreadyBoughtController)
      .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {

    var showListToBuy = this;

    ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    ShoppingListCheckOffService.addItemToBuy("cookies", "10");
    ShoppingListCheckOffService.addItemToBuy("cookies", "10");

    showListToBuy.items = ShoppingListCheckOffService.getItemsToBuy();

    showListToBuy.buyItem = function (index) {
      ShoppingListCheckOffService.addItemToBought(showListToBuy.items[index]);
      showListToBuy.items.splice(index, 1);
    }
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {

    var buys = this;

    buys.items = ShoppingListCheckOffService.getBoughtItems();

  }

  function ShoppingListCheckOffService() {
    var service = this;

    var boughtItems = [];
    var toBuyItems = [];

    service.addItemToBuy = function (itemName, quantity) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      toBuyItems.push(item);
    };

    service.addItemToBought = function (item) {
      boughtItems.push(item);
    };


    service.getItemsToBuy = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }

})();
