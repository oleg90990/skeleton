import { Scene } from 'phaser'
import Player from './Models/Player'
import Skeleton from './Models/Skeleton'
import { AnimsEnum, PlayerInfo } from './Models/Player/types'
import { DirectionEnum, EmitResponseInterface } from '@/game/types'
import Socket from '@/game/Utils/socket'
import intersectionSkeleton from '@/game/Helpers/intersectionSkeleton'

const defaultInfo: PlayerInfo = {
  health: 1000,
  power: 1,
  powerArea: 30,
  speed: 1,
}

export class Game extends Scene {
    private tileIntersects: Phaser.Geom.Rectangle[] = []
    private tileWidthHalf: any
    private tileHeightHalf: any
    private client!: Socket
    private skeletons: any = {}
    private user: any
    private panel: any

    constructor() {
        super({ key: 'GameScene' })
    }

    public preload() {
        this.load.json('map', require('@/assets/isometric-grass-and-water.json'))
        this.load.spritesheet('tiles', require('@/assets/isometric-grass-and-water.png'), {
          frameWidth: 64,
          frameHeight: 64,
        })
        this.load.spritesheet('skeleton', require('@/assets/skeleton8.png'), {
          frameWidth: 128,
          frameHeight: 128,
        })
        this.load.spritesheet('zombie', require('@/assets/zombie.png'), {
          frameWidth: 128,
          frameHeight: 128,
        })
        this.load.image('house', require('@/assets/rem_0002.png'))
    }

    public create() {
      this.client = new Socket()

      this.client.connect(() => {
        this.buildMap()
        this.placeHouses()

        this.user = this.add.existing(
          new Player(this,
             Math.floor(Math.random() *  500),
             Math.floor(Math.random() *  500),
             AnimsEnum.idle,
             DirectionEnum.west,
             defaultInfo,
        ))

        this.client.init(this.user)

        this.client.onInit(({ x, y, motion, dir, id, info }: EmitResponseInterface) => {
          if (!this.skeletons[id]) {
            this.client.init(this.user)
            this.skeletons[id] = this.add.existing(new Skeleton(
              this, x, y, motion, dir, info,
            ))
          }
        })

        this.client.onEmit(({ x, y, motion, dir, id, info }: EmitResponseInterface) => {
          if (this.skeletons[id]) {
            this.skeletons[id].set(
              x, y, motion, dir, info,
            )
          } else {
            this.skeletons[id] = this.add.existing(new Skeleton(
              this, x, y, motion, dir, info,
            ))
          }
        })

        this.client.onDisconect((id: string) => {
          if (this.skeletons[id]) {
            this.skeletons[id].destroy()
            delete this.skeletons[id]
          }
        })
      })
    }

    public update() {
      if (this.user) {
        this.user.update()
        this.client.emit(this.user)

        for (const id in this.skeletons) {
          if (this.skeletons[id]) {
            intersectionSkeleton(this.user, this.skeletons[id])
          }
        }
      }
    }

    private buildMap() {
        //  Parse the data out of the map
        const data = this.cache.json.get('map')

        const tilewidth = data.tilewidth
        const tileheight = data.tileheight

        this.tileWidthHalf = tilewidth / 2
        this.tileHeightHalf = tileheight / 2

        const layer = data.layers[0].data

        const mapwidth = data.layers[0].width
        const mapheight = data.layers[0].height

        const centerX = mapwidth * this.tileWidthHalf
        const centerY = 16

        let i = 0

        for (let y = 0; y < mapheight; y++) {
            for (let x = 0; x < mapwidth; x++) {
                const id = layer[i] - 1
                const tx = (x - y) * this.tileWidthHalf
                const ty = (x + y) * this.tileHeightHalf
                const tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id)

                if ([22, 23].includes(id)) {
                  this.tileIntersects.push(
                    new Phaser.Geom.Rectangle(
                      tile.x - 10,
                      tile.y - 10,
                      tile.width,
                      tile.height,
                  ))
                }

                i++
            }
        }
    }

    private placeHouses() {
        // const house_1 = this.add.image(240, 370, 'house')
        // house_1.depth = 9999

        // const house_2 = this.add.image(1300, 290, 'house')
        // house_2.depth = 9999
    }
}
