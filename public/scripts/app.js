
// var data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "<script>alert('uh oh!');</script>",//"Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));

  return div.innerHTML;
}

function renderTweets(tweets) {
  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    var $tweetContainer = $('section.tweets-box');
        $tweetContainer.empty();
    for (let i = tweets.length-1; i >= 0; i--) {
      let $tweet = createTweetElement(tweets[i]);
      $tweetContainer.append($tweet);
    }
}

function createTweetElement(tweet) {
     let doc = `<article class='tweet-list'>
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
        </article>`;
      var safeHtml = `${escape(doc)}`;



      safeHtml = safeHtml.replace(/&lt;/g,'<').replace(/&gt;/g,'>');
      // console.log("replace ",safeHtml);
      return safeHtml;
     // console.log(doc);
     // return doc;
}

function loadTweets() {
  let $list = $('.tweet-list');
  $(function() {
    console.log('Performing ajax call...');
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweets) {
        console.log('Success')
        renderTweets(tweets);
      }
    });
  });
}



$(document).ready(function() {
  loadTweets();

  $(".post-button").on('click', function(event) {
    $(".new-tweet").slideToggle();
    $("#tweet-form").focus();
  });

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
    $("textarea").val('');
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetText,
      success: function (tweets) {
        console.log("Success");
        loadTweets();
      }
    });


    // $('#tweet-form'
    //console.log( $( this ).serialize() );
    // function showValues() {
    //   var str = $( "form" ).serialize();
    //   $( "#results" ).text( str );
    // }
    // $( "input[type='checkbox'], input[type='radio']" ).on( "click", showValues );
    // $( "select" ).on( "change", showValues );
    // showValues();
  });
});
