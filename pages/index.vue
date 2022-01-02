<template>
  <div class="light py-6">
    <!-- <pre class="overflow-scroll mr-auto dark px-4 min-w-full">{{
      $store.state.menu
    }}</pre> -->
    <SearchComponent />
    <nuxt-content
      :document="page"
      class="prose-lg prose-headings:my-4 prose-hr:border-slate-700 prose-hr:my-8 prose-headings:pt-12"
    />
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'DefaultLayout',
  middleware: 'auth',
  async asyncData({ $content, error }) {
    const page = await $content('README')
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })
    return { page }
  },
}
</script>
