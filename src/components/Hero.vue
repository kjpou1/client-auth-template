<!-- eslint-disable max-len -->
<template>
  <div class="bg-white w-full h-full bg-no-repeat bg-contain bg-top introduction-bg">

    <section class="mx-auto container">
      <div class="flex items-center justify-between w-full">
        <div class="py-20 w-full h-full bg-transparent-200">
          <div class="container mx-auto">
            <div class="w-10/12 mx-auto mb-4 my-20 md:w-10/12 shadow sm:px-10 sm:py-6 py-4 px-4 bg-white rounded-md">
              <p class="text-lg text-gray-800 pb-3 font-semibold">Best In Class User Experience</p>
              <p class="text-sm text-gray-600 pb-4 font-normal">The next big thing is the one that makes the last big thing usable.</p>
              <button class="focus:outline-none text-xs rounded-sm font-bold pl-0 pr-2 text-indigo-700 flex items-center pb-40">
                  Learn More About Our UX
                  <span class="pl-3 text-indigo-500">
                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-narrow-right" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currwntColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <line x1="15" y1="16" x2="19" y2="12" />
                          <line x1="15" y1="8" x2="19" y2="12" />
                      </svg>
                  </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
<!-- </div> -->
</template>

<script>
export default {
  name: 'Hero',
  methods: {
    // Function to toggle header menu in mobile view.
    toggleMenu(flag) {
      const value = document.getElementById('menu');
      if (flag) {
        value.classList.remove('hidden');
      } else {
        value.classList.add('hidden');
      }
    },
  },
};
</script>
