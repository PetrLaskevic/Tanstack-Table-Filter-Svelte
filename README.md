# Tanstack-Table-Filter-Svelte

Bug report for branch numbers
=================================

Filter is hardwired to elo column.

Try entering 400.

* * *

## **Expected behaviour:** three rows show up

## **Actual behaviour:** no rows show up

Oddly enough when I make changes to this page and **save** them while the page is open, so an HMR update happens:

    8:54:48 AM [vite] hmr update /src/routes/data-table.svelte, /src/app.css (x3)

And then I enter the 400 again, then the **Expected behaviour** arises

However, on a fresh load **Actual behaviour** happens (no rows)

* * *

Even more interestingly, filter seems to be working completely fine when configured to filter the username or email columns.

It's specifically numbers or numbers converted to strings that cause the issue (in this branch **numbers**)

And with numbers, the filter is broken completely, it doesn't work even intermittently.


* * *
## Branches:
- **main** => converts numbers to strings
- **numbers** => keeps numbers

"numbers" is even more broken than "main"
## To run:
```bash
npm run dev
```

