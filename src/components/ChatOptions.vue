<template>
  <div class="flex items-center justify-center">
    <button
      v-if="show"
      @click="this.$emit('delete')"
      class="px-2 py-1 flex items-center font-medium space-x-2 text-soft-red hover:text-pale-red"
    >
      <DeleteIcon class="fill-current" />
      <span>Delete</span>
    </button>
    <button
      v-if="show"
      @click="this.$emit('edit')"
      class="px-2 py-1 flex items-center font-medium space-x-2 text-moderate-blue hover:text-greyish-blue"
    >
      <EditIcon class="fill-current" />
      <span>Edit</span>
    </button>
    <button
      class="px-2 py-1 flex items-center font-medium space-x-2 text-moderate-blue hover:text-greyish-blue"
      @click="this.$emit('reply')"
      v-else
    >
      <ReplyIcon class="fill-current" />
      <span>Reply</span>
    </button>
  </div>
</template>

<script>
import ReplyIcon from "../icons/icon-reply.svg";
import EditIcon from "../icons/icon-edit.svg";
import DeleteIcon from "../icons/icon-delete.svg";

export default {
  props: ["show"],
  emits: ["delete", "edit", "reply"],
  components: {
    ReplyIcon,
    EditIcon,
    DeleteIcon,
  },
};
</script>
