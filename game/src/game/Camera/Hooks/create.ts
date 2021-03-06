export default function (this: Phaser.Scene) {
  const camera = this.cameras.main

  camera.setSize(
    window.innerWidth,
    window.innerHeight
  );

  camera.scrollX = -1300
  camera.scrollY = 500
}