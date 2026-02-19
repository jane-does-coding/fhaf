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
			{/* Main Background - Monitors (after start) */}
			<img
				src="/imgs/main-bg-monitors.png"
				className={`absolute inset-0 z-[1] w-[100vw] h-[90vh] object-fill transition-opacity duration-700  ${
					started ? "opacity-100" : "opacity-0"
				}`}
			/>
			<img
				src="/imgs/animatronic.webp"
				className={`absolute inset-0 z-[80] w-[17vw] h-[20vh] top-[80vh] left-[5vw] hover:scale-[107%] cursor-pointer transition-all ease-in-out object-fill duration-300 ${
					started ? "opacity-100" : "opacity-0"
				}`}
			/>
			<div
				className={`absolute inset-0 z-[1] w-[100vw] h-[20vh] top-[80vh] object-fill transition-opacity duration-700 bg-linear-to-b from-10% from-black/70 to-black  ${
					started ? "opacity-100" : "opacity-0"
				}`}
			></div>

			{/* Bottom Monitor */}
			<div
				className={`absolute w-[45vw] h-[77vh] left-[3vw] top-[62.5vh] translate-y-[-50%] transition-all duration-600 ease-in-out z-99 ${
					started ? "opacity-100" : "opacity-0"
				} ${
					menuVisible && activeMenu == "faq"
						? "translate-y-0"
						: "translate-y-full"
				}`}
			>
				{/* Bottom Monitor Image */}
				<img
					src="/imgs/monitor-bottom.webp"
					className="w-full h-full object-fill absolute inset-0 drop-shadow-2xl drop-shadow-neutral-600/40"
				/>

				{/* Close Button */}
				{menuVisible && (
					<button
						onClick={handleCloseMenu}
						className="absolute top-[16vh] right-[6vw] text-white text-[5vh] leading-[5vh] cursor-pointer transition-all z-[101] choco"
					>
						X
					</button>
				)}

				{/* FAQ Content */}
				{activeMenu === "faq" && menuVisible && (
					<div className="absolute inset-0 px-[2vw] pt-[1vh] py-[3vh] bg-blue-400/0 w-[26vw] h-[41vh] top-[21vh] left-[13.5vw] text-white overflow-y-auto z-[100]">
						<h2 className="text-[7vh] leading-[7vh] choco font-bold mb-6 text-white mt-8">
							Frequently Asked Questions
						</h2>
						<div className="space-y-6">
							<div>
								<h3 className="text-2xl font-semibold mb-2">
									Here is some question!
								</h3>
								<p className="text-gray-300">
									And here is an answer for that one random question
								</p>
							</div>
							<div>
								<h3 className="text-2xl font-semibold mb-2">
									Here is another one fo the questions
								</h3>
								<p className="text-gray-300">
									And here another one of the possible answer for that one
									random question
								</p>
							</div>
							<div>
								<h3 className="text-2xl font-semibold mb-2">
									Here is some question!
								</h3>
								<p className="text-gray-300">
									And here is an answer for that one random question
								</p>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Side Monitor Container */}
			<div
				className={`absolute w-[70vw] h-[70vh] left-[30vw] top-[50vh] translate-y-[-50%] transition-all duration-600 ease-in-out z-99 ${
					started ? "opacity-100" : "opacity-0"
				} ${
					menuVisible && activeMenu == "learn"
						? "translate-x-0"
						: "translate-x-full"
				}`}
			>
				{/* Side Monitor Image */}
				<img
					src="side-monitor.webp"
					className="w-full h-full object-fill absolute inset-0 drop-shadow-2xl drop-shadow-neutral-600/40"
				/>

				{/* Close Button */}
				{menuVisible && (
					<button
						onClick={handleCloseMenu}
						className="absolute top-[6vh] right-[6vw] text-white text-[7vh] cursor-pointer transition-all z-[101] choco"
					>
						X
					</button>
				)}

				{/* Learn More Content */}
				{activeMenu === "learn" && menuVisible && (
					<div className="absolute inset-0 px-[2vw] pt-[1vh] py-[3vh] bg-yellow-200/0 w-[55vw] h-[50vh] top-[10vh] left-[8vw] text-white overflow-y-auto z-[100]">
						<h2 className="text-[7vh] leading-[7vh] choco font-bold mb-6 text-white mt-8">
							Learn More
						</h2>
						<div className="space-y-4">
							<p className="text-gray-300">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								vel sapien eget Lorem100 metus efficitur commodo. Sed at nunc ac
								nisl convallis tincidunt. In hac habitasse platea dictumst.
							</p>
							<p className="text-gray-300">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								vel sapien eget Lorem100 metus efficitur commodo. Sed at nunc ac
								nisl convallis tincidunt. In hac habitasse platea dictumst. Sed
								at nunc ac nisl convallis tincidunt. In hac habitasse platea
								dictumst. In hac habitasse platea dictumst. Sed at nunc ac nisl
								convallis tincidunt. In hac habitasse platea dictumst.
							</p>
							<p className="text-gray-300">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								vel sapien eget Lorem100 metus efficitur commodo. Sed at nunc ac
								nisl convallis tincidunt. In hac habitasse platea dictumst. Sed
								at nunc ac nisl convallis tincidunt. In hac habitasse platea
								dictumst.
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Middle Monitor Container */}
			<div
				className={`absolute w-[37.5vw] h-[50vh] left-[30vw] top-[75vh] translate-y-[-50%] transition-all duration-600 ease-in-out z-99 ${
					started ? "opacity-100" : "opacity-0"
				} ${
					menuVisible && activeMenu == "help"
						? "translate-y-0"
						: "translate-y-full"
				}`}
			>
				{/* Middle Monitor Image */}
				<img
					src="/imgs/monitor-middle.png"
					className="w-full h-full object-fill absolute inset-0"
				/>

				{/* Close Button */}
				{menuVisible && (
					<button
						onClick={handleCloseMenu}
						className="absolute top-[10vh] right-[5vw] text-white text-[6vh] cursor-pointer transition-all z-[101] choco"
					>
						X
					</button>
				)}

				{/* Contact Content */}
				{activeMenu === "help" && menuVisible && (
					<div className="absolute inset-0 px-[1vw] pt-[1vh] py-[3vh] bg-yellow-200/0 w-[17vw] h-[26vh] top-[15vh] left-[11vw] text-white overflow-y-auto z-[100] flex flex-col items-center justify-center">
						<h2 className="text-[4.5vh] leading-[4.5vh] choco font-bold mb-[2vh] text-white mt-[1vh] text-center">
							Contact
						</h2>
						<div className="space-y-4">
							<p className="text-gray-300 text-[1.75vh]">
								Slack contact @Jane or check out #fhaf in Slack
							</p>
							<p className="text-gray-300 text-[1.75vh]">
								Or you can also contact by email here someone@gmail.com
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Audio */}
			<audio
				ref={audioRef}
				src="/sounds/forbidden-nocturne.mp3"
				loop
				playsInline
				preload="auto"
			/>
			<audio ref={clickRef} src="/sounds/mouse-click.mp3" preload="auto" />

			{/* Monitor Screens */}
			{started && (
				<div className="z-80">
					<div onClick={() => handleMenuClick("learn")} className="group">
						<img
							src="/imgs/learn-more.png"
							className="z-80 absolute right-[18.5vw] w-[28.5vw] h-[45vh] top-[18.5vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer group-hover:blur-xl"
						/>
						<img
							src="/imgs/learn-more.png"
							className="z-80 absolute right-[18.5vw] w-[28.5vw] h-[45vh] top-[18.5vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer"
						/>
					</div>
					<div onClick={playClick} className="group">
						<img
							src="/imgs/submit.png"
							className="z-80 absolute left-[29.75vw] w-[10.5vw] h-[13.5vh] top-[52vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer group-hover:blur-lg"
						/>
						<img
							src="/imgs/submit.png"
							className="z-80 absolute left-[29.75vw] w-[10.5vw] h-[13.5vh] top-[52vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer"
						/>
					</div>
					<div onClick={() => handleMenuClick("faq")} className="group">
						<img
							src="/imgs/faq.png"
							className="z-80 absolute left-[29.5vw] w-[10.25vw] h-[19.5vh] top-[26vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer group-hover:blur-lg"
						/>
						<img
							src="/imgs/faq.png"
							className="z-80 absolute left-[29.5vw] w-[10.25vw] h-[19.5vh] top-[26vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer"
						/>
					</div>
					<a
						href="https://hackclub.enterprise.slack.com/archives/C0AGPCVQDMW"
						className="group"
					>
						<img
							src="/imgs/slack.png"
							className="z-80 absolute left-[40.5vw] w-[10.75vw] h-[26vh] top-[47.25vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer group-hover:blur-lg"
						/>
						<img
							src="/imgs/slack.png"
							className="z-80 absolute left-[40.5vw] w-[10.75vw] h-[26vh] top-[47.25vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer"
						/>
					</a>
					<div onClick={() => handleMenuClick("help")} className="group">
						<img
							src="/imgs/help.png"
							className="z-80 absolute left-[19vw] w-[9vw] h-[16vh] top-[29.25vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer group-hover:blur-lg"
						/>
						<img
							src="/imgs/help.png"
							className="z-80 absolute left-[19vw] w-[9vw] h-[16vh] top-[29.25vh] hover:scale-[100%] transition-all ease-in-out cursor-pointer"
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

			{/* Intro Screen */}
			{!started && (
				<div className="absolute inset-0 z-10 flex items-center justify-center">
					{/* background image */}
					<img
						src="/img1.png"
						className="absolute inset-0 w-full h-[101vh] object-cover"
					/>

					{/* dark overlay */}
					<div className="absolute inset-0 bg-black/0" />

					{/* content */}
					<div className="relative z-20 flex flex-col items-center gap-6 text-white">
						<h1 className="text-[12vh] font-semibold tracking-wide choco ">
							Can you make it?
						</h1>

						<button
							onClick={handleStart}
							className="px-8 py-3 text-lg bg-black text-white hover:scale-105 transition-transform"
						>
							Try It
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
