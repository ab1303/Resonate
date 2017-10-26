//http://www.c-sharpcorner.com/uploadfile/theLizard/how-do-you-convert-numbers-to-words/

(function () {
    "use strict";

    var app = angular.module("resonateApp");

    app.filter('amountToWords', function () {
        return function (amount) {
            var th = ['', 'Thousand', 'Million', 'Billion', 'Trillion', 'Quadrillion', 'Quintillion'];
            var dg = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
            var tn = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
            var tw = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

            var splitIntoSets = function (number) {
                var set = [];
                var nSet = [];
                var nArray = number.split('');
                for (var i = 1; i <= nArray.length; ++i) {
                    set.push(nArray[nArray.length - i]);
                    if (i % 3 === 0) {
                        nSet.push(set.reverse().join(''));
                        set.length = 0;
                    }
                }

                if (set.length) nSet.push(set.reverse().join(''));

                return nSet;
            }

            var translateIntoWords = function (amount) {
                var translation = '';
                var amtArray = amount.split('');
                var u, t, h;
                if (amtArray.length === 3) {
                    u = amtArray[2];
                    t = amtArray[1];
                    h = amtArray[0];

                    if (h == 0) {
                        if (t > 1) {
                            translation = tw[t - 2];
                            if (u > 0) translation = (translation && (translation + ' ')) + dg[u];
                        }
                        else if (t == 1) translation = tn[u];
                        else if (t == 0) translation = (translation && (translation + ' ')) + dg[u];
                    } else {
                        translation = dg[h] + ' Hundred';
                        if (t > 1) {
                            translation = translation + ' ' + tw[t - 2];
                            if (u > 0) translation = (translation && (translation + ' ')) + dg[u];
                        }
                        else if (t == 1) translation = (translation && (translation + ' ')) + tn[u];
                        else if (t == 0) translation = (translation && (translation + ' ')) + dg[u];
                    }


                } else if (amtArray.length === 2) {
                    u = amtArray[1];
                    t = amtArray[0];
                    if (t > 1) {
                        translation = translation + ' ' + tw[t - 2];
                        if (u > 0) translation = (translation && (translation + ' ')) + dg[u];
                    }
                    else if (t == 1) translation = (translation && (translation + ' ')) + tn[u];
                    else if (t == 0) translation = (translation && (translation + ' ')) + dg[u];
                } else if (amtArray.length === 1) {
                    u = amtArray[0];
                    translation = dg[u];
                }

                return translation;
            }


            if (!amount) return '';

            console.log(amount);
            var s = amount.toString().replace(/[\, ]/g, '');
            if (!parseFloat(s)) return 'Not a number';



            var decimalIndex = s.indexOf('.');
            if ((decimalIndex > 15) || (decimalIndex === -1 && s.length > 15) || (s.indexOf('e+') > 0)) return 'Too big';


            if (decimalIndex > 0) s = parseFloat(amount).toFixed(2);

            var x;
            if (decimalIndex === -1)
                x = s.length;
            else x = decimalIndex;


            var wordTranslation = [];
            var nSets = splitIntoSets(s.substr(0, x));
            for (var set = 0; set < nSets.length; set++) {
                if (parseFloat(nSets[set])) {
                    var translation = translateIntoWords(nSets[set]);
                    wordTranslation.push({
                        amount: nSets[set],
                        translation: translation,
                        unit: th[set]
                    });
                } else {
                    wordTranslation.push({
                        amount: nSets[set],
                        translation: '',
                        unit: ''
                    });
                }

            }

            var fullAmountInWords = '';
            wordTranslation.reverse().forEach(function (segment) {
                if (!!fullAmountInWords && parseFloat(segment.amount)) fullAmountInWords += ', ';
                fullAmountInWords += segment.translation + ' ' + (segment.unit && segment.unit);
            });

            fullAmountInWords = fullAmountInWords && (fullAmountInWords + 'Dollars');
            // Handle cents part
            if (decimalIndex > 0) {
                if (fullAmountInWords.length > 0) fullAmountInWords += ' AND ';
                var centTranslation = translateIntoWords(s.substring(decimalIndex + 1));
                fullAmountInWords += centTranslation + ' Cents';
            }

            return fullAmountInWords.toUpperCase().replace(/\s+/g, ' ');
        };
    });

}());