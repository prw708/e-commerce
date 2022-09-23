<template lang="pug">
div(class="row g-0")
  div(class="col-12 col-md-6")
    div(class="row g-0 m-4")
      h4(class="mb-0") Order Summary
    div(class="pb-4 px-4")
      div(
        v-for="(item, index) in cart"
        :class="(index === 0) ? 'row g-0 border-top border-bottom p-4' : 'row g-0 border-bottom p-4'"
      )
        div(class="col-6")
          h5(class="mb-2") {{ item.product }}
          h6(class="mb-0") ${{ item.price }} x {{ item.quantity }}
        div(class="col-6 text-end text-md-start")
          h5(class="mb-2 text-white") Subtotal
          h6(class="mb-0") ${{ getSubtotal(item.price, item.quantity) }}
      div(class="row g-0 px-4")
        div(class="col-6 mt-4")
          h6(class="text-muted mb-2") Subtotal
          h6(class="text-muted mb-2") Shipping
          h6(class="text-muted mb-2") Tax
          h6(class="mb-0") Total
        div(class="col-6 mt-4 text-end text-md-start")
          h6(class="text-muted mb-2") ${{ stripeKey.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          h6(class="text-muted mb-2") ${{ costs.shippingCost.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          h6(class="text-muted mb-2") ${{ costs.total_tax_amounts.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
          h6(class="mb-0") ${{ stripeKey.total.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
  div(class="col-12 col-md-6")
    div(
      v-if="this.loading && !stripeKey.invoiceId"
      class="text-center m-4"
    )
      div(class="spinner-border" role="status")
        span(class="visually-hidden") Loading...
    div(
      v-show="stripeKey.invoiceId"
      class="row g-0 p-4 bg-light"
    )
      form(id="payment-form" class="row g-0")
        h4(class="mb-4") Payment Information
        div(class="col-12 mb-4")
          label(for="card-postalCode" class="form-label") Card Number
          div(id="card-postalCode" class="form-control py-2")
        div(class="col-12 col-sm-6 mb-4 pe-sm-3")
          label(for="card-country" class="form-label") Card Expiration
          div(id="card-country" class="form-control py-2")
        div(class="col-12 col-sm-6 mb-4 ps-sm-3")
          label(for="card-number" class="form-label") Card CVC
          div(id="card-number" class="form-control py-2")
        div(class="col-12 col-sm-6 mb-4 pe-sm-3")
          label(for="card-expiry" class="form-label") Postal Code
          input(
            id="card-expiry" 
            type="text" 
            :class="(cardPostalCodeError) ? 'form-control is-invalid' : 'form-control'" 
            maxlength="100"
            autocomplete="off"
            v-model="this.cardPostalCode"
          )
          div(
            v-if="cardPostalCodeError"
            class="invalid-feedback"
          ) {{ cardPostalCodeError }}
        div(class="col-12 col-sm-6 mb-4 ps-sm-3")
          label(for="card-cvc" class="form-label") Country
          input(
            id="card-cvc" 
            type="text" 
            :class="(cardCountryError) ? 'form-control is-invalid' : 'form-control'" 
            maxlength="100"
            autocomplete="off"
            v-model="this.cardCountry"
          )
          div(
            v-if="cardCountryError"
            class="invalid-feedback"
          ) {{ cardCountryError }}
        h4(class="mb-4") Email
        div(class="col-12 mb-4")
          label(for="phone" class="form-label") Email
          input(
            id="phone" 
            type="text" 
            :class="(emailError) ? 'form-control is-invalid' : 'form-control'" 
            maxlength="100"
            autocomplete="off"
            v-model="this.email"
          )
          div(
            v-if="emailError"
            class="invalid-feedback"
          ) {{ emailError }}
        template(
          v-if="stripeKey.shippable"
        )
          h4(class="mb-4") Shipping Information
          div(class="col-12 mb-4")
            label(for="email" class="form-label") Name
            input(
              id="email" 
              type="text" 
              :class="(nameError) ? 'form-control is-invalid' : 'form-control'" 
              maxlength="100"
              autocomplete="off"
              v-model="this.name"
            )
            div(
              v-if="nameError"
              class="invalid-feedback"
            ) {{ nameError }}
          div(class="col-12 mb-4")
            label(for="city" class="form-label") Address Line 1
            input(
              id="city" 
              type="text" 
              :class="(line1Error) ? 'form-control is-invalid' : 'form-control'" 
              maxlength="100"
              autocomplete="off"
              v-model="this.line1"
            )
            div(
              v-if="line1Error"
              class="invalid-feedback"
            ) {{ line1Error }}
          div(class="col-12 mb-4")
            label(for="state" class="form-label") Address Line 2
            input(
              id="state" 
              type="text" 
              :class="(line2Error) ? 'form-control is-invalid' : 'form-control'" 
              maxlength="100"
              autocomplete="off"
              v-model="this.line2"
            )
            div(
              v-if="line2Error"
              class="invalid-feedback"
            ) {{ line2Error }}
          div(class="col-12 col-sm-4 pe-sm-3 mb-4")
            label(for="name" class="form-label") City
            input(
              id="name" 
              type="text" 
              :class="(cityError) ? 'form-control is-invalid' : 'form-control'" 
              maxlength="100"
              autocomplete="off"
              v-model="this.city"
            )
            div(
              v-if="cityError"
              class="invalid-feedback"
            ) {{ cityError }}
          div(class="col-12 col-sm-4 px-sm-3 mb-4")
            label(for="postalCode" class="form-label") State
            input(
              id="postalCode" 
              type="text" 
              :class="(stateError) ? 'form-control is-invalid' : 'form-control'" 
              maxlength="100"
              autocomplete="off"
              v-model="this.state"
            )
            div(
              v-if="stateError"
              class="invalid-feedback"
            ) {{ stateError }}
          div(class="col-12 col-sm-4 ps-sm-3 mb-4")
            label(for="city" class="form-label") Postal Code
            input(
              id="city" 
              type="text" 
              :class="(postalCodeError) ? 'form-control is-invalid' : 'form-control'" 
              maxlength="100"
              autocomplete="off"
              v-model="this.postalCode"
            )
            div(
              v-if="postalCodeError"
              class="invalid-feedback"
            ) {{ postalCodeError }}
          div(class="col-12 mb-4")
            label(for="line1" class="form-label") Country
            input(
              id="line1" 
              type="text" 
              :class="(countryError) ? 'form-control is-invalid' : 'form-control'" 
              maxlength="100"
              autocomplete="off"
              v-model="this.country"
            )
            div(
              v-if="countryError"
              class="invalid-feedback"
            ) {{ countryError }}
        div(class="col-12 mb-0")
          button(
            id="submit" 
            class="btn btn-secondary btn-lg" 
            :disabled="!stripeKey.invoiceId"
            @click.prevent="FormSubmit"
          )
            span(
              v-if="loading"
              class="spinner-border spinner-border-sm" 
              role="status" 
              aria-hidden="true"
            )
            |  Submit Payment
</template>

<script>
import Big from 'big.js';

export default {
  components: {
  },
  data() {
    return {
      cardPostalCode: '',
      cardCountry: '',
      email: '',
      name: '',
      line1: '',
      line2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      cardPostalCodeEmail: '',
      cardCountryEmail: '',
      emailError: '',
      nameError: '',
      line1Error: '',
      line2Error: '',
      cityError: '',
      stateError: '',
      postalCodeError: '',
      countryError: '',
      update: null,
    }
  },
  props: [
    'username',
    'quantity',
    'totalItems',
    'width',
    'cart',
    'stripeKey',
    'admin',
    'loading',
    'costs',
    'errors',
  ],
  emits: [
    'quantity',
    'addToCart',
    'getError',
    'SendData',
    'DeleteProduct',
    'Checkout',
    'FormSubmit',
    'clearCart',
    'ShippingCost',
    'GetTax',
  ],
  watch: {
    errors(val) {
      for (var i = 0; i < val.length; i++) {
        if (val[i].param === 'cardPostalCode') {
          this.cardPostalCodeError = val[i].msg;
        } else if (val[i].param === 'cardCountry') {
          this.cardCountryError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.email') {
          this.emailError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.name') {
          this.nameError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.line1') {
          this.line1Error = val[i].msg;
        } else if (val[i].param === 'shippingAddress.line2') {
          this.line2Error = val[i].msg;
        } else if (val[i].param === 'shippingAddress.city') {
          this.cityError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.state') {
          this.stateError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.postalCode') {
          this.postalCodeError = val[i].msg;
        } else if (val[i].param === 'shippingAddress.country') {
          this.countryError = val[i].msg;
        }
      }
    },
    cardPostalCode(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.cardPostalCodeError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.cardPostalCodeError = "";
        var context = this;
        this.debounce(function() {
          context.$emit('GetTax', {
            postalCode: context.cardPostalCode,
            country: context.cardCountry,
          });
        }, 1000)();
      }
    },
    cardCountry(val) {
      if (!/^[A-Za-z0-9 \-']{1,5}$/.test(val)) {
        this.countryError = "Must be a valid ISO 3166-1 alpha-2 country code.";
      } else {
        this.cardCountryError = "";
        var context = this;
        this.debounce(function() {
          context.$emit('GetTax', {
            postalCode: context.cardPostalCode,
            country: context.cardCountry,
          });
        }, 1000)();
      }
    },
    email(val) {
      if (!/^[^@]{1,50}@[^@]{1,50}$/.test(val)) {
        this.emailError = "Must be a valid email address.";
      } else {
        this.emailError = "";
      }
    },
    name(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.nameError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.nameError = "";
      }
    },
    line1(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.line1Error = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.line1Error = "";
      }
    },
    line2(val) {
      if (!/^[A-Za-z0-9 \-']{0,100}$/.test(val)) {
        this.line2Error = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.line2Error = "";
      }
    },
    city(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.cityError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.cityError = "";
      }
    },
    state(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.stateError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.stateError = "";
      }
    },
    postalCode(val) {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(val)) {
        this.postalCodeError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
      } else {
        this.postalCodeError = "";
        var context = this;
        this.debounce(function() {
          context.$emit('ShippingCost', {
            postalCode: context.postalCode,
            country: context.country,
          });
        }, 1000)();
      }
    },
    country(val) {
      if (!/^[A-Za-z0-9 \-']{1,5}$/.test(val)) {
        this.countryError = "Must be a valid ISO 3166-1 alpha-2 country code.";
      } else {
        this.countryError = "";
        var context = this;
        this.debounce(function() {
          context.$emit('ShippingCost', {
            postalCode: context.postalCode,
            country: context.country,
          });
        }, 1000)();
      }
    },
  },
  computed: {
    total() {
      var total = new Big(0);
      for (var i = 0; i < this.cart.length; i++) {
        var price = new Big(this.cart[i].price);
        var quantity = new Big(this.cart[i].quantity);
        var subtotal = price.times(quantity);
        total = total.add(subtotal);
      }
      return total.round(2).toNumber().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  },
  mounted() {
    this.$emit('getError', '');
    this.$emit('Checkout');
  },
  methods: {
    debounce(func, wait) {
      var context = this;
      return function() {
        clearTimeout(context.update);
        context.update = setTimeout(function() {
          context.update = null;
          func.apply(this, arguments);
        }, wait);
      };
    },
    validCardPostalCode() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.cardPostalCode)) {
        this.cardPostalCodeError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.cardPostalCodeError = "";
        return true;
      }
    },
    validCardCountry() {
      if (!/^[A-Za-z0-9 \-']{1,5}$/.test(this.cardCountry)) {
        this.cardCountryError = "Must be a valid ISO 3166-1 alpha-2 country code.";
        return false;
      } else {
        this.cardCountryError = "";
        return true;
      }
    },
    validEmail() {
      if (!/^[^@]{1,50}@[^@]{1,50}$/.test(this.email)) {
        this.emailError = "Must be a valid email address.";
        return false;
      } else {
        this.emailError = "";
        return true;
      }
    },
    validName() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.name)) {
        this.nameError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.nameError = "";
        return true;
      }
    },
    validLine1() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.line1)) {
        this.line1Error = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.line1Error = "";
        return true;
      }
    },
    validLine2() {
      if (!/^[A-Za-z0-9 \-']{0,100}$/.test(this.line2)) {
        this.line2Error = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.line2Error = "";
        return true;
      }
    },
    validCity() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.city)) {
        this.cityError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.cityError = "";
        return true;
      }
    },
    validState() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.state)) {
        this.stateError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.stateError = "";
        return true;
      }
    },
    validPostalCode() {
      if (!/^[A-Za-z0-9 \-']{1,100}$/.test(this.postalCode)) {
        this.postalCodeError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.postalCodeError = "";
        return true;
      }
    },
    validCountry() {
      if (!/^[A-Za-z0-9 \-']{1,5}$/.test(this.country)) {
        this.countryError = "Must be a valid ISO 3166-1 alpha-2 country code.";
        return false;
      } else {
        this.countryError = "";
        return true;
      }
    },
    FormSubmit() {
      var validCardPostalCode = this.validCardPostalCode();
      var validCardCountry = this.validCardCountry();
      var validEmail = this.validEmail();
      var validName = this.validName();
      var validLine1 = this.validLine1();
      var validLine2 = this.validLine2();
      var validCity = this.validCity();
      var validState = this.validState();
      var validPostalCode = this.validPostalCode();
      var validCountry = this.validCountry();
      if (validCardPostalCode && validCardCountry && 
          validEmail && (!this.stripeKey.shippable || 
          (validName && 
          validLine1 && validLine2 && 
          validCity && validState && validPostalCode &&
          validCountry))) {
        this.$emit('FormSubmit', {
          cardPostalCode: this.cardPostalCode,
          cardCountry: this.cardCountry,
          email: this.email,
          name: this.name,
          line1: this.line1,
          line2: this.line2,
          city: this.city,
          state: this.state,
          postalCode: this.postalCode,
          country: this.country,
        });
      } else {
        if (!validCardPostalCode || !validCardCountry) {
          this.$emit('getError', "There are errors in the Payment Information form.");
        } else if (!validEmail) {
          this.$emit('getError', "There are errors in the Email form.");
        } else {
          this.$emit('getError', "There are errors in the Shipping Information form.");
        }
      }
    },
    getSubtotal(p, q) {
      var price = new Big(p);
      var quantity = new Big(q);
      var subtotal = price.times(quantity);
      return subtotal.round(2).toNumber().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
  },
}
</script>
