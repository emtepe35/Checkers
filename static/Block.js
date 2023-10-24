class Block extends THREE.Mesh {
    constructor(color) {
        super()
        this.color = color;
        this.geometry = new THREE.BoxGeometry(10, 5, 10);
        this.material = new THREE.MeshBasicMaterial({
            color: color,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: false,
            map: new THREE.TextureLoader().load('https://i.imgur.com/1XG2viA.jpg')
        });
        this.name;
    }
    setName(n) {
        this.name = n;
    }
    getName() {
        return this.name;
    }
    setColor(c) {
        this.material.color = c;
    }
}