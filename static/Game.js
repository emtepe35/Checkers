this.szachownica = [

    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1]
];

this.pionki = [

    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
];

class Game {

    constructor() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, 4 / 3, 1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x222222);
        this.renderer.setSize(1200, 800);

        this.hold = 0; //chwilowo przechowywany zaznaczony pionek

        this.cubes = new Cubes; //container for cubes
        this.players = new Players; //container for players


        document.getElementById("root").append(this.renderer.domElement);

        this.camera.position.set(100, 80, 0)
        this.camera.lookAt(this.scene.position);

        this.player_color;

        this.highlighted = [];

        this.genCrossboard();
        this.genPlayers();

        this.render()
        this.scene.add(this.camera)
    }
    resize = function (Width, Height) {
        this.camera.aspect = Width / Height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(Width, Height);
    }

    genCrossboard = function () {
        this.cubes.genCrossboard(szachownica);
        this.scene.add(this.cubes);
    }
    genPlayers = () => {
        this.players.deleteAll(); //clear the board
        this.players.genPlayers(pionki)
        this.scene.add(this.players)
    }
    setCamera = (color) => {
        this.player_color = color;
        if (color == 1) {
            this.camera.position.set(100, 80, 0)
            this.camera.lookAt(this.scene.position);
        } else if (color == 2) {
            this.camera.position.set(-100, 80, 0)
            this.camera.lookAt(this.scene.position);
        }
    }
    start = () => {
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2();
        let scene = this.scene
        let camera = this.camera
        window.onmousedown = (event) => {

            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, camera);

            let intersects = []
            if (document.getElementById("wait-box").style.display == "none") {
                intersects = raycaster.intersectObjects(scene.children);
            } else {
                intersects = [];
            }

            let player_intersects = raycaster.intersectObjects(this.players.children);
            let cube_intersects = raycaster.intersectObjects(this.cubes.children);

            if (intersects.length > 0) {
                if (player_intersects.length > 0 && player_intersects[0].object.name == "player") { //kliknął na piona
                    if (player_intersects[0].object.color == 14606046 && this.player_color == 1
                        ||
                        player_intersects[0].object.color == 9064014 && this.player_color == 2) {
                        this.hideHighlight();
                        this.savePion(player_intersects);
                        this.highlightPossible(player_intersects);
                    }

                } else if (cube_intersects.length > 0) {
                    this.hideHighlight()
                    if (this.hold != 0) {
                        let newPosition = this.posToIndex(cube_intersects[0].object);
                        let oldPosition = this.posToIndex(this.hold);

                        if (this.checkApproximity(this.player_color, newPosition, oldPosition)) {
                            if (this.checkBoard(newPosition) || this.checkHighlight(newPosition)) {
                                if (this.zbity(newPosition, oldPosition)) {
                                    pionki[oldPosition[0]][oldPosition[1]] = 0;
                                    pionki[newPosition[0]][newPosition[1]] = this.player_color;
                                    let zbijany = this.getZbijany(newPosition, oldPosition)
                                    pionki[zbijany[0]][zbijany[1]] = 0;
                                    net.updateTable(pionki, newPosition, oldPosition);
                                } else {
                                    pionki[oldPosition[0]][oldPosition[1]] = 0;
                                    pionki[newPosition[0]][newPosition[1]] = this.player_color;
                                    net.updateTable(pionki, newPosition, oldPosition);
                                }
                                let target_pos = { x: cube_intersects[0].object.position.x, z: cube_intersects[0].object.position.z }
                                this.anim(this.hold, target_pos)
                            }
                        }



                    }
                }
            }
        }

    }
    anim = (cube, target) => {
        new TWEEN.Tween(cube.position) // co
            .to({ x: target.x, z: target.z }, 250) // do jakiej pozycji, w jakim czasie
            .repeat(0) // liczba powtórzeń
            .easing(TWEEN.Easing.Linear.None) // typ easingu (zmiana w czasie)
            .onUpdate(() => { })
            .onComplete(() => {

                this.hideHighlight();
                this.hold = 0;
                this.genPlayers();
            }) // funkcja po zakończeniu animacji
            .start()
    }
    savePion = (inters) => {
        if (inters[0].object.color == 14606046 && this.player_color == 1
            ||
            inters[0].object.color == 9064014 && this.player_color == 2) {
            if (!(this.hold.color == inters[0].object.color)) {
                this.hold = inters[0].object;
                inters[0].object.position.y = 4;
            }
            else {
                try {
                    this.hold.position.y = 5;
                    inters[0].object.position.y = 4;
                    this.hold = inters[0].object;
                } catch (error) {

                }
            }
        }
    }
    highlightPossible = (inters) => {
        let pos = this.posToIndex(inters[0].object);
        this.highlighted = []

        try {
            let start = [[]];
            let cur_pos = [[]];
            for (let x = 0; x < 3; x++) {
                if (this.player_color == 1) {
                    start = [pos[0] - 1, pos[1] + 1];
                    cur_pos = [start[0], start[1] - x]
                } else if (this.player_color == 2) {
                    start = [pos[0] + 1, pos[1] - 1];
                    cur_pos = [start[0], start[1] + x]
                }
                if (cur_pos[1] < 0) { cur_pos[1] = 0 }; if (cur_pos[1] > 7) { cur_pos[1] = 7 };
                if (cur_pos[0] > 7) { cur_pos[0] = 7 }; if (cur_pos[0] < 0) { cur_pos[0] = 0 };
                let highlight = (arr) => {
                    let posFromIndex = this.indexToPlayer(arr);
                    let allBlocks = this.cubes.getAll();

                    allBlocks.forEach(element => {
                        if (element.position.x == posFromIndex.x && element.position.z == posFromIndex.z) {
                            if (element.color == 11025970) {
                                element.material.color.setHex(0xff00ff)
                                this.highlighted.push(element)
                            }
                        }
                    });
                }
                if (pionki[cur_pos[0]][cur_pos[1]] == 0) {
                    highlight(cur_pos)
                } else {
                    if (this.player_color == 1 && pionki[cur_pos[0]][cur_pos[1]] == 2) {//Biały bije czarny
                        let beatPos;
                        if (x == 0) { beatPos = [cur_pos[0] - 1, cur_pos[1] + 1]; highlight(beatPos) }
                        else if (x == 2) { beatPos = [cur_pos[0] - 1, cur_pos[1] - 1]; highlight(beatPos) }
                    } else if (this.player_color == 2 && pionki[cur_pos[0]][cur_pos[1]] == 1) { //Czarny bije biały
                        let beatPos;
                        if (x == 0) { beatPos = [cur_pos[0] + 1, cur_pos[1] - 1]; highlight(beatPos) }
                        else if (x == 2) { beatPos = [cur_pos[0] + 1, cur_pos[1] + 1]; highlight(beatPos) }
                    }
                }
            }
        } catch (error) {
        }

    }
    hideHighlight() {
        this.highlighted.forEach(element => {
            element.material.color.setHex(0xa83e32)
        });
    };
    zbity(nowy, stary) {
        if (Math.abs(nowy[0] - stary[0]) == 2 || Math.abs(nowy[1] - stary[1]) == 2) {
            return true;
        } else { return false }
    }
    getZbijany(nowy, stary) {
        let posZbijanego = []
        posZbijanego.push((nowy[0] + stary[0]) / 2)
        posZbijanego.push((nowy[1] + stary[1]) / 2)
        return (posZbijanego)
    }
    checkApproximity(color, newPosition, oldPosition) {
        if (Math.abs(newPosition[0] - oldPosition[0]) <= 1 && Math.abs(newPosition[1] - oldPosition[1]) <= 1) {
            if (color == 1 && newPosition[0] < oldPosition[0]) {
                return true;
            } else if (this.player_color == 2 && newPosition[0] > oldPosition[0]) {
                return true;
            }
        }
        if (this.checkHighlight(newPosition)) { return true }
        return false;
    }
    checkHighlight(newPosition) {
        let newPos = this.indexToPlayer(newPosition);
        let higlighted = []
        this.highlighted.forEach(element => {
            higlighted.push(element.position)
        });
        newPos = new THREE.Vector3(newPos.x, 0, newPos.z);
        let flag = [];
        higlighted.forEach(element => {
            flag.push(element.equals(newPos))
        });
        if (flag.includes(true)) { return true }
        else { return false; }

    }
    checkBoard = (position) => {
        if (szachownica[position[0]][position[1]] == 0) {
            if (pionki[position[0]][position[1]] == 0) {
                return true;
            } else { return false }
        } else { return false; }
    }
    posToIndex = (a) => {
        return [(a.position.x + 35) / 10, (a.position.z + 35) / 10];
    }
    indexToPlayer = (index) => {
        return { x: index[0] * 10 - 35, y: 0, z: index[1] * 10 - 35 }
    }
    animByIndex = (old_ind, new_ind) => {
        let pls = this.players.getAll();
        let pos = this.indexToPlayer(old_ind)
        let new_pos = this.indexToPlayer(new_ind)
        pls.forEach(el => {
            if (el.position.x == pos.x && el.position.z == pos.z) {
                this.anim(el, new_pos)
            }
        });
    }
    render = () => {
        TWEEN.update();
        requestAnimationFrame(this.render);

        this.renderer.render(this.scene, this.camera);

    }
    getColor = () => {
        return this.player_color;
    }
}