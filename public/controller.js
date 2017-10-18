 // Module Getter Syntax -- angular.module('myApp'); -- gets a module "myApp" to which you can add -- .controller(.'MyController', MyController) -- 
 // where "MyController" will be handled by a function called MyController.
 angular.module('myApp').controller('MyController', MyController).controller('AboutController', AboutController); 
 
 function MyController() {
     var vm = this;
     vm.name = "Bea";
 }

 function AboutController() {
     var vm = this;
     vm.about = "This is my bio";
 }