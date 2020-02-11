
const version = 2.6;
let CACHENAME = `guessthecolor-${version}` ;

var filesToCache = [
    'game.html',
    'resources/css/style.css',
    'resources/script/script.js',
    'resources/assets/wrong.svg',
    'resources/assets/correct.svg'
    
];

self.addEventListener("install",function(event){
	event.waitUntil(
		caches.open(CACHENAME).then(function(cache){
			cache.addAll(filesToCache)

		}))
})

var doesRequestAcceptHtml = function (request) {
    return request.headers.get('Accept')
        .split(',')
        .some(function (type) { return type === 'text/html'; });
};

self.addEventListener('fetch', function (event) {
    var request = event.request;
    if (doesRequestAcceptHtml(request)) {
        event.respondWith(
            fetch(request)
                .catch(function () {
                    return caches.match('game.html');
                })
        );
    } else {
        event.respondWith(
            caches.match(request)
                .then(function (response) {
                    return response || fetch(request);
                })
        );
    }
});