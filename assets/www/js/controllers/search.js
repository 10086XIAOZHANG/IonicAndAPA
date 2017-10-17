define(['app'],function (app) {
    app.controller('searchCtrl', ['$scope', '$stateParams','$state', function($scope, $stateParams,$state) {
        // $scope.tag = "";
        //
        // $scope.delete = function () {
        //     $scope.tag = "";
        // }
      $scope.searchCont = {};//搜索内容
      $scope.ItemArr2 = []; //搜索后页面遍历显示的数组
      $scope.search = function(){
        $scope.ItemArr2 = []; //每次搜索先清空数组内容
        var searchValue = document.getElementById('search').value;
        for(var i=0;i<$scope.ItemArr1.length;i++){
          var num = i;
          for(var j=0;j<$scope.ItemArr1[num].name.length;j++){
            var Name1 = $scope.ItemArr1[num].name.charAt(j);
            for(var k=0;k<searchValue.length;k++){
              var Name2 = searchValue.charAt(k);
              if(Name1 == Name2){
                if($scope.ItemArr2.indexOf($scope.ItemArr1[num])<0){
                  $scope.ItemArr2.push($scope.ItemArr1[num]); //如果有相同的字，切不在数组内，加入数组。
                }
              }
            }
          }
        }
        if($scope.ItemArr2 == ''){
          alert('未找到匹配的驾驶员');
        }
      }
      $scope.clearSearch = function(){
        $scope.searchCont = {};
        $scope.ItemArr2 = [];
        $state.go('tab.home')
      }
    }]);
});

