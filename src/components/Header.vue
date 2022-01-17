<!-- eslint-disable max-len -->
<template>
  <!-- Header -->
  <header id="header" class="bg-dark-olive">
    <nav class="container mx-auto flex justify-between items-center py-5 px-4">
      <!-- App Name -->
      <router-link class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }" exact-active-class="no-active">
        <img class="relative block mx-auto mt-5 -mb-0 w-auto max-w-full"
        src="@/assets/grouplogo.png" />
      </router-link>
      <div>
          <div @click="toggleMenu(true)" class="sm:block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 focus:outline-none">
              <svg aria-haspopup="true" aria-label="Main Menu" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
          </div>
          <div id="menu" class="md:block lg:block hidden">
            <div @click="toggleMenu(false)" class="block md:hidden lg:hidden text-gray-500 hover:text-gray-700 focus:text-gray-700 fixed focus:outline-none z-30 top-0 pt-8">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </div>
            <!-- Primary Navigation -->
            <ul class="flex md:flex text-3xl md:text-base lg:text-base lg:flex flex-col md:flex-row lg:flex-row justify-center items-center fixed md:relative lg:relative top-0 bottom-0 left-0 right-0 bg-dark-olive z-20 xl:mr-32">
              <!-- Navigation Links -->
                <li class="md:mr-8 lg:mr-10 flex items-center" v-if="userSignedIn">
                  <router-link class="px-2 text-white" :to="{ name: 'profile' }">
                    Profile
                  </router-link>
                </li>
              <li class="md:mr-8 lg:mr-10 flex items-center">
                <router-link class="px-2 text-white" :to="{ name: 'about' }">
                  About
                </router-link>
              </li>
              <li class="md:mr-8 lg:mr-10 flex items-center" v-if="!userSignedIn">
                <button
                class="focus:outline-none mt-10 md:mt-0 bg-white transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-600 text-indigo-600 px-6 py-3 text-sm"
                @click.prevent="toggleAuthModal">Sign In / Register</button>
              </li>
              <template v-else>
                <li class="md:mr-8 lg:mr-10 flex items-center">
                                  <button
                class="focus:outline-none mt-10 md:mt-0 bg-white transition duration-150 ease-in-out hover:bg-gray-200 rounded border border-indigo-600 text-indigo-600 px-6 py-3 text-sm"
                @click.prevent="signout">Sign Out</button>

                  <!-- <a class="px-2 text-white" href="#"
                    @click.prevent="signout">Logout</a> -->
                </li>
              </template>
            </ul>
          </div>
        </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapState(['userSignedIn']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
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
