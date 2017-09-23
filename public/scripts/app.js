/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(data) {
     let doc = (`<article class='tweet-list'>
          <header class="tweet-header">
            <img class="avatar" src="${data.user.avatars.small}">
            <h2 id="tweet-name">${data.user.name}</h2>
            <h6 id="tweet-handle">${data.user.handle}</h6>
          </header>
          <div class="tweet-text">
          <p>${data.content.text}</p>
          </div>
          <footer class="tweet-footer">
            <span class="days-passed">${data.created_at}</span>
            <div class="tweet-actions">
              <img src="/images/flag.png">
              <img src="/images/retweet.png">
              <img src="/images/like.png">
            </div>
          </footer>
        </article>`);
     return doc;

}


// Test / driver code (temporary). Eventually will get this from the server.
var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var $tweet = createTweetElement(tweetData);


// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('.tweet-list').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.