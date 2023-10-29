## Inspiration

When we each asked ChatGPT questions when doing our homework, it occasionally provided different people different responses, as if it was unsure. Yet, ChatGPT always sounds ever so confident in their responses, resulting in confusion.

Thus, we wanted a way to know when ChatGPT is actually confident in the answer provided.

## What it does

A Chrome extension that estimates the consistency of ChatGPT responses by asynchronously aggregating agreement scores between multiple LLM instances of the same query.

## How we built it

The frontend was built in JavaScript and HTML. The backend was in Python and followed the Flask framework, with one exposed API for our frontend to query.

When users enter a question, it is sent to our exposed API, which calculates a confidence score by spinning up multiple instances of ChatGPT and querying them with the same prompt. Afterwards, the responses are compared to check for similarity, and each are assigned a similarity score from 0 to 1 (0 being completely dissimilar and 1 being completely identical). The average of the scores are taken to form the confidence score, which is returned to the frontend to display on the screen below the user's ChatGPT instance's response.

## Challenges we ran into

As none of us were familiar with frontend and had never made a Chrome extension before, we struggled with getting the confidence scores to appear only under each ChatGPT response without any repetitions or infinite loops. We also had a bit of trouble integrating the frontend and backend as CORS errors kept appearing.

Developing scalable asynchrony in the backend was a significant task for us. Some of the biggest issues include getting around the global interpreter lock, setting up and cleaning the jobs properly and even conceptualizing how the data is going to flow across various system components.

We initially went into the direction of using a pre-made solution to handle directed acyclic graph asynchrony using Celery and RabbitMQ, but we eventually decided that it was more interesting to develop our own solution. and easier to deploy.

## Accomplishments that we're proud of

We're proud that we completed a working minimum viable product with a functioning frontend and hosted backend.

## What we learned

We learnt how to make a Chrome extension, and how to use JavaScript to manipulate the DOM :)
We also learnt how to query the ChatGPT API, running asynchronous processes and writing modularized code.

## Acknowledgements

We referenced open-source code from [Raman Hundal's YouTube Bookmarker starter code](https://github.com/raman-at-pieces/youtube-bookmarker-starter-code) as well as [Mustafa's ChatGPT Copy It Chrome extension](https://github.com/muffafa/ChatGPT-CopyIt-Chrome-Extension). However, a majority of our code is still self-written.
