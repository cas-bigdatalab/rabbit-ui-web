import Vue from 'vue';


export default class Util extends Vue{
    private HOST='http://localhost:8080';

    post(url:any,data:any,options:any={}){
        return this.$http.post(this.HOST+url,data,options);
    }

    get(url:any,data:any={},options:any={}){
        return this.$http.get(this.HOST+url,data,options);
    }
}

export let util = new Util();
