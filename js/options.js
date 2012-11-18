;(function(window, document, $, undefined) {

	chrome.storage.sync.get(['instapaperUsername'], function(items) {
		if (items.instapaperUsername) {
			$("#instapaper-username").val(items.instapaperUsername);
		}
	});

	$("#save").click(function(e) {
	
		var instapaperUsername = $("#instapaper-username").val();
		
		chrome.storage.sync.set({ 'instapaperUsername': instapaperUsername }, function() {
			// Notify that we saved.
			var message = $("<div>").addClass("message").html("Options saved.");
		
			$("#main").prepend(message);
			
			setTimeout(function() {
				message.fadeOut('normal', function() {
					message.remove();
				});
			}, 750);
		});
		
	});
	
})(window, document, jQuery);