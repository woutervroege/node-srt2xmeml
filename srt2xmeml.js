#! /usr/bin/env node

/*
 * @package srt2xmeml
 * @copyright Copyright(c) 2014 Wouter Vroege. <wouter AT woutervroege DOT nl>
 * @author Wouter Vroege <wouter AT woutervroege DOT nl>
*/

var fs = require("fs"),
    _ = require("underscore"),
    srt2json = require("srt2json"),
    argv = require("optimist").argv,
    handlebars = require("handlebars"),
    uuid = require("uuid");

var xmltemplate = handlebars.compile(fs.readFileSync(__dirname + "/lib/template.hbs.xml").toString());

var srt2xmeml = {

    CFG: {
        timebase: 25,
        width: 1920,
        height: 1080,
        ntsc: "FALSE",
        codec: "Apple ProRes 422",
        font: "Helvetica CY",
        fontSize: 23,
        anamorphic: "FALSE",
        pixelaspectratio: "Square"
    },

    init: function(arguments) {
        for(var key in arguments) {
            srt2xmeml.CFG[key] = arguments[key];
        }
    },

    file: function(dirPath, fileName) {
        var filePath = dirPath + "/" + fileName;
        var newFilePath = filePath.replace(/\.srt$/, ".xml");
        var data = fs.readFileSync(filePath).toString();
        var json = srt2json.parseString(data);
        var data = srt2xmeml.parseTemplateData(fileName, json);
        var xmldata = xmltemplate(data).replace(/&amp;/g, '&');
        fs.writeFileSync(newFilePath, xmldata);
    },

    directory: function(dirPath, argv) {
        var fileNames = fs.readdirSync(dirPath);
        for(var i in fileNames) {
            if(fileNames[i].match(/\.srt$/)) {
                srt2xmeml.file(dirPath, fileNames[i]);
            }
        }
    },

    parseTemplateData: function(fileName, json) {
        var data = {};
        data.uuid1 = uuid.v1();
        data.uuid2 = uuid.v1();
        data.uuid3 = uuid.v1();
        data.name = fileName;
        data.timebase = srt2xmeml.CFG.timebase;
        data.ntsc = srt2xmeml.CFG.ntsc;
        data.width = srt2xmeml.CFG.width;
        data.height = srt2xmeml.CFG.height;
        data.codec = srt2xmeml.CFG.codec;
        data.anamorphic = srt2xmeml.CFG.anamorphic;
        data.pixelaspectratio = srt2xmeml.CFG.pixelaspectratio;
        data.items = [];

        _.map(json, function(jsonitem, index) {
            var item = {};
            item.text = jsonitem.text.replace(/\n/g, '&#13;');
            item.in = 1375;
            item.start = Math.round(jsonitem.start * data.timebase);
            item.end = Math.round(jsonitem.end * data.timebase);
            item.out = Math.round(item.in + (jsonitem.end * data.timebase) - item.start);
            item.keyNumber = index;
            item.font = srt2xmeml.CFG.font;
            item.fontSize = srt2xmeml.CFG.fontSize;
            data.items.push(item);
        })
        data.duration = _.max(data.items, function(singleitem){ return singleitem.end; }).end;
        return data;
    }

}


srt2xmeml.init(argv);
if(argv.dir)
    return srt2xmeml.directory(argv.dir, argv);