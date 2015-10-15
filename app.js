var simple = require('simplejs');
simple.apply('session', {town:'roseau', ocu:'gcc'}
	).apply('cache', {Expires:'-1', Pragma:'No-Cache'}).apply('compress').listen('localhost', 1337);
