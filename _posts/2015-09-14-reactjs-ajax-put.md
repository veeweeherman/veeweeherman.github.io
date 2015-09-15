---
layout: post
title: To Get or to Put? That is the question.
---


My team and I are still working on our habit tracker app that is written in ReactJS. We’re implementing an upvote functionality to a NewsFeed component. Like in Facebook, someone else’ status update can be liked my many people. And there is a total like count that is displayed and updated in real-time. 

In our app, there’s also a similar NewsFeed/ActivityFeed feature. A user on our app will be able to see updates from other users and give a thumbs-up/like for the friend’s update.

![Alt text](http://img0.joyreactor.com/pics/post/Shakespeare-memegenerator-fry-is-not-sure-204312.jpeg)

Up until now we’ve been using AJAX to make POST and GET requests. For the first time ever today, we used an AJAX PUT request. It’s not a POST request because we aren’t adding any new value into the database. Instead, we are updating (specifically, incrementing) a value in the database that is associated with a particular update in the feed.

Up until now, I never really knew what the actual use of PUT was. Apparently the rest of the internet doesn’t know either! So many StackOverflow questions about AJAX PUT requests were left unanswered. Boo hiss.

We were having trouble making a successful PUT request because we didn’t know whether or not the PUT request took in an argument. Well, it doesn't. Since all we wanted to do was go into the database, look at a current value, and increment it in the database, what data are we sending into the database? That's right, none.

{% highlight ruby linenos %}
var ButtonIncrement = React.createClass({
		upvote: function(){ 
		$.ajax({
      url: '/api/upvote',
      type: 'PUT',   
      contentType: 'application/json',
      dataType: 'json',
      success: function(data) { 
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	},
	render: function(){
    return (
    	<div >
	  		<button type="submit" onClick={this.upvote}>THUMBS UP</button>
      </div>
    ) 
  }
})
React.render(<ButtonIncrement />, document.getElementById('buttonincrement'))
{% endhighlight %}