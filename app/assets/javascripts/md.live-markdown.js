/*
 * Live markdown
 *
 * NEED OPTIMISATION ! HEAVY PROCCESSING !
 *
 */
MD.liveMarkdown = function() {
    this.edit_area = $('#edit-area');
    this.preview_area = $('#preview-note');
    
    var self = this;
    var converter = new Showdown.converter();
    
    this.edit_area.keyup(function(e) {
	if (!e.ctrlKey) {
	    MD.traffic.mustSave();
	    // I know its ugly but ive to go fasteeeeeeeeer
	    self.preview_area.html(converter.makeHtml($(this).val()) + 
				   '<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>');
	}
	// Scroll preview to bottom if we are writting at bottom
	if (self.edit_area.val().length - 30 <  self.edit_area.getCursorPosition()) {
	    var objid = document.getElementById('preview-note');
	    objid.scrollTop = objid.scrollHeight;
	}
    });

    $.subscribe('note.selected', function(event, data) {
	self.preview_area.html(converter.makeHtml(data.content));
    });
};

