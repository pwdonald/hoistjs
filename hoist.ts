/**
    Name: HoistJS
    Author: Donald Jones <donald@birminghamdeveloper.com>
    Description: A simple Dependency Injection container.
 */
class Hoister {
    /**
     * Hash of hoisted class/singletons/statics.
     */
    static hoisted = {};

    /**
     * Hoist a class/singleton/static to be retrieved in dependent objects later.
     * @param {string} name The name to retrieve this object by.
     * @param {function} construct The object you wish to hoist.
     * @param {string} type The type of object being hoisted.
     */
    static hoist(name: string, construct: any, type: string = 'SINGLETON') {
        if (!name || name === '') {
            throw new Error('Cannot hoist a constructor with a blank name!');
        }

        if (!construct) {
            construct = () => {
                return;
            };
        }

        if (type === 'SINGLETON') {
            this.hoisted[name] = <IHoistable>{
                name: name,
                type: 'SINGLETON',
                construct: construct,
                instance: new construct()
            };
        } else if (type === 'STATIC') {
            this.hoisted[name] = <IHoistable>{
                name: name,
                type: 'STATIC',
                construct: construct
            };
        } else if (type === 'CLASS') {
            this.hoisted[name] = <IHoistable>{
                name: name,
                type: 'CLASS',
                construct: construct
            };
        } else {
            throw new Error('Unexpected type.');
        }
    }

    /*
     * Pull an object from the hoisted collection.
     * @param {string} name The name the object was hoisted by.
     */
    static pull(name: string) {
        var hoisted: IHoistable = this.hoisted[name];

        if (!hoisted) {
            throw new Error(name + ' is not hoisted!');
        }

        if (hoisted.type === 'STATIC') {
            return hoisted.construct;
        } else if (hoisted.type === 'SINGLETON') {
            return hoisted.instance;
        } else if (hoisted.type === 'CLASS') {
            return new hoisted.construct();
        }
    }
}

export = Hoister;

interface IHoistable {
    name: string;
    type: string;
    construct: any;
    instance?: any;
}