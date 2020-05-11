/* global hexo */

"use strict";

hexo.on("generateBefore", () => {
  if (hexo.locals.get) {
    let data = hexo.locals.get("data")
    data && data.book && (hexo.theme.config = data.book)
  }
})
