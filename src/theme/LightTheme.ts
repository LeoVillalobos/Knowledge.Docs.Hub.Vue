import type { ThemeTypes } from "@/types/themeTypes/ThemeType";
import { colors } from "@/theme/Colors";

const PurpleTheme: ThemeTypes = {
  name: "PurpleTheme",
  dark: false,
  variables: {
    "border-color": "#080807",
    "carousel-control-size": 10
  },
  colors: {
    primary: colors["deep-purple-lighten-1"], //"#5D87FF"
    secondary: "#49BEFF",
    info: "#539BFF",
    success: "#13DEB9",
    accent: "#FFAB91",
    warning: "#FFAE1F",
    error: colors["red-darken-1"],
    muted: "#5a6a85",
    lightprimary: "#ECF2FF",
    lightsecondary: "#E8F7FF",
    lightsuccess: "#E6FFFA",
    lighterror: "#FDEDE8",
    lightwarning: "#FEF5E5",
    textPrimary: "#2A3547",
    textSecondary: "#2A3547",
    borderColor: "#e5eaef",
    inputBorder: "#000",
    containerBg: "#ffffff",
    hoverColor: "#f6f9fc",
    surface: "#fff",
    "on-surface-variant": "#fff",
    grey100: "#F2F6FA",
    grey200: "#EAEFF4",
    "action-generic-color": colors["deep-purple-lighten-1"],
    "action-save-color": colors["deep-purple-lighten-1"],
    "action-added-color": colors["deep-purple-lighten-1"],
    "action-edit-color": colors["blue-darken-3"],
    "action-update-color": colors["blue-darken-3"],
    "action-clear-color": colors["blue-darken-3"],
    "action-return-color": colors["blue-grey-lighten-2"],
    "account-user-color": colors["deep-purple-accent-1"],
    ...colors
  }
};

export { PurpleTheme };
