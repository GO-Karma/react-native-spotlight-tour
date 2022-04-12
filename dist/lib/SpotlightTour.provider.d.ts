import React from "react";
import { rgbaArray } from "react-native-svg";
import { ChildFn } from "../helpers/common";
import { SpotlightTour, TourStep } from "./SpotlightTour.context";
interface SpotlightTourProviderProps {
    children: React.ReactNode | ChildFn<SpotlightTour>;
    overlayColor?: string | number | rgbaArray;
    overlayOpacity?: number | string;
    steps: TourStep[];
}
export declare const SpotlightTourProvider: React.ForwardRefExoticComponent<SpotlightTourProviderProps & React.RefAttributes<SpotlightTour>>;
export {};
