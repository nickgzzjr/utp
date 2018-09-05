var utp = require('../index');
var assert = require('assert');

utp = utp()

utp.on('connection', function(socket) {
	socket.on('data', function(data) {
		assert(data.toString() === 'client');
		socket.write('server');
	});
})
utp.listen(53454);

var socket = utp.connect(53454);
socket.write('client');
socket.on('data', function(data) {
  assert(data.toString() === 'server');
  process.exit(0);
});

setTimeout(process.exit.bind(process, 1), 5000);