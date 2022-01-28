<!-- eslint-disable max-len -->
<template>
    <section class="bg-white-200 dark:bg-gray-900 py-10 w-6/12 mx-auto">
      <div class="container mx-auto bg-white shadow rounded">
        <div class="xl:w-full border-b border-gray-300 py-5">
          <div class="px-2 flex flex-col items-center justify-center mt-8 sm:mt-0">
            <h2 class="text-4xl dark:text-gray-100 leading-tight pt-8">Change Password</h2>
          </div>
          <div class="text-white text-center font-bold p-4 mb-4"
            v-if="pwd_show_alert"
            :class="pwd_alert_variant">
            {{ pwd_alert_msg}}
          </div>
      </div>
        <div id="alert"
              class="transition duration-150 ease-in-out bg-blue-200 shadow
                     rounded-md md:flex justify-between items-center top-0 mt-4 mb-4 py-4 px-4">
          <div class="sm:flex items-center">
              <div class="flex items-end">
                  <div class="mr-2 mt-0.5 sm:mt-0 text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                          <path class="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                      </svg>
                  </div>
                  <p class="mr-2 text-base font-bold text-blue-500">Information</p>
              </div>
              <div class="h-1 w-1 bg-blue-500 rounded-full mr-2 hidden xl:block"></div>
              <p class="text-base text-blue-500">After you change your password, you will be logged out of all devices and apps until you log back in with the new one.</p>
          </div>
        </div>

        <div class="mx-auto flex justify-center md:items-center relative md:h-full">
          <!-- Reset Form -->
          <vee-form id="chgPWD" :validation-schema="schema"
            @submit="chgPWD"
            class="w-full sm:w-4/6 md:w-4/6 lg:w-8/12 xl:w-8/12 text-gray-800">
            <div class="mt-6 w-full px-2 sm:px-6">
              <!-- Current Password -->
              <div class="mb-3">
                <label class="inline-block mb-2">Current Password</label>
                <vee-field name="current_password" :bails="false" v-slot="{ field, errors }">
                  <input class="block w-full py-1.5 px-3 text-gray-800 border
                    border-gray-300 transition duration-500 focus:outline-none
                    focus:border-black rounded" type="password"
                    placeholder="Current Password" v-bind="field" />
                  <div class="text-red-600" v-for="error in errors" :key="error">
                    {{ error }}
                  </div>
                </vee-field>
              </div>
              <!-- Password -->
              <div class="mb-3">
                <label class="inline-block mb-2">New Password</label>
                <vee-field name="password" :bails="false" v-slot="{ field, errors }">
                  <input class="block w-full py-1.5 px-3 text-gray-800 border
                    border-gray-300 transition duration-500 focus:outline-none
                    focus:border-black rounded" type="password"
                    placeholder="New Password" v-bind="field" />
                  <div class="text-red-600" v-for="error in errors" :key="error">
                    {{ error }}
                  </div>
                </vee-field>
              </div>
              <!-- Confirm Password -->
              <div class="mb-3">
                <label class="inline-block mb-2">Confirm New Password</label>
                <vee-field type="password" name="confirm_password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Confirm New Password" />
                <ErrorMessage class="text-red-600" name="confirm_password" />
              </div>
            </div>
            <div class="px-2 mb-16 sm:mb-56 md:mb-16 sm:px-6">
                <button
                  class="focus:outline-none w-full bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
                  type = "submit"
                  :disabled="this.isChangingPassword"
                >Submit</button>
            </div>
          </vee-form>
        </div>
      </div>

    </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ChangePasswordForm',
  data() {
    return {
      schema: {
        current_password: 'required|min:3|max:100',
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
      },
      pwd_show_alert: false,
      pwd_alert_variant: 'bg-blue-500',
      pwd_alert_msg: 'Please wait! We are processing your reset request.',
    };
  },
  methods: {
    async chgPWD(values) {
      try {
        await this.$store.dispatch('changePassword', { values, params: this.$route.params });
      } catch (error) {
        this.pwd_submission = false;
        this.pwd_alert_variant = 'bg-red-500';
        this.pwd_alert_msg = 'An unexpected error occured.  Please try again later.';
      }
    },
  },
  computed: {
  // mix the getters into computed with object spread operator
    ...mapGetters([
      'isChgPwdError',
      'isChangingPassword',
      'isPasswordChanged',
      'getChgPwdErrorMessage',
    // ...
    ]),
  },
  watch: {
    isChangingPassword() {
      // Show message
      if (this.isChangingPassword) {
        this.pwd_show_alert = true;
        this.pwd_alert_msg = 'Please wait! We are processing the reset request.';
      }

      // set the colors
      if (this.isChgPwdError) {
        this.pwd_alert_variant = 'bg-red-500';
      } else if (this.isChangingPassword) { this.pwd_alert_variant = 'bg-green-500'; } else { this.pwd_alert_variant = 'bg-blue-500'; }
    },
    isPasswordChanged() {
      this.pwd_alert_msg = 'Success! Passwords have been reset.  Please Sign In using your new credentials.';
      try {
        this.$store.dispatch('signout', {
          router: this.$router,
          route: this.$route,
        });

        // console.log(this.$route);
        // if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      } catch (error) {
        this.pwd_alert_variant = 'bg-red-500';
        this.pwd_alert_msg = 'An unexpected error occured while trying to redirect.  Please try again later.';
      }
    },
    isChgPwdError() {
      if (this.getChgPwdErrorMessage) {
        const msgDetails = JSON.parse(this.getChgPwdErrorMessage);
        if (msgDetails?.field) {
          if (msgDetails.field === 'passwordCurrent') {
            this.pwd_alert_msg = msgDetails.errorMessage;
          }
        }
      }
      // this.pwd_alert_msg = this.getChgPwdErrorMessage;
    },
  },
};
</script>
