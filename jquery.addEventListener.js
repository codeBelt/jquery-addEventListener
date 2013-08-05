(function($){
    if(!$.codebelt){
        $.codebelt = new Object();
    };

    $.codebelt.addEventListener = function(el, type, callback, scope, priority){
        // To avoid scope issues, use 'base' instead of 'this'
        // to reference this class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object
        base.$el.data("codebelt.addEventListener", base);

        base.init = function(){
            if( typeof( priority ) === "undefined" || priority === null ) priority = 0;

            base.type = type;
            base.callback = callback;
            base.scope = scope;
            base.priority = priority;

            // Put your initialization code here
        };

        // Sample Function, Uncomment to use
        // base.functionName = function(paramaters){
        // 
        // };

        // Run initializer
        base.init();
    };

    $.fn.codebelt_addEventListener = function(type, callback, scope, priority){
        return this.each(function(){
            (new $.codebelt.addEventListener(this, type, callback, scope, priority));
        });
    };

})(jQuery);