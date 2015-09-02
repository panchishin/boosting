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
		boosting.addClassifier( function() { return true } )
		boosting.addClassifier( function(x) { return x % 2 ? true : false } )
		boosting.addData( 0 , 1 )
		boosting.addData( 2 , 1 )

		boosting.optimize()
		assert.equal( 1 , boosting.classify( 4 ) )
	},

	'has correct classifier' : function(beforeExit, assert) {

		var boosting = boostingConstructor( )
		boosting.addClassifier( function(x) { return x < 5 ? 1 : -1 } , "less than 5")
		boosting.addClassifier( function(x) { return x % 2 ? 1 : -1 } , "odd")
		boosting.addData( 0 , +1 )
		boosting.addData( 2 , +1 )
		boosting.addData( 10 , -1 )

		boosting.optimize(0)
		var config = boosting.config()

		assert.equal( "less than 5" , config.goodClassifiers[0].name )
		assert.equal( 1 , config.goodClassifiers.length )
		assert.equal( true , boosting.classify( 1 ) )
		assert.equal( false , boosting.classify( 6 ) )
	},

	'has correct binary classifier' : function(beforeExit, assert) {

		var boosting = boostingConstructor( )
		boosting.addClassifier( function(x) { return x < 5  } , "less than 5")
		boosting.addClassifier( function(x) { return x % 2  } , "odd")
		boosting.addData( 0 , +1 )
		boosting.addData( 2 , +1 )
		boosting.addData( 10 , -1 )

		boosting.optimize(0)
		var config = boosting.config()

		assert.equal( "less than 5" , config.goodClassifiers[0].name )
		assert.equal( 1 , config.goodClassifiers.length )
		assert.equal( true , boosting.classify( 1 ) )
		assert.equal( false , boosting.classify( 6 ) )
	},

	'has correct binary data' : function(beforeExit, assert) {

		var boosting = boostingConstructor( )
		boosting.addClassifier( function(x) { return x < 5  } , "less than 5")
		boosting.addClassifier( function(x) { return x % 2  } , "odd")
		boosting.addData( 0 , true )
		boosting.addData( 2 , true )
		boosting.addData( 10 , false )

		boosting.optimize(0)
		var config = boosting.config()

		assert.equal( "less than 5" , config.goodClassifiers[0].name )
		assert.equal( 1 , config.goodClassifiers.length )
		assert.equal( true , boosting.classify( 1 ) )
		assert.equal( false , boosting.classify( 6 ) )
	}






}