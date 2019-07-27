/**
 * chain.js v1.0.0
 * File: chain.js (chain.js master)
 * Source: [http://github.com/anuvgupta/chain.js]
 * Copyright (c) 2019 Anuv Gupta
 */

var Chain = function () {
    // private
    var self = {
        calls: [],
        executors: {},
        current_call: -1
    };
    // public
    var chain = {
        attach: function (name, executor) {
            self.calls.push(name);
            self.executors[name] = executor;
            return chain;
        },
        execute: function (data) {
            if (data == undefined) data = null;
            self.current_call++;
            if (self.current_call < self.calls.length) {
                self.executors[self.calls[self.current_call]](data, function (result) {
                    chain.execute(result);
                });
            }
            return chain;
        },
        reset: function () {
            self.current_call = -1;
        }
    };
    return chain;
};