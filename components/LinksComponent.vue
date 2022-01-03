<template>
  <div class="prose">
    <h2
      v-for="(link, i) in links"
      :id="link.name.toLowerCase().replace(/ /g, '-')"
      :key="link + i"
      class="text-xl"
    >
      <a
        :href="link.url"
        rel="nofollow noopener noreferrer "
        target="_blank"
        class="items-center no-underline"
      >
        <icon icon="link" class="w-4 h-4 mr-2" />
        {{ link.name }}
        <span
          class="text-base text-slate-700 bg-slate-200 rounded-full py-1 px-2"
          >{{ link.tags.join(', ') }}</span
        >
        <br />
        <div class="text-base ml-8">{{ link.description }}</div>
      </a>
      <!-- <pre class="overflow-scroll dark prose min-w-[100%]">{{ link }}</pre> -->
    </h2>
  </div>
</template>

<script>
export default {
  name: 'LinksComponent',
  props: {
    links: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
}
</script>
