/*! For license information please see main.js.LICENSE.txt */
(() => {
    const t = JSON.parse(
        '{\n    "tags": {\n        "Clients": "#clients",\n        "Details": "#details",\n        "Contact Us": "#contactus",\n        "Google": "https://www.google.com/"\n    }\n  }'
    );
    let e = '#';
    !(function (t, n) {
        function i(e) {
            for (
                var n = document.getElementsByClassName('autocomplete-items'),
                    i = 0;
                i < n.length;
                i++
            )
                e != n[i] && e != t && n[i].parentNode.removeChild(n[i]);
        }
        (arr = Object.keys(n)),
            t.addEventListener('input', function (o) {
                var r,
                    s,
                    a,
                    l = this.value;
                if ((i(), !l)) return !1;
                let c = !0,
                    u = !0;
                for (
                    (r = document.createElement('div')).setAttribute(
                        'id',
                        this.id + 'autocomplete-list'
                    ),
                        r.setAttribute('class', 'autocomplete-items shadow'),
                        this.parentNode.appendChild(r),
                        a = 0;
                    a < arr.length;
                    a++
                )
                    if (
                        arr[a].substr(0, l.length).toUpperCase() ==
                        l.toUpperCase()
                    ) {
                        (c = !1),
                            (u = c),
                            (s = document.createElement('div')).classList.add(
                                'search-item'
                            ),
                            (s.innerHTML =
                                '<div><strong>' +
                                arr[a].substr(0, l.length) +
                                '</strong>' +
                                arr[a].substr(l.length) +
                                '</div');
                        let o = document.getElementById('searchKey');
                        (o.value = arr[a]),
                            s.addEventListener('click', function (r) {
                                let s = o.value;
                                (t.value = s),
                                    (o.value = n[s]),
                                    (e = n[s]),
                                    i();
                            }),
                            r.appendChild(s),
                            (a = arr.length);
                    } else c = !0;
                c & u &&
                    ((s = document.createElement('div')).classList.add(
                        'search-item'
                    ),
                    (s.innerHTML = '<div><span>No matches found</span></div'),
                    r.appendChild(s));
            }),
            document.addEventListener('click', function (t) {
                i(t.target);
            });
    })(document.getElementById('searchBox'), t.tags),
        document.getElementById('searchIcon').addEventListener('click', () => {
            !(function () {
                let n = document.getElementById('searchBox'),
                    i = (function (e) {
                        let n = '';
                        return (
                            Object.keys(t.tags).forEach((i) => {
                                i.toUpperCase() == e.toUpperCase() &&
                                    (n = t.tags[i]);
                            }),
                            n
                        );
                    })(n.value);
                if (('' != i && (e = i), '#' == e)) return;
                let o = e;
                (e = '#'), (n.value = ''), (window.location.href = o);
            })();
        }),
        (function () {
            'use strict';
            function t(i) {
                if (!i)
                    throw new Error(
                        'No options passed to Waypoint constructor'
                    );
                if (!i.element)
                    throw new Error(
                        'No element option passed to Waypoint constructor'
                    );
                if (!i.handler)
                    throw new Error(
                        'No handler option passed to Waypoint constructor'
                    );
                (this.key = 'waypoint-' + e),
                    (this.options = t.Adapter.extend({}, t.defaults, i)),
                    (this.element = this.options.element),
                    (this.adapter = new t.Adapter(this.element)),
                    (this.callback = i.handler),
                    (this.axis = this.options.horizontal
                        ? 'horizontal'
                        : 'vertical'),
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
                        (this.options.offset =
                            t.offsetAliases[this.options.offset]),
                    this.group.add(this),
                    this.context.add(this),
                    (n[this.key] = this),
                    (e += 1);
            }
            var e = 0,
                n = {};
            (t.prototype.queueTrigger = function (t) {
                this.group.queueTrigger(this, t);
            }),
                (t.prototype.trigger = function (t) {
                    this.enabled &&
                        this.callback &&
                        this.callback.apply(this, t);
                }),
                (t.prototype.destroy = function () {
                    this.context.remove(this),
                        this.group.remove(this),
                        delete n[this.key];
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
                    for (var i in n) e.push(n[i]);
                    for (var o = 0, r = e.length; r > o; o++) e[o][t]();
                }),
                (t.destroyAll = function () {
                    t.invokeAll('destroy');
                }),
                (t.disableAll = function () {
                    t.invokeAll('disable');
                }),
                (t.enableAll = function () {
                    for (var e in (t.Context.refreshAll(), n))
                        n[e].enabled = !0;
                    return this;
                }),
                (t.refreshAll = function () {
                    t.Context.refreshAll();
                }),
                (t.viewportHeight = function () {
                    return (
                        window.innerHeight ||
                        document.documentElement.clientHeight
                    );
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
                        return (
                            this.context.innerHeight() -
                            this.adapter.outerHeight()
                        );
                    },
                    'right-in-view': function () {
                        return (
                            this.context.innerWidth() -
                            this.adapter.outerWidth()
                        );
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
                    (this.Adapter = o.Adapter),
                    (this.adapter = new this.Adapter(t)),
                    (this.key = 'waypoint-context-' + n),
                    (this.didScroll = !1),
                    (this.didResize = !1),
                    (this.oldScroll = {
                        x: this.adapter.scrollLeft(),
                        y: this.adapter.scrollTop(),
                    }),
                    (this.waypoints = { vertical: {}, horizontal: {} }),
                    (t.waypointContextKey = this.key),
                    (i[t.waypointContextKey] = this),
                    (n += 1),
                    o.windowContext ||
                        ((o.windowContext = !0),
                        (o.windowContext = new e(window))),
                    this.createThrottledScrollHandler(),
                    this.createThrottledResizeHandler();
            }
            var n = 0,
                i = {},
                o = window.Waypoint,
                r = window.onload;
            (e.prototype.add = function (t) {
                var e = t.options.horizontal ? 'horizontal' : 'vertical';
                (this.waypoints[e][t.key] = t), this.refresh();
            }),
                (e.prototype.checkEmpty = function () {
                    var t = this.Adapter.isEmptyObject(
                            this.waypoints.horizontal
                        ),
                        e = this.Adapter.isEmptyObject(this.waypoints.vertical),
                        n = this.element == this.element.window;
                    t &&
                        e &&
                        !n &&
                        (this.adapter.off('.waypoints'), delete i[this.key]);
                }),
                (e.prototype.createThrottledResizeHandler = function () {
                    function t() {
                        e.handleResize(), (e.didResize = !1);
                    }
                    var e = this;
                    this.adapter.on('resize.waypoints', function () {
                        e.didResize ||
                            ((e.didResize = !0), o.requestAnimationFrame(t));
                    });
                }),
                (e.prototype.createThrottledScrollHandler = function () {
                    function t() {
                        e.handleScroll(), (e.didScroll = !1);
                    }
                    var e = this;
                    this.adapter.on('scroll.waypoints', function () {
                        (!e.didScroll || o.isTouch) &&
                            ((e.didScroll = !0), o.requestAnimationFrame(t));
                    });
                }),
                (e.prototype.handleResize = function () {
                    o.Context.refreshAll();
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
                    for (var n in e) {
                        var i = e[n],
                            o =
                                i.newScroll > i.oldScroll
                                    ? i.forward
                                    : i.backward;
                        for (var r in this.waypoints[n]) {
                            var s = this.waypoints[n][r];
                            if (null !== s.triggerPoint) {
                                var a = i.oldScroll < s.triggerPoint,
                                    l = i.newScroll >= s.triggerPoint;
                                ((a && l) || (!a && !l)) &&
                                    (s.queueTrigger(o),
                                    (t[s.group.id] = s.group));
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
                        ? o.viewportHeight()
                        : this.adapter.innerHeight();
                }),
                (e.prototype.remove = function (t) {
                    delete this.waypoints[t.axis][t.key], this.checkEmpty();
                }),
                (e.prototype.innerWidth = function () {
                    return this.element == this.element.window
                        ? o.viewportWidth()
                        : this.adapter.innerWidth();
                }),
                (e.prototype.destroy = function () {
                    var t = [];
                    for (var e in this.waypoints)
                        for (var n in this.waypoints[e])
                            t.push(this.waypoints[e][n]);
                    for (var i = 0, o = t.length; o > i; i++) t[i].destroy();
                }),
                (e.prototype.refresh = function () {
                    var t,
                        e = this.element == this.element.window,
                        n = e ? void 0 : this.adapter.offset(),
                        i = {};
                    for (var r in (this.handleScroll(),
                    (t = {
                        horizontal: {
                            contextOffset: e ? 0 : n.left,
                            contextScroll: e ? 0 : this.oldScroll.x,
                            contextDimension: this.innerWidth(),
                            oldScroll: this.oldScroll.x,
                            forward: 'right',
                            backward: 'left',
                            offsetProp: 'left',
                        },
                        vertical: {
                            contextOffset: e ? 0 : n.top,
                            contextScroll: e ? 0 : this.oldScroll.y,
                            contextDimension: this.innerHeight(),
                            oldScroll: this.oldScroll.y,
                            forward: 'down',
                            backward: 'up',
                            offsetProp: 'top',
                        },
                    }))) {
                        var s = t[r];
                        for (var a in this.waypoints[r]) {
                            var l,
                                c,
                                u,
                                h,
                                d = this.waypoints[r][a],
                                p = d.options.offset,
                                f = d.triggerPoint,
                                w = 0,
                                y = null == f;
                            d.element !== d.element.window &&
                                (w = d.adapter.offset()[s.offsetProp]),
                                'function' == typeof p
                                    ? (p = p.apply(d))
                                    : 'string' == typeof p &&
                                      ((p = parseFloat(p)),
                                      d.options.offset.indexOf('%') > -1 &&
                                          (p = Math.ceil(
                                              (s.contextDimension * p) / 100
                                          ))),
                                (l = s.contextScroll - s.contextOffset),
                                (d.triggerPoint = Math.floor(w + l - p)),
                                (c = f < s.oldScroll),
                                (u = d.triggerPoint >= s.oldScroll),
                                (h = !c && !u),
                                !y && c && u
                                    ? (d.queueTrigger(s.backward),
                                      (i[d.group.id] = d.group))
                                    : ((!y && h) ||
                                          (y &&
                                              s.oldScroll >= d.triggerPoint)) &&
                                      (d.queueTrigger(s.forward),
                                      (i[d.group.id] = d.group));
                        }
                    }
                    return (
                        o.requestAnimationFrame(function () {
                            for (var t in i) i[t].flushTriggers();
                        }),
                        this
                    );
                }),
                (e.findOrCreateByElement = function (t) {
                    return e.findByElement(t) || new e(t);
                }),
                (e.refreshAll = function () {
                    for (var t in i) i[t].refresh();
                }),
                (e.findByElement = function (t) {
                    return i[t.waypointContextKey];
                }),
                (window.onload = function () {
                    r && r(), e.refreshAll();
                }),
                (o.requestAnimationFrame = function (e) {
                    (
                        window.requestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        t
                    ).call(window, e);
                }),
                (o.Context = e);
        })(),
        (function () {
            'use strict';
            function t(t, e) {
                return t.triggerPoint - e.triggerPoint;
            }
            function e(t, e) {
                return e.triggerPoint - t.triggerPoint;
            }
            function n(t) {
                (this.name = t.name),
                    (this.axis = t.axis),
                    (this.id = this.name + '-' + this.axis),
                    (this.waypoints = []),
                    this.clearTriggerQueues(),
                    (i[this.axis][this.name] = this);
            }
            var i = { vertical: {}, horizontal: {} },
                o = window.Waypoint;
            (n.prototype.add = function (t) {
                this.waypoints.push(t);
            }),
                (n.prototype.clearTriggerQueues = function () {
                    this.triggerQueues = {
                        up: [],
                        down: [],
                        left: [],
                        right: [],
                    };
                }),
                (n.prototype.flushTriggers = function () {
                    for (var n in this.triggerQueues) {
                        var i = this.triggerQueues[n],
                            o = 'up' === n || 'left' === n;
                        i.sort(o ? e : t);
                        for (var r = 0, s = i.length; s > r; r += 1) {
                            var a = i[r];
                            (a.options.continuous || r === i.length - 1) &&
                                a.trigger([n]);
                        }
                    }
                    this.clearTriggerQueues();
                }),
                (n.prototype.next = function (e) {
                    this.waypoints.sort(t);
                    var n = o.Adapter.inArray(e, this.waypoints);
                    return n === this.waypoints.length - 1
                        ? null
                        : this.waypoints[n + 1];
                }),
                (n.prototype.previous = function (e) {
                    this.waypoints.sort(t);
                    var n = o.Adapter.inArray(e, this.waypoints);
                    return n ? this.waypoints[n - 1] : null;
                }),
                (n.prototype.queueTrigger = function (t, e) {
                    this.triggerQueues[e].push(t);
                }),
                (n.prototype.remove = function (t) {
                    var e = o.Adapter.inArray(t, this.waypoints);
                    e > -1 && this.waypoints.splice(e, 1);
                }),
                (n.prototype.first = function () {
                    return this.waypoints[0];
                }),
                (n.prototype.last = function () {
                    return this.waypoints[this.waypoints.length - 1];
                }),
                (n.findOrCreate = function (t) {
                    return i[t.axis][t.name] || new n(t);
                }),
                (o.Group = n);
        })(),
        (function () {
            'use strict';
            function t(t) {
                this.$element = e(t);
            }
            var e = window.jQuery,
                n = window.Waypoint;
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
                function (e, n) {
                    t.prototype[n] = function () {
                        var t = Array.prototype.slice.call(arguments);
                        return this.$element[n].apply(this.$element, t);
                    };
                }
            ),
                e.each(['extend', 'inArray', 'isEmptyObject'], function (n, i) {
                    t[i] = e[i];
                }),
                n.adapters.push({ name: 'jquery', Adapter: t }),
                (n.Adapter = t);
        })(),
        (function () {
            'use strict';
            function t(t) {
                return function () {
                    var n = [],
                        i = arguments[0];
                    return (
                        t.isFunction(arguments[0]) &&
                            ((i = t.extend({}, arguments[1])).handler =
                                arguments[0]),
                        this.each(function () {
                            var o = t.extend({}, i, { element: this });
                            'string' == typeof o.context &&
                                (o.context = t(this).closest(o.context)[0]),
                                n.push(new e(o));
                        }),
                        n
                    );
                };
            }
            var e = window.Waypoint;
            window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
                window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
        })(),
        (function (t) {
            'use strict';
            t.fn.counterUp = function (e) {
                var n,
                    i = t.extend(
                        {
                            time: 400,
                            delay: 10,
                            offset: 100,
                            beginAt: 0,
                            formatter: !1,
                            context: 'window',
                            callback: function () {},
                        },
                        e
                    );
                return this.each(function () {
                    var e = t(this),
                        o = {
                            time: t(this).data('counterup-time') || i.time,
                            delay: t(this).data('counterup-delay') || i.delay,
                            offset:
                                t(this).data('counterup-offset') || i.offset,
                            beginAt:
                                t(this).data('counterup-beginat') || i.beginAt,
                            context:
                                t(this).data('counterup-context') || i.context,
                        };
                    e.waypoint(
                        function (r) {
                            !(function () {
                                var r = [],
                                    s = o.time / o.delay,
                                    a = t(this).attr('data-num')
                                        ? t(this).attr('data-num')
                                        : e.text(),
                                    l = /[0-9]+,[0-9]+/.test(a),
                                    c = (
                                        (a = a.replace(/,/g, '')).split(
                                            '.'
                                        )[1] || []
                                    ).length;
                                o.beginAt > a && (o.beginAt = a);
                                var u = /[0-9]+:[0-9]+:[0-9]+/.test(a);
                                if (u) {
                                    var h = a.split(':'),
                                        d = 1;
                                    for (n = 0; h.length > 0; )
                                        (n += d * parseInt(h.pop(), 10)),
                                            (d *= 60);
                                }
                                for (var p = s; p >= (o.beginAt / a) * s; p--) {
                                    var f = parseFloat((a / s) * p).toFixed(c);
                                    if (u) {
                                        f = parseInt((n / s) * p);
                                        var w = parseInt(f / 3600) % 24,
                                            y = parseInt(f / 60) % 60,
                                            g = parseInt(f % 60, 10);
                                        f =
                                            (w < 10 ? '0' + w : w) +
                                            ':' +
                                            (y < 10 ? '0' + y : y) +
                                            ':' +
                                            (g < 10 ? '0' + g : g);
                                    }
                                    if (l)
                                        for (
                                            ;
                                            /(\d+)(\d{3})/.test(f.toString());

                                        )
                                            f = f
                                                .toString()
                                                .replace(
                                                    /(\d+)(\d{3})/,
                                                    '$1,$2'
                                                );
                                    i.formatter &&
                                        (f = i.formatter.call(this, f)),
                                        r.unshift(f);
                                }
                                e.data('counterup-nums', r),
                                    e.text(o.beginAt),
                                    e.data('counterup-func', function () {
                                        e.data('counterup-nums')
                                            ? (e.html(
                                                  e
                                                      .data('counterup-nums')
                                                      .shift()
                                              ),
                                              e.data('counterup-nums').length
                                                  ? setTimeout(
                                                        e.data(
                                                            'counterup-func'
                                                        ),
                                                        o.delay
                                                    )
                                                  : (e.data(
                                                        'counterup-nums',
                                                        null
                                                    ),
                                                    e.data(
                                                        'counterup-func',
                                                        null
                                                    ),
                                                    i.callback.call(this)))
                                            : i.callback.call(this);
                                    }),
                                    setTimeout(
                                        e.data('counterup-func'),
                                        o.delay
                                    );
                            })(),
                                this.destroy();
                        },
                        { offset: o.offset + '%', context: o.context }
                    );
                });
            };
        })(jQuery),
        (function (t) {
            'use strict';
            jQuery('[data-toggle="counter-up"]').counterUp({
                delay: 10,
                time: 1e3,
            });
        })();
})();