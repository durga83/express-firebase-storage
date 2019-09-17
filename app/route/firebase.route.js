const express = require("express");
const router = express.Router();
const Multer = require("multer");
const admin = require("firebase-admin");
const config = require("../config/config");
const cloudStorageCtrl = require("../controllers/cloud-storage.controller");
const serviceAccount = config.fireBasePrivateKeyPath;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: config.firebaseStorageBucketURL
});
var bucket = admin.storage().bucket();

// console.log("ADMIN", admin);
// console.log("BUCKET", bucket);

// var bucket = admin.storage().bucket("my-bucket");
// add admin to ther request params to get into controller zone
router.use(function (req, res, next) {
    if (!req.admin) {
        req.admin = admin;
    }
    if (!req.bucket) {
        req.bucket = bucket;
    }
    next();
});
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 1 * 1024 * 1024 // no larger than 1mb, you can change as needed.
    }
})

router.post("/upload", multer.single("file"), cloudStorageCtrl.upload);
router.get("/delete", cloudStorageCtrl.delete);
router.get("/download", cloudStorageCtrl.download);

module.exports = router;