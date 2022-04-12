export function isChildFunction(children) {
    return typeof children === "function";
}
export function isPromise(value) {
    return typeof (value === null || value === void 0 ? void 0 : value.then) === "function";
}
//# sourceMappingURL=common.js.map