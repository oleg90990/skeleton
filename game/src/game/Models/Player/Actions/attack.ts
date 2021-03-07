import Player from '../player'
import { MotionEnum } from '../enums'

export default function(player: Player) {
  player.setMotion(MotionEnum.attack)
}