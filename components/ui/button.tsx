"use client";

import { extendVariants, Button } from "@heroui/react";
import { Howl } from "howler";

export const soundClick = new Howl({
  src: ["/assets/sound-click.wav"],
  volume: 0.25
});

export const soundClose = new Howl({
  src: ["/assets/sound-close.wav"],
  volume: 0.25
});

export const CAFButton = extendVariants(Button, {
  defaultVariants: {
    radius: "full"
  },
});
