<template lang="pug">
div(
  v-if="this.loading"
  class="text-center m-4"
)
  div(class="spinner-border" role="status")
    span(class="visually-hidden") Loading...
div(
  class="container-fluid px-4"
)
  div(class="row g-0 mt-5 mb-4")
    div(class="col-12")
      h2(class="mb-4") Orders
      SearchBar(
        @getSearchText="handleGetSearchText"
      )
  div(
    v-if="this.admin && !loading && orders && orders.length > 0"
    class="row g-0 mb-5"
  )
    div(class="container-fluid mt-0 mb-4")
      div(
        v-for="(order, index) in orders" 
        :key="order.orderId"
        :class="(index === 0) ? 'border-top border-bottom p-4' : 'border-bottom p-4'"
      )
        div(
          :class="(order.completed) ? 'row g-0 opacity-50' : 'row g-0 opacity-100'"
        )
          div(class="col-md-1")
            div(class="form-check mb-4")
              input(
                class="form-check-input" 
                type="checkbox"
                v-model="order.completed"
                @change="handleCheckbox(index)"
              )
          div(class="col-md-4")
            h2(class="mb-4") ${{ order.total }}
            p(class="mb-0 text-muted") Tax: ${{ order.tax }}
            p(class="mb-4 text-muted") Shipping: ${{ order.shippingCost }}
          div(class="col-md-7")
            h6(class="mb-4") {{ order.created }}
            p(class="mb-0") Email: {{ order.shippingAddress.email }}
            p(class="mb-0") Order Id: {{ order.orderId }}
            p(class="mb-0") Customer Id: {{ order.customerId }}
            p(class="mb-4") Payment Id: {{ order.paymentId }}
            h6(class="mb-2" @click="handleShowOrder(index)") Order
            ul(
              v-if="showOrder[index]"
              class="list-unstyled my-4"
            )
              li(
                v-for="item in order.order"
                :key="order.orderId"
                class="mb-2"
              ) 
                p(class="mb-0") {{ item.title }}
                p(class="mb-0 text-muted") ${{ item.price }} x {{ item.quantity }}
            h6(class="mb-0" @click="handleShowAddress(index)") Shipping Address
            ul(
              v-if="showAddress[index] && \
                    order.shippingAddress.name && \
                    order.shippingAddress.line1 && \
                    order.shippingAddress.city && \
                    order.shippingAddress.state && \
                    order.shippingAddress.postalCode && \
                    order.shippingAddress.country"
              class="list-unstyled mt-4 mb-0"
            )
              li(class="mb-0") {{ order.shippingAddress.name }}
              li(class="mb-0") {{ order.shippingAddress.line1 }}
              li(class="mb-0" v-if="order.shippingAddress.line2") {{ order.shippingAddress.line2 }}
              li(class="mb-0") {{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{ order.shippingAddress.postalCode }}
              li(class="mb-0") {{ order.shippingAddress.country }}
    Pagination(
      :pagination="pagination"
      @goToPage="handlePagination"
    )
  div(
    v-else-if="!loading && !this.admin"
    class="alert alert-danger px-4 mb-5"
  )
    p(class="mb-0") You must have sufficient privileges.
  div(
    v-else-if="!loading && (!orders || orders.length === 0)"
    class="mb-5"
  )
    p(class="mb-0") No orders to display.
</template>

<script>
import Pagination from './Pagination.vue';
import SearchBar from './SearchBar.vue';

export default {
  components: {
    Pagination: Pagination,
    SearchBar: SearchBar,
  },
  props: [
    'loading',
    'admin',
    'orders',
    'errors',
    'pagination',
  ],
  emits: [
    'GetOrders',
    'MarkCompleted',
  ],
  data() {
    return {
      showAddress: [],
      showOrder: [],
      searchText: '',
    }
  },
  watch: {
    orders() {
      this.showAddress = [];
      this.showOrder = [];
      for (var i = 0; i < this.orders.length; i++) {
        this.showAddress.push(false);
        this.showOrder.push(false);
      }
    },
  },
  mounted() {
    this.$emit('getError', '');
    this.$emit('GetOrders', { page: 1, searchText: '' });
  },
  methods: {
    handleShowOrder(index) {
      this.showOrder[index] = !this.showOrder[index];
    },
    handleShowAddress(index) {
      this.showAddress[index] = !this.showAddress[index];
    },
    handleCheckbox(index) {
      this.$emit('MarkCompleted', this.orders[index].orderId);
    },
    handlePagination(page) {
      this.$emit('GetOrders', { page: page, searchText: this.searchText });
    },
    handleGetSearchText(val) {
      this.searchText = val;
      this.$emit('GetOrders', { page: 1, searchText: val });
    },
  }
}
</script>
