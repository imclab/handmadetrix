var SERVER_PORT = '22727' 

var express = require('express'),
    qs = require('querystring'),
    xml = require('xml2js'),
    terminal = require('node-terminal'),
    window = 36,
    width = 100;

var parser = new xml.Parser();
var app = express.createServer(express.logger());
var port = SERVER_PORT || 5000;

app.listen(port, function() {
    console.log("           _   _    _    _   _ ____  __  __    _    ____  _____ _____ ____  _____  __")
    console.log("          | | | |  / \\  | \\ | |  _ \\|  \\/  |  / \\  |  _ \\| ____|_   _|  _ \\|_ _\\ \\/ /")
    console.log("          | |_| | / _ \\ |  \\| | | | | |\\/| | / _ \\ | | | |  _|   | | | |_) || | \\  / ")
    console.log("          |  _  |/ ___ \\| |\\  | |_| | |  | |/ ___ \\| |_| | |___  | | |  _ < | | /  \\ ")
    console.log("          |_| |_/_/   \\_\\_| \\_|____/|_|  |_/_/   \\_\\____/|_____| |_| |_| \\_\\___/_/\\_\\")
    console.log("                      _   _    _    _   _ ____  __  __    _    ____  _____ _____ ____  _____  __")
    console.log("                     | | | |  / \\  | \\ | |  _ \\|  \\/  |  / \\  |  _ \\| ____|_   _|  _ \\|_ _\\ \\/ /")
    console.log("                     | |_| | / _ \\ |  \\| | | | | |\\/| | / _ \\ | | | |  _|   | | | |_) || | \\  / ")
    console.log("                     |  _  |/ ___ \\| |\\  | |_| | |  | |/ ___ \\| |_| | |___  | | |  _ < | | /  \\ ")
    console.log("                     |_| |_/_/   \\_\\_| \\_|____/|_|  |_/_/   \\_\\____/|_____| |_| |_| \\_\\___/_/\\_\\")
    console.log("                                 _   _    _    _   _ ____  __  __    _    ____  _____ _____ ____  _____  __")
    console.log("                                | | | |  / \\  | \\ | |  _ \\|  \\/  |  / \\  |  _ \\| ____|_   _|  _ \\|_ _\\ \\/ /")
    console.log("                                | |_| | / _ \\ |  \\| | | | | |\\/| | / _ \\ | | | |  _|   | | | |_) || | \\  / ")
    console.log("                                |  _  |/ ___ \\| |\\  | |_| | |  | |/ ___ \\| |_| | |___  | | |  _ < | | /  \\ ")
    console.log("                                |_| |_/_/   \\_\\_| \\_|____/|_|  |_/_/   \\_\\____/|_____| |_| |_| \\_\\___/_/\\_\\")
});


var getRandomPosition = function (num) {
    return Math.floor((Math.random() * (num + 1)));
}

var getColor = function() {
   var colors = [
    'black'
    ,'red'      
    ,'green'
    ,'yellow'
    ,'blue'     
    ,'magenta'
    ,'purple'    
    ,'cyan'     
    ,'white'
  ] 
    return colors[Math.floor(Math.random() * colors.length)];
}

var matrix = function (string) {
    var current = getRandomPosition(width);
    var position = getRandomPosition(window);
    terminal.move(position, current);
    var string = string.split("").reverse();
    var color = getColor();

    setInterval(function() {
        if (string.length > 1) {
            terminal.move(position, current)
            terminal.color(color).write(string.pop());
            ++current;
        }
    }, 40);
}

app.post('/callback', function(request, res) {
    var body = '';
    request.on('data', function (data) {
        body += data;
    });
    request.on('end', function () {
        var post = parser.parseString(body, function (err, result) {
            //console.log(JSON.stringify(result, null, 2)); <-- if you wanna play with this, here's where the data's at. Modify at will.
            if (result['feed']['entry'][0]['title'][0].length > 1) {
                var item = result['feed']['entry'][0]['title'][0];
                matrix(item);
            }
        })
    });
});

app.get('/callback', function(req, res) {
	console.log(req);
    if (req.query['hub.challenge']) {
    	var hub_challenge = req.query['hub.challenge'];
        res.send(hub_challenge);
    }
    req.on('data', function (data) {
	console.log(data);
    });
});
