export default function (this: Phaser.Scene) {
  this.load.json('map', require('@/assets/isometric-grass-and-water-small.json'))
  this.load.spritesheet('tiles', require('@/assets/isometric-grass-and-water.png'), {
    frameWidth: 64,
    frameHeight: 64,
  })
}