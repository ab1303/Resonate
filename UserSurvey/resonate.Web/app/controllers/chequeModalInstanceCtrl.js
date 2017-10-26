(function () {
    'use strict';

    angular
        .module('resonateApp')
        .controller('chequeModalInstanceCtrl', chequeModalInstanceCtrl);

    chequeModalInstanceCtrl.$inject = ['$uibModalInstance', 'chequeRepository', 'modalParameters'];

    function chequeModalInstanceCtrl($uibModalInstance, chequeRepository, modalParameters) {
        /* jshint validthis:true */
        var vm = this;
        vm.submitFormText = '';
        vm.isEditMode = modalParameters.openMode !== 'add';
      
        activate();

        function activate() {
            vm.submitFormText = (modalParameters.openMode === 'add') ? 'Add Cheque' : 'Update';

            if (modalParameters.openMode === 'add') {
                vm.chequeItem = {
                    id: -1,
                    firstName: '',
                    lastName: '',
                    amount: ''
                };
            } else {
                vm.chequeItem = angular.copy(modalParameters.chequeItem);
            } 

        }


        vm.submitForm = function (isFormValid) {
            if (isFormValid) {
                $uibModalInstance.close(vm.chequeItem);
            }

        };
       
       
        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

      

    }


})();
