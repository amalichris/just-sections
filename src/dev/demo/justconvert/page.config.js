// Dev-only snapshot of JustConvert's page config, for exercising sections
// against real content. The live version lives in
// `justconvert/web/src/pages/justconvert/page.config.js` and is the source of
// truth — this copy will drift, which is fine; see `DemoPage.jsx`.
import heroImage from './assets/hero-image.webp'
import heroBackground from './assets/hero-bg-airplane-window-warm.webp'
import appStoreBadge from './assets/appstore-badge.svg'

// Responsive UI fragments: the main benefit has all three art-directed
// viewport crops; each secondary reuses its mobile crop at tablet width because
// no tablet-specific source was supplied.
import benefitCurrencyDesktop from './assets/main-desktop.webp'
import benefitCurrencyMobile from './assets/main-mobile.webp'
import benefitCurrencyTablet from './assets/main-tablet.webp'
import benefitTimeDesktop from './assets/secondary-1-desktop.webp'
import benefitTimeMobile from './assets/secondary-1-mobile.webp'
import benefitUnitsDesktop from './assets/secondary-2-desktop.webp'
import benefitUnitsMobile from './assets/secondary-2-mobile.webp'
import { PRODUCT_NAME, APP_STORE_URL, APP_STORE_BADGE_ALT } from './chrome'

const appStoreCta = {
  label: 'Download on the App Store',
  href: APP_STORE_URL,
  target: '_blank',
  badge: { src: appStoreBadge, alt: APP_STORE_BADGE_ALT, width: 120, height: 40 },
}

