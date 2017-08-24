
$(document).ready(function () {

	 // // Initialize Firebase
	 var config = {
	 	apiKey: "AIzaSyCQdCttZBDJvOv9_tguHxJ3DE6L4jAZXvE",
	 	authDomain: "lvmtest-83520.firebaseapp.com",
	 	databaseURL: "https://lvmtest-83520.firebaseio.com",
	 	storageBucket: "lvmtest-83520.appspot.com",
	 	messagingSenderId: "563253238780"
	 };

	 firebase.initializeApp(config);

	 // // //  // Create a variable to reference the database.
	  var database = firebase.database();

	  
	  // var database = new firebase("https://lvm-trainshed.firebaseio.com/");

	  // Capture Button Click for Submit
	  $("#trnSubmit").on("click", function() {
	  	event.preventDefault();


		// Grabbed values from text boxes
		var trainNm = $("#trnName").val().trim();
		var trainDst = $("#trnDest").val().trim();
		var frtTrain = moment($("#firstTrn").val().trim(), "HH:mm").format("");
		var trainFreq = $("#trnFreq").val().trim();

		// Code for handling the push to firebase
		var newTrn = {
			train: trainNm,
			dest: trainDst,
			first: frtTrain,
			freq: trainFreq,
		};

		database.ref().push(newTrn);
		
		// Console log train info
		// console.log(newTrn.train);
		// console.log(newTrn.dest);
		// console.log(newTrn.first);
		// console.log(newTrn.freq);

		// Clear form after push
		$("#trnName").val("");
		$("#trnDest").val("");
		$("#firstTrn").val("");
		$("#trnFreq").val("");

		return false;
	});

		// Keep each entry
		database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		// console.log(childSnapshot.val());

		// Child storage
		var trnName = childSnapshot.val().train;
		var trnDest = childSnapshot.val().dest;
		var frtTrain = childSnapshot.val().first;
		var trainFreq = childSnapshot.val().freq;

		// console.log(trnName);
		// console.log(trnDest);
		// console.log(frtTrain);
		// console.log(trainFreq);


    	// First Time (pushed back 1 year to make sure it comes before current time)
    	var firstTimeConverted = moment(frtTrain, "hh:mm").subtract(1, "years")
		// console.log(firstTimeConverted);

		var currentTime = moment();
		// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		// console.log("DIFFERENCE IN TIME: " + diffTime);

		// Remaining time
		var timeLeft = diffTime % trainFreq;
		// console.log("Time left: " + timeLeft);

		// Time till train arrives
		var minAway = trainFreq - timeLeft;
		// console.log("MINUTES TILL TRAIN: " + minAway);

		// Time that train will arrive
		var nextTrain = moment().add(minAway, "minutes");
		var trnArrival = moment(nextTrain).format("hh:mm a");
		// console.log("Train Arrival: " + trnArrival);


		// Puts text into table
		$("#trainTable > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" + "Every " + trainFreq + " min." + "</td><td>" + trnArrival + "</td><td>" + "In " + minAway + " min." + "</td></tr>");

	});
	});





