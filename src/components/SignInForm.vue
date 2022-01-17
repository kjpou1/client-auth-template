<!-- eslint-disable max-len -->
<template>
  <div class="text-white text-center font-bold p-4 mb-4" v-if="signin_show_alert"
    :class="signin_alert_variant">
    {{ signin_alert_msg }}
  </div>
  <vee-form :validation-schema="signInSchema"
    @submit="signIn">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field type="email" name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email" />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field type="password" name="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password" />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <div class="pb-6 w-full flex justify-between px-2 sm:px-6">
        <div class="flex items-center">
            <input id="rememberme" name="rememberme" class="w-3 h-3 mr-2 bg-white dark:bg-gray-800" type="checkbox" />
            <label for="rememberme" class="text-xs dark:text-gray-100">Remember Me</label>
        </div>
        <a class="text-xs text-indigo-600" href="forgot">Forgot Password?</a>
    </div>

    <button type="submit" :disabled="this.isSigningIn"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SignInForm',
  data() {
    return {
      signInSchema: {
        email: 'required|email',
        password: 'required|min:3|max:32',
      },
      signin_show_alert: false,
      signin_alert_variant: 'bg-blue-500',
      signin_alert_msg: 'Please wait! We are logging you in.',
    };
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'isSignInError',
      'isSigningIn',
      'isSignedIn',
      'getSignInErrorMessage',
      // ...
    ]),
  },
  methods: {
    async signIn(values) {
      try {
        await this.$store.dispatch('signIn', values);
      } catch (error) {
        this.signin_alert_variant = 'bg-red-500';
        this.signin_alert_msg = 'An unexpected error occured.  Please try again later.';
      }
      //
    },
    forgot() {
      this.$router.push('./forgot');
    },

  },
  watch: {
    isSigningIn() {
      // Show message
      if (this.isSigningIn) {
        this.signin_show_alert = true;
        this.signin_alert_msg = 'Please wait! We are signing you in.';
      }

      // set the colors
      if (this.isSignInError) {
        this.signin_alert_variant = 'bg-red-500';
      } else if (this.isSignedIn) { this.signin_alert_variant = 'bg-green-500'; } else { this.signin_alert_variant = 'bg-blue-500'; }
    },
    isSignedIn() {
      if (this.$store.state.authModalShow) {
        this.signin_alert_msg = 'Success! You are now signed in.';
        try {
          this.$store.dispatch('signInRedirect', {
            router: this.$router,
            route: this.$route,
          });
        } catch (error) {
          this.reg_alert_variant = 'bg-red-500';
          this.reg_alert_msg = 'An unexpected error occured while trying to redirect.  Please try again later.';
        }
      }
    },
    isSignInError() {
      this.signin_alert_msg = this.getSignInErrorMessage;
    },
  },
};
</script>
