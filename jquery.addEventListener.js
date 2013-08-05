(function($){
    var _listeners = [];

    $.fn.addEventListener = function(type, callback, scope)
    {
        this.on(type, callback);
        _addEventListener(type, callback, scope);
        return this;
    }
    $.fn.removeEventListener = function(type, callback, scope)
    {
        this.off(type, callback);
        _removeEventListener(type, callback, scope);
        return this;
    }

    function _addEventListener(type, callback, scope, useCapture, priority)
    {
        if (typeof priority === "undefined") { priority = 0; }

        var list = _listeners[type];
        if (list == null)
        {
            _listeners[type] = list = [];
        }
        var index = 0;
        var listener;
        var i = list.length;
        while (--i > -1)
        {
            listener = list[i];
            if (listener.c === callback && listener.s === scope && listener.e === this)
            {
                list.splice(i, 1);//If same callback and scope is found remove it. Then add the current one below.
            }
            else if (index === 0 && listener.pr < priority)
            {
                index = i + 1;
            }
        }
        list.splice(index, 0, {c: callback, s: scope, e: this, pr: priority});
    };

    function _removeEventListener(type, callback, scope, useCapture)
    {
        var list = _listeners[type];
        if (list)
        {
            var i = list.length;
            while (--i > -1)
            {
                if (list[i].c === callback && list[i].s === scope && list[i].e === this)
                {
                    list.splice(i, 1);
                    break;
                }
            }
        }
    };

})(jQuery);