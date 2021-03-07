import { DirectionEnum, MotionEnum } from './enums'
import { Sprite } from '@/game/Client/types'

export interface MotionItem {
  startFrame: number
  endFrame: number
  once?: boolean
  attack?: number
}

export interface Motions {
  [MotionEnum.idle]: MotionItem,
  [MotionEnum.walk]: MotionItem,
  [MotionEnum.attack]: MotionItem,
  [MotionEnum.die]: MotionItem,
  [MotionEnum.shoot]: MotionItem
}

export interface DirectionOffsets {
  [DirectionEnum.west]: number
  [DirectionEnum.northWest]: number
  [DirectionEnum.north]: number
  [DirectionEnum.northEast]: number
  [DirectionEnum.east]: number
  [DirectionEnum.southEast]: number
  [DirectionEnum.south]: number
  [DirectionEnum.southWest]: number
}

export interface PlayerInfo {
  health: number
  power: number
  powerArea: number
  speed: number
}

export interface DirectionOffset {
  x: number
  y: number
}

export interface Spritesheet {
  sprite: Sprite
  info: PlayerInfo
  offsets: DirectionOffsets
  motions: Motions
}