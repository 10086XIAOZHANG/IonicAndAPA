define(['app','../service/authenticate.js','../service/httpGetData.js'],function (app) {
    app.controller('indexCtrl', ['$scope','dataFactory','authenticateFactory', function($scope,dataFactory,authenticateFactory) {
      var time= setTimeout(function(){
        //设置authenticate http://localhost:3000/api/authenticate
        dataFactory.getlist("http://localhost:3000/api/authenticate", 'POST', authenticateFactory.headers, authenticateFactory.params).then(function(data) {
          authenticateFactory.setter(data.token);
          console.info(authenticateFactory.headers);
        },function(data){
          console.error("access token fail");
        });
      },500)

    }]);


});

