import { JSONPath } from 'jsonpath-plus';
import { applyFunctionRecursively } from '../utils';


export default {
    props: {
        record: Object,
        definition: Array
    },
    render(h) {
        const _vue = this;

        function defunc(def, md, x) {
            return applyFunctionRecursively(def, md, x, _vue, _vue.record);
        }

        function createHtmlElement(def, md, element, elementDefault, elementClass,
                                   elementStyle, elementAttrs, value, key) {
            return h(defunc(def, md, element) || elementDefault, {
                key,
                class: defunc(def, md, elementClass),
                style: defunc(def, md, elementStyle),
                attrs: defunc(def, md, elementAttrs || {}),
            }, defunc(def, md, value));
        }

        function createComponent(def, md, value, key) {
            def = {
                ...def,
                value: value
            };
            return h(def.component, {
                class: defunc(def, md, def.valueClass),
                style: defunc(def, md, def.valueStyle),
                attrs: defunc(def, md, def.valueAttrs || {}),
                props: {
                    part: def
                },
                key,
            });
        }

        function createValue(def, md, value, key) {
            return h(defunc(def, md, def.valueElement) || 'span', {
                class: defunc(def, md, def.valueClass),
                style: defunc(def, md, def.valueStyle),
                attrs: defunc(def, md, def.valueAttrs || {}),
                key
            }, defunc(def, md, value));
        }

        function merge(a, b, separator) {
            if (a === Object(a)) {
                if (b === Object(b)) {
                    return {...b, ...a}
                } else {
                    b = Object.fromEntries((b || '').split(separator).map(x => [x, true]))
                    return {...b, ...a}
                }
            } else {
                if (b === Object(b)) {
                    a = Object.fromEntries((a || '').split(separator).map(x => [x, true]))
                    return {...b, ...a}
                }
                if (a !== undefined) {
                    return `${b}${separator}${a}`
                } else {
                    return b
                }
            }
        }

        function renderDefinition(def, metadata, key) {
            let values = [metadata];
            let localKey = key;
            if (def.path) {
                values = JSONPath({
                    path: defunc(def, metadata, def.path),
                    json: metadata
                });
                localKey = key + def.path;
            }
            const ret = [];

            if (def.label) {
                ret.push(createHtmlElement(def, metadata, def.labelElement, 'label',
                    def.labelClass, def.labelStyle, def.labelAttrs, def.label, localKey));
            }

            if (def.component) {
                ret.push(...values.map(
                    (value, idx) => createComponent(def, value, value, `${localKey}[${idx}]`))
                );
            } else {
                if (!def.children || defunc(def, metadata, def.valueElement)) {
                    ret.push(...values.map(
                        (value, idx) => createValue(def, value, value, `${localKey}[${idx}]`)));
                }
                if (def.children) {
                    const rr = values.map((value, idx) => renderDefinitionList(
                        def.children || [], value, `${localKey}[${idx}].`))
                        .flat();
                    const childrenClass = defunc(def, metadata, def.childrenClass);
                    const childrenStyle = defunc(def, metadata, def.childrenStyle);
                    const childrenAttrs = defunc(def, metadata, def.childrenAttrs);
                    rr.forEach(vnode => {
                        if (childrenClass) {
                            vnode.data.class = merge(vnode.data.class, childrenClass, ' ')
                        }
                        if (childrenStyle) {
                            vnode.data.style = merge(vnode.data.style, childrenStyle, ';')
                        }
                        if (childrenAttrs) {
                            vnode.data.attrs = merge(vnode.data.attrs, childrenAttrs, ' ')
                        }
                    })
                    ret.push(...rr);
                }
            }

            if (def.element !== null) {
                return createHtmlElement(def, metadata, def.element, 'div',
                    def.elementClass, def.elementStyle, def.elementAttrs, ret, localKey);
            } else {
                return ret;
            }
        }

        function renderDefinitionList(dl, metadata, key) {
            return dl.map((def, idx) => renderDefinition(def, metadata, `${key}{${idx}}`))
                .flat();
        }

        return h('div', renderDefinitionList(this.definition,
            this.record.metadata, `oarepo-item-${this.uid}/`));
    }
};
