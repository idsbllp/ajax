function Ajax (obj) {
    // 设置默认参数
    var ajaxParams = {
        url: './index.php',
        method: 'GET',
        async: true,
        headers: {},
        data: null,
        jsonp: '',
        success: function () {},
        fail: function () {},
    }
    // 覆盖参数
    for (var item in obj) {
        ajaxParams[item] = obj[item] || ajaxParams[item];
    }
    if (!obj.async || obj.async.toString() === 'false') {
        ajaxParams.async = false;
    }
    // 格式化参数
    function formatParameters (data) {
        var params = [];
        for (var name in data) {
            params.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }
        return params.join('&');
    }

    // 如果是jsonp 
    if (ajaxParams.jsonp && ajaxParams.jsonp.trim() !== '') {
        // 且数据为对象 
        if (ajaxParams.data && typeof ajaxParams.data === 'object') {
            ajaxParams.data['callback'] = ajaxParams.jsonp;
            ajaxParams.data = formatParameters(ajaxParams.data);
        } else {
            ajaxParams.data += '&callback=' + ajaxParams.jsonp;
        }
    }


    function createXhr () {
        if (window.XMLHttpRequest) {
            createXhr = function () {
                return new XMLHttpRequest();
            }
        } else {
            createXhr = function () {
                return new ActiveXajaxParamsect("Microsoft.XMLHTTP");
            }
        }
        return createXhr();
    }   // 函数懒加载

    var xhr = createXhr();

    function jsonp (ajaxParams) {
        // 创建script标签
        var script = document.createElement('script');
        var body = document.body;
        body.appendChild(script);
        script.src = ajaxParams.url + '?' + ajaxParams.data;
    }

    if (ajaxParams.jsonp && ajaxParams.jsonp.trim() !== '') {
        jsonp(ajaxParams);
    } else {
        xhr.addEventListener('readystatechange', function () {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    ajaxParams.success(xhr.responseText);
                } else {
                    ajaxParams.fail(xhr.status);
                }
            }
        });
        switch (ajaxParams.methed.toUpperCase()) {
            case 'GET':
                if (ajaxParams.data) {
                    xhr.open('GET', ajaxParams.url + '?' + ajaxParams.data, ajaxParams.async);
                } else {
                    xhr.open('GET', ajaxParams.url);
                }
                xhr.send(null);
                break;
            case 'POST':
                xhr.open('POST', ajaxParams.url, ajaxParams.async);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                xhr.send(ajaxParams.data);
                break;
            default:
                console.error('check your method!');
        }
    }   
}
