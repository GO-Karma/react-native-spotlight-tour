import React, { useCallback, useImperativeHandle, useRef, useState } from "react";
import { isChildFunction, isPromise } from "../helpers/common";
import { SpotlightTourContext } from "./SpotlightTour.context";
import { TourOverlay } from "./tour-overlay/TourOverlay.component";
export const SpotlightTourProvider = React.forwardRef((props, ref) => {
    const { children, overlayColor, overlayOpacity, steps } = props;
    const [current, setCurrent] = useState();
    const [spot, setSpot] = useState();
    const overlayRef = useRef(null);
    const renderStep = useCallback((index) => {
        var _a, _b, _c;
        if (steps[index] !== undefined) {
            const beforeHook = (_b = (_a = steps[index]).before) === null || _b === void 0 ? void 0 : _b.call(_a);
            const beforePromise = isPromise(beforeHook)
                ? beforeHook
                : Promise.resolve();
            return Promise.all([
                beforePromise,
                (_c = overlayRef.current) === null || _c === void 0 ? void 0 : _c.hideTip()
            ])
                .then(() => setCurrent(index));
        }
        return Promise.resolve();
    }, [steps]);
    const changeSpot = (newSpot) => {
        setSpot(newSpot);
    };
    const start = () => {
        renderStep(0);
    };
    const stop = () => {
        setCurrent(undefined);
    };
    const next = () => {
        if (current !== undefined && current < steps.length - 1) {
            renderStep(current + 1);
        }
    };
    const previous = () => {
        if (current !== undefined && current > 0) {
            renderStep(current - 1);
        }
    };
    const goTo = (index) => {
        renderStep(index);
    };
    const tour = {
        changeSpot,
        current,
        goTo,
        next,
        previous,
        spot,
        start,
        steps,
        stop
    };
    useImperativeHandle(ref, () => ({
        current,
        goTo,
        next,
        previous,
        start,
        stop
    }));
    return (React.createElement(SpotlightTourContext.Provider, { value: tour },
        isChildFunction(children)
            ? React.createElement(SpotlightTourContext.Consumer, null, children)
            : React.createElement(React.Fragment, null, children),
        React.createElement(TourOverlay, { ref: overlayRef, color: overlayColor, opacity: overlayOpacity, tour: tour })));
});
//# sourceMappingURL=SpotlightTour.provider.js.map