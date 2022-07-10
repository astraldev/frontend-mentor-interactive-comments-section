<template>
  <div class="p-4 md:w-2/3 lg:w-[55%] xl:1/3 mx-auto">
    <ChatComponent
      v-for="(comment, index) in comments"
      :time="comment.createdAt"
      :isReply="comment.isReply"
      :isReplying="comment.isReplying"
      :user="comment.user"
      :score="comment.score"
      :content="comment.content"
      :current-user="currentUser.username"
      :repliedTo="comment.repliedTo"
      :key="comment.id"
      :id="index"
      @replied="onReply"
      @score-changed="onScoreChanged"
      @delete="onDelete"
      @updated="onUpdated"
    />
    <div
      class="bg-white mt-4 items-start flex-wrap md:flex-nowrap flex flex-col md:flex-row p-5 gap-x-6 gap-y-4 rounded-lg chat-shadow"
    >
      <div
        class="h-10 w-10 hidden md:block rounded-full overflow-hidden object-cover"
      >
        <img :src="currentUser.image" :alt="currentUser.username" />
      </div>
      <textarea v-model="userComment" @keyup.enter.prevent="newComment" autofocus></textarea>
      <div class="flex w-full md:w-auto justify-between">
        <div
          class="h-10 block md:hidden w-10 rounded-full overflow-hidden object-cover"
        >
          <img :src="currentUser.image" :alt="currentUser.username" />
        </div>
        <button
          @click="newComment"
          class="px-5 py-2 rounded-md bg-moderate-blue text-white hover:bg-light-grayish-blue uppercase"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import json from "../data.json";
import parseComments, { getUser, commentTemplate, prepareForWrite } from "./utils/parse-json";
import { parseDate, jsonFilter } from "./utils/util.js";
import ChatComponent from "./components/ChatComponent.vue";

export default {
  name: "ChatApp",
  components: {
    ChatComponent,
  },
  methods: {
    _addComment(i, comment) {
      let newComments = [...this.comments]
      newComments.splice(comment.id, 0, comment)
      return newComments;
    },
    _updateComment(index, comment) {
      let newComments = [...this.comments];
      newComments[index] = comment;

      return newComments;
    },
    _deleteComment(i) {
      let newComments = [].concat(this.comments);
      newComments.splice(i, 1);
      return newComments;
    },
    _closeOtherReplies() {
      let tempComments = this.comments;
      tempComments.forEach((comment) => {
        if (comment.isReplying) {
          this.comments = this._deleteComment(comment.id);
        }
      });
    },
    onReply(index) {
      let template = {...commentTemplate};
      /** Edit Comment Template */
      template.user = this.currentUser;
      template.createdAt = parseDate(new Date());
      template.isReply = true;
      template.id = index + 1;
      let user = this.comments[index].user;
      template.repliedTo = user.username;
      template.content = `@${template.repliedTo} `;
      template.isReplying = true;

      if (this.comments[index].isReply){
        this.comments[this.comments[index].repliedToId].replies.push(index + 1);
      }else
        this.comments[index].replies.push(template.id)
      this._closeOtherReplies();
      
      this.comments = this._addComment(index, template);
      this.saveComments()
    },
    onScoreChanged(score, index) {
      let comment = this.comments[index];
      comment.score = score;
      this.comments = this._updateComment(index, comment);
      this.saveComments()
    },
    onDelete(index) {
      if (this.comments[index].user.username == this.currentUser.username)
        this.comments = this._deleteComment(index);
      this.saveComments()
    },
    newComment() {
      if (!this.userComment) return;
      let template = commentTemplate;
      let index = this.comments.length;
      /** Edit Comment Template */
      template.user = this.currentUser;
      template.createdAt = parseDate(new Date());
      template.id = index;
      template.content = this.userComment;

      this.comments = this._addComment(index, template);
      this.userComment = "";
      this.saveComments()
    },
    onUpdated(index, content) {
      let comment = this.comments[index];
      if (comment.isReplying){
        content = content.replace(`@${this.comments[index].repliedTo}`, "");
        comment.isReplying = false;
      }
      comment.content = content;

      this.comments = this._updateComment(index, comment)
      this.saveComments()
    },
    saveComments(){
      let results = prepareForWrite(this.comments, this.currentUser);
      results = JSON.stringify(results);
      window.localStorage.setItem("comment-data", results);
    }
  },
  data() {
    let jsonData;

    if (!json) {
      jsonData = [];
    } else {
      jsonData = parseComments(json);
    }

    return {
      currentUser: getUser(json),
      comments: jsonFilter(jsonData),
      userComment: "",
    };
  },
  beforeMount() {
    let cm_d = JSON.parse(window.localStorage.getItem("comment-data"));
    let cmt = jsonFilter(parseComments(cm_d))
    if (cm_d && cmt.length > 0) {
      this.comments = cmt;
    }
  },
};
</script>
