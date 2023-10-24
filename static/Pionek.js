class Pionek extends THREE.Mesh {
    constructor(color) {
        super()
        this.color = color;
        this.geometry = new THREE.CylinderGeometry(4, 4, 3, 32);
        this.material = new THREE.MeshBasicMaterial({
            color: this.color,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 0.8
        });
        this.name;
    }
    setName(n) {
        this.name = n;
    }
    getName() {
        return this.name;
    }
}