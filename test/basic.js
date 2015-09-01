var boostingConstructor = require("../boosting.js")

module.exports = {


	'boosting is a function' : function(beforeExit, assert) {
		assert.equal('function', typeof boostingConstructor)
	},

	'constructor creates object' : function(beforeExit, assert) {

		var boosting = boostingConstructor( )

		assert.equal('object' , typeof boosting )
	},

	'can estimate value' : function(beforeExit, assert) {

		var boosting = boostingConstructor( )
		boosting.addClassifier( function() { return 1 } )
		boosting.addClassifier( function(x) { return x % 2 ? 1 : -1 } )
		boosting.addData( 0 , 1 )
		boosting.addData( 2 , 1 )

		boosting.optimize()
		assert.equal( 1 , boosting.classify( 4 ) )
	},

	'has correct classifier' : function(beforeExit, assert) {

		var boosting = boostingConstructor( )
		boosting.addClassifier( function(x) { return x < 5 ? +1 : -1 } , "less than 5")
		boosting.addClassifier( function(x) { return x % 2 ? +1 : -1 } , "odd")
		boosting.addData( 0 , +1 )
		boosting.addData( 2 , +1 )

		boosting.optimize(0)
		var config = boosting.config()

		assert.equal( "less than 5" , config.goodClassifiers[0].name )
		assert.equal( 1 , config.goodClassifiers.length )
		assert.equal( +1 , boosting.classify( 1 ) )
		assert.equal( -1 , boosting.classify( 6 ) )
	}

}