
var alzLayerEvents = new Array();
var alzLayerOpacityInterval = null;
var alzLayerOpacityStep = 0;

/**
 * Открывает слой с контентом
 *
 * @param event event событие
 * @param string name название объекта (идентификатор)
 * @param int layerWidth ширина
 * @param int layerHight высота
 * @return false
 */
function alzLayerOpen(event, layerWidth, layerHeight) {
	event.cancelBubble=true;
	alzLayerInit();
	alzLayerSetDimension(layerWidth, layerHeight, Math.round(event.clientX - layerWidth/2),
		Math.round(event.clientY - layerHeight/2));
	alzLayerSetVisible();
	return document.getElementById('alzLayer');
}

function alzLayerLoad(event) {
	event.cancelBubble=true;
	alzLayerInit();
	alzLayerSetDimension(0, 0, event.clientX, event.clientY);
	return document.getElementById('alzLayer');
}

function alzLayerImageLoaded(e) {
	with (document.getElementById('alzLayer').style) {
		var w = (paddingLeft?parseInt(paddingLeft,10):0)
			+(paddingRight?parseInt(paddingRight,10):0)
			+alzDimensionElement(document.getElementById('alzLayer').childNodes[0], 'Width');
		var h = (paddingTop?parseInt(paddingTop,10):0)
				+(paddingBottom?parseInt(paddingBottom,10):0)
				+alzDimensionElement(document.getElementById('alzLayer').childNodes[0], 'Height');
		alzLayerSetDimension(w, h,
			parseInt(left,10)-Math.ceil(w/2) - alzDimensionScroll('Left'),
			parseInt(top,10)-Math.ceil(h/2) - alzDimensionScroll('Top'));
	}
	alzLayerSetVisible();
}

function alzLayerClose() {
	for (var i=0; i<alzLayerEvents.length; i++) alzLayerEvents[i].remove();
	alzLayerRemoveNode('alzLayer'); alzLayerRemoveNode('alzLayerShadow');
}

function alzLayerRemoveNode(n) {
	with (document) if (getElementById(n)) getElementById(n).parentNode.removeChild(getElementById(n));
}

function alzLayerCreateNode(n) {
	var n = document.createElement('DIV');
	with (n.style) { visibility = 'hidden'; position = 'absolute'; }
	document.body.appendChild(n);
	return n;
}

function alzLayerInit() {
	alzLayerClose();
	with (alzLayerCreateNode()) {
		title = 'Для закрытия окна нажмите ESC';
		id = 'alzLayer';
		style.zIndex = 99999;
	}
	var n = alzLayerCreateNode();
	with (n) {
		id = 'alzLayerShadow';
		with (style) {
			zIndex = 99998;
			top = '0px'; left = '0px';
			width = alzDimensionDocument('Width')+'px'; height = alzDimensionDocument('Height')+'px';
			backgroundColor = "#333333";
		}
	}
	alzLayerEvents = new Array(
		new alzEventer(document.getElementById('alzLayerShadow'), 'click', function(event){alzLayerClose();return false}).add(),
		new alzEventer(document, 'keydown', function(event){if (event.keyCode==27) {alzLayerClose(); return false} else return true}).add());
}

function alzLayerSetOpacity(el, opacityVal) {
	with (el.style) {
		if (typeof(opacity) != 'undefined') opacity = opacityVal/100;
		else if (typeof(KhtmlOpacity) != 'undefined') KhtmlOpacity = opacityVal/100;
		else if (typeof(MozOpacity) != 'undefined') MozOpacity = opacityVal/100;
		else if (typeof(el.filters)!='undefined' && typeof(el.filters['DXImageTransform.Microsoft.alpha'])!='undefined')
		    el.filters['DXImageTransform.Microsoft.alpha'].opacity = opacityVal;
		else if (typeof(filter) != 'undefined') filter += "progid:DXImageTransform.Microsoft.Alpha(opacity="+opacityVal+")";
	}
}

function alzLayerSetVisible() {
//	alzLayerSetOpacity(document.getElementById('alzLayer'), alzLayerOpacityStep);
	alzLayerSetOpacity(document.getElementById('alzLayerShadow'), Math.ceil(alzLayerOpacityStep/10));
	if (!alzLayerOpacityStep) {
		document.getElementById('alzLayer').style.visibility = document.getElementById('alzLayerShadow').style.visibility = 'visible';
		alzLayerOpacityInterval = setInterval(alzLayerSetVisible, 20);
	} else if (alzLayerOpacityStep == 100) {
		clearInterval(alzLayerOpacityInterval);
		alzLayerOpacityStep = 0;
		return;
	}
	alzLayerOpacityStep += 10;
}


function alzLayerSetDimension(w, h, l, t) {
	if (l+w > alzDimensionClient('Width')-20) l = alzDimensionClient('Width') - w - 20;
	if (l < 0) l = 0;
	l += alzDimensionScroll('Left');
	if (t+h > alzDimensionClient('Height')-20) t = alzDimensionClient('Height') - h - 20;
	if (t < 0) t = 0;
	t += alzDimensionScroll('Top');

	with (document.getElementById('alzLayer').style) {
		if (w) width = w+'px';
		if (h) height = h+'px';
		top = t+'px'; left = l+'px';
	}
}
