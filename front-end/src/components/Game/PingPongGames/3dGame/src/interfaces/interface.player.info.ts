interface Matrix {
    a : number,
    b : number,
    c : number,
    d : number,
}

export interface PlayerInfo {
    p1: THREE.Vector2,
    p2: THREE.Vector2,
    p3: THREE.Vector2,
    matrix: Matrix,
    invMatrix: Matrix
}