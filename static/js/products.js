import * as Vue from 'vue';
import * as VueRouter from 'vue-router';
import ECommerce from './ECommerce.common';
import AllListings from './AllListings.common';
import AddProduct from './AddProduct.common';
import Category from './Category.common';
import Product from './Product.common';
import Checkout from './Checkout.common';
import Confirmation from './Confirmation.common';
import NotFound from './NotFound.common';
import DOMPurify from 'dompurify';
import Big from 'big.js';

var stripe = Stripe("pk_test_51JhL46KClKuuonjPg5XPB2R9mumKBPwE5Eh8aG63dfcV7PCtVS6JfhFvVzdOdh6FrDrqJPelXhUELvbOIuINOTQe00kOWU0YpH");

function getTime() {
  return document.querySelector('meta[name="time-of-load"]').getAttribute('content');
}

function getCSRF() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

function getRecaptchaSiteKey() {
  return document.querySelector('#app').getAttribute('data-recaptchaSiteKey');
}

function getUsername() {
  return document.querySelector('#app').getAttribute('data-username');
}

function getAdmin() {
  return document.querySelector('#app').getAttribute('data-admin') === 'true';
}

var categories = [];
var listings = [];

var routes = [
  { 
    path: '/', 
    alias: '',
    name: 'home', 
    component: AllListings, 
    props: { categories: categories, listings: listings },
  },
  { 
    path: '/add', 
    name: 'add', 
    component: AddProduct, 
    props: { categories: categories, listings: listings },
  },
  { 
    path: '/checkout', 
    name: 'checkout', 
    component: Checkout, 
    props: false,
  },
  { 
    path: '/confirmation', 
    name: 'confirmation', 
    component: Confirmation, 
    props: false,
  },
  { 
    path: '/category/:category', 
    name: 'category', 
    component: Category,
    props: categoryProps,
    beforeEnter: (to) => {
      var existingCategory = false;
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].replace(' ', '-').toLowerCase() === to.params.category) {
          existingCategory = true;
        }
      }
      if (!existingCategory) {
        return {
          name: 'notfound',
          params: { 
            path: to.path.substring(1).split('/'), 
            category: to.params.category 
          },
        };
      }
    },
  },
  { 
    path: '/category/:category/product/:product', 
    name: 'product', 
    component: Product,
    props: productProps,
    beforeEnter: (to) => {
      var existingCategory = false, existingProduct = false;
      var categoryIndex = 0;
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].replace(' ', '-').toLowerCase() === to.params.category) {
          existingCategory = true;
          categoryIndex = i;
        }
      }
      if (listings.length > 0) {
        for (var j = 0; j < listings[categoryIndex].length; j++) {
          if (listings[categoryIndex][j].title.replace(' ', '-').toLowerCase() === to.params.product) {
            existingProduct = true;
          }
        }
      }
      if (!existingCategory || !existingProduct) {
        return {
          name: 'notfound',
          params: { 
            path: to.path.substring(1).split('/'), 
            category: to.params.category, 
            product: to.params.product 
          },
        };
      }
    },
  },
  { 
    path: '/:path(.*)*', 
    name: 'notfound', 
    component: NotFound,
    props: false,
  },
];

var router = VueRouter.createRouter({
  history: VueRouter.createWebHistory('/projects/e-commerce'),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
  routes,
});

