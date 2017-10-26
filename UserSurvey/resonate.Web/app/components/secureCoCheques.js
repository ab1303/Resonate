(function () {
    "use strict";

    var app = angular.module("resonateApp");

    function chequeIndexController($window, $uibModal, usSpinnerService, chequeRepository) {
        /* jshint validthis:true */
        var vm = this;
        vm.chequesDtInstance = {};
        vm.chequesList = [];

        vm.$onInit = function() {
            queryCheques();
        }

     
        function queryCheques() {
            chequeRepository.getCheques().then(function (response) {
                vm.chequesList = response.cheques;
            }, function (response) {
                $window.toastr.error(response.message || 'Server error in fetching Cheques items', 'Error');
            });
        }

        vm.addChequeItem = function () {

            var modalParameters = {
                openMode: 'add',
                ChequesId: 0
            }


            var modalInstance = $uibModal.open({
                animation: true,
                size: 'md',
                templateUrl: '/app/templates/addEditChequeItem.html',
                controller: 'chequeModalInstanceCtrl as vm',
                resolve: {
                    modalParameters: modalParameters
                }
            });

            modalInstance.result.then(function (chequeItem) {
                chequeRepository.addCheque(chequeItem.firstName, chequeItem.lastName, chequeItem.amount).then(function (response) {
                    $window.toastr.success(response.message || 'Cheques item added!', 'Success');
                    vm.chequesList.push(response.cheque);
                    //queryCheques();
                }, function (response) {
                    $window.toastr.error(response.message || 'Server error in adding Cheques items', 'Error');
                });
            }, function () {

            });
        }

    }


    app.component("resonateCheques", {
        templateUrl: "/app/templates/chequesComponent.html",
        controllerAs: "vm",
        controller: ["$window", "$uibModal", "usSpinnerService", "chequeRepository", chequeIndexController]
    });

}());