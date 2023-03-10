/*
Script for search option
*/

let data = `{
    "tags": {
        "Clients": "#clients",
        "Details": "#details",
        "Contact Us": "#contactus",
        "Google": "https://www.google.com/"
    }
  }`;

const obj = JSON.parse(data);
let targetLocation = '#';

function autocomplete(inp, data) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    arr = Object.keys(data);
    /*execute a function when someone writes in the text field:*/

    inp.addEventListener('input', function (e) {
        var a,
            b,
            i,
            val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            return false;
        }

        let nothingFoundFlag = true;
        let prevNothingFoundFlag = true;
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement('div');
        a.setAttribute('id', this.id + 'autocomplete-list');
        a.setAttribute('class', 'autocomplete-items shadow');
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (
                arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()
            ) {
                nothingFoundFlag = false;
                prevNothingFoundFlag = nothingFoundFlag;
                /*create a DIV element for each matching element:*/

                b = document.createElement('div');
                b.classList.add('search-item');
                /*make the matching letters bold:*/
                b.innerHTML =
                    '<div><strong>' +
                    arr[i].substr(0, val.length) +
                    '</strong>' +
                    arr[i].substr(val.length) +
                    '</div';
                // b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                /*insert a input field that will hold the current array item's value:*/
                let output = document.getElementById('searchKey');
                output.value = arr[i];
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener('click', function (e) {
                    /*insert the value for the autocomplete text field:*/
                    let tagValue = output.value;
                    inp.value = tagValue;
                    output.value = data[tagValue];
                    targetLocation = data[tagValue];
                    /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
                i = arr.length;
            } else {
                nothingFoundFlag = true;
            }
        }
        if (nothingFoundFlag & prevNothingFoundFlag) {
            b = document.createElement('div');
            b.classList.add('search-item');
            /*make the matching letters bold:*/
            b.innerHTML = '<div><span>No matches found</span></div';
            a.appendChild(b);
        }
    });
    /*execute a function presses a key on the keyboard:*/
    // inp.addEventListener('keydown', function (e) {
    //     var x = document.getElementById(this.id + 'autocomplete-list');
    //     if (x) x = x.getElementsByTagName('div');
    //     if (e.keyCode == 40) {
    //         /*If the arrow DOWN key is pressed,
    //       increase the currentFocus variable:*/
    //         currentFocus++;
    //         /*and and make the current item more visible:*/
    //         addActive(x);
    //     } else if (e.keyCode == 38) {
    //         //up
    //         /*If the arrow UP key is pressed,
    //       decrease the currentFocus variable:*/
    //         currentFocus--;
    //         /*and and make the current item more visible:*/
    //         addActive(x);
    //     } else if (e.keyCode == 13) {
    //         /*If the ENTER key is pressed, prevent the form from being submitted,*/
    //         e.preventDefault();
    //         if (currentFocus > -1) {
    //             /*and simulate a click on the "active" item:*/
    //             if (x) x[currentFocus].click();
    //         }
    //     }
    // });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add('autocomplete-active');
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove('autocomplete-active');
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
        var x = document.getElementsByClassName('autocomplete-items');
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener('click', function (e) {
        closeAllLists(e.target);
    });
}

/*initiate the autocomplete function on the "searchBox" element, and pass along the countries array as possible autocomplete values:*/

autocomplete(document.getElementById('searchBox'), obj.tags);

function getValueIfValid(searchKey) {
    let value = '';
    Object.keys(obj.tags).forEach((key) => {
        if (key.toUpperCase() == searchKey.toUpperCase()) {
            value = obj.tags[key];
        }
    });
    return value;
}

function search() {
    let searchKey = document.getElementById('searchBox');
    let searchDefault = getValueIfValid(searchKey.value);
    if (searchDefault != '') {
        targetLocation = searchDefault;
    }
    if (targetLocation == '#') return;
    let temp = targetLocation;
    targetLocation = '#';
    searchKey.value = '';
    window.location.href = temp;
}

document.getElementById('searchIcon').addEventListener('click', () => {
    search();
});

