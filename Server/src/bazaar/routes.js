const express = require('express');

const controller = require('./controller/index');

const router = express.Router();

router.get('/', (req, res) => {
  controller.getStatus(res);
});

router.get('/getRedLineStealer', (req, res) => {
  controller.getRedLineStealer(res);
});

router.get('/search', (req, res) => {
  controller.search(req, res);
});

router.get('/getDetail', (req, res) => {
  controller.getDetail(req, res);
});

router.get('/export', (req, res) => {
  controller.export(req, res);
});

router.get('/download', (req, res) => {
  controller.download(req, res);
});

router.get('/getListExportFiles', (req, res) => {
  controller.getListExportFiles(req, res);
})

module.exports = router;
