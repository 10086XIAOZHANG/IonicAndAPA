define(['app'],function (app) {
  app.factory('billChooseStorageFactory',function(){
    var factoryBillChoose="";
    var _setter=function(data){
      factoryBillChoose=data;
    }
    var _getter=function(){
      return factoryBillChoose;
    }
    return {
      setter:_setter,
      getter:_getter
    }
  });
});
