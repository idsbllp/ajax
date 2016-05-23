
function MyAjax (ajaxData) {
	//设置默认参数
	var obj = {
		url: '',
		methed: 'get',
		async: true,
		data: '',
		success: function () {},
		fail: function () {},
	}
	for (let item in ajaxData) {
		obj[item] = ajaxData[item];
	}

	function createXhr () {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xmlhttp;
	}
	var xhr = new createXhr ();

	function createSearch () {
		var search = '';
		if (obj.data) {
			for (let item in obj.data) {
				search += item + '=' + obj.data[item] +'&';
			}
			search = search.slice(0, search.length-1);
		}
		return search;
	}

	switch (obj.methed.toLowerCase()) {
		case 'get':
			xhr.open('get', obj.url + '?' + createSearch (), obj.async);
			xhr.send();
		break;
		case 'post':
			xhr.open('post', obj.url, obj.async);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send(createSearch ());
		break;
	}
	xhr.onload = function () {
		if (xhr.status === 200 && xhr.readyState === 4) {
			obj.success(xhr.responseText, xhr.responseXML);
		} else {
			obj.fail(xhr.status);
		}
	};
};




