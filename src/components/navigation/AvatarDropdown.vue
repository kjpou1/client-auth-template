<!-- eslint-disable max-len -->
// https://www.youtube.com/watch?v=SGVSvi1OxE8&list=RDCMUCtb40EQj2inp8zuaQlLx3iQ&index=2
<template>
  <div class="relative">
    <a
      href="#"
      class = "flex items-center group"
      v-click-away="hideDropdown"
      @click.prevent="toggleDropdown"
      @keydown.space.exact.prevent="toggleDropdown"
      @keydown.esc.exact="hideDropdown"
      @keydown.shift.tab="hideDropdown"
      @keydown.up.exact.prevent="startArrowKeys"
      @keydown.down.exact.prevent="startArrowKeys"
    >
      <!-- Code block starts -->
      <div
          class = "w-12 h-12 mb-4 lg:mb-0 bg-cover rounded-full mr-2 relative flex justify-center items-center
                   bg-gray-100 group-hover:bg-gray-200 dark:bg-gray-800 shadow-md"
      >
        <div class ="h-2 w-2 bg-green-400 rounded-full absolute right-0 top-0 mt-2 border border-white
                    group-hover:bg-green-600 ">
        </div >
        <p class = "text-indigo-700 font-bold">K</p >
      </div>
      <svg v-show="avatar_menu_show"
          id="upIcon1"
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-chevron-up"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="white"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <polyline points="6 15 12 9 18 15"></polyline>
      </svg>
      <svg v-show="!avatar_menu_show"
          id="downIcon1"
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-chevron-down"
          width="24" height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="white"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </a>

    <transition name="dropdown-fade">
      <div v-show="avatar_menu_show">
      <!-- Drowpdown menu options  -->
      <ul ref="dropdown" class="absolute normal-case font-normal xs:left-0 lg:right-0 bg-white shadow overflow-hidden rounded w-48 border mt-2 py-1 lg:z-20">
          <li>
            <a
              href="./settings"
              ref="settings"
              class="flex items-center px-3 py-3 hover:bg-gray-200"
              @keydown.up.exact.prevent=""
              @keydown.tab.exact="focusNext(false)"
              @keydown.down.exact.prevent="focusNext(true)"
              @keydown.esc.exact="hideDropdown"
              @keydown.shift.tab="hideDropdown"
            >
              <svg fill="currentColor" class="text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm9 11a1 1 0 0 1-2 0v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2a1 1 0 0 1-2 0v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2z"></path></svg>
              <span class="ml-2">Settings</span>
            </a>
          </li>
          <!-- <li>
            <a
              href="#"
              class="flex items-center px-3 py-3 hover:bg-gray-200"
              @keydown.tab.exact="focusNext(false)"
              @keydown.shift.tab="focusPrevious(false)"
              @keydown.up.exact.prevent="focusPrevious(true)"
              @keydown.down.exact.prevent="focusNext(true)"
              @keydown.esc.exact="hideDropdown"
            >
              <svg fill="currentColor" class="text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-11v2h1a3 3 0 0 1 0 6h-1v1a1 1 0 0 1-2 0v-1H8a1 1 0 0 1 0-2h3v-2h-1a3 3 0 0 1 0-6h1V6a1 1 0 0 1 2 0v1h3a1 1 0 0 1 0 2h-3zm-2 0h-1a1 1 0 1 0 0 2h1V9zm2 6h1a1 1 0 0 0 0-2h-1v2z"></path></svg>
              <span class="ml-2">Billing</span>
            </a>
          </li>
          <li>
            <a
              href="https://google.ca"
              class="flex items-center px-3 py-3 hover:bg-gray-200"
              @keydown.tab.exact="focusNext(false)"
              @keydown.shift.tab="focusPrevious(false)"
              @keydown.up.exact.prevent="focusPrevious(true)"
              @keydown.down.exact.prevent="focusNext(true)"
              @keydown.esc.exact="hideDropdown"
            >
              <svg fill="currentColor" class="text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M20 22H4a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h4V8c0-1.1.9-2 2-2h4V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2zM14 8h-4v12h4V8zm-6 4H4v8h4v-8zm8-8v16h4V4h-4z"></path></svg>
              <span class="ml-2">Analytics</span>
            </a>
          </li>
          <li class="border-b border-gray-400">
            <a
              href="#"
              class="flex items-center px-3 py-3 hover:bg-gray-200"
              @keydown.tab.exact="focusNext(false)"
              @keydown.shift.tab="focusPrevious(false)"
              @keydown.up.exact.prevent="focusPrevious(true)"
              @keydown.down.exact.prevent="focusNext(true)"
              @keydown.esc.exact="hideDropdown"
            >
              <svg fill="currentColor" class="text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M9 4.58V4c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v.58a8 8 0 0 1 1.92 1.11l.5-.29a2 2 0 0 1 2.74.73l1 1.74a2 2 0 0 1-.73 2.73l-.5.29a8.06 8.06 0 0 1 0 2.22l.5.3a2 2 0 0 1 .73 2.72l-1 1.74a2 2 0 0 1-2.73.73l-.5-.3A8 8 0 0 1 15 19.43V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.58a8 8 0 0 1-1.92-1.11l-.5.29a2 2 0 0 1-2.74-.73l-1-1.74a2 2 0 0 1 .73-2.73l.5-.29a8.06 8.06 0 0 1 0-2.22l-.5-.3a2 2 0 0 1-.73-2.72l1-1.74a2 2 0 0 1 2.73-.73l.5.3A8 8 0 0 1 9 4.57zM7.88 7.64l-.54.51-1.77-1.02-1 1.74 1.76 1.01-.17.73a6.02 6.02 0 0 0 0 2.78l.17.73-1.76 1.01 1 1.74 1.77-1.02.54.51a6 6 0 0 0 2.4 1.4l.72.2V20h2v-2.04l.71-.2a6 6 0 0 0 2.41-1.4l.54-.51 1.77 1.02 1-1.74-1.76-1.01.17-.73a6.02 6.02 0 0 0 0-2.78l-.17-.73 1.76-1.01-1-1.74-1.77 1.02-.54-.51a6 6 0 0 0-2.4-1.4l-.72-.2V4h-2v2.04l-.71.2a6 6 0 0 0-2.41 1.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>
              <span class="ml-2">Settings</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              class="flex items-center px-3 py-3 hover:bg-gray-200"
              @keydown.tab.exact="focusNext(false)"
              @keydown.shift.tab="focusPrevious(false)"
              @keydown.up.exact.prevent="focusPrevious(true)"
              @keydown.down.exact.prevent="focusNext(true)"
              @keydown.esc.exact="hideDropdown"
            >
              <svg fill="currentColor" class="text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.59 8.59a1 1 0 1 1-1.42-1.42 4 4 0 1 1 5.66 5.66l-2.12 2.12a1 1 0 1 1-1.42-1.42l2.12-2.12A2 2 0 0 0 10.6 8.6zM12 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>
              <span class="ml-2">Help</span>
            </a>
          </li> -->
          <!-- <li
            class="divide-y"
          >
            <a
              href="#"
              class="flex items-center px-3 py-3 hover:bg-gray-200"
              @keydown.tab.exact="focusNext(false)"
              @keydown.shift.tab="focusPrevious(false)"
              @keydown.up.exact.prevent="focusPrevious(true)"
              @keydown.down.exact.prevent="focusNext(true)"
              @keydown.esc.exact="hideDropdown"
            >
              <svg fill="currentColor" class="text-gray-600 divide-y-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.59 8.59a1 1 0 1 1-1.42-1.42 4 4 0 1 1 5.66 5.66l-2.12 2.12a1 1 0 1 1-1.42-1.42l2.12-2.12A2 2 0 0 0 10.6 8.6zM12 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path></svg>
              <span class="ml-2">Another</span>
            </a>
          </li> -->

          <!-- Separator !!! -->
          <hr class="h-0 my-2 border border-solid border-t-0 border-gray-700 opacity-25" />
          <li
            class="divide-y"
            @click.prevent="signout"
          >
            <a
              href=""
              class="flex items-center px-3 py-3 hover:bg-gray-200 divide-y-5"
              @keydown.shift.tab="focusPrevious(false)"
              @keydown.up.exact.prevent="focusPrevious(true)"
              @keydown.down.exact.prevent=""
              @keydown.tab.exact="hideDropdown"
              @keydown.esc.exact="hideDropdown"
            >
                <svg fill="currentColor" class="text-gray-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"></path><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path></svg>
                <span class="ml-2">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div >
