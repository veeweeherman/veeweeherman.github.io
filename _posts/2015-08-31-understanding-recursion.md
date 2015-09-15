---
layout: post
title: Understanding Recursion is Inception is Recursion is Inception...
---

Recursion is a deceptively hard thing to understand. But as I progress in my tenure at Telegraph Academy, the coding bootcamp I’m currently in, I’m learning more and more that recursion is everywhere. I’m also learning I want to creepily whisper “inception…” every time I approach an algorithm that requires recursion. 

![Alt text](http://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/03/1394332737Go-Deeper-Inception-Movie.jpg)

In programming, recursion is when a function calls itself. Recursion can be useful when the size of the list to iterate through is unknown. An array’s size can easily be found using the .length() method. But there are data structures where the number of properties in a list is unknown because of where they could be stored in the data structure.

A tree is a data structure that starts with a single node and that first node may have child nodes. Think of nodes as a piece of data in the tree. It usually holds a value and a reference to its child nodes, the nodes that belong to the parent node. And just like with people, each child may have its own set of children, and so on and so on. You get the picture. And if not, here’s a real one:

![Alt text](http://people.cis.ksu.edu/~schmidt/300s05/Lectures/GrammarNotes/species.jpg)

Let's say the constructor function for each node on this tree is the following. 
{% highlight ruby linenos %}
  var Tree = function(value){
    this.value = value;
    this.children = [];
  };
{% endhighlight %}
I've written the code with a psedoclassical instantiation pattern in Javascript. If you're baffled by what that is, check out this dude's nifty blog post about [instantiation patterns.](http://www.ryanatkinson.io/javascript-instantiation-patterns/)

Now imagine the code in the illustrated tree was this:
{% highlight ruby linenos %}
  var animal = {
    value: 'Animal',
    children = ['Reptile','Mammal']
  }
  var reptile = {
    value: 'Reptile',
    children = ['Lizard','Snake', 'Bird']
  }
  var mammal = {
    value: 'Mammal',
    children = ['Equine','Bovine', 'Canine']
  }
  // etc... etc...
{% endhighlight %}

Do you see how every child node on the tree is referenced nn an array on its parent? That means any node that is a child can be stored on all different places all over the tree!

Using recursion, I wrote an algorithm to find all the leaves. A leaf is a node that does not have any child nodes. Visually speaking, those kids live at the furthest edges of a branch of the tree. If every parent node holds the list of its children, then how do we iterate on all these different separate lists of child nodes when we don’t know how many or how long these lists are?

We write out a base case. A base case is the condition that will stop the recursive function from calling itself forever. Think of it like the limit in a for-loop. In order to count the leaves in a tree, and not infinitely invoke itself, my function needs to stop counting at some point. But how do we know when? When the child node we are currently iterating on has no more children. Then we know we are at a child-less node. Let’s set that up:

{% highlight ruby linenos %}
  Tree.prototype.countLeaves = function () { 
    var leaves = 0; // counter for leaves
    for (var i = 0; i < this.chidren; i++){
      if (this.children.length === 0){ // check if current node has no children
      leaves += 1; // if current node is childless, incrememnt the leaf count
      }
    }
    return leaves;
  };
{% endhighlight %}


First, I created a variable to keep track of the number of leaves found, initialised at 0. Then to check the length of the current node’s children array. If the length is zero, then it is a childless node and up goes the leaf count. 

Now what to do when is does have children and we must search further? We invoke this counting function again on the current node.  Something like this:

{% highlight ruby linenos %}
  for (var i = 0; i < this.children.length; i++) {
    countLeaves(this.children[i]);
  };
{% endhighlight %}

This recursive invocation will check this child’s children array to see if it has any children. (Are you seeing how Leonardo DiCaprio is starting to sneak into the picture now?)

Hmm, this seems to make sorta sense but how does it work all together? Let’s refactor. Introducing: The subroutine.

{% highlight ruby linenos %}
  Tree.prototype.countLeaves = function () { 
    var node = this;
    var leaves = 0; // counter for leaves
    var inner = function(node) { // need subroutine to not lose count of leaves 
      if (node.children.length === 0){ // check if current node has no children
        leaves += 1; // if current node is childless, incrememnt the leaf count
      }
      for (var i = 0; i < node.children.length; i++) {
        inner(node.children[i]);
      };
    };
    inner(node);
    return leaves;
  };
{% endhighlight %}

Subroutines are inner functions that get called recursively as we iterate through lists. There aren’t always clear cut cases of when or when not to use subroutines (or if there is I just haven’t written about it yet!) but I like to use subroutines when there is some variable that needs to be in a separate scope of an iteration. Here with the “inner” subroutine, I’m able to keep the leaf count from resetting with every iteration of our for-loop.

And of course, what would a subroutine be without an invocation? Most of the time, the subroutine will need to be invoked inside the original function, with its first argument on line 12. The reason I know this will work is because the first argument passed in is connected to everything that will be iterated on later. Each node is connected to its children and grandchildren through references in the children arrays.

If you're wondering why I set the node to equal "this" on line 2, it's because in pseudoclassical instatiation, the keyword "this" usually refers to the object that called the method in the first place. But because I want to recursively call the countLeaves method on any of this's children, I'll just refer to it as "node" and iterate over "node"'s children. If you want more info on that, leave a comment and I'll try and fanaggle a post about the horrors of "this".

And there we have it. Oh, Leo! 

![Alt text](http://33.media.tumblr.com/tumblr_lmbnsuXCdB1qa4ihzo1_500.gif)