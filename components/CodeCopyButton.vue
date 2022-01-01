<template>
  <button
    ref="copy"
    class="absolute dark rounded-xl flex items-center justify-center p-4 border-2 text-xl w-10 h-10 -mt-14 mr-4 right-0 transform transition-all ease-in-out duration-500"
    :class="
      state === 'copied'
        ? 'text-green-300 border-green-300'
        : 'border-slate-100'
    "
  >
    <icon :icon="state === 'copied' ? 'check' : 'copy'" />
    <!-- <icon v-else icon="copy" class=""/> -->
  </button>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  name: 'CodeCopyButton',
  data() {
    return {
      state: 'init',
    }
  },
  mounted() {
    const copyCode = new Clipboard(this.$refs.copy, {
      target(trigger) {
        return trigger.previousElementSibling
      },
    })
    copyCode.on('success', (event) => {
      event.clearSelection()
      this.state = 'copied'
      window.setTimeout(() => {
        this.state = 'init'
      }, 2000)
    })
  },
}
</script>
