const express = require('express');
const { createPage, getPage } = require('../controllers/page');
const router = express.Router();
const shortid = require("shortid");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post(`/page/create`, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), createPage)

router.get(`/page/:category/:type`, getPage);

module.exports = router;