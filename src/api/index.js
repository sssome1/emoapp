import request from './request';

export const reqSearchSuggest=(keywords)=>request({url:`/search/suggest?keywords=${keywords}&type=mobile`,method:'get'})
export const reqSearchResult=(keywords)=>request({url:`/cloudsearch?keywords=${keywords}&limit=50`,method:'get'})
export const reqCheckMusic=(id)=>request({url:`/check/music?id=${id}`,method:'get'})
export const reqPersonalized=()=>request({url:'/personalized?limit=8',method:"get"})
export const reqHightQuality=()=>request({url:'/top/playlist/highquality?limit=8',method:'get'})
export const reqNetizen=()=>request({url:"/top/playlist?limit=8",method:'get'})
export const reqRankList=()=>request({url:'/toplist/detail',method:'get'})
export const reqListDetails=(listId)=>request({url:`/playlist/detail?id=${listId}`,method:'get'})
export const reqLyrics=(id)=>request({url:`/lyric?id=${id}`,method:'get'})