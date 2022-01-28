<template lang="pug">
div(ref="contain")
  OptionsBar(
    :cart="cart"
    :error="error"
    :success="success"
    :info="info"
    :admin="admin"
    :loading="loading"
    @removeFromCart="removeFromCart"
    @clearCart="clearCart"
    @Checkout="Checkout"
  )
  router-view(
    :username="username"
    :quantity="quantity"
    :totalItems="totalItems"
    :width="width"
    :cart="cart"
    :stripeKey="stripeKey"
    :admin="admin"
    :loading="loading"
    :costs="costs"
    :errors="errors"
    @quantity="getQuantityValueUpdates"
    @addToCart="addToCart"
    @getError="getError"
    @SendData="SendData"
    @DeleteProduct="DeleteProduct"
    @Checkout="Checkout"
    @FormSubmit="FormSubmit"
    @ShippingCost="ShippingCost"
    @clearCart="clearCart"
    @GetTax="GetTax"
  )
</template>

<script>
import OptionsBar from './components/OptionsBar.vue';

export default {
  name: 'App',
  components: {
    OptionsBar: OptionsBar,
  },
  data() {
    return {
      quantity: 1,
      cart: [],
      error: '',
      success: '',
      info: '',
      maxItems: 99,
      width: 0,
    }
  },
  props: [
    'username',
    'admin',
    'loading',
    'callSuccess',
    'callError',
    'stripeKey',
    'costs',
    'errors',
  ],
  emits: [
    'SendData',
    'DeleteProduct',
    'Checkout',
    'FormSubmit',
    'ShippingCost',
    'GetTax',
  ],
  computed: {
    totalItems() {
      var total = 0;
      for (var i = 0; i < this.cart.length; i++) {
        var quantity = parseInt(this.cart[i].quantity, 10);
        total += quantity;
      }
      return total;
    },
  },
  watch: {
    totalItems() {
      if (this.totalItems >= this.maxItems) {
        this.info = 'Cart is full.';
      } else {
        this.info = '';
      }
    },
    callSuccess(val) {
      this.error = '';
      this.success = val;
      this.info = '';
    },
    callError(val) {
      this.error = val;
      this.success = '';
      this.info = '';
    },
  },
  mounted() {
    this.width = this.$refs.contain.getBoundingClientRect().width;
    window.addEventListener('resize', this.resize, false);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resize, false);
  },
  methods: {
    resize() {
      this.width = this.$refs.contain.getBoundingClientRect().width;
    },
    getQuantityValueUpdates(val) {
      this.quantity = val;
    },
    addToCart(val) {
      if (this.totalItems <= this.maxItems) {
        var itemCount = 0;
        for (var i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id === val.id) {
            itemCount += this.cart[i].quantity;
          }
        }
        if (val.quantity > val.inventoryAmount) {
          val.quantity = val.inventoryAmount;
        }
        if (itemCount >= val.inventoryAmount) {
          this.info = 'Available inventory depleted.';
          val.quantity = 0;
        } else {
          this.info = '';
        }
        if (this.totalItems + val.quantity > this.maxItems) {
          val.quantity = this.maxItems - this.totalItems;
        }
        if (val.quantity === 0) {
          return false;
        }
        this.cart.push({
          id: val.id,
          image: val.image,
          category: val.category,
          quantity: val.quantity,
          product: val.product,
          price: val.price,
          shippable: val.shippable,
        });
      }
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
    },
    clearCart() {
      this.cart = [];
    },
    getError(val) {
      this.error = val;
      this.success = '';
      this.info = '';
    },
    SendData(val) {
      this.$emit('SendData', val);
    },
    DeleteProduct(val) {
      this.cart = this.cart.filter(item => { 
        return (item.category !== val.category) || (item.category === val.category && item.product !== val.product);
      });
      this.$emit('DeleteProduct', val);
    },
    Checkout() {
      this.$emit('Checkout', this.cart);
    },
    FormSubmit(val) {
      this.$emit('FormSubmit', val);
    },
    ShippingCost(val) {
      this.$emit('ShippingCost', {
        postalCode: val.postalCode,
        country: val.country,
        cart: this.cart,
      });
    },
    GetTax(val) {
      this.$emit('GetTax', {
        postalCode: val.postalCode,
        country: val.country,
        cart: this.cart,
      });
    },
  },
}
</script>
