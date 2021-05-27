import Vue from "vue";
import Vuex from "vuex";
import localStorage from "@/module/localStorage";

let date = new Date();
let month = (date.getMonth()*1+1);
let day = date.getDate();
let todolistKEY = `${date.getFullYear()}${month < 9 ? '0' + month : month}${day < 9 ? '0' + day : day}` //用年月日作key

let STORE = new localStorage("todo-vue","todo",todolistKEY);
let PAGE = new localStorage("page-vue","page");


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    todos_today:{},
    page:0
  },
  getters:{
    list(state){
      return function(){
        if(!state.todos_today.store){
          state.todos_today.store = []
        }
        return state.todos_today.store.map((todo,tId)=>{
          return{
            tId,
            todo
          }
        })
      }
    },
    wholelist(state){
      return state.todos
    },
    page(state){
      return state.page
    }
  },
  mutations: {
    set_todo(state, todos) {
      state.todos = todos;
    },
    set_todo_today(state, todos) {
      state.todos_today = todos;
    },
    set_page(state,page){
      state.page = page;
    }
  },
  modules: {},
  actions: {
    //資料邏輯
    //頁面狀態控制
    read_page({ commit }){
      let page = PAGE.load();
      if(page == 'null'){
        page = 0
      }
      PAGE.save(page)
      commit("set_page",page)
      return{
        page
      }
    },
    update_page({ commit,state},{ page }){
      console.log(page)
      if(state.page == page)return
      PAGE.save(page);
      commit("set_page",page);
      return{
        page
      }

    },
    //每日完成進度資料控制

    //to-do-list資料控制
    create_todo({ commit }, { todo }) {
      const todos = STORE.checkToday();  // 返回完整的todolist
      let len = todos.length - 1; //以todos[len]取出今天的todo
      todos[len].store.push(todo);
      STORE.save(todos);
      commit("set_todo", todos);
      commit("set_todo_today", todos[len]);
      return {
        tId: len,
        todos,
      };
    },
    read_todo({ commit }) {
      const todos = STORE.checkToday();  // 返回完整的todolist
      let len = todos.length - 1; //以todos[len]取出今天的todo
      STORE.save(todos);
      commit("set_todo", todos);
      commit("set_todo_today", todos[len]);
      return {
        todos
      };
    },
    delete_todo({ commit }, tId) {
      const todos = STORE.checkToday();  // 返回完整的todolist
      let len = todos.length - 1; //以todos[len]取出今天的todo
      const todo = todos[len].store.splice(tId, 1)[0];
      STORE.save(todos);
      commit("set_todo", todos);
      commit("set_todo_today", todos[len]);
      return {
        todo,
      };
    },
    update_todo({ commit, state }, { tId, content }) {
      if (state.todos[tId].content === content) return;
      const todos = STORE.load();
      todos[tId].content = content;
      STORE.save(todos);
      commit("set_todo", todos);
      return {
        tId,
        todo: todos[tId],
      };
    },
    check_todo({ commit }, { tId, state }) {
      const todos = STORE.checkToday();  // 返回完整的todolist
      let len = todos.length - 1; //以todos[len]取出今天的todo
      todos[len].store[tId].state = state;
      STORE.save(todos);
      commit("set_todo_today", todos[len]);
      return {
        tId,
        todo: todos[tId],
      };
    },
    clear_todo({ commit }){
      const todos = [];
      STORE.save(todos)
      commit("set_todo", todos);
      return{
        todos
      }
    }
  },
});
