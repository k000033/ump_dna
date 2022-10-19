import axios from 'axios'

const defAxios = axios.create({
    //baseURL: 'http://localhost/work/carryProject.ashx' //測試

    baseURL: `${location.origin}/work/carryProject.ashx` //正式
});


export const useFetchAxios = (params)=>{
    console.log('-- _NAME === ' + 'ump.DNA');
    console.log('-- _TYPE === ' + "");
    console.log('-- TAG === ' + params.TAG);
    console.log('-- OBJECT === ' + params.OBJECT);
    console.log('-- OBJECT_TYPE === ' + params.OBJECT_TYPE);
    console.log('-- QUERY_MODE === ' + params.QUERY_MODE);
    console.log('-- FILETER === ' + params.FILETER);
    console.log('-- CHECK_TYPE === ' + params.CHECK_TYPE);
    console.log('-- USER_ID === ' + params.USER_ID);
    return defAxios.get('',{
        params:{
            _NAME:"ump.DNA",
            _TYPE:"",
            TAG:params.TAG,
            OBJECT:params.OBJECT,
            OBJECT_TYPE:params.OBJECT_TYPE ,
            QUERY_MODE:params.QUERY_MODE,
            FILETER :params.FILETER ,
            CHECK_TYPE :params.CHECK_TYPE ,
            USER_ID:params.USER_ID 
        }
    })
}

