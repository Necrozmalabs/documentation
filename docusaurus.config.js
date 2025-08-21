// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ORL Documentation',
  tagline: 'Research is cool!',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://documentation.necrozmalabs.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'necrozmalabs', // Usually your GitHub org/user name.
  projectName: 'documentation',
  deploymentBranch: "gh-pages", // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Open Research Laboratory Documentation',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'right',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'right'},
          {
            href: 'https://openresearchlaboratory.necrozmalabs.com',
            label: 'Visit ORL',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Welcome',
                to: '/docs/welcome',
              },
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'Guides',
                to: '/docs/category/guides',
              },
              {
                label: 'Tutorials',
                href: '/docs/category/tutorials',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub Forum',
                href: 'https://github.com/orgs/Necrozmalabs/discussions',
              },
            ],
          },

          {
            title: 'Open Research Laboratory',
            items: [
              {
                label: 'Visit ORL',
                href: 'https://openresearchlaboratory.necrozmalabs.com',
              },
              {
                label: 'Experiments',
                href: 'https://openresearchlaboratory.necrozmalabs.com/experiment',
              },
              {
                label: 'Workflows',
                href: 'https://openresearchlaboratory.necrozmalabs.com/workflow',
              },
            ],
          },
          
          {
            title: 'Necrozma Labs',
            items: [
              {
                label: 'Visit Necrozma Labs',
                href: 'https://www.necrozmalabs.com',
              },
              {
                label: 'LinkedIN',
                href: 'https://www.linkedin.com/company/necrozmalabs',
              },
              {
                label: 'X',
                href: 'https://x.com/Necrozmalabs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Open Research Laboratory`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
      defaultMode: 'dark',       // dark theme on first load
      disableSwitch: false,      // allow toggle (set to true if you want to force dark only)
      respectPrefersColorScheme: false, // ignore OS/browser theme
    },
    }),
};

export default config;
