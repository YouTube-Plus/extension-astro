/* This file is your content script. */

function startup(video: HTMLVideoElement) {
	console.log('Starting up');
	var ad_overlay = document.querySelector('.ytp-ad-module') as HTMLElement; 

	setInterval(() => {
		console.clear();
		console.group(
			'%cYouTube+ Video Statistics',
			`background: #7A0818; color: #fff; padding: 4px; border-radius: 2px;`
		);
	
		console.group(
			'%cYouTube+ HTML Elements',
			`background: #7A0818; color: #fff; padding: 4px; border-radius: 2px;`
		);
	
			console.log(
				'%cVideo Player',
				`background: #7A0818; color: #fff; padding: 4px; border-radius: 2px;`,
				video
			);

		console.group(
			'%cYouTube+ Video Properties',
			`background: #7A0818; color: #fff; padding: 4px; border-radius: 2px;`
		);

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
	
		console.groupEnd();
		console.groupEnd();
		console.groupEnd();
	}, 1000);;
}

function convert_timestamp(timestamp: number) {
    let [seconds, milliseconds] = timestamp.toFixed(3).split('.');
    let hours = Math.floor(parseInt(seconds, 10) / 3600);
    let minutes = Math.floor((parseInt(seconds, 10) - hours * 3600) / 60);
    let remaining_seconds = parseInt(seconds, 10) % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remaining_seconds.toString().padStart(2, '0')}.${milliseconds.padEnd(3, '0')}`;
    } else {
        return `${minutes}:${remaining_seconds.toString().padStart(2, '0')}.${milliseconds.padEnd(3, '0')}`;
    }
}

function exact_frame(video: HTMLVideoElement, enabled: boolean) {
	if (enabled === true) {
		setInterval(() => {
			var current_time = document.querySelector('.ytp-time-current') as HTMLElement;
			var duration = document.querySelector('.ytp-time-duration') as HTMLElement;

			current_time.textContent = convert_timestamp(video.currentTime);
			duration.textContent = convert_timestamp(video.duration);
		});
	}
}

function ad_detection(ad_overlay: HTMLElement) {
	return ad_overlay.hasChildNodes() ? true : false;
}

document.addEventListener('yt-navigate-finish', function() {
	let url = new URL(document.URL);

	if (url.hostname == 'www.youtube.com') {
		if (url.pathname == '/watch') {
			const video = document.querySelector('.html5-main-video') as HTMLVideoElement;
			startup(video);
			chrome.storage.sync.get(['exact_frame'], (result) => {
				exact_frame(video, result.exact_frame)
			});
		}
	}
});

console.log('Content script loaded');