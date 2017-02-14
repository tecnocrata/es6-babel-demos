var abstractClass = {
  abstractMethod: function() { /* i don't know yet what i'm going to do */ },
  concreteMethod: function() {
    this.abstractMethod(); // < made generic with this 
  }
}


specializedClass = Object.create(abstractClass);
specializedClass.abstractMethod = function() {
  alert('Now i know what to do');
}

specializedClass.concreteMethod();