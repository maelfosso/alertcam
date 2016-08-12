var variables = angular.module('alertcam.surveillance')

variables.controller("AddVariables", function($scope, $stateParams, $http, $log, Variable) {
	var datasourceID = $stateParams.datasourceId;
	

	$http.get('/resource/surveillance/data-sources/' + datasourceID + '/variables')
	.success(function(response) {
		$log.debug(response);
		
		$scope.variables = response;

		$scope.variables.unshift(new Variable('sample', 'sample', 'Unknown', 'Time'));
		$scope.variables.unshift(new Variable('sample', 'sample', 'Unknown', 'Population'));
		$scope.variables.unshift(new Variable('sample', 'sample', 'Unknown', 'Place'));
		$scope.variables.unshift(new Variable('sample', 'sample', 'Unknown', 'Other'));
	}).error(function(error) {
		$log.error(error);
	});
	

	$scope.format_date = [
	                      'dd/MM/YYYY', 
	                      'YYYY-MM-dd', 
	                      'YYYY-MM'
	                    ]
	$http.get('/resource/surveillance/data-sources/' + datasourceID + '/columns')
	.success(function(response) {
		// $log.debug($scope.variables);
		$log.debug('Columns success !!!');
				
		$scope.all_columns = response;
		$scope.columns = [];
		if ($scope.variables.length > 0) {
			$log.debug("Variables are there");
			for (i = 0; i < $scope.all_columns.length; i++) {
				for (j = 0; j < $scope.variables.length; j++) {
					if (($scope.variables[j].name != $scope.all_columns[i].name) ||
							($scope.variables[j].parent != $scope.all_columns[i].parent)) {
						
						$scope.columns.push($scope.all_columns[i]);
						break;
					}
				}
				
			}
		} else {
			$log.debug('Not variables !!!!');
			angular.copy($scope.all_columns, $scope.columns);
		}
		
	}).error(function(error) {
		$log.error(error);
	});
	
	$scope.availableColumns = function() {
		return $scope.columns.filter(function(col) {
			var into = false;	
			
		})
	}

    $scope.onMoved = function(items, index) {
    	// $log.debug('On Moved');
    	var item = items[index];
    	// $log.debug(item);
    	$scope.columns = $scope.columns.filter(function(col) {
    		return !(item.name == col.name && item.parent == col.parent && item.type == col.type);
    	});
    	items.splice(index, 1);
    }
    
    $scope.onInserted = function(items, item) {
    	$log.debug('On Inserted .... ' + items[0].axis);
    	item = new Variable(item.name, item.type, item.parent, items[0].axis);
    	$log.debug(items);
    	$log.debug(item);
    	$log.debug($scope.variables);
    	// item.axis = items[0].axis;
    	
    	/*if (item.axis == 'Time') {
    		$log.debug('On Time axis inserted');
    		
    		$log.debug(item);
    	}*/
    }
    
    $scope.onDrop = function(items, item) {
    	$log.debug('On Drop ...');
    	$log.debug(item);
    	
    	var i = new Variable(item.name, item.type, item.parent, items[0].axis); 
    	i.dashboard = datasourceID;
    	
    	return new Variable(item.name, item.type, item.parent, items[0].axis);
    }
    
    $scope.collapse = function($event) {
    	var el = jQuery($event.target).parent().closest(".panel").children(".list-group");
    	
		if($($event.target).hasClass("collapses")) {
			$($event.target).addClass("expand").removeClass("collapses");
			el.slideUp(200);
		} else {
			$($event.target).addClass("collapses").removeClass("expand");
			el.slideDown(200);
		}
    }
    
    $scope.go = function() {
    	$log.debug('Gooo');
    	var vars = $scope.variables.filter(function(v) {
    		return !(v.name == 'sample' && v.type == 'sample' && v.parent == 'Unknown')
    	})
    	$log.debug(vars);
    	$log.debug($scope.variables);
    	
    	$http.post('/resource/surveillance/data-sources/' + datasourceID + '/variables', vars)
    	.success(function(response) {
    		$log.debug(response);
    		
    		$state.go('surveillance.list');
    	})
    	.error(function(error) {
    		$log.error(error);
    	});
    	
    	$state.go()
    }
});