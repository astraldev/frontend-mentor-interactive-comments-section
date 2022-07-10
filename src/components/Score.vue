<template>
  <div class="score-input">
    <button @click="this.$emit('score-changed', val + 1)">
      <Plus />
    </button>
    <div>
      {{ val }}
    </div>
    <button @click="this.$emit('score-changed', val - 1)">
      <Minus />
    </button>
  </div>
</template>

<script>
import Plus from "../icons/icon-plus.svg";
import Minus from "../icons/icon-minus.svg";

export default {
  name: "ScoreInput",
  emits: ["score-changed"],
  props: {
    value: Number,
  },
  components: { Plus, Minus },
  data() {
    return {
      val: this.$props.value || 0,
    };
  },
  watch: {
    value(val) {
      this.val = val;
    },
  },
};
</script>
