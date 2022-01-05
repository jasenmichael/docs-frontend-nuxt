<template>
  <div class="nuxt-content mr-4 max-w-full lg:max-w-[500px] xl:max-w-full">
    <a
      v-if="gist"
      class="rounded-md bg-slate-200 m-2"
      :href="gist.html_url"
      rel="noreferrer noopener"
      target="_blank"
    >
      <icon :icon="['fab', 'github']" />
      <span class="font-bold">GIST</span>
      <span class="underline text-slate-500">{{ gist.description }}</span>
      <icon icon="link" />
    </a>
    <div v-for="(file, i) in gistFiles" :key="i" class="">
      <div class="nuxt-content-highlight w-full">
        <span class="filename h-9">
          <icon :icon="['fab', 'github']" />
          <a
            :href="`${gist.html_url}#file-${file.filename.replace('.', '-')}`"
            target="_blank"
            class="!pl-0"
          >
            {{ file.filename }}
            <icon icon="link" />
          </a>
        </span>
        <!-- eslint-disable-next-line -->
        <div v-html="file.body"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GistComponent',
  props: {
    url: {
      type: String,
      required: true,
      default: () => '',
    },
  },
  data: () => {
    return {
      gistFiles: [],
      gist: null,
    }
  },
  fetch() {
    this.getGist()
  },
  fetchOnServer: false,
  mounted() {
    setTimeout(() => {
      this.fetch()
    }, 400)
  },
  methods: {
    async getGist() {
      // `https://gist.github.com/jasenmichael/${this.url}`
      const gistUrl = this.url.includes('https://gist.github.com')
        ? 'https://api.github.com/gists/' +
          this.url.substring(this.url.lastIndexOf('/') + 1)
        : null

      const headers = this.$config.ghToken
        ? {
            Authorization: `Bearer ${this.$config.ghToken}`,
            'Content-Type': 'application/json',
          }
        : {
            'Content-Type': 'application/json',
          }

      if (gistUrl) {
        const gist = await this.$axios.$get(gistUrl, { headers })
        this.gist = gist
        Object.keys(gist.files).forEach((file) => {
          const gistFile = gist.files[file]
          const language = gistFile.language.toLowerCase()
          let ext = gistFile.filename.split('.').pop()
          if (ext === 'sh') {
            ext = 'js' + '\r\n'
          }
          const content = `\`\`\`${ext}${gistFile.content}\r\n\`\`\``
          delete gistFile.content
          this.gistFiles.push({
            ...gistFile,
            slug: gistFile.filename,
            // description: 'example already....',
            title: gistFile.filename,
            // ext,
            language,
            body: this.$md.render(content),
          })
        })
      }
    },
  },
}
</script>
