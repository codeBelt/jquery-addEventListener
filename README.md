jQuery eventListener plugin
===========================

When creating JavaScript classes you will run into an issue where you cannot remove event listeners once you've added them.
To get this to work you typically need to assign you bind function call(s) to a property on the class. You can see this in the Example 1 below in the setupHandlers method.

The eventListener jquery plugin makes it so you don't need to do this. Basically you can do everything the on and off methods do in jQuery and all you have to do is pass the class scope as the last argument. Check out the Example 2.

Also check out the EventListenerApp sample code.

___Example 1___

```
var DemoView = function() {
    this.isEnabled = false;

    this.setupHandlers();
    this.enable();
};

DemoView.prototype.setupHandlers = function() {
    // Bind event handlers scope here
    this.onClickHandler = this.onClick.bind(this);
    this.onMouseEnterHandler = this.onMouseEnter.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeave.bind(this);
};

DemoView.prototype.enable = function() {
    if (this.isEnabled === true) return this;
    this.isEnabled = true;

    this.$card.on('click', this.onClickHandler)
    this.$card.on('mouseenter', this.onMouseEnterHandler)
    this.$card.on('mouseleave', this.onMouseLeaveHandler);
};

DemoView.prototype.disable = function() {
    if (this.isEnabled === false) return this;
    this.isEnabled = false;

    this.$card.off('click', this.onClickHandler)
    this.$card.off('mouseenter', this.onMouseEnterHandler)
    this.$card.off('mouseleave', this.onMouseLeaveHandler);
};

DemoView.prototype.onClick = function(event) {};
DemoView.prototype.onMouseEnter = function(event) {};
DemoView.prototype.onMouseLeave = function(event) {};
```


___Example 2___

```
var DemoView = function() {
    this.isEnabled = false;

    this.enable();
};

DemoView.prototype.enable = function() {
    if (this.isEnabled === true) return this;
    this.isEnabled = true;

    this.$card.addEventListener('click', this.onClickHandler, this)
    this.$card.addEventListener('mouseenter', this.onMouseEnterHandler, this)
    this.$card.addEventListener('mouseleave', this.onMouseLeaveHandler, this);
};

DemoView.prototype.disable = function() {
    if (this.isEnabled === false) return this;
    this.isEnabled = false;

    this.$card.removeEventListener('click', this.onClickHandler, this)
    this.$card.removeEventListener('mouseenter', this.onMouseEnterHandler, this)
    this.$card.removeEventListener('mouseleave', this.onMouseLeaveHandler, this);
};

DemoView.prototype.onClick = function(event) {};
DemoView.prototype.onMouseEnter = function(event) {};
DemoView.prototype.onMouseLeave = function(event) {};
```