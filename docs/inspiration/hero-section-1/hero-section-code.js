"use client";

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Check, MessageSquare, BookOpen, Mic, Award, Sparkles, Smile, ArrowUpRight } from 'lucide-react';

const SkypeIcon = () => (
  <svg className="w-10 h-10" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="skype__a" x1="42.173%" x2="57.827%" y1=".584%" y2="99.416%">
        <stop offset="1%" stopColor="#00B7F0"/>
        <stop offset="34%" stopColor="#009DE5"/>
        <stop offset="76%" stopColor="#0082D9"/>
        <stop offset="100%" stopColor="#0078D4"/>
      </linearGradient>
      <linearGradient id="skype__b" x1="6.659%" x2="93.341%" y1="75%" y2="25%">
        <stop offset="0%" stopColor="#0078D4"/>
        <stop offset="37%" stopColor="#007AD5"/>
        <stop offset="57%" stopColor="#0082D9"/>
        <stop offset="74%" stopColor="#0090DF"/>
        <stop offset="88%" stopColor="#00A3E7"/>
        <stop offset="100%" stopColor="#00BCF2"/>
      </linearGradient>
      <linearGradient id="skype__f" x1="30.436%" x2="80.436%" y1="16.124%" y2="102.737%">
        <stop offset="0%" stopColor="#00B7F0"/>
        <stop offset="100%" stopColor="#007CC1"/>
      </linearGradient>
      <linearGradient id="skype__g" x1="45.636%" x2="54.364%" y1="99.815%" y2=".185%">
        <stop offset="0%" stopColor="#0078D4"/>
        <stop offset="100%" stopColor="#00BCF2"/>
      </linearGradient>
      <radialGradient id="skype__d" cx="48.539%" cy="50%" r="50.021%" fx="48.539%" fy="50%">
        <stop offset="0%"/>
        <stop offset="100%" stopOpacity="0"/>
      </radialGradient>
      <path id="skype__c" d="M179.903 104.187a75.715 75.715 0 0 0-38.567 10.55c19.535-32.94 11.499-75.273-18.749-98.764C92.34-7.52 49.337-4.827 22.255 22.255-4.826 49.336-7.519 92.34 15.973 122.587c23.491 30.248 65.823 38.284 98.765 18.749-17.49 29.642-12.843 67.344 11.322 91.852 24.166 24.508 61.798 29.685 91.684 12.613 29.886-17.071 44.542-52.118 35.705-85.382-8.836-33.265-38.95-56.418-73.37-56.409l-.176.177Z"/>
    </defs>
    <path fill="#FFF" d="M246.663 143.907c.746-5.228 1.13-10.5 1.153-15.782A119.868 119.868 0 0 0 127.948 8.258c-5.28.022-10.553.407-15.781 1.152C82.62-6.514 46.125-1.165 22.392 22.57-1.342 46.303-6.691 82.797 9.233 112.344c-.745 5.228-1.13 10.5-1.153 15.781 0 66.202 53.667 119.868 119.868 119.868 5.28-.022 10.554-.407 15.782-1.152 29.546 15.924 66.04 10.575 89.775-13.16 23.733-23.733 29.083-60.228 13.158-89.774Z"/>
    <circle cx="75.994" cy="76.171" r="75.893" fill="url(#skype__a)"/>
    <circle cx="179.903" cy="180.08" r="75.893" fill="url(#skype__b)"/>
    <mask id="skype__e" fill="#fff">
      <use href="#skype__c"/>
    </mask>
    <circle cx="125.547" cy="133.578" r="141.812" fill="url(#skype__d)" mask="url(#skype__e)"/>
    <circle cx="127.948" cy="128.125" r="119.868" fill="url(#skype__f)"/>
    <circle cx="127.948" cy="128.125" r="119.868" fill="url(#skype__g)"/>
    <path fill="#FFF" d="M84.239 113.408a34.755 34.755 0 0 1-4.078-17.2 31.12 31.12 0 0 1 7.27-20.746 44.33 44.33 0 0 1 18.973-12.59 73.144 73.144 0 0 1 24.736-4.167c5.521-.039 11.037.377 16.49 1.241a70.041 70.041 0 0 1 11.438 2.926 21.899 21.899 0 0 1 8.866 5.763 11.26 11.26 0 0 1 2.837 7.625 11.171 11.171 0 0 1-2.926 8.068 9.575 9.575 0 0 1-7.27 3.014 13.742 13.742 0 0 1-5.497-1.241c-4.176-1.85-8.471-3.42-12.856-4.7a46.458 46.458 0 0 0-12.5-1.506 29.258 29.258 0 0 0-15.605 3.9 12.944 12.944 0 0 0-6.206 11.704 11.703 11.703 0 0 0 3.192 8.156 29.79 29.79 0 0 0 8.866 6.295c3.635 1.773 8.866 4.167 16.313 7.182l2.305.886a111.356 111.356 0 0 1 20.126 10.107 40.783 40.783 0 0 1 12.501 12.767 33.602 33.602 0 0 1 4.522 17.732 35.464 35.464 0 0 1-6.295 21.367 36.705 36.705 0 0 1-17.732 12.945 73.499 73.499 0 0 1-26.155 4.255 82.365 82.365 0 0 1-35.464-6.738 20.037 20.037 0 0 1-7.358-5.674 13.476 13.476 0 0 1-2.305-7.802 9.93 9.93 0 0 1 3.103-7.89 11.348 11.348 0 0 1 8.068-2.838 21.19 21.19 0 0 1 9.486 2.394c3.635 1.773 6.472 3.192 8.866 4.078a40.163 40.163 0 0 0 7.359 2.305 39.454 39.454 0 0 0 9.487.976 25.18 25.18 0 0 0 15.958-4.256 13.83 13.83 0 0 0 5.408-11.614 12.501 12.501 0 0 0-3.369-8.866 37.858 37.858 0 0 0-9.93-7.27c-4.344-2.306-10.55-5.054-18.44-8.423a118.183 118.183 0 0 1-20.304-10.462c-4.796-3.19-8.977-6.727-11.88-11.703Z"/>
  </svg>
);

const SlackIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 2447.6 2452.5" xmlns="http://www.w3.org/2000/svg">
    <g clipRule="evenodd" fillRule="evenodd">
      <path d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z" fill="#36c5f0"/>
      <path d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z" fill="#2eb67d"/>
      <path d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z" fill="#ecb22e"/>
      <path d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0" fill="#e01e5a"/>
    </g>
  </svg>
);

const ZoomIcon = () => (
  <svg className="w-10 h-10" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="zoom__a" x1="23.666%" x2="76.334%" y1="95.6118%" y2="4.3882%">
        <stop offset=".00006%" stopColor="#0845BF"/>
        <stop offset="19.11%" stopColor="#0950DE"/>
        <stop offset="38.23%" stopColor="#0B59F6"/>
        <stop offset="50%" stopColor="#0B5CFF"/>
        <stop offset="67.32%" stopColor="#0E5EFE"/>
        <stop offset="77.74%" stopColor="#1665FC"/>
        <stop offset="86.33%" stopColor="#246FF9"/>
        <stop offset="93.88%" stopColor="#387FF4"/>
        <stop offset="100%" stopColor="#4F90EE"/>
      </linearGradient>
    </defs>
    <path fill="url(#zoom__a)" d="M256 128c0 13.568-1.024 27.136-3.328 40.192-6.912 43.264-41.216 77.568-84.48 84.48C155.136 254.976 141.568 256 128 256c-13.568 0-27.136-1.024-40.192-3.328-43.264-6.912-77.568-41.216-84.48-84.48C1.024 155.136 0 141.568 0 128c0-13.568 1.024-27.136 3.328-40.192 6.912-43.264 41.216-77.568 84.48-84.48C100.864 1.024 114.432 0 128 0c13.568 0 27.136 1.024 40.192 3.328 43.264 6.912 77.568 41.216 84.48 84.48C254.976 100.864 256 114.432 256 128Z"/>
    <path fill="#FFF" d="M204.032 207.872H75.008c-8.448 0-16.64-4.608-20.48-12.032-4.608-8.704-2.816-19.2 4.096-26.112l89.856-89.856H83.968c-17.664 0-32-14.336-32-32h118.784c8.448 0 16.64 4.608 20.48 12.032 4.608 8.704 2.816 19.2-4.096 26.112l-89.6 90.112h74.496c17.664 0 32 14.08 32 31.744Z"/>
  </svg>
);

const GoogleMeetIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 622 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#google_meet__clip0_5072_3775)">
      <path d="M351.419 255.568L411.978 324.79L493.418 376.827L507.584 256.005L493.418 137.908L410.418 183.621L351.419 255.568Z" fill="#00832D"/>
      <path d="M0.00283051 365.583V468.541C0.00283051 492.049 19.0851 511.136 42.5983 511.136H145.556L166.876 433.344L145.556 365.583L74.9198 344.263L0.00283051 365.583Z" fill="#0066DA"/>
      <path d="M145.556 -7.62939e-06L0.00283051 145.554L74.9247 166.822L145.556 145.554L166.488 78.7145L145.556 -7.62939e-06Z" fill="#E94235"/>
      <path d="M0.00526047 365.629H145.556V145.551H0.00526047V365.629Z" fill="#2684FC"/>
      <path d="M586.398 61.6293L493.416 137.91V376.827L586.782 453.404C600.758 464.352 621.204 454.374 621.204 436.607V78.0861C621.204 60.1224 600.271 50.193 586.396 61.6317" fill="#00AC47"/>
      <path d="M351.419 255.568V365.583H145.556V511.136H450.825C474.338 511.136 493.418 492.049 493.418 468.541V376.827L351.419 255.568Z" fill="#00AC47"/>
      <path d="M450.825 -7.62939e-06H145.556V145.554H351.419V255.568L493.42 137.905V42.5979C493.42 19.0847 474.338 0.00241891 450.825 0.00241891" fill="#FFBA00"/>
    </g>
    <defs>
      <clipPath id="google_meet__clip0_5072_3775">
        <rect width="621.2" height="512" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const TeamsIcon = () => (
  <svg className="w-10 h-10" fill="none" viewBox="4 4 36 38" xmlns="http://www.w3.org/2000/svg">
    <path fill="url(#microsoft_teams__a)" d="M22 20h12a6 6 0 0 1 6 6v10a6 6 0 0 1-12 0V26a6 6 0 0 0-6-6Z"/>
    <path fill="url(#microsoft_teams__b)" d="M8 24a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v12a6 6 0 0 0 6 6H18c-5.523 0-10-4.477-10-10v-8Z"/>
    <path fill="url(#microsoft_teams__c)" fillOpacity=".7" d="M8 24a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v12a6 6 0 0 0 6 6H18c-5.523 0-10-4.477-10-10v-8Z"/>
    <path fill="url(#microsoft_teams__d)" fillOpacity=".7" d="M8 24a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v12a6 6 0 0 0 6 6H18c-5.523 0-10-4.477-10-10v-8Z"/>
    <path fill="url(#microsoft_teams__e)" d="M33 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
    <path fill="url(#microsoft_teams__f)" fillOpacity=".46" d="M33 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
    <path fill="url(#microsoft_teams__g)" fillOpacity=".4" d="M33 18a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/>
    <path fill="url(#microsoft_teams__h)" d="M18 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
    <path fill="url(#microsoft_teams__i)" fillOpacity=".6" d="M18 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
    <path fill="url(#microsoft_teams__j)" fillOpacity=".5" d="M18 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"/>
    <rect width="16" height="16" x="4" y="23" fill="url(#microsoft_teams__k)" rx="3.25"/>
    <rect width="16" height="16" x="4" y="23" fill="url(#microsoft_teams__l)" fillOpacity=".7" rx="3.25"/>
    <path fill="#fff" d="M15.48 28.105h-2.448v7.466h-2.065v-7.466H8.52V26.43h6.96v1.676Z"/>
    <defs>
      <radialGradient id="microsoft_teams__a" cx="0" cy="0" r="1" gradientTransform="matrix(13.4784 0 0 33.2694 39.797 22.174)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A98AFF"/>
        <stop offset=".14" stopColor="#8C75FF"/>
        <stop offset=".565" stopColor="#5F50E2"/>
        <stop offset=".9" stopColor="#3C2CB8"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__b" cx="0" cy="0" r="1" gradientTransform="matrix(12.1875 30.39997 -30.74442 12.3256 8.812 16.4)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#85C2FF"/>
        <stop offset=".69" stopColor="#7588FF"/>
        <stop offset="1" stopColor="#6459FE"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__d" cx="0" cy="0" r="1" gradientTransform="rotate(113.326 8.093 17.645) scale(19.2186 15.4273)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#BD96FF"/>
        <stop offset=".687" stopColor="#BD96FF" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__e" cx="0" cy="0" r="1" gradientTransform="matrix(0 -10 12.6216 0 33 11.571)" gradientUnits="userSpaceOnUse">
        <stop offset=".268" stopColor="#6868F7"/>
        <stop offset="1" stopColor="#3923B1"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__f" cx="0" cy="0" r="1" gradientTransform="matrix(5.47024 4.59847 -6.65117 7.91208 28.867 10.544)" gradientUnits="userSpaceOnUse">
        <stop offset=".271" stopColor="#A1D3FF"/>
        <stop offset=".813" stopColor="#A1D3FF" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__g" cx="0" cy="0" r="1" gradientTransform="rotate(-41.658 32.118 -43.42) scale(8.51275 20.8824)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E3ACFD"/>
        <stop offset=".816" stopColor="#9FA2FF" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__h" cx="0" cy="0" r="1" gradientTransform="matrix(0 -12 15.146 0 18 8.286)" gradientUnits="userSpaceOnUse">
        <stop offset=".268" stopColor="#8282FF"/>
        <stop offset="1" stopColor="#3923B1"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__i" cx="0" cy="0" r="1" gradientTransform="rotate(40.052 -3.155 21.416) scale(8.57554 12.4035)" gradientUnits="userSpaceOnUse">
        <stop offset=".271" stopColor="#A1D3FF"/>
        <stop offset=".813" stopColor="#A1D3FF" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__j" cx="0" cy="0" r="1" gradientTransform="rotate(-41.658 20.382 -26.516) scale(10.2153 25.0589)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E3ACFD"/>
        <stop offset=".816" stopColor="#9FA2FF" stopOpacity="0"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__k" cx="0" cy="0" r="1" gradientTransform="rotate(45 -25.763 16.328) scale(22.6274)" gradientUnits="userSpaceOnUse">
        <stop offset=".047" stopColor="#688EFF"/>
        <stop offset=".947" stopColor="#230F94"/>
      </radialGradient>
      <radialGradient id="microsoft_teams__l" cx="0" cy="0" r="1" gradientTransform="matrix(0 11.2 -13.0702 0 12 32.6)" gradientUnits="userSpaceOnUse">
        <stop offset=".571" stopColor="#6965F6" stopOpacity="0"/>
        <stop offset="1" stopColor="#8F8FFF"/>
      </radialGradient>
      <linearGradient id="microsoft_teams__c" x1="20.594" x2="20.594" y1="18" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset=".801" stopColor="#6864F6" stopOpacity="0"/>
        <stop offset="1" stopColor="#5149DE"/>
      </linearGradient>
    </defs>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 360 362" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#25D366" fillRule="evenodd" d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z" clipRule="evenodd"/>
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 256 256" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="telegram__a" x1="50%" x2="50%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#2AABEE"/>
        <stop offset="100%" stopColor="#229ED9"/>
      </linearGradient>
    </defs>
    <path fill="url(#telegram__a)" d="M128 0C94.06 0 61.48 13.494 37.5 37.49A128.038 128.038 0 0 0 0 128c0 33.934 13.5 66.514 37.5 90.51C61.48 242.506 94.06 256 128 256s66.52-13.494 90.5-37.49c24-23.996 37.5-56.576 37.5-90.51 0-33.934-13.5-66.514-37.5-90.51C194.52 13.494 161.94 0 128 0Z"/>
    <path fill="#FFF" d="M57.94 126.648c37.32-16.256 62.2-26.974 74.64-32.152 35.56-14.786 42.94-17.354 47.76-17.441 1.06-.017 3.42.245 4.96 1.49 1.28 1.05 1.64 2.47 1.82 3.467.16.996.38 3.266.2 5.038-1.92 20.24-10.26 69.356-14.5 92.026-1.78 9.592-5.32 12.808-8.74 13.122-7.44.684-13.08-4.912-20.28-9.63-11.26-7.386-17.62-11.982-28.56-19.188-12.64-8.328-4.44-12.906 2.76-20.386 1.88-1.958 34.64-31.748 35.26-34.45.08-.338.16-1.598-.6-2.262-.74-.666-1.84-.438-2.64-.258-1.14.256-19.12 12.152-54 35.686-5.1 3.508-9.72 5.218-13.88 5.128-4.56-.098-13.36-2.584-19.9-4.708-8-2.606-14.38-3.984-13.82-8.41.28-2.304 3.46-4.662 9.52-7.072Z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 256 199" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">
    <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" fill="#5865F2"/>
  </svg>
);

const GoogleChatIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 96 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#google_chat__clip0_101_6)">
      <path d="M21.76 53.94V21.44H7.56C3.38 21.44 0 24.84 0 29.02V96.2C0 99.58 4.08 101.26 6.46 98.88L22.08 83.26H66.56C70.74 83.26 74.12 79.88 74.12 75.7V61.5H29.34C25.16 61.5 21.76 58.12 21.76 53.94Z" fill="#00AC47"/>
      <path d="M88.32 0H29.34C25.16 0 21.78 3.38 21.78 7.56V21.44H66.56C70.74 21.44 74.12 24.82 74.12 29V61.48H88.32C92.5 61.48 95.88 58.1 95.88 53.92V7.56C95.88 3.38 92.5 0 88.32 0Z" fill="#5BB974"/>
      <path d="M66.56 21.44H21.76V53.92C21.76 58.1 25.14 61.48 29.32 61.48H74.1V29.02C74.12 24.84 70.74 21.44 66.56 21.44Z" fill="#00832D"/>
    </g>
    <defs>
      <clipPath id="google_chat__clip0_101_6">
        <rect width="95.88" height="100" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const MessengerIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 256 256" preserveAspectRatio="xMidYMid" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="messenger__a" cx="19.247%" cy="99.465%" r="108.96%" fx="19.247%" fy="99.465%">
        <stop offset="0%" stopColor="#09F"/>
        <stop offset="60.975%" stopColor="#A033FF"/>
        <stop offset="93.482%" stopColor="#FF5280"/>
        <stop offset="100%" stopColor="#FF7061"/>
      </radialGradient>
    </defs>
    <path fill="url(#messenger__a)" d="M128 0C55.894 0 0 52.818 0 124.16c0 37.317 15.293 69.562 40.2 91.835 2.09 1.871 3.352 4.493 3.438 7.298l.697 22.77c.223 7.262 7.724 11.988 14.37 9.054L84.111 243.9a10.218 10.218 0 0 1 6.837-.501c11.675 3.21 24.1 4.92 37.052 4.92 72.106 0 128-52.818 128-124.16S200.106 0 128 0Z"/>
    <path fill="#FFF" d="m51.137 160.47 37.6-59.653c5.98-9.49 18.788-11.853 27.762-5.123l29.905 22.43a7.68 7.68 0 0 0 9.252-.027l40.388-30.652c5.39-4.091 12.428 2.36 8.82 8.085l-37.6 59.654c-5.981 9.489-18.79 11.852-27.763 5.122l-29.906-22.43a7.68 7.68 0 0 0-9.25.027l-40.39 30.652c-5.39 4.09-12.427-2.36-8.818-8.085Z"/>
  </svg>
);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 14,
    },
  },
};

