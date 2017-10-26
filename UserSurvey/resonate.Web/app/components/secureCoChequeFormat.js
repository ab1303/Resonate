(function () {
    "use strict";

    var app = angular.module("resonateApp");

    function chequeIndexController() {
        /* jshint validthis:true */
        var vm = this;
       
        vm.$onInit = function() {

        }
    }


    app.component("resonateChequeFormat", {
        templateUrl: "/app/templates/chequeFormat.html",
        bindings: {
          cheque:'<'  
        },
        controllerAs: "vm",
        controller: [chequeIndexController]
    });

}());