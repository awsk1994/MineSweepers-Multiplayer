// Helper Functions
module.exports = {
  displayResults: function(results) {
    results.forEach(function (c) {
        console.dir(c.toJSON());
    });
    console.log('------------------------------------');
  }
} 