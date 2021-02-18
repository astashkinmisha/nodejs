const fs = require('fs');
const path = require('path');

const dirdir = path.join(__dirname, '/dir');


function genders() {
    fs.readdir(dirdir, ((err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(files);

        files.forEach(fileName => {
            console.log(fileName);

            fs.readdir(path.join(dirdir, `${fileName}`), (err, files1) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(files1);

                files1.forEach(file1Name => {
                    let filePath = path.join(dirdir, `${fileName}`, `${file1Name}`);
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        const json = JSON.parse(data.toString());
                        const malegender = path.join(dirdir, '1800');
                        const femalegender = path.join(dirdir, '2000');

                        if (json.gender === 'male') {

                            fs.rename(filePath, path.join(malegender, `${file1Name}`), err => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                            })

                        } else if (json.gender === 'female') {

                            fs.rename(filePath, path.join(femalegender, `${file1Name}`), err => {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                            })


                        }

                    })
                })

            })
        })

    }))

}

genders();
