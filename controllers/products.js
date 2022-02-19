const { v4: uuidv4 } = require('uuid');
const { body, param, query, matchedData, validationResult } = require('express-validator');
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage()
});

const cookieOptions = require('../../scripts/cookieOptions');
const utils = require('../../scripts/utilities');
const winston = require('../../scripts/log');
const rateLimiter = require('../../scripts/rateLimiter');
const { getName } = require('country-list');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Big = require('big.js');
Big.DP = 2;
Big.RM = Big.roundHalfUp;

const mongoose = require('mongoose');
const accountModels = require('../../account/models.js');
const productModels = require('../models.js');

const BASEPATH = '/projects/e-commerce';

exports.home_get = function(req, res, next) {
  if (!req.session.loggedInAs || !req.session.loggedInAsId) {
    res.render('../e-commerce/views/all', {
      title: 'All Products',
      admin: 'false',
    });
  } else {
    accountModels.user.findOne({ username: req.session.loggedInAs, admin: true }).exec()
      .then(function(user) {
        if (!user) {
          res.render('../e-commerce/views/all', {
            title: 'All Products',
            admin: 'false',
          });
        } else {
          res.render('../e-commerce/views/all', {
            title: 'All Products',
            admin: 'true',
          });
        }
      })
  }
};

exports.load_post = [
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'load' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        productModels.product.find({})
          .populate('owner')
          .lean()
          .exec()
          .then(function(products) {
            if (req.xhr) {
              for (product of products) {
                product.price = product.price.toString();
              }
              res.status(200).json(products);
            } else {
              res.render('../e-commerce/views/confirm', {
                title: 'Load Data',
                error: 'Products loaded successfully!',
                back: 1
              });
            }
          })
          .catch(err => handleLoadError(err, 'Products not found.'));
      })
      .catch(err => handleLoadError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (req.xhr) {
        res.status(400).json(errors.array({ onlyFirstError: true }));
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Load Data',
          error: 'An error occurred while loading the data. Please try again later.',
          back: 1
        });
      }
    }
    function handleLoadError(err, msg) {
      errors = errors.array({ onlyFirstError: true });
      errors.push({
        param: 'load',
        msg: msg
      });
      if (err) {
        winston.logger.error(err);
      }
      if (req.xhr) {
        res.status(400).json(errors);
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Load Data',
          error: 'An error occurred while loading the data. Please try again later.',
          back: 1
        });
      }
    }
  }
];

