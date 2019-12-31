function applyFunctionRecursively(def, md, x, ...args) {
    if (Array.isArray(x)) {
        x = x.map(e => applyFunctionRecursively(def, md, e, ...args));
    } else if (x instanceof Function) {
        x = x(md, def, ...args);
    } else if (x === Object(x)) {
        if (x.tag !== undefined || x.key !== undefined) {
            // probably a VNode, just return
            return x
        }
        x = Object.fromEntries(
            Object.getOwnPropertyNames(x).filter(x=>x[0] != '_').map(
                e => [e, applyFunctionRecursively(def, md, x[e], ...args)]))
    }
    return x;
}

export {
    applyFunctionRecursively
}
