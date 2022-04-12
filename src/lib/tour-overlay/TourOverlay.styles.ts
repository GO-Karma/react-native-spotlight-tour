import { ViewProps } from "react-native";
import styled from "styled-components/native";
import ReAnimated from "react-native-reanimated"

import { vh, vw } from "../../helpers/responsive";

export const OverlayView = styled.View`
  height: ${vh(100)};
  width: ${vw(100)};
`;

export const TipView = styled(ReAnimated.View)<ViewProps>`
  position: absolute;
`;
