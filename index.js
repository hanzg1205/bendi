

var text=document.querySelector('.nav-list input[type=text]');
var createBtn=document.querySelector('.nav-list input[type=button]');
var nowList=document.querySelector('.now .list');
var comList=document.querySelector('.com .list');
var nowNum=document.querySelector('.now .num');
var comNum=document.querySelector('.com .num');
reWrite();
createBtn.onclick=function(){
	if(text.value==""){
		alert('请输入内容');
		return;
	}
	var data=getData();
	data.push({title:text.value,done:false});	
	text.value="";
	svaeData(data);
	reWrite();
}

function getData(){
	// data = null || "[{},{}]"
	var data=JSON.parse(localStorage.getItem('todo'));
	return data||[];
}

function svaeData(data){
	localStorage.setItem('todo',JSON.stringify(data));
}

function changeState(id,state){
	var data=getData();
	data[id].done=state;
	svaeData(data);
	reWrite();
}

function changeText(id,txt){
	var data=getData();
	if(data[id].title==txt){
		return;
	}
	data[id].title=txt;
	svaeData(data);
	reWrite();
}

function delData(id){
	var data=getData();
	data.splice(id,1);
	svaeData(data);
	reWrite();
}

function reWrite(){
	var nStr="";
	var cStr="";
	var nNum=0;
	var cNum=0;
	var data=getData();
	data.forEach(function(o,i){
		if(o.done==false){
			nStr+='<li id='+i+'><div class="dd"></div><input type="checkbox" onclick="changeState('+i+',true)"><div class="cont" contenteditable=true onblur="changeText('+i+',this.innerHTML)">'+o.title+'</div><input type="button" value="del" onclick="delData('+i+')"></li>';
			nNum++;
		}else{
			cStr+='<li id='+i+'><div class="dd"></div><input type="checkbox" checked onclick="changeState('+i+',false)"><div class="cont" contenteditable=true onblur="changeText('+i+',this.innerHTML)">'+o.title+'</div><input type="button" value="del" onclick="delData('+i+')"></li>';
			cNum++;
		}
	})
	nowList.innerHTML=nStr;
	comList.innerHTML=cStr;
	nowNum.innerHTML=nNum;
	comNum.innerHTML=cNum;
}
document.querySelector('.delAll').onclick=function(){
	localStorage.clear();
	reWrite();
}

