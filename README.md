# Duration

A small website that converts a duration in `hh:mm:ss` to decimal hours, rounded to two decimal places. For example, `1:45:00` becomes `1.75`.

Hours can go past 24. Minutes and seconds must be two digits, from `00` to `59`. The conversion runs in the browser, so nothing you enter is sent to a server.

## Development

```sh
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deployment

The site is built with Next.js as a [static export](https://nextjs.org/docs/app/guides/static-exports). Run `npm run build` and upload the generated `out/` directory to any static web host.
