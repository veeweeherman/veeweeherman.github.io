---
layout: post
title: Ever dream of API requests?
---


"Once I was afraid (of API requests), I was petrified, Kept thinkin’ I could never GET-request with Angular by my side"

(Request heard: I’ll stop butchering that lovely 70s classic)

At Telegraph Academy, where I am currently learning the skills to be a Software Engineer, my classmates and I were assigned our first solo project. The “MVP”, minimal viable product. We had 36 hours to create an app completely from scratch. We could choose what ever we wanted to make with which ever framework(s) we desired. 

I decided to make an app where votes (or “likes” to younger generations) can be calculated. My app needed things to vote on so I picked what most people in the world waste countless hours on: cute cats. I was nervous to use a third party’s API to request cat photos because it sounded painfully difficult and time-consuming. But as usual, I just needed to face the facts and get my hands dirty. I found out it wasn’t very difficult at all. 

Here’s how I did it. 

First let’s define a few words. An endpoint is the point of connection from your code and the API service you are requesting from. A query will mostly be inside that endpoint script. The query will specify what to search for in this API request. 

![_config.yml]({{ site.baseurl }}/images/yahoo_endpoint_query.png)
![_config.yml]({{ site.baseurl }}/images/yahoo_data_object_keyval.png)

Then have a look at the data object that the request will give you. In Javascript, everything is an object, including the data you will get in return from this API request. Find what you’ll need in this data object and put it together.

For example, in my MVP project, I wanted photos, specifically the URLs to the photos. In the response data I was receiving form Flickr, I wasn’t given the url links. But:

![_config.yml]({{ site.baseurl }}/images/yahoo_photo_url.png)

what I was given were all the key-value pairs on how to make the URL link as a string.

It took a bit of grunt work (haha, get it?) to piece all the info I needed just for 10 cat pics, but in the end it works. MVP right? 

In my .controller, I had to do a bit of work to concatenate all the key-values in order to generate the image URLs. Each of these values is nested somewhere in the data object. Then using AngularJS’ ng-repeat, I iterated the array of URL strings to access the images. It took a bit of extra work to make it display the photos randomly. 

![_config.yml]({{ site.baseurl }}/images/yahoo_forloop.png)

In short, it was annoying, scary, and hard. But I survived.

![_config.yml]({{ site.baseurl }}/images/iwillsurvive.gif)
