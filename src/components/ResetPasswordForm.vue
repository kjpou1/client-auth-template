<!-- eslint-disable max-len -->
<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="px-2 flex flex-col items-center justify-center mt-8 sm:mt-0">
          <h2 class="text-4xl dark:text-gray-100 leading-tight pt-8">Reset Password</h2>
        </div>
        <div class="text-white text-center font-bold p-4 mb-4"
          v-if="reset_show_alert"
          :class="reset_alert_variant">
          {{ reset_alert_msg}}
        </div>

        <div class="mx-auto flex justify-center md:items-center relative md:h-full">
          <!-- Reset Form -->
          <vee-form id="reset" :validation-schema="schema"
            @submit="resetPassword"
            class="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-gray-800 mb-32 sm:mb-0 my-40 sm:my-12 px-2 sm:px-0">
            <div class="mt-12 w-full px-2 sm:px-6">
              <!-- Password -->
              <div class="mb-3">
                <label class="inline-block mb-2">Password</label>
                <vee-field name="password" :bails="false" v-slot="{ field, errors }">
                  <input class="block w-full py-1.5 px-3 text-gray-800 border
                    border-gray-300 transition duration-500 focus:outline-none
                    focus:border-black rounded" type="password"
                    placeholder="Password" v-bind="field" />
                  <div class="text-red-600" v-for="error in errors" :key="error">
                    {{ error }}
                  </div>
                </vee-field>
              </div>
              <!-- Confirm Password -->
              <div class="mb-3">
                <label class="inline-block mb-2">Confirm Password</label>
                <vee-field type="password" name="confirm_password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Confirm Password" />
                <ErrorMessage class="text-red-600" name="confirm_password" />
              </div>
            </div>
            <div class="px-2 mb-16 sm:mb-56 md:mb-16 sm:px-6">
                <button
                  class="focus:outline-none w-full bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
                  type = "submit"
                  :disabled="this.isResetting"
                >Submit</button>
            </div>
          </vee-form>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ResetForm',
  data() {
    return {
      schema: {
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
      },
      reset_show_alert: false,
      reset_alert_variant: 'bg-blue-500',
      reset_alert_msg: 'Please wait! We are processing your reset request.',
    };
  },
  methods: {
    async resetPassword(values) {
      try {
        await this.$store.dispatch('resetPassword', { values, params: this.$route.params });
      } catch (error) {
        this.reset_submission = false;
        this.reset_alert_variant = 'bg-red-500';
        this.reset_alert_msg = 'An unexpected error occured.  Please try again later.';
      }
    },
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'isResetError',
      'isResetting',
      'isReset',
      'getResetErrorMessage',
      // ...
    ]),
  },
  watch: {
    isResetting() {
      // Show message
      if (this.isResetting) {
        this.reset_show_alert = true;
        this.reset_alert_msg = 'Please wait! We are processing the reset request.';
      }

      // set the colors
      if (this.isResetError) {
        this.reset_alert_variant = 'bg-red-500';
      } else if (this.isResetten) { this.forget_alert_variant = 'bg-green-500'; } else { this.forget_alert_variant = 'bg-blue-500'; }
    },
    isReset() {
      this.reset_alert_msg = 'Success! Passwords have been reset.  Please Sign In using your new credentials.';
      try {
        this.$store.dispatch('resetRedirect');
      } catch (error) {
        this.reset_alert_variant = 'bg-red-500';
        this.reset_alert_msg = 'An unexpected error occured while trying to redirect.  Please try again later.';
      }
    },
    isResetError() {
      this.reset_alert_msg = this.getResetErrorMessage;
    },
  },
};
</script>
