<!-- eslint-disable max-len -->
<template>
  <li class="md:mr-8 lg:mr-10 flex items-center">
                    <button
  class="focus:outline-none mt-10 md:mt-0 bg-white transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-600 text-indigo-600 px-6 py-3 text-sm"
  @click.prevent="signout">Sign Out</button>
  </li>

</template>

<script>
export default {
  name: 'ButtonSignout',
  methods: {
    signout() {
      this.$store.dispatch('signout', {
        router: this.$router,
        route: this.$route,
      });

      // console.log(this.$route);
      // if (this.$route.meta.requiresAuth) {
      this.$router.push({ name: 'home' });
      // }
    },
  },

};
</script>

<style>

</style>
