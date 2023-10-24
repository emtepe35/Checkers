class Players extends THREE.Mesh {
    constructor() {
        super()
        this.geometry = new THREE.BoxGeometry(100, 3, 100);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xcffffff,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 0
        });
        this.position.y = 3;
        this.children = [];

        this.name = "players";

        this.startup = -0.35 * 100;

        this.offset_x = this.startup;
        this.offset_y = this.startup;

        this.offset_x_count = 0;
        this.offset_y_count = 0;

    }
    getAll() {
        return this.children;
    }
    deleteAll() {
        this.children = []
    }
    addPlayerToContainer(player) {
        this.children.push(player);
    }
    genSinglePlayer(color) {
        const player = new Pionek(color)
        player.setName("player");
        return player;
    }
    genPlayers(player_table) {
        player_table.forEach(element => {
            element.forEach(player_code => {
                let single_player;
                if (player_code != 0) {
                    if (player_code == 2) {
                        single_player = this.genSinglePlayer(0x8a4e4e);
                    } else if (player_code == 1) {
                        single_player = this.genSinglePlayer(0xdedede)
                    }
                    single_player.position.set(this.offset_x, 5, this.offset_y)
                    this.addPlayerToContainer(single_player);
                }
                this.offset_y_count++;
                if (this.offset_y_count <= 7) { this.offset_y += 10; }
                else { this.offset_y = this.startup; this.offset_y_count = 0 }
            });
            this.offset_x_count++;
            if (this.offset_x_count <= 7) { this.offset_x += 10; }
            else { this.offset_x = this.startup; this.offset_x_count = 0; }
        });
    }
}