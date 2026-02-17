"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const audioRef = useRef(null);
	const clickRef = useRef(null);
	const [started, setStarted] = useState(false);

	const handleStart = () => {
		if (audioRef.current) {
			audioRef.current.muted = false;
			audioRef.current.volume = 0.2;
			audioRef.current.play();
		}
		setStarted(true);
	};

	const playClick = () => {
		if (!clickRef.current) return;
		clickRef.current.currentTime = 0;
		clickRef.current.play();
	};

	// Prepare audio silently (optional but smooth)
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.muted = true;
			audioRef.current.play().catch(() => {});
		}
	}, []);

	return (
		<div className="relative w-full h-screen overflow-hidden">
			{/* MAIN BACKGROUND (after start) */}
			<img
				src="img5.png"
				className={`absolute inset-0 z-[1] w-full h-full object-cover transition-opacity duration-700 ${
					started ? "opacity-100" : "opacity-0"
				}`}
			/>

			{/* AUDIO */}
			<audio
				ref={audioRef}
				src="/sounds/forbidden-nocturne.mp3"
				loop
				playsInline
			/>
			<audio ref={clickRef} src="/sounds/mouse-click.mp3" preload="auto" />

			{/* SCREEN OVERLAY */}
			{started && (
				<div className="z-99">
					<div
						onClick={playClick}
						className="w-[8vw] h-[13vh] bg-yellow-200 absolute top-[32.5vh] left-0 z-99"
					></div>
					<h1 className="heref text-[10vh] leading-[10vh] text-white absolute top-[2vh] left-[2vw] z-99">
						Five Nights <br /> at Freddy's
					</h1>
					<h1 className="heref text-[10vh] leading-[10vh] text-white absolute bottom-[3vh] right-[2vw] z-99">
						Can you survive?
					</h1>
				</div>
			)}

			{/* START SCREEN OVERLAY */}
			{!started && (
				<div className="absolute inset-0 z-10 flex items-center justify-center">
					{/* background image */}
					<img
						src="img1.png"
						className="absolute inset-0 w-full h-full object-cover"
					/>

					{/* dark overlay */}
					<div className="absolute inset-0 bg-black/50" />

					{/* content */}
					<div className="relative z-20 flex flex-col items-center gap-6 text-white">
						<h1 className="text-[12vh] font-semibold tracking-wide choco ">
							Can you make it?
						</h1>

						<button
							onClick={handleStart}
							className="px-8 py-3 text-lg bg-black text-white hover:scale-105 transition-transform"
						>
							Do you want to try?
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
