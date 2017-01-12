/**
 * Created by 张其川 on 2016/7/4.
 */



$(function () {
    showErrorInfo("我的首页，暂无功能！");
    //APP图标宽度自动判断
   /* var _width = window.innerWidth;
    var app = document.getElementsByClassName("CheungSSH-APP");
    if (_width < 737 && _width > 414) {
        for (var i = 0; i < app.length; i++) {
            app[i].style.width = "48%";
            app[i].style.height = "50%";

        }
    }
    else if (_width < 415) {
        for (var i = 0; i < app.length; i++) {
            app[i].style.width = "48%";
            app[i].style.height = "40%";

        }
    }
    //加载画图
    var shadow = document.getElementById("shadow");
    jQuery.ajax({
    "url": headURL + dashboardURL,
    "dataType": "jsonp",
    "success": rootDiskChart,
    "error": errorAjax,
    "beforeSend": function () {
    shadow.style.display = "block";
    },
    "complete": function () {
    shadow.style.display = "none";
    }
    });

    */

})


function dashboardChart(data, element, chartType) {


    var options = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: "#fff",

        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 0, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps: 50,

        //String - Animation easing effect
        animationEasing: "easeOutBounce",

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,

        //String - A legend template
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

    }


    var e = document.getElementById(element).getContext('2d');
    if (chartType === "pie") {
        new Chart(e).Pie(data, options);

    } else {
        new Chart(e).Line(data, options);

    }


}




function rootDiskChart(data) {
    responseCheck(data);
    var rootDiskInfo = data["content"]["root_disk"];
    var memInfo = data.content.mem;
    var ioInfo = data.content.io;
    var cpuInfo = data.content.cpu;

    var diskData = [
        {
            value: rootDiskInfo["used"],
            color: "red",
            label: "已用G"
        },
        {
            value: rootDiskInfo["surplus"],
            color: "green",
            label: "剩余G"
        },

    ];


    var memData = [
        {
            value: memInfo.used,
            color: "red",
            label: "已用M"
        },
        {
            value: memInfo["surplus"],
            color: "green",
            label: "剩余M"
        },

    ];

    var ioTime = [];
    var ioValue = [];
    for (var i = 0; i < ioInfo.length; i++) {
        var ioLine = JSON.parse(ioInfo[i]);  //redis存储的是字符串这里
        ioTime.push(ioLine["time"]);//每一行数据的时间
        ioValue.push(ioLine["value"]);
    }
    console.log(ioValue);

    var ioData = {
        labels: ioTime,
        datasets: [
            {
                label: "IO使用",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: ioValue
            },

        ]
    };

    //CPU信息
    var cpuTime = [];
    var cpuValue = [];
    for (var i = 0; i < cpuInfo.length; i++) {
        var cpuLine = JSON.parse(cpuInfo[i]);  //redis存储的是字符串这里
        cpuTime.push(cpuLine["time"]);//每一行数据的时间
        cpuValue.push(cpuLine["value"]);
    }

    var cpuData = {
        labels: ioTime,
        datasets: [
            {
                label: "CPU使用",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: cpuValue
            },

        ]
    };


    dashboardChart(diskData, 'disk', 'pie');   //磁盘
    dashboardChart(memData, 'mem', 'pie');      //内存
    dashboardChart(ioData, 'io', 'line');
    dashboardChart(cpuData, 'cpu', 'line');


}
