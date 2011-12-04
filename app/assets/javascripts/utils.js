/*
 * Some tools
 */

Utils = {
    notify : function(str, time) {
        if (this.init == undefined) {
            $('body').append('<div id="notificator"></div>');
            this.init = true;
            this.rdy = true;
            this.el = $('#notificator');
        }
        if (this.rdy == true){
            this.rdy = false;
            var self = this;
            time = typeof(time) != 'undefined' ? time : 2200;
            this.el.html(str);
            this.el.slideDown().delay(time).slideUp(function(){
                self.rdy=1
            });
        }
        return false;
    },
    epureContent : function(text) {
	if (text == undefined)
	    return "";
	else
	    return text
	    .replace(/<span class="Apple-style-span" style="display: inline; float: none; ">/gi, "")
	    .replace(/<\/span>/gi, "")
	    .replace(/<\/div><div>/gi, "\n")
	    .replace(/<div>/gi, "")
	    .replace(/<\/div>/gi, "")
	    .replace(/<br>/gi, "\n")
	    .replace(/<p>/gi, "")
	    .replace(/<\/p>/gi, "");	
    }

}


jQuery.fn.extend({
    insertAtCaret: function(myValue){
	return this.each(function(i) {
	    if (document.selection) {
		//For browsers like Internet Explorer
		this.focus();
		sel = document.selection.createRange();
		sel.text = myValue;
		this.focus();
	    }
	    else if (this.selectionStart || this.selectionStart == '0') {
		//For browsers like Firefox and Webkit based
		var startPos = this.selectionStart;
		var endPos = this.selectionEnd;
		var scrollTop = this.scrollTop;
		this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
		this.focus();
		this.selectionStart = startPos + myValue.length;
		this.selectionEnd = startPos + myValue.length;
		this.scrollTop = scrollTop;
	    } else {
		this.value += myValue;
		this.focus();
	    }
	})
	    }
});


String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.toCamel = function(){
    return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};

String.prototype.toUnderscore = function(){
    return this.replace(/ /g,"_");
};

function caretPos(el)
{
    var pos = 0;
    // IE Support
    if (document.selection) 
    {
        el.focus ();
        var Sel = document.selection.createRange();
        var SelLength = document.selection.createRange().text.length;
        Sel.moveStart ('character', -el.value.length);
        pos = Sel.text.length - SelLength;
    }
    // Firefox support
    else if (el.selectionStart || el.selectionStart == '0')
        pos = el.selectionStart;

    return pos;

}

new function($) {
    $.fn.getCursorPosition = function() {
	var pos = 0;
	var el = $(this).get(0);
    // IE Support
	if (document.selection) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
	}
    // Firefox support
	else if (el.selectionStart || el.selectionStart == '0')
            pos = el.selectionStart;

	return pos;
    }
}($);