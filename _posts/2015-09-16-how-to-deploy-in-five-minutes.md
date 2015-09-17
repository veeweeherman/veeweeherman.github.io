---
layout: post
title: How to Deploy an App in 5 mintutes
---

Or… at least a few minutes.

I’ve deployed a number of Node/Express apps on Heroku and I wouldn’t say I’m a “deployment master”… okay, sarcasm and oversized ego aside, here’s the way I deploy my apps on Heroku.

![Alt text](http://4.bp.blogspot.com/-jvcXGFDkMKw/U9thoH8I-wI/AAAAAAAADeU/iadUMCAHedQ/s1600/2b59a8ba44be0879ae832b60fe9284d0fa.png)

Before we get started, make sure you have a Heroku account and have installed the [Heroku Toolbelt](https://toolbelt.Heroku.com/) and follow the directions loggin in etc.

Go to your GitHub account and create a new repo

Clone this repo to your local machine and then cd into it

Then initialize the package.json file:
```
npm init
```

Fill in the blanks accordingly, but when filling out what the "entry point" will be. The default express will give you is index.js. Enter what you'd like for the js file that will hold the server. Not surpisingly, I name mine "server.js"
```
entry point: (index.js) server.js
```

Install Express with the following command: 
```
npm install —save express
```
When all that setup is done, create a server.js file (or what ever you named your server file), and paste in the boilerplate code I have provided below:
{% highlight ruby linenos %}
// server.js
"use strict";

var express = require('express');

var app = express();
var path = require('path');


var port = process.env.PORT || '3000';

//========================================================//
//   connecting the client and server                     //
//   allows for CORS (cross origin resource sharing)      //
//========================================================//
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.normalize(__dirname + '/')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//========================================================//
//   Calling the server                                   //
//========================================================//
var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('MyDeploymentApp is listening at http://%s:%s -- %s', host, port);
});
{% endhighlight %}
Notice that this server.js snippet by default will send an index.html file that is located in the root directory. Feel free to change this to what ever files on what ever path you'd liek to serve up.

(Optional) If you'd like to create your own index.html to go along with this tutorial, here is some more boiler plate:
{% highlight ruby linenos %}
<!DOCTYPE html >
<html>
  <head>
    <title>My Deployed App</title>
  </head>
  <body>
    <h1>DEPLOYED PAGE</h1>
      <p>G'day, mate. I'm deployed!</p>
  </body>
{% endhighlight %}

Create a new file and save it as "Procfile". This is monumentally important. It tells Heroku what server you've got and how to start it. Paste this into it:
{% highlight ruby linenos %}
web: node server.js
{% endhighlight %}
(If you didn't name your server file "server.js", write what ever name you gave it)

Add a .gitignore file to avoid hell. Stick the path to your node_modules inside: (for me, it's on the root level)
{% highlight ruby linenos %}
node_modules
{% endhighlight %}

Git add, commit, and push to your origin master as you normally would.

While still in this directory, in the terminal have keroku create your app with the name you give it:
{% highlight ruby linenos %}
heroku create app_name
{% endhighlight %}
As long as the name isn't already taken on Heroku, you shouldn't have any problems.

Now for the magic... deploy!
{% highlight ruby linenos %}
git push heroku master
{% endhighlight %}

If the moon is in line with Jupiter and Mars and perpendicular to Saturn, this should work and you'll have a deployed app on Heroku!

![Alt text](http://www.gifmambo.com/media/22589_explosion-cat-amazing-omg-reactions.gif)

I compiled this info from hours of head-banging-against-the-wall time and from reading the docs from several sources. But here are the ones that are most helpful.
[Express Install](http://expressjs.com/starter/installing.html)
[Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)


 