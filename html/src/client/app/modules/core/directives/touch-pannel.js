'use strict';

angular.module('com.module.core').directive('touchPannel', function($swipe) {

    return {
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {
            elm.addClass('touchPannelout')
            var startX, startY;
            $swipe.bind($('body'), {
                'start': function(coords) {
                    startX = coords.x;
                    startY = coords.y;
                },
                'move': function(coords) {
                    //如果状态是list，那么就不执行;
                    if (scope.$state.current.name.indexOf('detail') == -1)return;
                    if (coords.x - startX > 10) {
                        elm.removeClass('touchpannelout').addClass('touchpannelin');
                    } else if (coords.x - startX < -10) {
                        elm.removeClass('touchpannelin').addClass('touchpannelout');
                    }
                },
                'end': function(coords) {


                },
                'cancel': function(coords) {}
            })
        }
    };
});