</template>

<script>
export default {
  name: 'AvatarDropdown',
  data() {
    return {
      avatar_menu_show: false,
      focusedIndex: 0,
    };
  },
  methods: {
    signout() {
      this.$store.dispatch('signout', {
        router: this.$router,
        route: this.$route,
      });

      // console.log(this.$route);
      // if (this.$route.meta.requiresAuth) {
      this.$router.push({ name: 'home' });
    },
    toggleDropdown() {
      this.avatar_menu_show = !this.avatar_menu_show;
    },
    hideDropdown() {
      this.avatar_menu_show = false;
      this.focusedIndex = 0;
    },
    startArrowKeys() {
      if (this.avatar_menu_show) {
        // this.$refs.settings.focus();
        this.$refs.dropdown.children[0].children[0].focus();
        this.focusedIndex = 0;
      }
    },
    focusPrevious(isArrowKey) {
      this.focusedIndex -= 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusNext(isArrowKey) {
      this.focusedIndex += 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusItem() {
      this.$refs.dropdown.children[this.focusedIndex].children[0].focus();
    },

  },
};
</script>

<style scoped>
  .dropdown-fade-enter-active, .dropdown-fade-leave-active {
    transition: all .5s ease-in-out
  }
  .dropdown-fade-enter, .dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-12px);
  }

</style>
