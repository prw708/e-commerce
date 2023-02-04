<template lang="pug">
div(
  v-if="this.loading"
  class="text-center m-4"
)
  div(class="spinner-border" role="status")
    span(class="visually-hidden") Loading...
template(v-if="!loading && listings && listings.length > 0")
  Listing(
    v-for="(listing, index) in listings"
    :category="categories[index]"
    :listing="listing"
    :index="index"
    :width="width"
  )
  div(class="px-4 my-5 text-end")
    router-link(
      class="btn btn-secondary btn-lg"
      :to="{ name: 'checkout' }"
    ) Proceed to Checkout
div(v-else-if="!loading")
  p(class="px-4 my-5") There are no items available.
</template>

<script>
import Listing from './Listing.vue';

export default {
  name: 'App',
  components: {
    Listing: Listing,
  },
  data() {
    return {
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
    'categories',
    'listings',
  ],
  emits: [
    'quantity',
    'addToCart',
    'getError',
    'SendData',
    'DeleteProduct',
    'Checkout',
    'clearCart',
  ],
  provide() {
    return {
      addToCart: this.addToCart,
    }
  },
  mounted() {
    this.$emit('getError', '');
  },
  methods: {
    addToCart(val) {
      this.$emit('addToCart', val);
    }
  },
}
</script>
