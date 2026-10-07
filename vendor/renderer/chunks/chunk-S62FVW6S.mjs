import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// src/fixtures-embedded.ts
var EMBEDDED_FIXTURES = {
  "blog-posts.json": [
    {
      "id": 2001,
      "name": "Building Modern Web Experiences with HubSpot CMS",
      "label": "Building Modern Web Experiences with HubSpot CMS",
      "slug": "building-modern-web-experiences",
      "absolute_url": "/blog/building-modern-web-experiences",
      "absoluteUrl": "/blog/building-modern-web-experiences",
      "featured_image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop",
      "featured_image_alt_text": "Developer working on modern web application with code on screen",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "featuredImage": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop",
      "featuredImageAltText": "Developer working on modern web application with code on screen",
      "featuredImageWidth": 1200,
      "featuredImageHeight": 675,
      "topic_list": [
        {
          "name": "Web Development",
          "slug": "web-development"
        },
        {
          "name": "HubSpot",
          "slug": "hubspot"
        }
      ],
      "topicNames": [
        "Web Development",
        "HubSpot"
      ],
      "tag_list": [
        {
          "name": "Web Development",
          "slug": "web-development"
        },
        {
          "name": "HubSpot",
          "slug": "hubspot"
        }
      ],
      "publish_date": "2026-03-15T10:00:00Z",
      "publish_date_localized": "March 15, 2026",
      "created": "2026-03-10T09:00:00Z",
      "updated": "2026-03-14T16:30:00Z",
      "meta_description": "Learn how to build modern, performant web experiences using HubSpot CMS with React-powered modules and component-driven architecture.",
      "blog_post_author": {
        "avatar": "https://i.pravatar.cc/150?img=47",
        "bio": "Senior web developer specialising in HubSpot CMS themes and React-based module development.",
        "display_name": "Sarah Chen",
        "email": "sarah.chen@example.com",
        "slug": "sarah-chen",
        "has_social_profiles": true,
        "facebook": "",
        "linkedin": "https://linkedin.com/in/sarahchen",
        "twitter": "https://twitter.com/sarahchen",
        "website": "https://sarahchen.dev"
      },
      "blog_author": {
        "avatar": "https://i.pravatar.cc/150?img=47",
        "display_name": "Sarah Chen"
      },
      "comment_count": 3,
      "post_body": "<p>Building modern web experiences on HubSpot CMS requires a thoughtful approach to component architecture, performance optimisation, and developer experience. In this guide, we explore how React-powered modules transform the traditional CMS development workflow.</p><h2>Component-Driven Development</h2><p>The shift towards component-driven development has fundamentally changed how we build websites. By breaking interfaces into reusable, self-contained components, teams can work in parallel, maintain consistency across pages, and iterate faster than ever before.</p><p>HubSpot's CMS React modules take this further by providing server-side rendering out of the box, ensuring fast initial page loads while enabling rich interactivity through island hydration. Each module encapsulates its own fields, styling, and behaviour \u2014 making them truly portable across templates and pages.</p><h2>Performance First</h2><p>Core Web Vitals are no longer optional. With Google using page experience signals in ranking, every millisecond matters. Our approach leverages CSS Modules for scoped, deduplicated styles, lazy-loaded islands for JavaScript, and optimised asset delivery through HubSpot's CDN.</p><p>The result is a theme architecture that scores consistently above 90 on Lighthouse across all templates, while delivering the rich interactivity clients expect from a modern website.</p>",
      "post_summary": "Learn how to build modern, performant web experiences using HubSpot CMS with React-powered modules and component-driven architecture.",
      "post_list_content": "<p>Building modern web experiences on HubSpot CMS requires a thoughtful approach to component architecture, performance optimisation, and developer experience.</p>",
      "next_post_name": "Scaling Your Digital Strategy in 2026",
      "next_post_slug": "scaling-digital-strategy",
      "next_post_featured_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
      "next_post_featured_image_alt_text": "Business analytics dashboard showing growth metrics and charts",
      "previous_post_name": null,
      "previous_post_slug": null,
      "previous_post_featured_image": null,
      "previous_post_featured_image_alt_text": null
    },
    {
      "id": 2002,
      "name": "Scaling Your Digital Strategy in 2026",
      "label": "Scaling Your Digital Strategy in 2026",
      "slug": "scaling-digital-strategy",
      "absolute_url": "/blog/scaling-digital-strategy",
      "absoluteUrl": "/blog/scaling-digital-strategy",
      "featured_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
      "featured_image_alt_text": "Business analytics dashboard showing growth metrics and charts",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "featuredImage": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
      "featuredImageAltText": "Business analytics dashboard showing growth metrics and charts",
      "featuredImageWidth": 1200,
      "featuredImageHeight": 675,
      "topic_list": [
        {
          "name": "Strategy",
          "slug": "strategy"
        },
        {
          "name": "Growth",
          "slug": "growth"
        }
      ],
      "topicNames": [
        "Strategy",
        "Growth"
      ],
      "tag_list": [
        {
          "name": "Strategy",
          "slug": "strategy"
        },
        {
          "name": "Growth",
          "slug": "growth"
        }
      ],
      "publish_date": "2026-03-01T10:00:00Z",
      "publish_date_localized": "March 1, 2026",
      "created": "2026-02-25T14:00:00Z",
      "updated": "2026-02-28T11:00:00Z",
      "meta_description": "Discover proven approaches to scaling your digital strategy in 2026, from content operations to technology stack decisions.",
      "blog_post_author": {
        "avatar": "https://i.pravatar.cc/150?img=12",
        "bio": "Digital strategy consultant helping enterprises scale their online presence through data-driven decision making.",
        "display_name": "Marcus Webb",
        "email": "marcus.webb@example.com",
        "slug": "marcus-webb",
        "has_social_profiles": true,
        "facebook": "",
        "linkedin": "https://linkedin.com/in/marcuswebb",
        "twitter": "",
        "website": ""
      },
      "blog_author": {
        "avatar": "https://i.pravatar.cc/150?img=12",
        "display_name": "Marcus Webb"
      },
      "comment_count": 7,
      "post_body": "<p>As organisations mature their digital presence, the challenge shifts from building a website to orchestrating a scalable digital ecosystem. In 2026, the most successful teams treat their website as a living platform \u2014 continuously optimised, deeply integrated with their marketing stack, and architecturally prepared for growth.</p><h2>The Three Pillars of Scale</h2><p>Scaling digital strategy effectively requires alignment across three pillars: content operations, technology infrastructure, and measurement frameworks. Without all three working in concert, growth creates friction rather than momentum.</p><p>Content operations define how teams create, review, approve, and publish content at pace. Technology infrastructure \u2014 from your CMS to your CDP \u2014 must support this velocity without introducing technical debt. And measurement frameworks ensure every investment ties back to business outcomes.</p><h2>Building for What's Next</h2><p>The organisations that will win in 2026 and beyond are those investing in composable architectures today. By decoupling content from presentation, data from display, and authoring from deployment, teams gain the flexibility to adapt to whatever comes next.</p>",
      "post_summary": "Discover proven approaches to scaling your digital strategy in 2026, from content operations to technology stack decisions.",
      "post_list_content": "<p>As organisations mature their digital presence, the challenge shifts from building a website to orchestrating a scalable digital ecosystem.</p>",
      "next_post_name": "Enterprise CMS Migration: Lessons Learned",
      "next_post_slug": "cms-migration-lessons",
      "next_post_featured_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
      "next_post_featured_image_alt_text": "Project management board with migration planning tasks and timeline",
      "previous_post_name": "Building Modern Web Experiences with HubSpot CMS",
      "previous_post_slug": "building-modern-web-experiences",
      "previous_post_featured_image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=675&fit=crop",
      "previous_post_featured_image_alt_text": "Developer working on modern web application with code on screen"
    },
    {
      "id": 2003,
      "name": "Enterprise CMS Migration: Lessons Learned",
      "label": "Enterprise CMS Migration: Lessons Learned",
      "slug": "cms-migration-lessons",
      "absolute_url": "/blog/cms-migration-lessons",
      "absoluteUrl": "/blog/cms-migration-lessons",
      "featured_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
      "featured_image_alt_text": "Project management board with migration planning tasks and timeline",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "featuredImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
      "featuredImageAltText": "Project management board with migration planning tasks and timeline",
      "featuredImageWidth": 1200,
      "featuredImageHeight": 675,
      "topic_list": [
        {
          "name": "CMS",
          "slug": "cms"
        },
        {
          "name": "Enterprise",
          "slug": "enterprise"
        }
      ],
      "topicNames": [
        "CMS",
        "Enterprise"
      ],
      "tag_list": [
        {
          "name": "CMS",
          "slug": "cms"
        },
        {
          "name": "Enterprise",
          "slug": "enterprise"
        }
      ],
      "publish_date": "2026-02-15T10:00:00Z",
      "publish_date_localized": "February 15, 2026",
      "created": "2026-02-10T08:00:00Z",
      "updated": "2026-02-14T17:00:00Z",
      "meta_description": "Real-world lessons from migrating enterprise websites to HubSpot CMS, covering planning, execution, and post-launch optimisation.",
      "blog_post_author": {
        "avatar": "https://i.pravatar.cc/150?img=47",
        "bio": "Technical project manager with 10+ years leading enterprise CMS migrations across industries.",
        "display_name": "Sarah Chen",
        "email": "sarah.chen@example.com",
        "slug": "sarah-chen",
        "has_social_profiles": true,
        "facebook": "",
        "linkedin": "https://linkedin.com/in/sarahchen",
        "twitter": "https://twitter.com/sarahchen",
        "website": "https://sarahchen.dev"
      },
      "blog_author": {
        "avatar": "https://i.pravatar.cc/150?img=47",
        "display_name": "Sarah Chen"
      },
      "comment_count": 12,
      "post_body": "<p>Migrating an enterprise website to a new CMS is one of the most complex projects a digital team can undertake. After leading dozens of these migrations, patterns emerge \u2014 both in what goes right and what goes sideways. Here are the hard-won lessons.</p><h2>Plan for Content, Not Just Templates</h2><p>Most migration plans focus heavily on template design and development timelines, but the real bottleneck is almost always content. Auditing, restructuring, rewriting, and approving content takes longer than anyone expects. Build your timeline around content readiness, not dev completion.</p><p>A phased content migration \u2014 starting with high-traffic pages and working outward \u2014 reduces risk and gives your team time to refine the process before tackling the long tail.</p><h2>Redirects Are a First-Class Concern</h2><p>Every migration generates URL changes. Every URL change risks breaking inbound links, losing SEO equity, and frustrating users. Treat your redirect map as a first-class deliverable, not an afterthought. Automate redirect testing, monitor 404s aggressively post-launch, and keep your redirect map versioned alongside your codebase.</p>",
      "post_summary": "Real-world lessons from migrating enterprise websites to HubSpot CMS, covering planning, execution, and post-launch optimisation.",
      "post_list_content": "<p>Migrating an enterprise website to a new CMS is one of the most complex projects a digital team can undertake.</p>",
      "next_post_name": "The Developer's Guide to Theme Architecture",
      "next_post_slug": "theme-architecture-guide",
      "next_post_featured_image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop",
      "next_post_featured_image_alt_text": "Abstract architectural blueprint and component diagrams",
      "previous_post_name": "Scaling Your Digital Strategy in 2026",
      "previous_post_slug": "scaling-digital-strategy",
      "previous_post_featured_image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop",
      "previous_post_featured_image_alt_text": "Business analytics dashboard showing growth metrics and charts"
    },
    {
      "id": 2004,
      "name": "The Developer's Guide to Theme Architecture",
      "label": "The Developer's Guide to Theme Architecture",
      "slug": "theme-architecture-guide",
      "absolute_url": "/blog/theme-architecture-guide",
      "absoluteUrl": "/blog/theme-architecture-guide",
      "featured_image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop",
      "featured_image_alt_text": "Abstract architectural blueprint and component diagrams",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "featuredImage": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop",
      "featuredImageAltText": "Abstract architectural blueprint and component diagrams",
      "featuredImageWidth": 1200,
      "featuredImageHeight": 675,
      "topic_list": [
        {
          "name": "Development",
          "slug": "development"
        },
        {
          "name": "Architecture",
          "slug": "architecture"
        }
      ],
      "topicNames": [
        "Development",
        "Architecture"
      ],
      "tag_list": [
        {
          "name": "Development",
          "slug": "development"
        },
        {
          "name": "Architecture",
          "slug": "architecture"
        }
      ],
      "publish_date": "2026-02-01T10:00:00Z",
      "publish_date_localized": "February 1, 2026",
      "created": "2026-01-28T10:00:00Z",
      "updated": "2026-01-31T15:00:00Z",
      "meta_description": "A comprehensive guide to building maintainable, scalable HubSpot CMS theme architectures with React modules.",
      "blog_post_author": {
        "avatar": "https://i.pravatar.cc/150?img=33",
        "bio": "Full-stack developer focused on design systems and CMS architecture patterns.",
        "display_name": "Alex Torres",
        "email": "alex.torres@example.com",
        "slug": "alex-torres",
        "has_social_profiles": true,
        "facebook": "",
        "linkedin": "https://linkedin.com/in/alextorres",
        "twitter": "https://twitter.com/alextorres",
        "website": ""
      },
      "blog_author": {
        "avatar": "https://i.pravatar.cc/150?img=33",
        "display_name": "Alex Torres"
      },
      "comment_count": 5,
      "post_body": "<p>A well-architected theme is the foundation of every successful HubSpot CMS project. It determines how fast your team ships, how consistent your pages look, and how maintainable the codebase remains as it grows. This guide distils the patterns that separate good themes from great ones.</p><h2>Module Boundaries</h2><p>The most impactful architectural decision is where you draw module boundaries. Too granular, and authors drown in options. Too coarse, and you lose flexibility. The sweet spot is modules that map to recognisable content patterns \u2014 a hero section, a card grid, a testimonial carousel \u2014 each configurable enough to serve multiple contexts without becoming a swiss-army knife.</p><p>Each module should own its fields, its CSS, and its JavaScript. Shared styles belong in the theme's design tokens, not in module-specific overrides that create hidden coupling.</p>",
      "post_summary": "A comprehensive guide to building maintainable, scalable HubSpot CMS theme architectures with React modules.",
      "post_list_content": "<p>A well-architected theme is the foundation of every successful HubSpot CMS project.</p>",
      "next_post_name": "Accessibility Best Practices for Modern Websites",
      "next_post_slug": "accessibility-best-practices",
      "next_post_featured_image": "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=675&fit=crop",
      "next_post_featured_image_alt_text": "Person using assistive technology to navigate a website",
      "previous_post_name": "Enterprise CMS Migration: Lessons Learned",
      "previous_post_slug": "cms-migration-lessons",
      "previous_post_featured_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop",
      "previous_post_featured_image_alt_text": "Project management board with migration planning tasks and timeline"
    },
    {
      "id": 2005,
      "name": "Accessibility Best Practices for Modern Websites",
      "label": "Accessibility Best Practices for Modern Websites",
      "slug": "accessibility-best-practices",
      "absolute_url": "/blog/accessibility-best-practices",
      "absoluteUrl": "/blog/accessibility-best-practices",
      "featured_image": "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=675&fit=crop",
      "featured_image_alt_text": "Person using assistive technology to navigate a website",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "featuredImage": "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=675&fit=crop",
      "featuredImageAltText": "Person using assistive technology to navigate a website",
      "featuredImageWidth": 1200,
      "featuredImageHeight": 675,
      "topic_list": [
        {
          "name": "Accessibility",
          "slug": "accessibility"
        },
        {
          "name": "Web Development",
          "slug": "web-development"
        }
      ],
      "topicNames": [
        "Accessibility",
        "Web Development"
      ],
      "tag_list": [
        {
          "name": "Accessibility",
          "slug": "accessibility"
        },
        {
          "name": "Web Development",
          "slug": "web-development"
        }
      ],
      "publish_date": "2026-01-20T10:00:00Z",
      "publish_date_localized": "January 20, 2026",
      "created": "2026-01-15T11:00:00Z",
      "updated": "2026-01-19T14:00:00Z",
      "meta_description": "Practical accessibility best practices for building inclusive modern websites that meet WCAG 2.2 standards.",
      "blog_post_author": {
        "avatar": "https://i.pravatar.cc/150?img=28",
        "bio": "Accessibility specialist and front-end developer advocating for inclusive digital experiences.",
        "display_name": "Priya Nair",
        "email": "priya.nair@example.com",
        "slug": "priya-nair",
        "has_social_profiles": true,
        "facebook": "",
        "linkedin": "https://linkedin.com/in/priyanair",
        "twitter": "https://twitter.com/priyanair",
        "website": "https://priyanair.com"
      },
      "blog_author": {
        "avatar": "https://i.pravatar.cc/150?img=28",
        "display_name": "Priya Nair"
      },
      "comment_count": 9,
      "post_body": "<p>Accessibility isn't a feature you bolt on at the end \u2014 it's a design principle that shapes every decision from colour contrast to interaction patterns. Here are the practices that make the biggest difference, grounded in WCAG 2.2 and real-world testing.</p><h2>Semantic HTML Is Your Foundation</h2><p>Before reaching for ARIA attributes, ensure your HTML is semantically correct. Headings should form a logical hierarchy. Navigation should use <code>&lt;nav&gt;</code> elements. Forms need associated labels. These basics solve the majority of accessibility issues before you write a single line of JavaScript.</p><p>Screen readers, voice control software, and keyboard navigation all benefit from well-structured HTML. It's the highest-impact, lowest-effort accessibility improvement you can make.</p>",
      "post_summary": "Practical accessibility best practices for building inclusive modern websites that meet WCAG 2.2 standards.",
      "post_list_content": "<p>Accessibility isn't a feature you bolt on at the end \u2014 it's a design principle that shapes every decision.</p>",
      "next_post_name": "Optimising Core Web Vitals for HubSpot Sites",
      "next_post_slug": "core-web-vitals-hubspot",
      "next_post_featured_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&sat=-100",
      "next_post_featured_image_alt_text": "Performance monitoring dashboard showing website speed metrics",
      "previous_post_name": "The Developer's Guide to Theme Architecture",
      "previous_post_slug": "theme-architecture-guide",
      "previous_post_featured_image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop",
      "previous_post_featured_image_alt_text": "Abstract architectural blueprint and component diagrams"
    },
    {
      "id": 2006,
      "name": "Optimising Core Web Vitals for HubSpot Sites",
      "label": "Optimising Core Web Vitals for HubSpot Sites",
      "slug": "core-web-vitals-hubspot",
      "absolute_url": "/blog/core-web-vitals-hubspot",
      "absoluteUrl": "/blog/core-web-vitals-hubspot",
      "featured_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&sat=-100",
      "featured_image_alt_text": "Performance monitoring dashboard showing website speed metrics",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "featuredImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&sat=-100",
      "featuredImageAltText": "Performance monitoring dashboard showing website speed metrics",
      "featuredImageWidth": 1200,
      "featuredImageHeight": 675,
      "topic_list": [
        {
          "name": "Performance",
          "slug": "performance"
        },
        {
          "name": "SEO",
          "slug": "seo"
        }
      ],
      "topicNames": [
        "Performance",
        "SEO"
      ],
      "tag_list": [
        {
          "name": "Performance",
          "slug": "performance"
        },
        {
          "name": "SEO",
          "slug": "seo"
        }
      ],
      "publish_date": "2026-01-05T10:00:00Z",
      "publish_date_localized": "January 5, 2026",
      "created": "2026-01-02T09:00:00Z",
      "updated": "2026-01-04T16:00:00Z",
      "meta_description": "Actionable strategies for optimising Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint on HubSpot CMS sites.",
      "blog_post_author": {
        "avatar": "https://i.pravatar.cc/150?img=47",
        "bio": "Performance engineer obsessed with making websites fast, accessible, and delightful.",
        "display_name": "Sarah Chen",
        "email": "sarah.chen@example.com",
        "slug": "sarah-chen",
        "has_social_profiles": true,
        "facebook": "",
        "linkedin": "https://linkedin.com/in/sarahchen",
        "twitter": "https://twitter.com/sarahchen",
        "website": "https://sarahchen.dev"
      },
      "blog_author": {
        "avatar": "https://i.pravatar.cc/150?img=47",
        "display_name": "Sarah Chen"
      },
      "comment_count": 4,
      "post_body": "<p>Core Web Vitals directly influence your search rankings and user experience. On HubSpot CMS, the combination of server-rendered React modules, HubSpot's CDN, and thoughtful theme architecture gives you powerful levers to hit top scores consistently.</p><h2>Largest Contentful Paint</h2><p>LCP measures how quickly the main content becomes visible. On CMS pages, this is typically a hero image or headline. Prioritise above-the-fold content by inlining critical CSS, preloading hero images, and ensuring server-side rendering delivers complete HTML without JavaScript dependencies.</p><p>Avoid lazy-loading above-the-fold images \u2014 this is the single most common LCP mistake we see in HubSpot theme audits.</p>",
      "post_summary": "Actionable strategies for optimising Largest Contentful Paint, Cumulative Layout Shift, and Interaction to Next Paint on HubSpot CMS sites.",
      "post_list_content": "<p>Core Web Vitals directly influence your search rankings and user experience.</p>",
      "next_post_name": "Design Systems That Scale: A Practical Approach",
      "next_post_slug": "design-systems-scale",
      "next_post_featured_image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&fit=crop",
      "next_post_featured_image_alt_text": "Design system components and color palette on designer's desk",
      "previous_post_name": "Accessibility Best Practices for Modern Websites",
      "previous_post_slug": "accessibility-best-practices",
      "previous_post_featured_image": "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=675&fit=crop",
      "previous_post_featured_image_alt_text": "Person using assistive technology to navigate a website"
    },
    {
      "id": 2007,
      "name": "Design Systems That Scale: A Practical Approach",
      "label": "Design Systems That Scale: A Practical Approach",
      "slug": "design-systems-scale",
      "absolute_url": "/blog/design-systems-scale",
      "absoluteUrl": "/blog/design-systems-scale",
      "featured_image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&fit=crop",
      "featured_image_alt_text": "Design system components and color palette on designer's desk",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "featuredImage": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&fit=crop",
      "featuredImageAltText": "Design system components and color palette on designer's desk",
      "featuredImageWidth": 1200,
      "featuredImageHeight": 675,
      "topic_list": [
        {
          "name": "Design",
          "slug": "design"
        },
        {
          "name": "Systems",
          "slug": "systems"
        }
      ],
      "topicNames": [
        "Design",
        "Systems"
      ],
      "tag_list": [
        {
          "name": "Design",
          "slug": "design"
        },
        {
          "name": "Systems",
          "slug": "systems"
        }
      ],
      "publish_date": "2025-12-15T10:00:00Z",
      "publish_date_localized": "December 15, 2025",
      "created": "2025-12-10T13:00:00Z",
      "updated": "2025-12-14T10:00:00Z",
      "meta_description": "How to build and maintain design systems that scale with your organisation, from tokens to components to governance.",
      "blog_post_author": {
        "avatar": "https://i.pravatar.cc/150?img=33",
        "bio": "Design systems lead building bridges between design and engineering teams.",
        "display_name": "Alex Torres",
        "email": "alex.torres@example.com",
        "slug": "alex-torres",
        "has_social_profiles": true,
        "facebook": "",
        "linkedin": "https://linkedin.com/in/alextorres",
        "twitter": "https://twitter.com/alextorres",
        "website": ""
      },
      "blog_author": {
        "avatar": "https://i.pravatar.cc/150?img=33",
        "display_name": "Alex Torres"
      },
      "comment_count": 6,
      "post_body": "<p>Design systems promise consistency, efficiency, and scalability \u2014 but only when they're built to evolve alongside your organisation. Too rigid, and teams route around them. Too loose, and they become a style guide nobody follows. Here's how to find the balance.</p><h2>Start with Tokens, Not Components</h2><p>Design tokens \u2014 colours, spacing, typography, shadows \u2014 are the foundation. They're the shared language between designers and developers. Get tokens right, and components almost build themselves. Get them wrong, and every component becomes a bespoke negotiation.</p><p>Define your tokens as a single source of truth, expressed as CSS custom properties for the web and as platform-appropriate formats for native. Version them, document them, and treat breaking changes with the same care as API changes.</p>",
      "post_summary": "How to build and maintain design systems that scale with your organisation, from tokens to components to governance.",
      "post_list_content": "<p>Design systems promise consistency, efficiency, and scalability \u2014 but only when they're built to evolve alongside your organisation.</p>",
      "next_post_name": "Headless CMS vs Traditional CMS: Making the Right Choice",
      "next_post_slug": "headless-vs-traditional-cms",
      "next_post_featured_image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop",
      "next_post_featured_image_alt_text": "Technology comparison diagram on whiteboard",
      "previous_post_name": "Optimising Core Web Vitals for HubSpot Sites",
      "previous_post_slug": "core-web-vitals-hubspot",
      "previous_post_featured_image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&sat=-100",
      "previous_post_featured_image_alt_text": "Performance monitoring dashboard showing website speed metrics"
    },
    {
      "id": 2008,
      "name": "Headless CMS vs Traditional CMS: Making the Right Choice",
      "label": "Headless CMS vs Traditional CMS: Making the Right Choice",
      "slug": "headless-vs-traditional-cms",
      "absolute_url": "/blog/headless-vs-traditional-cms",
      "absoluteUrl": "/blog/headless-vs-traditional-cms",
      "featured_image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop",
      "featured_image_alt_text": "Technology comparison diagram on whiteboard",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "featuredImage": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop",
      "featuredImageAltText": "Technology comparison diagram on whiteboard",
      "featuredImageWidth": 1200,
      "featuredImageHeight": 675,
      "topic_list": [
        {
          "name": "CMS",
          "slug": "cms"
        },
        {
          "name": "Technology",
          "slug": "technology"
        }
      ],
      "topicNames": [
        "CMS",
        "Technology"
      ],
      "tag_list": [
        {
          "name": "CMS",
          "slug": "cms"
        },
        {
          "name": "Technology",
          "slug": "technology"
        }
      ],
      "publish_date": "2025-12-01T10:00:00Z",
      "publish_date_localized": "December 1, 2025",
      "created": "2025-11-26T09:00:00Z",
      "updated": "2025-11-30T12:00:00Z",
      "meta_description": "A balanced comparison of headless and traditional CMS architectures to help you make the right choice for your organisation.",
      "blog_post_author": {
        "avatar": "https://i.pravatar.cc/150?img=12",
        "bio": "Digital strategy consultant helping enterprises scale their online presence through data-driven decision making.",
        "display_name": "Marcus Webb",
        "email": "marcus.webb@example.com",
        "slug": "marcus-webb",
        "has_social_profiles": true,
        "facebook": "",
        "linkedin": "https://linkedin.com/in/marcuswebb",
        "twitter": "",
        "website": ""
      },
      "blog_author": {
        "avatar": "https://i.pravatar.cc/150?img=12",
        "display_name": "Marcus Webb"
      },
      "comment_count": 15,
      "post_body": "<p>The headless vs traditional CMS debate generates strong opinions, but the right answer depends entirely on your team's capabilities, your content operations, and your performance requirements. Let's cut through the marketing noise and examine what actually matters.</p><h2>What 'Headless' Really Means</h2><p>A headless CMS separates content management from content presentation. You manage content through an admin interface, and consume it via APIs in whatever front-end framework you choose. This gives developers complete control over the user experience, at the cost of building and maintaining the presentation layer themselves.</p><p>A traditional CMS like HubSpot bundles content management and presentation together. Templates, modules, and pages are all managed in one system. This reduces complexity for marketing teams and accelerates time-to-market, while still allowing sophisticated customisation through themes and custom modules.</p>",
      "post_summary": "A balanced comparison of headless and traditional CMS architectures to help you make the right choice for your organisation.",
      "post_list_content": "<p>The headless vs traditional CMS debate generates strong opinions, but the right answer depends entirely on your context.</p>",
      "next_post_name": "The ROI of Investing in Website Performance",
      "next_post_slug": "roi-website-performance",
      "next_post_featured_image": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=675&fit=crop",
      "next_post_featured_image_alt_text": "Financial charts showing upward ROI trends and performance metrics",
      "previous_post_name": "Design Systems That Scale: A Practical Approach",
      "previous_post_slug": "design-systems-scale",
      "previous_post_featured_image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=675&fit=crop",
      "previous_post_featured_image_alt_text": "Design system components and color palette on designer's desk"
    },
    {
      "id": 2009,
      "name": "The ROI of Investing in Website Performance",
      "label": "The ROI of Investing in Website Performance",
      "slug": "roi-website-performance",
      "absolute_url": "/blog/roi-website-performance",
      "absoluteUrl": "/blog/roi-website-performance",
      "featured_image": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=675&fit=crop",
      "featured_image_alt_text": "Financial charts showing upward ROI trends and performance metrics",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "featuredImage": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=675&fit=crop",
      "featuredImageAltText": "Financial charts showing upward ROI trends and performance metrics",
      "featuredImageWidth": 1200,
      "featuredImageHeight": 675,
      "topic_list": [
        {
          "name": "Performance",
          "slug": "performance"
        },
        {
          "name": "Business",
          "slug": "business"
        }
      ],
      "topicNames": [
        "Performance",
        "Business"
      ],
      "tag_list": [
        {
          "name": "Performance",
          "slug": "performance"
        },
        {
          "name": "Business",
          "slug": "business"
        }
      ],
      "publish_date": "2025-11-15T10:00:00Z",
      "publish_date_localized": "November 15, 2025",
      "created": "2025-11-10T08:00:00Z",
      "updated": "2025-11-14T17:00:00Z",
      "meta_description": "Quantifying the business impact of website performance improvements, from conversion rates to search rankings.",
      "blog_post_author": {
        "avatar": "https://i.pravatar.cc/150?img=28",
        "bio": "Accessibility specialist and front-end developer advocating for inclusive digital experiences.",
        "display_name": "Priya Nair",
        "email": "priya.nair@example.com",
        "slug": "priya-nair",
        "has_social_profiles": true,
        "facebook": "",
        "linkedin": "https://linkedin.com/in/priyanair",
        "twitter": "https://twitter.com/priyanair",
        "website": "https://priyanair.com"
      },
      "blog_author": {
        "avatar": "https://i.pravatar.cc/150?img=28",
        "display_name": "Priya Nair"
      },
      "comment_count": 2,
      "post_body": "<p>Every 100ms of page load improvement can increase conversion rates by up to 1%. But translating performance metrics into business language remains one of the biggest challenges for development teams seeking budget and buy-in. Here's how to make the case.</p><h2>The Performance-Revenue Connection</h2><p>Study after study shows the direct link between page speed and business outcomes. Amazon found that every 100ms of latency cost them 1% in sales. Google discovered that a 0.5-second delay in search results reduced traffic by 20%. These aren't edge cases \u2014 they're consistent patterns across industries and geographies.</p><p>For your organisation, the calculation is straightforward: multiply your monthly revenue by the conversion rate improvement you'd expect from hitting your performance targets. Even conservative estimates typically justify significant investment in performance optimisation.</p>",
      "post_summary": "Quantifying the business impact of website performance improvements, from conversion rates to search rankings.",
      "post_list_content": "<p>Every 100ms of page load improvement can increase conversion rates by up to 1%.</p>",
      "next_post_name": null,
      "next_post_slug": null,
      "next_post_featured_image": null,
      "next_post_featured_image_alt_text": null,
      "previous_post_name": "Headless CMS vs Traditional CMS: Making the Right Choice",
      "previous_post_slug": "headless-vs-traditional-cms",
      "previous_post_featured_image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=675&fit=crop",
      "previous_post_featured_image_alt_text": "Technology comparison diagram on whiteboard"
    }
  ],
  "content/blog-listing/empty.json": {
    "label": "A blog with no published posts yet",
    "is_in_editor": false,
    "request": {
      "domain": "www.example-portal.com",
      "scheme": "https",
      "path": "/blog",
      "path_and_query": "/blog",
      "full_url": "https://www.example-portal.com/blog",
      "query": "",
      "query_dict": {}
    },
    "group": {
      "id": 81234567890,
      "name": "Example blog",
      "public_title": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "slug": "blog",
      "absolute_url": "https://www.example-portal.com/blog",
      "language": "en",
      "description": "Field notes on building sites people can edit."
    },
    "blog": {
      "id": 81234567890,
      "posts": [],
      "topics": []
    },
    "content": {
      "id": 190000000100,
      "name": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "absolute_url": "https://www.example-portal.com/blog",
      "language": "en"
    },
    "contents": [],
    "current_page_num": 1,
    "last_page_num": 1
  },
  "content/blog-listing/index.json": {
    "label": "The blog's first page, with more posts on the next page",
    "is_in_editor": false,
    "request": {
      "domain": "www.example-portal.com",
      "scheme": "https",
      "path": "/blog",
      "path_and_query": "/blog",
      "full_url": "https://www.example-portal.com/blog",
      "query": "",
      "query_dict": {}
    },
    "group": {
      "id": 81234567890,
      "name": "Example blog",
      "public_title": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "slug": "blog",
      "absolute_url": "https://www.example-portal.com/blog",
      "language": "en",
      "description": "Field notes on building sites people can edit."
    },
    "blog": {
      "id": 81234567890,
      "posts": [
        {
          "id": 128374619283,
          "name": "What changes when a module reads the platform",
          "title": "What changes when a module reads the platform | Example",
          "html_title": "What changes when a module reads the platform | Example",
          "slug": "blog/what-changes-when-a-module-reads-the-platform",
          "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
          "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
          "post_body": "<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
          "featured_image_alt_text": "A page editor with a blog post open beside its live page",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 1785834e6,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619301,
          "name": "Three fields every blog listing needs",
          "title": "Three fields every blog listing needs | Example",
          "html_title": "Three fields every blog listing needs | Example",
          "slug": "blog/three-fields-every-blog-listing-needs",
          "absolute_url": "https://www.example-portal.com/blog/three-fields-every-blog-listing-needs",
          "post_summary": "A listing reads its posts from the platform; the only fields it needs are the words on its controls.",
          "post_body": "<p>A listing reads its posts from the platform; the only fields it needs are the words on its controls.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/three-fields.jpg",
          "featured_image_alt_text": "A blog listing with topic filters above a grid of posts",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17852292e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888
          ]
        },
        {
          "id": 128374619302,
          "name": "Why a topic filter is a link",
          "title": "Why a topic filter is a link | Example",
          "html_title": "Why a topic filter is a link | Example",
          "slug": "blog/why-a-topic-filter-is-a-link",
          "absolute_url": "https://www.example-portal.com/blog/why-a-topic-filter-is-a-link",
          "post_summary": "Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.",
          "post_body": "<p>Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17846244e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560915
          ]
        },
        {
          "id": 128374619303,
          "name": "Writing rich text that survives a redesign",
          "title": "Writing rich text that survives a redesign | Example",
          "html_title": "Writing rich text that survives a redesign | Example",
          "slug": "blog/writing-rich-text-that-survives-a-redesign",
          "absolute_url": "https://www.example-portal.com/blog/writing-rich-text-that-survives-a-redesign",
          "post_summary": "Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.",
          "post_body": "<p>Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/rich-text.jpg",
          "featured_image_alt_text": "A post's body with its headings and lists outlined",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17840196e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560901
          ]
        },
        {
          "id": 128374619304,
          "name": "Previews an editor can trust",
          "title": "Previews an editor can trust | Example",
          "html_title": "Previews an editor can trust | Example",
          "slug": "blog/previews-an-editor-can-trust",
          "absolute_url": "https://www.example-portal.com/blog/previews-an-editor-can-trust",
          "post_summary": "A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.",
          "post_body": "<p>A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17834148e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619305,
          "name": "An empty state is for the editor",
          "title": "An empty state is for the editor | Example",
          "html_title": "An empty state is for the editor | Example",
          "slug": "blog/an-empty-state-is-for-the-editor",
          "absolute_url": "https://www.example-portal.com/blog/an-empty-state-is-for-the-editor",
          "post_summary": "A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.",
          "post_body": "<p>A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/empty-state.jpg",
          "featured_image_alt_text": "An empty module in the page editor with a hint beneath it",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 178281e7,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560915
          ]
        }
      ],
      "topics": [
        {
          "id": 475272560888,
          "name": "HubSpot CMS",
          "slug": "hubspot-cms"
        },
        {
          "id": 475272560901,
          "name": "Content operations",
          "slug": "content-operations"
        },
        {
          "id": 475272560915,
          "name": "Accessibility",
          "slug": "accessibility"
        }
      ]
    },
    "content": {
      "id": 190000000100,
      "name": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "absolute_url": "https://www.example-portal.com/blog",
      "language": "en"
    },
    "contents": [
      {
        "id": 128374619283,
        "name": "What changes when a module reads the platform",
        "title": "What changes when a module reads the platform | Example",
        "html_title": "What changes when a module reads the platform | Example",
        "slug": "blog/what-changes-when-a-module-reads-the-platform",
        "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
        "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
        "post_body": "<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
        "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
        "featured_image_alt_text": "A page editor with a blog post open beside its live page",
        "featured_image_width": 1200,
        "featured_image_height": 675,
        "use_featured_image": true,
        "publish_date": 1785834e6,
        "language": "en",
        "blog_post_author": {
          "id": 90210001,
          "display_name": "Ada Fenwick",
          "slug": "ada-fenwick",
          "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
        },
        "topic_list": [
          475272560888,
          475272560901
        ]
      },
      {
        "id": 128374619301,
        "name": "Three fields every blog listing needs",
        "title": "Three fields every blog listing needs | Example",
        "html_title": "Three fields every blog listing needs | Example",
        "slug": "blog/three-fields-every-blog-listing-needs",
        "absolute_url": "https://www.example-portal.com/blog/three-fields-every-blog-listing-needs",
        "post_summary": "A listing reads its posts from the platform; the only fields it needs are the words on its controls.",
        "post_body": "<p>A listing reads its posts from the platform; the only fields it needs are the words on its controls.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
        "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/three-fields.jpg",
        "featured_image_alt_text": "A blog listing with topic filters above a grid of posts",
        "featured_image_width": 1200,
        "featured_image_height": 675,
        "use_featured_image": true,
        "publish_date": 17852292e5,
        "language": "en",
        "blog_post_author": {
          "id": 90210001,
          "display_name": "Ada Fenwick",
          "slug": "ada-fenwick",
          "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
        },
        "topic_list": [
          475272560888
        ]
      },
      {
        "id": 128374619302,
        "name": "Why a topic filter is a link",
        "title": "Why a topic filter is a link | Example",
        "html_title": "Why a topic filter is a link | Example",
        "slug": "blog/why-a-topic-filter-is-a-link",
        "absolute_url": "https://www.example-portal.com/blog/why-a-topic-filter-is-a-link",
        "post_summary": "Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.",
        "post_body": "<p>Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
        "featured_image": "",
        "featured_image_alt_text": "",
        "featured_image_width": 0,
        "featured_image_height": 0,
        "use_featured_image": false,
        "publish_date": 17846244e5,
        "language": "en",
        "blog_post_author": {
          "id": 90210002,
          "display_name": "Sam Okafor",
          "slug": "sam-okafor",
          "avatar": ""
        },
        "topic_list": [
          475272560915
        ]
      },
      {
        "id": 128374619303,
        "name": "Writing rich text that survives a redesign",
        "title": "Writing rich text that survives a redesign | Example",
        "html_title": "Writing rich text that survives a redesign | Example",
        "slug": "blog/writing-rich-text-that-survives-a-redesign",
        "absolute_url": "https://www.example-portal.com/blog/writing-rich-text-that-survives-a-redesign",
        "post_summary": "Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.",
        "post_body": "<p>Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
        "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/rich-text.jpg",
        "featured_image_alt_text": "A post's body with its headings and lists outlined",
        "featured_image_width": 1200,
        "featured_image_height": 675,
        "use_featured_image": true,
        "publish_date": 17840196e5,
        "language": "en",
        "blog_post_author": {
          "id": 90210001,
          "display_name": "Ada Fenwick",
          "slug": "ada-fenwick",
          "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
        },
        "topic_list": [
          475272560901
        ]
      }
    ],
    "current_page_num": 1,
    "next_page_num": 2,
    "last_page_num": 2
  },
  "content/blog-listing/page-2.json": {
    "label": "The blog's second and last page",
    "is_in_editor": false,
    "request": {
      "domain": "www.example-portal.com",
      "scheme": "https",
      "path": "/blog/page/2",
      "path_and_query": "/blog/page/2",
      "full_url": "https://www.example-portal.com/blog/page/2",
      "query": "",
      "query_dict": {}
    },
    "group": {
      "id": 81234567890,
      "name": "Example blog",
      "public_title": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "slug": "blog",
      "absolute_url": "https://www.example-portal.com/blog",
      "language": "en",
      "description": "Field notes on building sites people can edit."
    },
    "blog": {
      "id": 81234567890,
      "posts": [
        {
          "id": 128374619283,
          "name": "What changes when a module reads the platform",
          "title": "What changes when a module reads the platform | Example",
          "html_title": "What changes when a module reads the platform | Example",
          "slug": "blog/what-changes-when-a-module-reads-the-platform",
          "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
          "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
          "post_body": "<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
          "featured_image_alt_text": "A page editor with a blog post open beside its live page",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 1785834e6,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619301,
          "name": "Three fields every blog listing needs",
          "title": "Three fields every blog listing needs | Example",
          "html_title": "Three fields every blog listing needs | Example",
          "slug": "blog/three-fields-every-blog-listing-needs",
          "absolute_url": "https://www.example-portal.com/blog/three-fields-every-blog-listing-needs",
          "post_summary": "A listing reads its posts from the platform; the only fields it needs are the words on its controls.",
          "post_body": "<p>A listing reads its posts from the platform; the only fields it needs are the words on its controls.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/three-fields.jpg",
          "featured_image_alt_text": "A blog listing with topic filters above a grid of posts",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17852292e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888
          ]
        },
        {
          "id": 128374619302,
          "name": "Why a topic filter is a link",
          "title": "Why a topic filter is a link | Example",
          "html_title": "Why a topic filter is a link | Example",
          "slug": "blog/why-a-topic-filter-is-a-link",
          "absolute_url": "https://www.example-portal.com/blog/why-a-topic-filter-is-a-link",
          "post_summary": "Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.",
          "post_body": "<p>Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17846244e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560915
          ]
        },
        {
          "id": 128374619303,
          "name": "Writing rich text that survives a redesign",
          "title": "Writing rich text that survives a redesign | Example",
          "html_title": "Writing rich text that survives a redesign | Example",
          "slug": "blog/writing-rich-text-that-survives-a-redesign",
          "absolute_url": "https://www.example-portal.com/blog/writing-rich-text-that-survives-a-redesign",
          "post_summary": "Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.",
          "post_body": "<p>Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/rich-text.jpg",
          "featured_image_alt_text": "A post's body with its headings and lists outlined",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17840196e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560901
          ]
        },
        {
          "id": 128374619304,
          "name": "Previews an editor can trust",
          "title": "Previews an editor can trust | Example",
          "html_title": "Previews an editor can trust | Example",
          "slug": "blog/previews-an-editor-can-trust",
          "absolute_url": "https://www.example-portal.com/blog/previews-an-editor-can-trust",
          "post_summary": "A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.",
          "post_body": "<p>A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17834148e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619305,
          "name": "An empty state is for the editor",
          "title": "An empty state is for the editor | Example",
          "html_title": "An empty state is for the editor | Example",
          "slug": "blog/an-empty-state-is-for-the-editor",
          "absolute_url": "https://www.example-portal.com/blog/an-empty-state-is-for-the-editor",
          "post_summary": "A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.",
          "post_body": "<p>A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/empty-state.jpg",
          "featured_image_alt_text": "An empty module in the page editor with a hint beneath it",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 178281e7,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560915
          ]
        }
      ],
      "topics": [
        {
          "id": 475272560888,
          "name": "HubSpot CMS",
          "slug": "hubspot-cms"
        },
        {
          "id": 475272560901,
          "name": "Content operations",
          "slug": "content-operations"
        },
        {
          "id": 475272560915,
          "name": "Accessibility",
          "slug": "accessibility"
        }
      ]
    },
    "content": {
      "id": 190000000100,
      "name": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "absolute_url": "https://www.example-portal.com/blog/page/2",
      "language": "en"
    },
    "contents": [
      {
        "id": 128374619304,
        "name": "Previews an editor can trust",
        "title": "Previews an editor can trust | Example",
        "html_title": "Previews an editor can trust | Example",
        "slug": "blog/previews-an-editor-can-trust",
        "absolute_url": "https://www.example-portal.com/blog/previews-an-editor-can-trust",
        "post_summary": "A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.",
        "post_body": "<p>A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
        "featured_image": "",
        "featured_image_alt_text": "",
        "featured_image_width": 0,
        "featured_image_height": 0,
        "use_featured_image": false,
        "publish_date": 17834148e5,
        "language": "en",
        "blog_post_author": {
          "id": 90210002,
          "display_name": "Sam Okafor",
          "slug": "sam-okafor",
          "avatar": ""
        },
        "topic_list": [
          475272560888,
          475272560901
        ]
      },
      {
        "id": 128374619305,
        "name": "An empty state is for the editor",
        "title": "An empty state is for the editor | Example",
        "html_title": "An empty state is for the editor | Example",
        "slug": "blog/an-empty-state-is-for-the-editor",
        "absolute_url": "https://www.example-portal.com/blog/an-empty-state-is-for-the-editor",
        "post_summary": "A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.",
        "post_body": "<p>A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
        "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/empty-state.jpg",
        "featured_image_alt_text": "An empty module in the page editor with a hint beneath it",
        "featured_image_width": 1200,
        "featured_image_height": 675,
        "use_featured_image": true,
        "publish_date": 178281e7,
        "language": "en",
        "blog_post_author": {
          "id": 90210001,
          "display_name": "Ada Fenwick",
          "slug": "ada-fenwick",
          "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
        },
        "topic_list": [
          475272560915
        ]
      }
    ],
    "current_page_num": 2,
    "last_page_num": 2
  },
  "content/blog-listing/topic.json": {
    "label": "A topic page, showing only the posts filed under one topic",
    "is_in_editor": false,
    "request": {
      "domain": "www.example-portal.com",
      "scheme": "https",
      "path": "/blog/tag/hubspot-cms",
      "path_and_query": "/blog/tag/hubspot-cms",
      "full_url": "https://www.example-portal.com/blog/tag/hubspot-cms",
      "query": "",
      "query_dict": {}
    },
    "group": {
      "id": 81234567890,
      "name": "Example blog",
      "public_title": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "slug": "blog",
      "absolute_url": "https://www.example-portal.com/blog",
      "language": "en",
      "description": "Field notes on building sites people can edit."
    },
    "blog": {
      "id": 81234567890,
      "posts": [
        {
          "id": 128374619283,
          "name": "What changes when a module reads the platform",
          "title": "What changes when a module reads the platform | Example",
          "html_title": "What changes when a module reads the platform | Example",
          "slug": "blog/what-changes-when-a-module-reads-the-platform",
          "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
          "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
          "post_body": "<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
          "featured_image_alt_text": "A page editor with a blog post open beside its live page",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 1785834e6,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619301,
          "name": "Three fields every blog listing needs",
          "title": "Three fields every blog listing needs | Example",
          "html_title": "Three fields every blog listing needs | Example",
          "slug": "blog/three-fields-every-blog-listing-needs",
          "absolute_url": "https://www.example-portal.com/blog/three-fields-every-blog-listing-needs",
          "post_summary": "A listing reads its posts from the platform; the only fields it needs are the words on its controls.",
          "post_body": "<p>A listing reads its posts from the platform; the only fields it needs are the words on its controls.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/three-fields.jpg",
          "featured_image_alt_text": "A blog listing with topic filters above a grid of posts",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17852292e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888
          ]
        },
        {
          "id": 128374619302,
          "name": "Why a topic filter is a link",
          "title": "Why a topic filter is a link | Example",
          "html_title": "Why a topic filter is a link | Example",
          "slug": "blog/why-a-topic-filter-is-a-link",
          "absolute_url": "https://www.example-portal.com/blog/why-a-topic-filter-is-a-link",
          "post_summary": "Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.",
          "post_body": "<p>Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17846244e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560915
          ]
        },
        {
          "id": 128374619303,
          "name": "Writing rich text that survives a redesign",
          "title": "Writing rich text that survives a redesign | Example",
          "html_title": "Writing rich text that survives a redesign | Example",
          "slug": "blog/writing-rich-text-that-survives-a-redesign",
          "absolute_url": "https://www.example-portal.com/blog/writing-rich-text-that-survives-a-redesign",
          "post_summary": "Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.",
          "post_body": "<p>Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/rich-text.jpg",
          "featured_image_alt_text": "A post's body with its headings and lists outlined",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17840196e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560901
          ]
        },
        {
          "id": 128374619304,
          "name": "Previews an editor can trust",
          "title": "Previews an editor can trust | Example",
          "html_title": "Previews an editor can trust | Example",
          "slug": "blog/previews-an-editor-can-trust",
          "absolute_url": "https://www.example-portal.com/blog/previews-an-editor-can-trust",
          "post_summary": "A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.",
          "post_body": "<p>A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17834148e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619305,
          "name": "An empty state is for the editor",
          "title": "An empty state is for the editor | Example",
          "html_title": "An empty state is for the editor | Example",
          "slug": "blog/an-empty-state-is-for-the-editor",
          "absolute_url": "https://www.example-portal.com/blog/an-empty-state-is-for-the-editor",
          "post_summary": "A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.",
          "post_body": "<p>A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/empty-state.jpg",
          "featured_image_alt_text": "An empty module in the page editor with a hint beneath it",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 178281e7,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560915
          ]
        }
      ],
      "topics": [
        {
          "id": 475272560888,
          "name": "HubSpot CMS",
          "slug": "hubspot-cms"
        },
        {
          "id": 475272560901,
          "name": "Content operations",
          "slug": "content-operations"
        },
        {
          "id": 475272560915,
          "name": "Accessibility",
          "slug": "accessibility"
        }
      ]
    },
    "content": {
      "id": 190000000100,
      "name": "Notes from the example team",
      "html_title": "HubSpot CMS | Notes from the example team | Example",
      "absolute_url": "https://www.example-portal.com/blog/tag/hubspot-cms",
      "language": "en"
    },
    "contents": [
      {
        "id": 128374619283,
        "name": "What changes when a module reads the platform",
        "title": "What changes when a module reads the platform | Example",
        "html_title": "What changes when a module reads the platform | Example",
        "slug": "blog/what-changes-when-a-module-reads-the-platform",
        "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
        "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
        "post_body": "<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
        "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
        "featured_image_alt_text": "A page editor with a blog post open beside its live page",
        "featured_image_width": 1200,
        "featured_image_height": 675,
        "use_featured_image": true,
        "publish_date": 1785834e6,
        "language": "en",
        "blog_post_author": {
          "id": 90210001,
          "display_name": "Ada Fenwick",
          "slug": "ada-fenwick",
          "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
        },
        "topic_list": [
          475272560888,
          475272560901
        ]
      },
      {
        "id": 128374619301,
        "name": "Three fields every blog listing needs",
        "title": "Three fields every blog listing needs | Example",
        "html_title": "Three fields every blog listing needs | Example",
        "slug": "blog/three-fields-every-blog-listing-needs",
        "absolute_url": "https://www.example-portal.com/blog/three-fields-every-blog-listing-needs",
        "post_summary": "A listing reads its posts from the platform; the only fields it needs are the words on its controls.",
        "post_body": "<p>A listing reads its posts from the platform; the only fields it needs are the words on its controls.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
        "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/three-fields.jpg",
        "featured_image_alt_text": "A blog listing with topic filters above a grid of posts",
        "featured_image_width": 1200,
        "featured_image_height": 675,
        "use_featured_image": true,
        "publish_date": 17852292e5,
        "language": "en",
        "blog_post_author": {
          "id": 90210001,
          "display_name": "Ada Fenwick",
          "slug": "ada-fenwick",
          "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
        },
        "topic_list": [
          475272560888
        ]
      },
      {
        "id": 128374619304,
        "name": "Previews an editor can trust",
        "title": "Previews an editor can trust | Example",
        "html_title": "Previews an editor can trust | Example",
        "slug": "blog/previews-an-editor-can-trust",
        "absolute_url": "https://www.example-portal.com/blog/previews-an-editor-can-trust",
        "post_summary": "A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.",
        "post_body": "<p>A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
        "featured_image": "",
        "featured_image_alt_text": "",
        "featured_image_width": 0,
        "featured_image_height": 0,
        "use_featured_image": false,
        "publish_date": 17834148e5,
        "language": "en",
        "blog_post_author": {
          "id": 90210002,
          "display_name": "Sam Okafor",
          "slug": "sam-okafor",
          "avatar": ""
        },
        "topic_list": [
          475272560888,
          475272560901
        ]
      }
    ],
    "current_page_num": 1,
    "last_page_num": 1
  },
  "content/blog-post/editor.json": {
    "label": "The post open in HubSpot's editor, where the body starts with the editor's marker",
    "is_in_editor": true,
    "request": {
      "domain": "www.example-portal.com",
      "scheme": "https",
      "path": "/blog/what-changes-when-a-module-reads-the-platform",
      "path_and_query": "/blog/what-changes-when-a-module-reads-the-platform",
      "full_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
      "query": "",
      "query_dict": {}
    },
    "group": {
      "id": 81234567890,
      "name": "Example blog",
      "public_title": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "slug": "blog",
      "absolute_url": "https://www.example-portal.com/blog",
      "language": "en",
      "description": "Field notes on building sites people can edit."
    },
    "blog": {
      "id": 81234567890,
      "posts": [
        {
          "id": 128374619283,
          "name": "What changes when a module reads the platform",
          "title": "What changes when a module reads the platform | Example",
          "html_title": "What changes when a module reads the platform | Example",
          "slug": "blog/what-changes-when-a-module-reads-the-platform",
          "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
          "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
          "post_body": "<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
          "featured_image_alt_text": "A page editor with a blog post open beside its live page",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 1785834e6,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619301,
          "name": "Three fields every blog listing needs",
          "title": "Three fields every blog listing needs | Example",
          "html_title": "Three fields every blog listing needs | Example",
          "slug": "blog/three-fields-every-blog-listing-needs",
          "absolute_url": "https://www.example-portal.com/blog/three-fields-every-blog-listing-needs",
          "post_summary": "A listing reads its posts from the platform; the only fields it needs are the words on its controls.",
          "post_body": "<p>A listing reads its posts from the platform; the only fields it needs are the words on its controls.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/three-fields.jpg",
          "featured_image_alt_text": "A blog listing with topic filters above a grid of posts",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17852292e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888
          ]
        },
        {
          "id": 128374619302,
          "name": "Why a topic filter is a link",
          "title": "Why a topic filter is a link | Example",
          "html_title": "Why a topic filter is a link | Example",
          "slug": "blog/why-a-topic-filter-is-a-link",
          "absolute_url": "https://www.example-portal.com/blog/why-a-topic-filter-is-a-link",
          "post_summary": "Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.",
          "post_body": "<p>Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17846244e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560915
          ]
        },
        {
          "id": 128374619303,
          "name": "Writing rich text that survives a redesign",
          "title": "Writing rich text that survives a redesign | Example",
          "html_title": "Writing rich text that survives a redesign | Example",
          "slug": "blog/writing-rich-text-that-survives-a-redesign",
          "absolute_url": "https://www.example-portal.com/blog/writing-rich-text-that-survives-a-redesign",
          "post_summary": "Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.",
          "post_body": "<p>Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/rich-text.jpg",
          "featured_image_alt_text": "A post's body with its headings and lists outlined",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17840196e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560901
          ]
        },
        {
          "id": 128374619304,
          "name": "Previews an editor can trust",
          "title": "Previews an editor can trust | Example",
          "html_title": "Previews an editor can trust | Example",
          "slug": "blog/previews-an-editor-can-trust",
          "absolute_url": "https://www.example-portal.com/blog/previews-an-editor-can-trust",
          "post_summary": "A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.",
          "post_body": "<p>A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17834148e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619305,
          "name": "An empty state is for the editor",
          "title": "An empty state is for the editor | Example",
          "html_title": "An empty state is for the editor | Example",
          "slug": "blog/an-empty-state-is-for-the-editor",
          "absolute_url": "https://www.example-portal.com/blog/an-empty-state-is-for-the-editor",
          "post_summary": "A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.",
          "post_body": "<p>A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/empty-state.jpg",
          "featured_image_alt_text": "An empty module in the page editor with a hint beneath it",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 178281e7,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560915
          ]
        }
      ],
      "topics": [
        {
          "id": 475272560888,
          "name": "HubSpot CMS",
          "slug": "hubspot-cms"
        },
        {
          "id": 475272560901,
          "name": "Content operations",
          "slug": "content-operations"
        },
        {
          "id": 475272560915,
          "name": "Accessibility",
          "slug": "accessibility"
        }
      ]
    },
    "content": {
      "id": 128374619283,
      "name": "What changes when a module reads the platform",
      "html_title": "What changes when a module reads the platform | Example",
      "slug": "blog/what-changes-when-a-module-reads-the-platform",
      "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
      "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
      "post_body": "{% blog_post_wrapper %}<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
      "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
      "featured_image_alt_text": "A page editor with a blog post open beside its live page",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "use_featured_image": true,
      "publish_date": 1785834e6,
      "language": "en",
      "blog_post_author": {
        "id": 90210001,
        "display_name": "Ada Fenwick",
        "slug": "ada-fenwick",
        "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg",
        "bio": "Ada writes about the parts of a site nobody screenshots."
      },
      "topic_list": [
        {
          "id": 475272560888,
          "name": "HubSpot CMS",
          "slug": "hubspot-cms"
        },
        {
          "id": 475272560901,
          "name": "Content operations",
          "slug": "content-operations"
        }
      ]
    }
  },
  "content/blog-post/full.json": {
    "label": "A full post: featured image, author, two topics and a long body",
    "is_in_editor": false,
    "request": {
      "domain": "www.example-portal.com",
      "scheme": "https",
      "path": "/blog/what-changes-when-a-module-reads-the-platform",
      "path_and_query": "/blog/what-changes-when-a-module-reads-the-platform",
      "full_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
      "query": "",
      "query_dict": {}
    },
    "group": {
      "id": 81234567890,
      "name": "Example blog",
      "public_title": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "slug": "blog",
      "absolute_url": "https://www.example-portal.com/blog",
      "language": "en",
      "description": "Field notes on building sites people can edit."
    },
    "blog": {
      "id": 81234567890,
      "posts": [
        {
          "id": 128374619283,
          "name": "What changes when a module reads the platform",
          "title": "What changes when a module reads the platform | Example",
          "html_title": "What changes when a module reads the platform | Example",
          "slug": "blog/what-changes-when-a-module-reads-the-platform",
          "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
          "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
          "post_body": "<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
          "featured_image_alt_text": "A page editor with a blog post open beside its live page",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 1785834e6,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619301,
          "name": "Three fields every blog listing needs",
          "title": "Three fields every blog listing needs | Example",
          "html_title": "Three fields every blog listing needs | Example",
          "slug": "blog/three-fields-every-blog-listing-needs",
          "absolute_url": "https://www.example-portal.com/blog/three-fields-every-blog-listing-needs",
          "post_summary": "A listing reads its posts from the platform; the only fields it needs are the words on its controls.",
          "post_body": "<p>A listing reads its posts from the platform; the only fields it needs are the words on its controls.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/three-fields.jpg",
          "featured_image_alt_text": "A blog listing with topic filters above a grid of posts",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17852292e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888
          ]
        },
        {
          "id": 128374619302,
          "name": "Why a topic filter is a link",
          "title": "Why a topic filter is a link | Example",
          "html_title": "Why a topic filter is a link | Example",
          "slug": "blog/why-a-topic-filter-is-a-link",
          "absolute_url": "https://www.example-portal.com/blog/why-a-topic-filter-is-a-link",
          "post_summary": "Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.",
          "post_body": "<p>Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17846244e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560915
          ]
        },
        {
          "id": 128374619303,
          "name": "Writing rich text that survives a redesign",
          "title": "Writing rich text that survives a redesign | Example",
          "html_title": "Writing rich text that survives a redesign | Example",
          "slug": "blog/writing-rich-text-that-survives-a-redesign",
          "absolute_url": "https://www.example-portal.com/blog/writing-rich-text-that-survives-a-redesign",
          "post_summary": "Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.",
          "post_body": "<p>Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/rich-text.jpg",
          "featured_image_alt_text": "A post's body with its headings and lists outlined",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17840196e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560901
          ]
        },
        {
          "id": 128374619304,
          "name": "Previews an editor can trust",
          "title": "Previews an editor can trust | Example",
          "html_title": "Previews an editor can trust | Example",
          "slug": "blog/previews-an-editor-can-trust",
          "absolute_url": "https://www.example-portal.com/blog/previews-an-editor-can-trust",
          "post_summary": "A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.",
          "post_body": "<p>A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17834148e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619305,
          "name": "An empty state is for the editor",
          "title": "An empty state is for the editor | Example",
          "html_title": "An empty state is for the editor | Example",
          "slug": "blog/an-empty-state-is-for-the-editor",
          "absolute_url": "https://www.example-portal.com/blog/an-empty-state-is-for-the-editor",
          "post_summary": "A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.",
          "post_body": "<p>A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/empty-state.jpg",
          "featured_image_alt_text": "An empty module in the page editor with a hint beneath it",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 178281e7,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560915
          ]
        }
      ],
      "topics": [
        {
          "id": 475272560888,
          "name": "HubSpot CMS",
          "slug": "hubspot-cms"
        },
        {
          "id": 475272560901,
          "name": "Content operations",
          "slug": "content-operations"
        },
        {
          "id": 475272560915,
          "name": "Accessibility",
          "slug": "accessibility"
        }
      ]
    },
    "content": {
      "id": 128374619283,
      "name": "What changes when a module reads the platform",
      "html_title": "What changes when a module reads the platform | Example",
      "slug": "blog/what-changes-when-a-module-reads-the-platform",
      "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
      "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
      "post_body": "<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
      "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
      "featured_image_alt_text": "A page editor with a blog post open beside its live page",
      "featured_image_width": 1200,
      "featured_image_height": 675,
      "use_featured_image": true,
      "publish_date": 1785834e6,
      "language": "en",
      "blog_post_author": {
        "id": 90210001,
        "display_name": "Ada Fenwick",
        "slug": "ada-fenwick",
        "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg",
        "bio": "Ada writes about the parts of a site nobody screenshots."
      },
      "topic_list": [
        {
          "id": 475272560888,
          "name": "HubSpot CMS",
          "slug": "hubspot-cms"
        },
        {
          "id": 475272560901,
          "name": "Content operations",
          "slug": "content-operations"
        }
      ]
    }
  },
  "content/blog-post/minimal.json": {
    "label": "A bare post: no featured image, no author, no topics and an empty body",
    "is_in_editor": false,
    "request": {
      "domain": "www.example-portal.com",
      "scheme": "https",
      "path": "/blog/a-note-with-nothing-else-yet",
      "path_and_query": "/blog/a-note-with-nothing-else-yet",
      "full_url": "https://www.example-portal.com/blog/a-note-with-nothing-else-yet",
      "query": "",
      "query_dict": {}
    },
    "group": {
      "id": 81234567890,
      "name": "Example blog",
      "public_title": "Notes from the example team",
      "html_title": "Notes from the example team | Example",
      "slug": "blog",
      "absolute_url": "https://www.example-portal.com/blog",
      "language": "en",
      "description": "Field notes on building sites people can edit."
    },
    "blog": {
      "id": 81234567890,
      "posts": [
        {
          "id": 128374619400,
          "name": "A note with nothing else yet",
          "title": "A note with nothing else yet | Example",
          "html_title": "A note with nothing else yet | Example",
          "slug": "blog/a-note-with-nothing-else-yet",
          "absolute_url": "https://www.example-portal.com/blog/a-note-with-nothing-else-yet",
          "post_summary": "",
          "post_body": "",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17864388e5,
          "language": "en",
          "blog_post_author": null,
          "topic_list": []
        },
        {
          "id": 128374619283,
          "name": "What changes when a module reads the platform",
          "title": "What changes when a module reads the platform | Example",
          "html_title": "What changes when a module reads the platform | Example",
          "slug": "blog/what-changes-when-a-module-reads-the-platform",
          "absolute_url": "https://www.example-portal.com/blog/what-changes-when-a-module-reads-the-platform",
          "post_summary": "A band that restates a post's heading, date and author as static text stops being true the next time somebody publishes.",
          "post_body": "<p>A featured band that restates a post's title, date and author in text fields matches its reference exactly, and stops being true the next time somebody publishes. Reading the post is the whole difference.</p><h2>Where the data comes from</h2><p>Every value on this page is the post's own, read out of the post in plain values before it reaches the module. The title never carries HubSpot's wrapper, and a topic is a name with its own listing address.</p><ul><li><strong>The title</strong> is the post's name, not its SEO title.</li><li><strong>The topics</strong> are names, never ids.</li><li><strong>The reading time</strong> is counted from the body.</li></ul><blockquote><p>A plausible card that is wrong is worse than an empty one.</p></blockquote><h3>What the editor sees</h3><p>The body is edited in the blog editor, where it always was. The marker the editor adds in front of it never reaches the page.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/what-changes-when-a-module-reads-the-platform.jpg",
          "featured_image_alt_text": "A page editor with a blog post open beside its live page",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 1785834e6,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619301,
          "name": "Three fields every blog listing needs",
          "title": "Three fields every blog listing needs | Example",
          "html_title": "Three fields every blog listing needs | Example",
          "slug": "blog/three-fields-every-blog-listing-needs",
          "absolute_url": "https://www.example-portal.com/blog/three-fields-every-blog-listing-needs",
          "post_summary": "A listing reads its posts from the platform; the only fields it needs are the words on its controls.",
          "post_body": "<p>A listing reads its posts from the platform; the only fields it needs are the words on its controls.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/three-fields.jpg",
          "featured_image_alt_text": "A blog listing with topic filters above a grid of posts",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17852292e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560888
          ]
        },
        {
          "id": 128374619302,
          "name": "Why a topic filter is a link",
          "title": "Why a topic filter is a link | Example",
          "html_title": "Why a topic filter is a link | Example",
          "slug": "blog/why-a-topic-filter-is-a-link",
          "absolute_url": "https://www.example-portal.com/blog/why-a-topic-filter-is-a-link",
          "post_summary": "Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.",
          "post_body": "<p>Every filter on a listing is a real link to the topic's own route, so the band works before a script loads.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17846244e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560915
          ]
        },
        {
          "id": 128374619303,
          "name": "Writing rich text that survives a redesign",
          "title": "Writing rich text that survives a redesign | Example",
          "html_title": "Writing rich text that survives a redesign | Example",
          "slug": "blog/writing-rich-text-that-survives-a-redesign",
          "absolute_url": "https://www.example-portal.com/blog/writing-rich-text-that-survives-a-redesign",
          "post_summary": "Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.",
          "post_body": "<p>Headings that are real headings, lists that are real lists, and one paragraph style for the whole site.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/rich-text.jpg",
          "featured_image_alt_text": "A post's body with its headings and lists outlined",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 17840196e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560901
          ]
        },
        {
          "id": 128374619304,
          "name": "Previews an editor can trust",
          "title": "Previews an editor can trust | Example",
          "html_title": "Previews an editor can trust | Example",
          "slug": "blog/previews-an-editor-can-trust",
          "absolute_url": "https://www.example-portal.com/blog/previews-an-editor-can-trust",
          "post_summary": "A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.",
          "post_body": "<p>A preview drawn from the page's real states shows the empty topic and the missing picture before a visitor does.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "",
          "featured_image_alt_text": "",
          "featured_image_width": 0,
          "featured_image_height": 0,
          "use_featured_image": false,
          "publish_date": 17834148e5,
          "language": "en",
          "blog_post_author": {
            "id": 90210002,
            "display_name": "Sam Okafor",
            "slug": "sam-okafor",
            "avatar": ""
          },
          "topic_list": [
            475272560888,
            475272560901
          ]
        },
        {
          "id": 128374619305,
          "name": "An empty state is for the editor",
          "title": "An empty state is for the editor | Example",
          "html_title": "An empty state is for the editor | Example",
          "slug": "blog/an-empty-state-is-for-the-editor",
          "absolute_url": "https://www.example-portal.com/blog/an-empty-state-is-for-the-editor",
          "post_summary": "A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.",
          "post_body": "<p>A module with nothing to show shows nothing to a visitor and one clear hint to the person editing the page.</p><p>The rest of this post is here so the listing has a reading time to count.</p>",
          "featured_image": "https://cdn2.hubspot.net/hubfs/8675309/blog/empty-state.jpg",
          "featured_image_alt_text": "An empty module in the page editor with a hint beneath it",
          "featured_image_width": 1200,
          "featured_image_height": 675,
          "use_featured_image": true,
          "publish_date": 178281e7,
          "language": "en",
          "blog_post_author": {
            "id": 90210001,
            "display_name": "Ada Fenwick",
            "slug": "ada-fenwick",
            "avatar": "https://cdn2.hubspot.net/hubfs/8675309/authors/ada-fenwick.jpg"
          },
          "topic_list": [
            475272560915
          ]
        }
      ],
      "topics": [
        {
          "id": 475272560888,
          "name": "HubSpot CMS",
          "slug": "hubspot-cms"
        },
        {
          "id": 475272560901,
          "name": "Content operations",
          "slug": "content-operations"
        },
        {
          "id": 475272560915,
          "name": "Accessibility",
          "slug": "accessibility"
        }
      ]
    },
    "content": {
      "id": 128374619400,
      "name": "A note with nothing else yet",
      "html_title": "A note with nothing else yet | Example",
      "slug": "blog/a-note-with-nothing-else-yet",
      "absolute_url": "https://www.example-portal.com/blog/a-note-with-nothing-else-yet",
      "post_summary": "",
      "post_body": "",
      "featured_image": "",
      "featured_image_alt_text": "",
      "featured_image_width": 0,
      "featured_image_height": 0,
      "use_featured_image": false,
      "publish_date": 17864388e5,
      "language": "en",
      "blog_post_author": null,
      "topic_list": []
    }
  },
  "content/hubdb-dynamic-page/listing.json": {
    "label": "The table's listing page, with every row",
    "is_in_editor": false,
    "request": {
      "domain": "www.example-portal.com",
      "scheme": "https",
      "path": "/locations",
      "path_and_query": "/locations",
      "full_url": "https://www.example-portal.com/locations",
      "query": "",
      "query_dict": {}
    },
    "content": {
      "id": 190000000200,
      "name": "Locations",
      "html_title": "Locations | Example",
      "absolute_url": "https://www.example-portal.com/locations",
      "language": "en"
    },
    "dynamicPage": {
      "tableId": 5678901,
      "rows": [
        {
          "hs_id": 4820193,
          "hs_name": "Bakehouse",
          "hs_path": "bakehouse",
          "hs_created_at": 1785312e6,
          "summary": "Sourdough and pastry, six mornings a week.",
          "address": "3 Oven Street"
        },
        {
          "hs_id": 4820194,
          "hs_name": "Ferment",
          "hs_path": "ferment",
          "hs_created_at": 17853984e5,
          "summary": "Small-batch kraut, kimchi and kefir from the same kitchen.",
          "address": "7 Crock Yard"
        },
        {
          "hs_id": 4820195,
          "hs_name": "Roastery",
          "hs_path": "roastery",
          "hs_created_at": 17854848e5,
          "summary": "Single-origin coffee roasted on site and sold by the kilo.",
          "address": "12 Mill Lane"
        },
        {
          "hs_id": 4820196,
          "hs_name": "Larder",
          "hs_path": "larder",
          "hs_created_at": 17855712e5,
          "summary": "Store-cupboard staples from growers within fifty miles.",
          "address": "1 Granary Row"
        }
      ]
    }
  },
  "content/hubdb-dynamic-page/row.json": {
    "label": "One row's own page, such as a single location",
    "is_in_editor": false,
    "request": {
      "domain": "www.example-portal.com",
      "scheme": "https",
      "path": "/locations/roastery",
      "path_and_query": "/locations/roastery",
      "full_url": "https://www.example-portal.com/locations/roastery",
      "query": "",
      "query_dict": {}
    },
    "content": {
      "id": 190000000200,
      "name": "Locations",
      "html_title": "Roastery | Example",
      "absolute_url": "https://www.example-portal.com/locations/roastery",
      "language": "en"
    },
    "dynamicPage": {
      "tableId": 5678901,
      "row": {
        "hs_id": 4820195,
        "hs_name": "Roastery",
        "hs_path": "roastery",
        "hs_created_at": 17854848e5,
        "summary": "Single-origin coffee roasted on site and sold by the kilo.",
        "address": "12 Mill Lane"
      }
    }
  },
  "crm-objects/p_sample.json": {
    "objectTypeId": "2-1234567",
    "name": "p_sample",
    "labels": {
      "singular": "Sample project",
      "plural": "Sample projects"
    },
    "primaryDisplayProperty": "name",
    "properties": [
      {
        "name": "name",
        "label": "Name",
        "type": "string",
        "fieldType": "text"
      },
      {
        "name": "summary",
        "label": "Summary",
        "type": "string",
        "fieldType": "textarea"
      },
      {
        "name": "status",
        "label": "Status",
        "type": "enumeration",
        "fieldType": "select",
        "options": [
          {
            "label": "Planning",
            "value": "planning"
          },
          {
            "label": "In progress",
            "value": "in_progress"
          },
          {
            "label": "Complete",
            "value": "complete"
          }
        ]
      },
      {
        "name": "start_date",
        "label": "Start date",
        "type": "date",
        "fieldType": "date"
      }
    ],
    "records": [
      {
        "id": "1001",
        "properties": {
          "hs_object_id": "1001",
          "name": "Sample Project 1",
          "summary": "A placeholder record so a custom-object module has something to show.",
          "status": "planning",
          "start_date": "2026-01-12"
        }
      },
      {
        "id": "1002",
        "properties": {
          "hs_object_id": "1002",
          "name": "Sample Project 2",
          "summary": "A second record, with a longer summary, so a layout that wraps text can be seen wrapping it.",
          "status": "in_progress",
          "start_date": "2026-03-02"
        }
      },
      {
        "id": "1003",
        "properties": {
          "hs_object_id": "1003",
          "name": "Sample Project 3",
          "summary": "A third record: replace this file with the theme's own fixtures/crm-objects/<objectType>.json.",
          "status": "complete",
          "start_date": "2026-05-18"
        }
      }
    ]
  },
  "form.json": {
    "id": "preview-form-001",
    "guid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Contact Form",
    "portalId": 12345678,
    "formType": "HUBSPOT",
    "cssClass": "",
    "submitText": "Submit",
    "thankYouMessage": "Thank you for your submission. We'll be in touch shortly.",
    "redirect": null,
    "notifyRecipients": "",
    "followUpId": null,
    "inlineMessage": "Thank you for your submission. We'll be in touch shortly.",
    "formFieldGroups": [
      {
        "fields": [
          {
            "name": "firstname",
            "label": "First name",
            "type": "string",
            "fieldType": "text",
            "required": true,
            "hidden": false,
            "placeholder": "Enter your first name",
            "defaultValue": "",
            "description": "",
            "groupName": "contactinformation",
            "labelHidden": false,
            "validation": {
              "name": "",
              "message": "",
              "data": "",
              "useDefaultBlockList": false
            },
            "enabled": true,
            "selectedOptions": [],
            "options": []
          }
        ],
        "default": true,
        "isSmartGroup": false,
        "richText": {
          "content": ""
        }
      },
      {
        "fields": [
          {
            "name": "lastname",
            "label": "Last name",
            "type": "string",
            "fieldType": "text",
            "required": true,
            "hidden": false,
            "placeholder": "Enter your last name",
            "defaultValue": "",
            "description": "",
            "groupName": "contactinformation",
            "labelHidden": false,
            "validation": {
              "name": "",
              "message": "",
              "data": "",
              "useDefaultBlockList": false
            },
            "enabled": true,
            "selectedOptions": [],
            "options": []
          }
        ],
        "default": true,
        "isSmartGroup": false,
        "richText": {
          "content": ""
        }
      },
      {
        "fields": [
          {
            "name": "email",
            "label": "Email",
            "type": "string",
            "fieldType": "text",
            "required": true,
            "hidden": false,
            "placeholder": "you@example.com",
            "defaultValue": "",
            "description": "",
            "groupName": "contactinformation",
            "labelHidden": false,
            "validation": {
              "name": "email",
              "message": "Please enter a valid email address.",
              "data": "",
              "useDefaultBlockList": false
            },
            "enabled": true,
            "selectedOptions": [],
            "options": []
          }
        ],
        "default": true,
        "isSmartGroup": false,
        "richText": {
          "content": ""
        }
      },
      {
        "fields": [
          {
            "name": "company",
            "label": "Company name",
            "type": "string",
            "fieldType": "text",
            "required": false,
            "hidden": false,
            "placeholder": "Your company",
            "defaultValue": "",
            "description": "",
            "groupName": "company",
            "labelHidden": false,
            "validation": {
              "name": "",
              "message": "",
              "data": "",
              "useDefaultBlockList": false
            },
            "enabled": true,
            "selectedOptions": [],
            "options": []
          }
        ],
        "default": true,
        "isSmartGroup": false,
        "richText": {
          "content": ""
        }
      },
      {
        "fields": [
          {
            "name": "message",
            "label": "Message",
            "type": "string",
            "fieldType": "textarea",
            "required": false,
            "hidden": false,
            "placeholder": "How can we help?",
            "defaultValue": "",
            "description": "",
            "groupName": "",
            "labelHidden": false,
            "validation": {
              "name": "",
              "message": "",
              "data": "",
              "useDefaultBlockList": false
            },
            "enabled": true,
            "selectedOptions": [],
            "options": []
          }
        ],
        "default": true,
        "isSmartGroup": false,
        "richText": {
          "content": ""
        }
      }
    ],
    "metaData": [
      {
        "name": "lang",
        "value": "en"
      },
      {
        "name": "legalConsentOptions",
        "value": ""
      }
    ],
    "deletable": true,
    "createdAt": "2026-01-01T10:00:00Z",
    "updatedAt": "2026-03-01T12:00:00Z"
  },
  "hubdb-rows.json": [
    {
      "hs_id": 5001,
      "hs_created_at": "2026-01-10T09:00:00Z",
      "hs_path": "digital-transformation-guide",
      "hs_name": "Digital Transformation Guide",
      "name": "Digital Transformation Guide",
      "internal_name": "digital-transformation-guide",
      "description": "A comprehensive guide to modernising your digital infrastructure and workflows for maximum efficiency.",
      "medium": {
        "id": 1,
        "name": "Guide",
        "order": 0
      },
      "category": {
        "id": 1,
        "name": "Strategy",
        "order": 0
      },
      "landing_page_url": "#",
      "link_text": "Download guide",
      "cover_image": {
        "url": "/images/icon-placeholder.svg",
        "width": 800,
        "height": 450,
        "altText": "Digital transformation guide cover",
        "type": "image"
      },
      "featured_offer": true
    },
    {
      "hs_id": 5002,
      "hs_created_at": "2026-01-15T14:00:00Z",
      "hs_path": "web-performance-checklist",
      "hs_name": "Web Performance Checklist",
      "name": "Web Performance Checklist",
      "internal_name": "web-performance-checklist",
      "description": "Essential performance optimisations every website should implement, from image compression to caching strategies.",
      "medium": {
        "id": 2,
        "name": "Checklist",
        "order": 1
      },
      "category": {
        "id": 2,
        "name": "Development",
        "order": 1
      },
      "landing_page_url": "#",
      "link_text": "Get checklist",
      "cover_image": {
        "url": "/images/icon-placeholder.svg",
        "width": 800,
        "height": 450,
        "altText": "Web performance checklist cover",
        "type": "image"
      },
      "featured_offer": false
    },
    {
      "hs_id": 5003,
      "hs_created_at": "2026-02-01T10:00:00Z",
      "hs_path": "cms-migration-playbook",
      "hs_name": "CMS Migration Playbook",
      "name": "CMS Migration Playbook",
      "internal_name": "cms-migration-playbook",
      "description": "Step-by-step playbook for migrating your website to a modern CMS without losing traffic or rankings.",
      "medium": {
        "id": 3,
        "name": "Playbook",
        "order": 2
      },
      "category": {
        "id": 3,
        "name": "CMS",
        "order": 2
      },
      "landing_page_url": "#",
      "link_text": "Read playbook",
      "cover_image": {
        "url": "/images/icon-placeholder.svg",
        "width": 800,
        "height": 450,
        "altText": "CMS migration playbook cover",
        "type": "image"
      },
      "featured_offer": true
    },
    {
      "hs_id": 5004,
      "hs_created_at": "2026-02-10T11:00:00Z",
      "hs_path": "brand-identity-workshop",
      "hs_name": "Brand Identity Workshop",
      "name": "Brand Identity Workshop",
      "internal_name": "brand-identity-workshop",
      "description": "Interactive workshop template for defining your brand voice, visual identity, and messaging framework.",
      "medium": {
        "id": 4,
        "name": "Workshop",
        "order": 3
      },
      "category": {
        "id": 4,
        "name": "Design",
        "order": 3
      },
      "landing_page_url": "#",
      "link_text": "Start workshop",
      "cover_image": {
        "url": "/images/icon-placeholder.svg",
        "width": 800,
        "height": 450,
        "altText": "Brand identity workshop cover",
        "type": "image"
      },
      "featured_offer": false
    },
    {
      "hs_id": 5005,
      "hs_created_at": "2026-02-20T08:00:00Z",
      "hs_path": "seo-audit-template",
      "hs_name": "SEO Audit Template",
      "name": "SEO Audit Template",
      "internal_name": "seo-audit-template",
      "description": "Comprehensive SEO audit template covering technical SEO, content quality, and backlink analysis.",
      "medium": {
        "id": 5,
        "name": "Template",
        "order": 4
      },
      "category": {
        "id": 5,
        "name": "Marketing",
        "order": 4
      },
      "landing_page_url": "#",
      "link_text": "Download template",
      "cover_image": {
        "url": "/images/icon-placeholder.svg",
        "width": 800,
        "height": 450,
        "altText": "SEO audit template cover",
        "type": "image"
      },
      "featured_offer": false
    }
  ],
  "menu.json": {
    "children": [
      {
        "label": "Home",
        "url": "/",
        "pageId": 101,
        "contentGroupId": null,
        "linkTarget": null,
        "slug": "",
        "pageTitle": "Home",
        "level": 0,
        "activeBranch": false,
        "activeNode": false,
        "children": []
      },
      {
        "label": "About",
        "url": "/about",
        "pageId": 102,
        "contentGroupId": null,
        "linkTarget": null,
        "slug": "about",
        "pageTitle": "About Us",
        "level": 0,
        "activeBranch": false,
        "activeNode": false,
        "children": [
          {
            "label": "Our Team",
            "url": "/about/team",
            "pageId": 103,
            "contentGroupId": null,
            "linkTarget": null,
            "slug": "team",
            "pageTitle": "Our Team",
            "level": 1,
            "activeBranch": false,
            "activeNode": false,
            "children": []
          },
          {
            "label": "Careers",
            "url": "/about/careers",
            "pageId": 104,
            "contentGroupId": null,
            "linkTarget": null,
            "slug": "careers",
            "pageTitle": "Careers",
            "level": 1,
            "activeBranch": false,
            "activeNode": false,
            "children": []
          }
        ]
      },
      {
        "label": "Services",
        "url": "/services",
        "pageId": 105,
        "contentGroupId": null,
        "linkTarget": null,
        "slug": "services",
        "pageTitle": "Our Services",
        "level": 0,
        "activeBranch": false,
        "activeNode": false,
        "children": [
          {
            "label": "Web Development",
            "url": "/services/web-development",
            "pageId": 106,
            "contentGroupId": null,
            "linkTarget": null,
            "slug": "web-development",
            "pageTitle": "Web Development",
            "level": 1,
            "activeBranch": false,
            "activeNode": false,
            "children": []
          },
          {
            "label": "Consulting",
            "url": "/services/consulting",
            "pageId": 107,
            "contentGroupId": null,
            "linkTarget": null,
            "slug": "consulting",
            "pageTitle": "Consulting",
            "level": 1,
            "activeBranch": false,
            "activeNode": false,
            "children": []
          },
          {
            "label": "Design",
            "url": "/services/design",
            "pageId": 108,
            "contentGroupId": null,
            "linkTarget": null,
            "slug": "design",
            "pageTitle": "Design",
            "level": 1,
            "activeBranch": false,
            "activeNode": false,
            "children": []
          }
        ]
      },
      {
        "label": "Blog",
        "url": "/blog",
        "pageId": null,
        "contentGroupId": 201,
        "linkTarget": null,
        "slug": "blog",
        "pageTitle": "Blog",
        "level": 0,
        "activeBranch": false,
        "activeNode": false,
        "children": []
      },
      {
        "label": "Contact",
        "url": "/contact",
        "pageId": 109,
        "contentGroupId": null,
        "linkTarget": null,
        "slug": "contact",
        "pageTitle": "Contact Us",
        "level": 0,
        "activeBranch": false,
        "activeNode": false,
        "children": []
      }
    ]
  }
};

export {
  EMBEDDED_FIXTURES
};
