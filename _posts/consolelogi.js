///working: w marc and BIND
// for (var i = 0; i < 4; i++){
//   setTimeout((function(m){
//     console.log(m);
//   }).bind(null, i), i*1000);
// }

////////////////////////////////////
//working: lyft w/ IIFE
// for (var i = 0, ii = 3; i < ii; ++i){
// // for (var i = 0; i < 3; i++){
//   // var j = i;
//   (function(z){
//     setTimeout(function(){
//       console.log(z);
//     }, 1000*i) // i, j, z
//   })(i); // i || j
// }

// var foo = function(z) {
//   setTimeout(function(){
//     console.log('kljlkj',z);
//   }, 1000);
// }
// foo(123);







// for (var i = 0; i < 4; i++){
//
//   setTimeout(function(m){
//     console.log(i);
//   }, i*1000);
// }
/*
block scope/closures and hoisting!

for (var i = 0; i < 4; i++){
  // var z;
  setTimeout(function(m){
    console.log(z);
  }, i*1000);
}
^^
why hoisiting is hoisting. here, z is definitely undefined inside the coloe.log ststament. but with var z; declared on line 2, it is still undefined but the var itself is declared somewhere in this program. thats why when running it with the var z; on like 2 undefined will print out 4 times. but without the var z declaration at all, my program wont run bc it is then a reference error
-- scope is only defined in between {} brackets for func declarations
for (var i = 0; i < 4; i++){
  setTimeout(function(i){
    console.log(i);
  }, i*1000);
}
^^ prints undefined 4 times (in 1 second intervals) bc the i in the for loop declaration only reaches the i*1000. but scope in the anonymous func inside the setTimeout is not defined withint this scope. not at all the same i as in the for-loop. you know this bc you can change the i's to any other param name, such as m here, and it still prints undefined 4 times in 1-second intervals.
for (var i = 0; i < 4; i++){
  setTimeout(function(m){
    console.log(m);
  }, i*1000);
}

for (var i = 0; i < 4; i++){
  setTimeout(function(m){
    console.log(i);
  }, i*1000);
}
^^ this here prints 4 4times in 1-second intervals. why? bc the setTimeout is told to occur every 0, 1, 2 and 3 seconds. but the for-loop runs from 0 to completiong (4) by the time any of the setTimeouts go off. that is why we print the last number in the loop, 4, in the end. in js there is somethign called a Call Stack. its the queue of tasks the JS runner will execute in what ever order the tasks arrive in the queue (no cut-sies). since a setTimeout is always going to queued up for some time later, the for-loop is priortized.

ok, so lets fix this damn thing. How do we pass each iteration of the variable i into the setTimeout? Well, there's at least two ways. I'll go into the two I know.

The first way is with the .bind method. The .bind is useful way to capture a very specific instance of something, in our case, the progression of i. In this particular example, the .bind method takes "two" params. The first argument of the bind method is always the context of which the function the .bind method is attached to will use when the target method is called. Typically the first argument is null or the keyword <italic>this</italic>. I'll save the explanation for that in a different blogpost because you might get stuck in an infinite loop of babble :p but the important thing to note about bind's arguments is everything after the context/first argument. You can pass any number of arguments into bind. In our case though, we are passing in every iteration of the varible i from the for-loop:
for (var i = 0; i < 4; i++){
  setTimeout((function(i){
    console.log(i);
  }).bind(null, i), i*1000);
}
it's impotant to note here that the i's on line 2 and 3 coincidentally are named i. remember what we talked about earlier about different scopes within the {} of a function declaration? The above code works the same in the i on lines 2 and 3 were a different name:
for (var i = 0; i < 4; i++){
  setTimeout((function(m){
    console.log(m);
  }).bind(null, i), i*1000);
}
This code above outputs the same as when the m's were i's. By the way, when we said earlier that the first argument for bind could be null or keyword <italic>this</italic> but it didn't actually matter in this case. If you set a completely different value in there, the code would still run the same. Try it with an empty object {} or a string.

Anyway, why's the code behaving now? By binding the anonymous function inside the setTimeout to any context and passing in the i value as its only argument, we are "capturing" each value of i. Remember, the value of i on line 4 (both of them) are in the scope of the for-loop because they are outside of the declaration of the anonymous function inside the setTimeout. Whether the param name on lines 2 and 3 are m, i, or oogaBooga it's value becomes the argument passed into it.

The other way to make the code behave and print the successive values of i are using an IIFE, an Immediately Invoking Function Envocation. Sometimes read as "iffy" or as my friends and I like to pronounce it as if we spoke French, an "eefay" :p Anyway, an IIFE does what you might think it does according to its name, it invokes itself immediately. Wrap the setTimeout in an IIFE and pass it the value of i, the i that will be in the same scope of the for-loop.
for (var i = 0; i < 3; i++){
  (function(z){
    setTimeout(function(){
      console.log(z);
    }, 1000*i)
  })(i);
}

The funky thing about setTimeout is that it is a method on the window object. When writing:
setTimeout(functionHere,timeElapsed)
the setTimeout method is calling what ever function passed into it (whether an anonymous function of a var declare elsewhere) after the amount of time that you passed in has elapsed. As in, that inner function inside the setTimeout is invoked "as is" with no arguments passed into it. Because we are trying to pass differnt things into this anonymous function inside the setTimeout, we need to get all fancy with IIFEs or .bind in order to make it happen.
*/






















//
// // setTimeout(function(i){
// //   console.log(i)
// // }, 1000);
//





// var merge = function(a1, a2) {
//   var output = [];
//   var p1 = 0;
//   var p2 = 0;

//   while ( p1 < a1.length && p2 < a2.length) {

//     if (a1[p1] < a2[p2]){
//       output.push(a1[p1]);
//       p1++;
//     } else {
//       output.push(a2[p2]);
//       p2++;
//     }
//   }
//   if (p1 < a1.length){
//     for (var i = p1; i < a1.length; i++){
//       output.push(a1[i]);
//     }

//   }
//   return output;
// }


// var a1 = [1, 2, 30, 40, 50];
// var a2 = [3, 5, 10];
// var a3 = merge(a1, a2);
// console.log(a3);







// // for (var i = 0, ii = 3; i < ii; ++i) {
// //   setTimeout(function() {
// //     console.log(i);
// //   }, 1000 * i);
// // }


// /*
// 0  // from line 5, after 0 seconds
// 1  // from line 5, after 1 seconds
// 2  // from line 5, after 2 seconds
// */


// var foo = function(){
//   for (var i = 0, ii = 3; i < ii; ++i){
//     //let j = i
//     // ;(function(j){
//       setTimeout(function(j){
//         console.log(j);
//       }.bind(this, i), 1000*i)
//     // })(i);
//   }
// }
// foo();
