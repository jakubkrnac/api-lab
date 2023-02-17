# API Lab 2

For the second week we were was supposedto creaste a multi device application. I decided to create a shared cursor application. In order to achieve this I have made 3 programs. One acting as a server and keeping track where the cursor currenly is and two client programs, one for setting the position of the curson and second one to display the cursor.
> **Note**
> node.js is required to run the server

## Server
The server program was made using node.js, and it is quite simple in its essence. There are only two thing that it does, listen to `GET` and `POST` requests.

```javascript
app.post('/', function(request, response){
    x = request.body.x;
    y = request.body.y;

    response.send('');
});
```

`POST` request is used to update the current cursor position while `GET` is used to get it.

```javascript
app.get('/', function(request, response){
    response.send({x: x, y: y});
});
```

There are two local variables (`x` and `y`) that store the actual position while the server is running.

## Client set

This page is used to update the position of the cursor. The script listens to a pointer event and sends the current position to the server in form of a JSON. I have also implemented an "event skipper" to skip event so the requests would not be sent too often.

```javascript
document.addEventListener('pointermove', function (event) {
    if (counter <= 10) {
        counter++;
    } else {
        updateCoordinates(event.x, event.y)
        counter = 0;
    }
});
```

```javascript
function updateCoordinates(x, y) {
    fetch('http://localhost:1111', {
        method: "POST",
        body: JSON.stringify({
            x: x,
            y: y
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
}
```

## Client get

This page is used to display the cursor movement. I have used `setInterval()` function with a 100 milliseconds interval to send `GET` request to the server. I have experimented with a shorter intervals, but then the server just became unresponsive.

```javascript
function updateView() {
    console.log('update');

    fetch('http://localhost:1111').then((response) => {
        response.json().then(json => {
            document.getElementById('cursor').style.left = json.x + 'px';
            document.getElementById('cursor').style.top = json.y + 'px';
        });
    });
}
```

## Final thoughts

I really enjoyed working on this assignment, it was fairly simple but still quite complex since I had to make two client and one server programs.

&nbsp;

jakubkrnac