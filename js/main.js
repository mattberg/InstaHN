;(function(window, document, $, undefined) {
	
	var instapaperUsername;

	chrome.storage.sync.get(['instapaperUsername'], function(items) {
		if (items.instapaperUsername) {
			instapaperUsername = items.instapaperUsername;
		}
	});

	chrome.storage.onChanged.addListener(function(changes, namespace) {
		instapaperUsername = changes.instapaperUsername.newValue;
	});
	
	$('td.title').each(function() {

		var td = $(this),
			link = td.children('a:first'),
			url = link.attr('href'),
			comhead = td.children('.comhead'),
			instahn = $('<span>').addClass('instahn-readlater').data('url', url).text('Read Later');

		if (comhead.length > 0) {
			comhead.after(instahn);
		} else {
			link.after(instahn.addClass('instahn-readlater-afterlink'));
		}

		instahn.on('click', function(e) {
			
			if (instapaperUsername) {

				var message = $('<span>').addClass('instahn-readlater-message').text('Saving...');
				instahn.after(message);

				$.ajax({
					type: 'GET',
					url: 'https://www.instapaper.com/api/add',
					data: {
						url: url,
						username: instapaperUsername
					},
					success: function(data) {
						console.log(data);
						message.addClass('instahn-readlater-message-success').text('Saved.');
						setTimeout(function() {
							message.fadeOut('normal', function() {
								message.remove();
							});
						}, 750);
					},
					error: function(data) {
						console.log(data);
						message.addClass('instahn-readlater-message-error').text('Error.');
						setTimeout(function() {
							message.fadeOut('normal', function() {
								message.remove();
							});
						}, 750);
					}
				});

			} else {

				alert('Please set your Instapaper username in the InstaHN options.');

			}

		});

	});
	
})(window, document, jQuery);