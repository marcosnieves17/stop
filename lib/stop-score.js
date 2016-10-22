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
            // console.log('========');
            var duplicate = false;
            // console.log('Player: ' + p_index);
            // console.log('Key: ' + key);
            // console.log('========');

            for (var i = 0; i < sub.length; i++) {  //itero por todos mis hermanos jugadores

                if (p_index !== i && play.subs[key]) { // detecta que no soy yo
                    // console.log("Check: " + key + " - " + p_index + " vs " + i + " - " + play.subs[key] + " " + sub[i].subs[key]);

                    if (play.subs[key] === sub[i].subs[key]) { //verifica si el key existe
                        // console.log("same");
                        duplicate = true;
                    }
                    else {
                        // console.log("diff");
                    }
                }
            }
            if (duplicate) {
                // console.log('+5 for: ' + p_index);
                setScore(p_index, 5);
            }
            else {
                // console.log('+10 for: ' + p_index);
                setScore(p_index, 10);
            }
            // console.log('========\n');
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