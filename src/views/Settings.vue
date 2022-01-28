<template>
  <div class="settings">
    <app-change-password-form></app-change-password-form>
  </div>
</template>

<script>
import AppChangePasswordForm from '@/components/settings/ChangePasswordForm.vue';
// @ is an alias to /src
// import AppChgPasswordForm from '@/components/settings/ChangePasswordForm.vue';

export default {
  name: 'Profile',
  components: {
    AppChangePasswordForm,
    // AppChgPasswordForm,
  },
};
</script>

<style>

</style>
