(function(){

var withDefaults = require('./withdefaults.js')

function defaultConfig() {
	return {
		known : [],
		classifiers : [],
		goodClassifiers : []
	}
}

function truthTest( value ) {
	return value && value != -1
}

function toBinary( value ) {
	return truthTest(value) ? 1 : -1
}

function initializeWeight( known ) {
	var weight = 1/known.length
	known.forEach( function( known ) {
		known.weight = weight
	})
}

function testClassifiers( classifiers , known ) {
	var correct = [ ]
	var incorrect = [ ]
	known.forEach( function( known ) {
		var total = 0
		classifiers.forEach( function( classifier ) {
			total += classifier.alpha * toBinary( classifier.exec(known.data) )
		})
		if ( total > 0 ) {
			correct.push(known)
		} else {
			incorrect.push(known)
		}
	})
	return {
		correct : correct,
		incorrect : incorrect
	}
}

function setWeight( classifier , known ) {
	var results = testClassifiers( classifier , known )

	function balanceWeight( list ) {
		var weight = 1/2 * 1/(list.length)
		list.forEach( function( known ) {
			known.weight = weight
		})
	}
	balanceWeight(results.correct)
	balanceWeight(results.incorrect)

	return results.correct.concat(results.incorrect)
}

function classifierAlpha( classifier , known ) {
	function errorToAlpha( error ) {
		return Math.log( (1 - error) / error ) / 2
	}

	classifier.error = 0
	var correct = []
	var incorrect = []
	known.forEach( function( known ) {
		classifier.error += toBinary( classifier.exec(known.data) ) == known.value ? 0 : known.weight
	})
	classifier.alpha = errorToAlpha( classifier.error )
	return classifier.alpha
}

function optimize( alphaThreshold , config ) {
	alphaThreshold = alphaThreshold || 0

	if ( config.goodClassifiers.length == 0 ) {
		initializeWeight( config.known )
	} else {
		setWeight( config.goodClassifiers , config.known )
	}

	var bestAbsAlpha = alphaThreshold

	while( config.classifiers.length > 0 ) {

		var bestClassifier = undefined

		var lesserClassifiers = []

		config.classifiers.forEach(function(classifier) {
			var absAlpha = Math.abs( classifierAlpha( classifier , config.known ) )
			if ( !bestClassifier || absAlpha > bestAbsAlpha ) {
				if ( bestClassifier ) {
					lesserClassifiers.push(bestClassifier)
				}
				bestClassifier = classifier
				bestAbsAlpha = absAlpha
			} else {
				lesserClassifiers.push(classifier)
			}
		})
		if ( bestAbsAlpha <= alphaThreshold ) {
			return this
		} else {
			config.goodClassifiers.push(bestClassifier)
			config.classifiers = lesserClassifiers;
			setWeight( config.goodClassifiers , config.known )
		}

	}
	return this
}

function boostingConstructor( newConfig ) {
	var config = withDefaults(newConfig,defaultConfig())

	return {
		config : function configFunction() {
			return config
		},
		addData : function addData( data , binaryValue ) {
			if ( binaryValue != 1 && binaryValue != -1 ) { throw new Error("binaryValue must be +1 or -1") }
			config.known.push( { data : data , value : binaryValue } )
			return this
		},
		addClassifier : function addClassifier( classifierFunction , name ) {
			config.classifiers.push( { exec : classifierFunction , name : name } )
			return this
		},
		optimize : function(alphaThreshold) {
			return optimize(alphaThreshold,config)
		},
		classify : function classify( data ) {
			return testClassifiers( config.goodClassifiers , [ { data : data } ] ).correct.length == 1 ? +1 : -1
		}
	}
}

module.exports = boostingConstructor

})();
