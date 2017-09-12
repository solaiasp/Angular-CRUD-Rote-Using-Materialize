var app=angular.module('single-page-app',['ngRoute']);


app.config(function($routeProvider){


      $routeProvider
          .when('/',{
                templateUrl: 'home.html',
             controller  : 'addController',
             activetab: 'home'
          })
          .when('/remove',{
                templateUrl: 'remove.html',
                 controller  : 'addController',
                 activetab: 'remove'
          });


});

app.service('filteredListService', function () {

    this.searched = function (valLists, toSearch) {
        return _.filter(valLists,

        function (i) {
            /* Search Text in all 3 fields */
            return searchUtil(i, toSearch);
        });
    };

    this.paged = function (valLists, pageSize) {
        retVal = [];
        for (var i = 0; i < valLists.length; i++) {
            if (i % pageSize === 0) {
                retVal[Math.floor(i / pageSize)] = [valLists[i]];
            } else {
                retVal[Math.floor(i / pageSize)].push(valLists[i]);
            }
        }
        return retVal;
    };

});



app.controller('addController',function($scope, $http, $route, filteredListService){
      $('.progress').show();
      $scope.$route = $route;
      $scope.message="Hello world";
       var url = 'https://api.myjson.com/bins/1edijl';


      $http.get(url).then( function(response) {
            console.log(response['data']);
            $scope.gridcontents=response['data'];
            $('.progress').hide();

            $scope.currentPage = 0;
            $scope.pageSize = 5;
           // $scope.data = [];
            $scope.numberOfPages=function(){
                return Math.ceil($scope.gridcontents.length/$scope.pageSize);                
            }
        });

        


   $scope.removeRow = function(name){				
		var index = -1;		
		var comArr = eval( $scope.gridcontents );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].name === name ) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Something gone wrong" );
        }
        
       
        var r = confirm("Are you sure you want to DELETE this item!");
        if (r == true) {
           // txt = "You pressed OK!";
            $scope.gridcontents.splice( index, 1 );		
        }
   
		
      };

       $scope.viewRow = function(id){				
		var index = -1;		
		var comArr2 = eval( $scope.gridcontents );
		for( var i = 0; i < comArr2.length; i++ ) {
			
				if( comArr2[i].id === id ) {
                             // console.log(comArr2[i].firstName);
                var strHtml ='<h5><i class="material-icons left">remove_red_eye</i> View Details</h5><table class="bordered"><tbody><tr><td>Name</td><td>'+comArr2[i].firstName +" "+ comArr2[i].lastName+'</td></tr><tr><td>Age</td><td>'+comArr2[i].age+'</tr><tr><td>Employer</td><td>'+comArr2[i].employer+'</tr><tr><td>joiningDate</td><td>'+comArr2[i].joiningDate+'</tr><td>Location</td><td>'+comArr2[i].location+'</tr></tbody></table>';
                              $('.modal-content').html(strHtml);
                              // $('#modal1').modal('open');
                              // $("#modal1").openModal();
                               $('#modal1').modal();
                                 $('#modal1').modal('open'); 
				index = i;
				break;
			}
				
			
		}
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		
      };
      

      

});


app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

