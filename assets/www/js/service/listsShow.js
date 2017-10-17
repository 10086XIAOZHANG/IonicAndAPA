define(['app'],function (app) {
  app.factory('listsFactory',function(){
    var factoryTitle={};
    var factoryBillNo={};
    var _setterTitle=function(data){
      factoryTitle=data;
    }
    var _getterTitle=function(){
      return factoryTitle;
    }
    var _setterBillNo=function(data){
      factoryBillNo=data;
    }
    var _getterBillNo=function(){
      return factoryBillNo;
    }
    return {
      setterTitle:_setterTitle,
      getterTitle:_getterTitle,
      setterBillNo:_setterBillNo,
      getterBillNo:_getterBillNo
    }
  });
});
