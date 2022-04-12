import { createContext, useContext } from "react";
export var Align;
(function (Align) {
    Align["SCREEN"] = "screen";
    Align["SPOT"] = "spot";
})(Align || (Align = {}));
export var Position;
(function (Position) {
    Position["BOTTOM"] = "bottom";
    Position["LEFT"] = "left";
    Position["RIGHT"] = "right";
    Position["TOP"] = "top";
})(Position || (Position = {}));
export const SpotlightTourContext = createContext({
    changeSpot: () => undefined,
    goTo: () => undefined,
    next: () => undefined,
    previous: () => undefined,
    start: () => undefined,
    steps: [],
    stop: () => undefined
});
export function useSpotlightTour() {
    const { current, goTo, next, previous, start, stop } = useContext(SpotlightTourContext);
    return {
        current,
        goTo,
        next,
        previous,
        start,
        stop
    };
}
//# sourceMappingURL=SpotlightTour.context.js.map