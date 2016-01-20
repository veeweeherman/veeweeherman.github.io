// RECURSION
    //base case: when current position is <= D spaces from X, return current index (it will return 0 if first leaf && if current position is <= D spaces from X)
      // return current index when jump-able path is finally created

    // always check if current path makes X reachable
      // look at where there are leaves at every iteration, if as it currently is, the frog can reach the end, return the i/time/K

    // update current position when there is a leaf 1-D spaces in front, regardless of when the leaf fell

    // return -1 if by the time the last leaf falls the nearest leaf in front is farther than D spaces away
var frog = function(arr, X, D){
  var current = current || 0;
  for (var i = 0; i < array.length; i++) {
    if(arr[i] - current <= D && arr[i] - current > 0){current = arr[i];}
    if (X - current <= D){return i;}

  }
  return -1;
}


var frog = function(arr, X, D){

  if (D >= X){return 0;}; // best case scenario: frog can jump more than entire length of pond

  // // if pond can br crossed in 1 jump exactly, return 0;
  // if (X/D <= 2){return 'one jump exactly...'+0;} //no rpoven w placement of leaves DUHHH

  // iterate thru array,
    // if there is one leaf that is <= D on both sides (frog to leaf, anf leaf to other side-X)
      // then rrturn 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= D && X-arr[i] <= D) {
      return 'one jump exactly...'+0;
    }
  }

  // if the distance between the frog and first leaf AND first leaf and finish are both <= D, return 0;
  if (arr[0] <= D && X-arr[0] <= D){return 'first leaf...'+0;}



  // if frog can never jump to other side, return -1;
    // when can the frog NEVER read other side?
      // when no leaves are ever reachable ie. theyre all D+ spaces from each other
      // if by the end of time elapsed, frog is stuck in middle/beginning, w no way to jump any farther
      // if any distance between any leaves by the end of the time lapse, are more than D-spaces from each other, it's too far for the frog to jump:


    var sorted = arr.sort();
    for (var i = 0; i < sorted.length; i++) {
      sorted[i-1] = sorted[i-1] || 0;
      if (sorted[i] - sorted[i-1] > D){return -1;}
    }

console.log('arr',arr);
    var lastJump = X-D; // position at which frog can make the largest last jump
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] >= lastJump){
        return 'lastjump...'+i;
      }
    }


  return -1;

};

var sampleArr = [1,3,1,4,2,5];
var edgeCase = [6,1];
console.log(frog(edgeCase, 7, 3));

// A[0] = 1
// A[1] = 3
// A[2] = 1
// A[3] = 4
// A[4] = 2
// A[5] = 5







/* CASSANDRA AND I PAIR */

// var frog = function(arr, X, D){
//
// //   every time a leaf falls, check to see if a leaf is in front of me that is <= D spaces away
//
// // iterate thru array
//     // always check if there is a leaf D or less spaces in front of you,
//         // if yes, jump to the farthest one: update current position
//
//     // always check to see if I'm 1-D spaces away from X
//     var current = 0;
//     for (var i = 0; i < arr.length; i++){
//         for (var j = 0; j < arr.length; j++){
//             if (current arr[i]
//         }
//
//         // if (arr[i] - current <= D){
//         //     current = arr[i];
//         // }
//         // if (X - current <= D){
//         //     return i;
//         // }
//     }
//     return -1;
// };
//
//
// 0 : [1] p0 -> p1 //find farthest leaf jump to (1-D spaces away): check if anything that has fallen is <= current + D spaces in front
// 1 : [1, 5] p1 -> p1 // if not, wait till an avilable leaf drops
// 2 : [1, 3, 5] p1 -> p3 -> p5 -> x // when an available leaf falls, update current position, and check the leaves that already have fallen











var frog = function(arr, X, D){
  var current = current || 0;
  var map = [];
  map[0] = 0;
  map[X] = X;

  for (var i = 0; i < arr.length; i++) {
    map[arr[i]] = true;
    if (X - current <= D){return i; //return index of arr where current value is <= D spaces from X} else {}
    if(arr[i] - current <= D && arr[i] - current > 0){current = arr[i];}

  }
  console.log('map',map);
  for (var i = current; i <= 6; i++) {
    if (map[i]){current = i}
  console.log('current',current);
  }
  return -1;
}

var sampleArr = [1,3,1,4,2,5];
var edgeCase = [1,5,3];
console.log(frog(edgeCase, 7, 3));


// RECURSION
    //base case: when current position is <= D spaces from X, return current index (it will return 0 if first leaf && if current position is <= D spaces from X)
      // return current index when jump-able path is finally created

    // always check if current path makes X reachable
      // look at where there are leaves at every iteration, if as it currently is, the frog can reach the end, return the i/time/K

    // return -1 if by the time the last leaf falls the nearest leaf in front is farther than D spaces away



// make mapped-pond array, where indeces of leaf positions are equal to true
// at every iteration (as every leaf is added to this mapped array), check if the frog could reach X as the map-pond currently stands
  // if it can, exit and return the index of the leaf that makes reaching X possible

// return -1 if X is not reachable bc there is a gap between 2 adjacent leaves that is D+ spaces from each other

var leapFrog = function(array, X, D){
  var currentPond = [];
  currentPond[0] = 0;
  currentPond[X] = X;
  for (var i = 0; i < array.length; i++) {
    currentPond[array[i]] = true;
    // check distance between 0 and any leaves on currentPond and X: if all are within D spaces of each other, return i;
    for (var i = 0; i < currentPond.length; i++) {
      currentPond[i]
    }
  }


};
