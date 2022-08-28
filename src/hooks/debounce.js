export default function debounce(callback,timeout){
    let timer=null
    return function(){
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout(() => {
            callback()
        }, timeout);
    }
}