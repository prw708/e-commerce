<template lang="pug">
input(
  type="text"
  class="form-control"
  v-model="searchText"
  @input="debounceSearchBar()()"
)
</template>

<script>
export default {
  props: [
  ],
  emits: [
    'getSearchText',
  ],
  data() {
    return {
      update: null,
      searchText: '',
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    debounceSearchBar() {
      return function() {
        clearTimeout(this.update);
        this.update = setTimeout(function() {
          this.update = null;
          this.handleSearchBar();
        }.bind(this), 1000);
      }.bind(this);
    },
    handleSearchBar() {
      this.$emit('getSearchText', this.searchText);
    },
  }
}
</script>
