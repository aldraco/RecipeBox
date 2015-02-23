var recipe = require('./server/models/recipe');
var router = express.router();			//starts the router

router.use(function (req, res, next) {
	console.log("All requests go through here");
	next();
});

router.get('/', function(req, res) {
	res.json({message: "Hello World."});
});

//middleware for recipe handling

router.route('/recipes')
	.post(function(req, res) {
		//creates a new recipe
		//saves data
		console.log("new recipe created and saved.");
	});
	.get(function(req, res) {
		//returns all recent recipes
		res.write("Here are some recent recipes");
	});

router.route('/recipes/:recipe_id')
	.put(function(req, res) {
		//edits a reicipe
		console.log("recipe edited.");
	});
	.get(function(req, res) {
		//gets a particular recipe
		console.log("Here is the recipe you requested.");
	});
	.delete(function(req, res) {
		//deletes a particular recipe
		console.log("recipe deleted.");
	});