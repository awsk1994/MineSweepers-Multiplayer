// Helper Functions
function displayResults(results) {
    results.forEach(function (c) {
        console.dir(c.toJSON());
    });
    console.log('------------------------------------');
}