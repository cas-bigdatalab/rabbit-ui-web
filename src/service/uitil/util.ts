import Vue from 'vue';
import axios from "axios";

export default class Util extends Vue {
    private HOST = 'http://10.0.88.2:800/api';
    private POST_HOST = 'http://10.0.88.2:800/api';

    // public put(url: any, data: any, options: any = {}) {
    //     return axios.put(this.PUTHOST + url, data, {
    //         auth: {
    //             username: 'admin',
    //             password: 'admin',
    //         },

    public put_url(url: any, data: any, options: any = {}) {
        return axios.put(url, data, {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }

    public patch_url(url: any, data: any, options: any = {}) {
        return axios.patch(url, data, {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }

    // public put(url: any, data: any, options: any = {}) {
    //     return this.put_url(this.POST_HOST + url, data);
    // }

    public post(url: any, data: any, options: any = {}) {
            return axios.post(this.POST_HOST + url, data, {
                auth: {
                    username: 'admin',
                    password: 'admin',
                },


            // headers: {
            //     Authorization: 'Basic ' + Base64.encode('admin:admin'),
            //     'Access-Control-Allow-Origin': '*'
            // },
            // emulateHTTP: true,
            // emulateJSON: true
        });
    }

    public get_url(url: any, data: any = {}, options: any = {}) {
        return axios.get(url, data = {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }

    public get(url: any, data: any = {}, options: any = {}) {
        url = this.HOST + url;
        return this.get_url(url);
    }

    public dir_get(url: any, data: any = {}) {
        return axios.get(this.HOST + url, data = {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }
    public delete_url(url: any) {
        return axios.delete(url, {
            auth: {
                username: 'admin',
                password: 'admin',
            },
        });
    }
}



export let util = new Util();
