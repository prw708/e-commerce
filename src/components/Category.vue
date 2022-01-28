<template lang="pug">
div(class="container-fluid px-4")
  div(
    class="row g-0 mt-5 mb-4"
  )
    div(class="col-12")
      h2(class="m-0") {{ category }}
  div(
    class="row g-3 mb-5"
  )
    template(
      v-for="productIndex in productsCount"
    )
      div(
        :class="'col-' + (12 / itemsLength)"
      )
        div(
          class="card position-relative"
          @mouseenter="hovered[productIndex] = true"
          @mouseleave="hovered[productIndex] = false"
        )
          a(
            @click="handleAddToCartButton(productIndex)"
          )
            span(
              v-show="hovered[productIndex]"
              class="plus-icon position-absolute bg-light top-0 end-0"
            )
          img(
            class="card-img-top" 
            :src="listing[productIndex].image" 
            :alt="listing[productIndex].title"
          )
          div(class="card-body")
            h5(class="card-title mb-2") {{ listing[productIndex].title }}
            h6(class="card-subtitle text-muted mb-2") ${{ listing[productIndex].price }}
            p(class="card-subtitle small mb-3") @{{ listing[productIndex].owner.username }}
            p(class="card-text mb-0") {{ listing[productIndex].description.substring(0, 100) }}
          div(class="card-footer bg-white")
            router-link(
              class="card-link link-secondary text-decoration-none" 
              :to="{ \
                name: 'product', \
                params: { category: categoryURL, product: productURL(listing[productIndex].title) } \
              }"
            ) View Details
</template>

<script>
export default {
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
    'category',
    'listing',
    'productsCount',
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
  data() {
    return {
      hovered: [],
    }
  },
  computed: {
    categoryURL() {
      return this.category.replace(' ', '-').toLowerCase();
    },
    itemsLength() {
      if (this.width <= 576) {
        return 1;
      } else {
        return 2;
      }
    }
  },
  mounted() {
    this.$emit('getError', '');
  },
  methods: {
    productURL(product) {
      return product.replace(' ', '-').toLowerCase();
    },
    handleAddToCartButton(index) {
      this.$emit('addToCart', {
        category: this.category,
        quantity: 1,
        product: this.listing[index].title,
        price: this.listing[index].price,
      });
    },
  },
}
</script>
