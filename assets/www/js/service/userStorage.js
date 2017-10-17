define(['app'],function (app) {
  app.factory('userFactory',function(){
    var factoryDbId={};
    var factoryUser={};
    var factoryPwd={};
    var factoryOrg={};
    var _setterDbId=function(dbId){
       factoryDbId=dbId;
    };
    var _setterUser=function(user){
       factoryUser=user;
    }
    var _setterPwd=function(pwd){
       factoryPwd=pwd;
    }
    var _setterOrg=function(org){
      factoryOrg=org;
    }
    var _getterDbId=function(){
      return factoryDbId;
    }
    var _getterUser=function(){
      return factoryUser;
    }
    var _getterPwd=function(){
      return factoryPwd;
    }
    var _getterOrg=function(){
      return factoryOrg;
    }
    return {
      setterUser:_setterUser,
      setterDbId:_setterDbId,
      setterPwd:_setterPwd,
      setterOrg:_setterOrg,
      getterUser:_getterUser,
      getterDbId:_getterDbId,
      getterPwd:_getterPwd,
      getterOrg:_getterOrg
    }
  });
});
