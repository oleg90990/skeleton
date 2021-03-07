export default function (this: Phaser.Scene) {
  this.cameras.main.scrollX = 500
  this.cameras.main.scrollY = 500

  window.addEventListener('resize', (e) => {
    this.game.scale.setGameSize(
      window.innerWidth,
      window.innerHeight
    );
    this.cameras.main.setSize(
      window.innerWidth,
      window.innerHeight
    );
  });
}