<template>
  <div id="app">
   
   
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data:function(){
    return{
      temp:"",
      currentPage:"/home",
      currentMethod:"G",
      nextPageData:"",
      nextPage:""
    }
  },
  methods:
  {
    makePost:async function () 
    {
    var url='http://127.0.0.1:5555/nextpage/'+currentPage+"/"+currentMethod;
    this.responseData = await axios.post(url,{data:"hello"});
    

    },

    makePost2:async function (current) {


      this.responseData= await this.$http.post('http://127.0.0.1:5555/register',{data:"hello"});
      this.resFlag=true;

      }
    },
    tester:function(){
      alert("tester");
      return "abhishek";
    }
}








</script>

<style>


</style>
