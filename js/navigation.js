$( document ).ready(function() {

	$("a[href^=#]").hover(
	function () {
		$("#cube").addClass("hover-"+ $(this).attr('class'));
	},
	function () {
		$("#cube").removeClass("hover-"+ $(this).attr('class'));
	}
	);

	$(window).hashchange(function(e) {
		navigate();
	});

	function navigate() {
		target = window.location.hash.substr(1);
		if (target === "play") {
			$("#cube").attr("class","rotate-game");
			$("body").addClass("playing");
		}
		else if (target === "pause") {
			$("#cube").attr("class","rotate-game");
			$("body").removeClass("playing");
		}
		else {
			$("body").removeClass("playing");
			$("#cube").attr("class","rotate-" + target);
		}
	}

	navigate();
});