var app = Vue.createApp({
  render() {
    return Vue.h(ECommerce, { 
      onSendData: this.SendData, 
      onDeleteProduct: this.DeleteProduct,
      onCheckout: this.Checkout,
      onFormSubmit: this.FormSubmit,
      onShippingCost: this.ShippingCost,
      onGetTax: this.GetTax,
      username: this.username,
      admin: this.admin,
      loading: this.loading,
      costs: this.costs,
      stripeKey: this.stripeKey,
      errors: this.errors,
      callSuccess: this.success, 
      callError: this.error,
    }, null);
  },
  data() {
    return {
      username: '',
      admin: false,
      loading: false,
      success: '',
      error: '',
      stripeKey: { 
        orderId: null, 
        invoiceId: null, 
        intentId: null,
        customerId: null,
        clientSecret: null, 
        existingCustomer: false,
        shippable: false, 
        subtotal: new Big(0).toFixed(2),
        total: new Big(0).toFixed(2),
        total_tax_amounts: new Big(0).toFixed(2),
      },
      cardNumber: null,
      cardExpiry: null,
      cardCvc: null,
      cardPostal: null,
      cardCountry: null,
      cart: [],
      costs: { 
        shippingCost: new Big(0).toFixed(2), 
        total: new Big(0).toFixed(2),
        total_tax_amounts: new Big(0).toFixed(2),
      },
      errors: [],
    }
  },
  methods: {
    sanitizeCard(content) {
      var card = {};
      card.postalCode = DOMPurify.sanitize(content.cardPostalCode);
      card.country = DOMPurify.sanitize(content.cardCountry);
      return card;
    },
    sanitizeAddress(content) {
      var address = {};
      address.email = DOMPurify.sanitize(content.email);
      address.name = DOMPurify.sanitize(content.name);
      address.line1 = DOMPurify.sanitize(content.line1);
      address.line2 = DOMPurify.sanitize(content.line2);
      address.city = DOMPurify.sanitize(content.city);
      address.state = DOMPurify.sanitize(content.state);
      address.postalCode = DOMPurify.sanitize(content.postalCode);
      address.country = DOMPurify.sanitize(content.country);
      return address;
    },
    validateCart(cart) {
      for (var i = 0; i < cart.length; i++) {
        if (!/^[A-Za-z0-9_]{1,50}$/.test(cart[i].id)) {
          return false;
        }
        if (!/^[A-Za-z0-9 \-']{1,50}$/.test(cart[i].category)) {
          return false;
        }
        if (!/^[A-Za-z0-9 \-']{1,50}$/.test(cart[i].product)) {
          return false;
        }
        if (!/^[0-9]{0,4}(\.[0-9]{1,2})?$/.test(cart[i].price)) {
          return false;
        }
        if (!/^[0-9]{1,2}$/.test(cart[i].quantity)) {
          return false;
        }
        cart[i].id = DOMPurify.sanitize(cart[i].id);
        cart[i].category = DOMPurify.sanitize(cart[i].category);
        cart[i].product = DOMPurify.sanitize(cart[i].product);
        cart[i].price = DOMPurify.sanitize(cart[i].price);
        cart[i].quantity = DOMPurify.sanitize(cart[i].quantity);
      }
      return cart;
    },
    GetTax(val) {
      this.success = '';
      this.error = '';
      if (this.stripeKey.shippable) {
        return false;
      }
      var sanitizedCart = this.validateCart(val.cart);
      var data = {};
      if (sanitizedCart) {
        data.cart = sanitizedCart;
        data.time = DOMPurify.sanitize(getTime());
        if (this.stripeKey.invoiceId) {
          data.invoiceId = DOMPurify.sanitize(this.stripeKey.invoiceId);
        }
        if (this.stripeKey.customerId) {
          data.customerId = DOMPurify.sanitize(this.stripeKey.customerId);
        }
        data.cardPostalCode = DOMPurify.sanitize(val.postalCode);
        data.cardCountry = DOMPurify.sanitize(val.country);
        data.shippingCost = DOMPurify.sanitize(this.costs.shippingCost);
      } else {
        data = {};
      }
      document.getElementById("submit").disabled = true;
      var context = this;
      var httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        return null;
      }
      grecaptcha.ready(function() {
        grecaptcha.execute(DOMPurify.sanitize(getRecaptchaSiteKey()), { action: 'tax' })
        .then(function(recaptchaToken) {
          data['g-recaptcha-response'] = DOMPurify.sanitize(recaptchaToken);
          httpRequest.open('POST', '/projects/e-commerce/get-tax', true);
          httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(getCSRF()));
          httpRequest.send(JSON.stringify(data));
        });
      });
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
            context.costs.total = response.total;
            context.costs.total_tax_amounts = response.total_tax_amounts;
            context.stripeKey.invoiceId = response.invoiceId;
            context.stripeKey.total = response.total;
            document.getElementById("submit").disabled = false;
            context.success = '';
            context.error = '';
          } else {
            var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
            context.errors = response;
            context.costs.total_tax_amounts = new Big(0).toFixed(2);
            context.stripeKey.total = context.stripeKey.subtotal;
            document.getElementById("submit").disabled = false;
            context.success = '';
            context.error = 'Tax could not be calculated. Please try again.';
          }
        }
      }
    },
    ShippingCost(val) {
      this.success = '';
      this.error = '';
      var sanitizedCart = this.validateCart(val.cart);
      var data = {};
      if (sanitizedCart) {
        data.cart = sanitizedCart;
        data.time = DOMPurify.sanitize(getTime());
        if (this.stripeKey.invoiceId) {
          data.invoiceId = DOMPurify.sanitize(this.stripeKey.invoiceId);
        }
        if (this.stripeKey.customerId) {
          data.customerId = DOMPurify.sanitize(this.stripeKey.customerId);
        }
        data.shippingAddress = {
          postalCode: DOMPurify.sanitize(val.postalCode),
          country: DOMPurify.sanitize(val.country),
        };
      } else {
        data = {};
      }
      document.getElementById("submit").disabled = true;
      var context = this;
      var httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        return null;
      }
      grecaptcha.ready(function() {
        grecaptcha.execute(DOMPurify.sanitize(getRecaptchaSiteKey()), { action: 'shipping' })
        .then(function(recaptchaToken) {
          data['g-recaptcha-response'] = DOMPurify.sanitize(recaptchaToken);
          httpRequest.open('POST', '/projects/e-commerce/shipping-cost', true);
          httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(getCSRF()));
          httpRequest.send(JSON.stringify(data));
        });
      });
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
            context.costs.shippingCost = response.shippingCost;
            context.costs.total = response.total;
            context.costs.total_tax_amounts = response.total_tax_amounts;
            context.stripeKey.invoiceId = response.invoiceId;
            context.stripeKey.total = response.total;
            document.getElementById("submit").disabled = false;
            context.success = '';
            context.error = '';
          } else {
            var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
            context.errors = response;
            context.costs.shippingCost = new Big(0).toFixed(2);
            context.stripeKey.total = context.stripeKey.subtotal;
            document.getElementById("submit").disabled = false;
            context.success = '';
            context.error = 'Shipping cost could not be calculated. Please try again.';
          }
        }
      }
    },
    Checkout(cart) {
      this.success = '';
      this.error = '';
      this.costs.shippingCost = new Big(0).toFixed(2);
      this.costs.total = new Big(0).toFixed(2);
      this.costs.total_tax_amounts = new Big(0).toFixed(2);
      var sanitizedCart = this.validateCart(cart);
      var data = {};
      if (sanitizedCart) {
        data.cart = sanitizedCart;
        data.time = DOMPurify.sanitize(getTime());
        if (this.stripeKey.invoiceId) {
          data.invoiceId = DOMPurify.sanitize(this.stripeKey.invoiceId);
        }
        if (this.stripeKey.customerId) {
          data.customerId = DOMPurify.sanitize(this.stripeKey.customerId);
        }
        this.cart = sanitizedCart;
      } else {
        data = {};
        this.cart = null;
      }
      var context = this;
      var httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        return null;
      }
      context.loading = true;
      grecaptcha.ready(function() {
        grecaptcha.execute(DOMPurify.sanitize(getRecaptchaSiteKey()), { action: 'invoice' })
        .then(function(recaptchaToken) {
          data['g-recaptcha-response'] = DOMPurify.sanitize(recaptchaToken);
          httpRequest.open('POST', '/projects/e-commerce/create-invoice', true);
          httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(getCSRF()));
          httpRequest.send(JSON.stringify(data));
        });
      });
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            context.stripeKey = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
            context.costs.total = context.stripeKey.total;
            context.costs.total_tax_amounts = context.stripeKey.total_tax_amounts;
            var elements = stripe.elements();
            var style = {
              base: {
                fontSize: '16px',
                color: '#000000',
              },
              invalid: {
                color: '#aa2823',
              },
            };
            context.cardNumber = elements.create('cardNumber', { style: style });
            context.cardExpiry = elements.create('cardExpiry', { style: style });
            context.cardCvc = elements.create('cardCvc', { style: style });
            context.cardPostal = document.getElementById('card-expiry');
            context.cardCountry = document.getElementById('card-cvc');
            if (document.getElementById("card-number")) {
              context.cardNumber.mount("#card-postalCode");
              context.cardNumber.addEventListener("change", function(event) {
                context.success = '';
                context.error = event.error ? event.error.message : '';
              });
            }
            if (document.getElementById("card-expiry")) {
              context.cardExpiry.mount("#card-country");
              context.cardExpiry.addEventListener("change", function(event) {
                context.success = '';
                context.error = event.error ? event.error.message : '';
              });
            }
            if (document.getElementById("card-cvc")) {
              context.cardCvc.mount("#card-number");
              context.cardCvc.addEventListener("change", function(event) {
                context.success = '';
                context.error = event.error ? event.error.message : '';
              });
            }
            context.loading = false;
          } else {
            context.stripeKey = {
              invoiceId: null,
              customerId: null,
              existingCustomer: false,
              shippable: false,
              subtotal: new Big(0).toFixed(2),
              total: new Big(0).toFixed(2),
              total_tax_amounts: new Big(0).toFixed(2),
            };
            context.costs.shippingCost = new Big(0).toFixed(2);
            context.costs.total = new Big(0).toFixed(2);
            context.costs.total_tax_amounts = new Big(0).toFixed(2);
            context.loading = false;
          }
        }
      }
    },
    FormSubmit(val) {
      event.preventDefault();
      document.getElementById("submit").disabled = true;
      this.loading = true;
      var context = this;
      return new Promise(function(resolve, reject) {
        var httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
          return null;
        }
        var data = {};
        data.total = DOMPurify.sanitize(context.stripeKey.total);
        grecaptcha.ready(function() {
          grecaptcha.execute(DOMPurify.sanitize(getRecaptchaSiteKey()), { action: 'intent' })
          .then(function(recaptchaToken) {
            data['g-recaptcha-response'] = DOMPurify.sanitize(recaptchaToken);
            httpRequest.open('POST', '/projects/e-commerce/create-payment-intent', true);
            httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(getCSRF()));
            httpRequest.send(JSON.stringify(data));
          });
        });
        httpRequest.onreadystatechange = function() {
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
              var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
              context.stripeKey.clientSecret = response.clientSecret;
              context.stripeKey.intentId = response.intentId;
              resolve(response);
            } else {
              context.stripeKey.clientSecret = null;
              context.stripeKey.intentId = null;
              reject(null);
            }
          }
        }
      })
      .then(function(doc) {
        context.payWithCard(stripe, [
          context.cardNumber, 
          context.cardExpiry, 
          context.cardCvc, 
        ], context.stripeKey.clientSecret, val);
      })
      .catch(function(err) {
        context.loading = false;
        document.getElementById("submit").disabled = false;
      });
    },
    payWithCard(stripe, card, clientSecret, content) {
      var context = this;
      var sanitizedCart = context.validateCart(context.cart);
      var sanitizedAddress = context.sanitizeAddress(content);
      var sanitizedCard = context.sanitizeCard(content);
      stripe.confirmCardPayment(clientSecret, {
        payment_method: { 
          card: card[0],
          billing_details: {
            address: {
              postal_code: sanitizedCard.postalCode,
              country: sanitizedCard.country,
            }
          }
        },
      })
      .then(function(result) {
        if (result.error) {
          context.success = '';
          context.error = result.error.message;
          document.getElementById("submit").disabled = false;
          return Promise.reject(null);
        } else {
          var data = {};
          if (sanitizedCart && sanitizedAddress && sanitizedCard) {
            data.cart = sanitizedCart;
            data.shippingAddress = sanitizedAddress;
            data.cardPostalCode = sanitizedCard.postalCode;
            data.cardCountry = sanitizedCard.country;
            data.total = DOMPurify.sanitize(context.stripeKey.total);
            data.shippingCost = DOMPurify.sanitize(context.costs.shippingCost);
            if (context.costs.total_tax_amounts !== 0) {
              data.tax = DOMPurify.sanitize(context.costs.total_tax_amounts);
            } else {
              data.tax = 0;
            }
            data.time = DOMPurify.sanitize(getTime());
            if (context.stripeKey.invoiceId) {
              data.invoiceId = DOMPurify.sanitize(context.stripeKey.invoiceId);
            }
            if (context.stripeKey.intentId) {
              data.intentId = DOMPurify.sanitize(context.stripeKey.intentId);
            }
            if (context.stripeKey.customerId) {
              data.customerId = DOMPurify.sanitize(context.stripeKey.customerId);
            }
            if (context.stripeKey.existingCustomer) {
              data.existingCustomer = true;
            } else {
              data.existingCustomer = false;
            }
          }
          return new Promise(function(resolve, reject) {
            var httpRequest = new XMLHttpRequest();
            if (!httpRequest) {
              return null;
            }
            grecaptcha.ready(function() {
              grecaptcha.execute(DOMPurify.sanitize(getRecaptchaSiteKey()), { action: 'log' })
              .then(function(recaptchaToken) {
                data['g-recaptcha-response'] = DOMPurify.sanitize(recaptchaToken);
                httpRequest.open('POST', '/projects/e-commerce/log-payment', true);
                httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
                httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(getCSRF()));
                httpRequest.send(JSON.stringify(data));
              });
            });
            httpRequest.onreadystatechange = function() {
              if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                  var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
                  context.success = '';
                  context.error = '';
                  resolve(response);
                } else {
                  var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
                  context.errors = response;
                  context.success = '';
                  context.error = 'Payment failed. Please try again.';
                  reject(response);
                }
              }
            }
          });
        }
      })
      .then(function(response) {
        context.loading = false;
        if (response) {
          context.stripeKey.orderId = response;
          document.getElementById("submit").disabled = false;
          return router.push({ name: 'confirmation' });
        }
        return Promise.reject(null);
      })
      .then(function(page) {
        context.stripeKey.invoiceId = null;
        context.stripeKey.intentId = null;
        context.stripeKey.customerId = null;
        context.stripeKey.clientSecret = null;
        context.stripeKey.shippable = false;
        context.loading = true;
        return LoadData();
      })
      .then(resolveLoadData, rejectLoadData)
      .then(function(doc) {
        context.loading = false;
      })
      .catch(function(err) {
        context.loading = false;
        document.getElementById("submit").disabled = false;
      });
    }, 
    DeleteProduct(data) {
      this.success = '';
      this.error = '';
      if (data) {
        data.title = DOMPurify.sanitize(data.title);
        data.category = DOMPurify.sanitize(data.category);
        data.owner = DOMPurify.sanitize(data.owner);
        data.time = DOMPurify.sanitize(getTime());
      } else {
        data = {};
      }
      var context = this;
      var httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        return null;
      }
      context.loading = true;
      grecaptcha.ready(function() {
        grecaptcha.execute(DOMPurify.sanitize(getRecaptchaSiteKey()), { action: 'delete' })
        .then(function(recaptchaToken) {
          data['g-recaptcha-response'] = DOMPurify.sanitize(recaptchaToken);
          httpRequest.open('POST', '/projects/e-commerce/delete', true);
          httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
          httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(getCSRF()));
          httpRequest.send(JSON.stringify(data));
        });
      });
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            LoadData()
              .then(resolveLoadData, rejectLoadData)
              .then(function(data) {
                return router.replace({ name: 'home' });
              }, function(err) {
                return false;
              })
              .then(function(data) {
                context.loading = false;
                context.success = 'Product deleted successfully!';
                context.error = '';
              }, function(err) {
                return false;
              });
          } else {
            context.loading = false;
            context.success = '';
            context.error = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
          }
        }
      }
    },
    SendData(data) {
      this.success = '';
      this.error = '';
      if (document.getElementById("addProduct")) {
        document.getElementById("addProduct").disabled = true;
      }
      var formData = new FormData();
      if (data) {
        formData.append('title', DOMPurify.sanitize(data.title));
        formData.append('inventory', DOMPurify.sanitize(data.inventory));
        formData.append('category', DOMPurify.sanitize(data.category));
        formData.append('price', DOMPurify.sanitize(data.price));
        formData.append('description', DOMPurify.sanitize(data.description));
        formData.append('shippable', DOMPurify.sanitize(data.shippable.toString()));
        formData.append('weight', DOMPurify.sanitize(data.weight));
        formData.append('width', DOMPurify.sanitize(data.width));
        formData.append('length', DOMPurify.sanitize(data.length));
        formData.append('height', DOMPurify.sanitize(data.height));
        formData.append('time', DOMPurify.sanitize(getTime()));
      }
      if (data.image) {
        formData.append('image', document.getElementById("pImage").files[0]);
      } else {
        formData.append('image', null);
      }
      var context = this;
      var httpRequest = new XMLHttpRequest();
      if (!httpRequest) {
        return null;
      }
      context.loading = true;
      grecaptcha.ready(function() {
        grecaptcha.execute(DOMPurify.sanitize(getRecaptchaSiteKey()), { action: 'add' })
        .then(function(recaptchaToken) {
          formData.append('g-recaptcha-response', DOMPurify.sanitize(recaptchaToken));
          httpRequest.open('POST', '/projects/e-commerce/add', true);
          httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(getCSRF()));
          httpRequest.send(formData);
        });
      });
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            LoadData()
              .then(resolveLoadData, rejectLoadData)
              .then(function(data) {
                return router.replace({ name: 'home' });
              }, function(err) {
                return false;
              })
              .then(function(data) {
                context.loading = false;
                context.success = 'Product saved successfully!';
                context.error = '';
                if (document.getElementById("addProduct")) {
                  document.getElementById("addProduct").disabled = false;
                }
              }, function(err) {
                if (document.getElementById("addProduct")) {
                  document.getElementById("addProduct").disabled = false;
                }
              });
          } else {
            context.loading = false;
            context.success = '';
            context.error = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
            if (document.getElementById("addProduct")) {
              document.getElementById("addProduct").disabled = false;
            }
          }
        }
      }
    },
  },
  mounted() {
    this.username = getUsername();
    this.admin = getAdmin();
    var context = this;
    this.loading = true;
    LoadData()
      .then(resolveLoadData, rejectLoadData)
      .then(function(doc) {
        context.loading = false;
      });
  },
});

