<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <form @submit.prevent="updateProfile">
    <label>Id</label> {{ id }}

    <label for="email">Email</label>
    <input id="email" type="text" :value="session.user.email" disabled />

    <label for="name">Name</label>
    <input id="name" type="text" v-model="name" />

    <label for="language">Language</label>
    <input id="language" type="text" v-model="language" />

    <label>Active</label> {{ active }}

    <div>
      <input
        type="submit"
        class="button primary block"
        value="Update"
      />
    </div>

    <button @click="onSignOut">Sign Out</button>
    <button @click="onDeleteAccount">Delete account</button>
  </form>
</template>

<script setup>
import { onMounted, ref, toRefs, defineProps } from 'vue'
import { useUser } from '@/libs/user'

const $user = useUser()

const props = defineProps(['session'])
const { session } = toRefs(props)

const id = ref(null)
const name = ref('')
const language = ref('')
const active = ref(false)

onMounted(() => {
  getUserData()
})

const getUserData = () => {
  $user
    .getUser()
    .then(result => {
      id.value = result.id
      name.value = result.settings.name
      language.value = result.settings.language
      active.value = result.active
    })
}

// async function updateProfile() {
//   try {
//     const { user } = session.value

//     const updates = {
//       id: user.id,
//       name: name.value,
//     }

//     let { error } = await supabase.from('profiles').upsert(updates)

//     if (error) throw error
//   } catch (error) {
//     alert(error.message)
//   }
// }

const onSignOut = () => $user.logout()

const onDeleteAccount = () => $user.deleteUser()
</script>