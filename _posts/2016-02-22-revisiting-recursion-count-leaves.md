---
layout: post
title: Recursion, Pseudoclassical Instantiation, Trees!
---


So let's revisit this countLeaves/recursion business. I recently hacked away at it again, and did it slightly differently.

First, let's all agree to use and understand pseudoclassical instantiation patterns, because that is what I am going to be using. So we need to declare our tree class first.

{% highlight ruby linenos %}
var Tree = function(value){
  this.value = value;
  this.children = [];
}
{% endhighlight %}

Tree is a function that when instantiated it will return an object with the properties assigned to it. In this case, a value and an array to hold references to any of its children, if any.

With pseudoclassical, how do we instantiate? Like this:

```
var root = new Tree(v);
```
Now, root is an object with these two properties: value and children.

Now how does a node adopt any children? Well, we need to make an addChild method for that. Because we are using pseudoclassical instantiation, we should think about the prototype and expanding it. What does the prototype do? Everything in Javascript is an object and all objects in Javascript inherit properties and methods from its prototype. This is basically what makes things behave in Javascript. When we declared the Tree class above, it was given its own prototype automatically, because all things in Javascript inherit from other prototypes and can have their own prototypes to pass on their own properties. So we can expand the tree's prototype with any methods we need. Why do this? The most important reason to do this is because if we give every new node its own addChild method we use up more memory because every individual node has a copy. If we let all tree instantiations just look to their protoype for the method, we don't run into scoping issues because then we don't have mutiple copies of the same method all over the program.

So, let's expand and instantiate:

{% highlight ruby linenos %}
Tree.prototype.addChild = function(node){
  this.children.push(node);
}
root.addChld(new Tree(v));
{% endhighlight %}

Now, let's count leaves! Leaves are any node on the tree who are childless. The last extension of the branch as it were. Check out this example:

{% highlight ruby linenos %}
* Illustration of a tree with three leaves:
*
*       * <- root
*      / \
*     *    * <- leaf
*    / \
*   *   * <- leaf
*  /
* * <- leaf
{% endhighlight %}

Ok, how do we count leaves? Well, this probably already looked familiar because we need to iterate through the tree or subset of the tree. So let's give the ability to iterate and count leaves on any/every node by expanding the prototype with a countLeaves method:

{% highlight ruby linenos %}
Tree.prototype.countLeaves = function (){
  var leaves = 0;
  // do your voodoo magic;
  return leaves;
}
{% endhighlight %}

Iterating the tree involves starting with the root node, and iterating through its children, recursively calling the method on itself when the child we are iterating over has its own children.

Before we really start going into it, let's remember the thing about recursion that stops it from going into an infinite loop--what's my base case? Your base case is where the function doesn't need to call itself anymore. Well, what are we finding? The number of leaves. How do we know if a node is a leaf? If it has no children. Knowing the structure of each of our tree nodes, how do we know if the node is a leaf?

{% highlight ruby linenos %}
var Tree = function(value){
  this.value = value;
  this.children = [];
}
{% endhighlight %}

The children property is an array of child nodes. If the array is empty, the node is a leaf! So let's check for that:

{% highlight ruby linenos %}
Tree.prototype.countLeaves = function (){
  var leaves = 0;
  // do your voodoo magic;
  for (var i = 0; i < this.children.length; i++){
    var current = this.chidlren[i];
    if (current.children.length === 0){
      leaves += 1;
    } else {
      leaves += current.countLeaves;
    }
  } // end of voodoo magic
  return leaves;
}
{% endhighlight %}

Ok, so what happened? On line 5 I just renamed the current node we are iterating over "current" because you can see on line 6, it would've looked messy and too ugly to read as this.children[i].children.length, at least for me anyway. So for each child node we iterate on, we look at its children array. If it's empty then we have a leaf and we increment the leaf count. If it is not empty, then we need to iterate through each of its child node's children arrays--recurse!

Beacuse everytime countLeaves is invoked, it reutrns the number of leaves it found, whether it is 0 or a positive intger, it should be added to the leaves count, which is what's happening on line 9.

Then of course in the end, return the total amount of leaves (line 12).

All my wisdom:
{% highlight ruby linenos %}
var Tree = function(value){
  this.value = value;
  this.children = [];
}

Tree.prototype.addChild = function(node){
  this.children.push(node);
}

Tree.prototype.countLeaves = function(){
	var leaves = 0;
  for (var i = 0; i < this.children.length; i++){
    var current = this.children[i];
  	if (current.children.length === 0){
    	leaves += 1;
    } else {
    	leaves += current.countLeaves();
    }
  }
	return leaves;
}
{% endhighlight %}
