define(['app','../service/userStorage.js','../service/storeInformation.js','../service/authenticate.js','../service/billTypeChoose.js','../service/billChooseStorage.js','../service/dialogsManager.js'],function (app) {
  app.controller('messageCtrl', ['$scope','$ionicPopup','$ionicPopover','$timeout','$state','$stateParams','dataFactory','userFactory','storeInformationFactory','authenticateFactory','billTypeFactory','$cordovaBarcodeScanner','billChooseStorageFactory','dialogsManager', function($scope,$ionicPopup,$ionicPopover,$timeout,$state,$stateParams,dataFactory,userFactory,storeInformationFactory,authenticateFactory,billTypeFactory,$cordovaBarcodeScanner,billChooseStorageFactory,dialogsManager) {
    var pages = "#/tab/home+#/tab/message+#/tab/add+#/tab/friend+#/tab/mine";
    $scope.title=$stateParams.title+" · "+$stateParams.billType;//获取列表标题名
    $scope.$on('$ionicView.afterEnter', function() {
      $scope.isSubmit=false;
      console.log(location.hash);
      //显示ion-tabs主菜单
      //if (pages.indexOf(location.hash) > -1) {
      var tabs =document.getElementsByTagName('ion-tabs');
      angular.element(tabs).removeClass("tabs-item-hide");
      // }
      setTimeout(function(){
        $scope.scans=[];
        //进入列表前显示单据
        switch($stateParams.title){
          case "销售退库":
            console.log("销售退库");
            // http://183.62.219.46/YFWebService/YF_GetSalReturnNoticeList.asmx/GetSalReturnNoticeList
            console.log("进入",billChooseStorageFactory.getter())
            // $scope.$apply(function(){
            //   $scope.scans.push({storehouse: $scope.storehouses, storeposition: '请选择仓位', scanstring: '',storehouseId:'请选择仓库',storepositonId:'请选择仓位',billno:billChooseStorageFactory.getter(),isenble:false})
            // })
            break;
          case "外购入库":
            //采购收料单生成采购入库单
            //获取收料通知单列表 http://183.62.219.46/YFWebService/YF_GetPurNoteList.asmx/GetPurNoteList
            console.log("外购入库");
            // http://183.62.219.46/YFWebService/YF_GetSalReturnNoticeList.asmx/GetSalReturnNoticeList
            console.log("进入",billChooseStorageFactory.getter())
            // $scope.$apply(function(){
            //   $scope.scans.push({storehouse: $scope.storehouses, storeposition: '请选择仓位', scanstring: '',storehouseId:'请选择仓库',storepositonId:'请选择仓位',billno:billChooseStorageFactory.getter(),isenble:false})
            // })
            break;
          case "销售出库":
            //发货通知单生成销售出库单
            console.log("进入",billChooseStorageFactory.getter())
            // $scope.$apply(function(){
            //   $scope.scans.push({storehouse: $scope.storehouses, storeposition: '请选择仓位', scanstring: '',storehouseId:'请选择仓库',storepositonId:'请选择仓位',billno:billChooseStorageFactory.getter(),isenble:false})
            // })
            break;
          default:
            //$scope.additemindex=0;
            $scope.scans = [];
        }
      },500)
    });
    $scope.$on('$ionicView.beforeEnter',function(){
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
    $scope.changeStorehouse=function(sid,index){
      dialogsManager.showMessage("正在获取数据，等待中……");
      //获取仓位列表信息 http://localhost:3000/api/storepositions/findbyuserandstore http://localhost:8091/YF_GetStoreHouse.asmx
      dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetPositionList.asmx/GetPositionList", 'POST', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg(),StockNumber:sid}).then(function(data) {
        console.log("获取api")
        storeInformationFactory.setterStorePositons(data);
        console.info(storeInformationFactory.getterStorePositons().Position,1);
        $scope.scans[index].storeposition=storeInformationFactory.getterStorePositons().Position;//搜索后页面遍历显示的仓位列表数组
        console.info(storeInformationFactory.getterStorePositons().Position);
      },function(data){
        console.error("access data fail");
      });
    }
    $scope.$on('$ionicView.beforeLeave', function() {
      if (pages.indexOf(location.hash) > -1) return;
      var tabs =document.getElementsByTagName('ion-tabs');
      angular.element(tabs).addClass("tabs-item-hide");
    });
    $scope.ToStorageSeacrch = function () {

      $state.go('tab.storagesearch');

    };
    $scope.remove=function(index){
      RemoveValByIndex($scope.scans,index);
    }
    //根据删除数组中的元素
    function RemoveValByIndex(arr, index) {
      arr.splice(index, 1);
    }
    $scope.ToStoragePositionsSeacrch=function(){
      $state.go('tab.storagepositionsseacrch');
    };
    // 一个提示对话框
    $scope.showAlert = function(title,template) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template
      });
    };
    //===================提交==========================
    $scope.AddLists=function(){
      $scope.isSubmit=true;
      var title=$stateParams.title;
      var scans= $scope.scans;
      console.log(scans)
      var barCodes="{\"barcodes\":[";
      var bcs="";
      for(var i=0;i<scans.length;i++){
        var bc="{\"barcode\":"+"\""+scans[i].scanstring+"\""+
          ",\"StockNumber\":"+"\""+scans[i].storehouseId+"\""+
          ",\"PositionId\":"+"\""+scans[i].storepositonId+"\""+"}";
        bcs+=bc;
      }
      barCodes+=bcs+"]}";
      console.log(barCodes);
      console.log(userFactory.getterDbId(),userFactory.getterUser(),userFactory.getterPwd(),userFactory.getterOrg(),barCodes,billTypeFactory.getterProInStock())
      switch(title){
        case "产品入库":
          //生成产品入库
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_CreateSimpleProInStockBill.asmx/CreateSimpleProInStockBill', 'GET', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg(),BarCode:barCodes,BillType:billTypeFactory.getterProInStock()}).then(function(data) {
            if(data.Status){
              showAlert("提示", data.Msg)
            }else{
              showAlert("提示", billTypeFactory.getterProInStock()+"||"+barCodes+data.Msg)
            }
          },function(data){
            console.error("access data fail");
          });
          break;
        case "产品退库":
          // http://183.62.219.46/YFWebService/YF_CreateSimpleProReturnStockBill.asmx/CreateSimpleProReturnStockBill
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_CreateSimpleProReturnStockBill.asmx/CreateSimpleProReturnStockBill', 'GET', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg(),BarCode:barCodes,BillType:billTypeFactory.getterProReturnStock()}).then(function(data) {
            if(data.Status){
              showAlert("提示", data.Msg)
            }else{
              showAlert("提示", billTypeFactory.getterProReturnStock()+"||"+barCodes+data.Msg)
            }
          },function(data){
            console.error("access data fail");
          });
          break;
        case "生产退料":
          //生成简单生产退料单
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_CreateSimpleReturnMtrkBill.asmx/CreateSimpleReturnMtrkBill', 'GET', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg(),BarCode:barCodes,BillType:billTypeFactory.getterReturnMtrk()}).then(function(data) {
            if(data.Status){
              showAlert("提示", data.Msg)
            }else{
              showAlert("提示", billTypeFactory.getterReturnMtrk()+"||"+barCodes+data.Msg)
            }
          },function(data){
            console.error("access data fail");
          });
          break;
        case "生产领料":
          //生成简单生产领料单
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_CreateSimplePickMtrlBill.asmx/CreateSimplePickMtrlBill', 'GET', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg(),BarCode:barCodes,BillType:billTypeFactory.getterPickMtrl()}).then(function(data) {
            if(data.Status){
              showAlert("提示", data.Msg)
            }else{
              showAlert("提示", billTypeFactory.getterPickMtrl()+"||"+barCodes+data.Msg)
            }
          },function(data){
            console.error("access data fail");
          });
          break;
        case "外购退料":
          //生成采购退料单
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_CreatePur_MrbBill.asmx/CreatePur_MrbBill', 'GET', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg(),BarCode:barCodes,BillType:billTypeFactory.getterPurMrb()}).then(function(data) {
            if(data.Status){
              showAlert("提示", data.Msg)
            }else{
              showAlert("提示", billTypeFactory.getterPurMrb()+"||"+barCodes)
            }
          },function(data){
            console.error("access data fail");
          });
          break;
        case "销售退库":
          //退货通知单生成销售退货单
          console.log(scans)
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_Sal_ReturnNoticeToReturnStock.asmx/Sal_ReturnNoticeToReturnStock', 'GET', authenticateFactory.headers, {
            DBID: userFactory.getterDbId(),
            User: userFactory.getterUser(),
            Pwd: userFactory.getterPwd(),
            BillNo: scans[0].billno,
            BarCode: barCodes,
            BillType: billTypeFactory.getterReturnStock()
          }).then(function (data) {
            if(data.Status){
              showAlert("提示", data.Msg)
            }else{
              showAlert("提示",data.Msg)
            }
          }, function (data) {
            console.error("access data fail");
          });
          break;
        case "销售出库":
          console.log(scans)
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_Sal_NoticeToOutStock.asmx/SalNoticeToSaleOutStock', 'GET', authenticateFactory.headers, {
            DBID: userFactory.getterDbId(),
            User: userFactory.getterUser(),
            Pwd: userFactory.getterPwd(),
            BillNo: scans[0].billno,
            BarCode: barCodes,
            BillType: billTypeFactory.getterSaleOutStock()
          }).then(function (data) {
            if(data.Status){
              showAlert("提示", data.Msg)
            }else{
              showAlert("提示",data.Msg)
            }
          }, function (data) {
            console.error("access data fail");
          });
          break;
        case "外购入库":
          //	采购收料单生成采购入库单
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_Pur_NoteToInStock.asmx/PurNoteToPurInStock', 'GET', authenticateFactory.headers, {
            DBID: userFactory.getterDbId(),
            User: userFactory.getterUser(),
            Pwd: userFactory.getterPwd(),
            BillNo: scans[0].billno,
            BarCode: barCodes,
            BillType: billTypeFactory.getterPurInStock()
          }).then(function (data) {
            if(data.Status){
              showAlert("提示", data.Msg)
            }else{
              showAlert("提示",data.Msg)
            }
          }, function (data) {
            console.error("access data fail");
          });
          break;
        case "盘点":
          //盘点提交
          dataFactory.getlist('http://183.62.219.46/YFWebService/YF_Inventory.asmx/Inventory', 'GET', authenticateFactory.headers, {
            DBID: userFactory.getterDbId(),
            User: userFactory.getterUser(),
            Pwd: userFactory.getterPwd(),
            BarCode: barCodes,
            StockNumber:storeInformationFactory.getterStoreHouseOne(),
            Position:storeInformationFactory.getterrStorePostionOne(),
            BillType: billTypeFactory.getCheckCentre()
          }).then(function (data) {
            if(data.Status){
              showAlert("提示", data.Msg)
            }else{
              showAlert("提示",data.Msg)
            }
          }, function (data) {
            console.error("access data fail");
          });
          break;
      }
    }
    // .fromTemplate() 方法
    var template = '<ion-popover-view class="fit"><ion-list><ion-item style="padding:6px;"><button class="button button-block button-dark login-register addlist" ng-click="scanAddItem()" style="background-color:white;border:none;text-align: left;height:100%;width:100%;color:#333333;font-size:18px;">新增</button></ion-item><ion-item style="padding:6px;"><button style="background-color:white;border:none;text-align: left;height:100%;width:100%;color:#333333;font-size:18px;" class="button button-block button-positive login-register addlist" ng-disabled="isSubmit" ng-click="AddLists()">提交</button></ion-item></ion-list></ion-popover-view>';
    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });
    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    // 清除浮动框
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // 在隐藏浮动框后执行
    $scope.$on('popover.hidden', function() {
      // 执行代码
    });
    // 移除浮动框后执行
    $scope.$on('popover.removed', function() {
      // 执行代码
    });
    // 一个提示对话框
    showAlert = function(title,template) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: template
      });
    };
    $scope.formData={}//表单数据
    $scope.processForm=function(scan,index){
      var title=$stateParams.title;
      console.log(index);
      switch(title){
        case "产品入库":
          console.log("产品入库")
          // 生成生成简单生产入库单 http://localhost:3000/api/simpleproinstockbills
          dataFactory.getlist("http://localhost:3000/api/simpleproinstockbills", 'POST', authenticateFactory.headers,{DBID:userFactory.getterDbId(),UserId:userFactory.getterUser(),Pwd:userFactory.getterPwd(),BarCode:scan.scanstring}).then(function(data) {
            $scope.scans[index].isenble=true;
            showAlert("提示",data.Msg);
          },function(data){
            console.error("access data fail");
          });
          break;
      }
      console.log(scan);
    }
    $scope.scanAddItem=function(){
      //扫描字符，调用USB PDA扫描 新增
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        //$scope.scans[$scope.additemindex].scanstring=imageData.text;
        if($stateParams.title==="盘点"){
          $scope.scans.push({
            storehouse: $scope.storehouses,
            storeposition: '请选择仓位',
            scanstring: imageData.text+"",
            storehouseId: storeInformationFactory.getterStoreHouseOne(),
            storepositonId: storeInformationFactory.getterrStorePostionOne(),
            billno: billChooseStorageFactory.getter(),
            isenble: false
          });
        }else{
          $scope.scans.push({
            storehouse: $scope.storehouses,
            storeposition: '请选择仓位',
            scanstring: imageData.text+"",
            storehouseId: '请选择仓库',
            storepositonId: '请选择仓位',
            billno: billChooseStorageFactory.getter(),
            isenble: false
          });
        }
        console.log("Barcode Format -> " + imageData.format);
        console.log("Cancelled -> " + imageData.cancelled);
      }, function(error) {
        console.log("An error hap" +
          "pened -> " + error);
      });
    }
    $scope.scanBarcode = function(index) {
      //扫描字符，调用USB PDA扫描
      $cordovaBarcodeScanner.scan().then(function(imageData) {
        $scope.scans[index].scanstring=imageData.text;
        console.log("Barcode Format -> " + imageData.format);
        console.log("Cancelled -> " + imageData.cancelled);
      }, function(error) {
        console.log("An error hap" +
          "pened -> " + error);
      });
    };
  }]);
});

