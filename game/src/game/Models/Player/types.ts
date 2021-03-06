import { DirectionEnum, MotionEnum } from './enums'

export interface MotionItem {
  startFrame: number
  endFrame: number
  once?: boolean
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