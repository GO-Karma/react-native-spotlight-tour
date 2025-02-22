import styled from "styled-components/native";

import { vh } from "../../helpers/responsive";

export const MainContainer = styled.View`
  align-items: center;
  align-self: center;
  background-color: white;
  border-radius: 8px;
  justify-content: center;
  padding: ${vh(1)};
  width: 90%;
`;

export const TitleText = styled.Text`
  font-weight: bold;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: ${vh(1)};
  width: 100%;
`;

export const NavButton = styled.TouchableOpacity`
  align-items: center;
  padding: ${vh(2)};
`;
