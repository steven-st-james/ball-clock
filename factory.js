angular.module('BallClock')
  .factory('Factor', function(){

     return {
       fillCue: function(numOfBalls, kue, src) {

           for(var i = 0; i < numOfBalls.length; i++) {
             kue.push(i);
           }
       },
       pushBall: function(track, src) {

       },
       addToNextTrack: function() {

       }
     }
  })
