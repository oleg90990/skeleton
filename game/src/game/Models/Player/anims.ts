import { Animations } from './types.js'

const anims: Animations = {
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
    endFrame: 20,
  },
  die: {
    startFrame: 20,
    endFrame: 28,
    once: true,
  },
  shoot: {
    startFrame: 28,
    endFrame: 32,
  },
};

export default anims
