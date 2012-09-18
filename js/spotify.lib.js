function loadCover(playlist, options, callback) {
	var css_size = typeof options == "undefined" || typeof options.size == "undefined" || options.size === false ? '' : 'sp-image-' + options.size,
	cover = typeof options == "undefined" || typeof options.cover == "undefined" || options.cover === false ? false : options.cover;
	if(playlist != undefined) {
		if(playlist.indexOf("spotify:album") >= 0) {
			var target = new models.Album.fromURI(playlist, function() {
				var playlistArt = new views.Player();
				playlistArt.context = target;
				playlistArt.image = cover || target.data.cover;
				playlistArt.node.className = 'sp-player sp-player-paused ' + css_size;
				if (callback) callback(playlistArt.node, target);
			});
		}

		if(playlist.indexOf("spotify:user") >= 0) {
			var target = new models.Playlist.fromURI(playlist);
			var playlistArt = new views.Player();
			// playlistArt.track = target.get(0);
			playlistArt.context = target;
			playlistArt.image = cover || target.data.cover;
			playlistArt.node.className = 'sp-player sp-player-paused ' + css_size;
			if (callback) callback(playlistArt.node, target);
		}
	} else {
		return '';
	}
}