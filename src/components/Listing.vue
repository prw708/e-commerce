<template lang="pug">
div(class="container-fluid px-4")
  div(class="row g-0 mt-5 mb-4")
    div(class="col-8")
      h2(class="m-0") {{ category }}
    div(class="col-4 d-flex align-items-end flex-row-reverse")
      router-link(:to="{ name: 'category', params: { category: categoryURL } }") View All
  div(
    :id="'carouselControls' + index"
    class="carousel slide" 
    data-bs-interval="false"
  )
    div(class="carousel-inner")
      template(
        v-for="productNum in productsCount"
        :key="category + productNum + reRender.toString()"
      )
        div(
          v-if="productNum % itemsLength === 0"
          :class="(productNum === 0) ? 'carousel-item active me-3' : 'carousel-item'"
        )
          div(class="row g-3")
            div(
              v-for="productIndex in productsCount.slice(productNum, productNum + itemsLength)"
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
    button(
      class="carousel-control-prev" 
      type="button" 
      :data-bs-target="'#carouselControls' + index"
      data-bs-slide="prev"
    )
      span(class="carousel-control-prev-icon" aria-hidden="true")
      span(class="visually-hidden") Prev
    button(
      class="carousel-control-next" 
      type="button" 
      :data-bs-target="'#carouselControls' + index"
      data-bs-slide="next"
    )
      span(class="carousel-control-next-icon" aria-hidden="true")
      span(class="visually-hidden") Next
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
    'index',
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
  inject: [
    'addToCart',
  ],
  data() {
    return {
      hovered: [],
      reRender: 0,
    }
  },
  watch: {
    itemsLength() {
      this.reRender++;
    },
  },
  computed: {
    productsCount() {
      var products = [];
      for (var i = 0; i < this.listing.length; i++) {
        products[i] = i;
      }
      return products;
    },
    categoryURL() {
      return this.category.replace(' ', '-').toLowerCase();
    },
    itemsLength() {
      if (this.width <= 576) {
        return 1;
      } else if (this.width <= 768) {
        return 2;
      } else if (this.width <= 992) {
        return 3;
      } else {
        return 4;
      }
    }
  },
  methods: {
    productURL(product) {
      return product.replace(' ', '-').toLowerCase();
    },
    handleAddToCartButton(index) {
      this.addToCart({
        id: this.listing[index].id,
        image: this.listing[index].image,
        category: this.category,
        quantity: 1,
        product: this.listing[index].title,
        price: this.listing[index].price,
        inventoryAmount: this.listing[index].inventoryAmount,
        shippable: this.listing[index].shippable,
      });
    }
  },
}
</script>
