<template>
  <div class="page">
    <div class="content" v-html="$store.state.goods.details.bodys"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "component-details-content",
});
</script>

<style scoped>
.page {
  margin-top: 1.2rem;
}

.content {
  width: 90%;
  margin: 0 auto;
  font-size: 0.32rem;
  line-height: 0.5rem;
}
</style>
