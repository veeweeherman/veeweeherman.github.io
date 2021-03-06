---
layout: post
title: How to Deploy an App in 5 minutes
---

Or… at least a few minutes.

I’ve deployed a number of Node/Express apps on Heroku and I wouldn’t say I’m a “deployment master”… okay, sarcasm and oversized ego aside, here’s the way I deploy my apps on Heroku.

![Alt text](http://4.bp.blogspot.com/-jvcXGFDkMKw/U9thoH8I-wI/AAAAAAAADeU/iadUMCAHedQ/s1600/2b59a8ba44be0879ae832b60fe9284d0fa.png)

By the way, I have a [repo on GitHub](https://github.com/veeweeherman/testdeploy) with the same directions in the README file if forking the repo is easier for you :)

Before we get started, make sure you have a Heroku account and have installed the [Heroku Toolbelt](https://toolbelt.Heroku.com/) and follow the directions, login etc.

1.) Go to your GitHub account and create a new repo

2.) Clone this repo to your local machine and then cd into it

3.) Then initialize the package.json file:

```
npm init
```

4.) It'll ask you a series of questions. Fill in the blanks accordingly. Don't worry you can go into the package.json file later to edit anything. When the prompt asks for what the "entry point" will be, Express defaults to index.js. Enter what you'd like for the js file that will hold the server. Not surprisingly, I name mine "server.js"

```
entry point: (index.js) server.js
```

5.) Install Express with the following command:

```
npm install --save express
```

6.) When all that setup is done, create a server.js file (or what ever you named your server file), and paste in the boilerplate code I have provided below:
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
Notice that this server.js snippet by default will send an index.html file that is located in the root directory. Feel free to change this to what ever files on what ever path you'd like to serve up.

7.) (Optional) If you'd like to create your own index.html to go along with this tutorial, here is some more boiler plate:
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
</html>
{% endhighlight %}

8.) Now would be a good time to check your app is able to run on the localhost:

```
node server.js
```



9.) Create a new file and save it as "Procfile". This is monumentally important. It tells Heroku what server you've got and how to start it. Paste this into it:
{% highlight ruby linenos %}
web: node server.js
{% endhighlight %}
(If you didn't name your server file "server.js", write what ever name you gave it)

10.) Add a .gitignore file to avoid hell. Stick the path to your node_modules inside: (for me, it's on the root level)
{% highlight ruby linenos %}
node_modules
{% endhighlight %}

11.) Git add, commit, and push to your origin master as you normally would.

12.) While still in this directory, in the terminal have Heroku create your app with the name you give it:

```
heroku create app_name
```
As long as the name isn't already taken on Heroku, you shouldn't have any problems.

13.) Now for the magic... deploy!

```
git push heroku master
```

If the moon is in line with Jupiter and Mars and perpendicular to Saturn, this should work and you'll have a deployed app on Heroku!

![Alt text](http://www.gifmambo.com/media/22589_explosion-cat-amazing-omg-reactions.gif)

As long as you're getting success messages from Heroku and there weren't problems on the localhost, things should be A-OK. In the terminal type:

```
heroku open
```
This should open up your app in the browser at app_name.herokuapp.com

I compiled this info from hours of head-banging-against-the-wall time and from reading the docs from several sources. But here are the ones that are most helpful.

[Express Install](http://expressjs.com/starter/installing.html)

[Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app)

Again, if you want to fork my [repo on GitHub](https://github.com/veeweeherman/testdeploy)  feel free :)
