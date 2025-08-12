import { neobrutalism } from "@clerk/themes";

export const customNeobrutalistTheme = {
  baseTheme: neobrutalism,
  variables: {
    colorPrimary: "#05e17a",
    colorBackground: "#ffffff",
    colorText: "#000000",
    colorInputBackground: "#ffffff",
    colorInputText: "#000000",
    borderRadius: "0px",
    fontFamily: "inherit",
    fontWeight: "bold",
  },
  elements: {
    formButtonPrimary: {
      backgroundColor: "#05e17a",
      border: "2px solid #000000",
      boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)",
      borderRadius: "0px",
      fontWeight: "bold",
      textTransform: "uppercase",
      transition: "all 0.2s ease",
      "&:hover": {
        backgroundColor: "#000000",
        color: "#05e17a",
        boxShadow: "4px 4px 0px 0px rgba(5,225,122,1)",
        transform: "translate(-1px, -1px)",
      },
      "&:active": {
        transform: "translate(1px, 1px)",
        boxShadow: "2px 2px 0px 0px rgba(5,225,122,1)",
      },
    },
    card: {
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
    },
    headerTitle: {
      display: "none",
    },
    headerSubtitle: {
      display: "none",
    },
    socialButtonsBlockButton: {
      border: "2px solid #000000",
      boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)",
      borderRadius: "0px",
      fontWeight: "bold",
      transition: "all 0.2s ease",
      "&:hover": {
        boxShadow: "3px 3px 0px 0px rgba(5,225,122,1)",
        transform: "translate(-1px, -1px)",
      },
    },
    formFieldInput: {
      border: "2px solid #000000",
      borderRadius: "0px",
      boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.1)",
      fontWeight: "500",
      "&:focus": {
        boxShadow: "3px 3px 0px 0px rgba(5,225,122,1)",
        borderColor: "#05e17a",
      },
    },
    footerActionLink: {
      color: "#05e17a",
      fontWeight: "bold",
      textDecoration: "underline",
      textDecorationThickness: "2px",
      textUnderlineOffset: "2px",
      "&:hover": {
        color: "#000000",
      },
    },
    formFieldLabel: {
      fontWeight: "bold",
      color: "#000000",
      textTransform: "uppercase",
      fontSize: "0.875rem",
    },
    identityPreviewText: {
      fontWeight: "bold",
    },
    formFieldSuccessText: {
      color: "#05e17a",
      fontWeight: "bold",
    },
    formFieldErrorText: {
      color: "#dc2626",
      fontWeight: "bold",
    },
    alertText: {
      fontWeight: "bold",
    },
    formFieldHintText: {
      fontWeight: "500",
    },
  },
};