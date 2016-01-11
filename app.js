
var app = angular.module('BallClock', []);

app.controller('clockController',function($scope, Factor){


     $scope.ballNumber = 0;
     $scope.cueNumber = [];
     $scope.cueMaster = [];
     $scope.minTrack = [];
     $scope.hourTrack = [];
     $scope.twelveTrack =[1];
     $scope.minutes = 0;
     $scope.hours = 0;
     $scope.days = 0;
     var runSequence = true;


       //collect ball number to be converted to the cue
       $scope.numInCue = function(updateNum) {
         var updateArray = Factor.convertToArray(updateNum);
         angular.extend($scope.cueNumber, updateArray);
         angular.extend($scope.cueMaster, updateArray);

        ////push ball into minute track
        // Factor.pushBall($scope.minTrack,$scope.cueNumber);
        // $scope.minutes = $scope.minutes + 1;

          while(runSequence == true) {

           // push another minute into minutes track
           Factor.pushBall($scope.minTrack,$scope.cueNumber);
           $scope.minutes = $scope.minutes + 1;

             Factor.updateTrack($scope.minTrack, 5, $scope.cueNumber, $scope.hourTrack);

           if ($scope.minutes === 60){
            $scope.hours = $scope.hours + 1;

             $scope.minutes = 0;
             // check hour track
             Factor.updateTrack($scope.hourTrack, 12, $scope.cueNumber, $scope.twelveTrack);
               Factor.updateHoursTrack($scope.twelveTrack,12, $scope.cueNumber);
           }

           if($scope.hours === 24){
             //console.log('this should be 24 hours: ', $scope.hours);
            $scope.days = $scope.days + 1;
             $scope.hours = 0;
             console.log('this should be days: ', $scope.days);

               if(Factor.checkForSequential($scope.cueMaster, $scope.cueNumber) === true){
                   runSequence = false;
               }

           }


    }

       };

});

app.factory('Factor', function(){

   return {
     // turn ballNumber into an array
     convertToArray: function(num){
       var newArray = [];
       for (var i = 0; i < num; i++) {
         newArray.push(i + 1);
       }
       newArray.shift();
       return newArray;
     },
     // initialize the cues
     fillCue: function(first_array,second_array) {
        for (var i = 1; i < first_array; i++){
          second_array.push(i);
        }
     },
     // push ball from cue to minutes track OR push from minutes to hourTrack OR push to twelveTrack
     pushBall: function(track, src) {
         track.push(src.shift());
     },
     // check Cue for sequential order
     checkForSequential: function(arr1,arr2) {

       if(arr1.length !== arr2.length){
            return false;
       }
       for ( var i = 0;i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]){
            return false;
        }
     }
            return true;
    },
      // dump track if its full for mintes && hours track
      updateTrack: function(trackToUpdate, maxNum, kue, nextTract){
          if(trackToUpdate.length === maxNum){
               for (var i = maxNum; i > 0; i--) {
                  if(i === maxNum) {
                    nextTract.push(trackToUpdate.pop());
                  } else {
                    kue.push(trackToUpdate.pop());
                  }
               }
          }
      },
      // update 12 hour track
      updateHoursTrack: function (track,maxNum, kue){

          if(track.length === maxNum){
           for (var i = maxNum; i > 0; i--){

               while(track.length > 1) {
                   kue.push(track.pop());
               }

           }
          }

      }



    };
   });
