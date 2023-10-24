class Cubes extends THREE.Mesh {
    constructor() {
        super()
        this.geometry = new THREE.BoxGeometry(100, 3, 100);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xcff77ff,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 0.3
        });
        this.position.y = -4;
        this.children = [];

        this.name = "cubes";

        this.startup = 0.35 * (100);

        this.offset_x = this.startup;
        this.offset_y = this.startup;

        this.offset_x_count = 0;
        this.offset_y_count = 0;

    }
    getAll() {
        return this.children;
    }
    addCubeToContainer(cube) {
        this.children.push(cube);
    }
    genSingleCube(color) {
        const cube = new Block(color)
        cube.setName("block");
        return cube;
    }
    genCrossboard(cube_table) {
        cube_table.forEach(element => {
            element.forEach(field_code => {
                let cube;
                if (!field_code) {
                    cube = this.genSingleCube(0xa83e32)
                } else {
                    cube = this.genSingleCube(0x0ecfed)
                }
                cube.position.set(this.offset_x, 0, this.offset_y)
                this.addCubeToContainer(cube);
                this.offset_y_count++;
                if (this.offset_y_count <= 7) { this.offset_y -= 10; }
                else {
                    this.offset_y = this.startup;
                    this.offset_y_count = 0
                }
            });
            this.offset_x_count++;
            if (this.offset_x_count <= 7) { this.offset_x -= 10; }
            else {
                this.offset_x = this.startup;
                this.offset_x_count = 0;
            }
        });
    }
}