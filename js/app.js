var sp = getSpotifyApi(1),
	models      = sp.require("sp://import/scripts/api/models"),
	views       = sp.require("sp://import/scripts/api/views"),
	ui          = sp.require("sp://import/scripts/ui"),
	player      = models.player,
	library     = models.library,
	application = models.application,
	playerImage = new views.Player(),
	appname     = document.location.href.replace('sp://', '').split('/')[0],
	appBaseUrl  = 'spotify:app:'+appname+':';

application.observe(models.EVENT.ARGUMENTSCHANGED, tabChanged);

models.session.observe(models.EVENT.STATECHANGED, function() {
	switch (models.session.state) {
		case 2:
			offlineMode();
			break;
		default:
			onlineMode()
	}
});

function offlineMode() {
	$("#content").fadeOut();
	$('#offline').fadeIn();
}

function onlineMode() {
	$("#content").fadeIn();
	$('#offline').fadeOut();
}

function tabChanged() {
	if(models.session.state == 2) return;

	args = '';
	for (var i = 0; i < models.application.arguments.length; i++) {
		args+= '/' + models.application.arguments[i];
	};

	// console.log("Tabs changed", models.application.arguments, "Running route", args);
	app.runRoute('get', args);
}

function loadCovers(section) {
	$(section+" .cover").each(function(i, item) {
		loadCover($(item).attr('rel'), {size:'medium'}, function(elm, target) {
			$(item).html(elm);
		});
	});
}

function loadSection(ctxt, id, tplFile, dataFile, cb) {
	if(!sections_loaded[id]) {
		if(dataFile) {
			ctxt.load(dataFile)
				.then(function(data) {
					ctxt.render(tplFile, data, function(rendered) {
						$("<div/>", {
							id: id,
							class: 'section',
							html: rendered
						}).appendTo("#content");

						// Spotify hooks
						loadCovers("#"+id);

						// Mark as done
						sections_loaded[id] = true;
					});
				});
			} else {
				ctxt.render(tplFile, function(rendered) {
					$("<div/>", {
						id: id,
						class: 'section',
						html: rendered
					}).appendTo("#content");

					// Spotify hooks
					loadCovers("#"+id);

					// Mark as done
					sections_loaded[id] = true;
				});
			}
	} else {
		$("#content #"+id).show();
	}
	if(cb) { cb(); }
}

app = $.sammy('#content', function() {

	sections_loaded = [];

    this.use('Mustache', 'html');

	this.get('home', function(ctxt) {
		
		loadSection(ctxt, "news", "/templates/home.html", "js/_example_data.json", function() {
		});

	});

	this.get('exampletab', function(ctxt) {

		loadSection(ctxt, "exampletab", "/templates/example_page.html", null, function() {
		});

	});

	this.get('exampletab/:deeplink', function(ctxt) {

		loadSection(ctxt, "exampletab_deeplink", "/templates/example_deeplink.html", null, function() {
		});

	});

	function hideAll(cb) {
		$("#content .section").hide(); cb();
	}

	this.around(hideAll);

});

$(document).ready(function() {
	app.run('/home');
});