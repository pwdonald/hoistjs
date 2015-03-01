module Hoister {
    export class Hoister {
        registered = {};

        hoist(name: string, construct: any, type: string = 'SINGLETON') {
            if (!name || name === '') {
                throw new Error('Cannot hoist a constructor with a blank name!');
            }

            if (!construct) {
                construct = () => {
                    return;
                };
            }

            if (type === 'SINGLETON') {
                this.registered[name] = <IHoistable>{
                    name: name,
                    type: 'SINGLETON',
                    construct: construct,
                    instance: new construct()
                };
            } else if (type === 'STATIC') {
                this.registered[name] = <IHoistable>{
                    name: name,
                    type: 'STATIC',
                    construct: construct
                };
            } else if (type === 'CLASS') {
                this.registered[name] = <IHoistable>{
                    name: name,
                    type: 'CLASS',
                    construct: construct
                };
            } else {
                throw new Error('Unexpected type.');
            }
        }

        pull(name: string) {
            var hoisted: IHoistable = this.registered[name];

            if (!hoisted) {
                throw new Error(name + ' is not hoisted!');
                return;
            }

            if (hoisted.type === 'STATIC') {
                return hoisted.construct;
            } else if (hoisted.type === 'SINGLETON') {
                return (hoisted.instance ? hoisted.instance : new hoisted.construct());
            } else if (hoisted.type === 'CLASS') {
                return new hoisted.construct();
            }
        }
    }

    export interface IHoistable {
        name: string;
        type: string;
        construct: any;
        instance?: any;
    }
}