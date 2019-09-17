var stringify = require('json-stringify-safe');

exports.upload = (req, res) => {
    console.log('\ncloud-storage.controller(/upload) triggered');

    let file = req.file;
    if (!file) {
        res.status(500);
        res.json('file not found');
        return;
    }

    // console.log('Bucket ', stringify(req.bucket, null, 2));

    let fileUpload = req.bucket.file(file.originalname);
    // console.log('fileUpload ', stringify(fileUpload, null, 2));
    // Get File from request Form data.
    fileUpload.save(new Buffer.from(file.buffer)).then(
        result => {
            console.log('\nfile uploaded successfully');
            res.status(200);
            res.json('file uploaded successfully');
        },
        error => {
            res.status(500);
            console.log(error);
            res.json({ error: error });
        }
    );
};

exports.delete = async (req, res) => {
    console.log('\ncloud-storage.controller(/delete) triggered');
    let filename = req.query.file;

    const storage = req.admin.storage();

    // Deletes the file from the bucket
    await storage
        .bucket()
        .file(filename)
        .delete()
        .then(() => {
            console.log("SUCCESS");
            console.log(`${filename} deleted successfully`);
            res.status(200);
            res.json('file deleteded successfully');
            return;
        })
        .catch((err) => {
            console.log(`${filename} deleted error`);

            res.status(err.code);
            res.json({ msg: err.message });
            return;
        })
};

exports.download = async (req, res) => {
    console.log('\ncloud-storage.controller(/download) triggered');
    let filename = req.query.file;
    const bucketName = '<PROJECT_NAME>-<PROJECT_ID>.appspot.com';
    const storage = req.admin.storage();

    storage
        .bucket(bucketName)
        .file(filename)
        .getMetadata()
        .then(results => {
            // console.log('Storage Ref ', stringify(results, null, 2));            
            const metadata = results[0];
            console.log(`File: ${metadata.name}`);
            console.log(`Bucket: ${metadata.bucket}`);
            console.log(`Storage class: ${metadata.storageClass}`);
            console.log(`Self link: ${metadata.selfLink}`);
            console.log(`ID: ${metadata.id}`);
            console.log(`Size: ${metadata.size}`);
            console.log(`Updated: ${metadata.updated}`);
            console.log(`Generation: ${metadata.generation}`);
            console.log(`Metageneration: ${metadata.metageneration}`);
            console.log(`Etag: ${metadata.etag}`);
            console.log(`Owner: ${metadata.owner}`);
            console.log(`Component count: ${metadata.component_count}`);
            console.log(`Crc32c: ${metadata.crc32c}`);
            console.log(`md5Hash: ${metadata.md5Hash}`);
            console.log(`Cache-control: ${metadata.cacheControl}`);
            console.log(`Content-type: ${metadata.contentType}`);
            console.log(`Content-disposition: ${metadata.contentDisposition}`);
            console.log(`Content-encoding: ${metadata.contentEncoding}`);
            console.log(`Content-language: ${metadata.contentLanguage}`);
            console.log(`Metadata: ${metadata.metadata}`);
            console.log(`Media link: ${metadata.mediaLink}`);
            console.log(`firebaseStorageDownloadTokens: ${metadata.metadata.firebaseStorageDownloadTokens}`);
            const img_url = `https://firebasestorage.googleapis.com/v0/b/${metadata.bucket}/o/${metadata.name}?alt=media&token=${metadata.metadata.firebaseStorageDownloadTokens}`;
            res.status(200);
            res.json({ downloadUrl: img_url });
            return;
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
};