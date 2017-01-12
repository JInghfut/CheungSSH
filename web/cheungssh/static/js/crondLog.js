/**
 * Created by 张其川 on 2016/7/19.
 */












function deleteCrondLog(team){

    var tr=$(team).parent()//当前行
    var td=tr.children(".ID")[0];
    fid=td.textContent;//找到计划人无的id
    jQuery.ajax({
        "url":deleteCrondLogURL,
        "dataType":"jsonp",
        "data":{"fid":fid},
        "error":errorAjax,
        "beforeSend":start_load_pic,
        "complete":stop_load_pic,
        "success":function(data){
            responseCheck(data)
            if(data.status===true){
                showSuccessNotic();
            }
            $(tr).remove();//删除行
        }
    });

}











function crondLog(){
    jQuery.ajax({
        "url":crondLogURL,
        "dataType":"jsonp",
        "error":errorAjax,
        "beforeSend":start_load_pic,
        "complete":stop_load_pic,
        "success":function(data){
            responseCheck(data);
            var content=data.content;
            var tbody=document.getElementById("AshowCrondLog");
            for(var i=0;i<content.length;i++){
                var tr=document.createElement("tr");
                //id
                var td=document.createElement("td");
                td.textContent=content[i]["fid"];
                td.style.display="none";//不显示ID
                td.className="ID";
                tr.appendChild(td);

                //状态
                var td=document.createElement("td");
                var status=content[i]["status"];
                var span=document.createElement("span");
                span.textContent=status;
                if(status==="失败"){
                    span.className="label label-danger";
                }
                else if(status==="未启动"){
                    span.className="label label-default";
                }
                else{
                    span.className="label label-success";
                }
                td.appendChild(span);
                tr.appendChild(td);
                //归属用户
                var td=document.createElement("td");
                td.textContent=content[i]["user"];
                tr.appendChild(td);
                //任务类型
                var td=document.createElement("td");
                var runType=content[i]["runtype"];
                var runTypeZH="";
                if(runType==="cmd"){  //翻译一下类型为中文
                    runTypeZH="命令"
                }
                else if(runType==="upload"){
                    runTypeZH="上传文件";
                }
                else{
                    runTypeZH="下载文件";
                }
                td.textContent=runTypeZH;
                tr.appendChild(td);

                //IP地址
                var td=document.createElement("td");
                td.textContent=content[i]["ip"];
                tr.appendChild(td);
                //源文件
                var td=document.createElement("td");
                td.textContent="暂无";
                tr.appendChild(td);
                //目标文件
                var td=document.createElement("td");
                td.textContent="暂无";
                tr.appendChild(td);

                //命令
                var td=document.createElement("td");
                td.textContent=content[i]["cmd"];
                tr.appendChild(td);
                //结果
                var td=document.createElement("td");
                td.textContent=content[i]["content"];
                tr.appendChild(td);
                //运行时间
                var td=document.createElement("td");
                td.textContent=content[i]["runtime"];
                tr.appendChild(td);
                //创建时间
                var td=document.createElement("td");
                td.textContent=content[i]["createtime"];
                tr.appendChild(td);
                //最后运行时间
                var td=document.createElement("td");
                td.textContent=content[i]["lasttime"];
                tr.appendChild(td);
                //操作
                var trashButtonHTML='<button class="btn btn-danger" type="button"><span class="glyphicon glyphicon-trash"></span></button>'
                var td=document.createElement("td");
                td.onclick=function(){
                    //绑定删除计划任务按钮
                    deleteCrondLog(this);
                }
                td.innerHTML=trashButtonHTML;
                tr.appendChild(td);
                tbody.appendChild(tr);

            }
        }
    });
}




//初始化加载

$(function(){
    crondLog();

})