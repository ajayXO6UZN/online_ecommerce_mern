const express = require('express');
const { createProductSlider,getAllSlider, getAllDeals } = require('../controllers/productSlider');

const router = express.Router();

router.post('/productSlider',  createProductSlider);
router.get('/getalldeals', getAllSlider);

router.get('/getDeals',getAllDeals)

module.exports = router
