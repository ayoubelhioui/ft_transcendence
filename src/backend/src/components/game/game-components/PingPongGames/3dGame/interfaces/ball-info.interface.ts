import { Vec3 } from "./vec3.interface";

export class BallInfo {
    position: Vec3
    velocity: Vec3
    init : boolean
    net : boolean
    spotPos : Vec3 | undefined
    end : boolean | undefined
}
