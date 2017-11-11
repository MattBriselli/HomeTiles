$(document).ready(function() {
	weatherCall();
});

function weatherCall() {
	$.ajax({
		url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a77b08a6d315fb4d974c16345ae1ba70",
		type: "GET"
	})
	.done(function(wData) {
		console.log(wData);
	})
	.fail(function(error) {
		console.log(xml);
	});
}