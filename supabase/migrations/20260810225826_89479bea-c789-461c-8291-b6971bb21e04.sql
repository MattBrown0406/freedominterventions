UPDATE public.blog_posts
SET content = replace(content, 'href="/services"', 'href="/how-intervention-works"')
WHERE slug = 'hoarding-disorder-help-for-families';