"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const audioRef = useRef(null);
	const clickRef = useRef(null);
	const [started, setStarted] = useState(false);
	const [activeMenu, setActiveMenu] = useState(null);
	const [menuVisible, setMenuVisible] = useState(false);
	const [audioInitialized, setAudioInitialized] = useState(false);

	const handleStart = () => {
		if (audioRef.current) {
			audioRef.current.volume = 1;
			audioRef.current.muted = false;
			audioRef.current
				.play()
				.then(() => {
					setAudioInitialized(true);
				})
				.catch((error) => {
					console.log("Audio playback failed:", error);
				});
		}
		setStarted(true);
	};

	const playClick = () => {
		if (!clickRef.current) return;
		clickRef.current.currentTime = 0;
		clickRef.current.play().catch(() => {});
	};

	const handleMenuClick = (menu) => {
		playClick();
		setActiveMenu(menu);
		setMenuVisible(true);
	};

	const handleCloseMenu = () => {
		playClick();
		setMenuVisible(false);

		setTimeout(() => setActiveMenu(null), 500);
	};

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load();
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

			{/* SIDE MONITOR - NOW ACTS AS MENU PANEL */}
			<div
				className={`absolute w-[70vw] h-[70vh] left-[30vw] top-[50vh] translate-y-[-50%] transition-all duration-600 ease-in-out z-99 ${
					started ? "opacity-100" : "opacity-0"
				} ${menuVisible ? "translate-x-0" : "translate-x-full"}`}
			>
				{/* Monitor Background Image */}
				<img
					src="side-monitor.webp"
					className="w-full h-full object-fill absolute inset-0 drop-shadow-2xl drop-shadow-neutral-540/40"
				/>

				{/* Close Button */}
				{menuVisible && (
					<button
						onClick={handleCloseMenu}
						className="absolute top-[5vh] right-[6vw] text-white text-[7vh] cursor-pointer transition-all z-[101] choco"
					>
						X
					</button>
				)}

				{/* FAQ Content - shown when faq menu is active */}
				{activeMenu === "faq" && menuVisible && (
					<div className="absolute inset-0 px-[2vw] pt-[1vh] py-[3vh] bg-yellow-200/0 w-[55vw] h-[50vh] top-[10vh] left-[8vw] text-white overflow-y-auto z-[100]">
						<h2 className="text-[7vh] leading-[7vh] choco font-bold mb-6 text-white mt-8">
							Frequently Asked Questions
						</h2>
						<div className="space-y-6">
							<div>
								<h3 className="text-2xl font-semibold mb-2">
									How long do I need to survive?
								</h3>
								<p className="text-gray-300">
									Five hours. From 12 AM to 5 AM. Can you make it?
								</p>
							</div>
							<div>
								<h3 className="text-2xl font-semibold mb-2">
									What happens if I fail?
								</h3>
								<p className="text-gray-300">
									Let's just say... you don't want to find out.
								</p>
							</div>
							<div>
								<h3 className="text-2xl font-semibold mb-2">
									Can I save my progress?
								</h3>
								<p className="text-gray-300">
									The night is long, but there are no checkpoints. Stay alert.
								</p>
							</div>
						</div>
					</div>
				)}

				{/* Learn More Content - shown when learn menu is active */}
				{activeMenu === "learn" && menuVisible && (
					<div className="absolute inset-0 px-[2vw] pt-[1vh] py-[3vh] bg-yellow-200/0 w-[55vw] h-[50vh] top-[10vh] left-[8vw] text-white overflow-y-auto z-[100]">
						<h2 className="text-[7vh] leading-[7vh] choco font-bold mb-6 text-white mt-8">
							Learn More
						</h2>
						<div className="space-y-4">
							<p className="text-gray-300">
								Welcome to the ultimate survival horror experience. Five Hours
								at Freddy's puts you in the shoes of a night security guard at
								Freddy Fazbear's Pizza.
							</p>
							<p className="text-gray-300">
								Use your monitors to keep track of the animatronics. They become
								more active as the night progresses. Conserve power wisely - if
								you run out, you're in the dark.
							</p>
							<p className="text-gray-300">
								Listen carefully for sounds in the vents. Check your cameras
								frequently. And whatever you do... don't fall asleep.
							</p>
						</div>
					</div>
				)}
			</div>

			{/* AUDIO */}
			<audio
				ref={audioRef}
				src="/sounds/forbidden-nocturne.mp3"
				loop
				playsInline
				preload="auto"
			/>
			<audio ref={clickRef} src="/sounds/mouse-click.mp3" preload="auto" />

			{/* SCREEN OVERLAY */}
			{started && (
				<div className="z-80">
					<div onClick={() => handleMenuClick("learn")} className="">
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
					<div onClick={() => handleMenuClick("faq")} className="">
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

					<h1 className="heref text-[10vh] leading-[10vh] text-white absolute top-[2vh] left-[2vw] z-80">
						Five Hours <br /> at Freddy's
					</h1>
					<h1 className="heref text-[10vh] leading-[10vh] text-white absolute bottom-[3vh] right-[2vw] z-80">
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
