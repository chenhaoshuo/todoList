

var prefix = "todoList_"
var get = function(key){
    return JSON.parse(localStorage.getItem(prefix + key));
}
var set = function(key, val){
    return localStorage.setItem(prefix + key, JSON.stringify(val));
}
var add = function(key, val){
    var data = get(key);
    if(data === null){
        var arrData = [val];
        return set(key, arrData);
    }else{
        data.push(val);
        return set(key, data);
    }
}
var del = function(key, val){
    var arrData = get(key);
    var de = [];
    arrData.forEach(function(thing, index){
        if(thing.index == val){
            de = arrData.splice(index, 1);
        }
    });
    set(key, arrData);
    return de[0];
}

export default {get, set, add, del}