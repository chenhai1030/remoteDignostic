//利用html5 FormData() API,创建一个接收文件的对象，因为可以多次拖拽，这里采用单例模式创建对象Dragfiles
let Dragfiles = (function (){
    let instance;
    return function(){
        if(!instance){
            instance = new FormData();
        }
        return instance;
    }
}());


//为Dragfiles添加一个清空所有文件的方法
FormData.prototype.deleteAll = function () {
    // let _this = this;
    // this.forEach(function(value,key){
    // 	_this.delete(key);
    // })
    let count=0;
    for (let key of this.keys()) {
        count ++;
    }
    for(let i=0;i<count;i++){
        for (let key of this.keys()) {
            this.delete(key);
        }
    }
}

let dz = document.getElementById('content');
dz.ondragover = function (ev) {
    //阻止浏览器默认打开文件的操作
    ev.preventDefault();
    //拖入文件后边框颜色变红
    this.style.borderColor = 'red';
}
dz.ondragleave = function () {
    //恢复边框颜色
    this.style.borderColor = 'gray';
}
dz.ondrop = function (ev) {
    //恢复边框颜色
    this.style.borderColor = 'gray';
    //prevent open file by default operate
    ev.preventDefault();
    let files = ev.dataTransfer.files;
    let len=files.length,
        i=0;
    let frag=document.createDocumentFragment();  //为了减少js修改dom树的频度，先创建一个fragment，然后在fragment里操作
    let tr,time,size, displayName;
    let newForm=Dragfiles(); //获取单例
    // let it=newForm.entries(); //创建一个迭代器，测试用
    while(i<len){
        tr=document.createElement('tr');
        //获取文件大小
        size=Math.round(files[i].size * 100 / 1024) / 100 + 'KB';
        //获取格式化的修改时间
        time = files[i].lastModifiedDate.toLocaleDateString() + ' '+files[i].lastModifiedDate.toTimeString().split(' ')[0];
        displayName = files[i].name.length > 15 ? files[i].name.substring(0,15) : files[i].name
        tr.innerHTML='<td>'+displayName+'</td><td>'+time+'</td><td>'+size+'</td><td>Delete</td>';
        console.log(size+' '+time);
        frag.appendChild(tr);
        //添加文件到newForm
        newForm.append(files[i].name, files[i]);
        //console.log(it.next());
        i++;
    }
    this.childNodes[1].childNodes[1].appendChild(frag);
    //为什么是‘1’？文档里几乎每一样东西都是一个节点，甚至连空格和换行符都会被解释成节点。而且都包含在childNodes属性所返回的数组中.不同于jade模板
}
function blink()
{
    document.getElementById('content').style.borderColor = 'gray';
}

function upload_file(){
    if(document.getElementsByTagName('tbody')[0].hasChildNodes()==false){
        document.getElementById('content').style.borderColor = 'red';
        setTimeout(blink,200);
        return false;
    }
    let data = Dragfiles(); //获取formData
    $.ajax({
        url: 'upload',
        type: 'POST',
        data: data,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success: function () {
            alert('succeed!')

            send_file_to_clent();

            document.getElementsByTagName('tbody')[0].innerHTML='';
        },
        error: function(xhr, exception){
            if( xhr.status === 413){
                alert('Error : ' + xhr.status + 'Request Entity Too Large');
            }else
                alert('failed!')  //可以替换为自己的方法
        }
    });
}

function send_file_to_clent(){
    let data=Dragfiles();
    data.forEach(function (value, key) {
        let n = window.location
            , cmd = 'busybox wget -c -P /tmp '+n.protocol+"//"+n.hostname+(n.port==""?"":(":"+n.port))+'/media/upload/'+key;
        // /chat/console
        $.post(window.location.href, {'value': cmd});
        // console.log(cmd);
    })
    //clean FormData
    data.deleteAll();
}

$(".tbody").on('click','tr td:last-child',function(){
    //删除拖拽框已有的文件
    let temp=Dragfiles();
    let key=$(this).prev().prev().prev().text();
    // console.log(key);
    temp.delete(key);
    $(this).parent().remove();
});

function clearAll(){
    if(document.getElementsByTagName('tbody')[0].hasChildNodes()==false){
        document.getElementById('content').style.borderColor = 'red';
        setTimeout(blink,300);
        return false;
    }
    let data=Dragfiles();
    data.deleteAll; //clean formData
    //$('.tbody').empty(); 等同于以下方法
    document.getElementsByTagName('tbody')[0].innerHTML='';
}