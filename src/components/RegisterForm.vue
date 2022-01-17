<!-- eslint-disable max-len -->
<template>
  <div class="text-white text-center font-bold p-4 mb-4"
    v-if="reg_show_alert" :class="reg_alert_variant">
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="schema"
    @submit="register">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field type="text" name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
          duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name" />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
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
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field type="checkbox" name="tos" value="1"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded inline-block" />
      <label class="inline-block">Accept terms of service</label>
      <ErrorMessage class="text-red-600 block" name="tos" />
    </div>
    <button type="submit" :disabled="this.isRegistering"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
      Submit
    </button>
  </vee-form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
        tos: 'tos',
      },
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait!  Your account is being created.',
    };
  },
  methods: {
    async register(values) {
      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.reg_in_submission = false;
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occured.  Please try again later.';
      }
    },
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'isRegistrationError',
      'isRegistering',
      'isRegistered',
      'getRegistrationErrorMessage',
      // ...
    ]),
  },
  watch: {
    isRegistering() {
      // Show message
      if (this.isRegistering) {
        this.reg_show_alert = true;
        this.reg_alert_msg = 'Please wait!  Your account is being created.';
      }

      // set the colors
      if (this.isRegistrationError) {
        this.reg_alert_variant = 'bg-red-500';
      } else if (this.isRegistered) { this.reg_alert_variant = 'bg-green-500'; } else { this.reg_alert_variant = 'bg-blue-500'; }
    },
    isRegistered() {
      this.reg_alert_msg = 'Success! Your account has been created';
      try {
        this.$store.dispatch('registerRedirect');
      } catch (error) {
        this.reg_alert_variant = 'bg-red-500';
        this.reg_alert_msg = 'An unexpected error occured while trying to redirect.  Please try again later.';
      }
    },
    isRegistrationError() {
      this.reg_alert_msg = this.getRegistrationErrorMessage;
    },
  },
};
</script>
