define(['app','../service/storageService'],function (app) {
    app.controller('friendCtrl', ['$scope','$ionicPopover','$timeout','storageFactory', function($scope,$ionicPopover,$timeout,storageFactory) {
        var pages = "#/tab/home+#/tab/message+#/tab/add+#/tab/friend+#/tab/mine";
        $scope.$on('$ionicView.afterEnter', function() {
            if (pages.indexOf(location.hash) > -1) {
                var tabs =document.getElementsByTagName('ion-tabs');
                angular.element(tabs).removeClass("tabs-item-hide");
            }
        });
        $scope.$on('$ionicView.beforeLeave', function() {
            if (pages.indexOf(location.hash) > -1) return;
            var tabs =document.getElementsByTagName('ion-tabs');
            angular.element(tabs).addClass("tabs-item-hide");
        });

        // ѡ������
        var type = ['friend', 'group', 'focus'];
        $scope.type = type[0];
        $scope.changeType = function(num) {
            $scope.type = type[num];
        };
      // .fromTemplate() 方法
      var template = '<ion-popover-view class="fit"><ion-list><ion-item><a class="login-register addlist addlist-storage"  href="#/tab/storagesearch">仓库</a></ion-item><ion-item><a class="login-register addlist addlist-storagepositions"  href="#/tab/storagepositionsseacrch">仓位</a></ion-item><ion-item><a class="login-register addlist"  href="#/tab/createGroup">提交</a></ion-item></ion-list></ion-popover-view>';
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
      $scope.$watch(function(){
        if (storageFactory.getter().storageName != $scope.before) {
          $scope.storaged=storageFactory.getter().storageName;
        }
      });
    }]);
});

