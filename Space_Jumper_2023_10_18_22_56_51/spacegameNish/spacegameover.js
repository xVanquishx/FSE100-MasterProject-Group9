function spacegameover(){

    let highscore = 0;


    this.setup = function (){
        background(0);
    }

    this.draw = function (){
        if(difficulty == 1){
            if(score > gameScores[2][0]){
                gameScores[2][0] = score
            }
                highscore = gameScores[2][0];
        } else if(difficulty == 2){
            if(score > gameScores[2][1]){
                gameScores[2][1] = score
            }
                highscore = gameScores[2][1];
        } else if(difficulty == 3){
            if(score > gameScores[2][2]){
                gameScores[2][2] = score
            }
                highscore = gameScores[2][2];
        }
        background(0);
        fill(255);
        text(`Game Over\nYour score: ${score}\nHigh score: ${highscore}`, width / 2, height / 2 - height/8);
        drawButton(width / 2 - width/10, 'Replay');
        drawButton(2* width / 15, 'Home');
        if (difficulty < 3) drawButton(width - (5*width / 15), 'Next');
               
        
    }

    function drawButton(x, label) {
        fill(0, 0, 0);
        rect(x, height / 2 + height/32, width/6, height/16);
        fill(255);
        text(label, x + 60, height / 2 + 40);
    }

    this.mouseClicked = function() {
        if (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
            mgr.showScene(spacegame);
        } 
        //Next button is clicked (only if level < 3)
        else if (difficulty < 3 && mouseX > width / 2 + 80 && mouseX < width / 2 + 200 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
            difficulty++;
            mgr.showScene(spacegame);
        }
        //Check if Home button is clicked
        else if (mouseX > width / 2 - 200 && mouseX < width / 2 - 80 && mouseY > height / 2 + 20 && mouseY < height / 2 + 60) {
            mgr.showScene(mainmenu);
        }
    }
}