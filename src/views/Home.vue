<template>
<main>
  <!-- Introduction -->
  <div class="home">
    <hero></hero>
  </div>
</main>
</template>

<script>
// @ is an alias to /src
import Hero from '@/components/Hero.vue';

export default {
  name: 'Home',
  components: {
    Hero,
  },
};
</script>
