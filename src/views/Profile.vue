<template>
  <div class="profile">
    <app-profile-form> </app-profile-form>
  </div>
</template>

<script>
// @ is an alias to /src
import AppProfileForm from '@/components/settings/ManageProfileForm.vue';

export default {
  name: 'Profile',
  components: {
    AppProfileForm,
  },
};
</script>

<style>

</style>
