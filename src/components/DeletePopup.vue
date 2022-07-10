<template>
  <div
    class="w-screen h-screen bg-black/40 fixed inset-0 grid place-items-center"
    v-if="show"
  >
    <div
      class="w-[400px] p-8 bg-white space-y-4 flex flex-shrink-0 flex-col rounded-md"
    >
      <h1 class="font-medium text-2xl text-dark-blue">Delete comment</h1>
      <p class="text-greyish-blue font-medium">
        Are you sure you want to delete this comment? This will remove the
        comment and can not be undone
      </p>
      <div class="flex space-x-4 items-center">
        <button
          @click="this.$emit('cancel')"
          class="px-4 w-1/2 py-3 uppercase text-white font-medium rounded-md bg-greyish-blue"
        >
          No, Cancel
        </button>
        <button
          @click="this.$emit('proceed')"
          class="px-4 w-1/2 py-3 uppercase text-white font-medium rounded-md bg-soft-red"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DeletePopup",
  emits: ["proceed", "cancel"],
  props: ["show"],
};
</script>
