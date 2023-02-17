# API Lab 1

This week of API Lab we were asked to use external API service and present the retrieved data on our website, preferably using some third party library.

My first idea was to make use of some kind of image recognizing API which would be able to identify what's on the submitted picture. However I was not able to find any suitable service to do this. Therefore I have decided to use somewhat simpler API and play around with the presentation of the data.

I chose an API called Fixer. I have found multiple services when looking for suitable one, most of them paid or very limited in free version.
This gives it's users 100 free requests per month which isn't the best but it's satisfactory for this project. The API provides newest exchange rates for multiple currencies, I was particulary interested in exchange rate of Swedish Krona to Euro. The API provides a history of these exchanges so I decided to make use of that. My idea was to create a chart that would display the price fluctuation of Swedish Krona in the past days.

## Testing the API

First and foremost I wanted to see wheter the API works. I have used function `fetch()` to send a request to their server. In order to get actual data I had to use proper request query. In case of not providing all required parameters, the request will most probably fail. In order to get the price of a certain currencies during past days four paramaters must be submitted in the query, `startDate`, `stopDate`, `base` and `symbols`. I did assemle the query url using javascripts string interpolation:
```
const url = `${endPoint}?start_date=${startDate}&end_date=${endDate}&base=SEK&symbols=EUR`;
```

Another thing to keep in mind is the use of API key, without this it would not be possible to retrieve anything from the API. I had included this in the request header.
```
let response = await fetch(url, {
    method: 'GET',
    headers: {
        'apikey': apiKey
    }
});
```
Using this, I was able to receive data from the API.
