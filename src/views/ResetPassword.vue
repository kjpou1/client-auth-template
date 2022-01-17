<template>
  <div class="resetPassword">
    <app-reset-password-form> </app-reset-password-form>
  </div>
</template>

<script>
// @ is an alias to /src
import AppResetPasswordForm from '@/components/ResetPasswordForm.vue';

export default {
  name: 'Forgot',
  components: {
    AppResetPasswordForm,
  },
};
</script>

<style>

</style>
