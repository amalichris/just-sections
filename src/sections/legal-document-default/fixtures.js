const DOC = `# Acme - Terms of Service

**Effective Date: 4 July 2026**
**Last Updated: 23 July 2026**
**Version: 1.3**

## 1. Introduction

Welcome to Acme. These Terms of Service ("Terms") govern your access to and use of Acme (the "Service"). By using the Service, you agree to be bound by these Terms and by our [Privacy Policy](privacy-policy.md), which is incorporated here by reference.

If you do not agree to these Terms, do not use the Service.

## 2. Eligibility

You must be at least 18 years old to use the Service. By using it, you confirm that you are at least 18 and have the legal capacity to enter into these Terms.

### 2.1 Professional use

The Service is intended for professional use. It is not directed at, or intended for use by, children.

## 3. Your Responsibilities

You are responsible for:

- The accuracy of the information you enter
- Keeping your access credentials secure
- Reviewing every generated document before relying on it

## 4. Contact

For security notices and general enquiries, contact us at [hello@example.com](mailto:hello@example.com). For data-rights requests, see section 10 of the [Privacy Policy](privacy-policy.md#data-rights).

Our published guidance is available at [example.com/legal](https://example.com/legal).
`

const DOC_WITH_TABLES = `# Acme - Privacy Policy

**Effective Date: 4 July 2026**
**Version: 2.1**

## 1. Data We Process

The table below describes each category of personal data we process. See the [Terms of Service](terms-of-service.md) for the contractual basis.

| Category | Examples | Purpose | Retention |
| --- | --- | --- | --- |
| Account data | Name, email address | Authenticating you and providing the Service | Until account deletion |
| Document content | Names, addresses, dates, amounts entered into a contract | Generating the document you requested | 24 months from last access |
| Technical data | IP address, device type, timestamps | Security, abuse prevention, diagnostics | 12 months |

## 2. Legal Bases

| Processing | Legal basis |
| --- | --- |
| Providing the Service | Performance of a contract |
| Security and abuse prevention | Legitimate interests |
| Marketing communications | Consent |

## 3. Your Rights

You may request access, correction, or deletion of your personal data by contacting [privacy@example.com](mailto:privacy@example.com).
`

/**
 * Gallery fixtures for `legal-document-default`.
 *
 * Content is deliberately shaped like the output of the
 * `terms-and-privacy-consultant` skill: an `#` heading, then effective date,
 * last-updated date, and version as bold paragraphs, then numbered sections
 * with plain relative cross-links.
 */
export default [
  {
    id: 'default',
    label: 'Default (terms)',
    note: 'Cross-links to privacy-policy.md must resolve to /privacy. The two mailto addresses must render as plain text — selectable, not clickable. The external link opens in a new tab.',
    props: {
      content: DOC,
    },
  },
  {
    id: 'tables',
    label: 'With GFM tables',
    note: 'JustConvert’s privacy policy carries 38 tables, so this is a primary path. Tables must scroll inside their own container and never push the page into horizontal scroll — check at 375.',
    props: {
      content: DOC_WITH_TABLES,
    },
  },
  {
    id: 'ivory',
    label: 'Ivory surface',
    note: 'The `surface` variant. Measure and typography are unchanged; only the page background differs.',
    props: {
      content: DOC,
      surface: 'ivory',
    },
  },
  {
    id: 'custom-routes',
    label: 'Custom internal routes',
    note: 'An `internalLinks` override. Links to privacy-policy.md should now resolve to /legal/privacy rather than the default /privacy.',
    props: {
      content: DOC,
      internalLinks: {
        'privacy-policy.md': '/legal/privacy',
        'terms-of-service.md': '/legal/terms',
      },
    },
  },
  {
    id: 'missing-required',
    label: 'Missing required prop',
    note: 'No `content`. An empty string counts as missing, so a legal page whose document failed to load renders nothing rather than an empty shell.',
    expectsNothing: true,
    props: {
      content: '',
    },
  },
]
