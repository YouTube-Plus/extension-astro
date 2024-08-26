/* This is the background script, also known as the service worker. */

chrome.runtime.onInstalled.addListener((state) => {
	if (state.reason === 'install') {
		chrome.storage.sync.set({
			exact_frame: true,
			test: false
		});

		chrome.storage.sync.get(['exact_frame', 'test']).then((result) => {
			console.log('[YouTube+]: Exact frame is', result.exact_frame);
			console.log('[YouTube+]: Test is', result.test);
		});

		console.log('[YouTube+]: Extension installed!');
	}
});

console.log('[YouTube+]: Background script loaded');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);  
});