import { GameObjects } from 'phaser'
import { MotionEnum } from '../enums'
import Skeleton from '../Skeleton'
import {
  isDownMouse,
  getDirection,
  getOffset
} from '@/game/Helpers/mousePointer'

export default function(player: Skeleton) {
  player.setDirectionOffset(getOffset(player))
  player.setDirection(getDirection(player))
  player.setMotion(MotionEnum.walk)
  player.move()
}