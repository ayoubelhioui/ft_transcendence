import { Vector3 } from "three";
import { IsVector3Defined } from "../validator/vector-3d.validator";

export class RacketMoveDto
{
    @IsVector3Defined()
    position : Vector3
}
