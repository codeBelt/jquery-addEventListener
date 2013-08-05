(function ($) {
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


//    $.fn.addEventListener = function(type, callback, scope, priority){
//        return this.each(function(){
//            (new $.addEventListener(this, type, callback, scope, priority));
//        });
//    };


    /*
     var defaults = {
     msg1: "(msg1)",
     msg2: "(msg2)"
     };

    $.fn.myHtmlControl = function(options) {
        this.data("myHtmlControl", $.extend({}, defaults, options));
        setOption(this, 'name', 'robert');
        console.log(getOption(this, "name"));
        return this;
    };

    function getOption(inst, name) {
        var obj = inst.data("myHtmlControl");
        return (obj || defaults)[name];
    }

    function setOption(inst, name, value) {
        var obj = inst.data("myHtmlControl");
        if (!obj) {
            obj = $.extend({}, defaults);
            inst.data("myHtmlControl", obj);
        }
        obj[name] = value;
    }*/


//    function runListeners(event)
//    {
//        var list = _listeners[event.type];
//        if (list)
//        {
//            var i = list.length;
//            var listener;
//            while (--i > -1)
//            {
//                listener = list[i];
//                if (listener.e === this) {
//                    listener.c.call(listener.s, event);
//                }
//            }
//        }
//    }

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

//        this["on" + type] = runListeners;
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
jQuery(function($) {

//    $('#ctrl1').doSomething1();
//    $('#ctrl1').doSomething2();
    $('#ctrl1').myHtmlControl({cool: 'robert'});

    $("#theButton").click(function() {
        $('#ctrl1').myHtmlControl({msg1: "abc"});
        $('#ctrl2').myHtmlControl({msg2: "123"});
        alert("about to do ctrl1");
        $('#ctrl1').doSomething1().doSomething2();
        alert("about to do ctrl2");
        $('#ctrl2').doSomething1().doSomething2();
    });

});



