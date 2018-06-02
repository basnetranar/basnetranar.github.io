'use strict';

angular.module('myApp.liveTable', ['ngRoute'])

.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$locationProvider.hashPrefix(''); //to remove ! sign in the URL
  $routeProvider.when('/liveTable', {
    templateUrl: 'liveTable/liveTable.html',
    controller: 'liveTableController'
  });
}])

.controller('liveTableController', ['$scope','$http','$interval',function($scope,$http,$interval) {
	$scope.referenceVar = "volume";

	$scope.dataArray = [];
	$scope.searchedData = ""; //search field value
	$scope.searchedDataArray = []; //final array sent to view
	$scope.arrangeOptions = {"defaultValue": 'Price (high-low)',
							"optionTypes": ['Price (high-low)','Price (low-high)','Traded Volume (high-low)','Traded Volume (low-high)'
							, 'Price Dropped % (1hr)', 'Price Increased % (1hr)', 'Price Dropped % (24hr)'
							, 'Price Increased % (24hr)', 'Price Dropped % (7 days)', 'Price Increased % (7 days)']
							};
	$scope.tableData = function(){

		$http.get('https://api.coinmarketcap.com/v2/ticker/?limit=100')
		.then(function successCallback(response){

//save datas in order of name, price, volume 24 hour traded, percent change in 1 hour, percent change in 24 hr, percent change in 7day

		$scope.result = (response.data);
		$scope.dataArray = [];

		for(var datas in $scope.result.data){
			var tempDataArray = {};
			tempDataArray.name=($scope.result.data[datas].name);
			tempDataArray.price=($scope.result.data[datas].quotes.USD.price);
			tempDataArray.volume_24h=($scope.result.data[datas].quotes.USD.volume_24h);
			tempDataArray.percent_change_1h=($scope.result.data[datas].quotes.USD.percent_change_1h);
			tempDataArray.percent_change_24h=($scope.result.data[datas].quotes.USD.percent_change_24h);
			tempDataArray.percent_change_7d=($scope.result.data[datas].quotes.USD.percent_change_7d);

			$scope.dataArray.push(tempDataArray);
			
		};
		
		$scope.currentTime = Date();

		}),
		function errorCallback(response) {
			console.log(response.data)};
		
	};
	
	$scope.tableData();
	$interval($scope.tableData,30000); //update the table every 30 seconds


	$scope.setNameAsReferenceVar = function(){
		$scope.referenceVar == "name" ? $scope.referenceVar = "-name" : $scope.referenceVar = "name";
	};
	$scope.setPriceAsReferenceVar = function(){
		$scope.referenceVar == "price" ? $scope.referenceVar = "-price" : $scope.referenceVar = "price";
	};
	$scope.setVolumeAsReferenceVar = function(){
		$scope.referenceVar == "volume_24h" ? $scope.referenceVar = "-volume_24h" : $scope.referenceVar = "volume_24h";
	};
	$scope.set1hrAsReferenceVar = function(){
		$scope.referenceVar == "percent_change_1h" ? $scope.referenceVar = "-percent_change_1h" : $scope.referenceVar = "percent_change_1h";
	};
	$scope.set24hrAsReferenceVar = function(){
		$scope.referenceVar == "percent_change_24h" ? $scope.referenceVar = "-percent_change_24h" : $scope.referenceVar = "percent_change_24h";
	};
	$scope.set7daysAsReferenceVar = function(){
		$scope.referenceVar == "percent_change_7d" ? $scope.referenceVar = "-percent_change_7d" : $scope.referenceVar = "percent_change_7d";
	};

}]);