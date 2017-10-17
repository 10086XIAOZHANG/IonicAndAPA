define(['app','../service/userStorage.js','../service/storeInformation.js','../service/authenticate.js','../service/billTypeChoose.js','../service/billChooseStorage.js','../service/dialogsManager.js'],function (app) {
  app.controller('collectionCentreCtrl', ['$scope','$ionicPopup','$ionicPopover','$timeout','$state','$stateParams','dataFactory','userFactory','storeInformationFactory','authenticateFactory','billTypeFactory','$cordovaBarcodeScanner','billChooseStorageFactory','dialogsManager', function($scope,$ionicPopup,$ionicPopover,$timeout,$state,$stateParams,dataFactory,userFactory,storeInformationFactory,authenticateFactory,billTypeFactory,$cordovaBarcodeScanner,billChooseStorageFactory,dialogsManager) {
    var pages = "#/tab/home+#/tab/message+#/tab/add+#/tab/friend+#/tab/mine";
    $scope.$on('$ionicView.beforeEnter',function(){
      $scope.title=$stateParams.titles;
      console.log($stateParams.titles+"||"+$stateParams.billType)
      //获取仓库列表信息 http://localhost:3000/api/storehouses/findbyuser http://183.62.219.46/YFWebService/YF_GetStoreHouse.asmx/GetStoreHouse
      console.log(userFactory.getterOrg())
      dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetStoreHouse.asmx/GetStoreHouse", 'POST', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg()}).then(function(data) {
        storeInformationFactory.setterStoreHouses(data)
        $scope.storehouses = storeInformationFactory.getterStoreHouses().StoreHouses; //搜索后页面遍历显示的仓库列表数组
        console.info(storeInformationFactory.getterStoreHouses())
      },function(data){
        console.error("access data fail");
      });
    });
    $scope.$on('$ionicView.afterEnter', function() {
      if (pages.indexOf(location.hash) > -1) {
        var tabs =document.getElementsByTagName('ion-tabs');
        angular.element(tabs).removeClass("tabs-item-hide");
      }
    });
    $scope.$on('$ionicView.beforeLeave', function() {
      if (pages.indexOf(location.hash) > -1) return;
      var tabs =document.getElementsByTagName('ion-tabs');
      angular.element(tabs).addClass("tabs-item-hide");
    });
    $scope.changeStorehouse=function(){
      dialogsManager.showMessage("正在获取数据，等待中……");
      var sid=$scope.storehouse
      //获取仓位列表信息 http://localhost:3000/api/storepositions/findbyuserandstore http://localhost:8091/YF_GetStoreHouse.asmx
      dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetPositionList.asmx/GetPositionList", 'POST', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg(),StockNumber:sid}).then(function(data) {
        console.log("获取api")
        storeInformationFactory.setterStorePositons(data);
        console.info(storeInformationFactory.getterStorePositons().Position,1);
        $scope.storeposition=storeInformationFactory.getterStorePositons().Position;//搜索后页面遍历显示的仓位列表数组
        console.info(storeInformationFactory.getterStorePositons().Position);
      },function(data){
        console.error("access data fail");
      });
    }
    $scope.submitSave=function(){
      storeInformationFactory.setterStoreHouseOne($scope.storehouse)
      storeInformationFactory.setterStorePostionOne($scope.storepositonId)
      console.log("仓库:"+$scope.storehouse,"仓位:"+$scope.storepositonId,billTypeFactory.getCheckCentre())
      var billType=billTypeFactory.getCheckCentre()
      switch(billType){
        case 1:
          billTypeStr='工业丝包装单'
          break;
        case 2:
          billTypeStr='线绳包装单'
          break;
        case 3:
          billTypeStr='白胚布包装单'
          break;
        case 4:
          billTypeStr='浸胶布包装单'
          break;
        default:
          billTypeStr='工业丝包装单'
      }
      $state.go('tab.message',{title:$stateParams.titles,billType:billTypeStr})
    }

  }]);
});
