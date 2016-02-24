---
layout: post
title: SetTimeout, Hoisting, Block Scoping
---
This seems to be an industry-wide favourite at the moment:

{% highlight ruby linenos %}
for (var i = 0; i < 4; i++){
  setTimeout(function(i){
   console.log(i);
  }, i*1000);
}
{% endhighlight %}

where the directions say print out 0, 1, 2, 3 1000 milliseconds (or, 1 second) apart.

But why won't this code obey? What does is it do? The code as is will print undefined four times, 1 second apart. Why not the 0, 1, 2, 3 at 1 second apart?

It's because of block scoping and hoisting (and a few other things). Let's quickly go over these two topics. In Javascript, a new scope is declared when the {} brackets are written in a function. For example:

{% highlight ruby linenos %}
var x = 11;
var foo = function() {
  var x = 99;
  console.log(x);
}

foo(); // --> 99
{% endhighlight %}

When function foo is invoked, it will log the value of x. It will log 99 because it is logging the value of x inside the scope of the foo function, what is inside the {} brackets. So what happens when we log the value of x outside the function foo scope?
{% highlight ruby linenos %}
var x = 11;
var foo = function() {
  var x = 99;
  console.log(x);
}

console.log(x); // --> 11
{% endhighlight %}

You guessed it, because we are not logging from inside the function foo scope, we are getting the value of x in the scope of the console.log statement on line 7, which in this case the global, which is x = 11 on line 1.

The other topic, hoisting, is when variable declarations are brought to the top of its scope. To be very explicit, only the declarations are brought to the top of the scope, not the initializations (what the variables are equal to). Hoisting is one of those Javascript topics that devs overlook because it seems redundantly obvious, until your code is breaking, then it's important...ly annoying.

If you have just the one line of code, what do you think the console will say? It's not undefined, but listed as

{% highlight ruby linenos %}
console.log(y);
// --> ReferenceError: y is not defined;
{% endhighlight %}

This is because y was not declared at all.

But if we had:

{% highlight ruby linenos %}
console.log(y);
var y;
// --> undefined
{% endhighlight %}

The console would say undefined. Here, y is declared and brought to the top of its scope. So the program recognizes y as a valid variable in the program, it just hasn't been initialized with any real value.


And when I say the declarations get hoisted and NOT their initializations, that is why the following is still undefined.

{% highlight ruby linenos %}
console.log(y);
var y = 8;
// --> undefined
{% endhighlight %}

Let's combine the two concepts now:

{% highlight ruby linenos %}
var x = 11;
var foo = function() {
  console.log(x);
}
foo(); // --> 11
{% endhighlight %}

Here's the other great thing about scoping. It takes on a one-way street mindset. When invoking the foo function, x is not defined or declared inside the foo function, so no declaration of x is ever hoisted to the top of the foo function scope. So what scope behavior will do is jump to the next outer scope looking for the value of x, which is why it logs 11 from line 1 here. I mention it's a one-way relationship because when searching for values of variable the code goes from most inner scope to outer. Outer scopes will never reach into inner scopes for values.

What if we declare x inside the foo function but not initialize it? What do you think will log here?

{% highlight ruby linenos %}
var x = 11;
var foo = function() {
  var x;
  console.log(x);
}
foo(); // --> undefined
{% endhighlight %}

It's logging undefined because within the foo function scope, is has been declared (not initialized with a value) but it does exist, so the log is undefined.

Knowing all that, let's take a look at the original question again:

{% highlight ruby linenos %}
for (var i = 0; i < 4; i++){
  setTimeout(function(i){
   console.log(i);
  }, i*1000);
}
{% endhighlight %}

So because of block scoping, the variable i inside the function on line 3 is different than the i in the for loop. It's just deceptive because they are named the same letter. To see what I mean, let's change the i's to something else on lines 2 and 3.

{% highlight ruby linenos %}
for (var i = 0; i < 4; i++){
  setTimeout(function(z){
   console.log(z);
  }, i*1000);
}
{% endhighlight %}

The same thing happens here. Undefined is printed four times, 1 second apart. So whether it's i or z or any other parameter name, no value is sent into the anonymous function as an argument. But the reason the milliseconds are correct is because the i on line 4 is in the same scope as the for loop.

