// server/routes/imageRoutes.js
import express from 'express';
import * as imageController from '../controllers/imageController.js';

const router = express.Router();

// Route to generate an image from text prompt
router.post('/generate', imageController.generateImage);

// Route to edit an image with mask and prompt
router.post('/edit', (req, res, next) => {
  req.upload.fields([
    { name: 'image_file', maxCount: 1 },
    { name: 'mask', maxCount: 1 }
  ])(req, res, (err) => {
    if (err) return next(err);
    imageController.editImage(req, res, next);
  });
});

// Route to remix an image with a prompt
router.post('/remix', (req, res, next) => {
  req.upload.single('image_file')(req, res, (err) => {
    if (err) return next(err);
    imageController.remixImage(req, res, next);
  });
});

// Route to upscale an image
router.post('/upscale', (req, res, next) => {
  req.upload.single('image_file')(req, res, (err) => {
    if (err) return next(err);
    imageController.upscaleImage(req, res, next);
  });
});

// Route to describe an image
router.post('/describe', (req, res, next) => {
  req.upload.single('image_file')(req, res, (err) => {
    if (err) return next(err);
    imageController.describeImage(req, res, next);
  });
});

// Route to reframe an image
router.post('/reframe', (req, res, next) => {
  req.upload.single('image_file')(req, res, (err) => {
    if (err) return next(err);
    imageController.reframeImage(req, res, next);
  });
});

export default router;