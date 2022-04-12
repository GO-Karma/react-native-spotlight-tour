import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { RenderProps } from "../SpotlightTour.context";
interface TourBoxProps extends RenderProps {
    backText?: string;
    nextText?: string;
    title?: string;
    hideNext?: boolean;
    hideBack?: boolean;
    onBack?: () => void;
    onNext?: () => void;
    backStyle?: StyleProp<ViewStyle>;
    nextStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
}
export declare const TourBox: React.FC<TourBoxProps>;
export {};
