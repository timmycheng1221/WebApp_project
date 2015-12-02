'use strict';

(function(exports) {

    var random_array = [1, 1, 1, 1, 1, 6, 6, 8, 8, 10, 10, 12, 12, 14, 14, 16, 17, 17, 17
                        ,17 ,17 ,22 ,22, 24, 24, 26, 26, 28, 28, 30, 30, 32];
    var chess = document.getElementsByClassName("back");
    var player1 = -1, player2 = -1;
    var turn = -1;
    var now_value = 0;
    var now_name = 0;
    var p1_point = 16, p2_point = 16;
    document.getElementById("restart").addEventListener("click", refresh);
    for (var i = 0; i < 32; i++) {
        chess[i].addEventListener("click", function () {
            if(this.value == -1) {
                var player_color = random();
                this.style.backgroundImage = "url('image/" + player_color + ".png')";
                this.style.backgroundColor = "";
                this.value = player_color;
                if(player1 == -1) {
                    player1 = Math.floor(player_color / 17);
                    player2 = 1 - player1;
                    if(player1 == 0) {
                        document.getElementById("p1").src = "image/p1-red.png";
                    }
                    else {
                        document.getElementById("p2").src = "image/p2-red.png";
                    }
                    turn = player2;
                }
                else {
                    turn = change_turn(turn);
                }
            }
            else if(Math.floor(this.value / 17) == turn) {
                now_value = this.value;
                now_name = this.name;
            }
            else if(now_value > 0 && Math.floor(this.value / 17) == (1 - turn)) {
                if(now_value % 16 == 6) {
                    if(attack2(now_name, this.name)) {
                        if(Math.floor(this.value / 17) == player1) {
                            p1_point--;
                        }
                        else {
                            p2_point--
                        }
                        chess[now_name].style.backgroundImage = "";
                        chess[now_name].style.backgroundColor = "transparent";
                        chess[now_name].style.borderRadius = "0px";
                        chess[now_name].value = -2;
                        this.style.backgroundImage = "url('image/" + now_value + ".png')";
                        this.value = now_value;
                        turn = change_turn(turn);
                    }
                }
                else {
                    if(attack1(this.name, this.value)) {
                        if(Math.floor(this.value / 17) == player1) {
                            p1_point--;
                        }
                        else {
                            p2_point--
                        }
                        chess[now_name].style.backgroundImage = "";
                        chess[now_name].style.backgroundColor = "transparent";
                        chess[now_name].style.borderRadius = "0px";
                        chess[now_name].value = -2;
                        this.style.backgroundImage = "url('image/" + now_value + ".png')";
                        this.value = now_value;
                        turn = change_turn(turn);
                    }
                }
                now_value = 0;
                now_name = 0;
            }
            else if(now_value > 0 && this.value == -2) {
                if(move(now_name, this.name)) {
                    chess[now_name].style.backgroundImage = "";
                    chess[now_name].style.backgroundColor = "transparent";
                    chess[now_name].style.borderRadius = "0px";
                    chess[now_name].value = -2;
                    this.style.backgroundImage = "url('image/" + now_value + ".png')";
                    this.style.borderRadius = "29px";
                    this.value = now_value;
                    turn = change_turn(turn);
                }
                now_value = 0;
                now_name = 0;
            }
            if(p1_point == 0) {
                if(window.confirm("玩家二獲勝！是否再來一局？")){
                    refresh();
                }
            }
            else if(p2_point == 0) {
                if(window.confirm("玩家一獲勝！是否再來一局？")) {
                    refresh();
                }
            }
            if(player1 == turn ) {
                document.getElementById("p1").style.border = "2px black solid";
                document.getElementById("p2").style.border = "2px white solid";
            }
            else {
                document.getElementById("p1").style.border = "2px white solid";
                document.getElementById("p2").style.border = "2px black solid";
            }
        });
    }
    function random() {
        var num = Math.floor((Math.random() * random_array.length));
        var temp = random_array[num];
        random_array.splice(num, 1);
        return temp;
    }
    function change_turn(turn) {
        return 1 - turn;
    }
    function pk(p1, p2) {
        if (p1 % 16 == 6) {
            return true;
        }
        else if ((p1 % 16 == 1) && (p2 % 16 == 0)) {
            return true;
        }
        else if((p1 % 16 == 0) && (p2 % 16 != 1)) {
            return true;
        }
        else if((p1 % 16) >= (p2 % 16)) {
            return true;
        }
        else {
            return false;
        }
    }
    function attack1(rival_name, rival_value) {
        if(now_name - rival_name == 4 || now_name - rival_name == -4 || now_name - rival_name == 1 || now_name - rival_name == -1) {
            if(pk(now_value, rival_value)) {
                return true;
            }
        }
    }
    function attack2(me_name, rival_name) {
        var count = 0;
        var high, low;
        if(me_name > rival_name) {
            high = me_name;
            low = rival_name;
        }
        else {
            high = rival_name;
            low = me_name;
        }
        if((high - low) % 4 == 0) {
            for (var i = high - 4; i > low; i -= 4) {
                if (chess[i].value != "-2") {
                    count++;
                }
            }
        }
        else if((high - low) < 4) {
            for (var j = high - 1; j > low; j--) {
                if (chess[j].value != "-2") {
                    count++;
                }
            }
        }
        if(count == 1) {
            return true;
        }
        else {
            return false;
        }
    }
    function move(now, next) {
        if(now - next == 4 || now - next == -4 || now - next == 1 || now - next == -1) {
            return true;
        }
    }
    function refresh() {
        window.location.reload();
    }

})(window);



