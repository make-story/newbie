const path = require('path'); 
//const fs = require('fs');
//const url = require('url');
const express = require('express');
const router = express.Router();
const scenario = require(path.resolve(__dirname, '../controllers/scenario'));
const mecab = require(path.resolve(__dirname, '../controllers/mecab'));

// scenario 관리자 페이지 
router.post('/scenario', scenario.insert);
router.get('/scenario', scenario.select);
router.put('/scenario', scenario.update);
router.delete('/scenario', scenario.delete);

// 형태소 분석기 실행 결과 
router.get('/mecab/:type', mecab.type);

module.exports = router;