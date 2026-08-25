UPDATE public.blog_posts
SET content = replace(content, 'href="/what-is-an-intervention"', 'href="/how-intervention-works"')
WHERE content LIKE '%href="/what-is-an-intervention"%';