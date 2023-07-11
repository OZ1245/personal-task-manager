<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <sign-up v-if="isSignUp" />
  <sign-in v-else />
  <button @click="isSignUp = !isSignUp">
    {{
      isSignUp
      ? "Already have an account? Sign In"
      : "Don't have an account yet? Sign Up"
    }}
  </button>
</template>

<script setup>
import { ref } from "vue"
import SignUp from "./SignUp.vue"
import SignIn from "./SignIn.vue"

const isSignUp = ref(true);
</script>