<template lang="pug">
div(
  v-if="this.loading"
  class="text-center m-4"
)
  div(class="spinner-border" role="status")
    span(class="visually-hidden") Loading...
div(class="container-fluid px-4")
  div(class="row g-0 mt-5 mb-4")
    div(class="col-10 col-sm-11")
      h2(class="m-0") {{ category }}
    div(class="col-2 col-sm-1 d-flex align-items-end flex-row-reverse")
      button(
        v-if="this.admin && this.username === product.owner.username"
        type="button"
        class="btn-close"
        title="Delete Product"
        @click="handleDeleteProductButton"
      )
  div(class="row g-4 mb-4")
    div(class="col-12 col-sm-5 text-center")
      img(
        class="img-fluid"
        :src="product.image ? \
          'data:image/png;base64,' + product.image : \
          '/projects/e-commerce/static/images/product_image.png'" 
        :alt="product.title"
      )
    div(class="col-12 col-sm-7")
      h3(class="mb-2") {{ product.title }}
      h4(class="text-muted mb-3") ${{ product.price }}
      h6(class="mb-2") Posted by: {{ product.owner.username }}
      h6(class="mb-3") Amount Available: {{ product.inventoryAmount.toLocaleString('en-US') }}
      p(class="preserve-white-space mb-3") {{ product.description }}
  div(class="row g-3 mb-5")
    div(class="col-12 col-sm-5 col-md-7 d-flex align-items-end flex-row-reverse")
      div(
        class="btn-group btn-group-lg"
        role="group"
      )
        button(
          type="button"
          class="btn btn-dark"
          @click="handleIncreaseButton"
        ) +
        button(
          type="button"
          class="btn btn-dark"
          @click="handleDecreaseButton"
        ) -
      h4(class="mx-3 mb-0")
        label(
          for="pQuantity"
          class="form-label"
        ) Quantity
    div(class="col-5 col-sm-3 col-md-2 offset-7 offset-sm-0")
      input(
        type="text"
        class="form-control form-control-lg"
        id="pQuantity"
        maxlength="2"
        autocomplete="off"
        :value="quantity"
        @input="handleQuantityField"
      )
    div(class="col-12 col-sm-4 col-md-3 d-flex flex-row-reverse")
      button(
        type="button"
        class="btn btn-secondary btn-lg"
        @click="handleAddtoCartButton"
      ) Add to Cart
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
    'product',
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
    }
  },
  mounted() {
    this.$emit('getError', '');
  },
  methods: {
    handleIncreaseButton() {
      if (this.validateQuantity(this.quantity) && (this.quantity < 99)) {
        this.$emit('quantity', this.quantity + 1);
      } else {
        this.$emit('quantity', 99);
      }
    },
    handleDecreaseButton() {
      if (this.validateQuantity(this.quantity) && (this.quantity > 1)) {
        this.$emit('quantity', this.quantity - 1);
      } else {
        this.$emit('quantity', 1);
      }
    },
    handleQuantityField(event) {
      if (!this.validateQuantity(event.target.value)) {
        this.$emit('quantity', 1);
        event.target.value = '';
      } else {
        this.$emit('quantity', parseInt(event.target.value, 10));
      }
    },
    validateQuantity(quantity) {
      if (!/^[0-9]+$/.test(quantity)) {
        return false;
      }
      return true;
    },
    handleAddtoCartButton() {
      if (this.validateQuantity(this.quantity)) {
        this.$emit('addToCart', {
          id: this.product.id,
          image: this.product.image,
          category: this.category,
          quantity: this.quantity,
          product: this.product.title,
          price: this.product.price,
          inventoryAmount: this.product.inventoryAmount,
          shippable: this.product.shippable,
        });
      }
    },
    handleDeleteProductButton() {
      this.$emit('DeleteProduct', {
        category: this.category,
        product: this.product.title,
        owner: this.product.owner._id,
      });
    },
  }
}
</script>
