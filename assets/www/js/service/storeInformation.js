define(['app'],function (app) {
  app.factory('storeInformationFactory',function(){
    var factoryStoreHouses={};
    var factoryStorePositions={};

    //===========盘点时用户选择的仓库和仓位====================
    var factoryStoreHouseOne={};
    var factoryStorePostionOne={};
    //===========盘点时用户选择的仓库和仓位====================
    var _setterStorePositons=function(data){
      factoryStorePositions=data;
    }
    var _getterStorePositons=function(){
      return factoryStorePositions;
    }
    var _setterStoreHouses=function(data){
      factoryStoreHouses=data;
    }
    var _getterStoreHouses=function(){
      return factoryStoreHouses;
    }
    var _setterStoreHouseOne=function(data){
      factoryStoreHouseOne=data;
    }
    var _getterStoreHouseOne=function(){
      return factoryStoreHouseOne;
    }
    var _setterStorePostionOne=function(data){
      factoryStorePostionOne=data;
    }
    var _getterStorePostionOne=function(){
      return factoryStorePostionOne;
    }
    return {
      setterStoreHouses:_setterStoreHouses,
      getterStoreHouses:_getterStoreHouses,
      setterStorePositons:_setterStorePositons,
      getterStorePositons:_getterStorePositons,
      setterStoreHouseOne:_setterStoreHouseOne,
      getterStoreHouseOne:_getterStoreHouseOne,
      setterStorePostionOne:_setterStorePostionOne,
      getterrStorePostionOne:_getterStorePostionOne
    }
  });
});
