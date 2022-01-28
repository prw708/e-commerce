<template lang="pug">
div(
  v-if="this.loading"
  class="text-center m-4"
)
  div(class="spinner-border" role="status")
    span(class="visually-hidden") Loading...
template(v-if="!loading")
  div(class="container-fluid px-4")
    div(class="alert alert-danger my-5 p-4")
      p(class="mb-2") No items found.
      router-link(
        class="text-danger mb-0"
        :to="{ name: 'home' }"
      ) Return
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
}
</script>
