<template>
  <div>
    <h1 class="text-3xl">DOCS</h1>
    <button @click="logout()">log out</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware: 'auth',
  methods: {
    logout() {
      this.$strapi.logout()
      this.$router.push('/login')
    },
  },
}
</script>
