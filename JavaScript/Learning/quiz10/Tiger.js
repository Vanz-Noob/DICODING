class Tiger {
    constructor() {
      this.strength = Math.floor(Math.random() * 100);
    }
  
    growl() {
      return('grrrrr!');
    }
  }
  
  module.exports = Tiger;