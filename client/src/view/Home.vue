<template>
  <div id="app">
    <div>
      <div class="infobar">
        <p>current method <span class="red">{{this.$parent.currentMethod}}</span></p>
       <p>prediction page <span class="red">{{this.$parent.nextPage}}</span></p>
        <p>prediction data <span class="red">{{this.$parent.nextPageData}}</span></p>
        <p>current page <span class="red">{{this.$parent.currentPage}}</span></p>
      </div>

      <Header></Header>

      
      <!-- <h2 @click="test">this sis method call {{res}}</h2> -->
      <div class="nav1">
        <ul>
        <li @click="controller('/home')">home</li>
        <li @click="controller('/project')">project</li>
        <li @click="controller('/contact')">contact</li>
        <li @click="controller('/register')">register</li>
        <li @click="controller('/about')">about</li>
      </ul>
    </div>
    </div>
      
    <h1 v-if="this.$parent.currentPage=='/home'">This is home</h1>
    <div v-html="dataToShow"></div>

      






  </div>
</template>

<script>
import Header from "@/view/header"
export default {
  name: 'Home',
  components:{
    Header

  },
  data(){
    return{
      res:"",
      dataToShow:""

    }
  },

  methods:{
    controller:async  function(sendTo){
      this.$parent.currentPage=sendTo;
      var nextPage=this.$parent.nextPage;
      let predicted="";
      if(nextPage!=null && nextPage!="false")
      { 
        var t=nextPage.split(":");
        predicted=t[0];
      }

      if(predicted==sendTo){
        this.dataToShow=this.$parent.nextPageData;
        
      }
      else
      {
      // alert("else chala ");
      var url='http://127.0.0.1:5555'+this.$parent.currentPage;
      console.log("requeat to hist on fail "+ url);
      var temp=await  this.$http.post(url,{data:"hello"});
      this.dataToShow=temp.body;
      console.log(temp.body);
      this.$parent.nextPage="";
      this.$parent.nextPageData="";

      }

    }

    
  }





}
</script>

<style>

.infobar{
  position: fixed;
  top:0;
  right: 0;
  font-size: xx-small;
  border: 2px black solid;
  background-color: aliceblue;
  width: 100px;
  height: 100px;
  overflow: hidden;
}

.nav1 ul{

  list-style: none;

}

.nav1 ul li{
    display: inline;
    padding: 10px;
    border: black 2px solid;
    border-radius: 10px;
    cursor: pointer;

}

.nav1 ul li:hover{
  background-color: sienna;
}

.red{
  color: red;
}

</style>
