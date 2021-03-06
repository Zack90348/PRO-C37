class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();

    background("pink");

    result = createElement('h4');
    result.html("Correct Ans: 2.Envelope" );
    result.position(425,350);

    getPlayerInfo();

    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      text("*Note: Contestants who answered correct are highlighted in green color.");
    }

    for(var plr in allContestants){
      var correctAns = '2';
      if(correctAns === allContestants[plr].answer){
        fill("Green");
      }else{
        fill("red");
      }
    }
    
  }

}
