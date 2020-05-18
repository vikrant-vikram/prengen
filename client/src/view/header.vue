<template>
  <div id="app">
    <div class="trigger-line" @mouseover="makePost()"></div>
     
  </div>

</template>

<script>
export default {
  name: 'Header',
  data(){
    return{
      res:""

    }
  },
  methods:{
  makePost:async function (current) {
      console.log("predictor ran============================================================");
      var url='http://127.0.0.1:5555/nextpage'+this.$parent.$parent.currentPage+"/"+this.$parent.$parent.currentMethod;
      console.log("predictor URL "+url+"----------------------------------------------------------------");
      var temp2= await this.$http.post(url,{data:"hello"});
      
      var temp=temp2.body;
      var temp1=temp.split(":");
      temp=temp1[0];

      this.$parent.$parent.nextPage=temp;
      console.log()
      if(temp!="false"){
      var url='http://127.0.0.1:5555'+temp;
      console.log("predicted URL"+url+"++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=====");
      var temp= await this.$http.post(url,{data:"hello"});
      this.$parent.$parent.nextPageData=temp.body;
      }
      
    }
  }
}
</script>

<style scoped>

.trigger-line{
  width: 100vw;
  height: 10px;
  background-color: red;
}

</style>