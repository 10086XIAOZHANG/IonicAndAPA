define(['app'],function (app) {
  app.factory('authenticateFactory',function(){
    var token={};
    const headers = {'Content-Type': 'application/x-www-form-urlencoded;charset=gbk'};
    const params={password:'password'};
    var _setter=function(data){
      token=data;
      //headers['Authorization']='Bearer '+token;
    }
    var _getter=function(){
      return token;
    }
    return {
      setter:_setter,
      getter:_getter,
      headers:headers,
      params:params
    }
  });
});
