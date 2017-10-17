define(['app','../service/billTypeChoose.js'],function (app) {
    app.controller('mypostCtrl', ['$scope','$ionicPopup','billTypeFactory', function($scope, $ionicPopup,billTypeFactory) {
      $scope.$on('$ionicView.afterEnter', function() {
        $scope.purinstocks=angular.isString(billTypeFactory.getterPurInStock())?billTypeFactory.getterPurInStock():"1";
        $scope.factorypurmrb=angular.isString(billTypeFactory.getterPurMrb())?billTypeFactory.getterPurMrb():'1';
        $scope.factoryreturnstock=angular.isString(billTypeFactory.getterReturnStock())?billTypeFactory.getterReturnStock():'1';
        $scope.factorypickmtrl=angular.isString(billTypeFactory.getterPickMtrl())?billTypeFactory.getterPickMtrl():'1';
        $scope.factoryproinstock=angular.isString(billTypeFactory.getterProInStock())?billTypeFactory.getterProInStock():'1';
        $scope.factoryproreturnstock=angular.isString(billTypeFactory.getterProReturnStock())?billTypeFactory.getterProReturnStock():'1';
        $scope.factoryreturnmtrk=angular.isString(billTypeFactory.getterReturnMtrk())?billTypeFactory.getterReturnMtrk():'1';
        $scope.factorysaleoutstock=angular.isString(billTypeFactory.getterSaleOutStock())?billTypeFactory.getterSaleOutStock():'1';
      })
      //外购入库
      $scope.purInStock=function(v){
         billTypeFactory.setterPurInStock(v)
          console.log(billTypeFactory.getterPurInStock())
        $scope.purinstocks=billTypeFactory.getterPurInStock()
      };
      //外购退料

      $scope.factoryPurMrb=function(v){
       billTypeFactory.setterPurMrb(v)
      };
      //销售退货

      $scope.factoryReturnStock=function(v){
        console.log('PurInStock2')
        billTypeFactory.setterReturnStock(v)
      };
      //生产领料

      $scope.factoryPickMtrl=function(v){
         billTypeFactory.setterPickMtrl(v)
      };
      //产品入库

      $scope.factoryProInStock=function(v){
        billTypeFactory.setterProInStock(v)
      };
      //产品退库

      $scope.factoryProReturnStock=function(v){
        billTypeFactory.setterProReturnStock(v)
      };

      $scope.factoryReturnMtrk=function(v){
        billTypeFactory.setterReturnMtrk(v);
      }

      //销售出库
      $scope.factorySaleOutStock=function(v){
        billTypeFactory.setterSaleOutStock(v)
      }
    }]);

});
