require(['jquery-1.8.0.min', 'underscore-min'], function() {
	$(function() {
		$('button.get-email').click(function() {
			var a = document.createElement('a');
			a.href = "m1a2i3l4t5o6:7s8t9e0v1e2n3@4s5t6h7u8r9l0o1w2.3c4o5m6";
			a.href = a.href.replace(/\d/g, '');
			$(a).text(a.href.replace('mailto:', ''));
			$(this).replaceWith(a);
		});

		var defaultText = "Take some notes here, to print for the interview or forward to Steven";
		$notes = $('article.notes');
		
		var resetNotes = function() {
			$notes.find('section').remove();
			$('textarea').each(function(i, textarea) {
				appendNote(textarea);
			});
			if ($notes.find('section').length > 0)
				$notes.show();
			else
				$notes.hide();
		};

		var appendNote = function(textarea) {
			var $textarea = $(textarea);
			if ($textarea.val() != defaultText) {
				var section = document.createElement('section');
				var sectionName = $textarea.parent().prev('h2, h3').text();
				$('<h4/>')
					.text(sectionName)
					.appendTo(section);
				$('<p/>')
					.text($textarea.val())
					.appendTo(section);
				$(section)
					.appendTo($notes);
			}
		};

		var insertNotesSection = function(target, text) {
			require(['text!notetaker.htm!strip'], function(notetaker) {
				$(notetaker)
					.insertAfter(target)
					.find('textarea')
					.click(function() {
						if ($(this).val() == defaultText) {
							$(this).val("");
						}
					})
					.blur(function() {
						if ($(this).val() == "" || $(this).val() == defaultText) {
							delete localStorage[$(target).text()];
							$(this).val(defaultText);
						}
						else {
							localStorage[$(target).text()] = $(this).val();
							$(target).next('textarea')
							resetNotes();
						}
					});
				if (text) {
					$(target).parent().find('textarea').val(text);
					appendNote($(target).parent().find('textarea'));
				}

			});
		};

		$('h2:not(.no-notetaker), h3:not(.no-notetaker)').each(function(i, h) {
			if (localStorage[$(h).text()]) {
				insertNotesSection(h, localStorage[$(h).text()]);
			}
			else {
				$(h).click(_.once(function() { insertNotesSection(h) }));
			}
		});

		$('button.send-email').click(function() {
			var content = "Hello Steven,\n\nI have the following questions regarding your résumé:\n\n";
			$('textarea').each(function(i, textarea) {
				var $textarea = $(textarea);
				if ($textarea.val() == "" || $textarea.val() == defaultText) return;

				content += $textarea.closest('section').find('h2, h3').text() + ":\n";
				content += $textarea.val() + "\n\n";
			});
			content += "Regards,\nAn Interested Party\n";
			content = encodeURIComponent(content);
			var href = "mailto:steve" + "n@sthur" + "low.com?subject=Résumé%20Questions&body=" + content;
			window.open(href, "email");
		});
	});
});
