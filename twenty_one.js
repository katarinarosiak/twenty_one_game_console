const readline = require('readline-sync');

class Player {
  constructor() {
    this.cardsInHand = [];
    this.currentPoints = 0;
    this.firstDeal = true;
  }
  take(card) {

    this.cardsInHand.push(card);
    if (card.face === 'A') {
      this.currentPoints += this.determineAceValue();
    } else {
      this.currentPoints += card.value;
    }
  }


  determineAceValue() {
    let numOfAces = 0;
    this.cardsInHand.forEach(card => {
      if (card.face === 'A') {
        numOfAces++;
      }
    })

    if (numOfAce === 1 && (this.currentPoints + 11) <= 21) {
      return 11;
    } else if (numOfAce === 2 && (this.currentPoints + 11 + 5) <= 21) {
      return 16;
    } else if (numOfAce === 2 && (this.currentPoints + 11 + 5) > 21) {
      return 10;
    } else if (numOfAce === 3 && (this.currentPoints + 11 + 5 + 5) === 21) {
      return 21;
    } else if (numOfAce === 3) {
      return 15;
    } else {
      return 20;
    }
  }
}

class Dealer extends Player {
  constructor() {
    super();
  }
  play() {
    // if less than 
  }

}

class Human extends Player {
  constructor() {
    super();
  }
}

class Card {
  constructor(face) {
    this.face = face;
    this.value = 0;
    this.used = false;

    this.setValue();
  }
  setValue() {
    if (this.face === 'Q' || this.face === 'J' || this.face === 'K') {
      this.value = 10;
    } else if (this.face === 'A') {
      this.value = 'ACE';
    } else {
      this.value = this.face;
    }
  }
}

class Game {
  constructor() {
    this.cardsInADeck = [];
    this.humanPlayer = new Human();
    this.dealer = new Dealer();

    this.generateDeck();

  }
  generateDeck() {
    let deck = [];
    for (let times = 0; times < 4; times++) {
      for (let index = 2; index <= 10; index++) {
        deck.push(new Card(index));
      }
      deck.push(new Card('Q'));
      deck.push(new Card('K'));
      deck.push(new Card('J'));
      deck.push(new Card('A'));
    }
    this.cardsInADeck = deck;
  }
  displayCards() {

    let humanCards = this.humanPlayer.cardsInHand.map(card => card.face);
    let dealerCards = this.dealer.cardsInHand.map(card => card.face);
    console.log(`You have: ${humanCards} and total of ${this.humanPlayer.currentPoints} points.`);
    console.log(`Dealer has ${dealerCards} and total of ${this.dealer.currentPoints} points`);
  }

  compareCards() {
    console.log('compare cards');
  }
  announceWinner() {
    console.log('winner');
  }

  drawCard() {
    let randomCard;
    while (true) {
      let randomNum = Math.floor(Math.random() * this.cardsInADeck.length);
      randomCard = this.cardsInADeck[randomNum];

      if (!randomCard.used) {
        this.cardsInADeck[randomNum].used = true;
        return randomCard;
      }
    }
  }
  stay() {
    console.log('Stay');
  }

  retriveUserInput() {
    let userAnswer = readline.question('');
    while (true) {
      if (userAnswer[0].toLowerCase() === 'h') {
        return 'hit';
      } else if (userAnswer[0].toLowerCase() === 's') {
        return 'stay';
      } else {
        console.log('This is not a valid input, please choose "hit" or "stay"');
      }
    }
  }

  play() {
    console.log('Welcome to 21 Game');
    console.log("It's your turn");
    this.humanPlayer.take(this.drawCard());
    this.humanPlayer.take(this.drawCard());
    this.dealer.take(this.drawCard());

    while (true) {
      this.displayCards();
      console.log('Do you want to "hit" or "stay"?');
      let userChoice = this.retriveUserInput();
      if (userChoice === 'hit') {
        this.humanPlayer.take(this.drawCard());
        this.dealer.take(this.drawCard());
        if (this.humanPlayer.currentPoints > 21) {
          console.log('You loose the game');
          break;
        }
      } else {
        this.dealer.take(this.drawCard());
        if (this.dealer.currentPoints > 21) {
          console.log('You win');
          break;
        }
      }

    }

  }
}

let game = new Game();
game.play();