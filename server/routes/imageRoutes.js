// server/routes/imageRoutes.js
import express from 'express';
import * as imageController from '../controllers/imageController.js';

const router = express.Router();

// Route to generate an image from text prompt
router.post('/generate', imageController.generateImage);

// Route to remix/edit an image with a prompt
router.post('/remix', (req, res, next) => {
  req.upload.single('image_file')(req, res, (err) => {
    if (err) {
      console.error('Multer error in remix route:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading file',
        error: err
      });
    }
    imageController.remixImage(req, res);
  });
});

// Route to upscale an image
router.post('/upscale', (req, res, next) => {
  req.upload.single('image_file')(req, res, (err) => {
    if (err) {
      console.error('Multer error in upscale route:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading file',
        error: err
      });
    }
    imageController.upscaleImage(req, res);
  });
});

// Route to describe an image
router.post('/describe', (req, res, next) => {
  req.upload.single('image_file')(req, res, (err) => {
    if (err) {
      console.error('Multer error in describe route:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading file',
        error: err
      });
    }
    imageController.describeImage(req, res);
  });
});

// Route to reframe an image
router.post('/reframe', (req, res, next) => {
  req.upload.single('image_file')(req, res, (err) => {
    if (err) {
      console.error('Multer error in reframe route:', err);
      return res.status(400).json({
        success: false,
        message: err.message || 'Error uploading file',
        error: err
      });
    }
    imageController.reframeImage(req, res);
  });
});

export default router;