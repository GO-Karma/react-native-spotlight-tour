import React from "react";
import { Text } from "react-native";
import { FooterContainer, MainContainer, NavButton, TitleText } from "./TourBox.styles";
export const TourBox = props => {
    const { backText, nextText, title, hideNext, hideBack, onBack, onNext, backStyle, nextStyle, titleStyle, style, children, isLast, isFirst, previous, stop, next } = props;
    const handleBack = () => {
        isFirst ? stop() : previous();
        onBack === null || onBack === void 0 ? void 0 : onBack();
    };
    const handleNext = () => {
        isLast ? stop() : next();
        onNext === null || onNext === void 0 ? void 0 : onNext();
    };
    return (React.createElement(MainContainer, { style: style },
        title && (React.createElement(TitleText, { style: titleStyle }, title)),
        children,
        (!hideBack || !hideNext) && (React.createElement(FooterContainer, null,
            !hideBack && (React.createElement(NavButton, { style: backStyle, onPress: handleBack },
                React.createElement(Text, null, backText || "Back"))),
            !hideNext && (React.createElement(NavButton, { style: nextStyle, onPress: handleNext },
                React.createElement(Text, null, nextText || "Next")))))));
};
//# sourceMappingURL=TourBox.component.js.map