export interface LiveData {
    score : number[],
    ballInfo : {
        position : THREE.Vector3,
        velocity : THREE.Vector3,
        init : boolean,
        net : boolean,
        spotPos : THREE.Vector3 | undefined,
        end : boolean | undefined
    },
    racketPlayer1Pos : THREE.Vector3,
    racketPlayer2Pos : THREE.Vector3
}
