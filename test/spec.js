var dot2cjs = require('../');
var gutil = require('gulp-util');

describe('gulp-dot2cjs', function () {
	it('should process files with default options just as expected :)', function (done) {
		var stream = dot2cjs();

		stream.on('data', function (file) {
			
		});
		stream.once('end', function () {
			// file.contents.toString().should.equal('module.exports = function anonymous(it) {\nvar out=\'\';return out;\n};');
			done();
		});

		var file = new gutil.File({
			path: 'name.html',
			cwd: './',
			base: './',
			contents: new Buffer('')
		});
		stream.write(file);
		stream.end();
	});

	it('should not throw errors inside a stream', function (done) {
		var stream = dot2cjs();

		stream.on('end', function () {
			done();
		});

		stream.on('error', function (e) {
			// e.message.should.equal('Unexpected token =');
			done();
		});

		var file = new gutil.File({
			path: 'name.html',
			cwd: './',
			base: './',
			contents: new Buffer('<div>{{!= it.name }}</div>')
		});
		stream.write(file);
		stream.end();
	});
});
