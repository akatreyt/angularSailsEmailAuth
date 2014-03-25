app.controller('AuthController', function SettingCtrl($q, $scope, $modal, $log, $filter, filterFilter, User) {
    $scope.user;


    $scope.newUser = function () 
    {
    	var user = $scope.newUserObj;
        User.register(user).then(function(returnData)
        {
            console.log(returnData);
        });
    }
});