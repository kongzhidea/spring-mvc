function cutOffStr(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var windowHref = decodeURI(window.location.search);
	var r = windowHref.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

// data的key与form中input或者select的id一致。
function parseCommitFormData(form) {
	data = {};
	var inputs = form.find("input");
	for (var j = 0; j < inputs.length; j++) {
		var id = $(inputs[j]).attr("id");
		if (id == undefined || id == null) {
			continue;
		}
		data[id] = $(inputs[j]).val();
	}

	var selects = form.find("select");
	for (var j = 0; j < selects.length; j++) {
		var select = $(selects[j]);
		var id = select.attr("id");
		if (id == undefined || id == null) {
			continue;
		}
		data[id] = select.val();
	}
	return data;
}
