const { responseServerError } = require('./response')
const XlsxTemplate = require('xlsx-template');
const { TemplateHandler } = require('easy-template-x');

exports.ExportFile = (inputfile, outputfile, res, dataExport,) => {
    try {
        const fs = require('fs');
        fs.readFile(inputfile, function (err, data) {
            if (!err) {
                var template = new XlsxTemplate(data);

                // Replacements take place on first sheet
                var sheetNumber = 1;

                // Set up some placeholder values matching the placeholders in the template

                // Perform substitution
                template.substitute(sheetNumber, dataExport);

                // Get binary data
                var mydata = template.generate({ type: 'nodebuffer' });
                fs.writeFile(outputfile, mydata, function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    return mydata
                });

                res.setHeader('Content-Disposition', `attachment; filename=output.xlsx`);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                const fileStream = fs.createReadStream(outputfile);
                fileStream.pipe(res);
            } else {
                console.log(err);
            }
        })

    } catch (err) {
        return responseServerError({ res, err });
    }
}
exports.ExportFileDocx = async (inputfile, outputfile, res, dataExport,) => {
    try {
        const fs = require('fs');
        const templateFile = fs.readFileSync(inputfile);
        // 2. process the template
        const handler = new TemplateHandler();
        
        const doc = await handler.process(templateFile, dataExport);
        // 3. save output
        fs.writeFileSync(outputfile, doc);

        res.setHeader('Content-Disposition', `attachment; filename=output.docx`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessing');
        const fileStream = fs.createReadStream(outputfile);
        fileStream.pipe(res);
    } catch (err) {
        console.log(err)
        return responseServerError({ res, err });
    }
}