---
layout: post
title: Hash Tables The Undercover Exposé When Collisions Happen
---

It took me a while to understand hash tables (HTs). While learning about HTs in class, I so boldly wanted to ask “uhhh, aren’t these just nested arrays?” And I found out the answer could be yes, if I so wished to implement them via nested arrays.

Hash tables are a solution to storing key-value pairs with a better time complexity than object literals. Arrays are numerically ordered lists, so its time complexity is constant. If you want the value third down from the top of the list, boom, you have it. There's no need to search the entire array for what's in third place. Object literals store key-value pairs where the keys are strings, therefore have a liner time complexity. There is no particular order of the keys in an object literal, so worst case scenario you could have to search the entire pbject ebfore finding your target.... "Ain't nobody got time for that!"

![_config.yml]({{ site.baseurl }}/images/AintNobodyGotTimeForThat.gif-c200)

Both arrays and object literals are similar their values are stored w a uniq key or index. Hash tables work the same way, but their indeces are accessed via a hash key. 

A hash key is a randomly generated index number created by a hashing function. A hashing function outputs an integer for every input string. For example, if the input string "cat" outputs a 3, "cat" will ALWAYS output 3. But if "dog" also outputs a 3, it will always output a 3. And it only works one way. A proper hashing function shouldn't accept an integer and return the associated string. Its one-way relationship is why hashing functions are an essential part of security measures, such as password safety in databases.

So after the hashing function generates a random number as the hash index, this is where the incoming value is stored in the hash table. Because hash keys are randomly generated, a hash index can be supplied more than once for an incoming set of key-value pairs. This is known as a collision. How do we handle collisions?

I’ll tell you how. Buckets and tuples! What the heck are buckets and tuples, you ask? More arrays to be nested! Genius! By creating some logic to test whether something already lives at the given hash index, you can create more room, via buckets and tuples, for colliding data in your hash table.

A tuple is an array that will hold your incoming keys and values pairs at the 0th and 1st indexes of the tuple, respectively. For example, the key "cat" will be stored at index 0 and “fluffy” will be stored at index 1.

Every kay-value pair lives inside a tuple. Every tuple lives inside a bucket (remember: another array). And every bucket lives inside a numbered index somewhere inside the hash table.

When two different string keys are given the same hash index, this is a collision. If one tuple already lives inside a bucket, and another tuple is assigned the same space, they collide by making the bucket bigger, holding both tuples now.

All this is beneficial because of time complexity. Finding "fluffy" with the key "cat" alsmot has a constant time complexity because you're accessing the value by a number (the number equivalent to "cat") in an ordered list.

Provided there is a limit to how many colliding tuples can live inside of one bucket, the time complexity is much better in a hash table than an object literal.

Boom.

![Alt text](http://0.media.collegehumor.cvcdn.com/82/61/f5657ea6e8a5225a9c0c692817d5bf5c-micdrop07.gif)



