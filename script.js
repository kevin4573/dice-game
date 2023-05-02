'use strict';

//Selecting Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Id = document.getElementById('score--0');
const score1Id = document.getElementById('score--1');
const current0Id = document.getElementById('current--0');
const current1Id = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Selecting functionality
const switchPlayer = function(){
  //Switch to next player 
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; 
 player0.classList.toggle('player--active');
 player1.classList.toggle('player--active');
}
let scores, currentScore, activePlayer, playing;
//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Id.textContent = 0;
  score1Id.textContent = 0;
  current0Id.textContent = 0;
  current1Id.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
//Rolling dice functionality

btnRoll.addEventListener('click', function() {

  if (playing) {
    //Generating dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    
    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //Check for rolled 1
    if(dice !== 1){
    //Add dice to current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
      switchPlayer();
    }
}
});

btnHold.addEventListener('click', function(){

  if (playing){

  scores[activePlayer] += currentScore; 
  // scores[1] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

if (scores[activePlayer] >= 20){
  playing = false;
  document.querySelector(`.player--${activePlayer}`).classList.toggle("player--winner");
  document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
  diceEl.classList.add("hidden");
  document.getElementById(`name--${activePlayer}`).textContent = 'Winner 🏆';

  
} else {
  switchPlayer();
}
  }
})

btnNew.addEventListener('click', init);


