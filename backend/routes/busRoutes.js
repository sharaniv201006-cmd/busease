const express = require('express');
const {
  getAllBuses,
  getBusById,
  getBusSeats,
  getAlternativeBuses,
} = require('../controllers/busController');

const router = express.Router();

router.get('/buses', getAllBuses);
router.get('/buses/:id', getBusById);
router.get('/buses/:id/seats', getBusSeats);
router.get('/buses/alternative/:destination', getAlternativeBuses);

module.exports = router;
