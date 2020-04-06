---
layout: post
date:   2020-04-02 20:19:29 +0200
title:  "fragilistique"
categories: jekyll update
---

fragilistique

{% assign image_files = site.static_files | where: "image", true %}
{% for image in image_files %}
  <div class="portfolio">
    <img src="{{ image.path }}" alt="{{ image.basename }}"
    class="image-portfolio" />
  </div>
{% endfor %}

<video width="100%" controls poster="https://lafleur.marsnet.org/letter/31mars_apercu.jpg">
  <source src="https://lafleur.marsnet.org/letter/31mars.mp4" type="video/mp4">
</video>
<!--
![](/images/test.jpg)
-->

