const fs = require("fs");
const path = require("path");

function jpeg_to_txt() {
    fs.readFile(path.join(__dirname, "bottle.jpeg"), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        fs.writeFile(path.join(__dirname, "bottle.txt"), data, 'utf8', (err) => {
            if (err)
                console.log(err);
        });
    });
}

function filesCopy() {
    // make dir if doesn't exist
    fs.mkdir(path.join(__dirname, "dir2/"), { recursive: false }, err => {
        if (err)
            console.log(err);
    })

    fs.readdir(path.join(__dirname, "dir1/"), 'utf8', (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(files);
        files.forEach((filename) => {
            fs.copyFile(path.join(__dirname, "dir1/", filename),
                path.join(__dirname, "dir2/", filename), err => {
                    if (err)
                        console.error(err);
                })
        })
    })
}


function copyDir() {
    fs.mkdir(path.join(__dirname, "CopyDir2/"), { recursive: false }, err => {
        if (err)
            console.log(err);
    })

    fs.readdir(path.join(__dirname, "CopyDir1/"), (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach((filename) => {

            const loc = fs.realpathSync(path.join(__dirname, "CopyDir1/", filename))
            if (fs.statSync(loc).isDirectory()) {
                console.log("in sub dir");

                fs.mkdir(path.join(__dirname, "CopyDir2/", filename), { recursive: false }, err => {
                    if (err)
                        console.log(err);
                })

                fs.readdir(path.join(__dirname, "CopyDir1/", filename), (err, files) => {
                    console.log(files);
                    files.forEach((file) => {
                        fs.copyFile(path.join(__dirname, "CopyDir1/", filename, file),
                            path.join(__dirname, "CopyDir2/", filename, file), err => {
                                if (err)
                                    console.error(err);
                            })
                    })
                })
            }
            else {
                fs.copyFile(path.join(__dirname, "CopyDir1/", filename),
                    path.join(__dirname, "CopyDir2/", filename), (err) => {
                        if (err)
                            console.error(err);
                    })
            }
        })
    })
}

//const copyFiles = (files) => {
//    files.forEach((filename) => {
//        if (fs.statSync(path.join(__dirname, "CopyDir2/", filename)).isDirectory()) {
//            fs.mkdir(path.join(__dirname, "CopyDir2/", filename);
//                fs.readdir(path.join(__dirname, "CopyDir2/", filename), (err, files) => {
//
//                }
//        }
//        fs.copyFile(path.join(__dirname, "CopyDir2/", filename),
//            path.join(__dirname, "CopyDir2/", filename), err => {
//                if (err)
//                    console.error(err);
//            })
//    })
//
//}
copyDir();
