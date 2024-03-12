module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_DOMAIN_URL || 'https://www.typingmuscle.com',
  generateRobotsTxt: true, // (optional)
  exclude: ['/admin-panel/*', '/admin-panel', '/new-text', '/profile', '/stats'],
  // ...other options
};
