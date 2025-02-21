'use client';

import {useMemo} from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider} from '@mui/material/styles';


// system
import {palette} from './palette';
import {shadows} from './shadows';
import {typography} from './typography';
// options
import {componentsOverrides} from './overrides';
import {customShadows} from "@/theme/custom-shadows";

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function ThemeProvider({children}: Props) {

    const memoizedValue = useMemo(
        () => ({
            palette: {
                ...palette,
            },
            customShadows: {
                ...customShadows(),
            },
            shadows: shadows(),
            shape: {borderRadius: 8},
            typography,
        }), []
    );

    const theme = createTheme(memoizedValue as ThemeOptions);

    theme.components = componentsOverrides(theme);

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </MuiThemeProvider>
    );
}
