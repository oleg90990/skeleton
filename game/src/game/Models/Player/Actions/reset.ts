import Skeleton from '../Skeleton'
import { MotionEnum, DirectionEnum } from '../enums'
import { info } from '../Skeleton/config'

export default function(player: Skeleton) {
  player.setPoint(0, 0)
  player.setMotion(MotionEnum.idle)
  player.setDirection(DirectionEnum.north)
  player.setPlayerInfo(info)
}