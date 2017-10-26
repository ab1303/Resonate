
(function () {
    'use strict';

    window.app = angular.module('resonateApp', [
        // Angular modules         
        'ui.router',
        'angularSpinner',
        'oitozero.ngSweetAlert',
        'ui.bootstrap',
        'ui.select',
        'ngSanitize',        
        'datatables',                   // Angular-datatables
        'datatables.fixedheader'

    ])
    .constant("appSettings", {
        baseUri: 'http://localhost:55920/',
        apiSuccessCode: 70003,
        resources: {
            ChequesApi: 'api/Cheques/'
        }
    })

    ;
})();
