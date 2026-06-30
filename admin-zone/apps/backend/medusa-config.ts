import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  admin: {
    vite: () => {
      return {
        plugins: [
          {
            name: "linh-trang-branding",
            transformIndexHtml(html: string) {
              const faviconDataUri =
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NCA2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTQiIGZpbGw9IiMyNDVCNEEiLz48dGV4dCB4PSIzMiIgeT0iNDIiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZm9udC13ZWlnaHQ9IjkwMCIgZmlsbD0iI0ZGRDcwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TFQ8L3RleHQ+PC9zdmc+Cg=="
              const hideMedusaBrandingScript = `
        <script>
          (function () {
            function hideMedusaBranding() {
              if (!location.pathname.includes("/login")) return;
              document.querySelectorAll('svg[viewBox="0 0 400 400"]').forEach(function (svg) {
                var wrapper = svg.closest(".rounded-xl");
                if (wrapper) wrapper.style.display = "none";
              });
              document.querySelectorAll("h1, h2").forEach(function (h) {
                if (h.textContent && h.textContent.indexOf("Medusa") !== -1) {
                  if (h.parentElement) h.parentElement.style.display = "none";
                }
              });
            }
            var observer = new MutationObserver(hideMedusaBranding);
            document.addEventListener("DOMContentLoaded", function () {
              observer.observe(document.body, { childList: true, subtree: true });
              hideMedusaBranding();
            });
          })();
        </script>`
              return html
                .replace(
                  /<link rel="icon" href="data:," data-placeholder-favicon \/>/,
                  `<link rel="icon" href="${faviconDataUri}" type="image/svg+xml" />`
                )
                .replace(
                  "<head>",
                  "<head>\n        <title>Linh Trang Admin</title>"
                )
                .replace("</body>", `${hideMedusaBrandingScript}\n    </body>`)
            },
          },
        ],
      }
    },
  },
  modules: [
    {
      resolve: "./src/modules/project",
    },
    {
      resolve: "./src/modules/news",
    },
  ],
})
