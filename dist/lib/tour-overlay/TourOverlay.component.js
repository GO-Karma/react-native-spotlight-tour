import React, { useEffect, useImperativeHandle, useState } from "react";
import { Modal, } from "react-native";
import Svg, { Defs, Mask, Rect } from "react-native-svg";
import ReAnimated, { Easing, useAnimatedProps, useAnimatedStyle, useSharedValue, withDelay, withTiming, } from "react-native-reanimated";
import { vhDP, vwDP } from "../../helpers/responsive";
import { Align, Position } from "../SpotlightTour.context";
import { OverlayView, TipView } from "./TourOverlay.styles";
// const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = ReAnimated.createAnimatedComponent(Rect);
export const TourOverlay = React.forwardRef((props, ref) => {
    const { color = "black", opacity = 0.45, tour } = props;
    const { current, next, previous, spot, steps, stop } = tour;
    if (!spot || current === undefined) {
        return null;
    }
    const sizeWidth = useSharedValue(1);
    const sizeHeight = useSharedValue(1);
    const locationX = useSharedValue(1);
    const locationY = useSharedValue(1);
    const tipOp = useSharedValue(1);
    const [tourStep, setTourStep] = useState(steps[current]);
    const [tipStyle, setTipStyle] = useState();
    // const [radius] = useState(new Animated.Value(0));
    // const [center] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
    // const [tipOpacity] = useState(new Animated.Value(0));
    const r = (Math.max(spot.width, spot.height) / 2) * 1.15;
    const cx = spot.x + spot.width / 2;
    const cy = spot.y + spot.height / 2;
    const xLoc = spot.x;
    const yLoc = spot.y;
    const width = spot.width;
    const height = spot.height;
    // const useNativeDriver = useMemo(() => Platform.select({
    //   android: false,
    //   default: false,
    //   ios: true
    // }), [Platform.OS]);
    const getTipStyles = (tipLayout) => {
        var _a;
        const tipMargin = "2%";
        const align = (_a = tourStep.alignTo) !== null && _a !== void 0 ? _a : Align.SPOT;
        switch (tourStep.position) {
            case Position.BOTTOM:
                return {
                    left: align === Align.SPOT
                        ? Math.round(cx - tipLayout.width / 2)
                        : Math.round((vwDP(100) - tipLayout.width) / 2),
                    marginTop: tipMargin,
                    top: Math.round(spot.y + height + 10),
                };
            case Position.TOP:
                return {
                    left: align === Align.SPOT
                        ? Math.round(cx - tipLayout.width / 2)
                        : Math.round((vwDP(100) - tipLayout.width) / 2),
                    marginBottom: tipMargin,
                    top: Math.round(yLoc - tipLayout.height - 10),
                };
            case Position.LEFT:
                return {
                    left: Math.round(cx - width - tipLayout.width),
                    marginRight: tipMargin,
                    top: Math.round(cy - tipLayout.height / 2),
                };
            case Position.RIGHT:
                return {
                    left: Math.round(cx + r),
                    marginLeft: tipMargin,
                    top: Math.round(cy - tipLayout.height / 2),
                };
        }
    };
    const measureTip = (event) => {
        setTipStyle(getTipStyles(event.nativeEvent.layout));
    };
    useEffect(() => {
        // const moveIn = Animated.parallel([
        //   Animated.spring(center, {
        //     damping: 50,
        //     mass: 5,
        //     stiffness: 300,
        //     toValue: { x: cx, y: cy },
        //     useNativeDriver
        //   }),
        //   Animated.spring(radius, {
        //     damping: 30,
        //     mass: 5,
        //     stiffness: 300,
        //     toValue: r,
        //     useNativeDriver
        //   }),
        //   Animated.timing(tipOpacity, {
        //     delay: 500,
        //     duration: 500,
        //     toValue: 1,
        //     useNativeDriver
        //   })
        // ]);
        // moveIn.stop();
        setTourStep(steps[current]);
        /**
         * We need to start the animation asynchronously or the layout callback may
         * overlap, causing different behaviors in iOS and than Android.
         * TODO: Refactor the animation flow to better handle the layout callback.
         */
        setTimeout(() => {
            setTipStyle(undefined);
            sizeWidth.value = withTiming(width + 10, {
                duration: 500,
                easing: Easing.bezier(0.33, 0.01, 0, 1),
            });
            sizeHeight.value = withTiming(height + 10, {
                duration: 500,
                easing: Easing.bezier(0.33, 0.01, 0, 1),
            });
            locationX.value = withTiming(xLoc - 5, {
                duration: 500,
                easing: Easing.bezier(0.33, 0.01, 0, 1),
            });
            locationY.value = withTiming(yLoc - 5, {
                duration: 500,
                easing: Easing.bezier(0.33, 0.01, 0, 1),
            });
            tipOp.value = withDelay(500, withTiming(1, { duration: 500 }));
            // moveIn.start();
        });
    }, [spot, current]);
    useImperativeHandle(ref, () => ({
        hideTip() {
            return new Promise((resolve) => {
                // Animated.timing(tipOpacity, {
                //   duration: 200,
                //   toValue: 0,
                //   useNativeDriver
                // })
                // .start(({ finished }) => finished
                //   ? resolve()
                //   : reject()
                // );
                tipOp.value = withTiming(0, { duration: 200 });
                setTimeout(() => {
                    resolve();
                }, 200);
            });
        },
    }));
    const animatedProps = useAnimatedProps(() => ({
        width: Math.abs(sizeWidth.value),
        height: Math.abs(sizeHeight.value),
        x: locationX.value,
        y: locationY.value
    }));
    const tipOpacityStyle = useAnimatedStyle(() => ({
        opacity: tipOp.value,
    }));
    return (React.createElement(Modal, { animationType: "fade", presentationStyle: "overFullScreen", transparent: true, visible: true },
        React.createElement(OverlayView, { accessibilityLabel: "Tour Overlay View" },
            React.createElement(Svg, { accessibilityLabel: "Svg overlay view", height: "100%", width: "100%", viewBox: `0 0 ${vwDP(100)} ${vhDP(100)}` },
                React.createElement(Defs, null,
                    React.createElement(Mask, { id: "mask", x: 0, y: 0, height: "100%", width: "100%" },
                        React.createElement(Rect, { height: "100%", width: "100%", fill: "#fff" }),
                        React.createElement(AnimatedRect, { animatedProps: animatedProps, fill: "black", rx: 10 }))),
                React.createElement(Rect, { height: "100%", width: "100%", fill: color, mask: "url(#mask)", opacity: opacity, onPress: () => { var _a; return (_a = tourStep.onClose) === null || _a === void 0 ? void 0 : _a.call(tourStep, { stop }); } })),
            React.createElement(TipView, { accessibilityLabel: "Tip Overlay View", onLayout: measureTip, style: [tipStyle, tipOpacityStyle] }, tourStep.render({
                current,
                isFirst: current === 0,
                isLast: current === steps.length - 1,
                next,
                previous,
                stop,
            })))));
});
//# sourceMappingURL=TourOverlay.component.js.map