To test your knowledge of scoping and hoisting, what's happening here?:

{% highlight ruby linenos %}
for (var i = 0; i < 4; i++){
  setTimeout(function(z){
   console.log(i); // when we change this back to i
  }, i*1000);
}
// --> four times
// --> 4
// --> 4
// --> 4, all 1 second apart
{% endhighlight %}

The for loop runs from 0 to completing at 4 by the time any of the setTimeout's go off. That is why we print the last number in the loop, 4, four times in the end. In Javascript there is also something called a Call Stack. It's the queue of tasks the Javascript runner will execute in what ever order the tasks arrive in the queue (like at the ice cream shop, no cut-sies). Since a setTimeout is always going to be queued up for some time later (it's in its nature to be put on the backburner, look at its name), the for loop is prioritised. Here, i is indeed defined because it looks to its outer scope (the scope that holds the for loop) for a value of i. But because at the time any of the setTimeout's start executing it will look to its outer scope for i, i has already reached its final stage, 4.

Ok, so lets fix this damn thing. How do we pass each iteration of the variable i into the setTimeout? Well, there's at least two ways. I'll go into the two I know.

The first way is with the .bind() method. The .bind() is a useful way to capture a very specific instance of something, in our case, the progression of i. In this particular example, the .bind() method takes at least "two" parameters. The first argument of the .bind() method is always the context of which the function the .bind() method is attached to and will use when the target method is called. Typically the first argument is null or the keyword *this*. I'll save the explanation for that in a different blogpost because you might get stuck in an infinite loop of babble :p but the important thing to note about .bind()'s arguments is everything after the context/first argument. You can pass any number of arguments into .bind(). In our case though, we are passing in every iteration of the variable i from the for loop:

{% highlight ruby linenos %}
for (var i = 0; i < 4; i++){
  setTimeout((function(i){
    console.log(i);
  }).bind(null, i), i*1000);
}
{% endhighlight %}

it's important to note here that the i's on line 2 and 3 coincidentally are named i. Remember what we talked about earlier about different scopes within the {} brackets of a function declaration? The above code works the same if the i's on lines 2 and 3 were a different name:

{% highlight ruby linenos %}
for (var i = 0; i < 4; i++){
  setTimeout((function(m){
    console.log(m);
  }).bind(null, i), i*1000);
}
{% endhighlight %}

This code above outputs the same as when the m's were i's. By the way, when we said earlier that the first argument for bind could be null or keyword *this*, it didn't actually matter in this particular case. If you set a completely different value in there, the code would still run the same. Try it with an empty object {} or a string.

Anyway, why's the code behaving now? By binding the anonymous function inside the setTimeout to any context and passing in the i value as its only argument, we are "capturing" each value of i. Remember, the value of i on line 4 (both of them) are in the scope of the for loop because they are outside of the anonymous function declaration inside the setTimeout. Whether the parameter name on lines 2 and 3 are m, i, or oogaBooga its value becomes the argument passed into it.

The other way to make the code behave and print the successive values of i is using an IIFE, an Immediately Invoking Function Expression. Sometimes read as "iffy" or as my friends and I like to pronounce it as if we spoke French, an "eefay" :p Anyway, an IIFE does what you might think it does according to its name, it invokes itself immediately. Wrap the setTimeout in an IIFE and pass it the value of i, the i that will be in the same scope of the for loop.

{% highlight ruby linenos %}
for (var i = 0; i < 3; i++){
  (function(z){
    setTimeout(function(){
      console.log(z);
    }, 1000*i)
  })(i);
}
{% endhighlight %}

The funky thing about setTimeout is that it is a method on the window object. When writing:

```
setTimeout(functionHere,timeElapsed)
```

the setTimeout method is calling what ever function passed into it (whether an anonymous function of a variable declaration elsewhere) after the amount of time that you passed in has elapsed. As in, that inner function inside the setTimeout is invoked "as is" with no arguments passed into it. Because we are trying to pass different things into this anonymous function inside the setTimeout, we need to get all fancy with IIFEs or .bind() in order to make it happen.
