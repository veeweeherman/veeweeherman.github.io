---
layout: post
title: AJAX POST with multiple values and ReactJS
---

My team and I are building an app in ReactJS, along with a Postgres Database, and even though there are moments when I want to bang my head against a wall, I'm loving React. Here is the most recent problem that made a dent in the wall: Sending multiple values in an AJAX POST request (specifically, values from a text-input and a drop-down menu).

Our app in a nutshell: Habitude, where users can keep track of their progress in learning a new habit.

The React component that we’re working on requires multiple nested components. One of the child components is the form that will take the user’s input from the text-field and drop-down menu and send it off to the database. What’s a good way to do this? May I introduce to you, the ref attribute.

What ever elements that will take the user’s input values, in this case: the text-field and the drop-down, stick unique ref attributes on them. In my example, lines 4 and 6.

{% highlight ruby linenos %}
  render: function() {
    return (
      <form className="habitForm" onSubmit={this.handleSubmit}>
      <input type="text" placeholder="Enter text" ref="habit" />
      <div>
        <select name="Categories" id='something' ref="category">
        <option value="null">Please select a category for your new Habitude</option>
          <option value="Health">Health</option>
          <option value="Fitness">Fitness</option>
          <option value="Addiction">Addiction</option>
          <option value="Overall Cool Catness">Overall Cool Catness</option>
        </select>
      </div>
      <input type="submit" value="Post" />
      </form>
      );
  }
{% endhighlight %}


Notice that this form is a component and its onSubmit event will fire the this.handleSubmit function that is also in this form component. React has an awesome (and convenient!) method React.findDOMNode that will find the DOM node with the ref attribute value you give it. Grab its value and trim its whitespace and there you have your strings of habit and category.

{% highlight ruby linenos %}
handleSubmit: function(e) {
  e.preventDefault();
  var habit = React.findDOMNode(this.refs.habit).value.trim();
  var category = React.findDOMNode(this.refs.category).value.trim();
  if (!habit) {
    return;
  }
  this.props.onHabitSubmit({habit: habit, category: category}); 
  React.findDOMNode(this.refs.habit).value = '';
},
{% endhighlight %}

What now? One line, 10 you can see there’s another event listener of “onHabitSubmit”. This props method will send a JSON object to my AJAX POST request. This JSON object will have the 2 key-value pairs that I need to send to the database. A value for “habit” and a value for “category”. If you want more info about the this.props property in ReactJS,  
[check out the docs.](https://facebook.github.io/react/docs/transferring-props.html/)

In the parent component that will render everything, the “onHabitSubmit” prop is an event listener we’ve created. When the “onHabitSubmit” event happens, it will fire the “handleHabitSubmit” AJAX call. 


{% highlight ruby linenos %}
  render: function() {
    return (
      <div className="habitBox">
        <h1>Habit Tracker</h1>
        <HabitList data={this.state.data} />
        <HabitForm onHabitSubmit={this.handleHabitSubmit} />
      </div>
    );
  }
{% endhighlight %}



This AJAX call takes in the JSON object that is ever-so-nicely put together by the props.onHabitSubmit:

{% highlight ruby linenos %}
handleHabitSubmit: function(habitCategory) { 

  var habits = this.state.data;
  var newHabits = habits.concat([habitCategory]); 
  this.setState({data: newHabits}); 

  $.ajax({
    url: '/api/habits',
    dataType: 'json',
    type: 'POST',
    data: habitCategory,
    success: function(data) {
      this.setState({data: data}); 
    }.bind(this),
    error: function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this)
  });
},
{% endhighlight %}

On line 11, stick that beautifully wrapped JSON object as the value of the data property in the AJAX POST.

On lines 3-5, pay no attention to the man behind the curtain. There’s logic for other parts of our app. Basically, we have to organise the data for other calls in this component that make a GET request for all the habits (including the new one the user just entered) to render to the page in real time, i.e. without refreshing the page. We take the existing habits in the current state of the data object. Then concatenate the new JSON object to the tail end of it, and set the state to this entire array of objects, that hold all the previous habits plus our new one. 

![Alt text](http://stream1.gifsoup.com/view6/2618300/the-man-behind-the-curtain-o.gif)

All this work to send off mutiple key-value pairs to the database. Now if you'll excuse me, I need a shower after that excruciating workout.

![Alt text](http://memeguy.com/photos/images/mrw-i-look-in-the-mirror-before-a-shower-after-a-workout-48728.gif)
