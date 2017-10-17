define(['app','../service/billChooseStorage.js','../service/userStorage.js','../service/storeInformation.js','../service/authenticate.js','../service/httpGetData.js','../service/billTypeChoose.js'],function (app) {
  app.controller('billSearchCtrl', ['$scope', '$stateParams','$state','$ionicHistory','billChooseStorageFactory','userFactory','storeInformationFactory','authenticateFactory','dataFactory','billTypeFactory', function($scope, $stateParams,$state,$ionicHistory,billChooseStorageFactory,userFactory,storeInformationFactory,authenticateFactory,dataFactory,billTypeFactory) {
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

      // if(isEmptyObject(storeInformationFactory.getterStoreHouses())){
      //   console.log("获取仓库列表apI")
      //   //获取仓库列表信息 http://183.62.219.46/YFWebService/YF_GetStoreHouse.asmx/GetStoreHouse
      //   dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetStoreHouse.asmx/GetStoreHouse", 'POST', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg()}).then(function(data) {
      //     storeInformationFactory.setterStoreHouses(data)
      //     $scope.itemArr2 = storeInformationFactory.getterStoreHouses().StoreHouses; //搜索后页面遍历显示的仓库列表数组
      //     console.info(storeInformationFactory.getterStoreHouses())
      //   },function(data){
      //     console.error("access data fail");
      //   });
      // }else{
      //   $scope.itemArr2=storeInformationFactory.getterStoreHouses();
      // }
      $scope.title=$stateParams.titles;
      switch($stateParams.titles){
        case "销售出库":
          //获取发货通知单列表 http://183.62.219.46/YFWebService/YF_GetSaleNoticeList.asmx/GetSaleNoticeList
          console.log(userFactory.getterUser())
          dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetSaleNoticeList.asmx/GetSaleNoticeList", 'GET', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg()}).then(function(data) {
            console.log(data.Stauts)
            if(data.Status==true)
              showAlert("提示",data.Msg);
            $scope.itemArr2 = data.FBillNos; //搜索后页面遍历显示的仓库列表数组
          },function(data){
            console.error("access data fail");
          });
          break;
        case "销售退库":
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_GetSalReturnNoticeList.asmx/GetSalReturnNoticeList', 'GET', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg()}).then(function(data) {
            console.log(data.Stauts)
            if(data.Status==true)
              showAlert("提示",data.Msg);
            $scope.itemArr2 = data.FBillNos; //搜索后页面遍历显示的仓库列表数组
          },function(data){
            console.error("access data fail");
          });
          break;
        case "外购入库":
          dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetPurNoteList.asmx/GetPurNoteList", 'POST', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg()}).then(function(data) {
            console.log(data.Stauts)
            if(data.Status==true)
              showAlert("提示",data.Msg);
            $scope.itemArr2 = data.FBillNos; //搜索后页面遍历显示的仓库列表数组
          },function(data){
            console.error("access data fail");
          });
          break;
      }
    });
    $scope.searchCont = {};//搜索内容
    $scope.itemArr2 = [{code:'f2ZF3hk12',name:'材料仓机械类'},{code:'zzZFbhk12',name:'材料仓2机械类'},{code:'trfF3hk12',name:'材料仓3机械类'}]; //搜索后页面遍历显示的数组
    $scope.search = function(){
      $scope.ItemArr1=$scope.itemArr2;
      console.log($scope.ItemArr1)
      $scope.ItemArr2=[]; //每次搜索先清空数组内容
      console.log($scope.itemArr2);
      var searchValue = document.getElementById('search').value;
      for(var i=0;i<$scope.ItemArr1.length;i++){
        var num = i;
        for(var j=0;j<$scope.ItemArr1[num].FBillNo.length;j++){
          var Name1 = $scope.ItemArr1[num].FBillNo.charAt(j);
          for(var k=0;k<searchValue.length;k++){
            var Name2 = searchValue.charAt(k);
            if(Name1 == Name2){
              if($scope.ItemArr2.indexOf($scope.ItemArr1[num])<0){
                console.log("=================================")
                console.log($scope.ItemArr1[num]);
                $scope.ItemArr2.push($scope.ItemArr1[num]); //如果有相同的字，切不在数组内，加入数组。
              }
            }
          }
        }
      }
      if($scope.ItemArr2 == ''){
        alert('未找到匹配的单据');
      }else{
        $scope.itemArr2=$scope.ItemArr2;
      }
    }
    $scope.clearSearch = function(){
      $scope.searchCont = {};
      $scope.ItemArr2 = [];
      $ionicHistory.goBack()
    }
    //返回单据号
    $scope.toProducerList=function(billno){
      billChooseStorageFactory.setter(billno);
      console.log(billChooseStorageFactory.getter());
      var billType=0;
      var billTypeStr="";
      console.log($stateParams.titles)
      switch($stateParams.titles){
        case "外购入库":
          billType=billTypeFactory.getterPurInStock()
              break;
        case "销售出库":
          billType=billTypeFactory.getterSaleOutStock()
              break;
        case "销售退库":
          billType=billTypeFactory.getterReturnStock();
              break;
      }
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

