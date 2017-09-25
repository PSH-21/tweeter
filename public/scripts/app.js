
// works in combination with escape function to escape inserted variables
function safeString(strings, ...replacements) {
  const ret = strings.map((string, i) => {
    return string + escape(replacements[i] || "");
  }).join('');
  return ret;
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function renderTweets(tweets) {
  var $tweetContainer = $('section.tweets-box');
  $tweetContainer.empty();
  for (let i = tweets.length-1; i >= 0; i--) {
    let $tweet = createTweetElement(tweets[i]);
    $tweetContainer.append($tweet);
  }
}

function createTweetElement(tweet) {
  return $(safeString`<article class='tweet-list'>
          <header class="tweet-header">
            <img class="avatar" src="${tweet.user.avatars.small}">
            <h2 id="tweet-name">${tweet.user.name}</h2>
            <h6 id="tweet-handle">${tweet.user.handle}</h6>
          </header>
          <div class="tweet-text">
          <p>${tweet.content.text}</p>
          </div>
          <footer class="tweet-footer">
            <span class="days-passed">${tweet.created_at}</span>
            <div class="tweet-actions">
              <img src="/images/flag.png">
              <img src="/images/retweet.png">
              <img src="/images/like.png">
            </div>
          </footer>
        </article>`);
}

function loadTweets() {
  let $list = $('.tweet-list');
  $(function() {
    console.log('Performing ajax call...');
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweets) {
        console.log('Success');
        renderTweets(tweets);
      }
    });
  });
}



$(document).ready(function() {
  loadTweets();

  // toggle compose button
  $(".post-button").on('click', function(event) {
    $(".new-tweet").slideToggle();
    $("#tweet-form").focus();
  });

  // compose and post tweet
  $("#tweet-button").on('click', function(event) {
    event.preventDefault();
    let $tweetLength = $('#tweet-form').val().length;
    if ($tweetLength > 140) {
      alert('Tweet must be no more than 140 characters');
      return;
    } else if ($tweetLength === 0) {
      alert('Tweet cannot be blank');
      return;
    } else
    var tweetText = $("form").serialize();
    $('textarea').val('').focus();
    $('.counter').text(140);
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetText,
      success: function (tweets) {
        console.log("Success");
        loadTweets();
      }
    });
  });
});
