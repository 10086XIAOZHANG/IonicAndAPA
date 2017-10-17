define(['app'],function (app) {
  app.factory('scanListFactory',function(){
    var factoryTitle={};
    var factoryId={};
    var _setterId=function(data){
      factoryId=data;
    }
    var _getterId=function(){
      return factoryId;
    }
    var _setterTitle=function(data){
      factoryTitle=data;
    }
    var _getterTitle=function(){
      return factoryTitle;
    }
    return {
      setterTitle:_setterTitle,
      getterTitle:_getterTitle,
      setterId:_setterId,
      getterId:_getterId
    }
  });
});
