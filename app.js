var simple = require('simplejs');
simple.load('session', {town:'roseau', ocu:'gcc'}
	).load('cache', {Expires:'-1', Pragma:'No-Cache'}).listen('localhost', 1337);
