import { Spritesheet } from '../types'

const zombie: Spritesheet = {
  sprite: 'zombie',
  info: {
    health: 2500,
    power: 300,
    powerArea: 50,
    speed: 0.7,
  },
  offsets: {
    west: 0,
    northWest: 36,
    north: 72,
    northEast: 108,
    east: 144,
    southEast: 180,
    south: 216,
    southWest: 252,
  },
  motions: {
    idle: {
      startFrame: 0,
      endFrame: 4,
    },
    walk: {
      startFrame: 4,
      endFrame: 12,
    },
    attack: {
      startFrame: 12,
      endFrame: 22,
      attack: 16,
    },
    die: {
      startFrame: 22,
      endFrame: 28,
      once: true,
    },
    shoot: {
      startFrame: 28,
      endFrame: 36,
    },
  }
}

export default zombie