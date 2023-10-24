class Ui {
    constructor() {
        this.genLoginBox();
        this.genInfoBar();
        this.genLoader();
        this.genWaitBox();
    }
    genLoginBox = function () {
        //creating the login box
        let box = document.createElement("div"); //container
        box.id = "login-div";
        this.center()

        //input
        let nameInput = document.createElement("input");
        nameInput.id = "nameInput";
        nameInput.name = "name";
        nameInput.type = "text";

        //label
        let LabelForName = document.createElement("label");
        LabelForName.for = "name";
        LabelForName.id = "name-label";
        LabelForName.innerText = "Login:"

        //submit
        let button = document.createElement("button");
        button.id = "log-btn";
        button.style.height = "30px"
        button.style.width = "90px"
        button.innerText = "Zaloguj!"
        button.onclick = function () {
            net.fetchApi(); //fetch api in Net.js file
        }

        //submit
        let reset = document.createElement("button");
        reset.id = "res-btn";
        reset.style.height = "30px"
        reset.style.width = "90px"
        reset.innerHTML = "Resetuj <br>"
        reset.onclick = function () {
            net.resetApi(); //fetch api in Net.js file
        }

        //displaying
        box.appendChild(LabelForName);
        box.innerHTML += "<br>"
        box.appendChild(nameInput);
        box.innerHTML += "<br>"
        box.appendChild(button);
        box.appendChild(reset);
        let gra = document.getElementById("body");
        gra.appendChild(box);
    }
    genLoader = function () {
        let loaderBox = document.createElement("div");
        loaderBox.id = "loadbox";
        loaderBox.style.display = "none";

        let loaderText = document.createElement("div");
        loaderText.id = "loadtext";

        let loader = document.createElement("div");
        loader.className = "loader";
        loader.id = "loaderbox";


        loaderBox.appendChild(loader)
        loaderBox.appendChild(loaderText)

        let gra = document.getElementById("body");
        gra.appendChild(loaderBox);

        this.center()
    }
    center = function () {
        try {
            let loaderBox = document.getElementById("loadbox");
            loaderBox.style.left = String(window.innerWidth / 2 - 258) + "px"
            loaderBox.style.top = String(window.innerHeight / 2 - 72) + "px"
        } catch (error) {
            //
        }
        try {
            let box = document.getElementById("login-div");
            box.style.left = String(window.innerWidth / 2 - 158) + "px"
            box.style.top = String(window.innerHeight / 2 - 82) + "px"
        } catch (error) {
            //
        }
    }
    genInfoBar = function () {
        let bar = document.createElement("div");
        bar.id = "bar"

        let counter = document.createElement("div");
        counter.id = "counter"
        counter.innerText = "Twój czas: "
        let span = document.createElement("span")
        span.id = "enemy_time";
        span.innerText = "-1";
        counter.appendChild(span);


        let gra = document.getElementById("body");
        gra.appendChild(counter);
        gra.appendChild(bar);
    }
    welcome = function (color, name) {
        let infobar = document.getElementById("bar")
        infobar.innerHTML = `Witaj! <span style="color: red">${name}</span>, grasz `
        if (color == 1) {
            infobar.innerHTML += `białymi`;
        } else if (color == 2) {
            infobar.innerHTML += `czerwonymi`;
        }
    }
    genWaitBox = () => {
        let div = document.createElement("div");
        div.id = "wait-box";
        let p = document.createElement("p")
        p.innerText = "Zaczekaj na ruch drugiego gracza, po uplywie czasu automatycznie wygrasz:"
        let p2 = document.createElement("p");
        p2.id = "timertext"
        p2.innerText = "30"
        div.appendChild(p); div.appendChild(p2)
        document.getElementById("body").appendChild(div);
    }
    drawTime = (data) => {
        if (data == -1) { document.getElementById("counter").style.display = "none" }
        else { document.getElementById("counter").style.display = "block" }

        if (document.getElementById("wait-box").style.display == "none") {
            document.getElementById("counter").style.display = "block"
            document.getElementById("enemy_time").innerText = data;
        } else {
            document.getElementById("counter").style.display = "none"
        }
    }
}