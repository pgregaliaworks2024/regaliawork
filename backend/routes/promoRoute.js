import express from 'express';
import { createPromo, getAllPromos ,deletePromo} from '../controllers/promoController.js';

const promoRouter = express.Router();

promoRouter.post('/promos', createPromo);
promoRouter.get('/promos',getAllPromos);
promoRouter.delete('/promos/:id', deletePromo);


export default promoRouter;
