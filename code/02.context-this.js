let settings = {
  username: 'enrique',
  connectionString: function (){
    return {user: this.username}
  }
};

console.log (settings.connectionString());
