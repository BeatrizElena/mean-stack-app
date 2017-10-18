 // Module Getter Syntax -- angular.module('myApp'); -- gets a module "myApp" to which you can add -- .controller(.'MyController', MyController) -- 
 // where "MyController" will be handled by a function called MyController.
 angular.module('myApp').controller('MyController', MyController); 
 function MyController() {
     var vm = this;
     vm.name = "Bea";
 }