define(['app','../service/userStorage.js','../service/loginState.js'],function (app) {
    app.controller('setCtrl', ['$scope', '$ionicPopup', '$ionicHistory', 'Storage','userFactory','loginStateFactory', function($scope, $ionicPopup, $ionicHistory, Storage,userFactory,loginStateFactory) {
        $scope.comfirm = function () {
            $ionicHistory.goBack();
            Storage.set("DM_Auth", "");
            setTimeout(function(){
              loginStateFactory.setter(true)
                location.href = "#/index";
            }, 100);
        }
    }]);

});
