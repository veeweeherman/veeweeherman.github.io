---
layout: post
title: Redemption via the Dirty Dancing Duo of For Loops
---

<p>
Approximately 4 1/2 weeks ago I was presented with a algorithm that nearly broke me. I was doing my technical interview at a highly sought after coding bootcamp here in San Francisco. I was pummelled when I received the following algorithm: write a function that takes a string as an argument and returns an array of all the repeated characters. 
</p>

<p>
This may seem simple to many of you reading this, but you need to understand I’ve only been learning code for a few months. Although I’ve always loved math and other logically-minded curriculum, I have always been shit at puzzles and these “easy” level coding problems. 
</p>

<p>
I started sweating sorrow-shaped bullets when my interviewer asked me this. All I could think of were memories of opening coderbyte.com and <timidly>attempting</woefully> these puzzles from hell. It took me hours to half-solve one. In the interview, I could barely write anything down. Not even pseudo code. All I could think was that my answer was gonna be the wrong one or the most expensive in time complexity (like the highly looked-down-upon triple for-loop). Needless to say I left the interview feeling quite defeated. 
</p>

<p>
Fast-forward a bit: I’m now currently enrolled in that academy’s partner school across The Bay (and loving it). But today we had an assessment, and one of the things we were tested on was (you guessed it) algorithms! Oh, and THAT SAME ONE I totally bombed. My first thought was “Well I know I’m going to fail that one again.” I probably shouldn’t have come at it so negatively.
</p>


<p>
Ok, now to the fun part: I totally solved it! I’m not even sure if I solved it in the most efficient way, but hey at least it works. Again, this may not be the most optimal (in one way or another) and more experienced coders might have another approach. 
</p>

<p>I’ve had a few engineer friends of mine remind me about data structures and the unique ways they store data. A key thing that has helped me (on several occasions) throughout coding in Javascript has been remembering that an object’s keys are always strings and they’re always unique.</p>

<p>When searching for duplicates in a string, I assigned each character as a key in an empty object and kept a count by making its value equal to a number. 1 makes sense, but since indexes start at 0, I’m more inclined to make the count start at 0. Also, as each key is assigned, I checked to see if it already exists on the object. If that character already exists on the object, its value is incremented by one. So by the time the string is finally looped through, every character has been accounted for.</p>

<p>Next, I created an empty array to push duplicates into and return. Then in a for-in loop (yes I know, that Dirty-Double-for-loop, cue the Dirty Dancing theme song), search for any values that are greater than or equal to 1 and push its corresponding key into the array. Then be polite, and return what you borrowed… the array, that is. </p>

![_config.yml]({{ site.baseurl }}/images/find_dups.png)


