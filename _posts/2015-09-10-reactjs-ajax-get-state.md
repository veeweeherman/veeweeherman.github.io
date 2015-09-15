---
layout: post
title: Using ReactJS and state to render cool stuffs
---

For several hours my goofy front end partner and I were chasing down the results of our database query. Our app has a ReactJS component that will render a user's name and location after it has been retrieved from the database.

Here’s the set up for our simple database AJAX GET request in ReactJS:

{% highlight ruby linenos %}
var ProfilePictureNameLocation = React.createClass({
	  getInitialState: function(){ 
    return {username: '',location: ''}
  }, 
{% endhighlight %}

Setting the stage initially on line 3 sets the state of the data as an empty string that will be assigned values once the database query has successfully returned with an object that has our desired data (the user's actual name and location).

{% highlight ruby linenos %}
  componentDidMount: function() {
    $.ajax({
        type: 'GET',
        url: '/api/nameAndLoc', 
        dataType: 'json',
        success: function(data) { 
          this.setState({
            username: data[0].username, 
            location: data[0].location
          })
          console.log('successfully retrieved username and location from the database!')
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
          console.log('failed to retrieve username and location from db :( ');
        }.bind(this)
    })
  },
{% endhighlight %}

The componentDidMount function in ReactJS handles our request. It has your usual components of an AJAX call, as you can see above. But on a successful call, the state of the data needs to be updated. Because this particular database query returns an array, on lines 7-10 we need to locate exactly what we need and assign it to the correct values in the state object. 

{% highlight ruby linenos %}
	render: function(){
		return (
			<div>
        <img src={'some-image-URL'} />
        <p>Hello, {this.state.username}!</p>
        <p>Location: {this.state.location}</p>
      </div>
    ) 
	}
	})
{% endhighlight %}

Finally, the render function puts our hard work into the wild. This is the funny thing about ReactJS. In order to have your Javascript rendered into your html, we must write html-ese in our Javascript! The render function must return your data wrapped in html elements. Make sure there's an overall parent element that wraps the entire returning data, the divs on lines 3 and 6. If we console.log the state in the render function, we’ll see the username and location have been updated form the successful ajax call, and thats what we want to render!

This seems simple enough right? Well, it’s not. If we console.log messages throughout these three methods in our ReactJS component, you’ll see that render is called twice with componentDidMount once in between those 2 invocations. This caused my partner and I problems that lasted several hours. We couldn’t understand why we couldn’t access the returning data from the successful AJAX call. Firstly, we set the initial state incorrectly. We set the state object to {data: ''} If state is set like this, we're not really reminding ourselves that username and location need to be assigned. 

Also, because the render function is invoked first, the state is still empty. It isn’t until the second time render is invoked that it will hold the data we need from the database. Without updating the state of the object, we’re trying to render info onto the page from an empty object :( No one likes to open up empty presents on their birthday… always set the state properly!

![Alt text](https://i0.wp.com/cdn.theglow.com.au/app/uploads/2014/08/emptybox.gif)




