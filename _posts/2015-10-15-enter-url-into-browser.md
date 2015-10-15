---
layout: post
title: What happens when I type somewebsite.com into the URL bar and press enter?
---

This seems to be every interviewer's favorite question to ask. So I wanted to provide at least 2 blog posts to answer this question. This one (the first) will answer it with a high-level overview. I'll follow up with another post that goes more into detail.

Type-type-type-enter-ping!

![Tom Hanks](http://www.reactiongifs.com/r/tmhnks.gif)

1) First the browser will check the IP address of the domain name that was just entered

  - This process searches *DNS* (Domain Name Servers). It's a process that looks up the IP address of the entered domain name. First it will check the cache (browser memory) and if it's not found in the browser cache, it will check the Operating System cache (and a bunch of others, but this post is supposed to be high level overview)

  - Generally, when two entities are connected and attempting an exchange of data, there is a *TCP* connection (Transmission Control Protocol). There are multiple TCP connections opening and closing throughout every exchange in this entire request process. Just a heads up.

2) When the IP address is eventually found, it will be sent back to the browser. The browser then sends the HTTP GET request. This process, may have to travel through multiple servers to get to the one that holds the data needed

  - This GET request holds a few important pieces of information in the headers. These headers can include cookies, Accept or Accept-Encoding, the list goes on

  - <strong>cookies</strong> are stored on the client and contain pertinent information about the user that will determine what kinds of data can be retrieved in this request

  - <strong>Accept</strong> states which types of files the response will accept

  - <strong>Accept-Encoding</strong> for the file that it accepts, how to process/open/render it

3) An interesting thing that can (most likely) will happen here is that the server can respond with a permanent redirect. Caching the info for https://www.somewebsite.com and https://somewebsite.com uses more memory because they're cached as separate entities. So the server will send a "Moved Permanently" 301 response so the browser knows which to go to

4) So the browser will follow this redirect, and another GET request is sent. Eventually, the correct server will have the info needed, and the server will process the request and send a response.

  - Ok that sounds simple enough, but of course it's not. When I say the server will process the request, it'll read the headers and make a response in accordance to the constraints of the headers. For example, if the Content-Type is "text/html" it knows the response to send back to the client will be an html file. Based on the limitations of your access token, maybe your session will expire in x-seconds. Or in the case of trying to log on to a social media site where you have "friends" or "followers", based on your userid it knows who are your friends/followers and it knows to send info on those particular friends in the response as well

  - All of this is handled by a number of request handlers. Specific request handlers handle specific requests. For example with an app like Facebook, one req handler to get your profile picture. One for your friends' status updates for your NewsFeed. One for your timeline posts. You get the idea.

5) The browser receives the response and renders the response as it comes in, not after the response has completed its arrival

  - Think of it like a factory assembly line. Worker receives package of widget. Opens package. Decides how to assemble widget (With glue? With nails? By hand?). Assembles Widget how ever they're supposed to. Sends it down the line.

6) After the initial response is processed and starts rendering to the client, most likely, it requires more embedded objects in the initial HTML response. More GET requests are sent out for objects like images, CSS files, or JS files. These GET requests go through a similar process as above.

  - Static files are cached into the browser, so in this retrieval process some items can be retrieved from the cache. Depending expiration constraints in the headers.

7) Lastly, ever notice your browser in your Activity Monitor is always running and doing something even when you're not? It's because most sites, like Facebook, are always sending Asynchronous AJAX requests for more information. If you're on your NewsFeed page on Facebook, it automatically updates with new posts from your friends and organizations from around the globe every x-seconds. It's because when logged into your account, the browser will send for requests to always GET new data to keep you up to date.



So there's my quick and high level overview of what happens when a user enters a URL into the browser. I somehow organized it into 7 steps but obviously it's more like 450,000 steps. But hopefully the person asking you this is going to ask you other interesting questions that better evaluate your candidacy. I think a question like this is important, but I also believe knowing other information can just as easily prove you're a capable programmer. But this is a classic.

<strong>Resources:</strong>


- [http://stackoverflow.com/questions/2092527/what-happens-when-you-type-in-a-url-in-browser
](http://stackoverflow.com/questions/2092527/what-happens-when-you-type-in-a-url-in-browser
)
- [https://www.quora.com/What-are-the-series-of-steps-that-happen-when-an-URL-is-requested-from-the-address-field-of-a-browser](https://www.quora.com/What-are-the-series-of-steps-that-happen-when-an-URL-is-requested-from-the-address-field-of-a-browser)
- [http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/](http://igoro.com/archive/what-really-happens-when-you-navigate-to-a-url/)



![](http://i1.kym-cdn.com/photos/images/original/000/502/491/990.jpg)
