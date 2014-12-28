var fs = require('fs');
var path = require('path');
var File = require('vinyl');

var json2translate = require('../index');

it('should create angular translate wrapper for json file', function (cb) {
    var stream = json2translate({
        moduleName: 'Translations'
    });

    var json = fs.readFileSync(path.resolve(__dirname, 'fixtures/messages_ru.json'));

    var file = new File({
        path: 'fixtures/messages_ru.json',
        contents: new Buffer(json)
    });

    stream.on('data', function (data) {
        var result = fs.readFileSync(path.resolve(__dirname, 'expect/messages_ru.js'), 'utf-8');
        data.path.should.be.equal('fixtures/messages_ru.js');
        data.contents.toString().should.be.equal(result);
        cb();
    });

    stream.write(file);
});
