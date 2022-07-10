<template>
  <div :class="'chat-container my-2 ' + (isReply ? 'reply' : '')">
    <div class="chat-component replying" v-if="isReplying">
      <div class="flex pb-2 items-start justify-spread space-x-2">
        <div class="h-9 w-9 flex-shrink-0 rounded-full overflow-hidden object-cover">
          <img :src="user.image" alt="" class="h-full w-full" />
        </div>
        <textarea class="h-16" autofocus v-model="reply" @keyup.enter="this.$emit('updated', id, reply)"></textarea>
        <button 
          @click="this.$emit('updated', id, reply)"
          class="px-4 py-2 rounded-md bg-moderate-blue text-white hover:bg-light-grayish-blue"
        >
          Reply
        </button>
      </div>
    </div>
    <div class="chat-component" v-else>
      <div>
        <ScoreInput :value="score" @score-changed="updateScore" />
        <ChatOptions
          :show="currentUser == user.username"
          class="md:hidden"
          @reply="onReply"
          @edit="onEdit"
          @delete="onDelete"
        />
      </div>
      <div class="flex flex-col w-full">
        <div class="flex items-center justify-between">
          <div class="flex pb-2 items-center justify-center space-x-2">
            <div class="h-9 w-9 flex-shrink-0 rounded-full overflow-hidden object-cover">
              <img :src="user.image" alt="" class="h-full w-full" />
            </div>
            <span class="font-medium text-dark-blue text-sm lowercase">
              {{ user.username }}
            </span>
            <span
              class="font-bold text-sm text-white bg-moderate-blue rounded-sm px-1.5"
              v-if="currentUser == user.username"
            >
              you
            </span>
            <span class="text-greyish-blue">{{ time }}</span>
          </div>
          <ChatOptions
            :show="currentUser == user.username"
            class="hidden md:flex"
            @reply="onReply"
            @edit="onEdit"
            @delete="onDelete"
          />
        </div>
        <p class="text-greyish-blue" v-if="!editing">
          <span
            class="font-medium cursor-pointer text-moderate-blue"
            v-if="repliedTo"
          >
            {{ "@" + repliedTo }}
          </span>
          {{ content }}
        </p>
        <textarea
          @keyup.esc="editing = false"
          v-model="editedContent"
          @keyup.enter="updateContent"
          autofocus
          v-else
        ></textarea>
        <button
          @click="updateContent"
          class="bg-moderate-blue rounded-md ml-auto mt-3 py-2 px-3 text-white uppercase font-medium"
          v-if="currentUser == user.username && editing"
        >
          Update
        </button>
      </div>
    </div>
    <DeletePopup
      :show="showPopup"
      v-if="currentUser == user.username"
      @cancel="showPopup = false"
      @proceed="
        this.$emit('delete', id);
        showPopup = false;
      "
    />
  </div>
</template>

<script>
import ScoreInput from "./Score.vue";
import ChatOptions from "./ChatOptions.vue";
import DeletePopup from "./DeletePopup.vue";

export default {
  emits: ["score-changed", "replied", "delete", "updated"],
  props: {
    repliedTo: {
      type: String,
      default: "",
    },
    isReplying: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
    currentUser: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      min: 0,
    },
    user: {
      type: Object,
      validator: (obj) => {
        if (!(obj["image"] && obj["username"])) return false;
        else return true;
      },
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    isReply: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reply: this.isReplying ? this.content : '',
      editing: false,
      editedContent: `@${this.repliedTo} ${this.content}`,
      showPopup: false,
    };
  },
  methods: {
    updateScore(score) {
      if (this.currentUser.username != this.user.username)
        this.$emit("score-changed", score, this.id);
    },
    onDelete() {
      this.showPopup = true;
    },
    onEdit() {
      this.editing = true;
    },
    onReply() {
      this.$emit("replied", this.id);
    },
    updateContent(){
      this.editing = false;
      this.$emit('updated', this.id, this.editedContent);
    },
  },
  watch: {
    isReplying(val){
      if (val) this.reply = this.content
    }
  },
  components: {
    ScoreInput,
    ChatOptions,
    DeletePopup,
  },
};
</script>
