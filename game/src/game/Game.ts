import { Scene } from 'phaser'
import Player from './Models/Player'
import Skeleton from './Models/Skeleton'
import { AnimsEnum } from './Models/Player/types'
import { DirectionEnum, EmitRespnseInterface } from '@/game/types'
import Socket from '@/game/Helpers/Socket'
import intersectionSkeleton from '@/game/Helpers/intersectionSkeleton'

export class Game extends Scene
{
    constructor () {
        super({ key: 'GameScene' })
    }

    private tileIntersects: Array<Phaser.Geom.Rectangle> = []
    private tileWidthHalf: any
    private tileHeightHalf: any
    private client!: Socket
    private skeletons: any = []
    private user: any
    private panel: any

    preload ()
    {
        this.load.json('map', require('@/assets/isometric-grass-and-water.json'))
        this.load.spritesheet('tiles', require('@/assets/isometric-grass-and-water.png'), { frameWidth: 64, frameHeight: 64 })
        this.load.spritesheet('skeleton', require('@/assets/skeleton8.png'), { frameWidth: 128, frameHeight: 128 })
        this.load.spritesheet('zombie', require('@/assets/zombie.png'), { frameWidth: 128, frameHeight: 128 })
        this.load.image('house', require('@/assets/rem_0002.png'))
        // this.load.bitmapFont('desyrel', require('@/assets/fonts/desyrel.png'), require('@/assets/fonts/desyrel.xml'))
    }

    create ()
    {

      // this.panel = this.add.bitmapText(10, 10, 'Твои жизни сука: 100', '');


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
             this.client
          )
        )

        this.client.init({
          x: this.user.x,
          y: this.user.x,
          direction: this.user.directionKey,
          motion: this.user.motion
        })

        this.client.onEmit(({ x, y, motion, direction, id }: EmitRespnseInterface) => {
          if (this.skeletons[id]) {
            this.skeletons[id].set(
              x, y, motion, direction, id
            )
          }
        })

        this.client.onInit(({ x, y, motion, direction, id }: EmitRespnseInterface) => {
          if (!this.skeletons[id]) {
            this.skeletons[id] = this.add.existing(
               new Skeleton(this, x, y, motion, direction)
            )
          }
        })

        this.client.onDisconect((id: string) => {
          if (this.skeletons[id]) {
            this.skeletons[id].delete()
          }
        }) 
      })
    }

    update ()
    {
      if (this.user) {
        this.user.update()

        for (let id in this.skeletons) {
          intersectionSkeleton(this.user, this.skeletons[id])
        }

        // this.panel.text = `Твои жизни сука: ${this.user.getHealth()}`
      }
    }

    buildMap ()
    {
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

        for (let y = 0; y < mapheight; y++)
        {
            for (let x = 0; x < mapwidth; x++)
            {
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
                      tile.height
                    )
                  )
                }

                i++
            }
        }
    }

    placeHouses ()
    {
        // const house_1 = this.add.image(240, 370, 'house')
        // house_1.depth = 9999

        // const house_2 = this.add.image(1300, 290, 'house')
        // house_2.depth = 9999
    }
}
