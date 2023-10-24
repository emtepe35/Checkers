class Net {
    constructor() {
        this.playercount = 0;
        countdown_timer = setInterval(this.countdown, 1000);
    }
    fetchApi = function () {
        const data = JSON.stringify({
            name: document.getElementById("nameInput").value,
            action: "add"
        })
        const options = { method: "POST", body: data, headers: { 'Content-Type': 'application/json' } };
        fetch("/add", options) //fetch engine
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    playerColor = data.color;
                    game.setCamera(data.color); //updating camera with game.js
                    ui.welcome(data.color, data.name)
                    document.getElementById("login-div").style.display = "none"; //hidding login panel
                    timer = setInterval(this.wait, 100);
                    table_timer = setInterval(this.getTable, 250);
                    time_gettimer = setInterval(this.getTime, 250);
                    time_settimer = setInterval(this.setTime, 250);
                }
            })
            .catch(error => console.log(error));
    }
    resetApi = function () {
        const data = JSON.stringify({
            action: "reset"
        })
        const options = {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch("/reset", options) //fetch engine
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    clearInterval(timer);
                }
            })
            .catch(error => console.log(error));
    }
    wait = () => {
        const data = JSON.stringify({
            action: "wait"
        })
        const options = {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch("/wait", options) //fetch engine
            .then(response => response.json())
            .then(data => {
                this.playercount = data.count;
                if (this.playercount == 1) {
                    document.getElementById("loadbox").style.display = "block";
                    document.getElementById("loadtext").innerText = "Poczekaj na gracza nr. 2"
                } else {
                    document.getElementById("loadbox").style.display = "none";
                    clearInterval(timer)
                    game.start();
                }
            })
            .catch(error => console.log(error));
    };
    updateTable = (player_tab, new_p, old_p) => {
        const data = JSON.stringify({
            players: player_tab,
            new_p: new_p,
            old_p: old_p,
        })
        const options = {
            method: "POST",
            body: data,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch("/update", options) //fetch engine
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error));
    }
    getTable = () => {
        const data = JSON.stringify({})
        const options = { method: "POST", body: data, headers: { 'Content-Type': 'application/json' } };
        fetch("/getTable", options) //fetch engine
            .then(response => response.json())
            .then(data => {
                if (JSON.stringify(data.tab) != JSON.stringify(pionki)) {
                    game.animByIndex(data.old_p, data.new_p)
                    pionki = data.tab;
                }
            })
            .catch(error => console.log(error));

        this.getData();

    }
    getTime = () => {
        const data = JSON.stringify({})
        const options = { method: "POST", body: data, headers: { 'Content-Type': 'application/json' } };
        fetch("/getTime", options) //fetch engine
            .then(response => response.json())
            .then(data => {
                ui.drawTime(data);
            })
            .catch(error => console.log(error));

    }
    setTime = () => {
        if (document.getElementById("wait-box").style.display != "none") {
            const data = JSON.stringify({
                time: document.getElementById("timertext").innerHTML
            })
            const options = { method: "POST", body: data, headers: { 'Content-Type': 'application/json' } };
            fetch("/setTime", options) //fetch engine
                .then(response => response.json())
                .then(data => { })
                .catch(error => console.log(error));
        }
    }
    getData = () => {
        const data = JSON.stringify({})
        const options = { method: "POST", body: data, headers: { 'Content-Type': 'application/json' } };
        fetch("/getData", options) //fetch engine
            .then(response => response.json())
            .then(data => {
                if (this.playercount == 2) {
                    if (game.getColor() == data) {
                        countdown_val = 30;
                        document.getElementById("wait-box").style.display = "none"
                    } else if (!lose) {
                        document.getElementById("wait-box").style.display = "flex"

                    }
                }
                else {
                    document.getElementById("wait-box").style.display = "none"

                }

            })
            .catch(error => console.log(error));

    }
    countdown = () => {
        if (document.getElementById("wait-box").style.display == "flex") {
            countdown_val--;
            document.getElementById("timertext").innerText = countdown_val;
            if (countdown_val < 1) {
                this.endGame(game.getColor());
                lose = true;
                document.getElementById("wait-box").style.display = "none"
                //YOU LOSE
            }
        } else {
            countdown_val = 30;
            document.getElementById("timertext").innerText = countdown_val;
        }
    }
    endGame = (who) => {
        const data = JSON.stringify({
            who: who,
        })
        const options = { method: "POST", body: data, headers: { 'Content-Type': 'application/json' } };
        fetch("/endGame", options) //fetch engine
            .then(response => response.json())
            .then(data => {
                countdown_val = 30;
                document.getElementById("wait-box").style.display = "none"
                alert("KONIEC GRY!")
            })
            .catch(error => console.log(error));
    }
}



