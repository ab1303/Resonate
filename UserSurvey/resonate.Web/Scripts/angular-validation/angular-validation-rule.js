(function () {
    angular
      .module('validation.rule', ['validation'])
      .config(['$validationProvider', function ($validationProvider) {
          var expression = {
              required: function (value) {
                  return !!value;
              },
              requiredSelect: function (value) {
                  if (value==null) {
                      return false;
                  }

                  if (angular.isDefined(value.value)) {
                      return !!value.value;
                  } else
                      return !!value;
              },
              url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,              
              email: /^null$|^$|^(\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*([;, ]+)?)+/,
              number: /^\d+$/,
              numberGt0: function (value) {
                  return value > 0;
              },
              minlength: function (value, scope, element, attrs, param) {
                  if (!value) {
                      return true; // Don't validate if empty
                  }

                  return value.length >= param;
              },
              maxlength: function (value, scope, element, attrs, param) {
                  if (!value) {
                      return true; // Don't validate if empty
                  }

                  return value.length <= param;
              },              
              name: function (value) {
                  var nameRegExp = new RegExp("^$|^[a-zA-Z]+([a-zA-Z0-9\-'\\s]*)$");
                  return nameRegExp.test(value);
              }
              
          };

          var defaultMsg = {
              required: {
                  error: 'This field is required.'
              },
              requiredSelect: {
                  error: 'This field is required.',
                  success: 'It\'s Required'
              },
              url: {
                  error: 'Input should be valid Url'
              },
              email: {
                  error: 'This should be Email'
              },
              number: {
                  error: 'This should be Number'
              },
              numberGt0: {
                  error: 'should be greater than zero'
              },
              minlength: {
                  error: 'This should be longer'
              },
              maxlength: {
                  error: 'Input should be shorter'
              },              
              name: {
                  error: 'Name allows only alphanumeric characters and can start with alphabet only'
              }              
          };
          $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
      }]);
}).call(this);
