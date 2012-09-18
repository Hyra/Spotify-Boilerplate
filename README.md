# Spotify Boilerplate

This Boilerplate project aims to provide a foundation upon which you can start building Spotify Apps. It takes away the hassle of writing the necessary boilerplate code and is structured so you can start developing straight away.

I will add to it as I stumble upon free time, but feel free to open a Pull Request or submit an issue for a suggestion

## Some of the features
- Small footprint
- Automatic Tab Handling
- Automatic Deeplink handling
- Automatic Cover Loading for playlists (mosaics)
- Online/offline status tracking and content switching

## How to set it up (on your Mac)

1) Sign up for a developer account on Spotify
2) Open Terminal, and if it doesn't exist yet `mkdir ~/Spotify`
3) cd ~/Spotify
4) git clone git@github.com:Hyra/Spotify-Boilerplate.git
5) Download the latest version of Spotify
6) Open Spotify and type `spotify:app:boilerplate` in the search bar

## What's in the Boilerplate

The aim is to keep the Boilerplate as clean as possible, while giving all the tools to quickly develop your app.

### How to work with it (the short version)

What you want to look for is `js/app.js`. Once index.html has been loaded by Spotify it will fire off our Sammy instance:

	$(document).ready(function() {
		app.run('/home');
	}); 

Here you can also handle any other bootstrapping you might want to do.

Next up, the Sammy route gets invoked:

	this.get('home', function(ctxt) {
		
		loadSection(ctxt, "news", "/templates/home.html", "js/_example_data.json", function() {
			// Callback actions
		});

	});

This is what you will most likely expand on for your app.
The route loads a Mustache template into the DOM, parses it, asynch-y fill in the Spotify details, and cache it.
After that it will run your callback actions, should you need to.

`loadSection` takes 5 parameters at the moment:
- ctxt - A reference to the `Sammy.Context` which was passed to the route
- ID - A unique identifier for the content which is used as a cache-key
- Template File - location to the Mustache template
- JSON Location - location to the JSON you want to use. This is useful if you want to connect your app with a (RESTful) web service to feed content to your app. NOTE: If you use absolute URLs here you should add the domains to your `manifest.json`
- Callback - This callback function you can use to do your post-processing

### Dependencies

The boilerplate relies on a couple of libraries:

Sammy.js for the routing, templating parsing and content swapping.
It's just an awesome little tool

jQuery as we've all become used to it at some point

Mustache as a template handler.
This can just as well be any of the other gazillion templating engines out there, so feel free to hack your favourite in.

### Roadmap

- Add more features/functionality regarding the Spotify API
- Make the loadSection and Sammy integration a bit more seamless and less explicit
- Spend more time documenting and writing how-to's