"use client"; // Chạy trên client-side

import { useEffect, useState } from "react";
import { Howl } from "howler";

export default function BackgroundMusic() {
    const [music, setMusic] = useState<Howl | null>(null);

    useEffect(() => {
        const bgMusic = new Howl({
            src: ["/assets/music-background.mp3"],
            volume: 0.5,
            loop: true,
        });

        setMusic(bgMusic);

        bgMusic.play();

        return () => {
            bgMusic.stop();
        };
    }, []);

    return <></>;
}