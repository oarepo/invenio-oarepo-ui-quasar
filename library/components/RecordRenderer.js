import { JSONPath } from 'jsonpath-plus';
import { applyFunctionRecursively } from '../utils';


export default {
    props: {
        record: Object,
        definition: Array,
        url: String,
        debug: Boolean
    },
    render(h) {
        const _vue = this;

        function defunc(def, md, x) {
            return applyFunctionRecursively(def, md, x, _vue.record, _vue);
        }

        function makeDebugTitle(key, def, paths) {
            return `key: ${key}, paths ${paths}`;
        }

        function createHtmlElement(def, md, element, elementDefault, elementClass,
                                   elementStyle, elementAttrs, value, key, paths) {
            return h(defunc(def, md, element) || elementDefault, {
                key,
                class: defunc(def, md, elementClass),
                style: defunc(def, md, elementStyle),
                attrs: {
                    title: _vue.debug ? makeDebugTitle(key, def, paths) : undefined,
                    ...defunc(def, md, elementAttrs || {}),
                    id: key
                },
            }, defunc(def, md, value));
        }

        function createComponent(def, md, value, key, paths) {
            def = {
                ...def,
                value: value
            };
            return h(def.component, {
                class: defunc(def, md, def.valueClass),
                style: defunc(def, md, def.valueStyle),
                attrs: {
                    title: _vue.debug ? makeDebugTitle(key, def, paths) : undefined,
                    ...defunc(def, md, def.valueAttrs || {}),
                    id: key
                },
                props: {
                    part: def
                },
                key,
            });
        }

        function createValue(def, md, value, key, paths) {
            const ret = h(defunc(def, md, def.valueElement) || 'span', {
                class: defunc(def, md, def.valueClass),
                style: defunc(def, md, def.valueStyle),
                attrs: {
                    title: _vue.debug ? makeDebugTitle(key, def, paths) : undefined,
                    ...defunc(def, md, def.valueAttrs || {}),
                    id: key
                },
                key
            }, defunc(def, md, value));
            const link = defunc(def, md, def.link);
            const attrs = {
                to: _vue.url || '/',
                ...(Object(link) === def.link ? def.link : {}),
            };
            if (link) {
                return h('router-link', {
                        attrs
                    },
                    [ret]
                );
            }
            return ret;
        }

        function merge(a, b, separator) {
            if (a === Object(a)) {
                if (b === Object(b)) {
                    return { ...b, ...a };
                } else {
                    b = Object.fromEntries((b || '').split(separator)
                        .map(x => [x, true]));
                    return { ...b, ...a };
                }
            } else {
                if (b === Object(b)) {
                    a = Object.fromEntries((a || '').split(separator)
                        .map(x => [x, true]));
                    return { ...b, ...a };
                }
                if (a !== undefined) {
                    return `${b}${separator}${a}`;
                } else {
                    return b;
                }
            }
        }

        function renderDefinition(def, metadata, key, paths) {
            if (def instanceof Function) {
                def = def(metadata, _vue.record, _vue);
            }

            let values = [metadata];
            let localKey = key;
            if (def.path) {
                values = JSONPath({
                    path: defunc(def, metadata, def.path),
                    json: metadata
                });
                localKey = key + def.path;
                if (paths.length > 0) {
                    paths = paths.map(x => `${x}/${def.path}`);
                    paths.push(def.path);
                } else {
                    paths = [def.path];
                }
            }
            const ret = [];

            if (!values.length && !def.showEmpty) {
                return [];
            }
            if (def.label) {
                ret.push(createHtmlElement(def, metadata, def.labelElement, 'label',
                    def.labelClass, def.labelStyle, def.labelAttrs, def.label,
                    `${localKey}.label`, paths));
            }

            if (def.component) {
                if (def.groupValues) {
                    ret.push(
                        createComponent(def, values, values, `${localKey}.multiple`, paths)
                    );
                } else {
                    ret.push(...values.map(
                        (value, idx) => createComponent(def, value, value, `${localKey}[${idx}]`, paths))
                    );
                }
            } else {
                const slot = paths.find(x => _vue.$scopedSlots[`path-${x}`]);
                if (slot) {
                    const slotFunc = _vue.$scopedSlots[`path-${slot}`];
                    if (def.groupValues) {
                        ret.push(
                            slotFunc({
                                def: {
                                    ...def,
                                    value: values
                                },
                                paths,
                                key: `${localKey}.multiple`
                            })
                        );
                    } else {
                        ret.push(...values.map(
                            (value, idx) => slotFunc({
                                def: {
                                    ...def,
                                    value: value
                                },
                                paths,
                                key: `${localKey}[${idx}]`
                            })
                        ));
                    }
                } else {

                    if (!def.children || defunc(def, metadata, def.valueElement)) {
                        ret.push(...values.map(
                            (value, idx) => createValue(def, value, value, `${localKey}[${idx}]`, paths)));
                    }
                }

            }
            if (def.children && !def.component) {
                const rr = values.map((value, idx) => renderDefinitionList(
                    def.children || [], value, `${localKey}[${idx}].`, paths))
                    .flat();
                const childrenClass = defunc(def, metadata, def.childrenClass);
                const childrenStyle = defunc(def, metadata, def.childrenStyle);
                const childrenAttrs = defunc(def, metadata, def.childrenAttrs);
                rr.forEach(vnode => {
                    if (childrenClass) {
                        vnode.data.class = merge(vnode.data.class, childrenClass, ' ');
                    }
                    if (childrenStyle) {
                        vnode.data.style = merge(vnode.data.style, childrenStyle, ';');
                    }
                    if (childrenAttrs) {
                        vnode.data.attrs = merge(vnode.data.attrs, childrenAttrs, ' ');
                    }
                });
                ret.push(...rr);
            }
            if (def.element !== null) {
                return createHtmlElement(def, metadata, def.element, 'div',
                    def.elementClass, def.elementStyle, def.elementAttrs, ret, localKey, paths);
            } else {
                return ret;
            }
        }

        function renderDefinitionList(dl, metadata, key, paths) {
            if (dl instanceof Function) {
                dl = dl(metadata, _vue.record, _vue);
            }

            return dl.map((def, idx) => renderDefinition(def, metadata, `${key}{${idx}}`, paths))
                .flat();
        }

        return h('div', renderDefinitionList(this.definition,
            this.record.metadata, `oarepo-item-${this.$_uid}/`, []));
    }
};
