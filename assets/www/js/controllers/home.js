define(['app','../service/httpGetData.js','../service/userStorage.js','../service/listsShow.js','../service/authenticate.js','../service/scanListCommon.js','../service/billTypeChoose.js'],function (app) {
    app.controller('homeCtrl', ['$scope','dataFactory','userFactory','listsFactory','authenticateFactory','scanListFactory','$cordovaBarcodeScanner','$ionicPopover','billTypeFactory','$state','$ionicActionSheet','$timeout', function($scope,dataFactory,userFactory,listsFactory,authenticateFactory,scanListFactory,$cordovaBarcodeScanner,$ionicPopover,billTypeFactory,$state,$ionicActionSheet,$timeout) {
        var pages = "#/tab/home+#/tab/message+#/tab/add+#/tab/friend+#/tab/mine";
        $scope.$on('$ionicView.afterEnter', function() {
          console.log(billChangeTitle(billTypeFactory.getterPurInStock())+"测试查看")
          $scope.billType={
            //外购入库
            purInStock:billChangeTitle(billTypeFactory.getterPurInStock().toString()),
            //外购退料
            purMrb:billChangeTitle(billTypeFactory.getterPurMrb()),
            //销售退货
            returnStock:billChangeTitle(billTypeFactory.getterReturnStock()),
            //生产领料
            pickMtrl:billChangeTitle(billTypeFactory.getterPickMtrl()),
            //产品入库
            proInStock:billChangeTitle(billTypeFactory.getterProInStock()),
            //产品退库
            proReturnStock:billChangeTitle(billTypeFactory.getterProReturnStock()),
            //生产退料
            returnMtrk:billChangeTitle(billTypeFactory.getterReturnMtrk()),
            //销售出库
            saleOutStock:billChangeTitle(billTypeFactory.getterSaleOutStock()),

          }

            if (pages.indexOf(location.hash) > -1) {
                var tabs =document.getElementsByTagName('ion-tabs');
                angular.element(tabs).removeClass("tabs-item-hide");
            }
        });
          function billChangeTitle(billType){
            console.log("switch"+billType)
             var billName=""
              switch(billType){
                case "1":
                  billName='工业丝包装单'
                      break;
                case "2":
                   billName='线绳包装单'
                      break;
                case "3":
                  billName='白胚布包装单'
                      break;
                case "4":
                  billName='浸胶布包装单'
                      break;
                default:
                  billName='请设置单据类型'
              }
              return billName;
          }
        $scope.$on('$ionicView.beforeLeave', function() {
            if (pages.indexOf(location.hash) > -1) return;
            var tabs =document.getElementsByTagName('ion-tabs');
            angular.element(tabs).addClass("tabs-item-hide");
        });

        var varity = ['discovery', 'location'];
        $scope.type = varity[0];
        $scope.changeType = function(num) {
            $scope.type = varity[num];
        };
        var activity = ['activity', 'personal', 'group'];
        $scope.act = activity[0];
        $scope.changeAct = function(num) {
            $scope.act = activity[num];
        };
         $scope.saleNotices=function(){
           //获取发货通知单列表
           dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetSaleNoticeList.asmx/GetSaleNoticeList", 'POST', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg()}).then(function(data) {
             listsFactory.setterBillNo(data.FBillNos)
             listsFactory.setterTitle("发货通知单列表");
             location.href = "#/tab/consignmentnote";
             console.info(listsFactory.getterBillNo())
           },function(data){
             console.error("access data fail");
           });
         };
         $scope.PurNotes=function(){
           //获取收料通知单列表 http://183.62.219.46/YFWebService/YF_GetPurNoteList.asmx/GetPurNoteList
           dataFactory.getlist("http://183.62.219.46/YFWebService/YF_GetPurNoteList.asmx/GetPurNoteList", 'POST', authenticateFactory.headers,{DBID:userFactory.getterDbId(),User:userFactory.getterUser(),Pwd:userFactory.getterPwd(),OrgNumber:userFactory.getterOrg()}).then(function(data) {
             listsFactory.setterBillNo(data.FBillNos)
             listsFactory.setterTitle("收料通知单列表");
             location.href = "#/tab/consignmentnote";
             console.info(listsFactory.getterBillNo())
           },function(data){
             console.error("access data fail");
           });
         }
         $scope.doRefresh=function(){
            setTimeout(function(){
              $scope.$broadcast('scroll.refreshComplete');
            },1000)
         }
          $scope.scanBarcode = function() {
            $cordovaBarcodeScanner.scan().then(function(imageData) {
              alert(imageData.text);
              console.log("Barcode Format -> " + imageData.format);
              console.log("Cancelled -> " + imageData.cancelled);
            }, function(error) {
              console.log("An error happened -> " + error);
            });
          };
       $scope.chooseTypeItem=function(type){
         console.log($scope.bName,type,$scope.url_bill,$scope.urlObj)
            switch($scope.bName){
              case "外购入库":
                billTypeFactory.setterPurInStock(type)
                    break;
              case "外购退料":
                billTypeFactory.setterPurMrb(type)
                break;
              case "销售退货":
                billTypeFactory.setterReturnStock(type)
                break;
              case "生产领料":
                billTypeFactory.setterPickMtrl(type)
                break;
              case "产品入库":
                billTypeFactory.setterProInStock(type)
                break;
              case "产品退库":
                billTypeFactory.setterProReturnStock(type)
                break;
              case "生产退料":
                billTypeFactory.setterReturnMtrk(type)
                break;
              case "销售出库":
                billTypeFactory.setterSaleOutStock(type)
                break;
            }
         switch(type){
           case 1:
             $scope.urlObj.billType='工业丝包装单'
             break;
           case 2:
             $scope.urlObj.billType='线绳包装单'
             break;
           case 3:
             $scope.urlObj.billType='白胚布包装单'
             break;
           case 4:
             $scope.urlObj.billType='浸胶布包装单'
             break;
           default:
             $scope.urlObj.billType='工业丝包装单'
         }
         $state.go($scope.url_bill,$scope.urlObj)
       }
      $scope.popover = $ionicPopover.fromTemplateUrl('my-popover-choosebilltype.html', {
        scope: $scope
      });

      // .fromTemplateUrl() 方法
      $ionicPopover.fromTemplateUrl('my-popover-choosebilltype.html', {
        scope: $scope
      }).then(function(popover) {
        $scope.popover = popover;
      });
      $scope.openPopover = function($event,url,urlObj,bName) {
        $scope.popover.show($event);
        $scope.url_bill=url;
        $scope.urlObj=urlObj;
        $scope.bName=bName;
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


      $scope.showBillTypes = function(url,urlObj,bName) {
        $scope.url_bill=url;
        $scope.urlObj=urlObj;
        $scope.bName=bName;
        // Show the action sheet
        var hideSheet= $ionicActionSheet.show({
          cancelOnStateChange:true,
          cssClass:'action_s',
          titleText: "选择单据类型",
          buttons: [
            { text: "<div class='row' style='font-size:20px;color:deepskyblue;'><div class='col-offset-33'>工业丝包装单</div></div>" },
            { text: "<div class='row' style='font-size:20px;color:deepskyblue;'><div class='col-offset-33'>线绳包装单</div></div>" },
            {text:"<div class='row' style='font-size:20px;color:deepskyblue;'><div class='col-offset-33'>白坯布包装单</div></div>"},
            {text:"<div class='row' style='font-size:20px;color:deepskyblue;'><div class='col-offset-33'>浸胶布包装单</div></div>"}
          ],
          buttonClicked: function(index) {
            switch($scope.bName){
              case "外购入库":
                billTypeFactory.setterPurInStock(index+1)
                break;
              case "外购退料":
                billTypeFactory.setterPurMrb(index+1)
                break;
              case "销售退库":
                billTypeFactory.setterReturnStock(index+1)
                break;
              case "生产领料":
                billTypeFactory.setterPickMtrl(index+1)
                break;
              case "产品入库":
                billTypeFactory.setterProInStock(index+1)
                break;
              case "产品退库":
                billTypeFactory.setterProReturnStock(index+1)
                break;
              case "生产退料":
                billTypeFactory.setterReturnMtrk(index+1)
                break;
              case "销售出库":
                billTypeFactory.setterSaleOutStock(index+1)
                break;
              case "盘点":
                billTypeFactory.setCheckCentre(index+1)
            }
            switch(index+1){
              case 1:
                $scope.urlObj.billType='工业丝包装单'
                break;
              case 2:
                $scope.urlObj.billType='线绳包装单'
                break;
              case 3:
                $scope.urlObj.billType='白胚布包装单'
                break;
              case 4:
                $scope.urlObj.billType='浸胶布包装单'
                break;
              default:
                $scope.urlObj.billType='工业丝包装单'
            }
            $state.go($scope.url_bill,$scope.urlObj)
            return true;
          },
          cancelText: "取消",
          cancel: function() {
            // add cancel code..

            console.log('执行了取消操作');
            return true;
          }
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
          hideSheet();
        }, 8000);

      };
    }]);
});

