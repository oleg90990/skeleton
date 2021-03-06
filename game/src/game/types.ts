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

// export interface DirectionPoints {
//   x: number
//   y: number
// }

// export interface DirectionItem {
//   offset: number
//   x: number
//   y: number
// }

// export interface AnimationItem {
//   startFrame: number
//   endFrame: number
//   once?: boolean
// }


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

// export interface AvailableLand {
//   x: number
//   y: number
// }

// export interface Bonus {
//   id: string,
//   model: String,
//   value: number,
//   x: number,
//   y: number
// }