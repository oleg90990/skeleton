import Skeleton from '../Skeleton'
import { MotionEnum, DirectionEnum } from '../enums'
import { PlayerInfo } from '../types'

export default function(
  player: Skeleton,
  x: number,
  y: number,
  moion: MotionEnum,
  direction: DirectionEnum,
  info: PlayerInfo
) {
  player.setPoint(x, y)
  player.setMotion(moion)
  player.setDirection(direction)
  player.setPlayerInfo(info)
}