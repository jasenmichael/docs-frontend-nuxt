<template>
  <div v-if="isMounted">
    <h6 class="pt-4">
      <slot>
        <!-- video label -->
      </slot>
    </h6>
    <!-- video element -->
    <video
      v-if="src && type == 'video'"
      controls
      class="max-w-md mb-1 mt-2 aspect-video w-full"
    >
      <source :src="src" type="video/mp4" />
      Oops. HTML 5 video not supported.
    </video>

    <!-- iframe element -->
    <div v-else-if="src && type === 'iframe'" class="max-w-md">
      <iframe :src="src" frameborder="0" class="aspect-video w-full"> </iframe>
    </div>
    <a
      class="underline"
      :href="url"
      rel="noreferrer noopener"
      target="_blank"
      >{{ url }}</a
    >
  </div>
</template>
<!-- https://drive.google.com/file/d/1VmduZnEJoIgqFUH8S5-uuOkFkEi6LpnD/view -->

<script>
export default {
  name: 'VideoComponent',
  props: {
    url: {
      type: String,
      required: true,
      default: () => '',
    },
  },
  data: () => {
    return {
      src: null,
      type: 'video',
      isMounted: 'false',
    }
  },
  mounted() {
    //   https://drive.google.com/uc?export=download&id=1VmduZnEJoIgqFUH8S5-uuOkFkEi6LpnD
    const driveSrc = this.url.includes('https://drive.google.com')
      ? this.url
          .replace(
            'https://drive.google.com/file/d/',
            'https://drive.google.com/uc?export=download&id='
          )
          .replace('/view', '')
      : null
    const youtubeSrc = this.url.includes('https://www.youtube.com')
      ? this.url
          .replace(
            'https://www.youtube.com/watch?v=',
            'https://www.youtube.com/embed/'
          )
          .replace('/view', '')
      : null
    const dropBoxSrc = null

    if (youtubeSrc) {
      this.type = 'iframe'
    }
    this.src = driveSrc || youtubeSrc || dropBoxSrc || this.url
    // this.src = driveSrc
    this.isMounted = true
  },
}
</script>
