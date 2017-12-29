import "./../css/style.css";
import "./../css/style_1.less";
import $ from "jquery";
import Util from "./Util.js";

var dom = {
	oDoingList: $("#doingList > ol"),
	oDoneList: $("#doneList > ol"),
	oDoingList_span: $("#doingList").find("span:first"),
	oDoneList_span: $("#doneList").find("span:first"),
	title: $("#title")
}

var storage = {
	doingList: Util.StorageGetter("doingList") || [],
	doneList: Util.StorageGetter("doneList") || [],
	totalThings: localStorage.getItem("todoList_totalThings") || 0
}

function load(){
	//预加载数据
	if(storage.doingList !== null){
		console.time("aaa");
		var html = "";
		storage.doingList.forEach(function(doingEvent, index){
			html += '<li draggable="true" index=' + doingEvent.index + '>';
			html += '<input type="checkbox">';
			html +=	'<p contenteditable="">' + doingEvent.title + '</p>';
			html += '<a href="###" class="remove"><span>-</span></a>';
			html += '</li>';
		});
		$(html).appendTo(dom.oDoingList);
		dom.oDoingList_span.text(storage.doingList.length);
		console.timeEnd("aaa");
	}
	if(doneList !== null){
		var html = "";
		storage.doneList.forEach(function(doneEvent, index){
			html += '<li draggable="true" index=' + doneEvent.index + '>';
			html += '<input type="checkbox" checked>';
			html +=	'<p>' + doneEvent.title + '</p>';
			html += '<a href="###" class="remove"><span>-</span></a>';
			html += '</li>';
		});
		$(html).appendTo(dom.oDoneList);
		dom.oDoneList_span.text(storage.doneList.length);
	}
}

function clearAll(){
	if(confirm("确定要清除所有事务吗？")){
		localStorage.removeItem("todoList_totalThings");
		localStorage.removeItem("todoList_doingList");
		localStorage.removeItem("todoList_doneList");
		location.reload();
	}
}

