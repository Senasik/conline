(function(window) {
	window.alert = function(content) {

		content = content + "【不建议使用，请使用 AngularJS-Toaster=>如:toaster.pop('success', '提示', '删除成功!')】";
		if (!document.getElementById("commonAlertModal")) {
			var alertTpl = '<div class="modal fade" id="commonAlertModal" tabindex="-1" role="dialog" aria-labelledby="commonAlertModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> <h4 class="modal-title" id="commonAlertModalLabel">提示消息</h4> </div> <div class="modal-body"> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>  </div> </div> </div> </div>';
			$("body").append($(alertTpl));
		}

		$('#commonAlertModal .modal-body').text(content);
		$('#commonAlertModal').modal('show');
	};

	window.confirm = function(content, confirmCallback, cancelCallBack) {
		content = content + "【不建议使用，请使用 $uibModal=>如$uibModal.open({ component: 'confirmComponent', resolve: { content: { title: '删除提示', body: '您确定要删除吗？' }, context: { 'test': '我是个测试' } } }).result.then(function(context) { toaster.pop('success', '提示', '删除成功!' + context.test); }, function() { toaster.pop('warning', '提示', '删除取消!'); });】";
		if (!document.getElementById("commonConfirmModal")) {
			var confirmTpl = '<div class="modal fade" id="commonConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <h4 class="modal-title" id="myModalLabel">确认操作</h4> </div> <div class="modal-body"> </div> <div class="modal-footer"> <button type="button" class="btn btn-default modal-cancle" >取消</button> <button type="button" class="btn btn-primary modal-confirm">确认</button> </div> </div> </div> </div>';

			$("body").append($(confirmTpl));

			$('#commonConfirmModal .modal-cancle').on("click", function() {
				$('#commonConfirmModal').modal('hide');

				if (cancelCallBack)
					cancelCallBack();
			});

			$('#commonConfirmModal .modal-confirm').on("click", function() {
				$('#commonConfirmModal').modal('hide');

				if (confirmCallback)
					confirmCallback();
			});
		}

		$('#commonConfirmModal .modal-body').text(content);
		$('#commonConfirmModal').modal('show');
	};

	Date.prototype.Format = function(fmt) { //author: meizz   
		var o = {
			"M+": this.getMonth() + 1, //月份   
			"d+": this.getDate(), //日   
			"h+": this.getHours(), //小时   
			"m+": this.getMinutes(), //分   
			"s+": this.getSeconds(), //秒   
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度   
			"S": this.getMilliseconds() //毫秒   
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	};

	Date.ConvertToDate = function(string) {
		try {
			var year = string.substr(0, 4);
			var month = parseInt(string.substr(4, 2)) - 1;
			var day = string.substr(6, 2);
			var hour = string.substr(8, 2);
			var min = string.substr(10, 2);
			var sec = string.substr(12, 2);
			return new Date(year, month, day, hour, min, sec);
		} catch (e) {
			return new Date();
		}
	};

	// 格式化秒数到时间格式 00:02:03
	Number.prototype.formatTime = function() {
		// 计算
		var h = 0,
			i = 0,
			s = parseInt(this);
		if (s >= 60) {
			i = parseInt(s / 60);
			s = parseInt(s % 60);
			if (i >= 60) {
				h = parseInt(i / 60);
				i = parseInt(i % 60);
			}
		}
		// 补零
		var zero = function(v) {
			return (v >> 0) < 10 ? "0" + v : v;
		};
		return [zero(h), zero(i), zero(s)].join(":");
	};
	// 格式化秒数到时间格式 02:03
	Number.prototype.formatSecond = function() {
		// 计算
		var h = 0,
			i = 0,
			s = parseInt(this);
		if (s >= 60) {
			i = parseInt(s / 60);
			s = parseInt(s % 60);
			if (i >= 60) {
				h = parseInt(i / 60);
				i = parseInt(i % 60);
			}
		}
		// 补零
		var zero = function(v) {
			return (v >> 0) < 10 ? "0" + v : v;
		};
		return [zero(i), zero(s)].join(":");
	};
})(window);