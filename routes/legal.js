import { Router } from 'express';
import { renderPrivacyPolicy, renderTermsOfService, renderContact } from '../templates/legalPages.js';

const router = Router();

router.get('/privacy', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderPrivacyPolicy());
});

router.get('/terms', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderTermsOfService());
});

router.get('/contact', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderContact());
});

export default router;
