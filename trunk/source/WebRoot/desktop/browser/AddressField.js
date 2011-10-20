Ext.define('MyDesktop.browser.AddressField', {
    extend: 'Ext.form.field.ComboBox',
    
    alias: 'widget.addressfield',
    
    trigger1Cls: Ext.baseCSSPrefix + 'form-list-trigger',
    
    trigger2Cls: Ext.baseCSSPrefix + 'form-goto-trigger',
    
    trigger3Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    
    trigger4Cls: Ext.baseCSSPrefix + 'form-refresh-trigger',
    
    trigger5Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    
    hasSearch : false,
    paramName : 'query',
	queryMode : 'local',
	listConfig: {
        loadingText: '查找历史访问记录...',
        emptyText: '没有历史访问记录',
        loadingHeight: 70,
        minWidth: 70,
        maxHeight: 300,
        shadow: 'sides',
        getInnerTpl: function() {
                    return '<div class="search-item">' +
                        		'<h3><span>{[Ext.Date.format(values.date, "Y-m-j H:s")]}</span>{title} -- {http}</h3>' +
                        	'</div>';
                }
    },
    
    initComponent: function(){
        this.callParent(arguments);
        this.on('specialkey', function(f, e){
            if(e.getKey() == e.ENTER){
                this.onTrigger2Click();
            }
        }, this);
    },
    
    afterRender: function(){
        this.callParent();
        this.triggerEl.item(2).setDisplayed('none');  
        this.triggerEl.item(3).setDisplayed('none');  
    },
    
    onTrigger2Click : function(){
        var me = this;
        me.browser.doAccess(me.getValue());
    },
    
    
    onTrigger3Click : function(){
        var me = this;
        me.triggerEl.item(1).setDisplayed('block');
        me.triggerEl.item(2).setDisplayed('none');
        me.doComponentLayout();
        me.browser.doStop();
    },
    
    onTrigger4Click : function(){
        var me = this;
        me.triggerEl.item(2).setDisplayed('block');
        me.triggerEl.item(3).setDisplayed('none');
        me.doComponentLayout();
        me.browser.doRefresh();
    },

    onTrigger5Click : function(){
    	if(this.getValue){
        	this.browser.doSearch();
        }
    },

    
    onLoad : function(){
    	var me = this;
		me.triggerEl.item(1).setDisplayed('none');
		me.triggerEl.item(2).setDisplayed('none');
    	me.triggerEl.item(3).setDisplayed('block');
        me.doComponentLayout();
    },
    onInit : function(){
    	var me = this;
		me.triggerEl.item(1).setDisplayed('block');
		me.triggerEl.item(2).setDisplayed('none');
    	me.triggerEl.item(3).setDisplayed('none');
        me.doComponentLayout();
    },
    onLoading : function(){
    	var me = this;
    	me.triggerEl.item(1).setDisplayed('none');
		me.triggerEl.item(2).setDisplayed('block');
    	me.triggerEl.item(3).setDisplayed('none');
    	me.doComponentLayout();
    }
});