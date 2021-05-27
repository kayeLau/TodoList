<template>
  <div class="search">
    <div class="overlay" v-show="overlay" @click="hideSearchOption"></div>
    <transition name="popin">
      <div v-if="searchOption" class="search-option-group">
        <van-button
          v-for="(item, index) in searchOptionData"
          :key="index"
          class="search-option"
          :class="[index === searchActive ? 'search-active' : '']"
          @click="changeSearchWay(index)"
          :icon="item.icon"
          round
          size="small"
          type="primary"
          >{{ item.name }}</van-button
        >
      </div>
    </transition>
    <div
      class="search-input-container"
      :class="{ searchInputContainerFocus: searchContainerFocus }"
    >
      <input
        class="search-input"
        type="text"
        placeholder="Search"
        v-model="searchKeyWord"
        @focus="showSearchOption"
        :class="{ searchfocus: searchFocus }"
      />
      <van-button class="search-input-button" @click="searchWithBower"
        >搜索</van-button
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchOptionData: [
        { icon: require("../assets/baidu-icon.png"), name: "百度" },
        { icon: require("../assets/cnki-icon.png"), name: "知網" },
        { icon: require("../assets/google-icon.png"), name: "谷歌" }
      ],
      searchActive: 0,
      searchKeyWord: "",
      searchOption: false,
      searchFocus: false,
      searchContainerFocus: false,
      overlay: false
    };
  },
  methods: {
    searchWithBower() {
      if (this.searchActive === 0) {
        window.open("http://www.baidu.com/s?wd=" + this.searchKeyWord);
      } else if (this.searchActive === 1) {
        window.open(
          "https://kns.cnki.net/kns/brief/default_result.aspx?txt_1_sel=SU%24%25%3d%7C&txt_1_value1=" +
            this.searchKeyWord +
            "&txt_1_special1=%25&txt_extension=&expertvalue=&cjfdcode=&currentid=txt_1_value1&dbJson=coreJson&dbPrefix=SCDB&db_opt=CJFQ%2CCJFN%2CCDFD%2CCMFD%2CCPFD%2CIPFD%2CCCND%2CCCJD%2CHBRD&db_value=&hidTabChange=&hidDivIDS=&singleDB=SCDB&db_codes=&singleDBName=&againConfigJson=false&action=scdbsearch&ua=1.11%E4%BD%9C%E8%80%85%EF%BC%9A%E5%9B%BE%E7%81%B5%E6%B5%8B%E8%AF%95%E6%BB%A1%E5%88%86bot%E9%93%BE%E6%8E%A5%EF%BC%9Ahttps://www.zhihu.com/question/29479061/answer/1183720467%E6%9D%A5%E6%BA%90%EF%BC%9A%E7%9F%A5%E4%B9%8E%E8%91%97%E4%BD%9C%E6%9D%83%E5%BD%92%E4%BD%9C%E8%80%85%E6%89%80%E6%9C%89%E3%80%82%E5%95%86%E4%B8%9A%E8%BD%AC%E8%BD%BD%E8%AF%B7%E8%81%94%E7%B3%BB%E4%BD%9C%E8%80%85%E8%8E%B7%E5%BE%97%E6%8E%88%E6%9D%83%EF%BC%8C%E9%9D%9E%E5%95%86%E4%B8%9A%E8%BD%AC%E8%BD%BD%E8%AF%B7%E6%B3%A8%E6%98%8E%E5%87%BA%E5%A4%84%E3%80%82"
        );
      } else if (this.searchActive === 2) {
        window.open(
          "https://www.google.com.hk/search?q=" +
            this.searchKeyWord +
            "&oq=" +
            this.searchKeyWord +
            "&aqs=chrome..69i57j0l9.1016j0j15&sourceid=chrome&ie=UTF-8"
        );
      }
      this.searchKeyWord = "";
    },
    showSearchOption() {
      this.overlay = true;
      this.searchOption = true;
      this.searchFocus = true;
      this.searchContainerFocus = true;
    },
    hideSearchOption() {
      this.searchOption = false;
      this.searchFocus = false;
      this.overlay = false;
      this.searchContainerFocus = false;
    },
    changeSearchWay(index) {
      this.searchActive = index;
    }
  }
};
</script>
<style scoped>
.search {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.overlay {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(53, 51, 51, 0.25);
  z-index: 1;
}
.search-input-container {
  position: relative;
  width: 55%;
  transition: width 0.2s;
}
.search-input-button {
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  height: 100%;
  width: 50px;
  text-align: center;
  background-color: #db4c3f;
  border-radius: 0 30px 30px 0;
  border: none;
  color: #ffffff;
  font-weight: 400;
  padding: 0 !important;
  z-index: 6;
}
.searchInputContainerFocus {
  width: 75% !important;
}
.search-input {
  position: relative;
  display: block;
  margin: 0;
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 30px;
  height: 35px;
  padding: 13px 0;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
  z-index: 5;
}
.searchfocus {
  color: black !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  box-shadow: rgb(0 0 0 / 20%) 0 0 10px !important;
}
.search-option-group {
  padding-bottom: 15px;
  display: flex;
  gap: 10px;
  z-index: 5;
}
.search-option {
  padding: 5px 10px;
  height: 32px;
  line-height: 32px;
  font-size: 15px;
  text-align: center;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.25);
  border: rgba(255, 255, 255, 0.8) 1px solid;
}
.search-active {
  background-color: #db4c3f;
  border: #db4c3f solid 1px;
  box-shadow: 0 0 20px 2px rgb(148, 148, 148);
}
.popin-enter-active {
  transition: all 0.8s;
}
.popin-enter,
.popin-leave-to {
  opacity: 0;
}
</style>

