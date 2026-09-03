const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254">
  <rect width="1254" height="1254" fill="#080808"/>
  <polygon points="310,310 627,525 1052,202 729,627 944,944 627,729 202,1052 525,627" fill="#f4f3ef"/>
</svg>`;

export const dynamic = "force-static";

/** 为仍会请求传统 favicon.ico 地址的浏览器返回同一品牌图标。 */
export function GET() {
  return new Response(favicon, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}
