
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (store$1, ISPList, Spinner, PaymentSlipTable, PaymentSlip, http, BarcodeList, model, CustomerList) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ISPList__default = /*#__PURE__*/_interopDefaultLegacy(ISPList);
    var Spinner__default = /*#__PURE__*/_interopDefaultLegacy(Spinner);
    var PaymentSlipTable__default = /*#__PURE__*/_interopDefaultLegacy(PaymentSlipTable);
    var PaymentSlip__default = /*#__PURE__*/_interopDefaultLegacy(PaymentSlip);
    var BarcodeList__default = /*#__PURE__*/_interopDefaultLegacy(BarcodeList);
    var CustomerList__default = /*#__PURE__*/_interopDefaultLegacy(CustomerList);

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.wholeText !== data)
            text.data = data;
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    function construct_svelte_component(component, props) {
        return new component(props);
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately after the component has been updated.
     *
     * The first time the callback runs will be after the initial `onMount`
     */
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function tick() {
        schedule_update();
        return resolved_promise;
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    /**
     * @typedef {Object} WrappedComponent Object returned by the `wrap` method
     * @property {SvelteComponent} component - Component to load (this is always asynchronous)
     * @property {RoutePrecondition[]} [conditions] - Route pre-conditions to validate
     * @property {Object} [props] - Optional dictionary of static props
     * @property {Object} [userData] - Optional user data dictionary
     * @property {bool} _sveltesparouter - Internal flag; always set to true
     */

    /**
     * @callback AsyncSvelteComponent
     * @returns {Promise<SvelteComponent>} Returns a Promise that resolves with a Svelte component
     */

    /**
     * @callback RoutePrecondition
     * @param {RouteDetail} detail - Route detail object
     * @returns {boolean|Promise<boolean>} If the callback returns a false-y value, it's interpreted as the precondition failed, so it aborts loading the component (and won't process other pre-condition callbacks)
     */

    /**
     * @typedef {Object} WrapOptions Options object for the call to `wrap`
     * @property {SvelteComponent} [component] - Svelte component to load (this is incompatible with `asyncComponent`)
     * @property {AsyncSvelteComponent} [asyncComponent] - Function that returns a Promise that fulfills with a Svelte component (e.g. `{asyncComponent: () => import('Foo.svelte')}`)
     * @property {SvelteComponent} [loadingComponent] - Svelte component to be displayed while the async route is loading (as a placeholder); when unset or false-y, no component is shown while component
     * @property {object} [loadingParams] - Optional dictionary passed to the `loadingComponent` component as params (for an exported prop called `params`)
     * @property {object} [userData] - Optional object that will be passed to events such as `routeLoading`, `routeLoaded`, `conditionsFailed`
     * @property {object} [props] - Optional key-value dictionary of static props that will be passed to the component. The props are expanded with {...props}, so the key in the dictionary becomes the name of the prop.
     * @property {RoutePrecondition[]|RoutePrecondition} [conditions] - Route pre-conditions to add, which will be executed in order
     */

    /**
     * Wraps a component to enable multiple capabilities:
     * 1. Using dynamically-imported component, with (e.g. `{asyncComponent: () => import('Foo.svelte')}`), which also allows bundlers to do code-splitting.
     * 2. Adding route pre-conditions (e.g. `{conditions: [...]}`)
     * 3. Adding static props that are passed to the component
     * 4. Adding custom userData, which is passed to route events (e.g. route loaded events) or to route pre-conditions (e.g. `{userData: {foo: 'bar}}`)
     * 
     * @param {WrapOptions} args - Arguments object
     * @returns {WrappedComponent} Wrapped component
     */
    function wrap(args) {
        if (!args) {
            throw Error('Parameter args is required')
        }

        // We need to have one and only one of component and asyncComponent
        // This does a "XNOR"
        if (!args.component == !args.asyncComponent) {
            throw Error('One and only one of component and asyncComponent is required')
        }

        // If the component is not async, wrap it into a function returning a Promise
        if (args.component) {
            args.asyncComponent = () => Promise.resolve(args.component);
        }

        // Parameter asyncComponent and each item of conditions must be functions
        if (typeof args.asyncComponent != 'function') {
            throw Error('Parameter asyncComponent must be a function')
        }
        if (args.conditions) {
            // Ensure it's an array
            if (!Array.isArray(args.conditions)) {
                args.conditions = [args.conditions];
            }
            for (let i = 0; i < args.conditions.length; i++) {
                if (!args.conditions[i] || typeof args.conditions[i] != 'function') {
                    throw Error('Invalid parameter conditions[' + i + ']')
                }
            }
        }

        // Check if we have a placeholder component
        if (args.loadingComponent) {
            args.asyncComponent.loading = args.loadingComponent;
            args.asyncComponent.loadingParams = args.loadingParams || undefined;
        }

        // Returns an object that contains all the functions to execute too
        // The _sveltesparouter flag is to confirm the object was created by this router
        const obj = {
            component: args.asyncComponent,
            userData: args.userData,
            conditions: (args.conditions && args.conditions.length) ? args.conditions : undefined,
            props: (args.props && Object.keys(args.props).length) ? args.props : {},
            _sveltesparouter: true
        };

        return obj
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    function parse(str, loose) {
    	if (str instanceof RegExp) return { keys:false, pattern:str };
    	var c, o, tmp, ext, keys=[], pattern='', arr = str.split('/');
    	arr[0] || arr.shift();

    	while (tmp = arr.shift()) {
    		c = tmp[0];
    		if (c === '*') {
    			keys.push('wild');
    			pattern += '/(.*)';
    		} else if (c === ':') {
    			o = tmp.indexOf('?', 1);
    			ext = tmp.indexOf('.', 1);
    			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
    			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
    			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
    		} else {
    			pattern += '/' + tmp;
    		}
    	}

    	return {
    		keys: keys,
    		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
    	};
    }

    /* node_modules/svelte-spa-router/Router.svelte generated by Svelte v3.52.0 */

    function create_else_block$2(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return { props: switch_instance_props };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component(switch_value, switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    	}

    	return {
    		c() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*props*/ 4)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*props*/ ctx[2])])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component(switch_value, switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler_1*/ ctx[7]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};
    }

    // (260:0) {#if componentParams}
    function create_if_block$7(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ params: /*componentParams*/ ctx[1] }, /*props*/ ctx[2]];
    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return { props: switch_instance_props };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component(switch_value, switch_props());
    		switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    	}

    	return {
    		c() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*componentParams, props*/ 6)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*componentParams*/ 2 && { params: /*componentParams*/ ctx[1] },
    					dirty & /*props*/ 4 && get_spread_object(/*props*/ ctx[2])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component(switch_value, switch_props());
    					switch_instance.$on("routeEvent", /*routeEvent_handler*/ ctx[6]);
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};
    }

    function create_fragment$f(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$7, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*componentParams*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    /**
     * @typedef {Object} Location
     * @property {string} location - Location (page/view), for example `/book`
     * @property {string} [querystring] - Querystring from the hash, as a string not parsed
     */
    /**
     * Returns the current location from the hash.
     *
     * @returns {Location} Location object
     * @private
     */
    function getLocation() {
    	const hashPosition = window.location.href.indexOf('#/');

    	let location = hashPosition > -1
    	? window.location.href.substr(hashPosition + 1)
    	: '/';

    	// Check if there's a querystring
    	const qsPosition = location.indexOf('?');

    	let querystring = '';

    	if (qsPosition > -1) {
    		querystring = location.substr(qsPosition + 1);
    		location = location.substr(0, qsPosition);
    	}

    	return { location, querystring };
    }

    const loc = readable(null, // eslint-disable-next-line prefer-arrow-callback
    function start(set) {
    	set(getLocation());

    	const update = () => {
    		set(getLocation());
    	};

    	window.addEventListener('hashchange', update, false);

    	return function stop() {
    		window.removeEventListener('hashchange', update, false);
    	};
    });

    derived(loc, $loc => $loc.location);
    derived(loc, $loc => $loc.querystring);
    const params = writable(undefined);

    async function push(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	// Note: this will include scroll state in history even when restoreScrollState is false
    	history.replaceState(
    		{
    			...history.state,
    			__svelte_spa_router_scrollX: window.scrollX,
    			__svelte_spa_router_scrollY: window.scrollY
    		},
    		undefined
    	);

    	window.location.hash = (location.charAt(0) == '#' ? '' : '#') + location;
    }

    async function replace(location) {
    	if (!location || location.length < 1 || location.charAt(0) != '/' && location.indexOf('#/') !== 0) {
    		throw Error('Invalid parameter location');
    	}

    	// Execute this code when the current call stack is complete
    	await tick();

    	const dest = (location.charAt(0) == '#' ? '' : '#') + location;

    	try {
    		const newState = { ...history.state };
    		delete newState['__svelte_spa_router_scrollX'];
    		delete newState['__svelte_spa_router_scrollY'];
    		window.history.replaceState(newState, undefined, dest);
    	} catch(e) {
    		// eslint-disable-next-line no-console
    		console.warn('Caught exception while replacing the current page. If you\'re running this in the Svelte REPL, please note that the `replace` method might not work in this environment.');
    	}

    	// The method above doesn't trigger the hashchange event, so let's do that manually
    	window.dispatchEvent(new Event('hashchange'));
    }

    function restoreScroll(state) {
    	// If this exists, then this is a back navigation: restore the scroll position
    	if (state) {
    		window.scrollTo(state.__svelte_spa_router_scrollX, state.__svelte_spa_router_scrollY);
    	} else {
    		// Otherwise this is a forward navigation: scroll to top
    		window.scrollTo(0, 0);
    	}
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { routes = {} } = $$props;
    	let { prefix = '' } = $$props;
    	let { restoreScrollState = false } = $$props;

    	/**
     * Container for a route: path, component
     */
    	class RouteItem {
    		/**
     * Initializes the object and creates a regular expression from the path, using regexparam.
     *
     * @param {string} path - Path to the route (must start with '/' or '*')
     * @param {SvelteComponent|WrappedComponent} component - Svelte component for the route, optionally wrapped
     */
    		constructor(path, component) {
    			if (!component || typeof component != 'function' && (typeof component != 'object' || component._sveltesparouter !== true)) {
    				throw Error('Invalid component object');
    			}

    			// Path must be a regular or expression, or a string starting with '/' or '*'
    			if (!path || typeof path == 'string' && (path.length < 1 || path.charAt(0) != '/' && path.charAt(0) != '*') || typeof path == 'object' && !(path instanceof RegExp)) {
    				throw Error('Invalid value for "path" argument - strings must start with / or *');
    			}

    			const { pattern, keys } = parse(path);
    			this.path = path;

    			// Check if the component is wrapped and we have conditions
    			if (typeof component == 'object' && component._sveltesparouter === true) {
    				this.component = component.component;
    				this.conditions = component.conditions || [];
    				this.userData = component.userData;
    				this.props = component.props || {};
    			} else {
    				// Convert the component to a function that returns a Promise, to normalize it
    				this.component = () => Promise.resolve(component);

    				this.conditions = [];
    				this.props = {};
    			}

    			this._pattern = pattern;
    			this._keys = keys;
    		}

    		/**
     * Checks if `path` matches the current route.
     * If there's a match, will return the list of parameters from the URL (if any).
     * In case of no match, the method will return `null`.
     *
     * @param {string} path - Path to test
     * @returns {null|Object.<string, string>} List of paramters from the URL if there's a match, or `null` otherwise.
     */
    		match(path) {
    			// If there's a prefix, check if it matches the start of the path.
    			// If not, bail early, else remove it before we run the matching.
    			if (prefix) {
    				if (typeof prefix == 'string') {
    					if (path.startsWith(prefix)) {
    						path = path.substr(prefix.length) || '/';
    					} else {
    						return null;
    					}
    				} else if (prefix instanceof RegExp) {
    					const match = path.match(prefix);

    					if (match && match[0]) {
    						path = path.substr(match[0].length) || '/';
    					} else {
    						return null;
    					}
    				}
    			}

    			// Check if the pattern matches
    			const matches = this._pattern.exec(path);

    			if (matches === null) {
    				return null;
    			}

    			// If the input was a regular expression, this._keys would be false, so return matches as is
    			if (this._keys === false) {
    				return matches;
    			}

    			const out = {};
    			let i = 0;

    			while (i < this._keys.length) {
    				// In the match parameters, URL-decode all values
    				try {
    					out[this._keys[i]] = decodeURIComponent(matches[i + 1] || '') || null;
    				} catch(e) {
    					out[this._keys[i]] = null;
    				}

    				i++;
    			}

    			return out;
    		}

    		/**
     * Dictionary with route details passed to the pre-conditions functions, as well as the `routeLoading`, `routeLoaded` and `conditionsFailed` events
     * @typedef {Object} RouteDetail
     * @property {string|RegExp} route - Route matched as defined in the route definition (could be a string or a reguar expression object)
     * @property {string} location - Location path
     * @property {string} querystring - Querystring from the hash
     * @property {object} [userData] - Custom data passed by the user
     * @property {SvelteComponent} [component] - Svelte component (only in `routeLoaded` events)
     * @property {string} [name] - Name of the Svelte component (only in `routeLoaded` events)
     */
    		/**
     * Executes all conditions (if any) to control whether the route can be shown. Conditions are executed in the order they are defined, and if a condition fails, the following ones aren't executed.
     * 
     * @param {RouteDetail} detail - Route detail
     * @returns {boolean} Returns true if all the conditions succeeded
     */
    		async checkConditions(detail) {
    			for (let i = 0; i < this.conditions.length; i++) {
    				if (!await this.conditions[i](detail)) {
    					return false;
    				}
    			}

    			return true;
    		}
    	}

    	// Set up all routes
    	const routesList = [];

    	if (routes instanceof Map) {
    		// If it's a map, iterate on it right away
    		routes.forEach((route, path) => {
    			routesList.push(new RouteItem(path, route));
    		});
    	} else {
    		// We have an object, so iterate on its own properties
    		Object.keys(routes).forEach(path => {
    			routesList.push(new RouteItem(path, routes[path]));
    		});
    	}

    	// Props for the component to render
    	let component = null;

    	let componentParams = null;
    	let props = {};

    	// Event dispatcher from Svelte
    	const dispatch = createEventDispatcher();

    	// Just like dispatch, but executes on the next iteration of the event loop
    	async function dispatchNextTick(name, detail) {
    		// Execute this code when the current call stack is complete
    		await tick();

    		dispatch(name, detail);
    	}

    	// If this is set, then that means we have popped into this var the state of our last scroll position
    	let previousScrollState = null;

    	let popStateChanged = null;

    	if (restoreScrollState) {
    		popStateChanged = event => {
    			// If this event was from our history.replaceState, event.state will contain
    			// our scroll history. Otherwise, event.state will be null (like on forward
    			// navigation)
    			if (event.state && (event.state.__svelte_spa_router_scrollY || event.state.__svelte_spa_router_scrollX)) {
    				previousScrollState = event.state;
    			} else {
    				previousScrollState = null;
    			}
    		};

    		// This is removed in the destroy() invocation below
    		window.addEventListener('popstate', popStateChanged);

    		afterUpdate(() => {
    			restoreScroll(previousScrollState);
    		});
    	}

    	// Always have the latest value of loc
    	let lastLoc = null;

    	// Current object of the component loaded
    	let componentObj = null;

    	// Handle hash change events
    	// Listen to changes in the $loc store and update the page
    	// Do not use the $: syntax because it gets triggered by too many things
    	const unsubscribeLoc = loc.subscribe(async newLoc => {
    		lastLoc = newLoc;

    		// Find a route matching the location
    		let i = 0;

    		while (i < routesList.length) {
    			const match = routesList[i].match(newLoc.location);

    			if (!match) {
    				i++;
    				continue;
    			}

    			const detail = {
    				route: routesList[i].path,
    				location: newLoc.location,
    				querystring: newLoc.querystring,
    				userData: routesList[i].userData,
    				params: match && typeof match == 'object' && Object.keys(match).length
    				? match
    				: null
    			};

    			// Check if the route can be loaded - if all conditions succeed
    			if (!await routesList[i].checkConditions(detail)) {
    				// Don't display anything
    				$$invalidate(0, component = null);

    				componentObj = null;

    				// Trigger an event to notify the user, then exit
    				dispatchNextTick('conditionsFailed', detail);

    				return;
    			}

    			// Trigger an event to alert that we're loading the route
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoading', Object.assign({}, detail));

    			// If there's a component to show while we're loading the route, display it
    			const obj = routesList[i].component;

    			// Do not replace the component if we're loading the same one as before, to avoid the route being unmounted and re-mounted
    			if (componentObj != obj) {
    				if (obj.loading) {
    					$$invalidate(0, component = obj.loading);
    					componentObj = obj;
    					$$invalidate(1, componentParams = obj.loadingParams);
    					$$invalidate(2, props = {});

    					// Trigger the routeLoaded event for the loading component
    					// Create a copy of detail so we don't modify the object for the dynamic route (and the dynamic route doesn't modify our object too)
    					dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    						component,
    						name: component.name,
    						params: componentParams
    					}));
    				} else {
    					$$invalidate(0, component = null);
    					componentObj = null;
    				}

    				// Invoke the Promise
    				const loaded = await obj();

    				// Now that we're here, after the promise resolved, check if we still want this component, as the user might have navigated to another page in the meanwhile
    				if (newLoc != lastLoc) {
    					// Don't update the component, just exit
    					return;
    				}

    				// If there is a "default" property, which is used by async routes, then pick that
    				$$invalidate(0, component = loaded && loaded.default || loaded);

    				componentObj = obj;
    			}

    			// Set componentParams only if we have a match, to avoid a warning similar to `<Component> was created with unknown prop 'params'`
    			// Of course, this assumes that developers always add a "params" prop when they are expecting parameters
    			if (match && typeof match == 'object' && Object.keys(match).length) {
    				$$invalidate(1, componentParams = match);
    			} else {
    				$$invalidate(1, componentParams = null);
    			}

    			// Set static props, if any
    			$$invalidate(2, props = routesList[i].props);

    			// Dispatch the routeLoaded event then exit
    			// We need to clone the object on every event invocation so we don't risk the object to be modified in the next tick
    			dispatchNextTick('routeLoaded', Object.assign({}, detail, {
    				component,
    				name: component.name,
    				params: componentParams
    			})).then(() => {
    				params.set(componentParams);
    			});

    			return;
    		}

    		// If we're still here, there was no match, so show the empty component
    		$$invalidate(0, component = null);

    		componentObj = null;
    		params.set(undefined);
    	});

    	onDestroy(() => {
    		unsubscribeLoc();
    		popStateChanged && window.removeEventListener('popstate', popStateChanged);
    	});

    	function routeEvent_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function routeEvent_handler_1(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('routes' in $$props) $$invalidate(3, routes = $$props.routes);
    		if ('prefix' in $$props) $$invalidate(4, prefix = $$props.prefix);
    		if ('restoreScrollState' in $$props) $$invalidate(5, restoreScrollState = $$props.restoreScrollState);
    	};

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*restoreScrollState*/ 32) {
    			// Update history.scrollRestoration depending on restoreScrollState
    			history.scrollRestoration = restoreScrollState ? 'manual' : 'auto';
    		}
    	};

    	return [
    		component,
    		componentParams,
    		props,
    		routes,
    		prefix,
    		restoreScrollState,
    		routeEvent_handler,
    		routeEvent_handler_1
    	];
    }

    class Router extends SvelteComponent {
    	constructor(options) {
    		super();

    		init(this, options, instance$a, create_fragment$f, safe_not_equal, {
    			routes: 3,
    			prefix: 4,
    			restoreScrollState: 5
    		});
    	}
    }

    // List of nodes to update
    const nodes = [];

    // Current location
    let location;

    // Function that updates all nodes marking the active ones
    function checkActive(el) {
        const matchesLocation = el.pattern.test(location);
        toggleClasses(el, el.className, matchesLocation);
        toggleClasses(el, el.inactiveClassName, !matchesLocation);
    }

    function toggleClasses(el, className, shouldAdd) {
        (className || '').split(' ').forEach((cls) => {
            if (!cls) {
                return
            }
            // Remove the class firsts
            el.node.classList.remove(cls);

            // If the pattern doesn't match, then set the class
            if (shouldAdd) {
                el.node.classList.add(cls);
            }
        });
    }

    // Listen to changes in the location
    loc.subscribe((value) => {
        // Update the location
        location = value.location + (value.querystring ? '?' + value.querystring : '');

        // Update all nodes
        nodes.map(checkActive);
    });

    /**
     * @typedef {Object} ActiveOptions
     * @property {string|RegExp} [path] - Path expression that makes the link active when matched (must start with '/' or '*'); default is the link's href
     * @property {string} [className] - CSS class to apply to the element when active; default value is "active"
     */

    /**
     * Svelte Action for automatically adding the "active" class to elements (links, or any other DOM element) when the current location matches a certain path.
     * 
     * @param {HTMLElement} node - The target node (automatically set by Svelte)
     * @param {ActiveOptions|string|RegExp} [opts] - Can be an object of type ActiveOptions, or a string (or regular expressions) representing ActiveOptions.path.
     * @returns {{destroy: function(): void}} Destroy function
     */
    function active(node, opts) {
        // Check options
        if (opts && (typeof opts == 'string' || (typeof opts == 'object' && opts instanceof RegExp))) {
            // Interpret strings and regular expressions as opts.path
            opts = {
                path: opts
            };
        }
        else {
            // Ensure opts is a dictionary
            opts = opts || {};
        }

        // Path defaults to link target
        if (!opts.path && node.hasAttribute('href')) {
            opts.path = node.getAttribute('href');
            if (opts.path && opts.path.length > 1 && opts.path.charAt(0) == '#') {
                opts.path = opts.path.substring(1);
            }
        }

        // Default class name
        if (!opts.className) {
            opts.className = 'active';
        }

        // If path is a string, it must start with '/' or '*'
        if (!opts.path || 
            typeof opts.path == 'string' && (opts.path.length < 1 || (opts.path.charAt(0) != '/' && opts.path.charAt(0) != '*'))
        ) {
            throw Error('Invalid value for "path" argument')
        }

        // If path is not a regular expression already, make it
        const {pattern} = typeof opts.path == 'string' ?
            parse(opts.path) :
            {pattern: opts.path};

        // Add the node to the list
        const el = {
            node,
            className: opts.className,
            inactiveClassName: opts.inactiveClassName,
            pattern
        };
        nodes.push(el);

        // Trigger the action right away
        checkActive(el);

        return {
            // When the element is destroyed, remove it from the list
            destroy() {
                nodes.splice(nodes.indexOf(el), 1);
            }
        }
    }

    /* src/components/Navbar.svelte generated by Svelte v3.52.0 */

    function create_fragment$e(ctx) {
    	let nav;
    	let div1;
    	let button0;
    	let t0;
    	let div0;
    	let a0;
    	let t2;
    	let ul;
    	let li0;
    	let a1;
    	let t4;
    	let li1;
    	let a2;
    	let t6;
    	let li2;
    	let a3;
    	let t8;
    	let li3;
    	let a4;
    	let t10;
    	let form;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			nav = element("nav");
    			div1 = element("div");
    			button0 = element("button");
    			button0.innerHTML = `<span class="navbar-toggler-icon"></span>`;
    			t0 = space();
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "App";
    			t2 = space();
    			ul = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			a1.textContent = "ISP";
    			t4 = space();
    			li1 = element("li");
    			a2 = element("a");
    			a2.textContent = "Korisnici";
    			t6 = space();
    			li2 = element("li");
    			a3 = element("a");
    			a3.textContent = "Uplatnice";
    			t8 = space();
    			li3 = element("li");
    			a4 = element("a");
    			a4.textContent = "Odjava";
    			t10 = space();
    			form = element("form");

    			form.innerHTML = `<input class="form-control me-2" type="search" placeholder="Pretraži" aria-label="Search"/> 
        <button class="btn btn-outline-success" type="submit">Pretraži</button>`;

    			attr(button0, "class", "navbar-toggler");
    			attr(button0, "type", "button");
    			attr(button0, "data-bs-toggle", "collapse");
    			attr(button0, "data-bs-target", "#navbarTogglerDemo01");
    			attr(button0, "aria-controls", "navbarTogglerDemo01");
    			attr(button0, "aria-expanded", "false");
    			attr(button0, "aria-label", "Toggle navigation");
    			attr(a0, "class", "navbar-brand");
    			attr(a0, "href", "#");
    			attr(a1, "class", "nav-link");
    			attr(a1, "aria-current", "page");
    			attr(a1, "href", "/#/isp");
    			attr(li0, "class", "nav-item");
    			attr(a2, "class", "nav-link");
    			attr(a2, "aria-current", "page");
    			attr(a2, "href", "/#/customer");
    			attr(li1, "class", "nav-item");
    			attr(a3, "class", "nav-link");
    			attr(a3, "aria-current", "page");
    			attr(a3, "href", "/#/uplatnica");
    			attr(li2, "class", "nav-item");
    			attr(a4, "class", "nav-link");
    			attr(a4, "aria-current", "page");
    			attr(a4, "href", "/#/signin");
    			attr(li3, "class", "nav-item");
    			attr(ul, "class", "navbar-nav me-auto mb-2 mb-lg-0");
    			attr(form, "class", "d-flex");
    			attr(div0, "class", "collapse navbar-collapse");
    			attr(div0, "id", "navbarTogglerDemo01");
    			attr(div1, "class", "container-fluid");
    			attr(nav, "class", "navbar fixed-top navbar-expand-lg navbar-light bg-light");
    		},
    		m(target, anchor) {
    			insert(target, nav, anchor);
    			append(nav, div1);
    			append(div1, button0);
    			append(div1, t0);
    			append(div1, div0);
    			append(div0, a0);
    			append(div0, t2);
    			append(div0, ul);
    			append(ul, li0);
    			append(li0, a1);
    			append(ul, t4);
    			append(ul, li1);
    			append(li1, a2);
    			append(ul, t6);
    			append(ul, li2);
    			append(li2, a3);
    			append(ul, t8);
    			append(ul, li3);
    			append(li3, a4);
    			append(div0, t10);
    			append(div0, form);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(active.call(null, a1, {
    						path: "/#/isp/*",
    						className: "active",
    						inactiveClassName: "inactive"
    					})),
    					action_destroyer(active.call(null, a2, {
    						path: "/#/customer/*",
    						className: "active",
    						inactiveClassName: "inactive"
    					})),
    					action_destroyer(active.call(null, a3, {
    						path: "/#/uplatnica/*",
    						className: "active",
    						inactiveClassName: "inactive"
    					})),
    					action_destroyer(active.call(null, a4, {
    						path: "/#/signin/",
    						className: "active",
    						inactiveClassName: "inactive"
    					})),
    					listen(a4, "click", /*signout*/ ctx[0])
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(nav);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$9($$self) {
    	function signout() {
    		localStorage.removeItem("user");
    		store$1.store.update(state => ({ ...state, user: null }));
    	}

    	return [signout];
    }

    class Navbar extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$9, create_fragment$e, safe_not_equal, {});
    	}
    }

    const store = writable({
        user: localStorage.getItem("user"),
        signin: false,
        customer: null,
        customers: [],
        isps: [],
        paymentSlips: [],
    });

    var config = {
        url: "http://192.168.43.79:3000",
    };

    function authorization() {
        var _a;
        let user = localStorage.getItem("user");
        if (user)
            user = JSON.parse(user);
        return `Bearer ${(_a = user === null || user === void 0 ? void 0 : user.token) !== null && _a !== void 0 ? _a : ""}`;
    }
    function unauthorized(res) {
        if (res.status === 401) {
            store.update((state) => ({ ...state, user: null }));
            push("#/signin");
        }
    }
    function unauthorizedError(err) {
        if (err.statusCode === 401) {
            store.update((state) => ({ ...state, user: null }));
            push("#/signin");
            throw err;
        }
    }
    async function login(params) {
        return fetch(`${config.url}/auth`, {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(params),
        })
            .then(async (res) => {
            unauthorized(res);
            let item = await res.json();
            return item;
        })
            .catch((err) => {
            unauthorizedError(err);
        });
    }
    async function getIsp(id) {
        fetch(`${config.url}/isp/${id}`, {
            headers: {
                accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then(async (res) => {
            unauthorized(res);
            let item = await res.json();
            return item;
        })
            .catch((err) => {
            unauthorizedError(err);
        });
    }
    async function getPaymentSlips() {
        return fetch(`${config.url}/payment-slip`, {
            headers: {
                "Content-Type": "application/json",
                accept: "application/json",
                authorization: authorization(),
            },
        })
            .then(async (res) => {
            unauthorized(res);
            let item = await res.json();
            store.update((state) => ({ ...state, paymentSlips: item }));
            return item;
        })
            .catch((err) => {
            unauthorizedError(err);
        });
    }

    /* src/routes/Signin.svelte generated by Svelte v3.52.0 */

    function create_if_block$6(ctx) {
    	let p;
    	let span;
    	let strong;
    	let t;

    	return {
    		c() {
    			p = element("p");
    			span = element("span");
    			strong = element("strong");
    			t = text(/*error*/ ctx[1]);
    			attr(span, "class", "mt-4");
    			set_style(span, "color", "red");
    			attr(p, "class", "mt-4 mb-2");
    		},
    		m(target, anchor) {
    			insert(target, p, anchor);
    			append(p, span);
    			append(span, strong);
    			append(strong, t);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*error*/ 2) set_data(t, /*error*/ ctx[1]);
    		},
    		d(detaching) {
    			if (detaching) detach(p);
    		}
    	};
    }

    function create_fragment$d(ctx) {
    	let div3;
    	let main;
    	let form;
    	let img;
    	let img_src_value;
    	let t0;
    	let h1;
    	let t2;
    	let div0;
    	let input0;
    	let t3;
    	let label0;
    	let t5;
    	let div1;
    	let input1;
    	let t6;
    	let label1;
    	let t8;
    	let div2;
    	let t10;
    	let button;
    	let t12;
    	let t13;
    	let p;
    	let mounted;
    	let dispose;
    	let if_block = /*error*/ ctx[1] && create_if_block$6(ctx);

    	return {
    		c() {
    			div3 = element("div");
    			main = element("main");
    			form = element("form");
    			img = element("img");
    			t0 = space();
    			h1 = element("h1");
    			h1.textContent = "Prijava";
    			t2 = space();
    			div0 = element("div");
    			input0 = element("input");
    			t3 = space();
    			label0 = element("label");
    			label0.textContent = "Korisničko ime";
    			t5 = space();
    			div1 = element("div");
    			input1 = element("input");
    			t6 = space();
    			label1 = element("label");
    			label1.textContent = "Zaporka";
    			t8 = space();
    			div2 = element("div");
    			div2.innerHTML = `<label><input type="checkbox" value="remember-me"/> Zapamti me</label>`;
    			t10 = space();
    			button = element("button");
    			button.textContent = "Prijava";
    			t12 = space();
    			if (if_block) if_block.c();
    			t13 = space();
    			p = element("p");
    			p.textContent = "© 2021";
    			attr(img, "class", "mb-4");
    			if (!src_url_equal(img.src, img_src_value = "/public/logo.png")) attr(img, "src", img_src_value);
    			attr(img, "alt", "");
    			attr(img, "width", "72");
    			attr(img, "height", "57");
    			attr(h1, "class", "h3 mb-3 fw-normal");
    			attr(input0, "type", "username");
    			attr(input0, "class", "form-control");
    			attr(input0, "id", "floatingInput");
    			attr(input0, "placeholder", "Korisničko ime");
    			attr(label0, "for", "floatingInput");
    			attr(div0, "class", "form-floating");
    			attr(input1, "type", "password");
    			attr(input1, "class", "form-control");
    			attr(input1, "id", "floatingPassword");
    			attr(input1, "placeholder", "Zaporka");
    			attr(label1, "for", "floatingPassword");
    			attr(div1, "class", "form-floating");
    			attr(div2, "class", "checkbox mb-3");
    			attr(button, "class", "w-100 btn btn-lg btn-primary");
    			attr(button, "type", "submit");
    			attr(p, "class", "mt-5 mb-3 text-muted");
    			attr(main, "class", "form-signin");
    			attr(div3, "class", "text-center container mt-4");
    		},
    		m(target, anchor) {
    			insert(target, div3, anchor);
    			append(div3, main);
    			append(main, form);
    			append(form, img);
    			append(form, t0);
    			append(form, h1);
    			append(form, t2);
    			append(form, div0);
    			append(div0, input0);
    			set_input_value(input0, /*user*/ ctx[0].username);
    			append(div0, t3);
    			append(div0, label0);
    			append(form, t5);
    			append(form, div1);
    			append(div1, input1);
    			set_input_value(input1, /*user*/ ctx[0].password);
    			append(div1, t6);
    			append(div1, label1);
    			append(form, t8);
    			append(form, div2);
    			append(form, t10);
    			append(form, button);
    			append(form, t12);
    			if (if_block) if_block.m(form, null);
    			append(form, t13);
    			append(form, p);

    			if (!mounted) {
    				dispose = [
    					listen(input0, "input", /*input0_input_handler*/ ctx[3]),
    					listen(input1, "input", /*input1_input_handler*/ ctx[4]),
    					listen(form, "submit", prevent_default(/*submit*/ ctx[2]))
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*user*/ 1) {
    				set_input_value(input0, /*user*/ ctx[0].username);
    			}

    			if (dirty & /*user*/ 1 && input1.value !== /*user*/ ctx[0].password) {
    				set_input_value(input1, /*user*/ ctx[0].password);
    			}

    			if (/*error*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					if_block.m(form, t13);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div3);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let user = { username: "", password: "" };
    	let error = null;
    	store$1.store.update(state => ({ ...state, user: null }));

    	function submit() {
    		login(user).then(res => {
    			if ((res === null || res === void 0 ? void 0 : res.statusCode) === 401 || (res === null || res === void 0 ? void 0 : res.statusCode) === 404 || (res === null || res === void 0 ? void 0 : res.statusCode) === 500) {
    				console.error(res);
    				$$invalidate(1, error = res.message);
    			} else {
    				$$invalidate(1, error = null);
    				localStorage.setItem("user", JSON.stringify(res));
    				store$1.store.update(state => ({ ...state, user: res }));
    				replace("#/customer");
    			}
    		});
    	}

    	function input0_input_handler() {
    		user.username = this.value;
    		$$invalidate(0, user);
    	}

    	function input1_input_handler() {
    		user.password = this.value;
    		$$invalidate(0, user);
    	}

    	return [user, error, submit, input0_input_handler, input1_input_handler];
    }

    class Signin extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$8, create_fragment$d, safe_not_equal, {});
    	}
    }

    /* src/routes/Home.svelte generated by Svelte v3.52.0 */

    class Home extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, null, safe_not_equal, {});
    	}
    }

    /* src/routes/Isps.svelte generated by Svelte v3.52.0 */

    function create_fragment$c(ctx) {
    	let isplist;
    	let current;
    	isplist = new ISPList__default["default"]({});

    	return {
    		c() {
    			create_component(isplist.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(isplist, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(isplist.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(isplist.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(isplist, detaching);
    		}
    	};
    }

    class Isps extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$c, safe_not_equal, {});
    	}
    }

    let primatelj = {
        naziv_primatelja: "TEHNICORE d.o.o.",
        ulica_i_broj_primatelja: "Sveti Jakov 116",
        postanski_i_grad_primatelja: `47300 Ogulin`,
        iban_primatelja: "HR1723600001101234565",
    };
    let isp = {
        id: undefined,
        name: null,
        street: null,
        postalCode: null,
        city: null,
        oib: null,
        iban: null,
    };

    function setPaymentSlip({ isp, customer }) {
        return {
            id: null,
            poziv_na_broj_platitelja: "",
            poziv_na_broj_primatelja: "",
            iznos: Math.floor(Math.random() * (999999 - 100 + 1)) + 100,
            iban_primatelja: primatelj.iban_primatelja,
            iban_platitelja: "",
            model_primatelja: "",
            model_platitelja: "",
            sifra_namjene: "",
            datum_izvrsenja: "",
            valuta_placanja: "EUR",
            // Samo vrijednost X ili ništa
            hitno: "X",
            ime_i_prezime_platitelja: customer === null || customer === void 0 ? void 0 : customer.naziv,
            ulica_i_broj_platitelja: customer === null || customer === void 0 ? void 0 : customer.adresa,
            ulica_i_broj_primatelja: primatelj.ulica_i_broj_primatelja,
            postanski_i_grad_platitelja: `${customer === null || customer === void 0 ? void 0 : customer.pošta} ${customer === null || customer === void 0 ? void 0 : customer.adresa}`,
            postanski_i_grad_primatelja: primatelj.postanski_i_grad_primatelja,
            naziv_primatelja: primatelj.naziv_primatelja,
            opis_placanja: "Opis uplate",
            nalog: "-",
            customer_id: Number(customer.id),
            isp_id: isp === null || isp === void 0 ? void 0 : isp.id,
        };
    }

    /* src/routes/Isp.svelte generated by Svelte v3.52.0 */

    function create_fragment$b(ctx) {
    	let h3;
    	let t0_value = (/*isp*/ ctx[0]?.name ?? "...") + "";
    	let t0;
    	let t1;
    	let div;
    	let p0;
    	let t2;
    	let t3_value = /*isp*/ ctx[0]?.id + "";
    	let t3;
    	let t4;
    	let p1;
    	let t5;
    	let t6_value = /*isp*/ ctx[0]?.street + "";
    	let t6;
    	let t7;
    	let p2;
    	let t8;
    	let t9_value = /*isp*/ ctx[0]?.postalCode + "";
    	let t9;
    	let t10;
    	let p3;
    	let t11;
    	let t12_value = /*isp*/ ctx[0]?.city + "";
    	let t12;
    	let t13;
    	let p4;
    	let t14;
    	let t15_value = /*isp*/ ctx[0]?.oib + "";
    	let t15;
    	let t16;
    	let p5;
    	let t17;
    	let t18_value = /*isp*/ ctx[0]?.iban + "";
    	let t18;
    	let t19;
    	let span;

    	return {
    		c() {
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			div = element("div");
    			p0 = element("p");
    			t2 = text("ID: ");
    			t3 = text(t3_value);
    			t4 = space();
    			p1 = element("p");
    			t5 = text("Ulica: ");
    			t6 = text(t6_value);
    			t7 = space();
    			p2 = element("p");
    			t8 = text("Poštanski broj: ");
    			t9 = text(t9_value);
    			t10 = space();
    			p3 = element("p");
    			t11 = text("Grad: ");
    			t12 = text(t12_value);
    			t13 = space();
    			p4 = element("p");
    			t14 = text("OIB: ");
    			t15 = text(t15_value);
    			t16 = space();
    			p5 = element("p");
    			t17 = text("IBAN: ");
    			t18 = text(t18_value);
    			t19 = space();
    			span = element("span");
    			span.innerHTML = `<a class="btn btn-secondary" href="/#/isp">Natrag</a>`;
    			set_style(h3, "text-align", "center");
    		},
    		m(target, anchor) {
    			insert(target, h3, anchor);
    			append(h3, t0);
    			insert(target, t1, anchor);
    			insert(target, div, anchor);
    			append(div, p0);
    			append(p0, t2);
    			append(p0, t3);
    			append(div, t4);
    			append(div, p1);
    			append(p1, t5);
    			append(p1, t6);
    			append(div, t7);
    			append(div, p2);
    			append(p2, t8);
    			append(p2, t9);
    			append(div, t10);
    			append(div, p3);
    			append(p3, t11);
    			append(p3, t12);
    			append(div, t13);
    			append(div, p4);
    			append(p4, t14);
    			append(p4, t15);
    			append(div, t16);
    			append(div, p5);
    			append(p5, t17);
    			append(p5, t18);
    			insert(target, t19, anchor);
    			insert(target, span, anchor);
    		},
    		p(ctx, [dirty]) {
    			if (dirty & /*isp*/ 1 && t0_value !== (t0_value = (/*isp*/ ctx[0]?.name ?? "...") + "")) set_data(t0, t0_value);
    			if (dirty & /*isp*/ 1 && t3_value !== (t3_value = /*isp*/ ctx[0]?.id + "")) set_data(t3, t3_value);
    			if (dirty & /*isp*/ 1 && t6_value !== (t6_value = /*isp*/ ctx[0]?.street + "")) set_data(t6, t6_value);
    			if (dirty & /*isp*/ 1 && t9_value !== (t9_value = /*isp*/ ctx[0]?.postalCode + "")) set_data(t9, t9_value);
    			if (dirty & /*isp*/ 1 && t12_value !== (t12_value = /*isp*/ ctx[0]?.city + "")) set_data(t12, t12_value);
    			if (dirty & /*isp*/ 1 && t15_value !== (t15_value = /*isp*/ ctx[0]?.oib + "")) set_data(t15, t15_value);
    			if (dirty & /*isp*/ 1 && t18_value !== (t18_value = /*isp*/ ctx[0]?.iban + "")) set_data(t18, t18_value);
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(h3);
    			if (detaching) detach(t1);
    			if (detaching) detach(div);
    			if (detaching) detach(t19);
    			if (detaching) detach(span);
    		}
    	};
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { params = {} } = $$props;
    	let isp;
    	getIsp(params.id).then(item => $$invalidate(0, isp = item));

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(1, params = $$props.params);
    	};

    	return [isp, params];
    }

    class Isp extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$7, create_fragment$b, safe_not_equal, { params: 1 });
    	}
    }

    /* src/routes/CustomerPaymentSlips.svelte generated by Svelte v3.52.0 */

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[26] = list[i];
    	child_ctx[27] = list;
    	child_ctx[28] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[29] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[32] = list[i];
    	child_ctx[33] = list;
    	child_ctx[28] = i;
    	return child_ctx;
    }

    // (84:0) {#if !barcodeOnlyPrint}
    function create_if_block_3(ctx) {
    	let div;
    	let current;
    	let each_value_2 = /*paymentSlips*/ ctx[2];
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	return {
    		c() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr(div, "class", "print");
    			set_style(div, "--scale", /*scale*/ ctx[5]);
    			set_style(div, "--print-margin-top", /*topMargin*/ ctx[6] + "px");
    			set_style(div, "--print-margin-left", /*leftMargin*/ ctx[7] + "px");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*bottomMarginItem, textOnlyPrint, showDecimalOnPaymentSlips, paymentSlips*/ 780) {
    				each_value_2 = /*paymentSlips*/ ctx[2];
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty[0] & /*scale*/ 32) {
    				set_style(div, "--scale", /*scale*/ ctx[5]);
    			}

    			if (!current || dirty[0] & /*topMargin*/ 64) {
    				set_style(div, "--print-margin-top", /*topMargin*/ ctx[6] + "px");
    			}

    			if (!current || dirty[0] & /*leftMargin*/ 128) {
    				set_style(div, "--print-margin-left", /*leftMargin*/ ctx[7] + "px");
    			}
    		},
    		i(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    // (90:4) {#each paymentSlips as model, i}
    function create_each_block_2(ctx) {
    	let div;
    	let paymentslip;
    	let updating_model;
    	let t;
    	let current;

    	function paymentslip_model_binding(value) {
    		/*paymentslip_model_binding*/ ctx[16](value, /*model*/ ctx[32], /*each_value_2*/ ctx[33], /*i*/ ctx[28]);
    	}

    	let paymentslip_props = {
    		printing: true,
    		textOnlyPrint: /*textOnlyPrint*/ ctx[3],
    		showDecimalOnPaymentSlips: /*showDecimalOnPaymentSlips*/ ctx[9]
    	};

    	if (/*model*/ ctx[32] !== void 0) {
    		paymentslip_props.model = /*model*/ ctx[32];
    	}

    	paymentslip = new PaymentSlip__default["default"]({ props: paymentslip_props });
    	binding_callbacks.push(() => bind(paymentslip, 'model', paymentslip_model_binding));

    	return {
    		c() {
    			div = element("div");
    			create_component(paymentslip.$$.fragment);
    			t = space();
    			attr(div, "class", "print-item");
    			set_style(div, "--print-item-margin-bottom", /*bottomMarginItem*/ ctx[8] + "px");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(paymentslip, div, null);
    			append(div, t);
    			current = true;
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			const paymentslip_changes = {};
    			if (dirty[0] & /*textOnlyPrint*/ 8) paymentslip_changes.textOnlyPrint = /*textOnlyPrint*/ ctx[3];
    			if (dirty[0] & /*showDecimalOnPaymentSlips*/ 512) paymentslip_changes.showDecimalOnPaymentSlips = /*showDecimalOnPaymentSlips*/ ctx[9];

    			if (!updating_model && dirty[0] & /*paymentSlips*/ 4) {
    				updating_model = true;
    				paymentslip_changes.model = /*model*/ ctx[32];
    				add_flush_callback(() => updating_model = false);
    			}

    			paymentslip.$set(paymentslip_changes);

    			if (!current || dirty[0] & /*bottomMarginItem*/ 256) {
    				set_style(div, "--print-item-margin-bottom", /*bottomMarginItem*/ ctx[8] + "px");
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(paymentslip.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(paymentslip.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(paymentslip);
    		}
    	};
    }

    // (107:0) {#if paymentSlips.length > 0}
    function create_if_block_2(ctx) {
    	let div;
    	let paymentsliptable;
    	let t;
    	let br;
    	let current;

    	paymentsliptable = new PaymentSlipTable__default["default"]({
    			props: { paymentSlips: /*paymentSlips*/ ctx[2] }
    		});

    	return {
    		c() {
    			div = element("div");
    			create_component(paymentsliptable.$$.fragment);
    			t = space();
    			br = element("br");
    			attr(div, "class", "noprint");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(paymentsliptable, div, null);
    			insert(target, t, anchor);
    			insert(target, br, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const paymentsliptable_changes = {};
    			if (dirty[0] & /*paymentSlips*/ 4) paymentsliptable_changes.paymentSlips = /*paymentSlips*/ ctx[2];
    			paymentsliptable.$set(paymentsliptable_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(paymentsliptable.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(paymentsliptable.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(paymentsliptable);
    			if (detaching) detach(t);
    			if (detaching) detach(br);
    		}
    	};
    }

    // (114:0) {#if paymentSlips.length > 0}
    function create_if_block_1(ctx) {
    	let fieldset;
    	let div0;
    	let input0;
    	let t0;
    	let label0;
    	let t2;
    	let div1;
    	let button0;
    	let t4;
    	let ul;
    	let t5;
    	let button1;
    	let t7;
    	let button2;
    	let t9;
    	let button3;
    	let t11;
    	let form;
    	let div6;
    	let div2;
    	let label1;
    	let t13;
    	let input1;
    	let t14;
    	let div3;
    	let label2;
    	let t16;
    	let input2;
    	let t17;
    	let div4;
    	let label3;
    	let t19;
    	let input3;
    	let t20;
    	let div5;
    	let label4;
    	let t22;
    	let input4;
    	let t23;
    	let br;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*isps*/ ctx[1];
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	return {
    		c() {
    			fieldset = element("fieldset");
    			div0 = element("div");
    			input0 = element("input");
    			t0 = space();
    			label0 = element("label");
    			label0.textContent = "Prikaz decimale na uplatnici";
    			t2 = space();
    			div1 = element("div");
    			button0 = element("button");
    			button0.textContent = "Novi nalog";
    			t4 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			button1 = element("button");
    			button1.textContent = "Print";
    			t7 = space();
    			button2 = element("button");
    			button2.textContent = "Print bez slike";
    			t9 = space();
    			button3 = element("button");
    			button3.textContent = "Print barkodova";
    			t11 = space();
    			form = element("form");
    			div6 = element("div");
    			div2 = element("div");
    			label1 = element("label");
    			label1.textContent = "Skala uplatnica";
    			t13 = space();
    			input1 = element("input");
    			t14 = space();
    			div3 = element("div");
    			label2 = element("label");
    			label2.textContent = "Gornja margina";
    			t16 = space();
    			input2 = element("input");
    			t17 = space();
    			div4 = element("div");
    			label3 = element("label");
    			label3.textContent = "Lijeva margina";
    			t19 = space();
    			input3 = element("input");
    			t20 = space();
    			div5 = element("div");
    			label4 = element("label");
    			label4.textContent = "Donja margina uplatnica";
    			t22 = space();
    			input4 = element("input");
    			t23 = space();
    			br = element("br");
    			attr(input0, "class", "form-check-input");
    			attr(input0, "type", "checkbox");
    			attr(input0, "id", "showDecimalOnPaymentSlips");
    			attr(label0, "class", "form-check-label");
    			attr(label0, "for", "showDecimalOnPaymentSlips");
    			attr(div0, "class", "form-check text-center");
    			set_style(div0, "width", "250px");
    			set_style(div0, "margin", "0 auto");
    			attr(button0, "class", "btn btn-primary btn-sm dropdown-toggle");
    			attr(button0, "type", "button");
    			attr(button0, "name", "novi-nalog");
    			attr(button0, "id", "dropdownMenuButton1");
    			attr(button0, "data-bs-toggle", "dropdown");
    			attr(button0, "aria-expanded", "false");
    			attr(ul, "class", "dropdown-menu");
    			attr(ul, "aria-labelledby", "dropdownMenuButton1");
    			attr(div1, "class", "dropdown");
    			set_style(div1, "display", "inline-block");
    			attr(button1, "class", "btn btn-warning btn-sm");
    			attr(button2, "class", "btn btn-warning btn-sm");
    			attr(button3, "class", "btn btn-warning btn-sm");
    			attr(label1, "for", "scale");
    			attr(input1, "class", "form-control");
    			attr(input1, "id", "scale");
    			attr(input1, "name", "scale");
    			attr(input1, "type", "number");
    			attr(input1, "step", "0.1");
    			attr(input1, "min", "0.00");
    			attr(input1, "max", "1.00");
    			attr(div2, "class", "mb-2 col-md-2 col-sm-6");
    			attr(label2, "for", "topMargin");
    			attr(input2, "class", "form-control");
    			attr(input2, "id", "topMargin");
    			attr(input2, "name", "topMargin");
    			attr(input2, "type", "number");
    			attr(div3, "class", "mb-2 col-md-2 col-sm-6");
    			attr(label3, "for", "leftMargin");
    			attr(input3, "class", "form-control");
    			attr(input3, "id", "leftMargin");
    			attr(input3, "name", "leftMargin");
    			attr(input3, "type", "number");
    			attr(div4, "class", "mb-2 col-md-2 col-sm-6");
    			attr(label4, "for", "topMargin");
    			attr(input4, "class", "form-control");
    			attr(input4, "id", "bottomMarginItem");
    			attr(input4, "name", "bottomMarginItem");
    			attr(input4, "type", "number");
    			attr(div5, "class", "mb-2 col-md-2 col-sm-6");
    			attr(div6, "class", "row justify-content-center");
    			attr(fieldset, "class", "noprint");
    			set_style(fieldset, "text-align", "center");
    		},
    		m(target, anchor) {
    			insert(target, fieldset, anchor);
    			append(fieldset, div0);
    			append(div0, input0);
    			input0.checked = /*showDecimalOnPaymentSlips*/ ctx[9];
    			append(div0, t0);
    			append(div0, label0);
    			append(fieldset, t2);
    			append(fieldset, div1);
    			append(div1, button0);
    			append(div1, t4);
    			append(div1, ul);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			append(fieldset, t5);
    			append(fieldset, button1);
    			append(fieldset, t7);
    			append(fieldset, button2);
    			append(fieldset, t9);
    			append(fieldset, button3);
    			append(fieldset, t11);
    			append(fieldset, form);
    			append(form, div6);
    			append(div6, div2);
    			append(div2, label1);
    			append(div2, t13);
    			append(div2, input1);
    			set_input_value(input1, /*scale*/ ctx[5]);
    			append(div6, t14);
    			append(div6, div3);
    			append(div3, label2);
    			append(div3, t16);
    			append(div3, input2);
    			set_input_value(input2, /*topMargin*/ ctx[6]);
    			append(div6, t17);
    			append(div6, div4);
    			append(div4, label3);
    			append(div4, t19);
    			append(div4, input3);
    			set_input_value(input3, /*leftMargin*/ ctx[7]);
    			append(div6, t20);
    			append(div6, div5);
    			append(div5, label4);
    			append(div5, t22);
    			append(div5, input4);
    			set_input_value(input4, /*bottomMarginItem*/ ctx[8]);
    			insert(target, t23, anchor);
    			insert(target, br, anchor);

    			if (!mounted) {
    				dispose = [
    					listen(input0, "change", /*input0_change_handler*/ ctx[17]),
    					listen(input0, "change", /*submitGlobalSetting*/ ctx[14]),
    					listen(button1, "click", /*printWithBackground*/ ctx[10]),
    					listen(button2, "click", /*printTextOnly*/ ctx[11]),
    					listen(button3, "click", /*printBarcodes*/ ctx[12]),
    					listen(input1, "change", /*submitGlobalSetting*/ ctx[14]),
    					listen(input1, "input", /*input1_input_handler*/ ctx[19]),
    					listen(input2, "change", /*submitGlobalSetting*/ ctx[14]),
    					listen(input2, "input", /*input2_input_handler*/ ctx[20]),
    					listen(input3, "change", /*submitGlobalSetting*/ ctx[14]),
    					listen(input3, "input", /*input3_input_handler*/ ctx[21]),
    					listen(input4, "change", /*submitGlobalSetting*/ ctx[14]),
    					listen(input4, "input", /*input4_input_handler*/ ctx[22]),
    					listen(form, "submit", prevent_default(/*submitGlobalSetting*/ ctx[14]))
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty[0] & /*showDecimalOnPaymentSlips*/ 512) {
    				input0.checked = /*showDecimalOnPaymentSlips*/ ctx[9];
    			}

    			if (dirty[0] & /*addPaymentSlip, isps*/ 8194) {
    				each_value_1 = /*isps*/ ctx[1];
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty[0] & /*scale*/ 32 && to_number(input1.value) !== /*scale*/ ctx[5]) {
    				set_input_value(input1, /*scale*/ ctx[5]);
    			}

    			if (dirty[0] & /*topMargin*/ 64 && to_number(input2.value) !== /*topMargin*/ ctx[6]) {
    				set_input_value(input2, /*topMargin*/ ctx[6]);
    			}

    			if (dirty[0] & /*leftMargin*/ 128 && to_number(input3.value) !== /*leftMargin*/ ctx[7]) {
    				set_input_value(input3, /*leftMargin*/ ctx[7]);
    			}

    			if (dirty[0] & /*bottomMarginItem*/ 256 && to_number(input4.value) !== /*bottomMarginItem*/ ctx[8]) {
    				set_input_value(input4, /*bottomMarginItem*/ ctx[8]);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(fieldset);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach(t23);
    			if (detaching) detach(br);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    // (141:8) {#each isps as isp}
    function create_each_block_1(ctx) {
    	let li;
    	let button;
    	let t0_value = /*isp*/ ctx[29].name + "";
    	let t0;
    	let t1;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[18](/*isp*/ ctx[29]);
    	}

    	return {
    		c() {
    			li = element("li");
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			attr(button, "class", "dropdown-item");
    		},
    		m(target, anchor) {
    			insert(target, li, anchor);
    			append(li, button);
    			append(button, t0);
    			append(li, t1);

    			if (!mounted) {
    				dispose = listen(button, "click", click_handler);
    				mounted = true;
    			}
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*isps*/ 2 && t0_value !== (t0_value = /*isp*/ ctx[29].name + "")) set_data(t0, t0_value);
    		},
    		d(detaching) {
    			if (detaching) detach(li);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    // (245:2) {:else}
    function create_else_block$1(ctx) {
    	return { c: noop, m: noop, d: noop };
    }

    // (216:2) {#each paymentSlips as item, i}
    function create_each_block(ctx) {
    	let div2;
    	let h2;
    	let button;
    	let strong;
    	let t0;
    	let t1_value = /*item*/ ctx[26]?.mjesec + "";
    	let t1;
    	let t2;
    	let div1;
    	let div0;
    	let paymentslip;
    	let updating_model;
    	let t3;
    	let current;

    	function paymentslip_model_binding_1(value) {
    		/*paymentslip_model_binding_1*/ ctx[23](value, /*item*/ ctx[26], /*each_value*/ ctx[27], /*i*/ ctx[28]);
    	}

    	let paymentslip_props = {
    		textOnlyPrint: /*textOnlyPrint*/ ctx[3],
    		showDecimalOnPaymentSlips: /*showDecimalOnPaymentSlips*/ ctx[9]
    	};

    	if (/*item*/ ctx[26] !== void 0) {
    		paymentslip_props.model = /*item*/ ctx[26];
    	}

    	paymentslip = new PaymentSlip__default["default"]({ props: paymentslip_props });
    	binding_callbacks.push(() => bind(paymentslip, 'model', paymentslip_model_binding_1));

    	return {
    		c() {
    			div2 = element("div");
    			h2 = element("h2");
    			button = element("button");
    			strong = element("strong");
    			t0 = text("Mjesec - ");
    			t1 = text(t1_value);
    			t2 = space();
    			div1 = element("div");
    			div0 = element("div");
    			create_component(paymentslip.$$.fragment);
    			t3 = space();
    			attr(button, "class", "accordion-button " + (/*i*/ ctx[28] === 0 ? '' : 'collapsed'));
    			attr(button, "type", "button");
    			attr(button, "data-bs-toggle", "collapse");
    			attr(button, "data-bs-target", "#collapse" + /*i*/ ctx[28]);
    			attr(button, "aria-expanded", "true");
    			attr(button, "aria-controls", "collapse" + /*i*/ ctx[28]);
    			attr(h2, "class", "accordion-header");
    			attr(h2, "id", "heading" + /*i*/ ctx[28]);
    			attr(div0, "class", "accordion-body");
    			attr(div1, "id", "collapse" + /*i*/ ctx[28]);
    			attr(div1, "class", "accordion-collapse collapse " + (/*i*/ ctx[28] === 0 ? 'show' : ''));
    			attr(div1, "aria-labelledby", "heading" + /*i*/ ctx[28]);
    			attr(div1, "data-bs-parent", "#accordionExample");
    			attr(div2, "class", "accordion-item");
    		},
    		m(target, anchor) {
    			insert(target, div2, anchor);
    			append(div2, h2);
    			append(h2, button);
    			append(button, strong);
    			append(strong, t0);
    			append(strong, t1);
    			append(div2, t2);
    			append(div2, div1);
    			append(div1, div0);
    			mount_component(paymentslip, div0, null);
    			append(div2, t3);
    			current = true;
    		},
    		p(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty[0] & /*paymentSlips*/ 4) && t1_value !== (t1_value = /*item*/ ctx[26]?.mjesec + "")) set_data(t1, t1_value);
    			const paymentslip_changes = {};
    			if (dirty[0] & /*textOnlyPrint*/ 8) paymentslip_changes.textOnlyPrint = /*textOnlyPrint*/ ctx[3];
    			if (dirty[0] & /*showDecimalOnPaymentSlips*/ 512) paymentslip_changes.showDecimalOnPaymentSlips = /*showDecimalOnPaymentSlips*/ ctx[9];

    			if (!updating_model && dirty[0] & /*paymentSlips*/ 4) {
    				updating_model = true;
    				paymentslip_changes.model = /*item*/ ctx[26];
    				add_flush_callback(() => updating_model = false);
    			}

    			paymentslip.$set(paymentslip_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(paymentslip.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(paymentslip.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div2);
    			destroy_component(paymentslip);
    		}
    	};
    }

    // (248:0) {#if barcodeOnlyPrint}
    function create_if_block$5(ctx) {
    	let barcodelist;
    	let current;

    	barcodelist = new BarcodeList__default["default"]({
    			props: {
    				customer: /*customer*/ ctx[0],
    				paymentSlips: /*paymentSlips*/ ctx[2]
    			}
    		});

    	return {
    		c() {
    			create_component(barcodelist.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(barcodelist, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const barcodelist_changes = {};
    			if (dirty[0] & /*customer*/ 1) barcodelist_changes.customer = /*customer*/ ctx[0];
    			if (dirty[0] & /*paymentSlips*/ 4) barcodelist_changes.paymentSlips = /*paymentSlips*/ ctx[2];
    			barcodelist.$set(barcodelist_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(barcodelist.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(barcodelist.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(barcodelist, detaching);
    		}
    	};
    }

    function create_fragment$a(ctx) {
    	let h3;
    	let t0_value = (/*customer*/ ctx[0]?.naziv ?? "Obrada...") + "";
    	let t0;
    	let t1;
    	let spinner;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let div;
    	let t6;
    	let if_block3_anchor;
    	let current;

    	spinner = new Spinner__default["default"]({
    			props: { loading: !/*customer*/ ctx[0]?.naziv }
    		});

    	let if_block0 = !/*barcodeOnlyPrint*/ ctx[4] && create_if_block_3(ctx);
    	let if_block1 = /*paymentSlips*/ ctx[2].length > 0 && create_if_block_2(ctx);
    	let if_block2 = /*paymentSlips*/ ctx[2].length > 0 && create_if_block_1(ctx);
    	let each_value = /*paymentSlips*/ ctx[2];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block$1();
    	}

    	let if_block3 = /*barcodeOnlyPrint*/ ctx[4] && create_if_block$5(ctx);

    	return {
    		c() {
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(spinner.$$.fragment);
    			t2 = space();
    			if (if_block0) if_block0.c();
    			t3 = space();
    			if (if_block1) if_block1.c();
    			t4 = space();
    			if (if_block2) if_block2.c();
    			t5 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each_1_else) {
    				each_1_else.c();
    			}

    			t6 = space();
    			if (if_block3) if_block3.c();
    			if_block3_anchor = empty();
    			attr(h3, "class", "noprint");
    			set_style(h3, "text-align", "center");
    			attr(div, "class", "accordion noprint");
    			attr(div, "id", "accordionExample");
    		},
    		m(target, anchor) {
    			insert(target, h3, anchor);
    			append(h3, t0);
    			insert(target, t1, anchor);
    			mount_component(spinner, target, anchor);
    			insert(target, t2, anchor);
    			if (if_block0) if_block0.m(target, anchor);
    			insert(target, t3, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert(target, t4, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert(target, t5, anchor);
    			insert(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			if (each_1_else) {
    				each_1_else.m(div, null);
    			}

    			insert(target, t6, anchor);
    			if (if_block3) if_block3.m(target, anchor);
    			insert(target, if_block3_anchor, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			if ((!current || dirty[0] & /*customer*/ 1) && t0_value !== (t0_value = (/*customer*/ ctx[0]?.naziv ?? "Obrada...") + "")) set_data(t0, t0_value);
    			const spinner_changes = {};
    			if (dirty[0] & /*customer*/ 1) spinner_changes.loading = !/*customer*/ ctx[0]?.naziv;
    			spinner.$set(spinner_changes);

    			if (!/*barcodeOnlyPrint*/ ctx[4]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*barcodeOnlyPrint*/ 16) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t3.parentNode, t3);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*paymentSlips*/ ctx[2].length > 0) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty[0] & /*paymentSlips*/ 4) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t4.parentNode, t4);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (/*paymentSlips*/ ctx[2].length > 0) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block_1(ctx);
    					if_block2.c();
    					if_block2.m(t5.parentNode, t5);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}

    			if (dirty[0] & /*textOnlyPrint, showDecimalOnPaymentSlips, paymentSlips*/ 524) {
    				each_value = /*paymentSlips*/ ctx[2];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();

    				if (each_value.length) {
    					if (each_1_else) {
    						each_1_else.d(1);
    						each_1_else = null;
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block$1();
    					each_1_else.c();
    					each_1_else.m(div, null);
    				}
    			}

    			if (/*barcodeOnlyPrint*/ ctx[4]) {
    				if (if_block3) {
    					if_block3.p(ctx, dirty);

    					if (dirty[0] & /*barcodeOnlyPrint*/ 16) {
    						transition_in(if_block3, 1);
    					}
    				} else {
    					if_block3 = create_if_block$5(ctx);
    					if_block3.c();
    					transition_in(if_block3, 1);
    					if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
    				}
    			} else if (if_block3) {
    				group_outros();

    				transition_out(if_block3, 1, 1, () => {
    					if_block3 = null;
    				});

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(spinner.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(if_block3);
    			current = true;
    		},
    		o(local) {
    			transition_out(spinner.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(if_block3);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(h3);
    			if (detaching) detach(t1);
    			destroy_component(spinner, detaching);
    			if (detaching) detach(t2);
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach(t3);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach(t4);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach(t5);
    			if (detaching) detach(div);
    			destroy_each(each_blocks, detaching);
    			if (each_1_else) each_1_else.d();
    			if (detaching) detach(t6);
    			if (if_block3) if_block3.d(detaching);
    			if (detaching) detach(if_block3_anchor);
    		}
    	};
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { params = {} } = $$props;
    	let customer;
    	let isps = [];
    	let paymentSlips = [];
    	let textOnlyPrint = false;
    	let barcodeOnlyPrint = false;
    	let scale = 1.0;
    	let topMargin = 0;
    	let leftMargin = 0;
    	let bottomMarginItem = -70;
    	let showDecimalOnPaymentSlips = true;

    	store$1.store.subscribe(state => {
    		var _a;

    		$$invalidate(0, customer = state === null || state === void 0
    		? void 0
    		: state.customer);

    		$$invalidate(2, paymentSlips = [
    			...(_a = customer === null || customer === void 0
    			? void 0
    			: customer.paymentSlips) !== null && _a !== void 0
    			? _a
    			: []
    		]);
    	});

    	function printWithBackground() {
    		$$invalidate(3, textOnlyPrint = false);
    		$$invalidate(4, barcodeOnlyPrint = false);
    		setTimeout(() => window.print(), 1000);
    	}

    	function printTextOnly() {
    		$$invalidate(3, textOnlyPrint = true);
    		$$invalidate(4, barcodeOnlyPrint = false);
    		setTimeout(() => window.print(), 1000);
    	}

    	function printBarcodes() {
    		$$invalidate(4, barcodeOnlyPrint = true);
    		$$invalidate(3, textOnlyPrint = false);
    		setTimeout(() => window.print(), 1000);
    	}

    	http.getIsps().then(async data => {
    		$$invalidate(1, isps = data);
    	});

    	function fetchCustomer(params) {
    		http.getCustomer(params).then(() => http.getIsps());
    	}

    	onMount(() => {
    		fetchCustomer(params);
    	});

    	function addPaymentSlip(isp) {
    		http.newPaymentSlip(setPaymentSlip({ isp, customer })).then(async data => {
    			fetchCustomer(params);

    			setTimeout(
    				() => {
    					window.scrollTo(0, document.body.scrollHeight);
    				},
    				1000
    			);
    		});
    	}

    	async function fetchGlobalSetting() {
    		var _a, _b, _c, _d;
    		const data = await http.getGlobalSetting(1);

    		$$invalidate(5, scale = (_a = Number(data === null || data === void 0
    		? void 0
    		: data.paymentSlipPrintScale)) !== null && _a !== void 0
    		? _a
    		: 1.0);

    		$$invalidate(6, topMargin = (_b = Number(data === null || data === void 0
    		? void 0
    		: data.paymentSlipMarginTop)) !== null && _b !== void 0
    		? _b
    		: 0);

    		$$invalidate(7, leftMargin = (_c = Number(data === null || data === void 0
    		? void 0
    		: data.paymentSlipMarginLeft)) !== null && _c !== void 0
    		? _c
    		: 0);

    		$$invalidate(8, bottomMarginItem = (_d = Number(data === null || data === void 0
    		? void 0
    		: data.paymentSlipItemMarginBottom)) !== null && _d !== void 0
    		? _d
    		: 0);

    		$$invalidate(9, showDecimalOnPaymentSlips = data === null || data === void 0
    		? void 0
    		: data.showDecimalOnPaymentSlips);
    	}

    	fetchGlobalSetting();

    	async function submitGlobalSetting() {
    		await http.updateGlobalSetting(1, {
    			paymentSlipPrintScale: Number(scale),
    			paymentSlipMarginTop: Number(topMargin),
    			paymentSlipMarginLeft: Number(leftMargin),
    			paymentSlipItemMarginBottom: Number(bottomMarginItem),
    			showDecimalOnPaymentSlips
    		});

    		await fetchGlobalSetting();
    	}

    	function paymentslip_model_binding(value, model, each_value_2, i) {
    		each_value_2[i] = value;
    		$$invalidate(2, paymentSlips);
    	}

    	function input0_change_handler() {
    		showDecimalOnPaymentSlips = this.checked;
    		$$invalidate(9, showDecimalOnPaymentSlips);
    	}

    	const click_handler = isp => addPaymentSlip(isp);

    	function input1_input_handler() {
    		scale = to_number(this.value);
    		$$invalidate(5, scale);
    	}

    	function input2_input_handler() {
    		topMargin = to_number(this.value);
    		$$invalidate(6, topMargin);
    	}

    	function input3_input_handler() {
    		leftMargin = to_number(this.value);
    		$$invalidate(7, leftMargin);
    	}

    	function input4_input_handler() {
    		bottomMarginItem = to_number(this.value);
    		$$invalidate(8, bottomMarginItem);
    	}

    	function paymentslip_model_binding_1(value, item, each_value, i) {
    		each_value[i] = value;
    		$$invalidate(2, paymentSlips);
    	}

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(15, params = $$props.params);
    	};

    	return [
    		customer,
    		isps,
    		paymentSlips,
    		textOnlyPrint,
    		barcodeOnlyPrint,
    		scale,
    		topMargin,
    		leftMargin,
    		bottomMarginItem,
    		showDecimalOnPaymentSlips,
    		printWithBackground,
    		printTextOnly,
    		printBarcodes,
    		addPaymentSlip,
    		submitGlobalSetting,
    		params,
    		paymentslip_model_binding,
    		input0_change_handler,
    		click_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		paymentslip_model_binding_1
    	];
    }

    class CustomerPaymentSlips extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$6, create_fragment$a, safe_not_equal, { params: 15 }, null, [-1, -1]);
    	}
    }

    /* src/components/ISP/Form.svelte generated by Svelte v3.52.0 */

    function create_if_block$4(ctx) {
    	let div;
    	let label;
    	let t1;
    	let input;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			div = element("div");
    			label = element("label");
    			label.textContent = "ID";
    			t1 = space();
    			input = element("input");
    			attr(label, "for", "user_id");
    			attr(label, "class", "svelte-1ln3bo1");
    			attr(input, "class", "form-control");
    			attr(input, "id", "isp_id");
    			attr(input, "name", "isp[id]");
    			attr(input, "type", "number");
    			attr(div, "class", "mb-2 col-md-4 col-sm-12");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, label);
    			append(div, t1);
    			append(div, input);
    			set_input_value(input, /*isp*/ ctx[0]["id"]);

    			if (!mounted) {
    				dispose = listen(input, "input", /*input_input_handler*/ ctx[2]);
    				mounted = true;
    			}
    		},
    		p(ctx, dirty) {
    			if (dirty & /*isp*/ 1 && to_number(input.value) !== /*isp*/ ctx[0]["id"]) {
    				set_input_value(input, /*isp*/ ctx[0]["id"]);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			mounted = false;
    			dispose();
    		}
    	};
    }

    function create_fragment$9(ctx) {
    	let form;
    	let div6;
    	let t0;
    	let div0;
    	let label0;
    	let t2;
    	let input0;
    	let t3;
    	let div1;
    	let label1;
    	let t5;
    	let input1;
    	let t6;
    	let div2;
    	let label2;
    	let t8;
    	let input2;
    	let t9;
    	let div3;
    	let label3;
    	let t11;
    	let input3;
    	let t12;
    	let div4;
    	let label4;
    	let t14;
    	let input4;
    	let t15;
    	let div5;
    	let label5;
    	let t17;
    	let input5;
    	let t18;
    	let div7;
    	let mounted;
    	let dispose;
    	let if_block = /*isp*/ ctx[0]["id"] === null && create_if_block$4(ctx);

    	return {
    		c() {
    			form = element("form");
    			div6 = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Naziv";
    			t2 = space();
    			input0 = element("input");
    			t3 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Ulica";
    			t5 = space();
    			input1 = element("input");
    			t6 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Poštanski broj";
    			t8 = space();
    			input2 = element("input");
    			t9 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Grad";
    			t11 = space();
    			input3 = element("input");
    			t12 = space();
    			div4 = element("div");
    			label4 = element("label");
    			label4.textContent = "Oib";
    			t14 = space();
    			input4 = element("input");
    			t15 = space();
    			div5 = element("div");
    			label5 = element("label");
    			label5.textContent = "IBAN";
    			t17 = space();
    			input5 = element("input");
    			t18 = space();
    			div7 = element("div");

    			div7.innerHTML = `<br/> 
    <span><button class="btn btn-secondary" type="submit">Spremi</button></span> 
    <span><a class="btn btn-secondary" href="/#/isp">Natrag</a></span>`;

    			attr(label0, "for", "isp_name");
    			attr(label0, "class", "svelte-1ln3bo1");
    			attr(input0, "class", "form-control");
    			attr(input0, "id", "isp_name");
    			attr(input0, "name", "isp[name]");
    			attr(input0, "type", "text");
    			attr(div0, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label1, "for", "isp_street");
    			attr(label1, "class", "svelte-1ln3bo1");
    			attr(input1, "class", "form-control");
    			attr(input1, "id", "isp_street");
    			attr(input1, "name", "isp[street]");
    			attr(input1, "type", "text");
    			attr(div1, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label2, "for", "isp_postalCode");
    			attr(label2, "class", "svelte-1ln3bo1");
    			attr(input2, "class", "form-control");
    			attr(input2, "id", "isp_postalCode");
    			attr(input2, "name", "isp[postalCode]");
    			attr(input2, "type", "number");
    			attr(div2, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label3, "for", "isp_city");
    			attr(label3, "class", "svelte-1ln3bo1");
    			attr(input3, "class", "form-control");
    			attr(input3, "id", "isp_city");
    			attr(input3, "name", "isp[city]");
    			attr(input3, "type", "text");
    			attr(div3, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label4, "for", "isp_oib");
    			attr(label4, "class", "svelte-1ln3bo1");
    			attr(input4, "class", "form-control");
    			attr(input4, "id", "isp_oib");
    			attr(input4, "name", "isp[oib]");
    			attr(input4, "type", "number");
    			attr(input4, "minlength", "11");
    			attr(input4, "maxlength", "11");
    			attr(div4, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label5, "for", "isp_iban");
    			attr(label5, "class", "svelte-1ln3bo1");
    			attr(input5, "class", "form-control");
    			attr(input5, "id", "isp_iban");
    			attr(input5, "name", "isp[iban]");
    			attr(input5, "type", "text");
    			attr(input5, "minlength", "21");
    			attr(input5, "maxlength", "21");
    			attr(div5, "class", "mb-2 col-md-4 col-sm-12");
    			attr(div6, "class", "row");
    			attr(form, "action", "/users");
    		},
    		m(target, anchor) {
    			insert(target, form, anchor);
    			append(form, div6);
    			if (if_block) if_block.m(div6, null);
    			append(div6, t0);
    			append(div6, div0);
    			append(div0, label0);
    			append(div0, t2);
    			append(div0, input0);
    			set_input_value(input0, /*isp*/ ctx[0]["name"]);
    			append(div6, t3);
    			append(div6, div1);
    			append(div1, label1);
    			append(div1, t5);
    			append(div1, input1);
    			set_input_value(input1, /*isp*/ ctx[0]["street"]);
    			append(div6, t6);
    			append(div6, div2);
    			append(div2, label2);
    			append(div2, t8);
    			append(div2, input2);
    			set_input_value(input2, /*isp*/ ctx[0]["postalCode"]);
    			append(div6, t9);
    			append(div6, div3);
    			append(div3, label3);
    			append(div3, t11);
    			append(div3, input3);
    			set_input_value(input3, /*isp*/ ctx[0]["city"]);
    			append(div6, t12);
    			append(div6, div4);
    			append(div4, label4);
    			append(div4, t14);
    			append(div4, input4);
    			set_input_value(input4, /*isp*/ ctx[0]["oib"]);
    			append(div6, t15);
    			append(div6, div5);
    			append(div5, label5);
    			append(div5, t17);
    			append(div5, input5);
    			set_input_value(input5, /*isp*/ ctx[0]["iban"]);
    			append(form, t18);
    			append(form, div7);

    			if (!mounted) {
    				dispose = [
    					listen(input0, "input", /*input0_input_handler*/ ctx[3]),
    					listen(input1, "input", /*input1_input_handler*/ ctx[4]),
    					listen(input2, "input", /*input2_input_handler*/ ctx[5]),
    					listen(input3, "input", /*input3_input_handler*/ ctx[6]),
    					listen(input4, "input", /*input4_input_handler*/ ctx[7]),
    					listen(input5, "input", /*input5_input_handler*/ ctx[8]),
    					listen(form, "submit", prevent_default(/*submit_handler*/ ctx[9]))
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (/*isp*/ ctx[0]["id"] === null) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(div6, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*isp*/ 1 && input0.value !== /*isp*/ ctx[0]["name"]) {
    				set_input_value(input0, /*isp*/ ctx[0]["name"]);
    			}

    			if (dirty & /*isp*/ 1 && input1.value !== /*isp*/ ctx[0]["street"]) {
    				set_input_value(input1, /*isp*/ ctx[0]["street"]);
    			}

    			if (dirty & /*isp*/ 1 && to_number(input2.value) !== /*isp*/ ctx[0]["postalCode"]) {
    				set_input_value(input2, /*isp*/ ctx[0]["postalCode"]);
    			}

    			if (dirty & /*isp*/ 1 && input3.value !== /*isp*/ ctx[0]["city"]) {
    				set_input_value(input3, /*isp*/ ctx[0]["city"]);
    			}

    			if (dirty & /*isp*/ 1 && to_number(input4.value) !== /*isp*/ ctx[0]["oib"]) {
    				set_input_value(input4, /*isp*/ ctx[0]["oib"]);
    			}

    			if (dirty & /*isp*/ 1 && input5.value !== /*isp*/ ctx[0]["iban"]) {
    				set_input_value(input5, /*isp*/ ctx[0]["iban"]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(form);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { isp } = $$props;
    	let { submit } = $$props;

    	function input_input_handler() {
    		isp["id"] = to_number(this.value);
    		$$invalidate(0, isp);
    	}

    	function input0_input_handler() {
    		isp["name"] = this.value;
    		$$invalidate(0, isp);
    	}

    	function input1_input_handler() {
    		isp["street"] = this.value;
    		$$invalidate(0, isp);
    	}

    	function input2_input_handler() {
    		isp["postalCode"] = to_number(this.value);
    		$$invalidate(0, isp);
    	}

    	function input3_input_handler() {
    		isp["city"] = this.value;
    		$$invalidate(0, isp);
    	}

    	function input4_input_handler() {
    		isp["oib"] = to_number(this.value);
    		$$invalidate(0, isp);
    	}

    	function input5_input_handler() {
    		isp["iban"] = this.value;
    		$$invalidate(0, isp);
    	}

    	const submit_handler = () => submit(isp);

    	$$self.$$set = $$props => {
    		if ('isp' in $$props) $$invalidate(0, isp = $$props.isp);
    		if ('submit' in $$props) $$invalidate(1, submit = $$props.submit);
    	};

    	return [
    		isp,
    		submit,
    		input_input_handler,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		submit_handler
    	];
    }

    class Form$1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$5, create_fragment$9, safe_not_equal, { isp: 0, submit: 1 });
    	}
    }

    /* src/components/ISP/Edit.svelte generated by Svelte v3.52.0 */

    function create_if_block$3(ctx) {
    	let form;
    	let updating_isp;
    	let current;

    	function form_isp_binding(value) {
    		/*form_isp_binding*/ ctx[3](value);
    	}

    	let form_props = { submit: /*submit*/ ctx[1] };

    	if (/*isp*/ ctx[0] !== void 0) {
    		form_props.isp = /*isp*/ ctx[0];
    	}

    	form = new Form$1({ props: form_props });
    	binding_callbacks.push(() => bind(form, 'isp', form_isp_binding));

    	return {
    		c() {
    			create_component(form.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(form, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const form_changes = {};

    			if (!updating_isp && dirty & /*isp*/ 1) {
    				updating_isp = true;
    				form_changes.isp = /*isp*/ ctx[0];
    				add_flush_callback(() => updating_isp = false);
    			}

    			form.$set(form_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(form.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(form, detaching);
    		}
    	};
    }

    function create_fragment$8(ctx) {
    	let h4;
    	let t1;
    	let t2;
    	let br;
    	let current;
    	let if_block = /*isp*/ ctx[0] && create_if_block$3(ctx);

    	return {
    		c() {
    			h4 = element("h4");
    			h4.textContent = "Ažuriraj ISP";
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			br = element("br");
    		},
    		m(target, anchor) {
    			insert(target, h4, anchor);
    			insert(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert(target, t2, anchor);
    			insert(target, br, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*isp*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*isp*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t2.parentNode, t2);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(h4);
    			if (detaching) detach(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(t2);
    			if (detaching) detach(br);
    		}
    	};
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { params } = $$props;
    	let isp;

    	fetch(`${config.url}/isp/${params.id}`, {
    		headers: {
    			accept: "application/json",
    			"Content-Type": "application/json"
    		}
    	}).then(async res => {
    		$$invalidate(0, isp = await res.json());
    	});

    	function submit() {
    		fetch(`${config.url}/isp/${params.id}`, {
    			method: "PUT",
    			headers: {
    				accept: "application/json",
    				"Content-Type": "application/json"
    			},
    			body: JSON.stringify(isp)
    		}).then(async res => {
    			$$invalidate(0, isp = await res.json());
    		});
    	}

    	function form_isp_binding(value) {
    		isp = value;
    		$$invalidate(0, isp);
    	}

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(2, params = $$props.params);
    	};

    	return [isp, submit, params, form_isp_binding];
    }

    class Edit$1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$4, create_fragment$8, safe_not_equal, { params: 2 });
    	}
    }

    /* src/components/ISP/New.svelte generated by Svelte v3.52.0 */

    function create_fragment$7(ctx) {
    	let h4;
    	let t1;
    	let form;
    	let t2;
    	let br;
    	let current;
    	form = new Form$1({ props: { isp, submit: http.createIsp } });

    	return {
    		c() {
    			h4 = element("h4");
    			h4.textContent = "Novi ISP";
    			t1 = space();
    			create_component(form.$$.fragment);
    			t2 = space();
    			br = element("br");
    		},
    		m(target, anchor) {
    			insert(target, h4, anchor);
    			insert(target, t1, anchor);
    			mount_component(form, target, anchor);
    			insert(target, t2, anchor);
    			insert(target, br, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(form.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(h4);
    			if (detaching) detach(t1);
    			destroy_component(form, detaching);
    			if (detaching) detach(t2);
    			if (detaching) detach(br);
    		}
    	};
    }

    class New$1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$7, safe_not_equal, {});
    	}
    }

    /* src/components/Customer/Form.svelte generated by Svelte v3.52.0 */

    function create_fragment$6(ctx) {
    	let form;
    	let div29;
    	let div0;
    	let label0;
    	let t1;
    	let input0;
    	let t2;
    	let div1;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let div2;
    	let label2;
    	let t7;
    	let input2;
    	let t8;
    	let div3;
    	let label3;
    	let t10;
    	let input3;
    	let t11;
    	let div4;
    	let label4;
    	let t13;
    	let input4;
    	let t14;
    	let div5;
    	let label5;
    	let t16;
    	let input5;
    	let t17;
    	let div6;
    	let label6;
    	let t19;
    	let input6;
    	let t20;
    	let div7;
    	let label7;
    	let t22;
    	let input7;
    	let t23;
    	let div8;
    	let label8;
    	let t25;
    	let input8;
    	let t26;
    	let div9;
    	let label9;
    	let t28;
    	let input9;
    	let t29;
    	let div10;
    	let label10;
    	let t31;
    	let input10;
    	let t32;
    	let div11;
    	let label11;
    	let t34;
    	let input11;
    	let t35;
    	let div12;
    	let label12;
    	let t37;
    	let input12;
    	let t38;
    	let div13;
    	let label13;
    	let t40;
    	let input13;
    	let t41;
    	let div14;
    	let label14;
    	let t43;
    	let input14;
    	let t44;
    	let div15;
    	let label15;
    	let t46;
    	let input15;
    	let t47;
    	let div16;
    	let label16;
    	let t49;
    	let input16;
    	let t50;
    	let div17;
    	let label17;
    	let t52;
    	let input17;
    	let t53;
    	let div18;
    	let label18;
    	let t55;
    	let input18;
    	let t56;
    	let div19;
    	let label19;
    	let t58;
    	let input19;
    	let t59;
    	let div20;
    	let label20;
    	let t61;
    	let input20;
    	let t62;
    	let div21;
    	let label21;
    	let t64;
    	let input21;
    	let t65;
    	let div22;
    	let label22;
    	let t67;
    	let input22;
    	let t68;
    	let div23;
    	let label23;
    	let t70;
    	let input23;
    	let t71;
    	let div24;
    	let label24;
    	let t73;
    	let input24;
    	let t74;
    	let div25;
    	let label25;
    	let t76;
    	let input25;
    	let t77;
    	let div26;
    	let label26;
    	let t79;
    	let input26;
    	let t80;
    	let div27;
    	let label27;
    	let t82;
    	let input27;
    	let t83;
    	let div28;
    	let label28;
    	let t85;
    	let input28;
    	let t86;
    	let div30;
    	let mounted;
    	let dispose;

    	return {
    		c() {
    			form = element("form");
    			div29 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Šifra";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			div1 = element("div");
    			label1 = element("label");
    			label1.textContent = "Naziv";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			div2 = element("div");
    			label2 = element("label");
    			label2.textContent = "Adresa";
    			t7 = space();
    			input2 = element("input");
    			t8 = space();
    			div3 = element("div");
    			label3 = element("label");
    			label3.textContent = "Država";
    			t10 = space();
    			input3 = element("input");
    			t11 = space();
    			div4 = element("div");
    			label4 = element("label");
    			label4.textContent = "Pošta";
    			t13 = space();
    			input4 = element("input");
    			t14 = space();
    			div5 = element("div");
    			label5 = element("label");
    			label5.textContent = "Mjesto";
    			t16 = space();
    			input5 = element("input");
    			t17 = space();
    			div6 = element("div");
    			label6 = element("label");
    			label6.textContent = "Porezni obveznik";
    			t19 = space();
    			input6 = element("input");
    			t20 = space();
    			div7 = element("div");
    			label7 = element("label");
    			label7.textContent = "Oib";
    			t22 = space();
    			input7 = element("input");
    			t23 = space();
    			div8 = element("div");
    			label8 = element("label");
    			label8.textContent = "Matični broj";
    			t25 = space();
    			input8 = element("input");
    			t26 = space();
    			div9 = element("div");
    			label9 = element("label");
    			label9.textContent = "Šifra djelatnosti";
    			t28 = space();
    			input9 = element("input");
    			t29 = space();
    			div10 = element("div");
    			label10 = element("label");
    			label10.textContent = "Identifikacijski broj";
    			t31 = space();
    			input10 = element("input");
    			t32 = space();
    			div11 = element("div");
    			label11 = element("label");
    			label11.textContent = "Novčana jedinica";
    			t34 = space();
    			input11 = element("input");
    			t35 = space();
    			div12 = element("div");
    			label12 = element("label");
    			label12.textContent = "Dani za dospijeće";
    			t37 = space();
    			input12 = element("input");
    			t38 = space();
    			div13 = element("div");
    			label13 = element("label");
    			label13.textContent = "Postotak rabata";
    			t40 = space();
    			input13 = element("input");
    			t41 = space();
    			div14 = element("div");
    			label14 = element("label");
    			label14.textContent = "Internet stranica";
    			t43 = space();
    			input14 = element("input");
    			t44 = space();
    			div15 = element("div");
    			label15 = element("label");
    			label15.textContent = "Transakcijski račun";
    			t46 = space();
    			input15 = element("input");
    			t47 = space();
    			div16 = element("div");
    			label16 = element("label");
    			label16.textContent = "Ime prezime kontakta";
    			t49 = space();
    			input16 = element("input");
    			t50 = space();
    			div17 = element("div");
    			label17 = element("label");
    			label17.textContent = "Telefon";
    			t52 = space();
    			input17 = element("input");
    			t53 = space();
    			div18 = element("div");
    			label18 = element("label");
    			label18.textContent = "Elektronska pošta";
    			t55 = space();
    			input18 = element("input");
    			t56 = space();
    			div19 = element("div");
    			label19 = element("label");
    			label19.textContent = "Naziv za slanje";
    			t58 = space();
    			input19 = element("input");
    			t59 = space();
    			div20 = element("div");
    			label20 = element("label");
    			label20.textContent = "Adresa za slanje";
    			t61 = space();
    			input20 = element("input");
    			t62 = space();
    			div21 = element("div");
    			label21 = element("label");
    			label21.textContent = "Država za slanje";
    			t64 = space();
    			input21 = element("input");
    			t65 = space();
    			div22 = element("div");
    			label22 = element("label");
    			label22.textContent = "Pošta za slanje";
    			t67 = space();
    			input22 = element("input");
    			t68 = space();
    			div23 = element("div");
    			label23 = element("label");
    			label23.textContent = "Mjesto pošte za slanje";
    			t70 = space();
    			input23 = element("input");
    			t71 = space();
    			div24 = element("div");
    			label24 = element("label");
    			label24.textContent = "Naziv primatelja";
    			t73 = space();
    			input24 = element("input");
    			t74 = space();
    			div25 = element("div");
    			label25 = element("label");
    			label25.textContent = "Adresa primatelja";
    			t76 = space();
    			input25 = element("input");
    			t77 = space();
    			div26 = element("div");
    			label26 = element("label");
    			label26.textContent = "Država primatelja";
    			t79 = space();
    			input26 = element("input");
    			t80 = space();
    			div27 = element("div");
    			label27 = element("label");
    			label27.textContent = "Pošta primatelja";
    			t82 = space();
    			input27 = element("input");
    			t83 = space();
    			div28 = element("div");
    			label28 = element("label");
    			label28.textContent = "Mjesto primatelja";
    			t85 = space();
    			input28 = element("input");
    			t86 = space();
    			div30 = element("div");

    			div30.innerHTML = `<br/> 
    <span><button class="btn btn-secondary" type="submit">Spremi</button></span> 
    <span><a class="btn btn-secondary" href="/">Natrag</a></span>`;

    			attr(label0, "for", "user_šifra");
    			attr(label0, "class", "svelte-1ln3bo1");
    			attr(input0, "class", "form-control");
    			attr(input0, "id", "user_šifra");
    			attr(input0, "name", "user[šifra]");
    			attr(input0, "type", "number");
    			attr(div0, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label1, "for", "user_naziv");
    			attr(label1, "class", "svelte-1ln3bo1");
    			attr(input1, "class", "form-control");
    			attr(input1, "id", "user_naziv");
    			attr(input1, "name", "user[naziv]");
    			attr(input1, "type", "text");
    			attr(div1, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label2, "for", "user_adresa");
    			attr(label2, "class", "svelte-1ln3bo1");
    			attr(input2, "class", "form-control");
    			attr(input2, "id", "user_adresa");
    			attr(input2, "name", "user[adresa]");
    			attr(input2, "type", "text");
    			attr(div2, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label3, "for", "user_država");
    			attr(label3, "class", "svelte-1ln3bo1");
    			attr(input3, "class", "form-control");
    			attr(input3, "id", "user_država");
    			attr(input3, "name", "user[država]");
    			attr(input3, "type", "text");
    			attr(div3, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label4, "for", "user_pošta");
    			attr(label4, "class", "svelte-1ln3bo1");
    			attr(input4, "class", "form-control");
    			attr(input4, "id", "user_pošta");
    			attr(input4, "name", "user[pošta]");
    			attr(input4, "type", "number");
    			attr(div4, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label5, "for", "user_mjesto");
    			attr(label5, "class", "svelte-1ln3bo1");
    			attr(input5, "class", "form-control");
    			attr(input5, "id", "user_mjesto");
    			attr(input5, "name", "user[mjesto]");
    			attr(input5, "type", "text");
    			attr(div5, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label6, "for", "user_porezni_obveznik");
    			attr(label6, "class", "svelte-1ln3bo1");
    			attr(input6, "class", "form-control");
    			attr(input6, "id", "user_porezni_obveznik");
    			attr(input6, "name", "user[porezni_obveznik]");
    			attr(input6, "type", "text");
    			attr(div6, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label7, "for", "user_oib");
    			attr(label7, "class", "svelte-1ln3bo1");
    			attr(input7, "class", "form-control");
    			attr(input7, "id", "user_oib");
    			attr(input7, "name", "user[oib]");
    			attr(input7, "type", "number");
    			attr(div7, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label8, "for", "user_matični_broj");
    			attr(label8, "class", "svelte-1ln3bo1");
    			attr(input8, "class", "form-control");
    			attr(input8, "id", "user_matični_broj");
    			attr(input8, "name", "user[matični_broj]");
    			attr(input8, "type", "number");
    			attr(div8, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label9, "for", "user_šifra_djelatnosti");
    			attr(label9, "class", "svelte-1ln3bo1");
    			attr(input9, "class", "form-control");
    			attr(input9, "id", "user_šifra_djelatnosti");
    			attr(input9, "name", "user[šifra_djelatnosti]");
    			attr(input9, "type", "text");
    			attr(div9, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label10, "for", "user_identifikacijski_broj");
    			attr(label10, "class", "svelte-1ln3bo1");
    			attr(input10, "class", "form-control");
    			attr(input10, "id", "user_identifikacijski_broj");
    			attr(input10, "name", "user[identifikacijski_broj]");
    			attr(input10, "type", "number");
    			attr(div10, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label11, "for", "user_novčana_jedinica");
    			attr(label11, "class", "svelte-1ln3bo1");
    			attr(input11, "class", "form-control");
    			attr(input11, "id", "user_novčana_jedinica");
    			attr(input11, "name", "user[novčana_jedinica]");
    			attr(input11, "type", "text");
    			attr(div11, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label12, "for", "user_dani_za_dospijeće");
    			attr(label12, "class", "svelte-1ln3bo1");
    			attr(input12, "class", "form-control");
    			attr(input12, "id", "user_dani_za_dospijeće");
    			attr(input12, "name", "user[dani_za_dospijeće]");
    			attr(input12, "type", "text");
    			attr(div12, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label13, "for", "user_postotak_rabata");
    			attr(label13, "class", "svelte-1ln3bo1");
    			attr(input13, "class", "form-control");
    			attr(input13, "id", "user_postotak_rabata");
    			attr(input13, "name", "user[postotak_rabata]");
    			attr(input13, "type", "text");
    			attr(div13, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label14, "for", "user_internet_stranica");
    			attr(label14, "class", "svelte-1ln3bo1");
    			attr(input14, "class", "form-control");
    			attr(input14, "id", "user_internet_stranica");
    			attr(input14, "name", "user[internet_stranica]");
    			attr(input14, "type", "text");
    			attr(div14, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label15, "for", "user_transakcijski_račun");
    			attr(label15, "class", "svelte-1ln3bo1");
    			attr(input15, "class", "form-control");
    			attr(input15, "id", "user_transakcijski_račun");
    			attr(input15, "name", "user[transakcijski_račun]");
    			attr(input15, "type", "text");
    			attr(div15, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label16, "for", "user_ime_prezime_kontakta");
    			attr(label16, "class", "svelte-1ln3bo1");
    			attr(input16, "class", "form-control");
    			attr(input16, "id", "user_ime_prezime_kontakta");
    			attr(input16, "name", "user[ime_prezime_kontakta]");
    			attr(input16, "type", "text");
    			attr(div16, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label17, "for", "user_telefon");
    			attr(label17, "class", "svelte-1ln3bo1");
    			attr(input17, "class", "form-control");
    			attr(input17, "id", "user_telefon");
    			attr(input17, "name", "user[telefon]");
    			attr(input17, "type", "text");
    			attr(div17, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label18, "for", "user_elektronska_pošta");
    			attr(label18, "class", "svelte-1ln3bo1");
    			attr(input18, "class", "form-control");
    			attr(input18, "id", "user_elektronska_pošta");
    			attr(input18, "name", "user[elektronska_pošta]");
    			attr(input18, "type", "text");
    			attr(div18, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label19, "for", "user_naziv_za_slanje");
    			attr(label19, "class", "svelte-1ln3bo1");
    			attr(input19, "class", "form-control");
    			attr(input19, "id", "user_naziv_za_slanje");
    			attr(input19, "name", "user[naziv_za_slanje]");
    			attr(input19, "type", "text");
    			attr(div19, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label20, "for", "user_adresa_za_slanje");
    			attr(label20, "class", "svelte-1ln3bo1");
    			attr(input20, "class", "form-control");
    			attr(input20, "id", "user_adresa_za_slanje");
    			attr(input20, "name", "user[adresa_za_slanje]");
    			attr(input20, "type", "text");
    			attr(div20, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label21, "for", "user_država_za_slanje");
    			attr(label21, "class", "svelte-1ln3bo1");
    			attr(input21, "class", "form-control");
    			attr(input21, "id", "user_država_za_slanje");
    			attr(input21, "name", "user[država_za_slanje]");
    			attr(input21, "type", "text");
    			attr(div21, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label22, "for", "user_pošta_za_slanje");
    			attr(label22, "class", "svelte-1ln3bo1");
    			attr(input22, "class", "form-control");
    			attr(input22, "id", "user_pošta_za_slanje");
    			attr(input22, "name", "user[pošta_za_slanje]");
    			attr(input22, "type", "text");
    			attr(div22, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label23, "for", "user_mjesto_pošte_za_slanje");
    			attr(label23, "class", "svelte-1ln3bo1");
    			attr(input23, "class", "form-control");
    			attr(input23, "id", "user_mjesto_pošte_za_slanje");
    			attr(input23, "name", "user[mjesto_pošte_za_slanje]");
    			attr(input23, "type", "text");
    			attr(div23, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label24, "for", "user_naziv_primatelja");
    			attr(label24, "class", "svelte-1ln3bo1");
    			attr(input24, "class", "form-control");
    			attr(input24, "id", "user_naziv_primatelja");
    			attr(input24, "name", "user[naziv_primatelja]");
    			attr(input24, "type", "text");
    			attr(div24, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label25, "for", "user_adresa_primatelja");
    			attr(label25, "class", "svelte-1ln3bo1");
    			attr(input25, "class", "form-control");
    			attr(input25, "id", "user_adresa_primatelja");
    			attr(input25, "name", "user[adresa_primatelja]");
    			attr(input25, "type", "text");
    			attr(div25, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label26, "for", "user_država_primatelja");
    			attr(label26, "class", "svelte-1ln3bo1");
    			attr(input26, "class", "form-control");
    			attr(input26, "id", "user_država_primatelja");
    			attr(input26, "name", "user[država_primatelja]");
    			attr(input26, "type", "text");
    			attr(div26, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label27, "for", "user_pošta_primatelja");
    			attr(label27, "class", "svelte-1ln3bo1");
    			attr(input27, "class", "form-control");
    			attr(input27, "id", "user_pošta_primatelja");
    			attr(input27, "name", "user[pošta_primatelja]");
    			attr(input27, "type", "text");
    			attr(div27, "class", "mb-2 col-md-4 col-sm-12");
    			attr(label28, "for", "user_mjesto_primatelja");
    			attr(label28, "class", "svelte-1ln3bo1");
    			attr(input28, "class", "form-control");
    			attr(input28, "id", "user_mjesto_primatelja");
    			attr(input28, "name", "user[mjesto_primatelja]");
    			attr(input28, "type", "text");
    			attr(div28, "class", "mb-2 col-md-4 col-sm-12");
    			attr(div29, "class", "row");
    			attr(form, "action", "/users");
    		},
    		m(target, anchor) {
    			insert(target, form, anchor);
    			append(form, div29);
    			append(div29, div0);
    			append(div0, label0);
    			append(div0, t1);
    			append(div0, input0);
    			set_input_value(input0, /*user*/ ctx[0]["šifra"]);
    			append(div29, t2);
    			append(div29, div1);
    			append(div1, label1);
    			append(div1, t4);
    			append(div1, input1);
    			set_input_value(input1, /*user*/ ctx[0]["naziv"]);
    			append(div29, t5);
    			append(div29, div2);
    			append(div2, label2);
    			append(div2, t7);
    			append(div2, input2);
    			set_input_value(input2, /*user*/ ctx[0]["adresa"]);
    			append(div29, t8);
    			append(div29, div3);
    			append(div3, label3);
    			append(div3, t10);
    			append(div3, input3);
    			set_input_value(input3, /*user*/ ctx[0]["država"]);
    			append(div29, t11);
    			append(div29, div4);
    			append(div4, label4);
    			append(div4, t13);
    			append(div4, input4);
    			set_input_value(input4, /*user*/ ctx[0]["pošta"]);
    			append(div29, t14);
    			append(div29, div5);
    			append(div5, label5);
    			append(div5, t16);
    			append(div5, input5);
    			set_input_value(input5, /*user*/ ctx[0]["mjesto"]);
    			append(div29, t17);
    			append(div29, div6);
    			append(div6, label6);
    			append(div6, t19);
    			append(div6, input6);
    			set_input_value(input6, /*user*/ ctx[0]["porezni_obveznik"]);
    			append(div29, t20);
    			append(div29, div7);
    			append(div7, label7);
    			append(div7, t22);
    			append(div7, input7);
    			set_input_value(input7, /*user*/ ctx[0]["oib"]);
    			append(div29, t23);
    			append(div29, div8);
    			append(div8, label8);
    			append(div8, t25);
    			append(div8, input8);
    			set_input_value(input8, /*user*/ ctx[0]["matični_broj"]);
    			append(div29, t26);
    			append(div29, div9);
    			append(div9, label9);
    			append(div9, t28);
    			append(div9, input9);
    			set_input_value(input9, /*user*/ ctx[0]["šifra_djelatnosti"]);
    			append(div29, t29);
    			append(div29, div10);
    			append(div10, label10);
    			append(div10, t31);
    			append(div10, input10);
    			set_input_value(input10, /*user*/ ctx[0]["identifikacijski_broj"]);
    			append(div29, t32);
    			append(div29, div11);
    			append(div11, label11);
    			append(div11, t34);
    			append(div11, input11);
    			set_input_value(input11, /*user*/ ctx[0]["novčana_jedinica"]);
    			append(div29, t35);
    			append(div29, div12);
    			append(div12, label12);
    			append(div12, t37);
    			append(div12, input12);
    			set_input_value(input12, /*user*/ ctx[0]["dani_za_dospijeće"]);
    			append(div29, t38);
    			append(div29, div13);
    			append(div13, label13);
    			append(div13, t40);
    			append(div13, input13);
    			set_input_value(input13, /*user*/ ctx[0]["postotak_rabata"]);
    			append(div29, t41);
    			append(div29, div14);
    			append(div14, label14);
    			append(div14, t43);
    			append(div14, input14);
    			set_input_value(input14, /*user*/ ctx[0]["internet_stranica"]);
    			append(div29, t44);
    			append(div29, div15);
    			append(div15, label15);
    			append(div15, t46);
    			append(div15, input15);
    			set_input_value(input15, /*user*/ ctx[0]["transakcijski_račun"]);
    			append(div29, t47);
    			append(div29, div16);
    			append(div16, label16);
    			append(div16, t49);
    			append(div16, input16);
    			set_input_value(input16, /*user*/ ctx[0]["ime_prezime_kontakta"]);
    			append(div29, t50);
    			append(div29, div17);
    			append(div17, label17);
    			append(div17, t52);
    			append(div17, input17);
    			set_input_value(input17, /*user*/ ctx[0]["telefon"]);
    			append(div29, t53);
    			append(div29, div18);
    			append(div18, label18);
    			append(div18, t55);
    			append(div18, input18);
    			set_input_value(input18, /*user*/ ctx[0]["elektronska_pošta"]);
    			append(div29, t56);
    			append(div29, div19);
    			append(div19, label19);
    			append(div19, t58);
    			append(div19, input19);
    			set_input_value(input19, /*user*/ ctx[0]["naziv_za_slanje"]);
    			append(div29, t59);
    			append(div29, div20);
    			append(div20, label20);
    			append(div20, t61);
    			append(div20, input20);
    			set_input_value(input20, /*user*/ ctx[0]["adresa_za_slanje"]);
    			append(div29, t62);
    			append(div29, div21);
    			append(div21, label21);
    			append(div21, t64);
    			append(div21, input21);
    			set_input_value(input21, /*user*/ ctx[0]["država_za_slanje"]);
    			append(div29, t65);
    			append(div29, div22);
    			append(div22, label22);
    			append(div22, t67);
    			append(div22, input22);
    			set_input_value(input22, /*user*/ ctx[0]["pošta_za_slanje"]);
    			append(div29, t68);
    			append(div29, div23);
    			append(div23, label23);
    			append(div23, t70);
    			append(div23, input23);
    			set_input_value(input23, /*user*/ ctx[0]["mjesto_pošte_za_slanje"]);
    			append(div29, t71);
    			append(div29, div24);
    			append(div24, label24);
    			append(div24, t73);
    			append(div24, input24);
    			set_input_value(input24, /*user*/ ctx[0]["naziv_primatelja"]);
    			append(div29, t74);
    			append(div29, div25);
    			append(div25, label25);
    			append(div25, t76);
    			append(div25, input25);
    			set_input_value(input25, /*user*/ ctx[0]["adresa_primatelja"]);
    			append(div29, t77);
    			append(div29, div26);
    			append(div26, label26);
    			append(div26, t79);
    			append(div26, input26);
    			set_input_value(input26, /*user*/ ctx[0]["država_primatelja"]);
    			append(div29, t80);
    			append(div29, div27);
    			append(div27, label27);
    			append(div27, t82);
    			append(div27, input27);
    			set_input_value(input27, /*user*/ ctx[0]["pošta_primatelja"]);
    			append(div29, t83);
    			append(div29, div28);
    			append(div28, label28);
    			append(div28, t85);
    			append(div28, input28);
    			set_input_value(input28, /*user*/ ctx[0]["mjesto_primatelja"]);
    			append(form, t86);
    			append(form, div30);

    			if (!mounted) {
    				dispose = [
    					listen(input0, "input", /*input0_input_handler*/ ctx[2]),
    					listen(input1, "input", /*input1_input_handler*/ ctx[3]),
    					listen(input2, "input", /*input2_input_handler*/ ctx[4]),
    					listen(input3, "input", /*input3_input_handler*/ ctx[5]),
    					listen(input4, "input", /*input4_input_handler*/ ctx[6]),
    					listen(input5, "input", /*input5_input_handler*/ ctx[7]),
    					listen(input6, "input", /*input6_input_handler*/ ctx[8]),
    					listen(input7, "input", /*input7_input_handler*/ ctx[9]),
    					listen(input8, "input", /*input8_input_handler*/ ctx[10]),
    					listen(input9, "input", /*input9_input_handler*/ ctx[11]),
    					listen(input10, "input", /*input10_input_handler*/ ctx[12]),
    					listen(input11, "input", /*input11_input_handler*/ ctx[13]),
    					listen(input12, "input", /*input12_input_handler*/ ctx[14]),
    					listen(input13, "input", /*input13_input_handler*/ ctx[15]),
    					listen(input14, "input", /*input14_input_handler*/ ctx[16]),
    					listen(input15, "input", /*input15_input_handler*/ ctx[17]),
    					listen(input16, "input", /*input16_input_handler*/ ctx[18]),
    					listen(input17, "input", /*input17_input_handler*/ ctx[19]),
    					listen(input18, "input", /*input18_input_handler*/ ctx[20]),
    					listen(input19, "input", /*input19_input_handler*/ ctx[21]),
    					listen(input20, "input", /*input20_input_handler*/ ctx[22]),
    					listen(input21, "input", /*input21_input_handler*/ ctx[23]),
    					listen(input22, "input", /*input22_input_handler*/ ctx[24]),
    					listen(input23, "input", /*input23_input_handler*/ ctx[25]),
    					listen(input24, "input", /*input24_input_handler*/ ctx[26]),
    					listen(input25, "input", /*input25_input_handler*/ ctx[27]),
    					listen(input26, "input", /*input26_input_handler*/ ctx[28]),
    					listen(input27, "input", /*input27_input_handler*/ ctx[29]),
    					listen(input28, "input", /*input28_input_handler*/ ctx[30]),
    					listen(form, "submit", prevent_default(function () {
    						if (is_function(/*submit*/ ctx[1])) /*submit*/ ctx[1].apply(this, arguments);
    					}))
    				];

    				mounted = true;
    			}
    		},
    		p(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (dirty & /*user*/ 1 && to_number(input0.value) !== /*user*/ ctx[0]["šifra"]) {
    				set_input_value(input0, /*user*/ ctx[0]["šifra"]);
    			}

    			if (dirty & /*user*/ 1 && input1.value !== /*user*/ ctx[0]["naziv"]) {
    				set_input_value(input1, /*user*/ ctx[0]["naziv"]);
    			}

    			if (dirty & /*user*/ 1 && input2.value !== /*user*/ ctx[0]["adresa"]) {
    				set_input_value(input2, /*user*/ ctx[0]["adresa"]);
    			}

    			if (dirty & /*user*/ 1 && input3.value !== /*user*/ ctx[0]["država"]) {
    				set_input_value(input3, /*user*/ ctx[0]["država"]);
    			}

    			if (dirty & /*user*/ 1 && to_number(input4.value) !== /*user*/ ctx[0]["pošta"]) {
    				set_input_value(input4, /*user*/ ctx[0]["pošta"]);
    			}

    			if (dirty & /*user*/ 1 && input5.value !== /*user*/ ctx[0]["mjesto"]) {
    				set_input_value(input5, /*user*/ ctx[0]["mjesto"]);
    			}

    			if (dirty & /*user*/ 1 && input6.value !== /*user*/ ctx[0]["porezni_obveznik"]) {
    				set_input_value(input6, /*user*/ ctx[0]["porezni_obveznik"]);
    			}

    			if (dirty & /*user*/ 1 && to_number(input7.value) !== /*user*/ ctx[0]["oib"]) {
    				set_input_value(input7, /*user*/ ctx[0]["oib"]);
    			}

    			if (dirty & /*user*/ 1 && to_number(input8.value) !== /*user*/ ctx[0]["matični_broj"]) {
    				set_input_value(input8, /*user*/ ctx[0]["matični_broj"]);
    			}

    			if (dirty & /*user*/ 1 && input9.value !== /*user*/ ctx[0]["šifra_djelatnosti"]) {
    				set_input_value(input9, /*user*/ ctx[0]["šifra_djelatnosti"]);
    			}

    			if (dirty & /*user*/ 1 && to_number(input10.value) !== /*user*/ ctx[0]["identifikacijski_broj"]) {
    				set_input_value(input10, /*user*/ ctx[0]["identifikacijski_broj"]);
    			}

    			if (dirty & /*user*/ 1 && input11.value !== /*user*/ ctx[0]["novčana_jedinica"]) {
    				set_input_value(input11, /*user*/ ctx[0]["novčana_jedinica"]);
    			}

    			if (dirty & /*user*/ 1 && input12.value !== /*user*/ ctx[0]["dani_za_dospijeće"]) {
    				set_input_value(input12, /*user*/ ctx[0]["dani_za_dospijeće"]);
    			}

    			if (dirty & /*user*/ 1 && input13.value !== /*user*/ ctx[0]["postotak_rabata"]) {
    				set_input_value(input13, /*user*/ ctx[0]["postotak_rabata"]);
    			}

    			if (dirty & /*user*/ 1 && input14.value !== /*user*/ ctx[0]["internet_stranica"]) {
    				set_input_value(input14, /*user*/ ctx[0]["internet_stranica"]);
    			}

    			if (dirty & /*user*/ 1 && input15.value !== /*user*/ ctx[0]["transakcijski_račun"]) {
    				set_input_value(input15, /*user*/ ctx[0]["transakcijski_račun"]);
    			}

    			if (dirty & /*user*/ 1 && input16.value !== /*user*/ ctx[0]["ime_prezime_kontakta"]) {
    				set_input_value(input16, /*user*/ ctx[0]["ime_prezime_kontakta"]);
    			}

    			if (dirty & /*user*/ 1 && input17.value !== /*user*/ ctx[0]["telefon"]) {
    				set_input_value(input17, /*user*/ ctx[0]["telefon"]);
    			}

    			if (dirty & /*user*/ 1 && input18.value !== /*user*/ ctx[0]["elektronska_pošta"]) {
    				set_input_value(input18, /*user*/ ctx[0]["elektronska_pošta"]);
    			}

    			if (dirty & /*user*/ 1 && input19.value !== /*user*/ ctx[0]["naziv_za_slanje"]) {
    				set_input_value(input19, /*user*/ ctx[0]["naziv_za_slanje"]);
    			}

    			if (dirty & /*user*/ 1 && input20.value !== /*user*/ ctx[0]["adresa_za_slanje"]) {
    				set_input_value(input20, /*user*/ ctx[0]["adresa_za_slanje"]);
    			}

    			if (dirty & /*user*/ 1 && input21.value !== /*user*/ ctx[0]["država_za_slanje"]) {
    				set_input_value(input21, /*user*/ ctx[0]["država_za_slanje"]);
    			}

    			if (dirty & /*user*/ 1 && input22.value !== /*user*/ ctx[0]["pošta_za_slanje"]) {
    				set_input_value(input22, /*user*/ ctx[0]["pošta_za_slanje"]);
    			}

    			if (dirty & /*user*/ 1 && input23.value !== /*user*/ ctx[0]["mjesto_pošte_za_slanje"]) {
    				set_input_value(input23, /*user*/ ctx[0]["mjesto_pošte_za_slanje"]);
    			}

    			if (dirty & /*user*/ 1 && input24.value !== /*user*/ ctx[0]["naziv_primatelja"]) {
    				set_input_value(input24, /*user*/ ctx[0]["naziv_primatelja"]);
    			}

    			if (dirty & /*user*/ 1 && input25.value !== /*user*/ ctx[0]["adresa_primatelja"]) {
    				set_input_value(input25, /*user*/ ctx[0]["adresa_primatelja"]);
    			}

    			if (dirty & /*user*/ 1 && input26.value !== /*user*/ ctx[0]["država_primatelja"]) {
    				set_input_value(input26, /*user*/ ctx[0]["država_primatelja"]);
    			}

    			if (dirty & /*user*/ 1 && input27.value !== /*user*/ ctx[0]["pošta_primatelja"]) {
    				set_input_value(input27, /*user*/ ctx[0]["pošta_primatelja"]);
    			}

    			if (dirty & /*user*/ 1 && input28.value !== /*user*/ ctx[0]["mjesto_primatelja"]) {
    				set_input_value(input28, /*user*/ ctx[0]["mjesto_primatelja"]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(form);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { user } = $$props;
    	let { submit } = $$props;

    	function input0_input_handler() {
    		user["šifra"] = to_number(this.value);
    		$$invalidate(0, user);
    	}

    	function input1_input_handler() {
    		user["naziv"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input2_input_handler() {
    		user["adresa"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input3_input_handler() {
    		user["država"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input4_input_handler() {
    		user["pošta"] = to_number(this.value);
    		$$invalidate(0, user);
    	}

    	function input5_input_handler() {
    		user["mjesto"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input6_input_handler() {
    		user["porezni_obveznik"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input7_input_handler() {
    		user["oib"] = to_number(this.value);
    		$$invalidate(0, user);
    	}

    	function input8_input_handler() {
    		user["matični_broj"] = to_number(this.value);
    		$$invalidate(0, user);
    	}

    	function input9_input_handler() {
    		user["šifra_djelatnosti"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input10_input_handler() {
    		user["identifikacijski_broj"] = to_number(this.value);
    		$$invalidate(0, user);
    	}

    	function input11_input_handler() {
    		user["novčana_jedinica"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input12_input_handler() {
    		user["dani_za_dospijeće"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input13_input_handler() {
    		user["postotak_rabata"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input14_input_handler() {
    		user["internet_stranica"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input15_input_handler() {
    		user["transakcijski_račun"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input16_input_handler() {
    		user["ime_prezime_kontakta"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input17_input_handler() {
    		user["telefon"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input18_input_handler() {
    		user["elektronska_pošta"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input19_input_handler() {
    		user["naziv_za_slanje"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input20_input_handler() {
    		user["adresa_za_slanje"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input21_input_handler() {
    		user["država_za_slanje"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input22_input_handler() {
    		user["pošta_za_slanje"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input23_input_handler() {
    		user["mjesto_pošte_za_slanje"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input24_input_handler() {
    		user["naziv_primatelja"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input25_input_handler() {
    		user["adresa_primatelja"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input26_input_handler() {
    		user["država_primatelja"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input27_input_handler() {
    		user["pošta_primatelja"] = this.value;
    		$$invalidate(0, user);
    	}

    	function input28_input_handler() {
    		user["mjesto_primatelja"] = this.value;
    		$$invalidate(0, user);
    	}

    	$$self.$$set = $$props => {
    		if ('user' in $$props) $$invalidate(0, user = $$props.user);
    		if ('submit' in $$props) $$invalidate(1, submit = $$props.submit);
    	};

    	return [
    		user,
    		submit,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		input6_input_handler,
    		input7_input_handler,
    		input8_input_handler,
    		input9_input_handler,
    		input10_input_handler,
    		input11_input_handler,
    		input12_input_handler,
    		input13_input_handler,
    		input14_input_handler,
    		input15_input_handler,
    		input16_input_handler,
    		input17_input_handler,
    		input18_input_handler,
    		input19_input_handler,
    		input20_input_handler,
    		input21_input_handler,
    		input22_input_handler,
    		input23_input_handler,
    		input24_input_handler,
    		input25_input_handler,
    		input26_input_handler,
    		input27_input_handler,
    		input28_input_handler
    	];
    }

    class Form extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$3, create_fragment$6, safe_not_equal, { user: 0, submit: 1 });
    	}
    }

    /* src/components/Customer/Edit.svelte generated by Svelte v3.52.0 */

    function create_if_block$2(ctx) {
    	let form;
    	let updating_user;
    	let current;

    	function form_user_binding(value) {
    		/*form_user_binding*/ ctx[3](value);
    	}

    	let form_props = { submit: /*submit*/ ctx[1] };

    	if (/*user*/ ctx[0] !== void 0) {
    		form_props.user = /*user*/ ctx[0];
    	}

    	form = new Form({ props: form_props });
    	binding_callbacks.push(() => bind(form, 'user', form_user_binding));

    	return {
    		c() {
    			create_component(form.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(form, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const form_changes = {};

    			if (!updating_user && dirty & /*user*/ 1) {
    				updating_user = true;
    				form_changes.user = /*user*/ ctx[0];
    				add_flush_callback(() => updating_user = false);
    			}

    			form.$set(form_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(form.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(form, detaching);
    		}
    	};
    }

    function create_fragment$5(ctx) {
    	let h4;
    	let t1;
    	let t2;
    	let br;
    	let current;
    	let if_block = /*user*/ ctx[0] && create_if_block$2(ctx);

    	return {
    		c() {
    			h4 = element("h4");
    			h4.textContent = "Ažuriraj Korisnika";
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			br = element("br");
    		},
    		m(target, anchor) {
    			insert(target, h4, anchor);
    			insert(target, t1, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert(target, t2, anchor);
    			insert(target, br, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*user*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*user*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t2.parentNode, t2);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(h4);
    			if (detaching) detach(t1);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(t2);
    			if (detaching) detach(br);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { params } = $$props;
    	let user;

    	fetch(`${config.url}/user/${params.id}`, {
    		headers: {
    			accept: "application/json",
    			"Content-Type": "application/json"
    		}
    	}).then(async res => {
    		$$invalidate(0, user = await res.json());
    	});

    	function submit() {
    		fetch(`${config.url}/user/${params.id}`, {
    			method: "PUT",
    			headers: {
    				accept: "application/json",
    				"Content-Type": "application/json"
    			},
    			body: JSON.stringify(user)
    		}).then(async res => {
    			$$invalidate(0, user = await res.json());
    		});
    	}

    	function form_user_binding(value) {
    		user = value;
    		$$invalidate(0, user);
    	}

    	$$self.$$set = $$props => {
    		if ('params' in $$props) $$invalidate(2, params = $$props.params);
    	};

    	return [user, submit, params, form_user_binding];
    }

    class Edit extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$2, create_fragment$5, safe_not_equal, { params: 2 });
    	}
    }

    /* src/components/Customer/New.svelte generated by Svelte v3.52.0 */

    function create_fragment$4(ctx) {
    	let h4;
    	let t1;
    	let form;
    	let t2;
    	let br;
    	let current;
    	form = new Form({ props: { user: model.user } });

    	return {
    		c() {
    			h4 = element("h4");
    			h4.textContent = "Novi Korisnik";
    			t1 = space();
    			create_component(form.$$.fragment);
    			t2 = space();
    			br = element("br");
    		},
    		m(target, anchor) {
    			insert(target, h4, anchor);
    			insert(target, t1, anchor);
    			mount_component(form, target, anchor);
    			insert(target, t2, anchor);
    			insert(target, br, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(form.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(form.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(h4);
    			if (detaching) detach(t1);
    			destroy_component(form, detaching);
    			if (detaching) detach(t2);
    			if (detaching) detach(br);
    		}
    	};
    }

    class New extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$4, safe_not_equal, {});
    	}
    }

    /* src/routes/CustomerList.svelte generated by Svelte v3.52.0 */

    function create_fragment$3(ctx) {
    	let customerlist;
    	let current;
    	customerlist = new CustomerList__default["default"]({});

    	return {
    		c() {
    			create_component(customerlist.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(customerlist, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i(local) {
    			if (current) return;
    			transition_in(customerlist.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(customerlist.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(customerlist, detaching);
    		}
    	};
    }

    class CustomerList_1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$3, safe_not_equal, {});
    	}
    }

    /* src/routes/PaymentSlipList.svelte generated by Svelte v3.52.0 */

    function create_else_block(ctx) {
    	let paymentsliplist;
    	let current;

    	paymentsliplist = new PaymentSlipTable__default["default"]({
    			props: { paymentSlips: /*paymentSlips*/ ctx[0] }
    		});

    	return {
    		c() {
    			create_component(paymentsliplist.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(paymentsliplist, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const paymentsliplist_changes = {};
    			if (dirty & /*paymentSlips*/ 1) paymentsliplist_changes.paymentSlips = /*paymentSlips*/ ctx[0];
    			paymentsliplist.$set(paymentsliplist_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(paymentsliplist.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(paymentsliplist.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(paymentsliplist, detaching);
    		}
    	};
    }

    // (19:0) {#if loading}
    function create_if_block$1(ctx) {
    	let spinner;
    	let current;
    	spinner = new Spinner__default["default"]({ props: { loading: /*loading*/ ctx[1] } });

    	return {
    		c() {
    			create_component(spinner.$$.fragment);
    		},
    		m(target, anchor) {
    			mount_component(spinner, target, anchor);
    			current = true;
    		},
    		p(ctx, dirty) {
    			const spinner_changes = {};
    			if (dirty & /*loading*/ 2) spinner_changes.loading = /*loading*/ ctx[1];
    			spinner.$set(spinner_changes);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(spinner.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(spinner.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			destroy_component(spinner, detaching);
    		}
    	};
    }

    function create_fragment$2(ctx) {
    	let h3;
    	let t1;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*loading*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	return {
    		c() {
    			h3 = element("h3");
    			h3.textContent = "Uplatnice";
    			t1 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			attr(h3, "class", "text-center");
    		},
    		m(target, anchor) {
    			insert(target, h3, anchor);
    			insert(target, t1, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(h3);
    			if (detaching) detach(t1);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach(if_block_anchor);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let paymentSlips = [];
    	let loading = true;

    	store.subscribe(state => {
    		$$invalidate(0, paymentSlips = state === null || state === void 0
    		? void 0
    		: state.paymentSlips);
    	});

    	getPaymentSlips().then(() => {
    		$$invalidate(1, loading = false);
    	});

    	return [paymentSlips, loading];
    }

    class PaymentSlipList_1 extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance$1, create_fragment$2, safe_not_equal, {});
    	}
    }

    /* src/routes/NotFound.svelte generated by Svelte v3.52.0 */

    function create_fragment$1(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");

    			div.innerHTML = `<h4 class="route title">NotFound</h4> 

  <p style="color: #fff">Oops, this route doesn&#39;t exist!</p>`;

    			attr(div, "class", "center");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    class NotFound extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$1, safe_not_equal, {});
    	}
    }

    const auth = () => {
        const { user } = get_store_value(store);
        if (!user)
            return false;
        return true;
    };
    const authConditions = {
        conditions: [
            () => {
                return auth();
            },
        ],
    };
    const routes = {
        "/signin": Signin,
        "/": wrap({
            component: CustomerList_1,
            ...authConditions,
        }),
        "/customer": wrap({
            component: CustomerList_1,
            ...authConditions,
        }),
        "/customer/new": wrap({
            component: New,
            ...authConditions,
        }),
        "/customer/:id/edit": wrap({
            component: Edit,
            ...authConditions,
        }),
        "/customer/:id": wrap({
            component: CustomerPaymentSlips,
            ...authConditions,
        }),
        "/isp": wrap({
            component: Isps,
            ...authConditions,
        }),
        "/isp/new": wrap({
            component: New$1,
            ...authConditions,
        }),
        "/isp/:id/edit": wrap({
            component: Edit$1,
            ...authConditions,
        }),
        "/isp/:id": wrap({
            component: Isp,
            ...authConditions,
        }),
        "/uplatnica": wrap({
            component: PaymentSlipList_1,
            ...authConditions,
        }),
        "/logout": wrap({
            component: Home,
            ...authConditions,
        }),
        "*": NotFound,
    };

    /* src/index.svelte generated by Svelte v3.52.0 */

    function create_if_block(ctx) {
    	let div;
    	let navbar;
    	let current;
    	navbar = new Navbar({});

    	return {
    		c() {
    			div = element("div");
    			create_component(navbar.$$.fragment);
    			attr(div, "class", "noprint");
    			set_style(div, "margin-bottom", "89px");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			mount_component(navbar, div, null);
    			current = true;
    		},
    		i(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(navbar.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			destroy_component(navbar);
    		}
    	};
    }

    function create_fragment(ctx) {
    	let t;
    	let div;
    	let router;
    	let current;
    	let if_block = /*user*/ ctx[0] && create_if_block();
    	router = new Router({ props: { routes } });
    	router.$on("conditionsFailed", /*conditionsFailed*/ ctx[1]);
    	router.$on("routeLoaded", /*routeLoaded*/ ctx[2]);
    	router.$on("routeEvent", /*routeEvent*/ ctx[3]);

    	return {
    		c() {
    			if (if_block) if_block.c();
    			t = space();
    			div = element("div");
    			create_component(router.$$.fragment);
    		},
    		m(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert(target, t, anchor);
    			insert(target, div, anchor);
    			mount_component(router, div, null);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if (/*user*/ ctx[0]) {
    				if (if_block) {
    					if (dirty & /*user*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block();
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(if_block);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(if_block);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(t);
    			if (detaching) detach(div);
    			destroy_component(router);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let user;
    	let logbox = "";

    	store.subscribe(state => {
    		$$invalidate(0, user = state.user);
    	});

    	function conditionsFailed(event) {
    		console.error("Caught event conditionsFailed", event.detail);
    		logbox += "conditionsFailed - " + JSON.stringify(event.detail) + "\n";

    		// Replace the route
    		push("#/signin");
    	}

    	function routeLoaded(event) {
    		console.info("Caught event routeLoaded", event.detail);
    		logbox += "routeLoaded - " + JSON.stringify(event.detail) + "\n";
    	}

    	function routeEvent(event) {
    		console.info("Caught event routeEvent", event.detail);
    		logbox += "routeEvent - " + JSON.stringify(event.detail) + "\n";
    	}

    	return [user, conditionsFailed, routeLoaded, routeEvent];
    }

    class Src extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, {});
    	}
    }

    new Src({
        target: document.body,
    });

})(store$1, ISPList, Spinner, PaymentSlipTable, PaymentSlip, http, BarcodeList, model, CustomerList);
