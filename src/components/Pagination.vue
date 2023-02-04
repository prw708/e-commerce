<template lang="pug">
nav
  ul(class="pagination mb-0 justify-content-center")
    li(
      :class="((pagination.currentPage - 1) < pagination.startPage) ? 'page-item disabled' : 'page-item'"
    )
      a(
        class="page-link"
        @click="handlePagination(pagination.currentPage - 1)"
        href="#"
      ) Previous
    li(
      v-for="page in pagination.pages"
      :key="page"
      :class="(page === pagination.currentPage) ? 'page-item active' : 'page-item'"
    )
      a(
        class="page-link"
        @click="handlePagination(page)"
        href="#"
      ) {{ page }} 
    li(
      :class="((pagination.currentPage + 1) > pagination.endPage) ? 'page-item disabled' : 'page-item'"
    )
      a(
        class="page-link"
        @click="handlePagination(pagination.currentPage + 1)"
        href="#"
      ) Next 
</template>

<script>
export default {
  props: [
    'pagination',
  ],
  emits: [
    'goToPage',
  ],
  data() {
    return {
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    handlePagination(page) {
      this.$emit('goToPage', page);
    },
  }
}
</script>
