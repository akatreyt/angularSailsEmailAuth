app.factory('User',['$q','$http',function($q,$http, $location){

	var _user = {
		authenticated : false
	};


	var _register = function(newUser){

		var deferredRegister = $q.defer();
		var register = $http.post('/user',newUser)

		register.then(function(response){

			$location.path('/success');

		},function(error){

			deferredRegister.reject(error);

		})

		 return deferredRegister.promise;
	};
	
	var _login = function(email,password)
	{
		
	}

	var _getUser = function(){
		var deferredUser = $q.defer();

		if(_user.id){

			deferredUser.resolve(_user)

		}
		else{

			var getUser = $http.get('/get_user').then(function(response){
				
				_user = angular.extend(_user,response.data);

				deferredUser.resolve(_user);
			})
		}
		return deferredUser.promise;


	}

	return {

		register : _register,
		login : _login,
		getUser : _getUser


	}


}])


// app.service('User',function(){


	
// })

// app.provider('User',function(){


	
// })