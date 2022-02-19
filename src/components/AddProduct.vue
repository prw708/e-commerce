<template lang="pug">
div(
  v-if="this.loading"
  class="text-center m-4"
)
  div(class="spinner-border" role="status")
    span(class="visually-hidden") Loading...
div(class="container-fluid px-4")
  div(class="row g-0 mt-5 mb-4")
    div(class="col-12")
      h2(class="m-0") Add Product
  div(
    v-if="this.admin"
    class="row g-4 mb-5"
  )
    div(class="col-12")
      label(for="pCategory" class="form-label") Category
      input(
        type="text"
        id="pCategory"
        :class="(categoryError) ? 'form-control is-invalid' : 'form-control'"
        maxlength="50"
        autocomplete="off"
        v-model="this.category"
        @focus="handleCategoryFocus"
        @blur="handleCategoryBlur"
        @keydown.down.stop="handleCategoryDown"
        @keydown.up.stop="handleCategoryUp"
        @keydown.enter.stop="handleCategorySelect($event)"
        @keyup="handleCategoryFilter"
      )
      ul(
        v-show="showCategories"
        class="list-group categories"
      )
        li(
          v-for="(item, index) in selectedCategories"
          :class="(activateCategory[index]) ? 'list-group-item active' : 'list-group-item'"
          @mouseover="handleCategoryOver(index)"
          @mouseout="handleCategoryOut(index)"
          @mousedown="handleCategoryClick(item)"
        ) {{ item }}
      div(
        v-if="categoryError"
        class="invalid-feedback"
      ) {{ categoryError }}
    div(class="col-12")
      label(for="pTitle" class="form-label") Title
      input(
        type="text"
        id="pTitle"
        :class="(titleError) ? 'form-control is-invalid' : 'form-control'"
        maxlength="50"
        autocomplete="off"
        v-model="this.title"
        @focus="handleTitleFocus"
        @blur="handleTitleBlur"
        @keydown.down.stop="handleTitleDown"
        @keydown.up.stop="handleTitleUp"
        @keydown.enter.stop="handleTitleSelect($event)"
        @keyup="handleTitleFilter"
      )
      ul(
        v-show="showTitles"
        class="list-group titles"
      )
        li(
          v-for="(item, index) in selectedTitles"
          :class="(activateTitle[index]) ? 'list-group-item active' : 'list-group-item'"
          @mouseover="handleTitleOver(index)"
          @mouseout="handleTitleOut(index)"
          @mousedown="handleTitleClick(item)"
        ) {{ item }}
      div(
        v-if="titleError"
        class="invalid-feedback"
      ) {{ titleError }}
    div(class="col-12")
      label(for="pImage" class="form-label") Image
      input(
        type="file"
        id="pImage"
        name="pImage"
        :class="(imageError) ? 'form-control is-invalid' : 'form-control'"
        maxlength="100"
        autocomplete="off"
        accept="image/*"
        v-on:change="(e) => this.image = e.target.value"
      )
      div(
        v-if="imageError"
        class="invalid-feedback"
      ) {{ imageError }}
    div(class="col-12")
      label(for="pPrice" class="form-label") Price
      div(class="input-group")
        span(class="input-group-text") $
        input(
          type="text"
          id="pPrice"
          :class="(priceError) ? 'form-control rounded-end is-invalid' : 'form-control'"
          maxlength="50"
          autocomplete="off"
          v-model="this.price"
        )
        div(
          v-if="priceError"
          class="invalid-feedback"
        ) {{ priceError }}
    div(class="col-12")
      label(for="pDescription" class="form-label") Description
      textarea(
        id="pDescription"
        :class="(descriptionError) ? 'form-control is-invalid' : 'form-control'"
        rows="3"
        v-model="this.description"
      )
      div(
        v-if="descriptionError"
        class="invalid-feedback"
      ) {{ descriptionError }}
    div(class="col-12")
      div(class="form-check")
        input(
          id="pShippable"
          name="pShippable"
          type="radio"
          :class="(shippableError) ? 'form-check-input is-invalid' : 'form-check-input'"
          v-model="this.shippable"
          value="true"
        )
        label(for="pShippable" class="form-check-label") Shippable
      div(class="form-check")
        input(
          id="pNotShippable"
          name="pShippable"
          type="radio"
          :class="(shippableError) ? 'form-check-input is-invalid' : 'form-check-input'"
          v-model="this.shippable"
          value="false"
        )
        label(for="pNotShippable" class="form-check-label") Not Shippable
      div(
        v-if="shippableError"
        class="input-group"
      )
        span(class="is-invalid")
        div(class="invalid-feedback") {{ shippableError }}
    div(class="col-12")
      label(for="pWeight" class="form-label") Weight (oz)
      input(
        type="text"
        id="pWeight"
        :class="(weightError) ? 'form-control is-invalid' : 'form-control'"
        maxlength="50"
        autocomplete="off"
        v-model="this.weight"
      )
      div(
        v-if="weightError"
        class="invalid-feedback"
      ) {{ weightError }}
    div(class="col-12 col-sm-4 pe-sm-3")
      label(for="pWidth" class="form-label") Width (in)
      input(
        type="text"
        id="pWidth"
        :class="(widthError) ? 'form-control is-invalid' : 'form-control'"
        maxlength="50"
        autocomplete="off"
        v-model="this.pwidth"
      )
      div(
        v-if="widthError"
        class="invalid-feedback"
      ) {{ widthError }}
    div(class="col-12 col-sm-4 px-sm-3")
      label(for="pLength" class="form-label") Length (in)
      input(
        type="text"
        id="pLength"
        :class="(lengthError) ? 'form-control is-invalid' : 'form-control'"
        maxlength="50"
        autocomplete="off"
        v-model="this.plength"
      )
      div(
        v-if="lengthError"
        class="invalid-feedback"
      ) {{ lengthError }}
    div(class="col-12 col-sm-4 ps-sm-3")
      label(for="pHeight" class="form-label") Height (in)
      input(
        type="text"
        id="pHeight"
        :class="(heightError) ? 'form-control is-invalid' : 'form-control'"
        maxlength="50"
        autocomplete="off"
        v-model="this.pheight"
      )
      div(
        v-if="heightError"
        class="invalid-feedback"
      ) {{ heightError }}
    div(class="col-12")
      button(
        id="addProduct"
        type="button"
        class="btn btn-secondary btn-lg"
        @click="handleAddProductButton"
        :disabled="!this.admin"
      )
        span(
          v-if="loading"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        )
        |  Add Product
  div(
    v-else
    class="alert alert-danger px-4 mb-4"
  )
    p(class="mb-0") You must have sufficient privileges.
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
  data() {
    return {
      title: '',
      image: '',
      category: '',
      price: '',
      description: '',
      shippable: false,
      weight: '',
      pwidth: '',
      plength: '',
      pheight: '',
      titleError: '',
      imageError: '',
      categoryError: '',
      priceError: '',
      descriptionError: '',
      shippableError: '',
      weightError: '',
      widthError: '',
      lengthError: '',
      heightError: '',
      showCategories: false,
      activateCategory: [],
      categoryIndex: -1,
      selectedCategories: [],
      showTitles: false,
      activateTitle: [],
      titleIndex: -1,
      selectedTitles: [],
    }
  },
  watch: {
  },
  mounted() {
    this.$emit('getError', '');
  },
  methods: {
    validTitle() {
      if (!/^[A-Za-z0-9 \-']{1,50}$/.test(this.title) || /static/.test(this.title)) {
        this.titleError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.titleError = "";
        return true;
      }
    },
    validImage() {
      if (this.image && !/^[A-Za-z0-9 \-'.,\\:]{1,100}$/.test(this.image)) {
        this.imageError = "Can contain A-Z, a-z, 0-9, spaces, ', ., ,, and -.";
        return false;
      } else {
        this.imageError = "";
        return true;
      }
    },
    validCategory() {
      if (!/^[A-Za-z0-9 \-']{1,50}$/.test(this.category) || /static/.test(this.category)) {
        this.categoryError = "Can contain A-Z, a-z, 0-9, spaces, ', and -.";
        return false;
      } else {
        this.categoryError = "";
        return true;
      }
    },
    validPrice() {
      if (this.price === '' || !/^[0-9]{0,4}(\.[0-9]{1,2})?$/.test(this.price)) {
        this.priceError = "Format must be in XXXX.XX.";
        return false;
      } else {
        this.priceError = "";
        return true;
      }
    },
    validDescription() {
      if (!/^[A-Za-z0-9 \-,.!?:;'"#@$%\n]{0,150}$/.test(this.description)) {
        this.descriptionError = "Can be 0 to 150 characters in length.";
        return false;
      } else {
        this.descriptionError = "";
        return true;
      }
    },
    validShippable() {
      if (!/^(true|false)$/.test(this.shippable)) {
        this.shippableError = "Can be true or false.";
        return false;
      } else {
        this.shippableError = "";
        return true;
      }
    },
    validWeight() {
      if (!/^[0-9]{0,4}$/.test(this.weight)) {
        this.weightError = "Format must be in XXXX.";
        return false;
      } else if (this.shippable === "true" && (!this.weight || parseInt(this.weight, 10) === 0)) {
        this.weightError = "Must be a non-zero value.";
        return false;
      } else {
        this.weightError = "";
        return true;
      }
    },
    validWidth() {
      if (!/^[0-9]{0,4}$/.test(this.pwidth)) {
        this.widthError = "Format must be in XXXX.";
        return false;
      } else if (this.shippable === "true" && (!this.pwidth || parseInt(this.pwidth, 10) === 0)) {
        this.widthError = "Must be a non-zero value.";
        return false;
      } else {
        this.widthError = "";
        return true;
      }
    },
    validLength() {
      if (!/^[0-9]{0,4}$/.test(this.plength)) {
        this.lengthError = "Format must be in XXXX.";
        return false;
      } else if (this.shippable === "true" && (!this.plength || parseInt(this.plength, 10) === 0)) {
        this.lengthError = "Must be a non-zero value.";
        return false;
      } else {
        this.lengthError = "";
        return true;
      }
    },
    validHeight() {
      if (!/^[0-9]{0,4}$/.test(this.pheight)) {
        this.heightError = "Format must be in XXXX.";
        return false;
      } else if (this.shippable === "true" && (!this.pheight || parseInt(this.pheight, 10) === 0)) {
        this.heightError = "Must be a non-zero value.";
        return false;
      } else {
        this.heightError = "";
        return true;
      }
    },
    handleCategoryFocus() {
      this.showCategories = true;
      if (this.selectedCategories.length === 0) {
        this.selectedCategories = this.categories.slice(0, 5);
      }
    },
    handleCategoryBlur() {
      this.showCategories = false;
    },
    handleCategoryOver(index) {
      this.activateCategory[index] = true;
      this.categoryIndex = index;
    },
    handleCategoryOut(index) {
      this.activateCategory[index] = false;
    },
    handleCategoryClick(category) {
      this.category = category;
    },
    handleCategoryDown() {
      for (var i = 0; i < this.selectedCategories.length; i++) {
        this.activateCategory[i] = false;
      }
      if (this.categoryIndex + 1 > this.selectedCategories.length) {
        this.categoryIndex = 0;
      } else {
        this.categoryIndex++;
      }
      this.activateCategory[this.categoryIndex] = true;
    },
    handleCategoryUp() {
      for (var i = 0; i < this.selectedCategories.length; i++) {
        this.activateCategory[i] = false;
      }
      if (this.categoryIndex - 1 < 0) {
        this.categoryIndex = this.selectedCategories.length;
      } else {
        this.categoryIndex--;
      }
      this.activateCategory[this.categoryIndex] = true;
    },
    handleCategorySelect(event) {
      if (this.categoryIndex >= 0 && this.categoryIndex < this.selectedCategories.length) {
        this.category = this.selectedCategories[this.categoryIndex];
      }
      event.currentTarget.blur();
    },
    handleCategoryFilter() {
      this.selectedCategories = [];
      for (var i = 0; i < this.categories.length; i++) {
        if (this.categories[i].indexOf(this.category) !== -1) {
          this.selectedCategories.push(this.categories[i]);
        }
      }
      this.selectedCategories = this.selectedCategories.slice(0, 5);
    },
    handleTitleFocus() {
      this.showTitles = true;
      var titles = [];
      if (this.selectedTitles.length === 0) {
        for (var i = 0; i < this.listings.length; i++) {
          for (var j = 0; j < this.listings[i].length; j++) {
            titles.push(this.listings[i][j].title);
          }
        }
        this.selectedTitles = titles.slice(0, 5);
      }
    },
    handleTitleBlur() {
      this.showTitles = false;
    },
    handleTitleOver(index) {
      this.activateTitle[index] = true;
      this.titleIndex = index;
    },
    handleTitleOut(index) {
      this.activateTitle[index] = false;
    },
    handleTitleClick(title) {
      this.title = title;
    },
    handleTitleDown() {
      for (var i = 0; i < this.selectedTitles.length; i++) {
        this.activateTitle[i] = false;
      }
      if (this.titleIndex + 1 > this.selectedTitles.length) {
        this.titleIndex = 0;
      } else {
        this.titleIndex++;
      }
      this.activateTitle[this.titleIndex] = true;
    },
    handleTitleUp() {
      for (var i = 0; i < this.selectedTitles.length; i++) {
        this.activateTitle[i] = false;
      }
      if (this.titleIndex - 1 < 0) {
        this.titleIndex = this.selectedTitle.length;
      } else {
        this.titleIndex--;
      }
      this.activateTitle[this.titleIndex] = true;
    },
    handleTitleSelect(event) {
      if (this.titleIndex >= 0 && this.titleIndex < this.selectedTitles.length) {
        this.title = this.selectedTitles[this.titleIndex];
      }
      event.currentTarget.blur();
    },
    handleTitleFilter() {
      this.selectedTitles = [];
      for (var i = 0; i < this.listings.length; i++) {
        for (var j = 0; j < this.listings[i].length; j++) {
          if (this.listings[i][j].title.indexOf(this.title) !== -1) {
            this.selectedTitles.push(this.listings[i][j].title);
          }
        }
      }
      this.selectedTitles = this.selectedTitles.slice(0, 5);
    },
    handleAddProductButton() {
      var validTitle = this.validTitle();
      var validImage = this.validImage();
      var validCategory = this.validCategory();
      var validPrice = this.validPrice();
      var validDescription = this.validDescription();
      var validShippable = this.validShippable();
      var validWeight = this.validWeight();
      var validWidth = this.validWidth();
      var validLength = this.validLength();
      var validHeight = this.validHeight();
      if (validTitle && validImage && validCategory && validPrice && validDescription && validShippable &&
          validWeight && validWidth && validLength && validHeight) {
        this.$emit('getError', '');
        this.$emit('SendData', {
          title: this.title,
          image: this.image,
          category: this.category,
          price: this.price,
          description: this.description,
          shippable: this.shippable,
          weight: this.weight,
          width: this.pwidth,
          length: this.plength,
          height: this.pheight,
        });
      } else {
        this.$emit('getError', "There are errors in the Add Product form.");
      }
    }
  }
}
</script>
