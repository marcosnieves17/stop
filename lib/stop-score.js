module.exports = function gameCalculator(sub){
    var scores = [];
    var keys = [];

    for (var p in sub[0].subs) {
        if (sub[0].subs.hasOwnProperty(p)) {
            keys.push(p);
        }
    }

    keys.forEach(function (key, key_index) { //iterando por cada key
        sub.forEach(function (play, p_index) { //sacando score de cada player
            var duplicate = false;
            for (var i = 0; i < sub.length; i++) {  //itero por todos mis hermanos jugadores
                if (p_index !== i && play.subs[key]) { // detecta que no soy yo
                    if (play.subs[key] === sub[i].subs[key]) { //verifica si el key existe
                        duplicate = true;
                    }
                }
            }
            if(!play.subs[key]){
                setScore(p_index, 0);
            }

            else if (duplicate) {
                setScore(p_index, 5);
            }
            else {
                setScore(p_index, 10);
            }
        });
    });

    function setScore(player, score) {
        if (!scores[player]) {
            sub[player].score = score;
            scores[player] = score;
        }
        else {
            sub[player].score += score;
        }
    }
   return sub;
};