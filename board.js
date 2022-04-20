let get_name;
let get_time = 0;
let get_count;
let get_key = false;

let legal = false;

let id_record = [];
let index_idRecord = 0;

function check() {
  legal = false;
  get_name = $("#username").val();
  if (get_name.length <= 5) {
    legal = true
    $("#warn").css("visibility", "hidden")
  } else {
    $("#warn").css("visibility", "visible")
  }
}

function login() {
  if (legal) {
    $("#login").css('display', 'none');
    $("#username").css('display', 'none');
    $("#map").css('display', 'inherit');
    $("#close2").css('visibility', 'visible');
    $("#close3").css('visibility', 'visible');
    $("#title").css('visibility', 'visible');
    $("#name").text(get_name);
  }
}

function add_user() {
  let get_mode = JSON.parse(localStorage.getItem('key'));
  if (get_mode[0].mode == 'EASY') {
    add_detail('record_easy', easy_mode, get_time, get_count, get_name);
  } else if (get_mode[0].mode == 'NORMAL') {
    add_detail('record_normal', normal_mode, get_time, get_count, get_name);
  } else {
    add_detail('record_hard', hard_mode, get_time, get_count, get_name);
  }
}

function add_detail(key, array, get_time, get_count, get_name) {
  let test = JSON.parse(localStorage.getItem(key));
  if (test == null) {
    array.push({name: get_name, time: get_time, counts: get_count});
    localStorage.setItem(key, JSON.stringify(array));
  } else {
    array = JSON.parse(localStorage.getItem(key));
    array.push({name: get_name, time: get_time, counts: get_count});
    localStorage.setItem(key, JSON.stringify(array));
  }
  sort_record(key);
}

let isCalculate = false;
let first_move = false;

function get_red() {
  if (is_suspend) {
    alert('游戏已暂停');
    return;
  }
  let id = $(".way[name='red']").attr('id');
  move(id);
}

function move(id) {
  let next_id;
  let line = new String();
  let list = new String();
  let find = false;
  for (let i = 0; i < id.length; i++) {
    if (id[i] != '_' && !find) {
      line += id[i];
    }
    if (id[i] == '_') {
      find = true;
      continue;
    }
    if (find) {
      list += id[i];
    }
  }
  if (event.which === 39) {//向右走
    next_id = line + '_' + Number(Number(list) + 1);
    if (($("#" + next_id).attr('name') == 'out') && get_key) {
      let get_mode = JSON.parse(localStorage.getItem('key'));
      get_count = get_mode[0].count - Number($("#steps").text());
      alert('win');
      add_user();
      // window.location.assign('Liu_game_ranking.html')
      $("#time2").text(get_time + 'S');
      $("#step").text('STEPS: ' + get_count);
      show_steps('yellow');
      return;
    }
    if ($("#" + next_id).attr('class') != 'way') {
      return;
    }
  } else if (event.which === 37) {//向左走
    next_id = line + '_' + Number(Number(list) - 1);
    if ($("#" + next_id).attr('class') != 'way') {
      return;
    }
  } else if (event.which === 40) {//向下走
    next_id = Number(Number(line) + 1) + '_' + list;
    if ($("#" + next_id).attr('class') != 'way') {
      return;
    }
  } else if (event.which === 38) {
    next_id = Number(Number(line) - 1) + '_' + list;
    if ($("#" + next_id).attr('class') != 'way') {
      return;
    }
  } else {
    return;
  }
  id_record[index_idRecord++] = next_id;

  first_move = true;
  if (first_move && !isCalculate) {
    $("#time").text(++get_time + ' S');
    isCalculate = true;
    setInterval(function () {
      $("#time").text(++get_time + ' S');
    }, 1000)
  }

  if ($("#" + next_id).attr('value') == 'key') {
    get_key = true;
    $("div[value='nokey']").css('background-color', 'navajowhite');
    $("div[value='nokey']").css('background-image', 'none');
  }

  $("#" + id).css('background-color', 'navajowhite');
  $("#" + id).css('background', 'none');
  $("#" + id).attr('name', 'navajowhite');
  $("#" + (next_id)).css('background-color', 'red');
  $("#" + (next_id)).attr('name', 'red');

  $("#steps").text(--get_mode[0].count);
  if ($("#steps").text() < 0) {
    alert('you lose');
    $("#time2").text(get_time + 'S');
    $("#step").text('STEPS: FULL');
    show_steps('red');
  }

}

function home() {
  window.location.assign('Liu_game_main.html')
}

let is_suspend = false;
let suspend_time = 0;