/*!
Waypoints - 4.0.1
Copyright ???? 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!(function () {
    'use strict';
    function t(o) {
        if (!o) throw new Error('No options passed to Waypoint constructor');
        if (!o.element)
            throw new Error('No element option passed to Waypoint constructor');
        if (!o.handler)
            throw new Error('No handler option passed to Waypoint constructor');
        (this.key = 'waypoint-' + e),
            (this.options = t.Adapter.extend({}, t.defaults, o)),
            (this.element = this.options.element),
            (this.adapter = new t.Adapter(this.element)),
            (this.callback = o.handler),
            (this.axis = this.options.horizontal ? 'horizontal' : 'vertical'),
            (this.enabled = this.options.enabled),
            (this.triggerPoint = null),
            (this.group = t.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis,
            })),
            (this.context = t.Context.findOrCreateByElement(
                this.options.context
            )),
            t.offsetAliases[this.options.offset] &&
                (this.options.offset = t.offsetAliases[this.options.offset]),
            this.group.add(this),
            this.context.add(this),
            (i[this.key] = this),
            (e += 1);
    }
    var e = 0,
        i = {};
    (t.prototype.queueTrigger = function (t) {
        this.group.queueTrigger(this, t);
    }),
        (t.prototype.trigger = function (t) {
            this.enabled && this.callback && this.callback.apply(this, t);
        }),
        (t.prototype.destroy = function () {
            this.context.remove(this),
                this.group.remove(this),
                delete i[this.key];
        }),
        (t.prototype.disable = function () {
            return (this.enabled = !1), this;
        }),
        (t.prototype.enable = function () {
            return this.context.refresh(), (this.enabled = !0), this;
        }),
        (t.prototype.next = function () {
            return this.group.next(this);
        }),
        (t.prototype.previous = function () {
            return this.group.previous(this);
        }),
        (t.invokeAll = function (t) {
            var e = [];
            for (var o in i) e.push(i[o]);
            for (var n = 0, r = e.length; r > n; n++) e[n][t]();
        }),
        (t.destroyAll = function () {
            t.invokeAll('destroy');
        }),
        (t.disableAll = function () {
            t.invokeAll('disable');
        }),
        (t.enableAll = function () {
            t.Context.refreshAll();
            for (var e in i) i[e].enabled = !0;
            return this;
        }),
        (t.refreshAll = function () {
            t.Context.refreshAll();
        }),
        (t.viewportHeight = function () {
            return window.innerHeight || document.documentElement.clientHeight;
        }),
        (t.viewportWidth = function () {
            return document.documentElement.clientWidth;
        }),
        (t.adapters = []),
        (t.defaults = {
            context: window,
            continuous: !0,
            enabled: !0,
            group: 'default',
            horizontal: !1,
            offset: 0,
        }),
        (t.offsetAliases = {
            'bottom-in-view': function () {
                return this.context.innerHeight() - this.adapter.outerHeight();
            },
            'right-in-view': function () {
                return this.context.innerWidth() - this.adapter.outerWidth();
            },
        }),
        (window.Waypoint = t);
})(),
    (function () {
        'use strict';
        function t(t) {
            window.setTimeout(t, 1e3 / 60);
        }
        function e(t) {
            (this.element = t),
                (this.Adapter = n.Adapter),
                (this.adapter = new this.Adapter(t)),
                (this.key = 'waypoint-context-' + i),
                (this.didScroll = !1),
                (this.didResize = !1),
                (this.oldScroll = {
                    x: this.adapter.scrollLeft(),
                    y: this.adapter.scrollTop(),
                }),
                (this.waypoints = { vertical: {}, horizontal: {} }),
                (t.waypointContextKey = this.key),
                (o[t.waypointContextKey] = this),
                (i += 1),
                n.windowContext ||
                    ((n.windowContext = !0), (n.windowContext = new e(window))),
                this.createThrottledScrollHandler(),
                this.createThrottledResizeHandler();
        }
        var i = 0,
            o = {},
            n = window.Waypoint,
            r = window.onload;
        (e.prototype.add = function (t) {
            var e = t.options.horizontal ? 'horizontal' : 'vertical';
            (this.waypoints[e][t.key] = t), this.refresh();
        }),
            (e.prototype.checkEmpty = function () {
                var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                    e = this.Adapter.isEmptyObject(this.waypoints.vertical),
                    i = this.element == this.element.window;
                t &&
                    e &&
                    !i &&
                    (this.adapter.off('.waypoints'), delete o[this.key]);
            }),
            (e.prototype.createThrottledResizeHandler = function () {
                function t() {
                    e.handleResize(), (e.didResize = !1);
                }
                var e = this;
                this.adapter.on('resize.waypoints', function () {
                    e.didResize ||
                        ((e.didResize = !0), n.requestAnimationFrame(t));
                });
            }),
            (e.prototype.createThrottledScrollHandler = function () {
                function t() {
                    e.handleScroll(), (e.didScroll = !1);
                }
                var e = this;
                this.adapter.on('scroll.waypoints', function () {
                    (!e.didScroll || n.isTouch) &&
                        ((e.didScroll = !0), n.requestAnimationFrame(t));
                });
            }),
            (e.prototype.handleResize = function () {
                n.Context.refreshAll();
            }),
            (e.prototype.handleScroll = function () {
                var t = {},
                    e = {
                        horizontal: {
                            newScroll: this.adapter.scrollLeft(),
                            oldScroll: this.oldScroll.x,
                            forward: 'right',
                            backward: 'left',
                        },
                        vertical: {
                            newScroll: this.adapter.scrollTop(),
                            oldScroll: this.oldScroll.y,
                            forward: 'down',
                            backward: 'up',
                        },
                    };
                for (var i in e) {
                    var o = e[i],
                        n = o.newScroll > o.oldScroll,
                        r = n ? o.forward : o.backward;
                    for (var s in this.waypoints[i]) {
                        var a = this.waypoints[i][s];
                        if (null !== a.triggerPoint) {
                            var l = o.oldScroll < a.triggerPoint,
                                h = o.newScroll >= a.triggerPoint,
                                p = l && h,
                                u = !l && !h;
                            (p || u) &&
                                (a.queueTrigger(r), (t[a.group.id] = a.group));
                        }
                    }
                }
                for (var c in t) t[c].flushTriggers();
                this.oldScroll = {
                    x: e.horizontal.newScroll,
                    y: e.vertical.newScroll,
                };
            }),
            (e.prototype.innerHeight = function () {
                return this.element == this.element.window
                    ? n.viewportHeight()
                    : this.adapter.innerHeight();
            }),
            (e.prototype.remove = function (t) {
                delete this.waypoints[t.axis][t.key], this.checkEmpty();
            }),
            (e.prototype.innerWidth = function () {
                return this.element == this.element.window
                    ? n.viewportWidth()
                    : this.adapter.innerWidth();
            }),
            (e.prototype.destroy = function () {
                var t = [];
                for (var e in this.waypoints)
                    for (var i in this.waypoints[e])
                        t.push(this.waypoints[e][i]);
                for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
            }),
            (e.prototype.refresh = function () {
                var t,
                    e = this.element == this.element.window,
                    i = e ? void 0 : this.adapter.offset(),
                    o = {};
                this.handleScroll(),
                    (t = {
                        horizontal: {
                            contextOffset: e ? 0 : i.left,
                            contextScroll: e ? 0 : this.oldScroll.x,
                            contextDimension: this.innerWidth(),
                            oldScroll: this.oldScroll.x,
                            forward: 'right',
                            backward: 'left',
                            offsetProp: 'left',
                        },
                        vertical: {
                            contextOffset: e ? 0 : i.top,
                            contextScroll: e ? 0 : this.oldScroll.y,
                            contextDimension: this.innerHeight(),
                            oldScroll: this.oldScroll.y,
                            forward: 'down',
                            backward: 'up',
                            offsetProp: 'top',
                        },
                    });
                for (var r in t) {
                    var s = t[r];
                    for (var a in this.waypoints[r]) {
                        var l,
                            h,
                            p,
                            u,
                            c,
                            d = this.waypoints[r][a],
                            f = d.options.offset,
                            w = d.triggerPoint,
                            y = 0,
                            g = null == w;
                        d.element !== d.element.window &&
                            (y = d.adapter.offset()[s.offsetProp]),
                            'function' == typeof f
                                ? (f = f.apply(d))
                                : 'string' == typeof f &&
                                  ((f = parseFloat(f)),
                                  d.options.offset.indexOf('%') > -1 &&
                                      (f = Math.ceil(
                                          (s.contextDimension * f) / 100
                                      ))),
                            (l = s.contextScroll - s.contextOffset),
                            (d.triggerPoint = Math.floor(y + l - f)),
                            (h = w < s.oldScroll),
                            (p = d.triggerPoint >= s.oldScroll),
                            (u = h && p),
                            (c = !h && !p),
                            !g && u
                                ? (d.queueTrigger(s.backward),
                                  (o[d.group.id] = d.group))
                                : !g && c
                                ? (d.queueTrigger(s.forward),
                                  (o[d.group.id] = d.group))
                                : g &&
                                  s.oldScroll >= d.triggerPoint &&
                                  (d.queueTrigger(s.forward),
                                  (o[d.group.id] = d.group));
                    }
                }
                return (
                    n.requestAnimationFrame(function () {
                        for (var t in o) o[t].flushTriggers();
                    }),
                    this
                );
            }),
            (e.findOrCreateByElement = function (t) {
                return e.findByElement(t) || new e(t);
            }),
            (e.refreshAll = function () {
                for (var t in o) o[t].refresh();
            }),
            (e.findByElement = function (t) {
                return o[t.waypointContextKey];
            }),
            (window.onload = function () {
                r && r(), e.refreshAll();
            }),
            (n.requestAnimationFrame = function (e) {
                var i =
                    window.requestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    t;
                i.call(window, e);
            }),
            (n.Context = e);
    })(),
    (function () {
        'use strict';
        function t(t, e) {
            return t.triggerPoint - e.triggerPoint;
        }
        function e(t, e) {
            return e.triggerPoint - t.triggerPoint;
        }
        function i(t) {
            (this.name = t.name),
                (this.axis = t.axis),
                (this.id = this.name + '-' + this.axis),
                (this.waypoints = []),
                this.clearTriggerQueues(),
                (o[this.axis][this.name] = this);
        }
        var o = { vertical: {}, horizontal: {} },
            n = window.Waypoint;
        (i.prototype.add = function (t) {
            this.waypoints.push(t);
        }),
            (i.prototype.clearTriggerQueues = function () {
                this.triggerQueues = { up: [], down: [], left: [], right: [] };
            }),
            (i.prototype.flushTriggers = function () {
                for (var i in this.triggerQueues) {
                    var o = this.triggerQueues[i],
                        n = 'up' === i || 'left' === i;
                    o.sort(n ? e : t);
                    for (var r = 0, s = o.length; s > r; r += 1) {
                        var a = o[r];
                        (a.options.continuous || r === o.length - 1) &&
                            a.trigger([i]);
                    }
                }
                this.clearTriggerQueues();
            }),
            (i.prototype.next = function (e) {
                this.waypoints.sort(t);
                var i = n.Adapter.inArray(e, this.waypoints),
                    o = i === this.waypoints.length - 1;
                return o ? null : this.waypoints[i + 1];
            }),
            (i.prototype.previous = function (e) {
                this.waypoints.sort(t);
                var i = n.Adapter.inArray(e, this.waypoints);
                return i ? this.waypoints[i - 1] : null;
            }),
            (i.prototype.queueTrigger = function (t, e) {
                this.triggerQueues[e].push(t);
            }),
            (i.prototype.remove = function (t) {
                var e = n.Adapter.inArray(t, this.waypoints);
                e > -1 && this.waypoints.splice(e, 1);
            }),
            (i.prototype.first = function () {
                return this.waypoints[0];
            }),
            (i.prototype.last = function () {
                return this.waypoints[this.waypoints.length - 1];
            }),
            (i.findOrCreate = function (t) {
                return o[t.axis][t.name] || new i(t);
            }),
            (n.Group = i);
    })(),
    (function () {
        'use strict';
        function t(t) {
            this.$element = e(t);
        }
        var e = window.jQuery,
            i = window.Waypoint;
        e.each(
            [
                'innerHeight',
                'innerWidth',
                'off',
                'offset',
                'on',
                'outerHeight',
                'outerWidth',
                'scrollLeft',
                'scrollTop',
            ],
            function (e, i) {
                t.prototype[i] = function () {
                    var t = Array.prototype.slice.call(arguments);
                    return this.$element[i].apply(this.$element, t);
                };
            }
        ),
            e.each(['extend', 'inArray', 'isEmptyObject'], function (i, o) {
                t[o] = e[o];
            }),
            i.adapters.push({ name: 'jquery', Adapter: t }),
            (i.Adapter = t);
    })(),
    (function () {
        'use strict';
        function t(t) {
            return function () {
                var i = [],
                    o = arguments[0];
                return (
                    t.isFunction(arguments[0]) &&
                        ((o = t.extend({}, arguments[1])),
                        (o.handler = arguments[0])),
                    this.each(function () {
                        var n = t.extend({}, o, { element: this });
                        'string' == typeof n.context &&
                            (n.context = t(this).closest(n.context)[0]),
                            i.push(new e(n));
                    }),
                    i
                );
            };
        }
        var e = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
            window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
    })();

/*!
 * jquery.counterup.js 2.1.0
 *
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 *
 * Amended by Jeremy Paris, Ciro Mattia Gonano and others
 *
 * Date: Feb 24, 2017
 */

