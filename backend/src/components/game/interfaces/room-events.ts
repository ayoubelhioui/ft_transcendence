import { ClassicRoom } from "../game-components/Room/ClassicRoom"
import { Room } from "../game-components/Room/Room"
import { ThreeRoom } from "../game-components/Room/ThreeRoom"

export type RoomEventFunction = (room : Room) => Promise<void>

export interface RoomEvent {
  onStop : RoomEventFunction
}