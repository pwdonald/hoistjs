# HoistJS
## A very simple AMD Dependency Container

### Hoist your dependencies
```
define(['hoist'], function(hoister) {
	var Module = function() {
		
	};

	hoister.hoist('YourModule', Module, 'SINGLETON');

	return Module;
});
```

### Retrieve your dependencies
```
define(['hoist', 'yourmodule'], function(hoister, yourmodule) {
	var NextModule = function() {
		var firstModule = hoister.pull('YourModule');
		// do something
	};

	hoister.hoist('NextModule', NextModule, 'SINGLETON');

	return NextModule;
});
```

### Hoistable Types
- 'CLASS' returns a new instance each pull
- 'STATIC' returns the module itself
- 'SINGLETON' returns the same instance each pull.

## LICENSE
MIT