function suspend() {
  if (!is_suspend) {
    suspend_time = get_time;
    is_suspend = !is_suspend;
    $("#stop").css("display", "inherit");
    $("#time").css("display", "none");
    $("#close2").text('▶')
  } else {
    is_suspend = !is_suspend;
    get_time = suspend_time;
    $("#stop").css("display", "none");
    $("#time").text(get_time);
    $("#time").css("display", "inherit");
    $("#close2").text('⏸')
  }
}

function show_steps(color) {
  is_suspend = true;
  $("#title").css('display', 'none');
  $("#close2").css('display', 'none');
  $("#close3").css('display', 'none');
  $("#title2").css('display', 'inherit');

  for (let j = 0; j < id_record.length; j++) {
    setInterval($("#" + id_record[j]).css('background-color', color), 500);
  }

}


function re_run() {
  // $("#show_steps").attr('disabled','true');

  let index2 = 0;
  let index3 = 0;

  for (let j = 0; j < id_record.length; j++) {
    setInterval($("#" + id_record[j]).css('background-color', 'navajowhite'), 500);
  }

  setInterval(function () {
    if (id_record[index2]) {
      $("#" + id_record[index2++]).css('background-color', 'yellow');
    }
    if (index2 - 1 != 0) {
      $("#" + id_record[index3++]).css('background-color', 'red');
    }
  }, 200);
  // $("#show_steps").attr('disabled','false');
}

function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
}

function push(element) {
  this.dataStore[this.top++] = element;
}

function pop() {
  return this.dataStore[--this.top];
}

function peek() {
  return this.dataStore[this.top - 1];
}


let instead = false;

function prompt() {
  let map_way = map.maps[index];
  let test_way = new Stack();
  let junction_record = new Stack();
  test_way.push({node: [1, 0]});
  let current_node;
  while (!(test_way.peek().node[0] == map_way.length - 2 && test_way.peek().node[1] == length2)) {
    let count = 0;
    if (!instead) {
      current_node = test_way.peek().node;
    }
    let up_node = [current_node[0] - 1, current_node[1]];
    let right_node = [current_node[0], current_node[1] + 1];
    let down_node = [current_node[0] + 1, current_node[1]];
    let left_node = [current_node[0], current_node[1] - 1];
    if (map_way[up_node[0]][up_node[1]] == 0) {
      count++;
    }
    if (map_way[right_node[0]][right_node[1]] == 0) {
      count++;
    }
    if (map_way[down_node[0]][down_node[1]] == 0) {
      count++;
    }
    if (map_way[left_node[0]][left_node[1]] == 0) {
      count++;
    }
    if (count > 1) {
      junction_record.push({selection: test_way.top - 1})
    }
    if (map_way[up_node[0]][up_node[1]] == 0) {
      test_way.push({node: [up_node[0], up_node[1]]});
      map_way[up_node[0]][up_node[1]] = -1;
      // $("#" + up_node[0] + '_' + up_node[1]).css('background-color', 'pink');
      instead = false;
      console.log('up');
    } else if (map_way[right_node[0]][right_node[1]] == 0) {
      test_way.push({node: [right_node[0], right_node[1]]});
      map_way[right_node[0]][right_node[1]] = -1;
      // $("#" + right_node[0] + '_' + right_node[1]).css('background-color', 'pink');
      instead = false;
      console.log('right');
    } else if (map_way[down_node[0]][down_node[1]] == 0) {
      test_way.push({node: [down_node[0], down_node[1]]});
      map_way[down_node[0]][down_node[1]] = -1;
      // $("#" + down_node[0] + '_' + down_node[1]).css('background-color', 'pink');
      instead = false;
      console.log('down');
    } else if (map_way[left_node[0]][left_node[1]] == 0) {
      test_way.push({node: [left_node[0], left_node[1]]});
      map_way[left_node[0]][left_node[1]] = -1;
      // $("#" + left_node[0] + '_' + left_node[1]).css('background-color', 'pink');
      instead = false;
      console.log('left');
    } else {
      // for (let i = 0; i < junction_record.dataStore.length; i++) {
      //   $("#" + test_way.dataStore[junction_record.dataStore[i].selection].node[0] +
      //     '_' + test_way.dataStore[junction_record.dataStore[i].selection].node[1]).css('background-color', 'red');
      // }
      test_way.top = junction_record.peek().selection + 1;
      let last_selection = test_way.dataStore[junction_record.pop().selection].node;
      console.log(last_selection);
      current_node = [last_selection[0], last_selection[1]];
      instead = true;
      // $("#" + current_node[0] + '_' + current_node[1]).css('background-color', 'green');
      console.log('no way');
      // break;
    }
  }
  console.log('ok');
  for (let i = 0; i < test_way.top; i++) {
    $("#" + test_way.dataStore[i].node[0] +
      '_' + test_way.dataStore[i].node[1]).css('background-image', 'url(maps/prompt_map.png)')
  }
}