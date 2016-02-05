angular.module('starter.controllers', [])

.controller('toolCtrl', function($scope){


})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, starService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var count = 1;
  var cc = this;
        starService.getData(count).then(function(data){
            cc.chats=data;
            });
  //while(count<9){
  //    starService.getData(count).then(function(data){
  //        for(var i=0;i<data.length;i++){
  //            //cc.chats.push(data[i])
  //            console.log(data[i])
  //        }
//
  //    });
  //    count++;
  //}


  //$scope.remove = function(chat) {
  //  starService.remove(chat);
  //};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, starService) {
      var cd = this;
      cd.chat = starService.getChat(parseInt($stateParams.chatId));
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  }
});