(function ($) {
    'use strict';
    $.fn.counterUp = function (options) {
        var settings = $.extend(
                {
                    time: 400,
                    delay: 10,
                    offset: 100,
                    beginAt: 0,
                    formatter: false,
                    context: 'window',
                    callback: function () {},
                },
                options
            ),
            s;
        return this.each(function () {
            var $this = $(this),
                counter = {
                    time: $(this).data('counterup-time') || settings.time,
                    delay: $(this).data('counterup-delay') || settings.delay,
                    offset: $(this).data('counterup-offset') || settings.offset,
                    beginAt:
                        $(this).data('counterup-beginat') || settings.beginAt,
                    context:
                        $(this).data('counterup-context') || settings.context,
                };
            var counterUpper = function () {
                var nums = [];
                var divisions = counter.time / counter.delay;
                var num = $(this).attr('data-num')
                    ? $(this).attr('data-num')
                    : $this.text();
                var isComma = /[0-9]+,[0-9]+/.test(num);
                num = num.replace(/,/g, '');
                var decimalPlaces = (num.split('.')[1] || []).length;
                if (counter.beginAt > num) counter.beginAt = num;
                var isTime = /[0-9]+:[0-9]+:[0-9]+/.test(num);
                if (isTime) {
                    var times = num.split(':'),
                        m = 1;
                    s = 0;
                    while (times.length > 0) {
                        s += m * parseInt(times.pop(), 10);
                        m *= 60;
                    }
                }
                for (
                    var i = divisions;
                    i >= (counter.beginAt / num) * divisions;
                    i--
                ) {
                    var newNum = parseFloat((num / divisions) * i).toFixed(
                        decimalPlaces
                    );
                    if (isTime) {
                        newNum = parseInt((s / divisions) * i);
                        var hours = parseInt(newNum / 3600) % 24;
                        var minutes = parseInt(newNum / 60) % 60;
                        var seconds = parseInt(newNum % 60, 10);
                        newNum =
                            (hours < 10 ? '0' + hours : hours) +
                            ':' +
                            (minutes < 10 ? '0' + minutes : minutes) +
                            ':' +
                            (seconds < 10 ? '0' + seconds : seconds);
                    }
                    if (isComma) {
                        while (/(\d+)(\d{3})/.test(newNum.toString())) {
                            newNum = newNum
                                .toString()
                                .replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                        }
                    }
                    if (settings.formatter) {
                        newNum = settings.formatter.call(this, newNum);
                    }
                    nums.unshift(newNum);
                }
                $this.data('counterup-nums', nums);
                $this.text(counter.beginAt);
                var f = function () {
                    if (!$this.data('counterup-nums')) {
                        settings.callback.call(this);
                        return;
                    }
                    $this.html($this.data('counterup-nums').shift());
                    if ($this.data('counterup-nums').length) {
                        setTimeout($this.data('counterup-func'), counter.delay);
                    } else {
                        $this.data('counterup-nums', null);
                        $this.data('counterup-func', null);
                        settings.callback.call(this);
                    }
                };
                $this.data('counterup-func', f);
                setTimeout($this.data('counterup-func'), counter.delay);
            };
            $this.waypoint(
                function (direction) {
                    counterUpper();
                    this.destroy();
                },
                { offset: counter.offset + '%', context: counter.context }
            );
        });
    };
})(jQuery);

// Counter up in details section
(function ($) {
    'use strict';
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000,
    });
})(jQuery);
