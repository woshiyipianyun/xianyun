<template>
  <div>
    <Header></Header>
    <nuxt />

    <Footer></Footer>
  </div>
</template>
<script>
//导入头部公共组件
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  //注册组件
  components: {
    Header,
    Footer
  }
};
</script>

<style>
/* 公共样式初始化 */
* {
  margin: 0;
  padding: 0;
}

ul,
li,
ol {
  list-style: none;
}
a {
  color: #666;
  text-decoration: none;
}
em,
i {
  font-style: normal;
}
</style>
