---
layout: post
title: LeapFrog
---

I just nerded out on an algorithm that I don't feel I submitted successfully, but somehow afterward when given another block of time, I think I solved it. What the hell. As long as I learn, I never lose, right?

Here's the prompt:

```
prompt
```

Let's try and walk through the steps of my brain's logic:

First I want to try and solve for all the "easy" edge cases, such as the conditions that return 0 and -1:

The best case scenario I can think of is if the length of the pond is smaller than the max-distance the frog can jump. For example, if the pond's other side was at position 7, but the frog could jump any distance between 1 and 7, then boom one jump and it's done.

{% highlight ruby linenos %}
var leapFrog = function(arr, X, D){
  if (D >= X){return 0;}
}
{% endhighlight %}

There are two conditions the prompt explicitly states where 0 will be returned:

1. 'If the frog can leap across the pond in just one jump'
2. 'If the frog can get to the other side of the pond, just after the very first leaf falls'

If the frog can leap across with just one jump, it means there is at least one leaf on the pond where the distance between the frog and leaf and the distance between leaf and other side is less than or equal to the max-distance the from can jump
if (A[i] - 0 <= D && X - A[i] <= D){ //the frog can make it to X with just 1 jump return 0;}

The second condition, is the same stipulation as above except it wants to know if it can jump to position X using the very first fallen leaf, which is A[0]
if (A[0] <= D && X-A[0] <= D){//the frog only needs to use the very first leaf to make it to position X on the other side return 0;}

To know when the function should return -1, we have to know what conditions need to be true in order for the frog to never be able to jump across:
- if by the end of the time, when the distance between any 2 adjacent leaves are greater than D;

But if we're not returning 0 or -1, we're returning the earliest time the frog can make the last jump to finally reach the other side X
