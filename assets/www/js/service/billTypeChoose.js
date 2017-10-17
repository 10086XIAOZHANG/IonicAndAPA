define(['app'],function (app) {
  app.factory('billTypeFactory',function(){
    //外购入库
    var factoryPurInStock=1;
    //外购退料
    var factoryPurMrb=1;
    //销售退货
    var factoryReturnStock=1;
    //生产领料
    var factoryPickMtrl=1;
    //产品入库
    var factoryProInStock=1;
    //产品退库
    var factoryProReturnStock=1;
    //生产退料
    var factoryReturnMtrk=1;
    //销售出库
    var factorySaleOutStock=1;
    //盘点
    var factoryCheckCentre=1;
    var _setterReturnMtrk=function(data){
      factoryReturnMtrk=data;
    }
    var _getterReturnMtrk=function(){
      return factoryReturnMtrk;
    }
    var _setterProReturnStock=function(data){
      factoryProReturnStock=data;
    }
    var _getterProReturnStock=function(){
      return factoryProReturnStock;
    }
    var _setterProInStock=function(data){
      factoryProInStock=data;
    }
    var _getterProInStock=function(){
      return factoryProInStock;
    }
    var _setterPickMtrl=function(data){
      factoryPickMtrl=data;
    }
    var _getterPickMtrl=function(){
      return factoryPickMtrl;
    }
    var _setterReturnStock=function(data){
      factoryReturnStock=data;
    }
    var _getterReturnStock=function(){
      return factoryReturnStock;
    }
    var _setterPurMrb=function(data){
      factoryPurMrb=data;
    }
    var _getterPurMrb=function(){
      return factoryPurMrb;
    }
    var _setterPurInStock=function(data){
      factoryPurInStock=data;
    }
    var _getterPurInStock=function(){
      return factoryPurInStock;
    }
    var _setterSaleOutStock=function(data){
      factorySaleOutStock=data;
    }
    var _getterSaleOutStock=function(){
      return factorySaleOutStock;
    }
    var _setterCheckCentre=function(){
      return factoryCheckCentre;
    }
    var _getterCheckCentre=function(){
       return factoryCheckCentre;
    }
    return {
      setterPurInStock:_setterPurInStock,
      getterPurInStock:_getterPurInStock,
      setterPurMrb:_setterPurMrb,
      getterPurMrb:_getterPurMrb,
      setterReturnStock:_setterReturnStock,
      getterReturnStock:_getterReturnStock,
      setterPickMtrl:_setterPickMtrl,
      getterPickMtrl:_getterPickMtrl,
      setterProInStock:_setterProInStock,
      getterProInStock:_getterProInStock,
      setterProReturnStock:_setterProReturnStock,
      getterProReturnStock:_getterProReturnStock,
      setterReturnMtrk:_setterReturnMtrk,
      getterReturnMtrk:_getterReturnMtrk,
      setterSaleOutStock:_setterSaleOutStock,
      getterSaleOutStock:_getterSaleOutStock,
      setCheckCentre:_setterCheckCentre,
      getCheckCentre:_getterCheckCentre
    }
  });
});
