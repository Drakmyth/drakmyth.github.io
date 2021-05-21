---
layout: post
title:  "Comments Are Now Available"
date:   2018-06-22 12:03:00
categories: [blogging, jekyll, staticman]
redirect_to: https://drakmyth.com/blog/2018/06/22/comments-are-now-available/
---
One of the goals I had with this blog was to keep the infrastructure simple. When I've tried to use full Content Management Systems like WordPress or Drupal in the past, I felt like I spent more time and effort customizing the site, updating plugins, and keeping it working the way I want that it just felt like work, which led to me not really spending much time on the real content: the posts.

For this blog, I opted to pass on all that and try out a static site generator which seems to be the new craze in website construction. There are a "couple" options available (See [staticsitegenerators.net][static-site-generators] for a full list), but I also wanted to simplify the hosting situation. For that, [GitHub Pages][github-pages] seemed like the perfect option, and that made the choice pretty simple since [Jekyll][jekyll] is natively supported by GitHub. I've since learned that a couple others are also supported, and you can technically make any of them work if you upload the build artifacts manually instead of letting GitHub handle the build, but there are a fair number of guides and tutorials for Jekyll and GitHub Pages so it seemed like a good place to start.

I'm absolutely thrilled with how it has turned out so far! The infrastructure and hosting takes care of itself, and outside of some tweaks to the theme I'm using, I pretty much don't have to touch anything. I just create a new markdown file for my post content, drop it in a particular folder, and push it up to my [git repository][castle-repo]. Awesome!

The only catch is that Jekyll out-of-the-box doesn't support any kind of user-generated content, in particular comments. Comments are a pretty important part of a tech blog in my opinion. They let people easily point out coding mistakes in the posts and facilitate direct communication and discussion. In a field where discussion can make all the difference to what approach is taken to solve a problem or can have a direct impact on how people learn, that communication is critical!

It took a bit of work, but thanks to the awesome [Staticman][staticman] service, I was able to integrate comments into this site, have them fully embedded in the theme and design, and keep them version controlled right alongside my posts! Right now I have moderation enabled, so when you leave a comment it makes a pull request into my repository and I have to approve it before it will appear on the site. I may disable this going forward since I have [reCAPTCHA][recaptcha] working, but at least while I'm still tweaking the theme it's useful to have that step in there. There's also additional features such as reply notifications and threading that I haven't tackled yet. I will probably work toward these at some point, but for now I'm happy with the basic comment setup.

It was not entirely trivial getting this all up and running, so you can expect a post walking through what it takes to set all this up sometime soon.

~ S

[static-site-generators]: https://staticsitegenerators.net
{:target="_blank"}

[github-pages]: https://pages.github.com
{:target="_blank"}

[jekyll]: https://jekyllrb.com
{:target="_blank"}

[castle-repo]: https://github.com/Drakmyth/drakmyth.github.io
{:target="_blank"}

[staticman]: https://staticman.net
{:target="_blank"}

[recaptcha]: https://www.google.com/recaptcha
{:target="_blank"}