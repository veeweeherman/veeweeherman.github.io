---
layout: post
title: Understanding MVC Architecture with Ridiculous Analogies
---

One of my instructors informed me I have a _.uniq way of explaining my understanding of JavaScript concepts. So I'm going to start writing about them and hope they're useful to any readers out there.

MVC stands for: Models, Controllers, and Views

I'll explain 2 anaolgies that have helped me better understand the structure of MVC: one silly/general/overarching explanation and the other technical/detail-oriented/not as funny. 

Imagine walking into a room with mutltiple closets. In the closets held different articles of clothing you might be looking for. One closet for shirts. One closet for trousers. One closet for underwear (quite possibly the most important closet). And the only way to know where anything is located is through the receptionist. 

The clothes are the Models.
The receptionist is the Controller .
The clothes you walk out with is the View.

When you walk into the room, you tell the receptionist (Controller) you want green underwear (Model). The receptionist knows exactly which closet to go to for your green underwear. Once you walk out the door wearing that green underwear and people start whistling at your sexiness, that's the View. 

Ok, on to the normal explanation of MVC.

Currently, there's a post with 0 likes. User clicks on the "like" button, which will increment the like-count to 1.

The Controller listens for the click and invokes a function on the data (the Model).

The Model changes the data it's holding, so it's holding info of "like-count goes from 0 to 1". The Model also emits a message to the world that a change has happened. Think of the Model as having a mouth, so it screams "Change! Change!", but it does not scream out "Change from 0 to 1", only that there's been a change.

Here's why. The View listens for the "Change! Change!" announcement in the air and knows it needs to update the DOM (what the User sees). How does it know what to change? The View has data access to the Model it's affiliated with, so with the View's arm, it reaches for the specific data it needs to change the DOM with.

![_config.yml]({{ site.baseurl }}/images/mvcwhite.JPG)

Again, my anaolgies are weird and sort of funny in a cheesy way, but if they help at least MVC-noob out there, then I've done my job :)


![_config.yml]({{ site.baseurl }}/images/successborat.jpg)