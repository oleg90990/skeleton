import { MotionEnum, DirectionEnum } from '@/game/Models/Player/enums'
import { DirectionOffset, PlayerInfo } from '@/game/Models/Player/types'
import Spritesheets from '@/game/Models/Player/Spritesheets'

export type Sprite = 'skeleton' | 'spider' | 'zombie' | 'minotaur'

export interface PlayerStatus {
  sprite: Sprite
  directionOffset: DirectionOffset
  directionKey: DirectionEnum
  motionKey: MotionEnum
  x: number
  y: number
  id?: string
  info: PlayerInfo
}