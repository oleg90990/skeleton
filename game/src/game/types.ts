import { GameObjects } from 'phaser'

export interface ServiceProviderInterface {
  items: ServiceInterface[]
}

export interface ServiceInterface {
  execute?: () => void
  preload?: () => void
  create?: () => void
  update?: () => void
}

export type ServiceGetterInterface = (name: string) => ServiceInterface | undefined

export interface Point {
  x: number
  y: number
}

export interface BonusInterface {
  id: string,
  model: string,
  value: number,
  x: number,
  y: number
}

// export interface EmitResponseInterface {
//   directionPoints: DirectionPoints
//   dir: DirectionEnum
//   motion: AnimsEnum
//   x: number
//   y: number
//   id: string
//   info: PlayerInfo
// }

// export interface EmitRequestInterface {
//   directionPoints: DirectionPoints
//   dir: DirectionEnum
//   motion: AnimsEnum
//   x: number
//   y: number
//   id?: string
//   info: PlayerInfo
// }