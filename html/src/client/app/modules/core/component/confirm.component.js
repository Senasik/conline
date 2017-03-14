(function() {
	'use strict';
	angular.module('com.module.core')
		.component('confirmComponent', {
			templateUrl: 'modules/core/views/elements/confirmcomponent.html',
			bindings: {
				resolve: '<',
				close: '&',
				dismiss: '&'
			},
			controller: function() {
				var $ctrl = this;

				$ctrl.$onInit = function() {
					$ctrl.content = $ctrl.resolve.content;
					$ctrl.context = $ctrl.resolve.context;
					$ctrl.bodyUrl = $ctrl.resolve.bodyUrl;
				};

				$ctrl.ok = function() {
					$ctrl.close({
						$value: $ctrl.context
					});
				};

				$ctrl.cancel = function() {
					$ctrl.dismiss({
						$value: 'cancel'
					});
				};
			}
		});
})();