var hasRun=false;
angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

   //Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];
  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.service('starService', starService);
starService.$inject = ['$http'];
function starService($http){
  var hs=this;
  var run=false;
  hs.contacts=[];
  hs.getData=getData;
  hs.getChat=getChat;
  // private function
  function getData(pg) {
      return $http.get('http://swapi.co/api/people/?page=1')
          .then(function (response) {
            response.data.results.forEach(function (row, id) {
              row.movies = "";
              $http.get(row.species[0]).then(function(resp){
                row.speciesName = resp.data.name;
              });
              row.chatId = id;
              row.films.forEach(function(fil, num){
                $http.get(row.films[num]).then(function(resp){
                  row.movies += " " + resp.data.episode_id;
                });
              });
              $http.get(row.homeworld).then(function(resp){
                row.homePlanet = resp.data.name;
              });
              var x = (row.height * 0.0328084).toFixed(1);
              var feet = parseInt(x.toString().split(".")[0]);
              var inches = (parseInt(x.toString().split(".")[1]) * 0.393701);
              row.height = feet + "' " + inches.toFixed(0) + "\"";
            });
            for(var i=0;i<response.data.results.length;i++){
              hs.contacts.push(response.data.results[i])
            }
            console.log(hs.contacts);
            return response.data.results;
          });
  }
  function getChat(id){
    return hs.contacts[id]
  }
}
//(function(){
//  'use strict';
//
//  angular.module('starService', [])
//      .service('starService', starService);
//
//  starService.$inject = ['$http', 'uiGridConstants'];
//
//  function starService($http, uiGridConstants) {
//
//    // list everything
//    var hs = this;
//    getData().then(function(data){
//      hs.myGrid.data = data;
//    });
//    getPlanetData().then(function(data){
//      hs.planetGrid.data = data;
//      console.log(hs.planetGrid.data);
//    });
//
//    // private function
//    function getData() {
//      return $http.get('http://swapi.co/api/people/?page=1')
//          .then(function (response) {
//            response.data.results.forEach(function (row) {
//              row.movies = "";
//              $http.get(row.species[0]).then(function(resp){
//                row.speciesName = resp.data.name;
//              });
//              row.films.forEach(function(fil, num){
//                $http.get(row.films[num]).then(function(resp){
//                  row.movies += " " + resp.data.episode_id;
//                });
//              });
//              $http.get(row.homeworld).then(function(resp){
//                row.homePlanet = resp.data.name;
//              });
//              var x = (row.height * 0.0328084).toFixed(1);
//              var feet = parseInt(x.toString().split(".")[0]);
//              var inches = (parseInt(x.toString().split(".")[1]) * 0.393701);
//              row.height = feet + "' " + inches.toFixed(0) + "''";
//            });
//            console.log(response.data.results);
//            return response.data.results;
//          });
//    }
//    function getPlanetData(){
//      return $http.get('http://swapi.co/api/planets/?page=1')
//          .then(function(response){
//            response.data.results.forEach(function(row){
//              row.movies = "";
//              row.characters = "";
//              row.films.forEach(function(fil, num){
//                $http.get(row.films[num]).then(function(resp){
//                  row.movies += " " + resp.data.episode_id;
//                });
//              });
//              row.residents.forEach(function(res, num){
//                $http.get(row.residents[num]).then(function(resp){
//                  row.characters += " " + resp.data.name + ". ";
//                });
//              });
//            });
//            console.log(response.data.results);
//            return response.data.results;
//          });
//    }
//
//  }
//
//}());
