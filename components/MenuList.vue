<template>
  <ul>
    <li
      v-for="section in menu"
      v-show="section.slug !== 'README'"
      :key="section.slug"
      class="items-center text-lg bord"
      :class="
        section.depth === 0
          ? ''
          : section.depth === 1
          ? 'pl-5 border-l-2 border-slate-700'
          : section.depth === 2
          ? 'pl-4 border-l-2 border-slate-700'
          : section.depth === 3
          ? 'pl-6 border-l-2 border-slate-700'
          : section.depth === 4
          ? 'pl-8 border-l-2 border-slate-700'
          : section.depth === 5
          ? 'pl-10 border-l-2 border-slate-700'
          : ''
      "
    >
      <icon
        v-if="section.type === 'dir'"
        :ref="
          'toggle' +
          (section.path
            ? section.path.replace(/\//g, '')
            : section.dir.replace(/\//g, ''))
        "
        icon="chevron-right"
        class="cursor-pointer w-[16px] mx-1 transform transition ease-in-out duration-300"
        :class="section.depth === 0 && 'rotate-90'"
        @click="toggleDropdown(section)"
      />
      <!-- <span v-if="section.type === 'file'">-</span> -->
      <nuxt-link
        :to="
          section.type === 'dir'
            ? section.dir
            : `${section.dir}#${section.slug}`
        "
        @click.native="openDropdown(section)"
      >
        {{ slugToTitle(section.title || section.slug) }}
      </nuxt-link>
      <div
        v-if="section.children"
        :ref="
          section.path
            ? section.path.replace(/\//g, '')
            : section.dir.replace(/\//g, '')
        "
        class="transform transition duration-700"
        :class="section.depth !== 0 && 'hidden h-0'"
      >
        <MenuList :menu="section.children" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MenuList',
  props: {
    menu: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => {
    return {}
  },
  computed: {},
  methods: {
    toggleDropdown(section) {
      if (section.type === 'dir') {
        const refList = section.path
          ? section.path.replace(/\//g, '')
          : section.dir.replace(/\//g, '')
        const refToggle = 'toggle' + refList
        this.$refs[refList][0].classList.toggle('hidden')
        this.$refs[refList][0].classList.toggle('h-0')
        this.$refs[refToggle][0].classList.toggle('rotate-90')
      }
    },
    openDropdown(section) {
      if (section.type === 'dir') {
        const refList = section.path
          ? section.path.replace(/\//g, '')
          : section.dir.replace(/\//g, '')
        const refToggle = 'toggle' + refList
        this.$refs[refList][0].classList.remove('hidden')
        this.$refs[refList][0].classList.remove('h-0')
        this.$refs[refToggle][0].classList.add('rotate-90')
      }
      this.$store.dispatch('setPanelOpen', false)
    },
    slugToTitle(slug) {
      return this.$utils.slugToTitle(slug)
    },
  },
}
</script>

<style scoped>
.nuxt-link-active,
.nuxt-link-exact-active {
  @apply text-zinc-500;
}

.nuxt-link-exact-active {
  @apply border-slate-500;
}

svg ~ .nuxt-link-exact-active {
  @apply rotate-90;
}
</style>
