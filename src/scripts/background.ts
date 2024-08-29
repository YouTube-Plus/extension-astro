/* This is the background script, also known as the service worker. */

chrome.runtime.onInstalled.addListener((state) => {
	if (state.reason === 'install') {
		chrome.storage.sync.set({
			exact_frame: true,
			test: false
		});

		console.log(
			'%cYouTube+',
			`background: #7A0818; color: #fff; padding: 4px; border-radius: 2px;`,
			"Extension Settings have been set to default values."
		);

		console.log(
			'%cYouTube+',
			`background: #7A0818; color: #fff; padding: 4px; border-radius: 2px;`,
			"has been installed!"
		);
	}
});

console.log(
	'%cYouTube+',
	`background: #7A0818; color: #fff; padding: 4px; border-radius: 2px;`,
	"background script is running."
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);  
});