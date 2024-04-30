
//1. Storing the calculated sentiments for the seen tweets
let tweetSentiment = {};

chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === "sentimentValues") tweetSentiment = message.data;
    else if (message.type === "reset") tweetSentiment = {};

    sentimentValues = countSentiments(tweetSentiment);
    
    chrome.runtime.sendMessage({
        type: "sentimentValues",
        data: sentimentValues,
    });
});


//2. Calculating the different stored sentiments
let sentimentValues = [];

function countSentiments(obj) {
    let values = Object.values(obj);

    let counts = values.reduce((
        acc, val) => {
        acc[val == -1 ? String(val) : val]++;
        return acc;
    },
        { "-1": 0, 0: 0, 1: 0 }
    );
    return Object.values(counts);
}

