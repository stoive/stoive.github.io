require.ready(function(){
	require(["views/checkin", "views/tweet", "views/blog", "models/checkin", "models/tweet", "models/blog"], function(checkinView, tweetView, blogView, checkinModel, tweetModel, blogModel) {
		//document.body.appendChild(tweetView.el);
		//document.body.appendChild(checkinView.el);
		//document.body.appendChild(blogView.el);
		/*
		var tweets = new tweetModel.TweetCollection([
			new tweetModel.Tweet({
				name: "stoive",
				time: new Date().toUTCString(),
				location: "Sydney, Australia",
				content: "Live twitter feed coming soon",
				link: "http://twitter.com/stoive"
			})
		]);
		*/
		var checkins = new checkinModel.CheckinCollection();
		var blogs = new blogModel.BlogCollection();
		var tweets = new tweetModel.TweetCollection();

		var tv = new tweetView({model: tweets});
		var bv = new blogView({model: blogs});
		var cv = new checkinView({model: checkins});
		
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

		document.body.appendChild(tv.el);
		document.body.appendChild(bv.el);
		document.body.appendChild(cv.el);

		tv.render();
		bv.render();
		cv.render();
	});
});
