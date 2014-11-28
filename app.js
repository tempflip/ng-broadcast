
var app = angular.module('bce', []);

app.controller('ctrl', function($scope) {
	$scope.send = function() {
		if ($scope.message == '' || $scope.message == null) return;
		$scope.$broadcast('msg', $scope.message);
		$scope.message = '';
	}
	$scope.$on('msg', function(e, data) {
		$scope.msg = data;
	})
});

app.directive("listener", function() {
	function link(scope, element, attrs) {

		scope.$on('msg', function(e, data) {
			scope.message = data;
		})
	};

	return {
		restrict : 'E',
		link : link,
		scope : {},
		templateUrl : 'listener.html'
	}
});

app.directive("logger", function() {
	function link(scope, element, attrs) {
		scope.messages = [];
		scope.$on('msg', function(e, data) {
			scope.messages.push(data);
		})
	};

	return {
		restrict : 'E',
		link : link,
		scope : {},
		templateUrl : 'logger.html'
	}
});

app.directive("everyThird", function() {
	function link(scope, element, attrs) {
		scope.i = 0;
		scope.$on('msg', function(e, data) {
			scope.i++;
			if (scope.i >= 3) {
				scope.message = data;
				scope.i = 0;
			}
		})
	};

	return {
		restrict : 'E',
		link : link,
		scope : {},
		templateUrl : 'everyThird.html'
	}
});

app.directive("messenger", function($rootScope) {
	function link(scope, element, attrs) {
		scope.broadcast = function() {
			if (scope.message == '' || scope.message == null) return;
			$rootScope.$broadcast('msg', scope.message);
			scope.message = '';
		}
		scope.emit = function() {
			if (scope.message == '' || scope.message == null) return;
			scope.$emit('msg', scope.message);
			scope.message = '';
		}
	}

	return {
		restrict : 'E',
		link : link,
		scope : {},
		templateUrl : 'messenger.html'
	}
})

