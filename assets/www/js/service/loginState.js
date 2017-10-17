define(['app'],function (app) {
  app.factory('loginStateFactory',function(){
    var factoryObject=false;
    var _setter=function(data){
      factoryObject=data;
    }
    var _getter=function(){
      return factoryObject;
    }
    return {
      setter:_setter,
      getter:_getter
    }
  });
});
