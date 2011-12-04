

var MD = {};

MD = function(options) {
    this.cacheElements();
    this.resize();

    this.remote = new MD.remote(options.urls);
    this.views = new MD.views();
    
    MD.traffic.init();
    MD.liveMarkdown();
    
    // Listen for event click, buttons...
    this.listenUIChanges();
    // Listen for new data coming, remote notes getting..
    this.listenIOChanges();
};

MD.prototype.cacheElements = function() {
    this.mainEl = $('#main-content');
    this.topMenuEl = $('#menu-bar');
    this.leftContainerEl = this.mainEl.find('#first-container');
    this.rightContainerEl = this.mainEl.find('#second-container');
    this.previewArea = this.mainEl.find('#preview-mode');
    this.editArea = this.rightContainerEl.find('#edit-area');
    //this.editArea.val('# H1 \n## H2\n### H3');
}


MD.prototype.resize = function() {
    var menu_height = this.topMenuEl.height();
    
    this.mainEl
	.find('#second-container, #preview-note')
	.height($(window).height() - menu_height - 8);

    var width_big_panels = ($(window).width()- this.leftContainerEl.width()) / 2;
    this.rightContainerEl.width(width_big_panels);
    this.previewArea.width(width_big_panels);
};

MD.prototype.listenUIChanges = function() {
    var self = this;

    this.handleShortcuts();

    $(window).resize(function() {
	self.resize();
    });
    
    // Button new clicked
    this.leftContainerEl.find('#new-note-btn').click(function() {
	MD.views.createNewNote(null);
	self.editArea.focus();
    });
    
    // Save and delete button are catched in the note factory
};

MD.prototype.listenIOChanges = function() {
    var self = this;
    
    // ## get notes remotely
    this.remote.getNotes(function(data) {
	self.views.createAndAppendNotes(data);
    });

    $.subscribe('note.save', function(ev, data) {
	if (data.id == 0) // New note
	    self.remote.createNote(data);
	else // Update note
	    self.remote.updateNote(data);
    });
    
    $.subscribe('note.delete', function(ev, data) {
	self.remote.deleteNote(data);
	//MD.views.deleteNote(data);
    });

    $(window).unload(function(){
	MD.views.variables.actualNote.save();
    });
};

MD.prototype.handleShortcuts = function() {
    var self = this;
    shortcut.add("Ctrl+S",function() {
	MD.views.variables.actualNote.save();
    });

    shortcut.add("Ctrl+B",function() {
	self.editArea.insertAtCaret('bold');
    });
};

