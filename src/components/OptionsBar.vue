<template lang="pug">
nav(class="navbar navbar-light bg-light border-top border-bottom py-1")
  div(class="container-fluid px-4")
    div(class="col-12 col-sm-8 py-3") 
      nav(class="d-flex align-items-center")
        ol(class="breadcrumb m-0 small")
          li(
            v-for="(item, index) in url"
            :key="item.id"
            :class="(index === url.length) ? 'breadcrumb-item active' : 'breadcrumb-item'"
          )
            router-link(
              class="text-decoration-none"
              :to="{ path: item.path }"
            ) {{ item.title }}
    div(class="col-12 col-sm-4 pb-3 pb-sm-0 text-sm-end")
      router-link(
        v-if="this.admin"
        :to="{ name: 'add' }"
        class="btn border p-0 me-2"
        title="Add a Product"
      )
        span(class="bag-add-icon")
      button(
        type="button"
        id="cartButton"
        class="btn border p-0"
        data-bs-toggle="collapse"
        data-bs-target="#collapseCart"
        title="Shopping Cart"
      ) 
        span(class="shopping-cart-icon") 
      span(
        v-if="cart.length > 0"
        class="badge bg-dark ms-2"
      ) {{ this.totalItems }}
div(
  id="collapseCart"
  class="collapse container-fluid shopping-cart position-absolute py-3" 
)
  div(class="row g-0")
    div(class="col-2 col-sm-4 col-md-6 col-lg-7 col-xl-8")
    div(
      id="cart"
      class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 shadow bg-light p-3 position-fixed vh-100 overflow-auto start-0 top-0"
    )
      div(class="float-end")
        button(type="button" class="btn-close" id="closeCart")
      h4(class="m-0") Shopping Cart 
      div(class="my-4")
        ul(class="list-group")
          li(
            v-for="(item, index) in cart"
            class="list-group-item px-2"
          )
            div(class="row g-0")
              div(class="col-1")
                span(class="badge bg-dark ps-2") {{ item.quantity }}
              div(class="col-7 ps-2")
                router-link(
                  class="fs-6"
                  :to="{ \
                    name: 'product', \
                    params: { category: categoryURL(item.category), product: productURL(item.product) }, \
                  }"
                ) {{ item.product }}
              div(class="col-3 text-end pe-2") ${{ item.price }}
              div(class="col-1 text-end")
                button(
                  type="button"
                  class="btn x-close-icon"
                  @click.stop="handleRemoveFromCart(index)"
                )
      div(class="row g-0")
        div(class="col-5")
          p(class="fs-5 mb-0") Subtotal: 
        div(class="col-7 text-end") 
          p(class="fs-5 mb-0") ${{ this.subtotal }}
      div(class="pt-4")
        router-link(
          class="btn btn-secondary btn-lg me-3"
          :to="{ name: 'checkout' }"
        ) Proceed to Checkout
        div(class="mt-2")
          a(href="#" @click.stop="handleClearCart") Clear All
div(
  v-if="this.error"
  class="alert alert-danger px-4 py-3 mb-0"
)
  p(class="mb-0") {{ this.error }}
div(
  v-else-if="this.success"
  class="alert alert-success px-4 py-3 mb-0"
)
  p(class="mb-0") {{ this.success }}
div(
  v-else-if="this.info"
  class="alert alert-info px-4 py-3 mb-0"
)
  p(class="mb-0") {{ this.info }}
</template>

<script>
import Big from '../big.js';

export default {
  props: [
    'cart',
    'error',
    'success',
    'info',
    'admin',
    'loading',
  ],
  emits: [
    'removeFromCart',
    'clearCart',
    'Checkout',
  ],
  setup() {
  },
  computed: {
    totalItems() {
      var total = 0;
      for (var i = 0; i < this.cart.length; i++) {
        var quantity = parseInt(this.cart[i].quantity, 10);
        total += quantity;
      }
      return total;
    },
    subtotal() {
      var total = new Big(0);
      for (var i = 0; i < this.cart.length; i++) {
        var price = new Big(this.cart[i].price);
        var quantity = new Big(this.cart[i].quantity);
        var subtotal = price.times(quantity);
        total = total.add(subtotal);
      }
      return total.round(2).toNumber().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
    url() {
      var pathComponents = this.$route.fullPath.split('/');
      var urlComponents = [];
      urlComponents.push({ id: -1, path: '/', title: 'Home' });
      for (var i = 0; i < pathComponents.length; i++) {
        if (pathComponents[i]) {
          var prev = urlComponents.pop();
          var title = '';
          var path = '';
          if (pathComponents[i] === 'category') {
            if (pathComponents[i + 1]) {
              title = pathComponents[i + 1].substring(0, 1).toUpperCase() + 
                pathComponents[i + 1].substring(1).toLowerCase();
              path = prev.path + pathComponents[i] + '/' + pathComponents[i + 1] + '/';
            } else {
              title = pathComponents[i].substring(0, 1).toUpperCase() + 
                pathComponents[i].substring(1).toLowerCase();
              path = prev.path + pathComponents[i] + '/';
            }
          } else if (pathComponents[i] === 'product') {
            if (pathComponents[i + 1]) {
              title = pathComponents[i + 1].substring(0, 1).toUpperCase() + 
                pathComponents[i + 1].substring(1).toLowerCase();
              path = prev.path + pathComponents[i] + '/' + pathComponents[i + 1] + '/';
            } else {
              title = pathComponents[i].substring(0, 1).toUpperCase() + 
                pathComponents[i].substring(1).toLowerCase();
              path = prev.path + pathComponents[i] + '/';
            }
          } else if (pathComponents[i - 1] !== 'category' && pathComponents[i - 1] !== 'product') {
            title = pathComponents[i].substring(0, 1).toUpperCase() + 
              pathComponents[i].substring(1).toLowerCase();
            path = prev.path + pathComponents[i] + '/';
          }
          urlComponents.push(prev);
          if (title !== '') {
            urlComponents.push({
              id: i,
              path: path,
              title: title.replace('-', ' '),
            });
          }
        }
      }
      return urlComponents;
    }
  },
  methods: {
    productURL(product) {
      return product.replace(' ', '-').toLowerCase();
    },
    categoryURL(category) {
      return category.replace(' ', '-').toLowerCase();
    },
    handleRemoveFromCart(index) {
      this.$emit('removeFromCart', index);
      this.$nextTick(function() {
        this.$emit('Checkout');
      });
    },
    handleClearCart() {
      this.$emit('clearCart');
      this.$nextTick(function() {
        this.$emit('Checkout');
      });
    }
  },
}
</script>
