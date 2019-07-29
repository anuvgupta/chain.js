/**
 * chain.js v1.0.0
 * File: chain.js (chain.js master)
 * Source: [http://github.com/anuvgupta/chain.js]
 * Copyright (c) 2019 Anuv Gupta
 */

// chain object
// custom control-flow structure (similar to promises/generators)
// provides readable/organized async callback chaining
module.exports = {
    spawn: function () {
        // private
        var self = {
            calls: [],
            executors: {},
            current: -1
        };
        // public
        var chain = {
            attach: function (name, executor) {
                self.calls.push(name);
                self.executors[name] = executor;
                return chain;
            },
            execute: function (data) {
                if (self.current == -1) {
                    if (data == undefined)
                        data = null;
                    data = { '__exec': data };
                }
                self.current++;
                if (self.current < self.calls.length) {
                    var name = self.calls[self.current];
                    self.executors[name](data, function (result) {
                        data[name] = result;
                        chain.execute(data);
                    });
                }
                return chain;
            },
            reset: function () {
                self.current = -1;
            }
        };
        return chain;
    }
};