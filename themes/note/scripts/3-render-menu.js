/* global hexo */

"use strict";

let ejs = require("ejs");

let menufile;

hexo.on("generateAfter", () => {
  let menu = hexo.theme.config.menu_page;
  let posts = hexo.locals.get("posts")
  posts.forEach((post) => {
    if(post.source === "_posts/" + menu) {
      menufile = post;
    }
  })
})

hexo.extend.renderer.register("ejs", "html", (data, options) => {
  options.filename = data.path;
  options.sidebar = menufile ? menufile.content : "";
  return ejs.render(data.text, options);
}, true)
