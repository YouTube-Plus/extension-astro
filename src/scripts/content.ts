/* This file is your content script. */

function startup() {
	console.log('Starting up');
	var video = document.querySelector('.html5-main-video') as HTMLVideoElement;
	var ad_overlay = document.querySelector('.ytp-ad-module') as HTMLElement; 

	setInterval(() => {
		console.clear();
		console.log('Video found', video);
		console.log('Autoplay?', video.autoplay);
		console.log('Muted?', video.muted);
		console.log('Volume?', video.volume);
		console.log('Current time?', video.currentTime); 
		console.log('Duration?', video.duration);
		console.log('Paused?', video.paused);
		console.log('Ended?', video.ended);
		console.log('Seeking?', video.seeking);
		console.log('Buffered?', video.buffered);
		console.log('Loop?', video.loop);
		console.log('Playback rate?', video.playbackRate);
		console.log('AD?', ad_detection(ad_overlay));
	}, 1000);
}

function ad_detection(ad_overlay: HTMLElement) {
	return ad_overlay.childElementCount !== 0 ? true : false;
}

document.addEventListener('yt-navigate-finish', function() {
	let url = new URL(document.URL);

	if (url.hostname == 'www.youtube.com') {
		if (url.pathname == '/watch') {
			startup();
		}
	}
});

console.log('Content script loaded');