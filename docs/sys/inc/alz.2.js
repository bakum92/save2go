/**
 * Перенацеливает метод на другой объект
 *
 * @param object o
 */
Function.prototype.alzBind = function(o) {
	var m = this;
	return function() { return m.apply(o, arguments); }
}

/**
 * Возвращает размер документа
 *
 * @param string t тип размера - Width или Height
 * @return int
 */
function alzDimensionDocument(t) {
	var r=0, m=Math.max, d=document;
	eval ('if (d.'+t.toLowerCase()+') r=m(r,d.'+t.toLowerCase()+')');
	with (d) {
		eval ('if (body) with (body) { if (scroll'+t+') r=m(r,scroll'+t+'); if (offset'+t+') r=m(r,offset'+t+'); }'
			+'if (documentElement) with (documentElement) { if (scroll'+t+') r=m(r,scroll'+t+'); if (client'+t+') r=m(r,client'+t+'); }');
	}
	return r;
}

/**
 * Возвращает размер видимой части документа
 *
 * @param string t тип размера - Width или Height
 * @return int|undefined
 */
function alzDimensionClient(t) {
	eval('var r = self.inner'+t+' ? self.inner'+t+' : (document.documentElement && document.documentElement.client'+t+' ? document.documentElement.client'+t+' :(document.body ? document.body.client'+t+' : undefined))');
	return r;
}

/**
 * Возвращает размер элемента
 *
 * @param HTMLElement e html-элемент
 * @param string t тип размера - Width или Height
 * @return int|undefined
 */
function alzDimensionElement(e, t) {
	eval('var r = e.offset'+t);
	t = t.toLowerCase();
	eval('with (e.style) if(typeof('+t+')!="undefined" && null!='+t+'.match(/^[0-9]+px$/i)) r=parseInt('+t+',10)');
	return r;
}

/**
 * Возвращает размер скролла
 *
 * @param string t тип размера - Left или Top
 * @return int|undefined
 */
function alzDimensionScroll(t) {
	eval('with (document) var r = documentElement.scroll'+t+' ? documentElement.scroll'+t+' : body.scroll'+t);
	return r;
}

/**
 * Объект предоставляющий интерфейс для взаимодействия с событием объекта
 * Использование:
 * new alzEventer(document.getElementById('...'), 'mouseover', function(event){ return true; }).add();
 *
 * @param HTMLElement element
 * @param string onEvent наименование события (без приставки 'on')
 * @param functon userHandler обработчик события
 */
function alzEventer(element, onEvent, userHandler) {
	this.element = element;
	this.onEvent = onEvent;
	this.userHandler = userHandler;
	this.eventHandler = this._handler.alzBind(this);
}

/**
 * Устанавливает обработчик события объекта
 *
 */
alzEventer.prototype.add = function () {
	with (this.element) {
		if (typeof(addEventListener) != 'undefined') addEventListener(this.onEvent, this.eventHandler, false);
		else if (typeof(attachEvent) != 'undefined') attachEvent('on'+this.onEvent, this.eventHandler);
	}
	return this;
}

/**
 * Удаляет обработчик события объекта
 *
 */
alzEventer.prototype.remove = function () {
	with (this.element) {
		if (typeof(removeEventListener) != 'undefined') removeEventListener(this.onEvent, this.eventHandler, false);
		else if (typeof(detachEvent) != 'undefined') detachEvent('on'+this.onEvent, this.eventHandler);
	}
}

/**
 * Обертка к пользовательскому обработчику события
 *
 * @private
 * @param Event event
 */
alzEventer.prototype._handler = function (event) {
	if (typeof(window.event) != 'undefined') event = window.event;
	if (this.userHandler(event)) return true;
	if (typeof(event.preventDefault) != 'undefined') event.preventDefault();
	return false;
}

/**
 * Возвращает объект элемента для которого произошло указанное событие
 *
 * @param Event event
 * @return HTMLElement Object
 */
function alzEventerTarget(event) {
	return typeof(event.srcElement) != 'undefined' ? event.srcElement : event.target;
}
