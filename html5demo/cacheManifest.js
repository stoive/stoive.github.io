/*!
 * Ext JS Connect 0.0.1
 * Copyright(c) 2010 Sencha Inc.
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var fs = require('fs'),
    Utils = {},
    Url = require('url'),
    Path = require('path');

// Works like find on unix.  Does a recursive readdir and filters by pattern.
Utils.find = function find(root, pattern, callback) {

    function rfind(root, callback) {
        fs.readdir(root, function (err, files) {
            if (err) {
                callback(err);
                return;
            }
            var results = [],
                counter = 0;
            files.forEach(function (file) {
                counter++;
                function checkCounter() {
                    counter--;
                    if (counter === 0) {
                        callback(null, results);
                    }
                }
                var file = root + "/" + file;
                fs.stat(file, function (err, stat) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    if (stat.isDirectory()) {
                        rfind(file, function (err, files) {
                            if (err) {
                                callback(err);
                                return;
                            }
                            results.push.apply(results, files);
                            checkCounter();
                        });
                        return;
                    }
                    if (pattern.test(file)) {
                        stat.path = file;
                        results.push(stat);
                    }
                    checkCounter();
                });
            });
        });
    }
    rfind(root, function (err, files) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, files.map(function (file) {
            file.path = file.path.substr(root.length);
            return file;
        }));
    });
};

/**
 * Generate cache manifest for the given `root`, `networks`,
 * and `fallbacks`.
 *
 * @param {String} root
 * @param {Array} networks
 * @param {Object} fallbacks
 * @param {String} location
 * @return {Function}
 * @api public
 */

module.exports = function cacheManifest(root, networks, fallbacks, location) {
    root = root || process.cwd();
    var suffix = "";
    location = location || "/cache.manifest";

    // List of networks as an array of strings
    if (networks && networks.length) {
        suffix += "\n\nNETWORK:\n" + networks.join("\n");
    }

    // List of fallbacks as key/value pairs
    if (fallbacks) {
        var str = "";
        for (var i in fallbacks) {
            str += i + " " + fallbacks[i] + "\n";
        }
        if (str.length) {
            suffix += "\n\nFALLBACK:\n" + str;
        }
    }

    return function cacheManifest(req, res, next) {
        if (Url.parse(req.url).pathname === location) {
            Utils.find(root, (/./), function (err, files) {
                var latestMtime = 0;
                files = files.map(function (entry) {
                    if (entry.mtime > latestMtime) {
                        latestMtime = entry.mtime;
                    }
                    return entry.path.substr(1);
                }).sort();
                var manifest = "CACHE MANIFEST\n"
                    + "# " + latestMtime.toUTCString() + "\n"
                    + files.join("\n")
                    + suffix;

                res.writeHead(200, {
                    "Content-Type": "text/cache-manifest",
                    "Last-Modified": latestMtime.toUTCString(),
                    "Content-Length": manifest.length
                });
                res.end(manifest);
            });
            return;
        }
        next();
    };
};
