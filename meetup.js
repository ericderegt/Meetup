var fs = require('fs'),
	net = require('net'),
	server = net.createServer(),
	admin_pw = 'hipsters',
	dataFile = JSON.parse(fs.readFileSync('./meetup.json'), 'utf8');

function writeFile(data) {
	fs.writeFileSync('./meetup.json', JSON.stringify(data), 'utf8');
};

function rsvpUser(emailIn, nameIn) {
	var obj = {};
	obj.email = emailIn;
	obj.name = nameIn;
	dataFile.developers.push(obj);
	writeFile(dataFile);
}

server.on('connection', function(client) {
	client.setEncoding('utf8');
	client.write('\nWelcome to Hipster Code Meetup. Please enter view, RSVP, or headcount to continue: ')

	client.on('data', function(input) {
		var userInput = input.trim().split(' ');
		var command = userInput[0].toLowerCase();

		// The first part of the control flow checks if the user has entered admin and then whether they've entered the correct password
		if (command === 'admin') {
			if (userInput[1] === admin_pw) {
				var admin_cmd = userInput[2];
				switch (admin_cmd) {
					case 'meetup':
						if (userInput.length > 5) {
							var dateIn = userInput[3];
							var timeIn = userInput[4];
							var topicIn = userInput;
							topicIn.splice(0,5);
							var topicString = topicIn.join(' '); // breaking the topic into a string so it can be entered into JSON file below

							dataFile.date = dateIn;
							dataFile.time = timeIn;
							dataFile.topic = topicString;

							writeFile(dataFile);
							client.write('Changed upcoming meetup to ' + topicString + ' at ' + timeIn + ' on ' + dateIn + '!');
						} else {
							client.write('Please enter the command in the following format: admin password meetup date time topic.\n');
						}
						client.end();
						break;

					case 'list':
						client.write('\nList of Developers Attending the Next Meetup:\n');

						dataFile.developers.forEach(function(element) {
							client.write('- ' + 'Name: ' + element.name + ' / Email: ' + element.email + '\n');
						});
						client.end();
						break;

					case 'clear':
						dataFile.developers = [];
						writeFile(dataFile);
						client.write('Attendee list cleared. No more hipsters!\n');
						client.end();
						break;

					default:
						client.write('Please enter a valid hipster command!\n');
						client.end();
				};
			};
		} else { // Here is where all the user commands start
				switch (command) {
					case 'view':
						client.write('The next Hipster Code Meetup is on ' + dataFile.date + ' at ' + dataFile.time + '. The topic is ' + dataFile.topic + '!\n');
						client.end();
						break;
					
					case 'headcount':
						client.write('The headcount for the next meetup is ' + dataFile.developers.length + '!\n');
						client.end();
						break;
					
					case 'rsvp':
						if (userInput.length > 2) {
							var emailIn = userInput[1];
							var nameIn = userInput;
							nameIn.splice(0,2);
							var nameString = nameIn.join(' ');

							rsvpUser(emailIn,nameString);
							client.write('You successfully RSVPed for the next meetup!\n');
						} else {
							client.write('Please enter an email address and name after "RSVP"\n');
						}
							client.end();
						break;

					default:
						client.write('Please enter a valid hipster command!\n');
						client.end();
				}
		}

	});

});


server.listen(8000, function() {
	console.log('listening on port 8000');
});