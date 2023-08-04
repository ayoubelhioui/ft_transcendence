import * as THREE from "three";

export class ScoreNbr extends THREE.Object3D {
    size : number = 5
    arr : THREE.Mesh[][][]
    nbr : number[][][]
    color : number
    
    constructor(x : number, y : number, z : number, color : number) {
        super()

        this.color = color
        this.size = 5
        this.arr = [
            this.#scoreNumber(0),
            this.#scoreNumber(4)
        ]

        this.nbr = this.getNumbersArray()
        this.position.set(x, y, z)
        this.scale.set(0.2, 0.2, 1)
        
    }


    #getRect(x: number, y: number, width: number, height: number) {
        const mat = new THREE.MeshBasicMaterial({
            color: this.color,
            side: THREE.DoubleSide
        })
        const geo = new THREE.PlaneGeometry(width, height)
        const mesh = new THREE.Mesh(geo, mat)

        x = x + width / 2
        y = y - height / 2
        mesh.position.set(x, y, 0)
        return (mesh)
    }


    getNumbersArray() {
        let res = []
        let nbr0 = [
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
        ]
        let nbr1 = [
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
        ]
        let nbr2 = [
            [1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 0, 0],
        ]
        let nbr3 = [
            [1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
        ]
        let nbr4 = [
            [1, 0, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
        ]
        let nbr5 = [
            [1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
        ]
        let nbr6 = [
            [1, 1, 1, 0, 0],
            [1, 0, 0, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
        ]
        let nbr7 = [
            [1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0],
        ]
        let nbr8 = [
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
        ]
        let nbr9 = [
            [1, 1, 1, 0, 0],
            [1, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0],
            [1, 1, 1, 0, 0],
        ]
        res.push(nbr0)
        res.push(nbr1)
        res.push(nbr2)
        res.push(nbr3)
        res.push(nbr4)
        res.push(nbr5)
        res.push(nbr6)
        res.push(nbr7)
        res.push(nbr8)
        res.push(nbr9)
        return (res)
    }

    #scoreNumber(x = 0) {
        let res = []
        for (let i = 0; i < this.size; i++) {
            let raw = []
            for (let j = 0; j < this.size; j++) {
                let s = this.#getRect(i + x, -j, 1, 1)
                this.add(s)
                raw.push(s)
            }
            res.push(raw)
        }
        return (res)
    }

    setToNbr(arrNb : number, n : number) {
        for (let i = 0; i < this.size; i++) {
            ////console.log()
            for (let j = 0; j < this.size; j++) {
                this.arr[arrNb][i][j].visible = (this.nbr[n][j][i] === 0 ? false : true)
            }
        }
    }

    set(n : number) {
        if (isNaN(n) || n < 0 || n > 99)
            n = 0
        let n1 = Math.floor(n / 10)
        let n2 = n % 10
        this.setToNbr(0, n1)
        this.setToNbr(1, n2)
    }
}