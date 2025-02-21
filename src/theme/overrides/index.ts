import merge from 'lodash/merge';

import {Theme} from '@mui/material/styles';

import {card} from './components/card';
import {menu} from './components/menu';
import {table} from './components/table';
import {alert} from './components/alert';
import {paper} from './components/paper';
import {radio} from './components/radio';
import {appBar} from './components/appbar';
import {drawer} from './components/drawer';
import {button} from './components/button';
import {select} from './components/select';
import {checkbox} from './components/checkbox';
import {textField} from './components/textfield';
import {typography} from './components/typography';
import {pagination} from './components/pagination';
import {datePicker} from './components/date-picker';
import {cssBaseline} from './components/css-baseline';
import {autocomplete} from './components/autocomplete';

// ----------------------------------------------------------------------

export function componentsOverrides(theme: Theme) {
    return merge(
        alert(theme),
        appBar(theme),
        autocomplete(theme),
        button(theme),
        card(theme),
        checkbox(theme),
        cssBaseline(theme),
        datePicker(theme),
        drawer(theme),
        menu(theme),
        pagination(theme),
        paper(theme),
        radio(theme),
        select(theme),
        table(theme),
        textField(theme),
        typography(theme),
    );
}
