import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
import {
  __name
} from "./chunk-PPQVNGDG.mjs";

// src/hubspot-default-modules.ts
var HUBSPOT_MODULE_PREFIX = "@hubspot/";
var MODULE_DIR_SUFFIX = ".module";
var SLUG_RE = /^[A-Za-z0-9_-]+$/;
function hubspotDefaultModuleSlug(modulePath) {
  if (typeof modulePath !== "string" || !modulePath.startsWith(HUBSPOT_MODULE_PREFIX)) return null;
  const rest = modulePath.slice(HUBSPOT_MODULE_PREFIX.length).replace(/\/+$/, "");
  const slug = rest.endsWith(MODULE_DIR_SUFFIX) ? rest.slice(0, -MODULE_DIR_SUFFIX.length) : rest;
  return SLUG_RE.test(slug) ? slug : null;
}
__name(hubspotDefaultModuleSlug, "hubspotDefaultModuleSlug");
function isMalformedHubspotDefaultModuleRef(modulePath) {
  return typeof modulePath === "string" && modulePath.startsWith(HUBSPOT_MODULE_PREFIX) && hubspotDefaultModuleSlug(modulePath) === null;
}
__name(isMalformedHubspotDefaultModuleRef, "isMalformedHubspotDefaultModuleRef");
function hubspotDefaultModuleDir(modulePath) {
  const slug = hubspotDefaultModuleSlug(modulePath);
  return slug === null ? null : `${HUBSPOT_MODULE_PREFIX}${slug}${MODULE_DIR_SUFFIX}`;
}
__name(hubspotDefaultModuleDir, "hubspotDefaultModuleDir");
var PORTAL_DATA_DEPENDENT_MODULES = Object.assign(/* @__PURE__ */ Object.create(null), {
  form: "a form definition from the portal",
  blog_subscribe: "a blog subscription form from the portal",
  cta: "a call-to-action defined in the portal",
  meetings: "a meetings link from the portal",
  payments: "a payment link from the portal",
  menu: "a menu tree from the portal",
  blog_posts: "blog posts from the portal",
  blog_comments: "blog comments from the portal",
  post_listing: "blog posts from the portal",
  post_filter: "blog tags, authors and dates from the portal",
  related_blog_posts: "blog posts from the portal",
  pagination: "the blog listing's page count from the portal",
  rss_listing: "an RSS feed fetched at render time",
  product: "a product record from the CRM",
  line_items: "quote line items from the CRM",
  quote_download: "a quote record from the CRM",
  quote_payment: "a quote record from the CRM",
  quote_signature: "a quote record from the CRM",
  search_results: "the portal's search index",
  language_switcher: "the page's translated variants from the portal",
  membership_social_logins: "the membership settings for the portal",
  email_subscriptions: "the subscription types defined in the portal",
  email_subscriptions_confirmation: "the subscription types defined in the portal",
  email_simple_subscription: "the subscription types defined in the portal",
  password_prompt: "HubSpot's password-protection form"
});
function portalDataRequirement(modulePath) {
  const slug = hubspotDefaultModuleSlug(modulePath);
  if (slug === null) return null;
  const needs = PORTAL_DATA_DEPENDENT_MODULES[slug];
  return needs === void 0 ? null : { slug, needs };
}
__name(portalDataRequirement, "portalDataRequirement");
var DEFAULT_MODULE_PLACEHOLDER_SOURCE = Object.assign(
  /* @__PURE__ */ Object.create(null),
  {
    logo: "loaded from your brand kit",
    form: "loaded from your HubSpot forms",
    blog_subscribe: "loaded from your blog subscription form",
    cta: "loaded from your HubSpot CTAs",
    meetings: "loaded from your HubSpot meetings",
    payments: "loaded from your HubSpot payment links",
    menu: "loaded from your site navigation",
    blog_posts: "loaded from your blog",
    blog_comments: "loaded from your blog comments",
    post_listing: "loaded from your blog",
    post_filter: "loaded from your blog",
    related_blog_posts: "loaded from your blog",
    pagination: "loaded from your blog",
    rss_listing: "loaded from your RSS feed",
    product: "loaded from your CRM products",
    line_items: "loaded from your CRM quote",
    quote_download: "loaded from your CRM quote",
    quote_payment: "loaded from your CRM quote",
    quote_signature: "loaded from your CRM quote",
    search_results: "loaded from your site search",
    language_switcher: "loaded from your translated pages",
    membership_social_logins: "loaded from your membership settings",
    email_subscriptions: "loaded from your subscription types",
    email_subscriptions_confirmation: "loaded from your subscription types",
    email_simple_subscription: "loaded from your subscription types",
    password_prompt: "loaded from your content settings"
  }
);
function defaultModulePlaceholderSource(slug) {
  return DEFAULT_MODULE_PLACEHOLDER_SOURCE[slug] ?? "loaded from your HubSpot portal";
}
__name(defaultModulePlaceholderSource, "defaultModulePlaceholderSource");
function isSourceFramedDefaultModule(slug) {
  return slug in DEFAULT_MODULE_PLACEHOLDER_SOURCE;
}
__name(isSourceFramedDefaultModule, "isSourceFramedDefaultModule");
function defaultModuleDisplayName(slug) {
  const words = slug.replace(/[_-]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}
__name(defaultModuleDisplayName, "defaultModuleDisplayName");
var MENU_LINK_UNSAFE_FILTER = "_themespot_menu_link_unsafe";
var SAFE_MENU_LINK_SCHEMES = /* @__PURE__ */ new Set(["http", "https", "mailto", "tel"]);
function isUnsafeMenuLinkUrl(value) {
  if (value === null || value === void 0) return false;
  const text = String(value).replace(/^[\u0000- ]+/, "").replace(/[\t\n\r]/g, "");
  if (text === "") return false;
  const scheme = /^([A-Za-z][A-Za-z0-9+.-]*):/.exec(text);
  return scheme !== null && !SAFE_MENU_LINK_SCHEMES.has(scheme[1].toLowerCase());
}
__name(isUnsafeMenuLinkUrl, "isUnsafeMenuLinkUrl");
var BUILTIN_DEFAULT_MODULES = Object.assign(
  /* @__PURE__ */ Object.create(null),
  {
    rich_text: {
      source: `{% rich_text "module" html="{{ module.html }}" %}`,
      fieldDefaults: { html: "" }
    },
    linked_image: {
      source: `{% set _img_style = 'width: 100%; height: auto;' if module.img.size_type in ['auto', 'auto_custom_max'] else '' %}{% linked_image "module" src="{{ module.img.src }}" alt="{{ module.img.alt }}" width="{{ module.img.width }}" height="{{ module.img.height }}" loading="{{ module.img.loading }}" style="{{ _img_style }}" link="{{ module.link }}" target="{{ '_blank' if module.open_in_new_tab else '' }}" %}`,
      fieldDefaults: { img: {}, link: "", open_in_new_tab: false }
    },
    logo: {
      source: `{% set _brand_logo = brand_settings.primaryLogo if brand_settings.primaryLogo.src else brand_settings.logo %}{% set _logo = module.img if module.img.src else (module.logo if module.logo.src else (module if module.src else _brand_logo)) %}{% set _company = brand_settings.name if brand_settings.name else site_settings.company_name %}{% if _logo.src %}{% logo "module" src="{{ _logo.src }}" alt="{{ _logo.alt }}" width="{{ _logo.width }}" height="{{ _logo.height }}" loading="{{ _logo.loading }}" link="{{ module.link }}" target="{{ '_blank' if module.open_in_new_tab else '' }}" %}{% else %}<span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_logo" data-hs-cos-general-type="widget" data-hs-cos-type="logo"><a href="{{ module.link if module.link else '/' }}" class="hs-logo-widget">{{ _company }}</a></span>{% endif %}`,
      fieldDefaults: { img: {}, logo: {}, link: "", open_in_new_tab: false },
      rendersFrom: /* @__PURE__ */ __name((props, context) => Boolean(
        props?.img?.src ?? props?.logo?.src ?? props?.src ?? context?.brand?.primaryLogo?.src ?? context?.brand?.logos?.[0]?.src ?? context?.brand?.name
      ), "rendersFrom"),
      needsWithout: "the site logo from the portal's brand settings"
    },
    divider: {
      source: `{% set _d_align = module.alignment|lower %}<span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_divider" data-hs-cos-general-type="widget" data-hs-cos-type="divider"><hr style="border: none; border-top: {{ module.height }}px {{ module.line_type|lower }} {{ module.color.color }}; width: {{ module.width }}%;{% if module.color.opacity is defined and module.color.opacity < 100 %} opacity: {{ module.color.opacity / 100 }};{% endif %} margin-left: {{ '0' if _d_align == 'left' else 'auto' }}; margin-right: {{ '0' if _d_align == 'right' else 'auto' }};"></span>`,
      fieldDefaults: {
        height: 1,
        width: 100,
        line_type: "solid",
        alignment: "center",
        color: { color: "#000000", opacity: 100 }
      }
    },
    search_input: {
      source: `{% set _search_label = module.field_label if module.field_label else (module.placeholder if module.placeholder else 'Search') %}<span class="hs_cos_wrapper hs_cos_wrapper_widget hs_cos_wrapper_type_search_input" data-hs-cos-general-type="widget" data-hs-cos-type="search_input"><div class="hs-search-field"><div class="hs-search-field__bar"><form data-hs-do-not-collect action="/hs-search-results"><label for="term-{{ name }}">{{ _search_label }}</label><input type="text" class="hs-search-field__input" name="term" autocomplete="off" id="term-{{ name }}" placeholder="{{ _search_label }}" aria-label="{{ _search_label }}"><button aria-label="{{ _search_label }}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 2.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/><path d="M16.2 14.4L22 20.2l-1.8 1.8-5.8-5.8Z"/></svg></button></form></div><ul class="hs-search-field__suggestions"></ul></div></span>`,
      fieldDefaults: { placeholder: "Search" }
    },
    simple_menu: {
      source: `{% set _sm_tree = module.menu_tree if (module.menu_tree is iterable and module.menu_tree is not string) else [] %}<nav class="hs-menu-wrapper hs-menu-flow-{{ 'vertical' if module.orientation == 'vertical' else 'horizontal' }}" aria-label="Navigation Menu">{% if _sm_tree|length > 0 %}<ul role="menu">{% for _sm_item in _sm_tree recursive %}<li class="hs-menu-item hs-menu-depth-{{ loop.depth }}{% if _sm_item.children is iterable and _sm_item.children is not string and _sm_item.children|length > 0 %} hs-item-has-children{% endif %}" role="none">{% if _sm_item.linkUrl|${MENU_LINK_UNSAFE_FILTER} %}<span>{{ _sm_item.linkLabel|escape_html if _sm_item.linkLabel else '' }}</span>{% else %}<a{% if _sm_item.linkUrl %} href="{{ _sm_item.linkUrl|escape_attr }}"{% endif %}{% if _sm_item.linkTarget %} target="{{ _sm_item.linkTarget|escape_attr }}"{% endif %}{% if _sm_item.children is iterable and _sm_item.children is not string and _sm_item.children|length > 0 %} aria-haspopup="true" aria-expanded="false"{% endif %} role="menuitem">{{ _sm_item.linkLabel|escape_html if _sm_item.linkLabel else '' }}</a>{% endif %}{% if _sm_item.children is iterable and _sm_item.children is not string and _sm_item.children|length > 0 %}<ul role="menu" class="hs-menu-children-wrapper">{{ loop(_sm_item.children) }}</ul>{% endif %}</li>{% endfor %}</ul>{% endif %}</nav>`,
      fieldDefaults: { menu_tree: [], orientation: "horizontal" }
    }
  }
);
function builtinDefaultModule(modulePath) {
  const slug = hubspotDefaultModuleSlug(modulePath);
  if (slug === null) return null;
  const builtin = BUILTIN_DEFAULT_MODULES[slug];
  return builtin === void 0 ? null : { slug, builtin };
}
__name(builtinDefaultModule, "builtinDefaultModule");

export {
  HUBSPOT_MODULE_PREFIX,
  hubspotDefaultModuleSlug,
  isMalformedHubspotDefaultModuleRef,
  hubspotDefaultModuleDir,
  portalDataRequirement,
  defaultModulePlaceholderSource,
  isSourceFramedDefaultModule,
  defaultModuleDisplayName,
  MENU_LINK_UNSAFE_FILTER,
  isUnsafeMenuLinkUrl,
  builtinDefaultModule
};
