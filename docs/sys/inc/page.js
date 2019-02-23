(function(){
	var m = "su"+"pp"+"ore"+"aave"+"2go"+"."+"ru"; m = m.replace(new RegExp("ea"), "t@s"); m = "<"+"a "+"hr"+"ef"+"='"+"ma"+"il"+"to"+":"+m+"'>"+m+"<"+"/a"+">";
	document.getElementById('pageBottom').innerHTML += m;

	var formNode = document.getElementById('pageFormNode')

	new alzEventer(formNode, 'submit', function(event){
		with (alzEventerTarget(event).elements['url']) { if (value=='http://' || value=='') { focus(); alert('Вставьте адрес страницы интернет-сайта в сответствующее поле формы'); return false; } }
		return true;
	}).add();

	new alzEventer(formNode.elements['url'], 'focus', function(event){
		with (alzEventerTarget(event)) { if (value=='http://') value=''; select(); }
		return true;
	}).add();

	new alzEventer(formNode.elements['url'], 'blur', function(event){
		with (alzEventerTarget(event)) { if (value=='') value='http://'; else { var v=value; value+=' '; value=v; } }
		return true;
	}).add();

	with (document.getElementById('pageBookmarklet'))
		for (var i=0; i<childNodes.length; i++)
			if (childNodes[i].tagName == 'A') {
				new alzEventer(childNodes[i], 'click', function(event){
					alert('Добавьте эту ссылку в закладки Вашего браузера'); return false;
				}).add();
				break;
			}

	document.getElementById('pageCounter').innerHTML += "<a href='http://www.liveinternet.ru/click' target=_blank><img src='http://counter.yadro.ru/hit?t45.1;r" + escape(document.referrer) + ((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth)) + ";u" + escape(document.URL) +";i" + escape("Жж"+document.title.substring(0,80)) + ";" + Math.random() + "' border=0 width=31 height=31 alt='' title='LiveInternet'><\/a>";

})();
