import { GameObjects } from 'phaser'
import { MotionEnum } from '../enums'
import Player from '../player'
import {
  isDownMouse,
  getDirection,
  getOffset
} from '@/game/Helpers/mousePointer'

export default function(player: Player) {
  player.setDirectionOffset(getOffset(player))
  player.setDirection(getDirection(player))
  player.setMotion(MotionEnum.walk)
  player.move()
}