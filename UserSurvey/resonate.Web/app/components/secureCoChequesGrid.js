(function () {
    "use strict";

    var app = angular.module("resonateApp");

    function chequesGrid(sweetAlert, $window, $uibModal, usSpinnerService, chequeRepository, dTOptionsBuilder, dTColumnDefBuilder) {
        usSpinnerService.stop('shellSpinner');
        var vm = this;
        vm.dtOptions = {};
        vm.dtColumnDefs = [];

        vm.$onInit = function () {
            vm.dtOptions = getGridOptions();
        }


        function getGridOptions() {
            var domPaging = "<'row'<'col-sm-3'i><'col-sm-5'><'col-sm-4' f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-5'i><'col-sm-7'>>";

            var gridoptions = dTOptionsBuilder.newOptions()
                    .withOption('bPaginate', false)
                    .withOption('ordering', false)
                    .withOption('lengthChange', false)
                    .withOption('autoWidth', false)
                    .withOption('responsive', true)
                    .withOption('aaSorting', [[0, 'desc']])
                    .withDataProp('data')
                    .withDOM(domPaging)

            ;


            return gridoptions;
        }


        vm.editChequeItem = function (chequeItem) {
            var modalParameters = {
                openMode: 'edit',

                chequeItem: chequeItem
            };

            var modalInstance = $uibModal.open({
                animation: true,
                size: 'md',
                templateUrl: '/app/templates/addEditChequeItem.html',
                controller: 'chequeModalInstanceCtrl as vm',
                resolve: {
                    modalParameters: modalParameters
                }
            });

            modalInstance.result.then(function (updatedChequeItem) {
                chequeRepository.updateCheque(chequeItem.chequeId, updatedChequeItem.firstName, updatedChequeItem.lastName, updatedChequeItem.amount).then(function (response) {
                    chequeItem.firstName = response.cheque.firstName;
                    chequeItem.lastName = response.cheque.lastName;
                    chequeItem.amount = response.cheque.amount;
                    chequeItem.dateChanged = response.cheque.dateChanged;

                    $window.toastr.success(response.message || 'Cheque item updated!', 'Success');

                }, function (response) {
                    console.log(response);
                    $window.toastr.error(response.message || 'Server error in updating cheque item', 'Error');

                });

            }, function () {

            });
        }

        vm.removeChequeItem = function (chequeItem) {
            // just mark the row for deletion
            // instead of removing from model
            sweetAlert.swal({
                title: "Are you sure?",
                text: "Cheque item will be removed from the table",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: true
            }, function (isConfirmed) {

                if (!isConfirmed) return;


                chequeRepository.deleteCheque(chequeItem.chequeId).then(function (response) {

                    var index = vm.chequesList.indexOf(chequeItem);
                    vm.chequesList.splice(index, 1);

                    $window.toastr.success(response.message || 'Cheque item removed!', 'Success');

                }, function (response) {
                    $window.toastr.error(response.message || 'Server error in removing cheque item', 'Error');
                    //sweetAlert.swal(response.message);
                });



            });
        }

    }


    app.component("resonateChequesGrid", {
        templateUrl: "/app/templates/chequesGridComponent.html",
        bindings: {
            chequesList: '<',
            dtInstance: '<'
        },
        controllerAs: "vm",
        controller: ['SweetAlert', '$window', '$uibModal', 'usSpinnerService',
            'chequeRepository', 'DTOptionsBuilder', 'DTColumnDefBuilder',
            chequesGrid]
    });

}());