exports.add_product_post = [
  upload.single('image'),
  body('title', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('category', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('price', 'Format must be in XXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 9999.99, locale: 'en-US' })
    .toFloat(),
  body('description', 'Can be 0 to 150 characters in length.')
    .trim()
    .isLength({ min: 0, max: 150 })
    .matches(/^[A-Za-z0-9 \-,.!?:;\'"#@$%\n']{0,150}$/)
    .whitelist('A-Za-z0-9 \\-,.!?:;\'"#@$%\n'),
  body('shippable', 'Can be true or false.')
    .trim()
    .isIn(['true', 'false'])
    .escape(),
  body('weight', 'Format must be in XXXX.')
    .trim()
    .escape()
    .isInt({ min: 0, max: 9999, allow_leading_zeroes: false })
    .toInt()
    .optional({ checkFalsy: true }),
  body('width', 'Format must be in XXXX.')
    .trim()
    .escape()
    .isInt({ min: 0, max: 9999, allow_leading_zeroes: false })
    .toInt()
    .optional({ checkFalsy: true }),
  body('length', 'Format must be in XXXX.')
    .trim()
    .escape()
    .isInt({ min: 0, max: 9999, allow_leading_zeroes: false })
    .toInt()
    .optional({ checkFalsy: true }),
  body('height', 'Format must be in XXXX.')
    .trim()
    .escape()
    .isInt({ min: 0, max: 9999, allow_leading_zeroes: false })
    .toInt()
    .optional({ checkFalsy: true }),
  body('time', 'Invalid value.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt()
    .toInt(10),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    let pastTime = utils.pastTimeFrame(data.time, 2);
    if (!req.session.loggedInAs || !req.session.loggedInAsId) {
      if (req.xhr) {
        res.status(401).json('Not logged in.');
      } else {
        res.redirect('/website/account/login');
      }
    } else if (req.file && req.file.size > 1000000) {
      handleAddError(req.file.size, 'File is too large.');
    } else if (req.file && 
      (req.file.mimetype !== 'image/png' && 
      req.file.mimetype !== 'image/jpeg' && 
      req.file.mimetype !== 'image/gif')
    ) {
      handleAddError(req.file.originalname, 'Please use a valid image.');
    } else if (errors.isEmpty()) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'add' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        let productCount, existing, productId;
        accountModels.user.findOne({ username: req.session.loggedInAs, admin: true }).exec()
          .then(function(user) {
            if (!user) {
              return Promise.reject(null);
            } else {
              return productModels.product.countDocuments({ owner: req.session.loggedInAsId }).exec()
            }
          })
          .then(function(count) {
            if (count) {
              productCount = count;
            } else {
              productCount = 0;
            }
            return productModels.product.findOne({ 
              category: data.category, 
              title: data.title, 
              owner: req.session.loggedInAsId 
            }).exec();
          })
          .then(function(product) {
            existing = product;
            return accountModels.userLevel.findOne({ user: req.session.loggedInAsId }).exec();
          })
          .then(function(user) {
            if ((!existing && ((productCount + 1) > user.maxProducts)) || 
                (existing && productCount > user.maxProducts)) {
              return Promise.reject(productCount + 1);
            } else {
              user.experience = user.experience + 10;
              return user.save();
            }
          })
          .then(function(doc) {
            if (!data.height) {
              data.height = 0;
            }
            if (!data.length) {
              data.length = 0;
            }
            if (!data.width) {
              data.width = 0;
            }
            if (!data.weight) {
              data.weight = 0;
            }
            return stripe.products.create({
              name: data.title,
              shippable: data.shippable === 'true',
              package_dimensions: {
                height: data.height,
                length: data.length,
                width: data.width,
                weight: data.weight,
              }
            });
          })
          .then(function(doc) {
            productId = doc.id;
            let price = new Big(data.price);
            return stripe.prices.create({
              currency: 'usd',
              product: productId,
              unit_amount: price.times(100).toNumber(),
              tax_behavior: 'exclusive',
            });
          })
          .then(function(doc) {
            if (existing) {
              existing.title = data.title;
              if (req.file) {
                existing.image = req.file.buffer.toString('base64');
              }
              existing.category = data.category;
              existing.price = data.price;
              existing.priceId = doc.id;
              existing.description = data.description;
              existing.shippable = data.shippable;
              existing.weight = data.weight;
              existing.size = {
                width: data.width,
                length: data.length,
                height: data.height,
              };
            } else {
              const INVENTORY_AMOUNT = 100;
              let IMAGE = '';
              if (req.file) {
                IMAGE = req.file.buffer.toString('base64');
              }
              existing = new productModels.product({
                id: productId,
                category: data.category,
                title: data.title,
                image: IMAGE,
                price: data.price,
                priceId: doc.id,
                inventoryAmount: INVENTORY_AMOUNT,
                description: data.description,
                shippable: data.shippable,
                weight: data.weight,
                size: {
                  width: data.width,
                  length: data.length,
                  height: data.height,
                },
                owner: req.session.loggedInAsId,
              });
            }
            return existing.save();
          })
          .then(function(doc) {
            if (req.xhr) {
              res.status(200).json(Date.now());
            } else {
              res.redirect(BASEPATH + '/add/confirm');
            }
          })
          .catch((err) => handleAddError(err, 'An error occurred while adding the product. Please try again later.'));
      })
      .catch(err => handleAddError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (!pastTime) {
        handleAddError(data.time, 'An error occurred while adding the product. Please try again later.');
      } else {
        if (req.xhr) {
          res.status(400).json('Add failed.');
        } else {
          res.render('../e-commerce/views/confirm', {
            title: 'Add Data',
            error: 'An error occurred while adding the product. Please try again later.',
            back: 1
          });
        }
      }
    }
    function handleAddError(err, msg) {
      if (err) {
        winston.logger.error(err);
      }
      if (typeof err === 'number') {
        msg = 'The maximum amount of products has been reached.';
      }
      if (req.xhr) {
        res.status(400).json(msg);
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Add Data',
          error: 'An error occurred while adding the product. Please try again later.',
          back: 1
        });
      }
    }
  }
];

exports.add_product_confirm_get = function(req, res, next) {
  res.render('../e-commerce/views/confirm', {
    title: 'Add Product',
    success: 'Product added successfully!',
    back: 2,
  });
};

exports.delete_product_post = [
  body('product', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('category', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('owner', 'Can contain A-Z, a-z, 0-9, and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9\-]{1,50}$/)
    .whitelist('A-Za-z0-9\\-'),
  body('time', 'Invalid value.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt()
    .toInt(10),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    let pastTime = utils.pastTimeFrame(data.time, 2);
    if (!req.session.loggedInAs || !req.session.loggedInAsId) {
      if (req.xhr) {
        res.status(401).json('Not logged in.');
      } else {
        res.redirect('/website/account/login');
      }
    } else if (errors.isEmpty()) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'delete' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        accountModels.user.findOne({ username: req.session.loggedInAs, admin: true }).exec()
          .then(function(user) {
            if (!user) {
              return Promise.reject(null);
            } else {
              return productModels.product.findOneAndDelete({ 
                owner: req.session.loggedInAsId, 
                title: data.product, 
                category: data.category,
              }).exec();
            }
          })
          .then(function(doc) {
            return stripe.products.update(doc.id, { 
              active: false,
            });
          })
          .then(function(doc) {
            if (doc) {
              if (req.xhr) {
                res.status(200).json(Date.now());
              } else {
                res.redirect(BASEPATH + '/delete/confirm');
              }
            } else {
              if (req.xhr) {
                res.status(400).json('Product not found.');
              } else {
                res.render('../e-commerce/views/confirm', {
                  title: 'Delete Data',
                  error: 'Product not found.',
                  back: 1
                });
              }
            }
          })
          .catch((err) => handleDeleteError(err, 'An error occurred while deleting the product. Please try again later.'));
      })
      .catch(err => handleDeleteError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (!pastTime) {
        handleDeleteError(data.time, 'An error occurred while deleting the product. Please try again later.');
      } else {
        if (req.xhr) {
          res.status(400).json('Delete failed.');
        } else {
          res.render('../e-commerce/views/confirm', {
            title: 'Delete Data',
            error: 'An error occurred while deleting the product. Please try again later.',
            back: 1
          });
        }
      }
    }
    function handleDeleteError(err, msg) {
      if (err) {
        winston.logger.error(err);
      }
      if (req.xhr) {
        res.status(400).json(msg);
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Delete Data',
          error: 'An error occurred while deleting the product. Please try again later.',
          back: 1
        });
      }
    }
  }
];

