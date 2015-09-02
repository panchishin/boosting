// include the package and set the default configuration in one line
var boosting = require('../boosting')()


/////////// ADD CLASSIFIERS ////////////

// create a classifier
var classifierFunction = function(data) { 
	var testResult = true
	// do some test on data
	return testResult
}

// add the classifier
boosting.addClassifier( classifierFunction , "classifier name" )
// or add it without a name
// boosting.addClassifier( classifierFunction )

// Repeat "ADD CLASSIFIERS" as desired


/////////// ADD TRAINING DATA ////////////

var trainingData = {
	// some data that you expect to be passed into your classifier functions
}
var result = true // or false or 1 or 0.  The expected classification.

boosting.addData( trainingData , result )

// Repeat "ADD TRAINING DATA" as desired


/////////// OPTIMIZE ////////////

boosting.optimize()

/////////// USE IT ////////////

var actualData = {
	// some data that you expect to be passed into your classifier functions
}

var actualResult = boosting.classify( actualData )






















/////////// TIME PASSES IN THE CODE ////////////














/////////// YOU INVENT A BUNCH OF NEW CLASSIFIERS AND DATA ////////////
//
// Perhaps the classifiers were created progammatically or imported
// from you vast library of classifiers in the cloud...  
boosting.addClassifier( classifierFunction , "classifier name" )
boosting.addData( trainingData , result )
// ...

// You can rerun the optimizer to see if the new classifiers
// (and any previously unused classifiers) can help
boosting.optimize()

// You can then use the improved Boosting to classify more data
var AnotherActualResult = boosting.classify( actualData )



