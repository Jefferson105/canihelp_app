# Canihelp

## Setup Project

-   Clone repository
-   Open terminal in root directory and run the command `yarn install`
-   Start metro server with `yarn start`
-   Make sure you have at least one device connected (virtual or physical) and run the command `yarn android` or `yarn ios`

## Directory Structure

Main project files and directories:

-   assets: meta assets (icon, splash and fonts)
-   src
    -   assets: images, icons etc
    -   components: internal components
    -   error: customized error
    -   hooks: internal components hooks
    -   pages: pages screens - auth: authenticated pages - register: registration/validation pages - verifications: verification pages - ...others
    -   redux: redux contents - actions: redux actions - reducers: redux reducers - store: redux configuration
    -   routes: navigation config
    -   services: internal services
    -   styles - components - elements - form - layout - typograph - colors.js: app colors
    -   utils: utils funcions variable
    -   App.tsx : main app component
    -   config.js: general config
-   index.js: entry app file

## Code Conventions

In addition to the rules described in the eslint configuration we have a few more internal code conventions.

### Imports

```
[third party imports]
(break line)
[internal components and internal hooks imports]
(break line)
[intenal style components]
(break line)
[internal funcionation, variables and anything else]
```

#### Example:

```
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useAppState } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import SearchText from '../components/search-text';
import SearchInput from '../components/search-input';

import { NavHeader, Container, SafeView, Name, List, Text } from '../styles';

import { updateLocation } from '../actions/location';
import { stopLoading } from '../actions/loading';
import { getLocation } from '../services/location';
import { mainColor } from '../styles/colors';
```

### Naming convention

-   Functions and variables: camelCase
-   File name: kebab-case (hyphen-case)
-   Components, classes and imports (except destructuring): PascalCase


