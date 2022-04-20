function Start() {
	window.location.assign('Liu_game_selection.html');
}

function Ranking() {
	window.location.assign('Liu_game_ranking.html');
}

function Instruction() {
	$("button").css("display", "none");
	$("#inf").css("display", "inline");
	$("#close").css("display", "inline");
}

function get_back() {
	$("button").css("display", "inline");
	$("#inf").css("display", "none");
	$("#close").css("display", "none");
}