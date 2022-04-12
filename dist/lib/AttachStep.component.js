import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { SpotlightTourContext } from "./SpotlightTour.context";
const StepView = styled.View `
  align-self: flex-start;
`;
export const AttachStep = ({ children, disabled, index, style }) => {
    const { current, changeSpot, spot } = useContext(SpotlightTourContext);
    const childRef = useRef(null);
    useEffect(() => {
        var _a;
        if (!spot) {
            changeSpot({ height: 0, width: 0, x: 0, y: 0 });
        }
        if (!disabled && current === index) {
            (_a = childRef.current) === null || _a === void 0 ? void 0 : _a.measureInWindow((x, y, width, height) => {
                changeSpot({ height, width, x, y });
            });
        }
    }, [current, disabled]);
    return (React.createElement(StepView, { ref: childRef, collapsable: false, style: style }, children));
};
//# sourceMappingURL=AttachStep.component.js.map