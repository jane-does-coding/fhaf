"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const audioRef = useRef(null);
	const clickRef = useRef(null);
	const [started, setStarted] = useState(true);

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

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.muted = true;
			audioRef.current.play().catch(() => {});
		}
	}, []);

	return (
		<div className="relative w-full h-screen overflow-hidden bg-black">
			{/* MAIN BACKGROUND (after start) */}
			<img
				src="img5.png"
				className={`absolute inset-0 z-[1] w-[100vw] h-[90vh] object-fill transition-opacity duration-700  ${
					started ? "opacity-100" : "opacity-0"
				}`}
			/>

			<img
				src="monitor.webp"
				className={`absolute inset-0 w-[85vw] h-[90vh] left-[7.5vw] top-[10vh] object-fill transition-opacity duration-700 z-99  ${
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
				<div className="z-80">
					<div onClick={playClick} className="">
						<img
							src="/imgs/learn-more.png"
							className="z-80 absolute right-[18.5vw] w-[28.5vw] h-[45vh] top-[18.5vh] hover:scale-[103%] transition-all ease-in-out cursor-pointer"
						/>
					</div>
					<div onClick={playClick} className="">
						<img
							src="/imgs/submit.png"
							className="z-80 absolute left-[29.75vw] w-[10.5vw] h-[13.5vh] top-[52vh] hover:scale-[104%] transition-all ease-in-out cursor-pointer"
						/>
					</div>
					<div onClick={playClick} className="">
						<img
							src="/imgs/faq.png"
							className="z-80 absolute left-[29.5vw] w-[10.25vw] h-[19.5vh] top-[26vh] hover:scale-[104%] transition-all ease-in-out cursor-pointer"
						/>
					</div>
					<div onClick={playClick} className="">
						<img
							src="/imgs/slack.png"
							className="z-80 absolute left-[40.5vw] w-[10.75vw] h-[26vh] top-[47.25vh] hover:scale-[104%] transition-all ease-in-out cursor-pointer"
						/>
					</div>
					{/* 	<div className="w-[20vw] h-fit border-green-300/0 border-4 flex items-center justify-center absolute z-99 top-[34vh] right-[21%] rotate-[-4deg]">
						<h3 className="choco text-center font-semibold text-[12vh] leading-[11.5vh]">
							Learn More
						</h3>
					</div> */}
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
