import type { MiddlewareHandler } from "hono";

/**
 * Creates middleware to serve an emoji as a favicon
 * @param emoji - The emoji character to display as the favicon
 * @returns Hono middleware handler that serves the emoji as an SVG favicon
 */
function serveEmojiFavicon(emoji: string): MiddlewareHandler {
  return async (c, next) => {
    if (c.req.path === "/favicon.ico") {
      c.res.headers.set("content-type", "image/svg+xml");
      return c.body(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" x="-0.1em" font-size="90">${emoji}</text></svg>`,
      );
    }
    return next();
  };
}

export default serveEmojiFavicon;