export default {
  sections: [
    {
      type: 'header-default',
      slot: 'header',
      props: {
        brand: { label: PRODUCT_NAME, href: '#top' },
        navigation: [
          { label: 'The App', targetId: 'app-features' },
          { label: 'FAQ', targetId: 'faq' },
        ],
        cta: appStoreCta,
      },
    },
    {
      type: 'hero-default',
      id: 'top',
      props: {
        title: 'Currency, time zones, and units. One app.',
        subtitle: 'Your currencies, your places, your units - set up once and ready when you need them.',
        background: { src: heroBackground, alt: '', width: 1672, height: 941 },
        media: {
          src: heroImage,
          alt: 'JustConvert showing the currency converter and world time screens',
          width: 1280,
          height: 1401,
        },
      },
    },
    {
      type: 'benefits-default',
      id: 'app-features',
      props: {
        eyebrow: '',
        title: 'Everything you need to convert.',
        subtitle:
          '',
        items: [
          {
            id: 'currency',
            title: 'Currency conversion /n 120 currencies. One amount, all your currencies.',
            description:
              'Add the currencies you use daily and see every conversion at once. Rates refresh daily and stay available offline.',
            media: {
              src: benefitCurrencyDesktop,
              alt: 'JustConvert currency conversion interface',
              width: 2085,
              height: 1935,
            },
            mediaSources: {
              mobile: benefitCurrencyMobile,
              tablet: benefitCurrencyTablet,
              desktop: benefitCurrencyDesktop,
            },
          },
          {
            id: 'time',
            title: 'World time /n Your places, side by side.',
            description:
              'Add the cities that matter to you, compare local times, and move through the day to find the right time across time zones.',
            media: {
              src: benefitTimeDesktop,
              alt: 'JustConvert world time interface',
              width: 951,
              height: 594,
            },
            mediaSources: {
              mobile: benefitTimeMobile,
              tablet: benefitTimeMobile,
              desktop: benefitTimeDesktop,
            },
          },
          {
            id: 'units',
            title: "Everyday units /n The conversions you actually use.",
            description:
              'Convert weight, distance, temperature, area, and speed - instantly and entirely on-device.',
            media: {
              src: benefitUnitsDesktop,
              alt: 'JustConvert everyday units interface',
              width: 951,
              height: 594,
            },
            mediaSources: {
              mobile: benefitUnitsMobile,
              tablet: benefitUnitsMobile,
              desktop: benefitUnitsDesktop,
            },
          },
        ],
      },
    },
    {
      type: 'pricing-banner-default',
      id: 'pricing',
      props: {
        eyebrow: '',
        title: 'Made to do one job well.',
        subtitle: 'No ads. No accounts. No tracking.',
        cta: appStoreCta,
      },
    },
    {
      type: 'faq-default',
      id: 'faq',
      props: {
        title: 'Questions answered',
        items: [
          {
            id: 'what-is-justconvert',
            question: 'What is JustConvert?',
            answer:
              'JustConvert is an iPhone app for currency, time, and everyday unit conversion.\n\nConvert prices, compare times across cities, and convert weight, distance, temperature, area, and speed.',
          },
          {
            id: 'supported-currencies',
            question: 'Which currencies are supported?',
            answer:
              'JustConvert supports 120 currencies. Search by name, currency code, or alias, then keep the ones you use most close at hand.',
          },
          {
            id: 'supported-cities-and-time-zones',
            question: 'Which cities and time zones are supported?',
            answer:
              'JustConvert includes 588 cities across time zones. Search by city, country, country code, or supported abbreviation, then save the cities you use. Time conversion works offline.',
          },
          {
            id: 'offline',
            question: 'Can I use it without an internet connection?',
            answer:
              'Yes. Weight, distance, temperature, area, speed, and time conversion work offline.\n\nCurrency rates need a connection to refresh, then stay cached on your iPhone for 24 hours. If a refresh fails, the last available rates can still be used.',
          },
          {
            id: 'rate-updates',
            question: 'How often do the currency rates update?',
            answer:
              'Once a day. JustConvert is for everyday conversions, not trading. The rates are reference rates, so your bank or exchange may use a different rate.',
          },
          {
            id: 'payment-options',
            question: 'What are my payment options?',
            answer:
              'Choose between Monthly, Yearly or Lifetime. Every plan includes all seven converters. Monthly and Yearly renew through Apple. Lifetime is one-time purchase.',
          },
          {
            id: 'paid-access',
            question: 'Why do I have to pay before I can use it?',
            answer:
              'JustConvert is paid access so it can stay calm, minimal, and distraction-free. It does the job you opened it for: convert currency, time, and everyday units.\n\nYou pay for the product. No ads. No personalized advertising profile. No engagement prompts.',
          },
          {
            id: 'data',
            question: 'What happens to my data?',
            answer:
              'We respect your privacy. We do not track you or build a personalized advertising profile. We only collect anonymized usage data to improve the app. Read the [Privacy Policy](/privacy) for the full detail.',
          },
          {
            id: 'permissions',
            question: 'Do I need to sign up or give JustConvert access to my phone?',
            answer:
              'No sign-up or account needed. JustConvert does not ask for access to your camera, location, contacts, photos, microphone, or notifications. It uses the internet to refresh currency rates, check a purchase, and send limited usage data to improve the app.',
          },
          {
            id: 'restore-purchase',
            question: 'I bought JustConvert. How do I restore it on a new iPhone?',
            answer:
              'Open JustConvert and choose Restore on the paywall. Use the same Apple account you used for the purchase.',
          },
          {
            id: 'refund',
            question: 'I want a refund. What do I do?',
            answer:
              'Apple handles JustConvert refunds. Request one at [reportaproblem.apple.com](https://reportaproblem.apple.com/).',
          },
          {
            id: 'feature-request',
            question: 'I need a currency or feature. Can I ask?',
            answer:
              'Yes. Email us at [hello@getjustconvert.com](mailto:hello@getjustconvert.com?subject=New%20feature%20request) and tell us what you need.',
          },
        ],
      },
    },
    {
      type: 'footer-default',
      slot: 'footer',
      props: {
        productName: PRODUCT_NAME,
        privacyHref: '/privacy',
        termsHref: '/terms',
        surface: 'parchment',
      },
    },
  ],
}
