function handle_followers(data) {
    for (var i in data) add_player(data[i]);
}

function add_player(data) {
    ('score' in data) ? create_row(data) : $.ajax({url:'/' + data.user + '/stats', success:create_row});
}

function create_row(data) {
    var user = data.user;
    var score = data.stats.score;

    var board = document.getElementById('scoreboard');
    var new_row = document.createElement('div');
    new_row.className = 'player';
    new_row.setAttribute('data-name', user);
    new_row.setAttribute('data-score', score);

    var name_div = document.createElement('div');
    name_div.className = 'score';
    name_div.innerHTML = '<h3>' + user + '</h3>';
    new_row.appendChild(name_div);

    var score_div = document.createElement('div');
    score_div.className = 'score';
    score_div.innerHTML = score;
    score_div.setAttribute('data-score', score);
    new_row.appendChild(score_div);

    var rows = board.getElementsByClassName('player');
    for ( var i = 0 ; i < rows.length ; i++ ) {
        if (parseInt(rows[i].getAttribute('data-score')) > score)
            continue;
        board.insertBefore(new_row, rows[i]);
        return;
    }
    board.appendChild(new_row);
}

$(document).ready(function(){
    var player_one = '<%= @player_one %>';
    add_player({user: player_one});
    $.ajax({url:'/<%= @player_one %>/following', success:handle_followers});
});

