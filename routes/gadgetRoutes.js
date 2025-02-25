const express = require('express');
const router = express.Router();
const gadgetController = require('../controllers/gadgetController');
const authenticateJWT = require('../middleware/authenticateJWT');

router.get('/', gadgetController.getAllGadgets);

router.post('/', gadgetController.addGadget);

router.patch('/:id', gadgetController.updateGadget);


router.delete('/:id', gadgetController.decommissionGadget);

router.post('/:id/self-destruct', gadgetController.selfDestructGadget);

router.get('/', authenticateJWT, gadgetController.getAllGadgets);
router.post('/', authenticateJWT, gadgetController.addGadget);
router.patch('/:id', authenticateJWT, gadgetController.updateGadget);
router.delete('/:id', authenticateJWT, gadgetController.decommissionGadget);
router.post('/:id/self-destruct', authenticateJWT, gadgetController.selfDestructGadget);
module.exports = router;
