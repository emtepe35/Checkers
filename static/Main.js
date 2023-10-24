var game = 0;
var net = 0;
var ui = 0;

var countdown_val = 30;
var lose = false;

let timer = 0;
let table_timer = 0;
let time_settimer = 0;
let time_gettimer = 0;
let countdown_timer = 0;
let playerColor = 0;

window.onload = () => {
    game = new Game();
    net = new Net();
    ui = new Ui();
    game.resize(window.innerWidth, window.innerHeight);
}

window.onresize = () => {
    game.resize(window.innerWidth, window.innerHeight);
    ui.center();
}