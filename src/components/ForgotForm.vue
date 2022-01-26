<!-- eslint-disable max-len -->
<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="px-2 flex flex-col items-center justify-center mt-8 sm:mt-0">
          <h2 class="text-4xl dark:text-gray-100 leading-tight pt-8">Forgot Password</h2>
        </div>
        <div class="text-white text-center font-bold p-4 mb-4"
          v-if="forgot_show_alert"
          :class="forgot_alert_variant">
          {{ forgot_alert_msg}}
        </div>

        <div class="mx-auto flex justify-center md:items-center relative md:h-full">
          <!-- Forgot Form -->
          <vee-form id="forgot" :validation-schema="schema"
            @submit="forgot"
            class="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-gray-800 mb-32 sm:mb-0 my-40 sm:my-12 px-2 sm:px-0">
            <!-- <div class="pt-0 px-2 flex flex-col items-center justify-center">
                <h3 class="text-2xl sm:text-3xl xl:text-2xl font-bold dark:text-gray-100 leading-tight">Forgot Password</h3>
            </div> -->
            <div class="mt-12 w-full px-2 sm:px-6">
              <!-- Email -->
              <div class="flex flex-col mt-5">
                <label class="text-lg font-semibold dark:text-gray-100 leading-tight">Enter the email associated with your account</label>
                <vee-field type="email" name="email"
                  class="h-10 px-2 w-full rounded mt-2 text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 dark:border-gray-700 dark:focus:border-indigo-600 focus:outline-none focus:border focus:border-indigo-700 border-gray-300 border shadow"
                  placeholder="Enter Email" />
                <ErrorMessage class="text-red-600" name="email"/>
              </div>
            </div>
            <div class="px-2 mb-16 sm:mb-56 md:mb-16 sm:px-6">
                <button
                  class="focus:outline-none w-full bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
                  type = "submit"
                  :disabled="this.isForgetting"
                >Submit</button>
            </div>
          </vee-form>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ForgotForm',
  data() {
    return {
      schema: {
        email: 'required|min:3|max:100|email',
      },
      forgot_show_alert: false,
      forgot_alert_variant: 'bg-blue-500',
      forgot_alert_msg: 'Please wait! We are processing your reset request.',
    };
  },
  methods: {
    async forgot(values) {
      try {
        await this.$store.dispatch('forgot', { values, resetURL: `${window.location.origin}/${process.env.BASE_URL}/reset_password` });
      } catch (error) {
        this.forgot_submission = false;
        this.forgot_alert_variant = 'bg-red-500';
        this.forgot_alert_msg = 'An unexpected error occured.  Please try again later.';
      }
    },
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'isForgetError',
      'isForgetting',
      'isForgotten',
      'getForgetErrorMessage',
      // ...
    ]),
  },
  watch: {
    isForgetting() {
      // Show message
      if (this.isForgetting) {
        this.forgot_show_alert = true;
        this.forgot_alert_msg = 'Please wait! We are requesting a reset.';
      }

      // set the colors
      if (this.isForgotError) {
        this.forgot_alert_variant = 'bg-red-500';
      } else if (this.isForgotten) { this.forget_alert_variant = 'bg-green-500'; } else { this.forget_alert_variant = 'bg-blue-500'; }
    },
    isForgotten() {
      this.forgot_alert_msg = 'Instructions sent! Check your email for instructions on how to reset your password.';
      try {
        this.$store.dispatch('forgotRedirect');
      } catch (error) {
        this.forgot_alert_variant = 'bg-red-500';
        this.forgot_alert_msg = 'An unexpected error occured while trying to redirect.  Please try again later.';
      }
    },
    isForgotError() {
      this.forgot_alert_msg = this.getForgotErrorMessage;
    },
  },
};
</script>
