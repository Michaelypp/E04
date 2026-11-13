import Phaser from "phaser";
import { loadSounds } from "../sounds.ts";
import { makeTextures } from "../textures.ts";

export class BootScene extends Phaser.Scene {
  constructor(private readonly startDemo: boolean) {
    super("boot");
  }

  create(): void {
    makeTextures(this);
    loadSounds(this);
    this.scene.start("title", { startDemo: this.startDemo });
  }
}

export function fadeTo(
  scene: Phaser.Scene,
  key: string,
  data: object = {},
): void {
  const camera = scene.cameras.main;
  if (camera.fadeEffect.isRunning && camera.fadeEffect.direction) return;
  camera.fadeOut(450, 4, 2, 12);
  camera.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
    scene.scene.start(key, data);
  });
}
