class Light {

    constructor(color, intensity, posy) {

        // przykładowe, nieobowiązkowe parametry konstruktora
        // przekazane podczas tworzenia obiektu klasy Light
        // np scena, kolor światła, wielkość bryły

        this.color = color
        this.intensity = intensity
        this.posy = posy

        // dodatkowe zmienne tworzone w konstruktorze
        // widoczne w dalszych funkcjach

        this.zmienna = 0

        // pusty kontener na inne obiekty 3D

        this.container = new THREE.Object3D();

        //wywołanie funkcji init()

        this.init()
    }

    init() {

        // utworzenie i pozycjonowanie światła

        this.light = new THREE.PointLight(this.color, 10);
        this.light.position.set(100, this.posy, 100); // ma być w pozycji 0,0,0 kontenera - nie zmieniamy!!!
        this.light.intensity = this.intensity;
        // dodanie światła do kontenera

        this.container.add(this.light);

        //utworzenie widzialnego elementu reprezentującego światło (mały sześcian, kula, czworościan foremny, do wyboru)
        const lightbox_geo = new THREE.BoxGeometry(10, 10, 10);
        const lightbox_mat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 1000,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("https://lh3.googleusercontent.com/DZ_-dGea3Wt_2aXvj9Yk8tisRcgW5qlLPSAPaxJFniI2HqwbAM3ARE2alzDl0x9TyuBz_RlUNuRFq4TdcQIHtw"),
        })
        this.mesh = new THREE.Mesh(lightbox_geo, lightbox_mat);

        // dodanie go do kontenera

        this.container.add(this.mesh);
    }


    // funkcja zwracająca obiekt kontenera
    // czyli nasze światło wraz z bryłą

    getLight() {
        return this.container;
    }

    // przykład innej funkcji, np do zmiany koloru bryły, zmiany koloru światła, etc

    changeColor(colorinp) {
        this.container.remove(this.light);
        this.light.color.set(colorinp);
        this.container.add(this.light);
    }

    changeIntensity(intensity) {
        this.container.remove(this.light);
        this.light.intensity = intensity;
        this.container.add(this.light);
    }

    changePosY(posy) {
        this.container.remove(this.light);
        this.light.position.set(100, posy, 100);
        this.container.add(this.light);
    }

}