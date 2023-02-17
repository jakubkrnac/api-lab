# API Lab 3

This week's task was to store data on the server, so we would be able to use them even in case of server restart. I have decided to store my data in a JSON file. I have created a simple API to demonstrate this.

> **Note**
> node.js is required to run the server

## How to use

Server has only one endpoint and that is `https://localhost:2222/`. In order to retrieve data from the server a key needs to provided (`12345678`). Without this, the API return error `401 Unauthorized`. Considering that the key is provided, there are multiple query combinations that can be used.

### Getting entries

When a query `http://localhost:2222/?key=12345678` is submitted, the API returns the contents of the [logs.json](logs.json) file. In the beginning the output should be:

```JSON
{
  "logs": []
}
```

### Adding a new entry

When a query `http://localhost:2222/?key=12345678&content=whatever` is submitted, the API updates the [logs.json](logs.json) and returns its newest content. Example output:
```JSON
{
  "logs": [
    {
      "timestamp": 1676630712246,
      "content": "whatever"
    }
  ]
}
```
After a query is written, query is changed to only containing `key`, thus preventing user from adding another entry each time a page is refreshed.

### Deleting all entries

When a query `http://localhost:2222/?key=12345678&clear=true` is submitted, the API deletes all entries returns the content of [logs.json](logs.json) which looks same as in the beginning.

```JSON
{
  "logs": []
}
```

## Final thoughts

It was to create an API from scratch, I think I got a better perspective on how complex the task of creating and API is. Furthermore, the API could be enriched with more features and could be hosted on a public server running node.js

&nbsp;

jakubkrnac