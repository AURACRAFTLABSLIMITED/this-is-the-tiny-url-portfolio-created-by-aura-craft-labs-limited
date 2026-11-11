/**
 * Frequently Asked Questions Data
 * Matches original questions and provides clear, beginner-friendly explanations.
 */

export const faqList = [
  {
    id: 'faq-1',
    question: 'What Is a URL Shortener?',
    answer: 'A URL shortener is a digital tool that converts a long, complicated web address (URL) into a concise, easily shareable link. When a visitor clicks the shortened link, they are instantly redirected to the original destination webpage. URL shorteners also allow you to track clicks, brand links with custom domains, and generate QR codes.',
  },
  {
    id: 'faq-2',
    question: 'How Does a URL Shortener Work?',
    answer: 'When you enter a long link into TinyURL, our server generates a unique alphanumeric key or custom alias associated with your original URL in our secure database. Whenever someone requests your TinyURL (for example, tinyurl.com/YourAlias), our server receives the request, looks up the destination address, and issues a standard HTTP 301 or 302 redirect in mere milliseconds.',
  },
  {
    id: 'faq-3',
    question: 'What Are Branded Domains and Custom Aliases?',
    answer: 'A custom alias is the phrase after the slash (such as tinyurl.com/SummerSale). A branded domain replaces "tinyurl.com" entirely with your company domain (such as brand.co/SummerSale). Branded domains increase click-through rates by up to 34% by establishing credibility, brand recognition, and audience trust.',
  },
  {
    id: 'faq-4',
    question: 'How Does TinyURL Analytics Work?',
    answer: 'TinyURL Analytics tracks clicks on every link in real time without compromising visitor privacy or capturing personally identifiable information. You can review total clicks, unique visitors, geographic heatmaps by country and city, referring platforms (social media, email, direct), device categories, and performance trends over days or months.',
  },
  {
    id: 'faq-5',
    question: 'Are TinyURL Links Permanent?',
    answer: 'Yes! Free TinyURL links created since 2002 never expire as long as they comply with our acceptable use and safety policies. Paid plan subscribers can also set custom expiration dates or update destination targets at any time if campaigns change.',
  },
  {
    id: 'faq-6',
    question: 'Can I Change the Destination of a Shortened URL?',
    answer: 'Yes, with TinyURL Pro and Bulk plans you can edit the destination URL of any active link without changing the short link or reprinting materials. This means printed flyers, billboard ads, and packaging with your short link will always route customers to your updated target page.',
  },
  {
    id: 'faq-7',
    question: 'What Security Features Does TinyURL Provide?',
    answer: 'TinyURL scans destinations using automated malware detection, phishing prevention engines, and SSL/TLS encryption. Paid plans also offer password protection, single sign-on (SSO), and role-based access control for marketing teams.',
  },
  {
    id: 'faq-8',
    question: 'How Does the Bulk URL Shortener Work?',
    answer: 'The Bulk Shortener allows you to shorten hundreds or thousands of long URLs simultaneously. You can simply upload a CSV spreadsheet containing your links and custom aliases, or connect directly through our REST API to automate high-speed link creation in your CRM or marketing stack.',
  },
];
