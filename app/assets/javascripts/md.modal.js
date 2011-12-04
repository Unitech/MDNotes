
MD.modal = {};

MD.modal.activate = function() {
    $('#modal, #modal-box').show();
    $('#modal').click(function() {
	MD.modal.desactivate();
    });
};

MD.modal.desactivate = function() {
    $('#modal, #modal-box').hide();
};

MD.modal.textfield = function(text, val) {
    MD.modal.activate();
    var el = '<br/><br/><p>' + text + '</p><br/><form><input id="newtitle" type="textfield" value="' + val+ '"/>' +
		 '<br/><input id="send" type="submit" value="Confirm"/></form>';

    $('#modal-box').html(el).submit(function(e) {
	e.preventDefault();
	var new_title = $(this).parent().find('#newtitle').val();
	MD.views.variables.actualNote.changeTitle(new_title);
	MD.modal.desactivate();
    });
    
};