function LoadData() {
  return new Promise(function(resolve, reject) {
    var data = {};
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      return null;
    }
    grecaptcha.ready(function() {
      grecaptcha.execute(DOMPurify.sanitize(getRecaptchaSiteKey()), { action: 'load' })
      .then(function(recaptchaToken) {
        data['g-recaptcha-response'] = DOMPurify.sanitize(recaptchaToken);
        httpRequest.open('POST', '/projects/e-commerce/load', true);
        httpRequest.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        httpRequest.setRequestHeader('CSRF-Token', DOMPurify.sanitize(getCSRF()));
        httpRequest.send(JSON.stringify(data));
      });
    });
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
          resolve(response);
        } else {
          var response = JSON.parse(DOMPurify.sanitize(httpRequest.responseText));
          reject(response);
        }
      }
    }
  });
}

function rejectLoadData(error) {
  return false;
}

function resolveLoadData(response) {
  categories = [];
  listings = [];
  for (var i = 0; i < response.length; i++) {
    var index = 0;
    var count = 0;
    for (var j = 0; j < categories.length; j++) {
      if (response[i].category === categories[j]) {
        index = j;
        count++;
        break;
      } 
    }
    if (count === 0) {
      categories.push(response[i].category);
      listings.push([ response[i] ]);
    } else {
      listings[index].push(response[i]);
    }
  }
  categories = categories.sort();
  listings = listings.sort((f, s) => {
    if (f[0].category > s[0].category) {
      return 1;
    } else if (f[0].category < s[0].category) {
      return -1;
    } else {
      return 0;
    }
  });
  for (i = 0; i < listings.length; i++) {
    listings[i] = listings[i].sort((f, s) => {
      if (f.title > s.title) {
        return 1;
      } else if (f.title < s.title) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  router.addRoute({ 
    path: '/', 
    alias: '',
    name: 'home', 
    component: AllListings, 
    props: { categories: categories, listings: listings },
  });
  router.addRoute({
    path: '/add', 
    name: 'add', 
    component: AddProduct, 
    props: { categories: categories, listings: listings },
  });
  router.addRoute({ 
    path: '/checkout', 
    name: 'checkout', 
    component: Checkout, 
    props: false,
  }),
  router.addRoute({ 
    path: '/confirmation', 
    name: 'confirmation', 
    component: Confirmation, 
    props: false,
  }),
  router.addRoute({ 
    path: '/category/:category', 
    name: 'category', 
    component: Category,
    props: categoryProps,
    beforeEnter: (to) => {
      var existingCategory = false;
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].replace(' ', '-').toLowerCase() === to.params.category) {
          existingCategory = true;
        }
      }
      if (!existingCategory) {
        return {
          name: 'notfound',
          params: { 
            path: to.path.substring(1).split('/'), 
            category: to.params.category 
          },
        };
      }
    },
  });
  router.addRoute({ 
    path: '/category/:category/product/:product', 
    name: 'product', 
    component: Product,
    props: productProps,
    beforeEnter: (to) => {
      var existingCategory = false, existingProduct = false;
      var categoryIndex = 0;
      for (var i = 0; i < categories.length; i++) {
        if (categories[i].replace(' ', '-').toLowerCase() === to.params.category) {
          existingCategory = true;
          categoryIndex = i;
        }
      }
      if (listings.length > 0) {
        for (var j = 0; j < listings[categoryIndex].length; j++) {
          if (listings[categoryIndex][j].title.replace(' ', '-').toLowerCase() === to.params.product) {
            existingProduct = true;
          }
        }
      }
      if (!existingCategory || !existingProduct) {
        return {
          name: 'notfound',
          params: { 
            path: to.path.substring(1).split('/'), 
            category: to.params.category, 
            product: to.params.product 
          },
        };
      }
    },
  });
  router.addRoute({ 
    path: '/:path(.*)*', 
    name: 'notfound', 
    component: NotFound,
    props: false,
  });
  return router.replace(router.currentRoute.value.fullPath);
}

function categoryProps(route) {
  var category = '';
  var categoryIndex = 0;
  var productsCount = [];
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].replace(' ', '-').toLowerCase() === route.params.category) {
      category = categories[i];
      categoryIndex = i;
    }
  }
  if (listings.length > 0) {
    for (var j = 0; j < listings[categoryIndex].length; j++) {
      productsCount[j] = j;
    }
  }
  return {
    category: category,
    listing: listings[categoryIndex],
    productsCount: productsCount,
  };
}

function productProps(route) {
  var category = '';
  var categoryIndex = 0;
  var product = null;
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].replace(' ', '-').toLowerCase() === route.params.category) {
      category = categories[i];
      categoryIndex = i;
    }
  }
  if (listings.length > 0) {
    for (var j = 0; j < listings[categoryIndex].length; j++) {
      if (listings[categoryIndex][j].title.replace(' ', '-').toLowerCase() === route.params.product) {
        product = listings[categoryIndex][j];
      }
    }
  }
  return {
    category: category,
    product: product,
  };
}

app.use(router);
app.mount('#app');
