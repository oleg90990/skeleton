import { GameObjects, Scene } from 'phaser'

class Heart extends GameObjects.Image {
  public value: number
  private f: number
  public id: string
  public used: boolean = false

  constructor(scene: Scene, x: number, y: number, id: string, value: number) {
    super(scene, x, y, 'heart')
    this.f = 0
    this.id = id
    this.value = value
    this.scene.time.delayedCall(100, this.changeFrame, [], this)
  }

  public changeFrame() {
    this.f++

    if (this.f === 10) {
      this.f = 0;
    } 
    this.frame = this.texture.get(this.f)
    if (this.scene) {
      this.scene.time.delayedCall(100, this.changeFrame, [], this)
    }
  }

  get area() {
    return new Phaser.Geom.Circle(
      this.x,
      this.y,
      30,
    )
  }
}

export default Heart
