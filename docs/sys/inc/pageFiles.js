function pageFilesAction(event, node) {
	with (node.parentNode.parentNode)
		for (var i=0; i<childNodes.length; i++)
			with (childNodes[i])
				if (tagName == 'B')
					for (var k=0; k<childNodes.length; k++)
						with (childNodes[k])
							if (tagName == 'A') { var lnk = href; break; }
	if (lnk) {
		switch (node.className) {
			case 'qr':
			alzLayerLoad(event).innerHTML = '<center><b>—сылка на файл<br>в виде QR-кода</b><div><img src="http://qrcoder.ru/code/?'+escape(lnk)+'&3&1" onload="alzLayerImageLoaded(this)"></div>ƒл€ передачи ссылки<br>на мобильный телефон<br><a href="http://qrcoder.ru" target="_blank">подробнее &raquo;</a></center>';
			break;

			case 'tv':
			alzLayerOpen(event, 360, 240).innerHTML = '<embed flashvars="&file='+escape(lnk)+'&width=360&height=240&location=/sys/inc/player.swf" src="/sys/inc/player.swf" type="application/x-shockwave-flash" allowfullscreen="true" width="100%" height="100%">';
			break;

			case 'mp':
			alzLayerOpen(event, 360, 20).innerHTML = '<embed flashvars="&file='+escape(lnk)+'&location=/sys/inc/player.swf" src="/sys/inc/player.swf" type="application/x-shockwave-flash" width="100%" height="100%">';
			break;
		}
	}
	return false;
}
