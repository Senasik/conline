'use strict';

angular.module('com.module.core').directive('touchPannel', function($swipe) {

    return {
        restrict: 'A',
        link: function(scope, elm, attrs, ctrl) {
            var startX,startY;
            $swipe.bind($('body'), {
                'start': function(coords) {
                    startX = coords.x;
                    startY = coords.y;
                },
                'move': function(coords) {
                    if(window.innerWidth > 760)return;
                     if(coords.x - startX > 10){
                    elm.css({left: 0})
                    
                  }else if(coords.x - startX < -10){
                    elm.css({
                        left: '-80%'
                    });
                  }
                },
                'end': function(coords) {
                 
                  
                },
                'cancel': function(coords) {}
            })
        }
    };
});