export default function AIEnglishTutor() {
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'all' | 'grammar' | 'vocab' | 'pronunciation'>('all');

  // Exact 10 unique integrations shown in the original layout with no duplicates
  const integrations = [
    { name: 'Skype', icon: <SkypeIcon /> },
    { name: 'Slack', icon: <SlackIcon /> },
    { name: 'Zoom', icon: <ZoomIcon /> },
    { name: 'Google Meet', icon: <GoogleMeetIcon /> },
    { name: 'Teams', icon: <TeamsIcon /> },
    { name: 'WhatsApp', icon: <WhatsAppIcon /> },
    { name: 'Telegram', icon: <TelegramIcon /> },
    { name: 'Discord', icon: <DiscordIcon /> },
    { name: 'Google Chat', icon: <GoogleChatIcon /> },
    { name: 'Messenger', icon: <MessengerIcon /> }
  ];

  return (
    <>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      <div className="w-full bg-white flex flex-col items-center justify-center">
        
        {/* Container Wrapper (Limited to max 1440px width with top/bottom padding 120px, Bg White) */}
        <section className="w-full max-w-[1440px] px-4 md:px-6 py-16 md:py-[120px] flex flex-col items-center mx-auto my-auto relative bg-white">
          
          {/* Ambient Subtle Glows */}
          <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] bg-[#E6F8F2] rounded-full blur-[100px] opacity-30 pointer-events-none" />
          <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-[#00B782]/5 rounded-full blur-[120px] opacity-25 pointer-events-none" />

          {/* ==============================================
              Header Text Layout & Paragraph Text Group (Now at the top)
             ============================================== */}
          <div className="w-full flex flex-col items-center justify-center self-stretch z-10">
            
            {/* Header Typography Group */}
            <h2 
              id="features-heading"
              className="text-center tracking-normal text-[#1E332D] text-[32px] sm:text-[48px] md:text-[60px] lg:text-[74px] leading-[38px] sm:leading-[54px] md:leading-[68px] lg:leading-[76px]"
              style={{
                alignSelf: 'stretch',
                fontFamily: 'Syne, sans-serif',
                fontStyle: 'normal',
                fontWeight: 500
              }}
            >
              Get AI feedback on<br /> your <span className="text-[#00B782]">real-life</span> calls
            </h2>
            
            {/* Paragraph Typography Group */}
            <p 
              id="features-paragraph"
              className="text-center mt-6 text-[#6F6F6F] text-sm sm:text-base md:text-[18px] leading-relaxed"
              style={{
                width: '100%',
                maxWidth: '499px',
                fontFamily: 'Inter, sans-serif',
                fontStyle: 'normal',
                fontWeight: 400
              }}
            >
              Connect Fluently to your online calls to fix mistakes in your grammar, pronunciation, and vocabulary.
            </p>

          </div>

          {/* ==============================================
              Aesthetic Interactive Device Showcase Section (Now below the header text)
             ============================================== */}
          <div className="w-full max-w-5xl mt-8 md:mt-[60px] mb-2 relative flex items-center justify-center px-2">
            <motion.div
              initial={{ opacity: 0, y: 120 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
              className="w-full flex items-center justify-center"
            >
              <img 
                src="https://cdn.jiro.build/Learn.AI/Image/show%20app.png" 
                alt="AI English Tutoring Interface" 
                className="w-full h-auto max-h-[620px] object-contain select-none hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* ==============================================
              Platforms Integrations Badge Row (Bottom Layout)
             ============================================== */}
          <div className="w-full flex flex-col items-center justify-center mt-6 md:mt-0">
            
            {/* Badge Row Container - styled beautifully as a unified horizontal box card matching the attachment exactly */}
            <motion.div 
              id="integrations-container" 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="w-full max-w-5xl bg-white border border-[#EBEBEB] py-5 px-3 md:py-7 md:px-8 rounded-[18px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-x-1 gap-y-6 md:gap-x-2 transition-all"
            >
              {integrations.map((app, index) => (
                <motion.div 
                  key={`${app.name}-${index}`}
                  variants={childVariants}
                  id={`integration-${app.name.toLowerCase().replace(' ', '-')}-${index}`}
                  className="flex flex-col items-center justify-center group cursor-pointer"
                >
                  {/* Custom Card/Icon Bubble */}
                  <div className="w-14 h-14 bg-white border border-[#EAEAEA] rounded-[18px] flex items-center justify-center transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.015)] group-hover:scale-108 group-hover:border-[#00B782]/35 group-hover:shadow-[0_8px_20px_rgba(0,183,130,0.08)]">
                    <div className="scale-90 flex items-center justify-center">
                      {app.icon}
                    </div>
                  </div>
                  {/* Platform Label */}
                  <span className="mt-3 text-[10px] font-bold text-[#8F8D8D] group-hover:text-[#00B782] transition-colors uppercase tracking-wider text-center font-sans">
                    {app.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Supports Affirmation text */}
            <div id="affirmation-badge" className="mt-10 flex items-center justify-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B782] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00B782]"></span>
              </span>
              <span className="text-[16px] font-normal text-[#1E332D] font-inter tracking-wide">
                Fluently supports every meeting platform
              </span>
            </div>

          </div>

        </section>
        
      </div>
    </>
  );
}