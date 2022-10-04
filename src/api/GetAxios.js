import axios from 'axios'

const defAxios = axios.create({
   // baseURL: 'http://localhost/work/carryProject.ashx' //測試

    baseURL: `${location.origin}/work/carryProject.ashx` //正式
});


export const useFetchAxios = (params)=>{
    console.log('-- _NAME === ' + 'ump.DNA');
    console.log('-- _TYPE === ' + "");
    console.log('-- PAGE === ' + params.PAGE);
    console.log('-- TAG === ' + params.TAG);
    console.log('-- NAME === ' + params.NAME);
    console.log('-- GENE === ' + params.GENE);
    console.log('-- IDX === ' + params.IDX);
    console.log('-- OBJECT === ' + params.OBJECT);
    console.log('-- HINT === ' + params.HINT);
    console.log('-- SQL === ' + params.SQL);
    console.log('-- USER_ID === ' + params.USER_ID);
    return defAxios.get('',{
        params:{
            _NAME:"ump.DNA",
            _TYPE:"",
            PAGE:params.PAGE,
            TAG:params.TAG,
            NAME:params.NAME,
            GENE:params.GENE,
            IDX:params.IDX,
            OBJECT:params.OBJECT,
            HINT:params.HINT,
            SQL:params.SQL,
            USER_ID:params.USER_ID 
        }
    })
}

