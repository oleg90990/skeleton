export default function (this: Phaser.Scene) {
    const water: Phaser.Geom.Rectangle[] = [];
    const grass: Phaser.Geom.Rectangle[] = []


    const data = this.cache.json.get('map')

    const tilewidth = data.tilewidth
    const tileheight = data.tileheight

    const tileWidthHalf = tilewidth / 2
    const tileHeightHalf = tileheight / 2

    const layer = data.layers[0].data

    const mapwidth = data.layers[0].width
    const mapheight = data.layers[0].height

    const centerX = 0
    const centerY = 0

    let i = 0

    for (let y = 0; y < mapheight; y++) {
        for (let x = 0; x < mapwidth; x++) {
            const id = layer[i] - 1
            const tx = (x - y) * tileWidthHalf
            const ty = (x + y) * tileHeightHalf
            const tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id)

            if ([22, 23].includes(id)) {
              water.push(
                new Phaser.Geom.Rectangle(
                  tile.x - 10,
                  tile.y - 10,
                  tile.width,
                  tile.height,
              ))
            }

            if ([1, 2, 3].includes(id)) {
              grass.push(
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

    return {
      water,
      grass
    }
}