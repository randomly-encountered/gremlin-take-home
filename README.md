# Search NPM Package Suggestions

### [Live Demo](https://fetch-npm-package-suggestions.vercel.app/)

The goal of this project is to provide an interface which supports these functions:

- User can search for a package
- Returned list of packages are displayed and linked to their page on npm.
- Each row should contain at least the package's name and description. Other data is considered bonus and should be added if time allows.

---

### Included features

**Search**

- Search for packages via custom input component
  - Loading indicator is provided in the input to denote data fetching in progress
  - A quick clear action embedded within the search input component

**Results**

- Display a list of fetched package suggestions
  - As provided by the public API response
  - Formatted as a list of custom card components
    - Each of which contain a link to the package's NPM page
  - Are capped at 10 results per query (stylistic choice)

**Error Simulation**

- Toggle preference to produce an intentional error response

**Notifications**

- Unique notifiers for these conditions:
  - In the condition a network error is received
  - When the response has no relevant results (an empty set)

---

### Other features

**Configurations**

- A set of linting configurations for both _ESLint_ and _Stylelint_ packages with _Prettier_ integration
- Custom path aliasing for imports
- Compartmentalized component exports

**Test Suites**

- Unit tests for critical functional requirements
  - Authored using _vitest_ and _testing library_

**Theming Support**

- Built to support your browser/OS's light/dark theme preferences

**Responsive Layout**

- Supports an optimal layout for both desktop and mobile viewing experiences

**Accessible Interactivity**

- Navigable and interactive both through touch and keyboard inputs
