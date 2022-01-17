<template>
  <div class="forgot">
    <app-forgot-form> </app-forgot-form>
  </div>
</template>

<script>
// @ is an alias to /src
import AppForgotForm from '@/components/ForgotForm.vue';

export default {
  name: 'Forgot',
  components: {
    AppForgotForm,
  },
};
</script>

<style>

</style>
