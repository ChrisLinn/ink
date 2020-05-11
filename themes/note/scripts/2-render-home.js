/* global hexo */

"use strict";

hexo.extend.generator.register("home", (locals) => {
  let home = hexo.theme.config.home_page;
  let home_file;
  locals.posts.forEach((post) => {
    if(post.source == "_posts/" + home) {
      home_file = post;
    }
  })
  return {
    path: "index.html",
    data: home_file,
    layout: ["index"]
  }
})
