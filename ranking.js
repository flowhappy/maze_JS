function get_easy() {
  $("#mode_record").text("Easy Mode");
  $("#mode_record").css("color", '#8B864E');
  append_detail('record_easy', 'user_obj');
}

function get_normal() {
  $("#mode_record").text("Normal Mode");
  $("#mode_record").css("color", 'dimgrey');
  append_detail('record_normal', 'user_obj');
}

function get_hard() {
  $("#mode_record").text("Hard Mode");
  $("#mode_record").css("color", 'black');
  append_detail('record_hard', 'user_obj');
}

function append_detail(record_key, name_key) {
  $(".new_add").empty();
  $(".new_add1").empty();
  $(".new_add2").empty();
  $(".new_add3").empty();
  let get_record = JSON.parse(localStorage.getItem(record_key));
  if (get_record == null) {
    $(".content").css("display", "none");
    $(".message").css("display", "inherit");
    return;
  } else {
    $(".content").css("display", "inherit");
    $(".message").css("display", "none");
  }
  for (let i = 0; i < get_record.length; i++) {
    if (i >= 6) return;
    $("#record_rank").append('<div class="new_add">' + (i + 1) + '</div>');
    $("#record_name").append('<div class="new_add1">' + get_record[i].name + '</div>');
    $("#record_time").append('<div class="new_add2">' + get_record[i].time + '</div>');
    $("#record_count").append('<div class="new_add3">' + get_record[i].counts + '</div>');
  }
}

function sort_record(record_key) {
  let get_record=JSON.parse(localStorage.getItem(record_key));
  let t;
  for(let i=0;i<get_record.length-1;i++){
    for(let j=i+1;j<get_record.length;j++){
      //时间占7成，步数占3成
      let score_i=get_record[i].time*0.7+get_record[i].counts*0.3;
      let score_j=get_record[j].time*0.7+get_record[j].counts*0.3;
      if(score_i>score_j){
        t=get_record[i];
        get_record[i]=get_record[j];
        get_record[j]=t;
      }
    }
  }
  localStorage.setItem(record_key,JSON.stringify(get_record));
}