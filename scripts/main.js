require.ready(function(){
	require([
		"views/checkin",
		"views/tweet",
		"views/blog", 
		"views/footer",
		"models/checkin",
		"models/tweet",
		"models/blog",
		"models/lastfm"], function(
		checkinView,
		tweetView,
		blogView,
		footerView,
		checkinModel,
		tweetModel,
		blogModel,
		lastfmModel
		) {
		var checkins = new checkinModel.CheckinCollection();
		var blogs = new blogModel.BlogCollection();
		var tweets = new tweetModel.TweetCollection();
		var songs = new lastfmModel.LastFmCollection();

		var tv = new tweetView({model: tweets});
		var bv = new blogView({model: blogs});
		var cv = new checkinView({model: checkins});
		var lv = new footerView({model: songs});

		checkins.bind('refresh', function() {
			cv.render();
		});
		checkins.fetch();
		
		blogs.bind('refresh', function() {
			bv.render();
		});
		blogs.fetch();
		
		tweets.bind('refresh', function() {
			tv.render();
		});
		tweets.fetch();

		songs.bind('refresh', function() {
			lv.render();
		});

		document.body.appendChild(tv.el);
		document.body.appendChild(bv.el);
		document.body.appendChild(cv.el);
		document.body.appendChild(lv.el);

		tv.render();
		bv.render();
		cv.render();
		lv.render();

		var socket = new io.Socket(); 
		socket.on('message', function(e) {
			if (e.update) {
				if (e.update === "/feeds/twitter") {
					tweets.fetch();
				}
				else if (e.update === "/feeds/blog") {
					blogs.fetch();
				}
				else if (e.update === "/feeds/github") {
					checkins.fetch();
				}
				else if (e.update === "/feeds/lastfm") {
					songs.fetch();
				}
			}
		});socket.connect();
		
	});
});
