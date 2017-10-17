define(['app','../service/authenticate.js','../service/httpGetData.js','../service/userStorage.js','../service/loginState.js'],function (app) {
    app.controller('loginCtrl', ['$scope','$ionicPopup','dataFactory','authenticateFactory','userFactory','loginStateFactory', function($scope, $ionicPopup,dataFactory,authenticateFactory,userFactory,loginStateFactory) {
        $scope.$on("$ionicView.beforeEnter", function(){
            console.log(loginStateFactory.getter(),$scope.orgs)
             if(loginStateFactory.getter()){
                 $scope.orgs=[];
             }
            var dm_auth = "xx";
            if (dm_auth) {
                $scope.user = {
                    name:'',
                    password:'',
                    acct:'',
                    org:'请选择账号'
                }
            } else {
                $scope.user = {
                    name:'',
                    password:''
                }
            }
          //获取账套 http://localhost:3000/api/accts  http://183.62.219.46/YFWebService/YF_GetAcctID.asmx/GetAcctID
          dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetAcctID.asmx/GetAcctID", 'GET', authenticateFactory.headers,{}).then(function(data) {
            console.log(data);
            $scope.accts=data.DataCenter;
          },function(data){
            console.error("access data fail");
          });
        });
       // 一个提示对话框
      $scope.showAlert = function(title,template) {
        var alertPopup = $ionicPopup.alert({
          title: title,
          template: template
        });
      };
        $scope.login = function() {
           // return;

            var user_name = $scope.user.name,
                password = $scope.user.password,
                acct=$scope.user.acct,
                org=$scope.user.org;


          if (!user_name || user_name == '') {
            $scope.showAlert('提示','请输入用户名');
            return;
          }
          if (!password || password == '') {
            $scope.showAlert('提示','请输入密码');
            return;
          }
          if(!acct || acct==''){
            $scope.showAlert('提示','请选择账套')
            return;
          }
          if(!org || org==''){
            $scope.showAlert('提示','请选择组织')
            return;
          }
          //保存DBId，User,Pwd到Factory中
          userFactory.setterDbId($scope.user.acct);
          userFactory.setterUser($scope.user.name);
          userFactory.setterPwd($scope.user.password);
          userFactory.setterOrg($scope.user.org);
          location.href = "#/tab/home";

        };

        $scope.showPassword = function() {
            $scope.show_psd = !$scope.show_psd
        }
        $scope.orgsChoose=function(){
            console.log($scope.user.acct,$scope.user.name,$scope.user.password)
            //获取组织 http://localhost:3000/api/users/findbyuser UserId
            dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetOrgList.asmx/GetOrgList", 'GET', authenticateFactory.headers,{DBID:$scope.user.acct,User:$scope.user.name,Pwd:$scope.user.password}).then(function(data) {
              $scope.orgs=data.Org;
            },function(data){
              console.error("access data fail");
            });
        }
      console.log(authenticateFactory.getter())
      console.log(authenticateFactory.headers);


    }]);
});
