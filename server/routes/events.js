const express = require('express');
const router = express.Router();
const middleware = require('../middleware/middleware');
const consts = require('../config/constants');
const HttpStatus = require('http-status-codes');
const eventsController = require('../controllers/events');

router.post('/AddEvent', middleware.validateRequest([
    "fecha", "hora", "trabajo", "duracion",
    "problemaReportado", "problemaResuelto",
    "idSucursal", "idCentroCosto", "idLabor",
    "idTipoSoporte", "idMotivo"
], consts.IS_BODY_REQ), function (req, res) {
    eventsController.addEvent(req.body)
        .then(result => {
            if (result.returnValue == 0) {
                res.status(HttpStatus.NO_CONTENT).json({});
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ statusCode: result.returnValue });
            }
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        });
});

router.get('/GetTableEvents', function (req, res) {
    eventsController.getTableEvents(req)
        .then(result => {
            if (result.returnValue == 0) {
                res.status(HttpStatus.OK).json(result.recordset);
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ statusCode: result.returnValue });
            }
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        });
});

router.get('/GetEvent', middleware.validateRequest([
    "eventId",
], !consts.IS_BODY_REQ), function (req, res) {
    eventsController.getEvent(req.query)
        .then(result => {
            if (result.returnValue == 0) {
                res.status(HttpStatus.OK).json(JSON.parse(
                    result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']));
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ statusCode: result.returnValue });
            }
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        });
});

router.put('/UpdateEvent', middleware.validateRequest([
    "idEvento"
], consts.IS_BODY_REQ), function (req, res) {
    eventsController.updateEvent(req.body)
        .then(result => {
            if (result.returnValue == 0) {
                res.status(HttpStatus.NO_CONTENT).json({});
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ statusCode: result.returnValue });
            }
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        });
});

router.delete('/DeleteEvent', middleware.validateRequest([
    "eventId",
], !consts.IS_BODY_REQ), function (req, res) {
    eventsController.deleteEvent(req.query)
        .then(result => {
            if (result.returnValue == 0) {
                res.status(HttpStatus.NO_CONTENT).json({});
            } else {
                res.status(HttpStatus.BAD_REQUEST).json({ statusCode: result.returnValue });
            }
        })
        .catch(err => {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
        });
});

module.exports = router;