---
layout: post
title: Personalize your Favicons
---

If you use Google Chrome to browse your favourite sites, you might notice a teeny tiny pic in the corner of the browser tab. For the longest time, I had no idea what the heck that was. After googling phrases such as “the little icon in browser tab”, I discovered that little 16x16 icon is a favicon.

As I published posts in this blog, I one day noticed the favicon was an icon that I did not choose! The adorable avatar I have for myself in this blog (a 100% likeness of myself by the way, at least the size of my head and ego anyway) is what I wanted for my favicon.

If you also want to personalise your favicon, here’s how.

1. Choose the photo you want as your favicon and use a nifty favicon generator such as [Dan's Tools.](http://www.favicon-generator.org/) 
This website is very simple. Upload a photo you’d like to be made into an icon. Download the file it outputs. Unless you specified favicon only, Dan's Tools actually gives you multiple versions of your icon, in different sizes for different file formats. The file named “favicon.ico” is (obviously) made specifically for the favicon.

2. You'll need this code in your html file:
{% highlight ruby linenos %}
<!DOCTYPE html>
<html>
	<head>
		<title>FAVICOONNNN</title>
		<link rel="icon" type="image/ico" href=" *write the path to where you saved your favicon.ico* ">
	</head>
	<body>
		<h1>FAVICOONNNN, Like ComicCon But Totally Not</h1>
	</body>
</html>
{% endhighlight %}

3 Make it rain: Clear the cache!
![Alt text](https://s-media-cache-ak0.pinimg.com/originals/20/c6/fd/20c6fda81a1a6bb98630987728677326.gif)

If you've done the previous 2 steps, and you're not seeing results clearing the cache history before and after may show the updated favicon. Just trust me. I lost 2 hours of my life not realizing all I had to do was clear the cache to see my mini-me-avatar in the tab of my own blog.




