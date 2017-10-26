

(function () {
    'use strict';

    angular
      .module('resonateApp')
      .factory('chequeRepository', chequeRepository);

    chequeRepository.$inject = ['appSettings', '$http', '$q', 'usSpinnerService'];

    function chequeRepository(appSettings, $http, $q, usSpinnerService) {
        var service = {
            getCheques: getCheques,
            addCheque: addCheque,
            updateCheque: updateCheque,
            deleteCheque: deleteCheque
        };

        return service;

        function getCheques() {

            usSpinnerService.spin('shellSpinner');
            var url = appSettings.baseUri + appSettings.resources.ChequesApi;
            var deferred = $q.defer();

            $http.get(url, {

            }).then(function (response) {
                   usSpinnerService.stop('shellSpinner');

                   if (response.data.cheques && response.data.code === appSettings.apiSuccessCode) {
                       deferred.resolve({
                           status: 'success',
                           message: response.data.message || '',
                           cheques: response.data.cheques
                       });

                   } else {
                       deferred.reject({
                           status: 'error',
                           message: response.data.message || ''
                       });
                   }
               }, function (response) {
                   usSpinnerService.stop('shellSpinner');

                   deferred.reject({
                       httpStatusCode: response.status,
                       status: 'error',
                       message: response.statusText
                   });
               });

            return deferred.promise;

        }

        function addCheque(firstName, lastName, amount) {

            usSpinnerService.spin('shellSpinner');
            var deferred = $q.defer();
            var url = appSettings.baseUri + appSettings.resources.ChequesApi;


            if (!firstName) {
                usSpinnerService.stop('shellSpinner');
                deferred.reject({
                    status: 'error',
                    message: 'FirstName is not provided'
                });
                return deferred.promise;
            }

            if (!lastName) {
                usSpinnerService.stop('shellSpinner');
                deferred.reject({
                    status: 'error',
                    message: 'LastName is not provided'
                });
                return deferred.promise;
            }

            if (!amount) {
                usSpinnerService.stop('shellSpinner');
                deferred.reject({
                    status: 'error',
                    message: 'Amount is not provided'
                });
                return deferred.promise;
            }

            $http.post(url, {
                firstName: firstName,
                lastName: lastName,
                amount: amount
            }).then(function (response) {
                usSpinnerService.stop('shellSpinner');

                if (response.data.cheque && response.data.code === appSettings.apiSuccessCode) {
                    deferred.resolve({
                        cheque:response.data.cheque,
                        status: 'success',
                        message: response.data.message || '',
                    });
                } else {
                    deferred.reject({
                        status: 'error',
                        message: response.data.message || ''
                    });
                }


            }, function (msg, code) {
                usSpinnerService.stop('shellSpinner');
                deferred.reject({
                    httpStatusCode: code,
                    status: 'error',
                    message: msg || 'Server Error, Please cheque Administrator'
                });
            });


            return deferred.promise;
        }

        function updateCheque(id, firstName, lastName, amount) {

            usSpinnerService.spin('shellSpinner');
            var deferred = $q.defer();
            var url = appSettings.baseUri + appSettings.resources.ChequesApi + id;


            if (!firstName) {
                usSpinnerService.stop('shellSpinner');
                deferred.reject({
                    status: 'error',
                    message: 'FirstName is not provided'
                });
                return deferred.promise;
            }

            if (!lastName) {
                usSpinnerService.stop('shellSpinner');
                deferred.reject({
                    status: 'error',
                    message: 'LastName is not provided'
                });
                return deferred.promise;
            }

            if (!amount) {
                usSpinnerService.stop('shellSpinner');
                deferred.reject({
                    status: 'error',
                    message: 'Amount is not provided'
                });
                return deferred.promise;
            }


            $http.put(url, {
                firstName: firstName,
                lastName: lastName,
                amount: amount
            }).then(function (response) {
                usSpinnerService.stop('shellSpinner');

                if (response.data.cheque && response.data.code === appSettings.apiSuccessCode) {
                    deferred.resolve({
                        cheque: response.data.cheque,
                        status: 'success',
                        message: response.data.message || '',
                    });
                } else {
                    deferred.reject({
                        status: 'error',
                        message: response.data.message || ''
                    });
                }


            }, function (msg, code) {
                usSpinnerService.stop('shellSpinner');
                deferred.reject({
                    httpStatusCode: code,
                    status: 'error',
                    message: msg || 'Server Error, Please cheque Administrator'
                });
            });


            return deferred.promise;


        }

        function deleteCheque(id) {
            usSpinnerService.spin('shellSpinner');

            var deferred = $q.defer();
            if (!id) {
                deferred.reject({
                    status: 'error',
                    message: 'Invalid parameter'
                });
            }

            var url = appSettings.baseUri + appSettings.resources.ChequesApi + id;
            $http.delete(url)
               .then(function (response) {
                   usSpinnerService.stop('shellSpinner');

                   if (response.data.code === appSettings.apiSuccessCode) {
                       deferred.resolve({
                           status: 'success',
                           message: response.data.message || ''
                       });

                   } else {
                       deferred.reject({
                           status: 'error',
                           message: response.data.message || ''
                       });
                   }
               }, function (response) {
                   usSpinnerService.stop('shellSpinner');
                   deferred.reject({
                       httpStatusCode: response.status,
                       status: 'error',
                       message: response.statusText || 'Error removing cheque'
                   });
               });

            return deferred.promise;
        }

    }

})();