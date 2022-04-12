import React from "react";
import { rgbaArray } from "react-native-svg";
import { SpotlightTourCtx } from "../SpotlightTour.context";
export interface TourOverlayRef {
    hideTip(): Promise<void>;
}
interface TourOverlayProps {
    color?: string | number | rgbaArray;
    opacity?: number | string;
    tour: SpotlightTourCtx;
}
export declare const TourOverlay: React.ForwardRefExoticComponent<TourOverlayProps & React.RefAttributes<TourOverlayRef>>;
export {};
