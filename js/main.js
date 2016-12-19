var g_Counts = 100; // 总数
var g_Timer; // 翻滚计时器
var g_Interval = 1; // 翻滚的时间间隔（毫秒）
var rolling = false; // 是否正在翻滚

// 当页面准备好时
$(document).ready(function() {  
	init();
	fixWrapper();
});

// 当调整窗体尺寸时
$(window).resize(function() {
	fixWrapper();
});

// 响应各种按键事件
$(document).keydown(function(e) {
	if (!e) {
		var e = window.event; 
	}

	var code = e.keyCode; // 当前按下的键码

	// 当空格按下
	if (code == 32) {
		toggleRollingNumber();
	}

	// 当翻滚暂停时退格键按下
	if (code == 8 && rolling == false) {
		init();
	}

	// 当翻滚暂停时回车键按下
	if (code == 13 && rolling == false) {
		while (true) {
			var counts = prompt("请输入总数：", g_Counts);

			if (counts == null || (!isNaN(counts) && counts > 1)) {
				break;
			} else {
				alert("输入失败！总数必须是一个大于 1 的整数！");
			}
		}

		if (counts != null) {
			g_Counts = parseInt(counts);
			init();
		}
	}
});

// 初始化页面
function init() {
	$(".hint").html("翻滚数（1 - " + g_Counts + "）");
	$(".result-number").html(0);
	greenResultNumber();
}

// 定位 Wrapper
function fixWrapper() {
	$(".wrapper").hide();
	$(".wrapper").css({
		left: ($(window).width() - $(".wrapper").outerWidth()) / 2,
		top: ($(window).height() - $(".wrapper").outerHeight()) / 2 + $(document).scrollTop(),
	});
	$(".wrapper").show();
}

// 将结果数值区域的字体颜色变成绿色
function greenResultNumber() {
	$(".result-number").removeClass("red");
	$(".result-number").addClass("green");
}

// 将结果数值区域的字体颜色变成红色
function redResultNumber() {
	$(".result-number").removeClass("green");
	$(".result-number").addClass("red");
}

// 开始或暂停翻滚
function toggleRollingNumber() {
	if (rolling) {
		rolling = false;
		clearTimeout(g_Timer);		
		$(".hint").html("结果");
		redResultNumber();
		resultNumber();
	} else {
		rolling = true;
		$(".hint").html("翻滚中...");
		greenResultNumber();
		beginTimer();
	}
}

// 更新翻滚数字到结果数值区域
function updateRollingNumber() {
	var num = Math.floor(Math.random() * g_Counts + 1);
	$(".result-number").html(num);
}

// 开始计时
function beginTimer() {
	g_Timer = setTimeout(roll, g_Interval);
}

// 翻滚
function roll() {
	g_Timer = setTimeout(roll, g_Interval);
	updateRollingNumber();
}
