import express from 'express';
import {
  getIdeas,
  createIdea,
  updateIdea,
  deleteIdea
} from '../controllers/ideaController.js';

const router = express.Router();

router.route('/')
  .get(getIdeas)
  .post(createIdea);

router.route('/:id')
  .put(updateIdea)
  .delete(deleteIdea);

export default router;
