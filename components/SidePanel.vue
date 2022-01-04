<template>
  <div class="flex">
    <!-- mobile panel bg -->
    <div
      class="fixed lg:relative bg-slate-800 h-panel lg:!min-h-0 z-40 w-full transform transition-colors ease-in-out duration-300"
      :class="
        panelOpen ? 'w-full  bg-opacity-40' : 'bg-opacity-0 -translate-x-full'
      "
      @click="$store.dispatch('setPanelOpen', !panelOpen)"
    ></div>
    <aside
      class="h-full h-panel fixed bg-slate-800 z-40 text-zinc-100 lg:flex flex-col py-10 transition transform ease-in-out duration-300 mb-12"
      :class="!panelOpen ? '-translate-x-full lg:-translate-x-0' : ''"
    >
      <div class="overflow-scroll">
        <!-- panel menu heading -->
        <p class="mx-8 font-bold border-b-2 border-zinc-400">Sections</p>
        <!-- panel menu links -->
        <MenuList :menu="getMenu" class="w-[400px] px-8 sticky" />
        <!-- panel menu footer -->
        <div class="bg-inherit my-10 mx-8 border-t-2 border-zinc-400">
          <p>nav-footer</p>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'SidePanel',
  props: {
    // panelOpen: {
    //   type: Boolean,
    //   required: true,
    //   default: () => false,
    // },
    scrollPos: {
      type: Number,
      required: true,
      default: () => 0,
    },
  },
  data: () => {
    return {
      menu: [],
    }
  },
  computed: {
    getMenu() {
      return this.$store.getters.getMenu
    },
    panelOpen() {
      return this.$store.getters.getPanelOpen
    },
  },
}
</script>
