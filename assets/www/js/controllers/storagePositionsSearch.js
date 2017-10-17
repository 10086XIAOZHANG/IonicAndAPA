
define(['app','../service/storageService.js','../service/userStorage.js','../service/storeInformation.js','../service/authenticate.js','../service/httpGetData.js'],function (app) {
  app.controller('storagePositionsCtrl', ['$scope', '$stateParams','$state','$ionicHistory','storageFactory','userFactory','storeInformationFactory','authenticateFactory','dataFactory', function($scope, $stateParams,$state,$ionicHistory,storageFactory,userFactory,storeInformationFactory,authenticateFactory,dataFactory) {
    // $scope.tag = "";
    //
    // $scope.delete = function () {
    //     $scope.tag = "";
    // }

    //判断对象是否为空
    function isEmptyObject(e) {
      var t;
      for (t in e)
        return !1;
      return !0
    }
    $scope.$on('$ionicView.beforeEnter',function(){
      console.log(storeInformationFactory.getterStoreHouses())
      if(isEmptyObject(storeInformationFactory.getterStoreHouses())){
        console.log("获取仓库列表apI")
        //获取仓库列表信息 http://183.62.219.46/YFWebService/YF_GetStoreHouse.asmx/GetStoreHouse
        dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetStoreHouse.asmx/GetStoreHouse", 'POST', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg()}).then(function(data) {
          storeInformationFactory.setterStoreHouses(data)
          $scope.itemArr2 = storeInformationFactory.getterStoreHouses().StoreHouses; //搜索后页面遍历显示的仓库列表数组
          console.info(storeInformationFactory.getterStoreHouses())
        },function(data){
          console.error("access data fail");
        });
      }else{
        $scope.itemArr2=storeInformationFactory.getterStoreHouses();
      }
    });
    $scope.searchCont = {};//搜索内容
    $scope.itemArr2 = [{code:'f2ZF3hk12',name:'材料仓机械类'},{code:'zzZFbhk12',name:'材料仓2机械类'},{code:'trfF3hk12',name:'材料仓3机械类'}]; //搜索后页面遍历显示的数组
    $scope.search = function(){
      $scope.ItemArr1=$scope.itemArr2;
      $scope.ItemArr2=[]; //每次搜索先清空数组内容
      console.log($scope.itemArr2);
      var searchValue = document.getElementById('search').value;
      for(var i=0;i<$scope.ItemArr1.length;i++){
        var num = i;
        for(var j=0;j<$scope.ItemArr1[num].name.length;j++){
          var Name1 = $scope.ItemArr1[num].name.charAt(j);
          for(var k=0;k<searchValue.length;k++){
            var Name2 = searchValue.charAt(k);
            if(Name1 == Name2){
              if($scope.ItemArr2.indexOf($scope.ItemArr1[num])<0){
                console.log($scope.ItemArr1[num]);
                $scope.ItemArr2.push($scope.ItemArr1[num]); //如果有相同的字，切不在数组内，加入数组。
              }
            }
          }
        }
      }
      if($scope.ItemArr2 == ''){
        alert('未找到匹配的仓库');
      }else{
        $scope.itemArr2=$scope.ItemArr2;
      }
    }
    $scope.clearSearch = function(){
      $scope.searchCont = {};
      $scope.ItemArr2 = [];
      $ionicHistory.goBack()
    }
    //返回仓库名
    $scope.toProducerList=function(storageName){
      storageFactory.setter({storageName:storageName});
      console.log(storageFactory.getter());
      $ionicHistory.goBack();
    }
  }]);
});

