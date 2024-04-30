tweets = document.querySelectorAll('[data-testid="tweet"]');

// performing sentiment analysis

function analysisSentiment(text) {
    const sentiments = [1, -1, 0]
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]

    tweetSentiment[text] = sentiment;

    chrome.runtime.sendMessage({
        type: "sentiment",
        data: tweetSentiment
    });

    return sentiment;
}

function categorizeTweet(tweet) {
    if (tweet.hasAttribute("sentiment")) return;
    const spans = tweet.querySelectorAll("span");
    const spanTexts = [];
    spans.forEach((span) => {
        spanTexts.push(span.innerText);
    });

    const text = spanTexts.join(" ")

    if (text in tweetSentiment) {
        const sentiment = tweetSentiment[text];
        tweet.setAttribute("sentiment", sentiment);
        return;
    }
    const sentiment = analysisSentiment(text);
    tweet.setAttribute("sentiment", sentiment);
}

function categorizeAllTweets(tweets) {

    tweets.forEach((tweet) => {
        categorizeTweet(tweet);
    });
}

function doSentimentAnalysis() {
    tweets = document.querySelectorAll('[data-testid="tweet"]');
    categorizeAllTweets(tweets);
}

tweetSentiment = {};

document.addEventListener("scroll", function () {
    doSentimentAnalysis();
});

chrome.runtime.onMessage.addListener(function (message){
    if (message.type === "sentiment") {
        tweetSentiment = {};
    }
});