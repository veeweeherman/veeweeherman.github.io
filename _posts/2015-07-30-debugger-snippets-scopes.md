---
layout: post
title: Debugger and Snippets and Scopes, Oh My!
---

Like many other budding engineers, I was once scared of Google Chrome’s Debugger (dun dun dun…). There are a number of useful things you can do in the Debugger, one of which is using Snippets and Breakpoints. Snippets are places in the Sources tab where you can paste bits of code to debug. Breakpoints stop time in the function invocation.

![_config.yml]({{ site.baseurl }}/images/snippetrun.jpg)

Take the following simple example:
The Finbonacci sequence is a series of numbers where any number in the sequence is the sum of the previous two numbers, where the sequence starts at 0 and 1.
The function nthFibonacci takes a number, n, as an arument and returns the nth number in the Fibonacci sequence.
Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 33...

Rewriting the Fibonacci sequence with a(n obvious) bug and setting a breakpoint at line 5.
![_config.yml]({{ site.baseurl }}/images/breakpoint.jpg)

Setting a breakpoint where the variables are expected to change, for example with every iteration of the for loop, will hone in on where my code could be breaking. 

![_config.yml]({{ site.baseurl }}/images/scope.jpg) 

Both within the Scope tab and in the code (where ever is easier for you), you can also watch your variables change. Assigning a breakpoint and pressing the blue play button will allow you to slowly watch the function “play” at every step. Allowing you to find where your expectation of the code is not met. This is useful because pausing inside a multi step function (whether within a for loop or recursive process) allows you to catch the first instance of a miscalculation.

In this Fibonacci sequence example, if n = 5, I expect 5 to be returned. With the code currently written and without the debugger, 16 is returned and I'm left to wonder. But if I watch the growth of the fib array, I can see the sequence numbers are not at all correct! Watching the fib array and the value of i (and of course calculating the i values on line 5), I can see that (oops!) I’ve assigned the nth value of the sequence to be sum of the previous number twice instead of the previous 2 numbers.

Without of course the obvious bug in this simple 7-line algorithm, hopefully you can see the value of the debugger in larger projects. Imagine you have hundreds of lines of code. Give your poor eyeballs a break and let the Debugger find the problem for you.

![_config.yml]({{ site.baseurl }}/images/mrbeaneye.gif) 