function easy() {
	mode.push({mode:'EASY',count:200});
	localStorage.setItem('key',JSON.stringify(mode));
	window.location.assign('Liu_game_management.html');
}

function normal() {
	mode.push({mode:'NORMAL',count:250});
	localStorage.setItem('key',JSON.stringify(mode));
	window.location.assign('Liu_game_management.html')
}

function hard() {
	mode.push({mode:'HARD',count:350});
	localStorage.setItem('key',JSON.stringify(mode));
	window.location.assign('Liu_game_management.html')
}

function home() {
	window.location.assign('Liu_game_main.html');
}
