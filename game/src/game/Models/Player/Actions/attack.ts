import Skeleton from '../Skeleton'
import { MotionEnum } from '../enums'

export default function(player: Skeleton) {
  player.setMotion(MotionEnum.attack)
}