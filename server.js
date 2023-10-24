var express = require("express")
var app = express()

const PORT = 3000;
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
    console.log("webgl");
})

var players = [];

var tura = 1;

var time = -1;

var table = [

    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
];
var old_p;
var new_p;
var hold;

var path = require("path")
app.use(express.json());
app.use(express.static('static'));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

app.post('/add', function (req, res) {
    console.log(req.body)
    var username = req.body.name;
    if (players.length == 0) {
        players.push({ name: username, color: 1 });
        res.send(JSON.stringify({ name: username, color: 1, success: 1, ready: 0 }))
    } else if (players.length == 1 && players[0].name != username) {
        players.push({ name: username, color: 2 });
        res.send(JSON.stringify({ name: username, color: 2, success: 1, ready: 1 }))
    } else { res.send(JSON.stringify({ name: username, color: 2, success: 0, ready: 0 })) }
    console.log(players)
});

app.post('/reset', function (req, res) {
    console.log(req.body)
    players = []
    table = [
        [0, 2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
    ];
    console.log("reseted")
    res.send(JSON.stringify("reset"))
});

app.post('/wait', function (req, res) {
    res.send(JSON.stringify({ count: players.length }))
});

app.post('/update', function (req, res) {
    table = req.body.players;
    old_p = req.body.old_p;
    new_p = req.body.new_p;
    hold = req.body.hold;
    if (tura == 1) { tura = 2 }
    else { tura = 1 }
    res.send(JSON.stringify("ok"))
});

app.post('/getTable', function (req, res) {
    res.send(JSON.stringify({ tab: table, old_p: old_p, new_p: new_p }))
});

app.post('/getData', function (req, res) {
    if (players.length == 2) {
        res.send(JSON.stringify(tura))
    } else {
        res.send(JSON.stringify(null));
    }

});

app.post('/getTime', function (req, res) {
    res.send(JSON.stringify(time))
});

app.post('/setTime', function (req, res) {
    res.send(JSON.stringify(""))
    time = req.body.time;
});

app.post('/endGame', function (req, res) {
    res.send(JSON.stringify(null));
});