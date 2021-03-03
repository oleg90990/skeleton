import { AnimationItem } from '@/game/types.js'

export enum AnimsEnum {
  idle = 'idle',
  walk = 'walk',
  attack = 'attack',
  die = 'die',
  shoot = 'shoot',
}

export interface Animations {
  [AnimsEnum.idle]: AnimationItem,
  [AnimsEnum.walk]: AnimationItem,
  [AnimsEnum.attack]: AnimationItem,
  [AnimsEnum.die]: AnimationItem,
  [AnimsEnum.shoot]: AnimationItem
}

export interface PlayerInfo {
  health: number
  power: number
  powerArea: number
  speed: number
}