exports.delete_product_confirm_get = function(req, res, next) {
  res.render('../e-commerce/views/confirm', {
    title: 'Delete Product',
    success: 'Product deleted successfully!',
    back: 2,
  });
};

exports.create_invoice_post = [
  body('invoiceId', 'Invalid invoice ID.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_]+$/)
    .optional(),
  body('customerId', 'Invalid customer ID.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_]+$/)
    .optional(),
  body('cart.*.id', 'Invalid ID.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9_]{1,50}$/)
    .whitelist('A-Za-z0-9_')
    .escape(),
  body('cart.*.product', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('cart.*.category', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('cart.*.price', 'Format must be in XXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 9999.99, locale: 'en-US' }),
  body('cart.*.quantity', 'Must be a positive integer.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt({ min: 1, max: 99 }),
  body('cart.*.shippable', 'Can be true or false.')
    .trim()
    .escape()
    .isBoolean()
    .toBoolean({ strict: true }),
  body('time', 'Invalid value.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt()
    .toInt(10),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    let pastTime = utils.pastTimeFrame(data.time, 2);
    if (errors.isEmpty() && pastTime) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'invoice' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        let amount = new Big(0);
        let items = [];
        let quantities = [];
        let subtotals = [];
        let id = '';
        let shippable = false;
        let customerId = null;
        let existingCustomer = false;
        if (data.invoiceId) {
          id = data.invoiceId;
        }
        if (data.cart) {
          accountModels.user.findOne({ username: req.session.loggedInAs }, 'customerId').exec()
          .then(function(doc) {
            if (!doc) {
              if (data.customerId) {
                existingCustomer = true;
                return stripe.customers.retrieve(data.customerId);
              } else {
                return stripe.customers.create();
              }
            } else {
              existingCustomer = true;
              customerId = doc.customerId;
              return Promise.resolve(null);
            }
          })
          .then(function(doc) {
            if (doc) {
              customerId = doc.id;
            }
            return Promise.resolve(null);
          })
          .then(function(doc) {
            for (item of data.cart) {
              items.push(productModels.product.findOne({ id: item.id }).exec());
              quantities.push(item.quantity);
              if (item.shippable) {
                shippable = true;
              }
            }
            Promise.all(items)
            .then(function(values) {
              for (let i = 0; i < values.length; i++) {
                let quantity = new Big(quantities[i]);
                let price = new Big(values[i].price.toString());
                let subtotal = price.times(quantity);
                subtotals.push(stripe.invoiceItems.create({
                  customer: customerId,
                  currency: 'usd',
                  price: values[i].priceId,
                  quantity: quantity.toNumber(),
                }));
                amount = amount.plus(subtotal);
              }
              Promise.all(subtotals)
              .then(function(subtotalValues) {
                if (id) {
                  return stripe.invoices.del(id);
                } else {
                  return Promise.resolve(null);
                }
              })
              .then(function(doc) {
                return stripe.invoices.create({
                  customer: customerId,
                  auto_advance: false,
                  collection_method: 'charge_automatically',
                  automatic_tax: { enabled: true },
                });
              })
              .then(function(invoice) {
                let taxAmount = new Big(0);
                for (let i = 0; i < invoice.total_tax_amounts.length; i++) {
                  taxAmount = taxAmount.plus(invoice.total_tax_amounts[i].amount);
                }
                res.json({
                  invoiceId: invoice.id,
                  customerId: customerId,
                  existingCustomer: existingCustomer,
                  shippable: shippable,
                  subtotal: amount.round(2).toNumber(),
                  total: new Big(invoice.total).div(100).round(2).toNumber(),
                  total_tax_amounts: taxAmount.div(100).round(2).toNumber(),
                });
              })
              .catch(err => handleInvoiceError(err, 'An error occurred while creating the invoice. Please try again later.'));
            })
            .catch(err => handleInvoiceError(err, 'An error occurred while creating the invoice. Please try again later.'));
          })
          .catch(err => handleInvoiceError(err, 'An error occurred while creating the invoice. Please try again later.'));
        } else {
          if (id) {
            stripe.invoices.del(id)
            .then(function(invoice) {
              res.status(400).json('An error occurred while creating the invoice. Please try again later.');
            })
            .catch(function(err) {
              handleInvoiceError(err, 'An error occurred while creating the invoice. Please try again later.');
            });
          } else {
            handleInvoiceError(null, 'An error occurred while creating the invoice. Please try again later.');
          }
        }
      })
      .catch(err => handleInvoiceError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (!pastTime) {
        handleInvoiceError(data.time, 'An error occurred while creating the invoice. Please try again later.');
      } else {
        if (req.xhr) {
          res.status(400).json('Invoice creation failed.');
        } else {
          res.render('../e-commerce/views/confirm', {
            title: 'Checkout',
            error: 'An error occurred while creating the invoice. Please try again later.',
            back: 1
          });
        }
      }
    }
    function handleInvoiceError(err, msg) {
      if (err) {
        winston.logger.error(err);
      }
      if (req.xhr) {
        res.status(400).json(msg);
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Checkout',
          error: 'An error occurred while creating the invoice. Please try again later.',
          back: 1,
        });
      }
    }
  }
];

exports.shipping_cost_post = [
  body('invoiceId', 'Invalid invoice ID.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_]+$/)
    .optional(),
  body('customerId', 'Invalid customer ID.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_]+$/)
    .optional(),
  body('shippingAddress.postalCode', 'Invalid postal code.')
    .trim()
    .escape()
    .isPostalCode('any'),
  body('shippingAddress.country', 'Must be a valid ISO 3166-1 alpha-2 country code.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .isISO31661Alpha2(),
  body('cart.*.id', 'Invalid ID.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9_]{1,50}$/)
    .whitelist('A-Za-z0-9_')
    .escape(),
  body('cart.*.product', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('cart.*.category', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('cart.*.price', 'Format must be in XXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 9999.99, locale: 'en-US' }),
  body('cart.*.quantity', 'Must be a positive integer.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt({ min: 1, max: 99 }),
  body('cart.*.shippable', 'Can be true or false.')
    .trim()
    .escape()
    .isBoolean()
    .toBoolean({ strict: true }),
  body('time', 'Invalid value.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt()
    .toInt(10),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    let pastTime = utils.pastTimeFrame(data.time, 2);
    if (errors.isEmpty() && pastTime) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'shipping' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        let amount = new Big(0);
        let items = [];
        let quantities = [];
        let subtotals = [];
        let id = '';
        let customerId = null;
        let shippable = false;
        let shippingCost = new Big(0);
        if (data.invoiceId) {
          id = data.invoiceId;
        }
        if (data.cart) {
          accountModels.user.findOne({ username: req.session.loggedInAs }, 'customerId').exec()
          .then(function(doc) {
            if (!doc) {
              if (data.customerId) {
                return stripe.customers.retrieve(data.customerId);
              } else {
                return stripe.customers.create();
              }
            } else {
              customerId = doc.customerId;
              return Promise.resolve(null);
            }
          })
          .then(function(doc) {
            if (doc) {
              customerId = doc.id;
            }
            return Promise.resolve(null);
          })
          .then(function(doc) {
            return stripe.customers.update(customerId, {
              address: { 
                postal_code: data.shippingAddress.postalCode, 
                country: data.shippingAddress.country 
              },
            });
          })
          .then(function(doc) {
            if (id) {
              return stripe.invoices.del(id);
            } else {
              return Promise.resolve(null);
            }
          })
          .then(function(doc) {
            for (item of data.cart) {
              items.push(productModels.product.findOne({ id: item.id }).exec());
              quantities.push(parseInt(item.quantity, 10));
              if (item.shippable) {
                shippable = true;
              }
            }
            Promise.all(items)
            .then(function(values) {
              for (let i = 0; i < values.length; i++) {
                let quantity = new Big(quantities[i]);
                let price = new Big(values[i].price.toString());
                let subtotal = price.times(quantity);
                subtotals.push(stripe.invoiceItems.create({
                  customer: customerId,
                  currency: 'usd',
                  price: values[i].priceId,
                  quantity: quantity.toNumber(),
                }));
                amount = amount.plus(subtotal);
              }
              Promise.all(subtotals)
              .then(function(subtotalValues) {
                let requests = [];
                const ZIP_ORIGIN = '90210';
                if (shippable) {
                  if (data.shippingAddress.country.toLowerCase() === 'us') {
                    for (let i = 0; i < values.length; i++) {
                      if (values[i].shippable) {
                        for (let j = 0; j < quantities[i]; j++) {
                          let xml = '<RateV4Request USERID="563PENGU1781"> \
                          <Revision>2</Revision>';
                          xml += '<Package ID="' + i.toString() + j.toString() + '">'
                          if (values[i].weight <= 13) {
                            xml += '<Service>First Class</Service> \
                            <FirstClassMailType>PACKAGE SERVICE RETAIL</FirstClassMailType>';
                          } else {
                            xml += '<Service>PRIORITY</Service>';
                          }
                          xml += '<ZipOrigination>' + ZIP_ORIGIN + '</ZipOrigination> \
                          <ZipDestination>' + data.shippingAddress.postalCode + '</ZipDestination> \
                          <Pounds>0</Pounds> \
                          <Ounces>' + values[i].weight + '</Ounces>';
                          if (values[i].weight <= 13) {
                            xml += '<Container></Container>';
                          } else {
                            xml += '<Container>VARIABLE</Container>';
                          }
                          xml += '<Width>' + values[i].size.width + '</Width> \
                          <Length>' + values[i].size.length + '</Length> \
                          <Height>' + values[i].size.height + '</Height> \
                          <Machinable>true</Machinable> \
                          </Package>';
                          xml += '</RateV4Request>';
                          let url = 'https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=' + xml;
                          requests.push(utils.postXML(url, {}, xml, (parsedJSON) => {
                            let minPrice = new Big(0);
                            if (parsedJSON.RateV4Response.Package[0].Postage) {
                              for (let a = 0; a < parsedJSON.RateV4Response.Package[0].Postage.length; a++) {
                                let price = new Big(parsedJSON.RateV4Response.Package[0].Postage[a].Rate[0]);
                                if (minPrice.toNumber() === 0) {
                                  minPrice = price;
                                } else if (price.toNumber() < minPrice.toNumber()) {
                                  minPrice = price;
                                }
                              }
                            }
                            if (minPrice.toNumber() !== 0) {
                              return minPrice.round(2).toNumber();
                            } else {
                              return 0;
                            }
                          }));
                        }
                      }
                    }
                    return Promise.resolve(requests);
                  } else {
                    for (let i = 0; i < values.length; i++) {
                      if (values[i].shippable) {
                        for (let j = 0; j < quantities[i]; j++) {
                          let xml = '<IntlRateV2Request USERID="563PENGU1781"> \
                          <Revision>2</Revision>';
                          xml += '<Package ID="' + i.toString() + j.toString() + '"> \
                          <Pounds>0</Pounds> \
                          <Ounces>' + values[i].weight + '</Ounces> \
                          <Machinable>true</Machinable> \
                          <MailType>Package</MailType> \
                          <ValueOfContents>' + values[i].price.toString() + '</ValueOfContents> \
                          <Country>' + getName(data.shippingAddress.country) + '</Country> \
                          <Container></Container> \
                          <Width>' + values[i].size.width + '</Width> \
                          <Length>' + values[i].size.length + '</Length> \
                          <Height>' + values[i].size.height + '</Height> \
                          <OriginZip>' + ZIP_ORIGIN + '</OriginZip> \
                          </Package>';
                          xml += '</IntlRateV2Request>';
                          let url = 'https://secure.shippingapis.com/ShippingAPI.dll?API=IntlRateV2&XML=' + xml;
                          requests.push(utils.postXML(url, {}, xml, (parsedJSON) => {
                            let minPrice = new Big(0);
                            if (parsedJSON.IntlRateV2Response.Package[0].Service) {
                              for (let a = 0; a < parsedJSON.IntlRateV2Response.Package[0].Service.length; a++) {
                                let price = new Big(parsedJSON.IntlRateV2Response.Package[0].Service[a].Postage[0]);
                                if (minPrice.toNumber() === 0) {
                                  minPrice = price;
                                } else if (price.toNumber() < minPrice.toNumber()) {
                                  minPrice = price;
                                }
                              }
                            }
                            if (minPrice.toNumber() !== 0) {
                              return minPrice.round(2).toNumber();
                            } else {
                              return 0;
                            }
                          }));
                        }
                      }
                    }
                    return Promise.resolve(requests);
                  }
                } else {
                  return Promise.resolve([]);
                }
              })
              .then(function(requests) {
                Promise.all(requests)
                .then(function(requestValues) {
                  let total = new Big(0);
                  for (price of requestValues) {
                    let shippingCost = new Big(price);
                    total = total.plus(shippingCost);
                  }
                  return Promise.resolve(total.round(2).toNumber());
                })
                .catch(function(doc) {
                  return Promise.resolve(0);
                })
                .then(function(price) {
                  shippingCost = new Big(price);
                  amount = amount.plus(shippingCost);
                  return stripe.invoiceItems.create({
                    customer: customerId,
                    currency: 'usd',
                    price_data: {
                      currency: 'usd',
                      product: 'prod_KSxFF9X4WjkPk8',
                      unit_amount: shippingCost.times(100).round(2).toNumber(),
                      tax_behavior: 'exclusive',
                    }
                  });
                })
                .then(function(doc) {
                  return stripe.invoices.create({
                    customer: customerId,
                    auto_advance: false,
                    collection_method: 'charge_automatically',
                    automatic_tax: { enabled: true },
                  });
                })
                .then(function(invoice) {
                  let taxAmount = new Big(0);
                  for (let i = 0; i < invoice.total_tax_amounts.length; i++) {
                    taxAmount = taxAmount.plus(invoice.total_tax_amounts[i].amount);
                  }
                  res.json({
                    invoiceId: invoice.id,
                    shippingCost: shippingCost.round(2).toNumber(),
                    total: new Big(invoice.total).div(100).round(2).toNumber(),
                    total_tax_amounts: taxAmount.div(100).round(2).toNumber(),
                  });
                })
                .catch(err => handleShippingError(err, 'An error occurred while getting shipping costs. Please try again later.'));
              })
              .catch(err => handleShippingError(err, 'An error occurred while getting shipping costs. Please try again later.'));
            })
            .catch(err => handleShippingError(err, 'An error occurred while getting shipping costs. Please try again later.'));
          })
          .catch(err => handleShippingError(err, 'An error occurred while getting shipping costs. Please try again later.'));
        } else {
          handleShippingError(null, 'An error occurred while getting shipping costs. Please try again later.');
        }
      })
      .catch(err => handleShippingError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (!pastTime) {
        handleShippingError(data.time, 'An error occurred while getting shipping costs. Please try again later.');
      } else {
        if (req.xhr) {
          res.status(400).json(errors.array({ onlyFirstError: true }));
        } else {
          res.render('../e-commerce/views/confirm', {
            title: 'Checkout',
            error: 'An error occurred while getting shipping costs. Please try again later.',
            back: 1
          });
        }
      }
    }
    function handleShippingError(err, msg) {
      if (err) {
        winston.logger.error(err);
      }
      if (req.xhr) {
        res.status(400).json(errors.array({ onlyFirstError: true }));
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Checkout',
          error: 'An error occurred while getting shipping costs. Please try again later.',
          back: 1,
        });
      }
    }
  }
];

exports.get_tax_post = [
  body('invoiceId', 'Invalid invoice ID.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_]+$/)
    .optional(),
  body('customerId', 'Invalid customer ID.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_]+$/)
    .optional(),
  body('cardPostalCode', 'Invalid postal code.')
    .trim()
    .escape()
    .isPostalCode('any'),
  body('cardCountry', 'Must be a valid ISO 3166-1 alpha-2 country code.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .isISO31661Alpha2(),
  body('shippingCost', 'Format must be in XXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 9999.99, locale: 'en-US' }),
  body('cart.*.id', 'Invalid ID.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9_]{1,50}$/)
    .whitelist('A-Za-z0-9_')
    .escape(),
  body('cart.*.product', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('cart.*.category', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('cart.*.price', 'Format must be in XXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 9999.99, locale: 'en-US' }),
  body('cart.*.quantity', 'Must be a positive integer.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt({ min: 1, max: 99 }),
  body('cart.*.shippable', 'Can be true or false.')
    .trim()
    .escape()
    .isBoolean()
    .toBoolean({ strict: true }),
  body('time', 'Invalid value.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt()
    .toInt(10),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    let pastTime = utils.pastTimeFrame(data.time, 2);
    if (errors.isEmpty() && pastTime) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'tax' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        let amount = new Big(0);
        let items = [];
        let quantities = [];
        let subtotals = [];
        let id = '';
        let customerId = null;
        let shippingCost = new Big(0);
        if (data.invoiceId) {
          id = data.invoiceId;
        }
        if (data.cart) {
          accountModels.user.findOne({ username: req.session.loggedInAs }, 'customerId').exec()
          .then(function(doc) {
            if (!doc) {
              if (data.customerId) {
                return stripe.customers.retrieve(data.customerId);
              } else {
                return stripe.customers.create();
              }
            } else {
              customerId = doc.customerId;
              return Promise.resolve(null);
            }
          })
          .then(function(doc) {
            if (doc) {
              customerId = doc.id;
            }
            return Promise.resolve(null);
          })
          .then(function(doc) {
            if (id) {
              return stripe.invoices.del(id);
            } else {
              return Promise.resolve(null);
            }
          })
          .then(function(doc) {
            return stripe.customers.update(customerId, {
              address: { 
                postal_code: data.cardPostalCode, 
                country: data.cardCountry 
              },
            });
          })
          .then(function(doc) {
            for (item of data.cart) {
              items.push(productModels.product.findOne({ id: item.id }).exec());
              quantities.push(item.quantity);
            }
            Promise.all(items)
            .then(function(values) {
              for (let i = 0; i < values.length; i++) {
                let quantity = new Big(quantities[i]);
                let price = new Big(values[i].price.toString());
                let subtotal = price.times(quantity);
                subtotals.push(stripe.invoiceItems.create({
                  customer: customerId,
                  currency: 'usd',
                  price: values[i].priceId,
                  quantity: quantity.toNumber(),
                }));
                amount = amount.plus(subtotal);
              }
              Promise.all(subtotals)
              .then(function(doc) {
                shippingCost = new Big(data.shippingCost);
                amount = amount.plus(shippingCost);
                return stripe.invoiceItems.create({
                  customer: customerId,
                  currency: 'usd',
                  price_data: {
                    currency: 'usd',
                    product: 'prod_KSxFF9X4WjkPk8',
                    unit_amount: shippingCost.times(100).round(2).toNumber(),
                    tax_behavior: 'exclusive',
                  }
                });
              })
              .then(function(doc) {
                return stripe.invoices.create({
                  customer: customerId,
                  auto_advance: false,
                  collection_method: 'charge_automatically',
                  automatic_tax: { enabled: true },
                });
              })
              .then(function(invoice) {
                let taxAmount = new Big(0);
                for (let i = 0; i < invoice.total_tax_amounts.length; i++) {
                  taxAmount = taxAmount.plus(invoice.total_tax_amounts[i].amount);
                }
                res.json({
                  invoiceId: invoice.id,
                  total: new Big(invoice.total).div(100).round(2).toNumber(),
                  total_tax_amounts: taxAmount.div(100).round(2).toNumber(),
                });
              })
              .catch(err => handleTaxError(err, 'An error occurred while getting the tax. Please try again later.'));
            })
            .catch(err => handleTaxError(err, 'An error occurred while getting the tax. Please try again later.'));
          })
          .catch(err => handleTaxError(err, 'An error occurred while getting the tax. Please try again later.'));
        } else {
          if (id) {
            stripe.invoices.del(id)
            .then(function(invoice) {
              res.status(400).json('An error occurred while getting the tax. Please try again later.');
            })
            .catch(function(err) {
              handleTaxError(err, 'An error occurred while getting the tax. Please try again later.');
            });
          } else {
            handleTaxError(null, 'An error occurred while getting the tax. Please try again later.');
          }
        }
      })
      .catch(err => handleTaxError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (!pastTime) {
        handleTaxError(data.time, 'An error occurred while getting the tax. Please try again later.');
      } else {
        if (req.xhr) {
          res.status(400).json(errors.array({ onlyFirstError: true }));
        } else {
          res.render('../e-commerce/views/confirm', {
            title: 'Checkout',
            error: 'An error occurred while getting the tax. Please try again later.',
            back: 1
          });
        }
      }
    }
    function handleTaxError(err, msg) {
      if (err) {
        winston.logger.error(err);
      }
      if (req.xhr) {
        res.status(400).json(errors.array({ onlyFirstError: true }));
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Checkout',
          error: 'An error occurred while getting the tax. Please try again later.',
          back: 1,
        });
      }
    }
  }
];

exports.create_payment_intent_post = [
  body('total', 'Format must be in XXXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 99999.99, locale: 'en-US' }),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'intent' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        let amount = new Big(data.total);
        stripe.paymentIntents.create({
          currency: 'usd',
          amount: amount.times(100).round(2).toNumber(),
        })
        .then(function(doc) {
          res.json({
            intentId: doc.id,
            clientSecret: doc.client_secret,
          });
        })
        .catch(err => handleIntentError(err, 'An error occurred while creating the payment intent. Please try again later.'));
      })
      .catch(err => handleIntentError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (req.xhr) {
        res.status(400).json('Payment tntent creation failed.');
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Checkout',
          error: 'An error occurred while creating the payment intent. Please try again later.',
          back: 1
        });
      }
    }
    function handleIntentError(err, msg) {
      if (err) {
        winston.logger.error(err);
      }
      if (req.xhr) {
        res.status(400).json(msg);
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Checkout',
          error: 'An error occurred while creating the payment intent. Please try again later.',
          back: 1,
        });
      }
    }
  }
];

exports.log_payment_post = [
  body('invoiceId', 'Invalid invoice ID.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_]+$/),
  body('intentId', 'Invalid payment intent ID.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_]+$/),
  body('customerId', 'Invalid customer ID.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_]+$/),
  body('existingCustomer', 'Can be true or false.')
    .trim()
    .escape()
    .isBoolean()
    .toBoolean({ strict: true }),
  body('cardPostalCode', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[A-Za-z0-9 \-']{1,100}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('cardCountry', 'Must be a valid ISO 3166-1 alpha-2 country code.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[A-Za-z0-9 \-']{1,100}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .isISO31661Alpha2(),
  body('cart.*.id', 'Invalid ID.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9_]{1,50}$/)
    .whitelist('A-Za-z0-9_')
    .escape(),
  body('cart.*.product', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('cart.*.category', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 50 })
    .matches(/^[A-Za-z0-9 \-']{1,50}$/)
    .whitelist('A-Za-z0-9 \\-\''),
  body('cart.*.price', 'Format must be in XXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 9999.99, locale: 'en-US' }),
  body('cart.*.quantity', 'Must be a positive integer.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt({ min: 1, max: 99 }),
  body('cart.*.shippable', 'Can be true or false.')
    .trim()
    .escape()
    .isBoolean()
    .toBoolean({ strict: true }),
  body('total', 'Format must be in XXXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 99999.99, locale: 'en-US' }),
  body('shippingCost', 'Format must be in XXXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 99999.99, locale: 'en-US' }),
  body('tax', 'Format must be in XXXXX.XX.')
    .trim()
    .escape()
    .isCurrency({ allow_negatives: false, digits_after_decimal: [0, 1, 2] })
    .isFloat({ min: 0, max: 99999.99, locale: 'en-US' }),
  body('shippingAddress.email', 'Must be a valid email.')
    .trim()
    .isLength({ min: 1, max: 101 })
    .isEmail({ domain_specific_validation: true })
    .escape(),
  body('shippingAddress.name', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[A-Za-z0-9 \-']{1,100}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .optional({ checkFalsy: true }),
  body('shippingAddress.line1', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[A-Za-z0-9 \-']{1,100}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .optional({ checkFalsy: true }),
  body('shippingAddress.line2', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 0, max: 100 })
    .matches(/^[A-Za-z0-9 \-']{0,100}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .optional({ checkFalsy: true }),
  body('shippingAddress.city', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[A-Za-z0-9 \-']{1,100}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .optional({ checkFalsy: true }),
  body('shippingAddress.state', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[A-Za-z0-9 \-']{1,100}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .optional({ checkFalsy: true }),
  body('shippingAddress.postalCode', 'Can contain A-Z, a-z, 0-9, spaces, \', and -.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[A-Za-z0-9 \-']{1,100}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .optional({ checkFalsy: true }),
  body('shippingAddress.country', 'Must be a valid ISO 3166-1 alpha-2 country code.')
    .trim()
    .isLength({ min: 1, max: 100 })
    .matches(/^[A-Za-z0-9 \-']{1,100}$/)
    .whitelist('A-Za-z0-9 \\-\'')
    .isISO31661Alpha2()
    .optional({ checkFalsy: true }),
  body('time', 'Invalid value.')
    .trim()
    .escape()
    .isNumeric({ no_symbols: true })
    .isInt()
    .toInt(10),
  body('g-recaptcha-response', 'Failed reCAPTCHA test.')
    .trim()
    .escape()
    .matches(/^[A-Za-z0-9_\-]+$/),
  function(req, res, next) {
    let data = matchedData(req, { includeOptionals: true, onlyValidData: true, locations: ['body'] });
    let errors = validationResult(req);
    let pastTime = utils.pastTimeFrame(data.time, 2);
    if (errors.isEmpty()) {
      const url = 'https://www.google.com/recaptcha/api/siteverify';
      const requestData = 'secret=' + encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY) + '&' +
                          'response=' + encodeURIComponent(data['g-recaptcha-response']);
      utils.postJSON(url, {}, requestData, (parsedJSON) => {
        if (parsedJSON.success === true &&
            parsedJSON.score >= 0.7 &&
            parsedJSON.action === 'log' &&
            parsedJSON.hostname === req.hostname) {
          return true;
        }
        return Promise.reject('Failed reCAPTCHA test.');
      })
      .then((success) => {
        let items = [];
        let quantities = [];
        let orderDoc;
        for (item of data.cart) {
          items.push(productModels.product.findOne({ id: item.id }).exec());
          quantities.push(item.quantity);
        }
        Promise.all(items)
        .then(async function(values) {
          for (let i = 0; i < values.length; i++) {
            let product = await productModels.product.findOne({ id: values[i].id }).exec();
            let newAmount = product.inventoryAmount;
            if (quantities[i] <= product.inventoryAmount) {
              newAmount = product.inventoryAmount - quantities[i];
            } else {
              return Promise.reject('Not enough inventory.');
            }
            await productModels.product.findOneAndUpdate({ id: values[i].id }, { inventoryAmount: newAmount }).exec();
          }
          return Promise.resolve(null);
        })
        .then(function(doc) {
          let fullOrder = [];
          for (let i = 0; i < items.length; i++) {
            fullOrder.push({
              product: items[i]._id,
              quantity: quantities[i],
            });
          }
          let order = new productModels.order({
            orderId: data.invoiceId,
            paymentId: data.intentId,
            customerId: data.customerId,
            order: fullOrder,
            total: data.total,
            shippingCost: data.shippingCost,
            tax: data.tax,
            cardPostalCode: data.cardPostalCode,
            cardCountry: data.cardCountry,
            shippingAddress: data.shippingAddress,
          });
          return order.save();
        })
        .then(function(doc) {
          orderDoc = doc;
          return stripe.paymentIntents.update(orderDoc.paymentId, {
            metadata: { orderId: orderDoc.orderId },
          });
        })
        .then(function(doc) {
          return stripe.invoices.del(data.invoiceId);
        })
        .then(function(doc) {
          if (data.existingCustomer) {
            return Promise.resolve(null);
          } else {
            return stripe.customers.del(data.customerId);
          }
        })
        .then(function(doc) {
          if (req.session.loggedInAs && req.session.loggedInAsId) {
            return accountModels.userLevel.findOne({ user: req.session.loggedInAsId }).exec();
          } else {
            return Promise.resolve(null);
          }
        })
        .then(function(user) {
          if (user) {
            user.experience = user.experience + 25;
            return user.save();
          }
        })
        .then(function(doc) {
          if (req.xhr) {
            res.status(200).json(orderDoc.orderId);
          } else {
            res.redirect(BASEPATH + '/log/confirm');
          }
        })
        .catch(err => handleLogError(err, 'An error occurred while logging the payment. Please try again later.'));
      })
      .catch(err => handleLogError(err, 'Failed reCAPTCHA test.'));
    } else {
      if (!pastTime) {
        handleLogError(data.time, 'An error occurred while logging the payment. Please try again later.');
      } else {
        if (req.xhr) {
          res.status(400).json(errors.array({ onlyFirstError: true }));
        } else {
          res.render('../e-commerce/views/confirm', {
            title: 'Log Payment',
            error: 'An error occurred while logging the payment. Please try again later.',
            back: 1
          });
        }
      }
    }
    function handleLogError(err, msg) {
      if (err) {
        winston.logger.error(err);
      }
      if (req.xhr) {
        res.status(400).json(errors.array({ onlyFirstError: true }));
      } else {
        res.render('../e-commerce/views/confirm', {
          title: 'Log Payment',
          error: 'An error occurred while logging the payment. Please try again later.',
          back: 1
        });
      }
    }
  }
];

exports.log_confirm_get = function(req, res, next) {
  res.render('../e-commerce/views/confirm', {
    title: 'Log Payment',
    success: 'Payment logged successfully!',
    back: 1,
  });
};

exports.payment_confirm_get = function(req, res, next) {
  res.render('../e-commerce/views/confirm', {
    title: 'Payment Processed',
    success: 'Payment processed successfully!',
    back: 1,
  });
};
