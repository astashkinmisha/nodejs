const fs = require('fs');
const path = require('path');
const sixPM = path.join(__dirname, 'dir', '/1800');
const eightPM = path.join(__dirname, 'dir', '/2000');

function sort(sixPM, eightPM) {
    fs.readdir(eightPM, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            fs.readFile(path.join(eightPM, file), (err1, data) => {
                if (err1) {
                    console.log(err1);
                    return;
                }

                const json = JSON.parse(data.toString());

                if (json.gender === 'female') {
                    fs.rename(path.join(eightPM, file), path.join(sixPM, file), err2 => {
                        if (err2) {
                            console.log(err2);
                        }
                    })
                }
            })
        })
    })

    fs.readdir(sixPM, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }

        files.forEach(file => {
            fs.readFile(path.join(sixPM, file), (err1, data) => {
                if (err1) {
                    console.log(err1);
                    return;
                }

                const json = JSON.parse(data.toString());

                if (json.gender === 'male') {
                    fs.rename(path.join(sixPM, file), path.join(eightPM, file), err2 => {
                        if (err2) {
                            console.log(err2);
                        }
                    })
                }
            })
        })
    })
}

sort(sixPM, eightPM);
