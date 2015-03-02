define(function (require) {
    describe('HoistJS', function (Hoister) {
        var Hoister = require('../dist/hoist');
        var hoister = new Hoister();
        describe('Errors', function () {
            it('should fail to hoist an unknown type', function (done) {
                expect(hoister.hoist.bind(hoister.hoist, 'test123', {}, 'BLAH')).to.throw();
                done();
            });

            it('should register with a noop', function (done) {
                hoister.hoist('testNoop');
                var lowered = hoister.pull('testNoop');
                expect(lowered).to.be.an.object;
                done();
            });

            it('should not find an unhoisted class', function (done) {
                expect(hoister.pull.bind(hoister, 'nothoisted')).to.throw();
                done();
            });

            it('should not hoist a constructor with a blank name', function (done) {
                expect(hoister.hoist.bind(hoister.hoist, '')).to.throw();
                done();
            });
        });

        describe('Hoist CLASSes', function () {
            beforeEach(function (done) {
                var testFunc = function Test() {
                    return {
                        count: 0
                    };
                };

                hoister.hoist('test', testFunc, 'CLASS');

                done();
            });

            it('should pull an instance of a hoisted class', function (done) {
                var lowered = hoister.pull('test');
                lowered.count++;
                expect(lowered.count).to.equal(1);
                done();
            });

            it('should pull an instance of a hoisted class', function (done) {
                var lowered = hoister.pull('test');
                expect(lowered.count).to.equal(0);
                done();
            });
        });

        describe('SINGLETONs', function () {
            before(function (done) {
                var singletonTest = function Singleton() {
                    return {
                        count: 0
                    };
                };

                hoister.hoist('singletonTest', singletonTest, 'SINGLETON');
                done();
            });

            it('should pull the singleton and increment the count property', function (done) {
                var lowered = hoister.pull('singletonTest');
                lowered.count++;
                expect(lowered.count).to.equal(1);
                done();
            });

            it('should pull the singleton, the count property should be 1', function (done) {
                var lowered = hoister.pull('singletonTest');
                expect(lowered.count).to.equal(1);
                done();
            });
        });

        describe('STATICs', function () {
            before(function (done) {
                function Static() {

                };

                Static.TestStatic = function (testInput) {
                    return testInput + 'Static';
                };

                hoister.hoist('staticTest', Static, 'STATIC');
                done();
            });

            it('should pull the static class', function (done) {
                var loweredStatic = hoister.pull('staticTest');
                expect(loweredStatic.TestStatic('testonetwo')).to.equal('testonetwoStatic');
                done();
            });
        });
    });
});