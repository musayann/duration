# Duration

A responsive Next.js website for converting `hh:mm:ss` into decimal hours, rounded to two decimal places.

Enter a duration or select an example to get an instant result. Hours may exceed 24; minutes and seconds must each be two digits from `00` to `59`. Calculations stay in your browser.

## Development

```sh
npm install
npm run dev
```

Then visit `http://localhost:3000`.

## Deployment

The site is configured as a [static export](https://nextjs.org/docs/app/guides/static-exports). Run `npm run build` and upload the generated `out/` directory to any static web host.
