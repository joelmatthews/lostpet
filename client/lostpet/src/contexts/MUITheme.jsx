import { createTheme, ThemeProvider } from "@mui/material/styles";

const themeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#793fb5',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

const theme = createTheme(themeOptions);

const MUITheme = ({children}) => {
    return (
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
    )
};


export default MUITheme;