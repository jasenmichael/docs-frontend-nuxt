<template>
  <div
    class="prose-lg prose-headings:my-4 prose-hr:border-slate-700 prose-hr:my-8 prose-headings:pt-12 min-w-full"
  >
    <h2 class="not-prose !-mt-16">{{ $utils.slugToTitle(contentPath) }}</h2>
    <div
      v-if="pageSections.length"
      class="mt-4 border-t-2 border-slate-300 w-64 ml-9"
    ></div>
    <!-- files table of contents -->
    <ol v-if="pageSections.length">
      <li
        v-for="section in pageSections"
        :key="section.slug"
        class="list-decimal list-inside text-lg"
      >
        <nuxt-link class="text-xl -mt-4" :to="`#${section.slug}`">{{
          section.title
        }}</nuxt-link>
        <ul class="flex flex-col my-0">
          <li v-for="toc in section.toc" :key="toc.id" class="list-disc my-0">
            <nuxt-link :to="`#${toc.id}`" class="">
              {{ toc.text }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ol>

    <div
      v-if="pageSubFolders.length"
      class="mt-4 border-t-2 border-slate-300 w-64 ml-9"
    ></div>

    <!-- sub directories -->
    <ul v-if="pageSubFolders.length" class="pt-2">
      <li v-for="folder in pageSubFolders" :key="folder.slug" class="my-0">
        <nuxt-link :to="`${folder.dir}`" class="text-xl">
          {{ $utils.slugToTitle(folder.slug) }}
        </nuxt-link>
      </li>
    </ul>

    <div v-if="!pageSections.length && !pageSubFolders.length" class="">
      no content found...
    </div>

    <!-- <p>contentPath: {{ contentPath }}</p>
    <pre>pageSubFolders: {{ pageSubFolders }}</pre> -->

    <!-- all sections with id -->
    <section
      v-for="section in pageSections"
      :id="section.slug"
      :key="section.slug"
      class="mt-8 shadow-md"
    >
      <div class="bg-slate-100 rounded-md p-2 w-full">
        <div
          class="pt-8 text-3xl lg:text-4xl xl:text-5xl underline underline-offset-4 decoration-slate-300"
        >
          {{ section.title }}
        </div>
        <nuxt-content class="scroll-to w-full" :document="section" />
      </div>
    </section>

    <!-- <pre
      class="prose overflow-scroll py-6 mr-auto dark px-4 min-w-full max-w-[calc(100vw-428px)]"
      >{{ $store.state.menu }}</pre
    > -->
  </div>
</template>

<script>
export default {
  name: 'SectionIndex',
  layout: 'DefaultLayout',
  async asyncData({ $content, params, error, store }) {
    const contentPath = params.pathMatch.replace(/\/$/, '')

    const flatMenu = []
    function flattenMenu(menu) {
      menu.forEach((item) => {
        if (item.children && item.type === 'dir') {
          flattenMenu(item.children)
          delete item.children
          flatMenu.push(item)
        }
      })
    }
    flattenMenu(JSON.parse(JSON.stringify(store.getters.getMenu)))

    const pageSubFolders = flatMenu.filter((item) => {
      // console.log('1 path depth', contentPath.split('/').length)
      // console.log('3 item.depth', item.depth)
      // console.log('2 contentPath', contentPath)
      // console.log('4 item.dir', item.dir)
      return (
        item.depth === contentPath.split('/').length &&
        item.dir.includes(contentPath)
      )
    })

    // console.log(pageSubFolders)

    const pageSections = await $content(contentPath)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      pageSections,
      contentPath,
      pageSubFolders,
    }
  },

  beforeMount() {
    // eslint-disable-next-line
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeDestroy() {
    // eslint-disable-next-line
    if (process.client) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY === 0) {
        this.$router.push(this.$nuxt.$route.path)
      }
    },
  },
}
</script>
