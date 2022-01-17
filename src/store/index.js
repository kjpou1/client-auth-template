import { createStore } from 'vuex';
import AuthService from '@/services/authService';

export default createStore({
  state: {
    authModalShow: false,
    userSignedIn: false,
    signingIn: false,
    signInError: false,
    signInErrorMessage: null,
    userRegisterd: false,
    registering: false,
    registrationError: false,
    registrationErrorMessage: null,
    signInRequestId: null,
    signInDetails: null,
    userForgotten: false,
    forgetting: false,
    forgotError: false,
    forgotErrorMessage: null,

    passwordReset: false,
    resetting: false,
    resetError: false,
    resetErrorMessage: null,

  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userSignedIn = !state.userSignedIn;
    },
    toggleSigningIn(state) {
      state.signingIn = !state.signingIn;
    },
    setSignInError: (state, payload) => {
      state.signInErrorMessage = payload;
      state.signInError = payload !== null;
    },
    setSignInRequestId: (state, payload) => {
      state.signInRequestId = payload;
    },
    setSignInDetails: (state, payload) => {
      const details = payload?.details;
      state.signInDetails = details;
    },
    toggleRegistration(state) {
      state.userRegistered = !state.userRegistered;
    },
    toggleRegistering(state) {
      state.registering = !state.registering;
    },
    setRegistrationError: (state, payload) => {
      state.registrationErrorMessage = payload;
      state.registrationError = payload !== null;
    },
    toggleForgotten(state) {
      state.userForgotten = !state.userForgotten;
    },
    toggleForgetting(state) {
      state.forgetting = !state.forgetting;
    },
    setForgotError: (state, payload) => {
      state.forgotErrorMessage = payload;
      state.forgotError = payload !== null;
    },
    toggleResetPassword(state) {
      state.resetPassword = !state.resetPassword;
    },
    toggleResetting(state) {
      state.resetting = !state.resetting;
    },
    setResetError: (state, payload) => {
      state.resetErrorMessage = payload;
      state.resetError = payload !== null;
    },

  },
  getters: {
    authModalShow: (state) => state.authModalShow,
    isSignedIn: (state) => state.userSignedIn,
    isSignInError: (state) => state.signInError,
    isSigningIn: (state) => state.signingIn,
    getSignInErrorMessage: (state) => state.signInErrorMessage,

    isRegistrationError: (state) => state.registrationError,
    isRegistered: (state) => state.userRegistered,
    isRegistering: (state) => state.registering,
    getRegistrationErrorMessage: (state) => state.registrationErrorMessage,

    isForgotError: (state) => state.forgotError,
    isForgotten: (state) => state.userForgotten,
    isForgetting: (state) => state.forgetting,
    getForgotErrorMessage: (state) => state.forgotErrorMessage,

    isResetError: (state) => state.resetError,
    isReset: (state) => state.resetPassword,
    isResetting: (state) => state.resetting,
    getResetErrorMessage: (state) => state.resetErrorMessage,
  },
  actions: {
    async init_login({ commit }) {
      const user = await AuthService.getAuthToken();
      if (user) {
        commit('toggleAuth');
      }
    },
    registerRedirect() {
      console.log('Nothing to be done here');
    },
    async register({ commit }, payload) {
      commit('setRegistrationError', null);
      commit('toggleRegistering');

      // Call service function to process register request
      const registerResponse = await AuthService.register(payload);

      if (registerResponse?.status === 200) {
        commit('toggleRegistration');
      } else {
        commit('setRegistrationError', registerResponse?.message ?? 'Unknown error.');
      }
      commit('toggleRegistering');
    },
    async signIn({ commit }, payload) {
      commit('setSignInError', null);
      commit('toggleSigningIn');

      // Call service function to process sign in request
      const signInResponse = await AuthService.signIn(payload);
      console.log(signInResponse);
      if (signInResponse?.status === 200) {
        commit('setSignInDetails', signInResponse);
        // This is if we are going to handle signin from auth server redirect
        commit('setSignInRequestId', signInResponse.details?.jti);
        commit('toggleAuth');
      } else {
        commit('setSignInError', signInResponse?.message ?? 'Unknown error.');
      }
      commit('toggleSigningIn');
    },
    async signout({ commit }) {
      await AuthService.signout();

      commit('toggleAuth');
    },
    // Here is where we will take care of redirecting after signing in
    // Could be to just go to home page
    signInRedirect() {
      window.location.reload();
    },
    async forgot({ commit }, payload) {
      commit('setForgotError', null);
      commit('toggleForgetting');

      // Call service function to process forgot request
      const forgotResponse = await AuthService.forgot(payload);
      if (forgotResponse?.status === 200) {
        commit('toggleForgotten');
      } else {
        commit('setForgottenError', forgotResponse?.message ?? 'Unknown error.');
      }
      commit('toggleForgetting');
    },
    // Here is where we will take care of redirecting after forgot password request
    // Could be to just go to home page
    forgotRedirect() {
      // window.location.reload();
    },

    async resetPassword({ commit }, payload) {
      commit('setResetError', null);
      commit('toggleResetting');

      console.log('reset');
      // Call service function to process the reset request
      const resetResponse = await AuthService.resetPassword(payload);
      if (resetResponse?.status === 200) {
        commit('toggleResetPassword');
      } else {
        commit('setResetError', resetResponse?.message ?? 'Unknown error.');
      }
      commit('toggleResetting');
    },

    // Here is where we will take care of redirecting after reset password request
    // Could be to just go to home page
    resetPasswordRedirect() {
      // window.location.reload();
    },

  },
  modules: {
  },
});
