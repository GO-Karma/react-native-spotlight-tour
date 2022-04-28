/// <reference types="react" />
import { LayoutRectangle, Omit } from "react-native";
export declare enum Align {
    SCREEN = "screen",
    SPOT = "spot"
}
export declare enum Position {
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    TOP = "top"
}
export declare type RenderProps = Pick<SpotlightTourCtx, "next" | "previous" | "stop"> & {
    current: number;
    isFirst: boolean;
    isLast: boolean;
};
interface onClose {
    stop?: () => void;
}
export interface TourStep {
    alignTo?: Align;
    before?(): void | Promise<void>;
    render(props: RenderProps): React.ReactNode;
    position: Position;
    onClose?(props: onClose): void | Promise<void>;
}
export interface SpotlightTourCtx {
    changeSpot(spot: LayoutRectangle): void;
    current?: number;
    goTo(index: number): void;
    next(): void;
    previous(): void;
    spot?: LayoutRectangle;
    start(): void;
    steps: TourStep[];
    stop(): void;
}
export declare const SpotlightTourContext: import("react").Context<SpotlightTourCtx>;
export declare type SpotlightTour = Omit<SpotlightTourCtx, "changeSpot" | "spot" | "steps">;
export declare function useSpotlightTour(): SpotlightTour;
export {};
