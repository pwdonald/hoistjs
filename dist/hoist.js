define(["require", "exports"], function (require, exports) {
    /**
        Name: HoistJS
        Author: Donald Jones <donald@birminghamdeveloper.com>
        Description: A simple Dependency Injection container.
     */
    var Hoister = (function () {
        function Hoister() {
            /**
             * Hash of hoisted class/singletons/statics.
             */
            this.hoisted = {};
        }
        /**
         * Hoist a class/singleton/static to be retrieved in dependent objects later.
         * @param {string} name The name to retrieve this object by.
         * @param {function} construct The object you wish to hoist.
         * @param {string} type The type of object being hoisted.
         */
        Hoister.prototype.hoist = function (name, construct, type) {
            if (type === void 0) { type = 'SINGLETON'; }
            if (!name || name === '') {
                throw new Error('Cannot hoist a constructor with a blank name!');
            }
            if (!construct) {
                construct = function () {
                    return;
                };
            }
            if (type === 'SINGLETON') {
                this.hoisted[name] = {
                    name: name,
                    type: 'SINGLETON',
                    construct: construct,
                    instance: new construct()
                };
            }
            else if (type === 'STATIC') {
                this.hoisted[name] = {
                    name: name,
                    type: 'STATIC',
                    construct: construct
                };
            }
            else if (type === 'CLASS') {
                this.hoisted[name] = {
                    name: name,
                    type: 'CLASS',
                    construct: construct
                };
            }
            else {
                throw new Error('Unexpected type.');
            }
        };
        /*
         * Pull an object from the hoisted collection.
         * @param {string} name The name the object was hoisted by.
         */
        Hoister.prototype.pull = function (name) {
            var hoisted = this.hoisted[name];
            if (!hoisted) {
                throw new Error(name + ' is not hoisted!');
            }
            if (hoisted.type === 'STATIC') {
                return hoisted.construct;
            }
            else if (hoisted.type === 'SINGLETON') {
                return hoisted.instance;
            }
            else if (hoisted.type === 'CLASS') {
                return new hoisted.construct();
            }
        };
        return Hoister;
    })();
    return Hoister;
});
//# sourceMappingURL=hoist.js.map