<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <!-- header -->
    <header
      class="fixed top-0 flex flex-col items-center justify-center w-full bg-slate-300 z-50 h-10"
    >
      <div
        class="flex justify-between px-8 w-full max-w-[1600px] text-zinc-300 bg-slate-600 py-1 space-x-4"
      >
        <!-- logo/brand -->
        <div class="flex items-center">
          <!-- hamburger only below lg -->
          <button
            class="block lg:hidden tham tham-e-arrow tham-w-8"
            :class="panelOpen ? 'tham-active' : ''"
            @click="$store.dispatch('setPanelOpen', !panelOpen)"
          >
            <div class="tham-box">
              <div class="tham-inner" />
            </div>
          </button>
          <nuxt-link to="/" class="ml-4 lg:ml-0 font-heading font-bold text-2xl"
            >LystDocs</nuxt-link
          >
        </div>

        <!-- search -->
        <!-- <div class="max-w-md">
        <SearchComponent />
        </div> -->

        <!-- user -->
        <button class="mr-1" @click="logout">
          <icon class="mr-1" icon="sign-out-alt" />Logout
        </button>
      </div>
      <hr />
    </header>

    <!-- page wrapper side panel and content -->
    <div class="pt-10 w-full bg-slate-300 items-center justify-center mx-auto">
      <div class="flex w-full mx-auto justify-center">
        <!-- side panel -->
        <SidePanel :panel-open="panelOpen" :scroll-pos="scrollPos" />
        <!-- @togglePanel="panelOpen = !panelOpen" -->
        <div
          class="p-8 lg:ml-[400px] max-w-[1200px] bg-slate-200 flex-grow w-full h-body"
        >
          <Nuxt keep-alive :keep-alive-props="{ exclude: ['GistComponent'] }" />
        </div>
      </div>
    </div>

    <!-- footer -->
    <footer
      class="lg:z-50 flex flex-col flex-grow w-full bg-slate-300 items-center justify-center mx-auto"
    >
      <div
        class="px-8 w-full max-w-[1600px] dark bg-slate-600 flex mx-auto items-center justify-center font-semibold text-lg"
      >
        &copy; Copyright {{ new Date().getFullYear() }} Catalyst
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data: () => {
    return {
      // menu: [],
      panelOpen: false,
      scrollPos: 0,
    }
  },
  computed: {},
  beforeMount() {
    // eslint-disable-next-line
    if (process.client) {
      window.addEventListener('scroll', this.setScrollPos)
    }
  },
  beforeDestroy() {
    // eslint-disable-next-line
    if (process.client) {
      window.removeEventListener('scroll', this.setScrollPos)
    }
  },
  methods: {
    logout() {
      this.$strapi.logout()
      this.$router.push('/login')
    },
    setScrollPos() {
      // eslint-disable-next-line
      if (process.client) {
        this.scrollPos = window.scrollY
      }
    },
  },
}
</script>

<style>
.h-body {
  @apply min-h-[calc(100vh-64px)];
}

.h-panel {
  @apply min-h-[calc(100vh-40px)];
}
</style>
