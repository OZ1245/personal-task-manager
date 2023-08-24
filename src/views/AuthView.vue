<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="auth">
    <div class="auth__wrapper">
      <p class="auth__text">
        <template v-if="isSignUp">
          Already have an account? 
          <button 
            class="auth__link"
            @click="onChangeForm"
          >
            Sign In
          </button>
        </template>

        <template v-else>
          Don't have an account yet? 
          <button 
            class="auth__link"
            @click="onChangeForm"
          >
            Sign Up
          </button>
        </template>
      </p>

      <TheAlert 
        v-if="errorMessage"
        danger
      >
        {{ errorMessage }}
      </TheAlert>

      <form class="auth__form">
        <SignUp 
          v-if="isSignUp" 
          :loading="loading"
          @form-submit="onProccessForm"
        />
          
        <SignIn 
          v-else 
          :loading="loading"
          @form-submit="onProccessForm"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { useRouter } from "vue-router"
import { useUser } from '@/libs/user'

import SignUp from "@/components/auth/SignUp.vue"
import SignIn from "@/components/auth/SignIn.vue"
import TheAlert from "@/components/UI/TheAlert.vue"

const $router = useRouter()
const $user = useUser()

const isSignUp = ref(true)
const errorMessage = ref(null)
const loading = ref(false)

const onChangeForm = () => {
  isSignUp.value = !isSignUp.value
}

const onProccessForm = (data) => {
  if (isSignUp.value) {
    onSignUp(data)
  } else {
    onLogin(data)
  }
}

const onSignUp = ({ email, password }) => {
  errorMessage.value = null
  loading.value = true

  $user
    .createUser({
      email: email.value,
      password: password.value
    })
    .then(result => {
      if (result.error) {
        errorMessage.value = result.message
      } else {
        $router.push({
          name: 'Home'
        })
      }

      loading.value = false
    })
}

const onLogin = ({ email, password }) => {
  errorMessage.value = null
  loading.value = true

  $user
    .login({
      email: email.value,
      password: password.value
    })
    .then(result => {
      if (result.error) {
        errorMessage.value = result.message
      } else {
        $router.push({
          name: 'Home'
        })
      }

      loading.value = false
    })
}

watch(isSignUp, () => {
  errorMessage.value = null
})
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
}

.auth__wrapper {
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding-block) * 2);

  width: 100%;
  max-width: 360px;
}

.auth__text {
  font-size: var(--font-size-m);
  text-align: center;

  margin: 0;
}
.auth__link {
  display: inline;

  font-size: var(--font-size-m);
  color: var(--accent);
  text-decoration: underline;

  background: none;
  border: none;
  padding: 0;

  cursor: pointer;
}
.auth__form {
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding-block) * 2);
}
</style>