$(document).ready(function(){
	load();

	/*新增todo事件*/
	dom.title.keydown(function(e){
		var title = $(this).val();
		var html = "";
		if(e.keyCode === 13){
			if(title.trim() === ""){
				alert("题目不能为空！");
			}else{
				var todoEvent = {
					title: title,
					index: storage.totalThings++
				}
				Util.StorageSetter("totalThings", todoEvent.index);
				html += '<li draggable="true" index=' + todoEvent.index + '>';
				html += '<input type="checkbox">';
				html += '<p>' + todoEvent.title + '</p>';
				html += '<a href="###" class="remove"><span>-</span></a>';
				html += '</li>';
				$(html).appendTo(dom.oDoingList);
				dom.title.val("");
				Util.StorageAdder("doingList", todoEvent);
				storage.doingList.push(todoEvent);
				dom.oDoingList_span.text(parseInt(dom.oDoingList_span.text()) + 1);
			}
		}
	})

	// 可编辑事件
	dom.oDoingList.on("keydown", "p", function(e){
		if(e.keyCode == 13){
			e.preventDefault();
			var targetIndex = $(e.target).parent().attr("index");
			storage.doingList.forEach(function(doingEvent, index){
				while(targetIndex == doingEvent.index){
					storage.doingList[index].title = $(e.target).text();
					Util.StorageSetter("doingList", storage.doingList);
					return;
				}
			})
		}
	})

	/*勾选正在完成的事件*/
	dom.oDoingList.on("click", "input", function(e){
		var oLi = $(e.target).parent();
		oLi.appendTo(dom.oDoneList);
		var thing = {
			title: oLi.find("p").text(),
			index: oLi.attr("index")
		}
		Util.StorageAdder("doneList", thing);
		Util.StorageDeleter("doingList", thing.index);
		dom.oDoingList_span.text(parseInt(dom.oDoingList_span.text())-1);
		dom.oDoneList_span.text(parseInt(dom.oDoneList_span.text())+1);
	})

	/*取消已完成事件*/
	dom.oDoneList.on("click", "input", function(e){
		var oLi = $(e.target).parent();
		oLi.appendTo(dom.oDoingList);
		var thing = {
			title: oLi.find("p").text(),
			index: oLi.attr("index")
		}
		Util.StorageAdder("doingList", thing);
		Util.StorageDeleter("doneList", thing.index);
		dom.oDoingList_span.text(parseInt(dom.oDoingList_span.text())+1);
		dom.oDoneList_span.text(parseInt(dom.oDoneList_span.text())-1);
	})

	/*删除正在进行的事件*/
	dom.oDoingList.on("click", ".remove", function(e){
		var oLi;
		if(e.target.nodeName === "SPAN"){
			oLi = $(e.target).parent().parent();
		}else if(e.target.nodeName === "A"){
			oLi = $(e.target).parent();
		}
		Util.StorageDeleter("doingList", oLi.attr("index"));
		//增加动效
		$(oLi).addClass("linear-out");
		setTimeout(function(){
			oLi.remove();
			dom.oDoingList_span.text(parseInt(dom.oDoingList_span.text())-1);
		}, 300);
	})

	/*删除已经完成的事件*/
	dom.oDoneList.on("click", ".remove", function(e){
		var oLi;
		if(e.target.nodeName === "SPAN"){
			oLi = $(e.target).parent().parent();
		}else if(e.target.nodeName === "A"){
			oLi = $(e.target).parent();
		}
		Util.StorageDeleter("doneList", oLi.attr("index"));
		//增加动效
		$(oLi).addClass("linear-out");
		setTimeout(function(){
			$(oLi).remove();
			dom.oDoneList_span.text(parseInt(dom.oDoneList_span.text())-1);
		}, 200);
	})

	// 删除所有事件
	$("#clearAll").click(clearAll);

	// 拖放事件
	$("#doingList").on("dragstart", "li", function(e){
		var index = $(e.target).attr("index");
		e.originalEvent.dataTransfer.setData("index", index);
	});

	$("#doingList").on("dragover", "li", function(e){
		e.preventDefault();
	});

	$("#doingList").on("drop", "li", function(e){
		e.preventDefault();
		var oTarget = $(e.target);
		var sourceIndex = e.originalEvent.dataTransfer.getData("index");
		var oLi = $("#doingList").find("[index=" + sourceIndex + "]");
		var targetIndex;
		if(e.target.nodeName === "LI"){
			oTarget.after(oLi);
			targetIndex = oTarget.attr("index");
		}else{
			oTarget.parent().after(oLi);
			targetIndex = oTarget.parent().attr("index");
		}
		var moveThing = Util.StorageDeleter("doingList", sourceIndex);
		storage.doingList = Util.StorageGetter("doingList");
		storage.doingList.forEach(function(thing, index){
			if(thing.index == targetIndex){
				storage.doingList.splice(index+1, 0, moveThing);
				return ;
			}
		});
		Util.StorageSetter("doingList", storage.doingList);
	});
	
	/*点击li*/
	$("#doingList, #doneList").on("click", "li", function(e){
		$("#doingList li, #doneList li").removeClass("li-click");
		if(e.target.nodeName === "LI"){
			$(e.target).addClass("li-click");
		}else{
			$(e.target).parent().addClass("li-click");
		}
	})

	/*新增千条数据*/
	$("#newMoreDataBtn").click(function(e){
		console.time('batchAdd');
		var html = "";
		for(var i=0; i<1000; i++){
			//创建一个事务
			// dom.title.val(i);
			// createAEvent("doingList");
			
			var todoEvent = {
				title: ++storage.totalThings,
				index: storage.totalThings
			}
			Util.StorageSetter("totalThings", todoEvent.index);
			var len = storage.doingList.length;
			html += '<li draggable="true" index=' + todoEvent.index + '>';
			html += '<input type="checkbox">';
			html += '<p>' + todoEvent.title + '</p>';
			html += '<a href="###" class="remove"><span>-</span></a>';
			html += '</li>';
			storage.doingList.push(todoEvent);
			// Util.StorageAdder("doingList", todoEvent);
		}
		$(html).appendTo(dom.oDoingList);
		Util.StorageSetter("doingList", storage.doingList);
		dom.oDoingList_span.text(parseInt(dom.oDoingList_span.text()) + 1000);
		console.timeEnd('batchAdd')
	})
});

