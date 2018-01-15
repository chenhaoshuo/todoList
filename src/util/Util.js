
module.exports = function(){
    var prefix = "todoList_"
    var StorageGetter = function(key){
        return JSON.parse(localStorage.getItem(prefix + key));
    }
    var StorageSetter = function(key, val){
        return localStorage.setItem(prefix + key, JSON.stringify(val));
    }
    var StorageAdder = function(key, val){
        var data = StorageGetter(key);
        if(data === null){
            var arrData = [val];	//存到一个组数内
            return StorageSetter(key, arrData);
        }else{
            data.push(val);
            return StorageSetter(key, data);
        }
    }
    var StorageDeleter = function(key, val){
        var arrData = StorageGetter(key);
        var de = [];
        arrData.forEach(function(thing, index){
            if(thing.index == val){
                de = arrData.splice(index, 1);
            }
        });
        StorageSetter(key, arrData);
        return de[0];
    }
    return {
        StorageGetter: StorageGetter,
        StorageSetter: StorageSetter,
        StorageAdder: StorageAdder,
        StorageDeleter: StorageDeleter
    }
}();