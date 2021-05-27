export default function(KEY,TYPE,DATE){
    
    if(TYPE == "todo"){
    return {
        checkToday(){
            let data = JSON.parse(window.localStorage.getItem(KEY) || `[{"name":${DATE},"store":[]}]`);
            for(let i = data.length-1;i >= 0;i--){
                if(data[i].name == DATE){
                    return data
                }
            }
            
            data.push({name:DATE,store:[]});
            window.localStorage.setItem(KEY,JSON.stringify(data));
            return data
        },
        load(){
            return JSON.parse(window.localStorage.getItem(KEY) || `[{"name":${DATE},"store":[]}]`)
        },
        save(data){
            window.localStorage.setItem(KEY,JSON.stringify(data))
        }
    }

    }else if(TYPE == "page"){
    return {
        load(){
            return window.localStorage.getItem(KEY) || 'null'
        },
        save(data){
            window.localStorage.setItem(KEY,data)
        }
    }
}
}