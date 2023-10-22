### Code Review Changes

- get SearchTerm() return value was changed to get('term') for better code optimization.
- Handled null checks for title in book-search template.
- Handled null checks for authores in book-search template.
- Handled null checks for publishers in book-search template.
- Handled null checks for date in book-search component.
- Added condition for book-grid to render only of the books list not empty else display empty state.

### Accessiblity Lighthouse 
- Resolved issue 'Buttons do not have an accessible name' by adding `aria-label="search"` icon.
- Observed issue with 'Background and foreground colors do not have a sufficient contrast ratio' this can be resolved by adding color codings according to browser default color standards. 
 



