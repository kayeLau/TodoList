<template>
  <div>
    <!-- 图标位置 -->
    <van-popup
      class="popup"
      v-model="show"
      closeable
      close-icon-position="top-right"
      position="left"
      :overlay="overlay"
      overlay-class="overlay"
      duration="0.1"
      :style="{ height: '100vh', width: '305px' }"
    >
      <ul id="cell-group">
        <li
          v-for="(item, index) in navData"
          :key="index"
          class="cell"
          :class="[index == pageActive ? 'cell-focus' : '']"
          @click="routerTo(item.path, index)"
        >
          <div class="title">
            <van-icon class="title-icon" :name="item.icon" />
            <p>{{ item.name }}</p>
          </div>
          <div></div>
        </li>
      </ul>
      <!-- <div class="calendar">
        <van-calendar
          :show-title="false"
          :poppable="false"
          :show-confirm="false"
          row-height="56"
          :style="{ height: '365px' }"
        />
      </div> -->
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      path: "/",
      activeNav: 0,
      navData: [
        { name: "搜尋", path: "/", icon: "todo-list" },
        { name: "任務", path: "/todolist", icon: "todo-list" },
        { name: "圖表", path: "/chart", icon: "todo-list" },
      ]
    };
  },
  computed: {
    pageActive() {
      return this.$store.getters.page;
    },
    pageToPath() {
      let page =
        this.pageActive == 2
          ? "/nocice"
          : this.pageActive == 1
          ? "/todolist"
          : "/";
      return page;
    }
  },
  props: {
    overlay: Boolean
  },
  methods: {
    popupOn() {
      this.show = true;
    },
    popupOff() {
      this.show = false;
    },
    routerTo(path, index) {
      if (path === this.path) return;
      this.path = path;
      this.$router.push({ path: path });
      this.$store.dispatch("update_page", { page: index });
    }
  },
  mounted() {
    this.$store.dispatch("read_page");
    console.log(this.pageToPath)
    this.path = this.pageToPath;
  }
};
</script>
<style scoped>
#cell-group {
  padding-top: 100px;
  padding-left: 35px;
}
.cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding-right: 18px;
  border-radius: 5px;
  height: 24px;
  font-size: 14px;
  font-weight: 400;
  list-style: none;
  cursor: pointer;
  padding: 5px 16px 5px 5px;
}
.cell-focus {
  color: #db4c3f;
  background-color: #ececec;
}
.title {
  display: flex;
  align-items: center;
  justify-content: center;
}
.title-icon {
  font-size: 20px;
  padding-right: 5px;
}
.popup {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fafafa !important;
}
.calendar {
  padding: 0 10px;
}
</style>>
  