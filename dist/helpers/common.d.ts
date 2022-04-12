/// <reference types="react" />
export declare type ChildFn<T> = (value: T) => React.ReactNode;
export declare function isChildFunction<T>(children: React.ReactNode | ChildFn<T>): children is ChildFn<T>;
export declare function isPromise<T>(value?: any): value is Promise<T>;
