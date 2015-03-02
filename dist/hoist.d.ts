/**
    Name: HoistJS
    Author: Donald Jones <donald@birminghamdeveloper.com>
    Description: A simple Dependency Injection container.
 */
declare class Hoister {
    /**
     * Hash of hoisted class/singletons/statics.
     */
    static hoisted: {};
    /**
     * Hoist a class/singleton/static to be retrieved in dependent objects later.
     * @param {string} name The name to retrieve this object by.
     * @param {function} construct The object you wish to hoist.
     * @param {string} type The type of object being hoisted.
     */
    static hoist(name: string, construct: any, type?: string): void;
    static pull(name: string): any;
}
export = Hoister;
