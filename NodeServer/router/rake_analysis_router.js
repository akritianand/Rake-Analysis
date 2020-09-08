const express = require('express')
const Rake = require('../models/rake-model')
const RakeCtrl = require('../controllers/rake_analysis_controller')

const router = express.Router()

router.post('/rake', RakeCtrl.createRake)
router.post('/findrake/', RakeCtrl.getRakes)
router.put('/updaterake/:rr_no', RakeCtrl.updateRake)
router.post('/downloadrakes', RakeCtrl.downloadRakes)
// router.delete('/rake/:id', RakeCtrl.deleteRake)
// router.get('/rake', RakeCtrl.getRakes)

module.exports = router
