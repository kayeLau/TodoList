<template>
  <div class="backgroundImg">
    <div class="img-overlay">
    </div>
  </div>
</template>
<style scoped>
.backgroundImg {
  width: 100%;
  height: 100%;
  background-image: url("../assets/school.jpeg");
  background-position: center;
  background-size: cover;
}
.img-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  background: inherit;
  overflow: hidden;
}
.img-overlay::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: inherit;
  background-attachment: fixed;
  filter: blur(5px);
}
.img-overlay::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.4;
}

</style>