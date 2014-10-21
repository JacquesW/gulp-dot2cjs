var through = require('through2');
var dot = require('dot');
var gutil = require('gulp-util');
var path = require('path');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-dot2cjs';

var readStream = function (stream, done) {
	var buffer = '';
	stream.on('data', function (chunk) {
		buffer += chunk;
	}).on('end', function () {
		done(null, buffer);
	}).on('error', function (error) {
		done(error);
	});
}

var gulpDot2Cjs = function(options) {
	var stream = through.obj(function (file, enc, callback) {
		var complete = function (error, content) {
			if (error) {
				this.emit('error', new PluginError(PLUGIN_NAME, error));
			}
			try {
				var code = dot.template(content).toString();
				file.contents = new Buffer(['module.exports = ', code, ';'].join(''));
				this.push(file);
				return callback();
			}
			catch (exception) {
				this.emit('error', new PluginError(PLUGIN_NAME, exception));
			}
		}.bind(this);

		if (file.isBuffer()) {
			complete(null, file.contents.toString());
		} else if (file.isStream()) {
			readStream(file.contents, complete);
		}
	});
	return stream;
};

/**
 * Precompile doT Templates to CommonJS Modules
 * Adapted from gulp-dotify.
 * @see {@link https://github.com/titarenko/gulp-dotify|gulp-dotify}
 * @module gulp-dot2cjs
 */
module.exports = gulpDot2Cjs;
