<template>
  <div id="body">
    <div class="container">
      <div class="day">
        <h4>Today</h4>
        <p></p>
      </div>
      <div class="items">
        <div
          :class="[item.todo.state ? 'item-check' : 'item-notcheck', 'item']"
          v-for="item in list"
          :key="item.tId"
        >
          <input
            :id="['item' + item.tId]"
            type="checkbox"
            v-model="item.todo.state"
            @click="checkItem(item.todo.state,item.tId)"
          />
          <label :for="['item' + item.tId]">{{ item.todo.content }}</label>
          <van-button
            class="delete-btn"
            icon="delete-o"
            type="primary"
            size="small"
            round
            @click="deleteItem(item.tId)"
          />
        </div>

        <h2 class="done" aria-hidden="true">已完成</h2>
        <h2 class="undone" aria-hidden="true">侍辦</h2>
      </div>
      <div class="createItem">
        <van-button
          class="add-btn"
          icon="plus"
          round
          size="small"
          type="primary"
          @click="createItem"
        />
        <div>
          <input type="text" v-model.trim="createItemContent" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      createItemContent: "",
    };
  },
  computed:{
    list(){
      return this.$store.getters.list() || []
    },
  },
  methods: {
    createItem() {
      let content = this.createItemContent;
      if(content=='')return;
      this.$store.dispatch("create_todo",{todo:{content,state:false}});
      this.createItemContent = ''
    },
    deleteItem(index) {
      this.$store.dispatch("delete_todo",{tId:index});
    },
    checkItem(done,index){
      let state_ = !done;
      this.$store.dispatch("check_todo",{tId:index,state:state_});
    },

  },
  mounted() {
    this.$store.dispatch("read_todo");
  },


};
</script>
<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

#body {
  color: #435757;
  font: 500 1.2em/1.2 "Roboto", sans-serif;
  width: 100%;
  background-color: #fff;
  margin-top: 100px;
}

.container {
  user-select: none;
}

h1 {
  margin: 0;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  font-size: 1.8em;
  text-align: center;
}

.items {
  display: flex;
  flex-direction: column;
  padding: 20px;
  counter-reset: done-items undone-items;
}
.item {
  position: relative;
}
.delete-btn {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  background-color: #ee1e0b;
  border: #db4c3f solid 1px;
  animation: undone 0.5s;
}
.add-btn {
  margin-right: 15px;
  background-color: #ee1e0b;
  border: #db4c3f solid 1px;
}
h2 {
  position: relative;
  margin: 0;
  padding: 10px 0;
  font-size: 1.2em;
  text-align: start;
}

h2::before {
  content: "";
  display: block;
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: -20px;
  width: 5px;
  background-color: #435757;
}

h2::after {
  display: block;
  float: right;
  font-weight: normal;
}

.done {
  order: 1;
}

.done::after {
  content: " (" counter(done-items) ")";
}

.undone {
  order: 3;
}

.undone::after {
  content: " (" counter(undone-items) ")";
}

.item-notcheck {
  order: 4;
}
input {
  display: block;
  height: 53px;
  margin: 0 0 -53px -9999px;
  order: 4;
  outline: none;
  counter-increment: undone-items;
}

input:checked {
  order: 2;
  counter-increment: done-items;
}

label {
  display: block;
  position: relative;
  padding: 28px 0 28px 45px;
  border-top: 1px dashed #fff;
  order: 4;
  cursor: pointer;
  animation: undone 0.5s;
  border-bottom: 1px solid #f0f0f0;
  text-align: start;
}

label::before{
  content: "";
  background-image: url(../assets/circle.png); /* circle outline */
  background-size: 18px 18px;
  width: 18px;
  height: 18px;
  display: block;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}

label:hover,
input:focus + label {
  background-color: rgba(255, 255, 255, 0.2);
}

input:checked + label + button {
  animation: done 0.5s;
}
input:checked + label {
  animation: done 0.5s;
}

.item-check {
  order: 2;
}

input:checked + label::before {
  content: "";
  background-image: url(../assets/check-circle.png); /* circle checkmark */
}
.createItem {
  padding-left: 40px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
}
.createItem input {
  margin: 0;
  width: 50%;
  border: 1px solid #dfe1e5;
  box-shadow: none;
  border-radius: 24px;
  height: 44px;
  padding: 5px 20px 0px;
  transition: width 0.2s;
}
.createItem input:focus {
  width: 80%;
}

@keyframes done {
  0% {
    opacity: 0;
    background-color: rgba(255, 255, 255, 0.4);
    transform: translateY(20px);
  }
  50% {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.4);
  }
}

@keyframes undone {
  0% {
    opacity: 0;
    background-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-20px);
  }
  50% {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.4);
  }
}
</style>