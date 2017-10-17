define(['app','../service/listsShow.js'],function (app) {
  app.controller('consignmentNoteCtrl', ['$scope','$ionicPopover','$timeout','$state','listsFactory', function($scope,$ionicPopover,$timeout,$state,listsFactory) {
    var pages = "#/tab/home+#/tab/message+#/tab/add+#/tab/friend+#/tab/mine";
    $scope.$on('$ionicView.afterEnter', function() {
        var tabs =document.getElementsByTagName('ion-tabs');
        angular.element(tabs).removeClass("tabs-item-hide");
    });
    $scope.$on('$ionicView.beforeLeave', function() {
      if (pages.indexOf(location.hash) > -1) return;
      var tabs =document.getElementsByTagName('ion-tabs');
      angular.element(tabs).addClass("tabs-item-hide");
    });


    var type = ['friend', 'group', 'focus'];
    $scope.type = type[0];
    $scope.changeType = function(num) {
      $scope.type = type[num];
    };
    // .fromTemplate() 方法
    var template = '<ion-popover-view class="fit"><ion-list><ion-item><a class="login-register addlist addlist-storage"  href="#/tab/storagesearch">选择</a></ion-item><ion-item><a class="login-register addlist"  href="#/tab/createGroup">提交</a></ion-item></ion-list></ion-popover-view>';
    $scope.popover = $ionicPopover.fromTemplate(template, {
      scope: $scope
    });
    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    // 清除浮动框
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // 在隐藏浮动框后执行
    $scope.$on('popover.hidden', function() {
      // 执行代码
    });
    // 移除浮动框后执行
    $scope.$on('popover.removed', function() {
      // 执行代码
    });
    $scope.goback=function(){
      $state.go('tab.home');
    }
    $scope.title=listsFactory.getterTitle();
    $scope.billnos=listsFactory.getterBillNo();
    console.log(listsFactory.getterBillNo())
    $scope.$on('$ionicView.afterEnter', function() {
      $scope.billnos=listsFactory.getterBillNo();
    }, false);

  }]);
});

