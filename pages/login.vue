<template>
  <div
    class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0"
  >
    <div class="bg-white overflow-hidden shadow sm:rounded-lg p-6">
      <h2 class="text-center uppercase text-lg">Login</h2>
      <div class="px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div class="mb-4">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="username"
          >
            Username
          </label>
          <input
            id="username"
            v-model="identifier"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-500 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-500 mb-3"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
            type="button"
            @click="login()"
          >
            Sign In
          </button>
        </div>
        <p v-if="$strapi.user">Logged in</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuxtTutorial',
  data: () => {
    return {
      identifier: '',
      password: '',
      token: null,
      message: '',
    }
  },
  mounted() {
    if (this.$strapi.user) {
      this.$router.push('/')
    }
  },
  methods: {
    async login() {
      this.message = await this.$strapi.login({
        identifier: this.identifier,
        password: this.password,
      })
      if (this.$strapi.user) {
        this.$router.push('/')
      }
    },
  },
}
</script>
