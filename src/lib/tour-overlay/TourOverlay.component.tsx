import React, { useEffect, useImperativeHandle, useState } from "react";
import {
  LayoutChangeEvent,
  LayoutRectangle,
  Modal,
  StyleProp,
  ViewStyle,
} from "react-native";
import Svg, { Defs, Mask, Rect, RectProps, rgbaArray } from "react-native-svg";
import ReAnimated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { vhDP, vwDP } from "../../helpers/responsive";
import { Align, Position, SpotlightTourCtx } from "../SpotlightTour.context";

import { OverlayView, TipView } from "./TourOverlay.styles";

export interface TourOverlayRef {
  hideTip(): Promise<void>;
}

interface TourOverlayProps {
  color?: string | number | rgbaArray;
  opacity?: number | string;
  tour: SpotlightTourCtx;
}

// const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedRect = ReAnimated.createAnimatedComponent(Rect);

export const TourOverlay = React.forwardRef<TourOverlayRef, TourOverlayProps>(
  (props, ref) => {
    const { color = "black", opacity = 0.45, tour } = props;
    const { current, next, previous, spot, steps, stop } = tour;

    if (!spot || current === undefined) {
      return null;
    }

    const sizeWidth = useSharedValue(0);
    const sizeHeight = useSharedValue(0);
    const locationX = useSharedValue(0);
    const locationY = useSharedValue(0);
    const tipOp = useSharedValue(0);

    const [tourStep, setTourStep] = useState(steps[current]);
    const [tipStyle, setTipStyle] = useState<StyleProp<ViewStyle>>();
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

    const getTipStyles = (tipLayout: LayoutRectangle): StyleProp<ViewStyle> => {
      const tipMargin: string = "2%";
      const align = tourStep.alignTo ?? Align.SPOT;

      switch (tourStep.position) {
        case Position.BOTTOM:
          return {
            left:
              align === Align.SPOT
                ? Math.round(cx - tipLayout.width / 2)
                : Math.round((vwDP(100) - tipLayout.width) / 2),
            marginTop: tipMargin,
            top: Math.round(spot.y + height + 10),
          };

        case Position.TOP:
          return {
            left:
              align === Align.SPOT
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

    const measureTip = (event: LayoutChangeEvent) => {
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
        return new Promise<void>((resolve) => {
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

    const animatedProps = useAnimatedProps<RectProps>(() => ({
      width: sizeWidth.value,
      height: sizeHeight.value,
      x: locationX.value,
      y: locationY.value,
      fill: "black",
      rx: 10,
    }));

    const tipOpacityStyle = useAnimatedStyle(() => ({
      opacity: tipOp.value,
    }));

    return (
      <Modal
        animationType="fade"
        presentationStyle="overFullScreen"
        transparent={true}
        visible={true}>
        <OverlayView accessibilityLabel="Tour Overlay View">
          <Svg
            accessibilityLabel="Svg overlay view"
            height="100%"
            width="100%"
            viewBox={`0 0 ${vwDP(100)} ${vhDP(100)}`}>
            <Defs>
              <Mask id="mask" x={0} y={0} height="100%" width="100%">
                <Rect height="100%" width="100%" fill="#fff" />
                {/* <AnimatedCircle
                r={radius}
                cx={center.x}
                cy={center.y}
                fill="black"
              /> */}

                <AnimatedRect animatedProps={animatedProps} />
              </Mask>
            </Defs>

            <Rect
              height="100%"
              width="100%"
              fill={color}
              mask="url(#mask)"
              opacity={opacity}
              onPress={() => tourStep.onClose?.({ stop })}
            />
          </Svg>

          <TipView
            accessibilityLabel="Tip Overlay View"
            onLayout={measureTip}
            style={[tipStyle, tipOpacityStyle]}>
            {tourStep.render({
              current,
              isFirst: current === 0,
              isLast: current === steps.length - 1,
              next,
              previous,
              stop,
            })}
          </TipView>
        </OverlayView>
      </Modal>
    );
  }
);
