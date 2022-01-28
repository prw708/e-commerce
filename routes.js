const express = require('express');
const router = express.Router();

const Products_Controller = require('./controllers/products.js');

router.get('/', Products_Controller.home_get);
router.post('/load', Products_Controller.load_post);
router.post('/add', Products_Controller.add_product_post);
router.get('/add/confirm', Products_Controller.add_product_confirm_get);
router.post('/delete', Products_Controller.delete_product_post);
router.get('/delete/confirm', Products_Controller.delete_product_confirm_get);

router.post('/create-invoice', Products_Controller.create_invoice_post);
router.post('/create-payment-intent', Products_Controller.create_payment_intent_post);
router.get('/payment/confirm', Products_Controller.payment_confirm_get);
router.post('/log-payment', Products_Controller.log_payment_post);
router.get('/log/confirm', Products_Controller.log_confirm_get);
router.post('/shipping-cost', Products_Controller.shipping_cost_post);
router.post('/get-tax', Products_Controller.get_tax_post);

module.exports = router;
