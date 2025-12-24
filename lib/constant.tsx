// /lib/constant.ts

//
// 1) Base typed structures
//

export type Language = "en" | "ar";

export const HERO_ROTATE_EN = [
  "faster.",
  "safer.",
  "smarter.",
  "smoother.",
] as const;

export const HERO_ROTATE_AR = [
  "أسرع.",
  "أكثر أماناً.",
  "أذكى.",
  "أريح.",
] as const;

export type HeroRotateEn = typeof HERO_ROTATE_EN[number];
export type HeroRotateAr = typeof HERO_ROTATE_AR[number];

//
// 2) Main Landing Schema
//

export interface LandingLanguageBlock {
  brand: string;
  heroPrefix: string;
  heroRotate: readonly string[];

  tagline: string;
  region: string;

  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };

  contact: {
    email: string;
    phone: string;
    askUs: string;
    phonePlaceholder: string;
    sendLabel: string;
  };

  downloads: {
    passenger: {
      title: string;
      android: string;
      ios: string;
      gallery: string;
    };
    driver: {
      title: string;
      android: string;
      ios: string;
      gallery: string;
    };
  };

  legal: {
    terms: string;
    privacy: string;
    termsLabel: string;
    privacyLabel: string;
  };

  footer: {
    brandDescription: string;
    email: string;
    linkedin: string;
    instagram:string;
    facebook:string;
    terms: string;
    privacy: string;
  };

  roadmap: {
    steps: {
      installed: string;
      driver_found: string;
      in_progress: string;
      arrived: string;
    };
  };
}

//
// 3) Type-safe LANDING object
//

export const LANDING: Record<Language, LandingLanguageBlock> = {
  en: {
    brand: "Carna",
    heroPrefix: "Make it",
    heroRotate: [...HERO_ROTATE_EN],

    tagline:
      "Find nearby drivers, place your bid, and start your ride instantly.",
    region: "Designed for the Middle East market.",

    social: {
      facebook: "https://facebook.com/carna",
      instagram: "https://instagram.com/carna",
      linkedin: "https://linkedin.com/company/carna",
    },

    contact: {
      email: "info@carnaapp.com",
      phone: "+963 991 870 618",
      askUs: "Send us your phone number and our team will contact you shortly.",
      phonePlaceholder: "Enter your phone number",
      sendLabel: "Send",
    },

    downloads: {
      passenger: {
        title: "Passenger App",
        android:
          "https://play.google.com/store/apps/details?id=carna.passenger",
        ios: "https://apps.apple.com/app/carna-passenger",
        gallery: "https://appgallery.huawei.com/#/app/CARNA_PASSENGER",
      },
      driver: {
        title: "Driver App",
        android: "https://play.google.com/store/apps/details?id=carna.driver",
        ios: "https://apps.apple.com/app/carna-driver",
        gallery: "https://appgallery.huawei.com/#/app/CARNA_DRIVER",
      },
    },

    legal: {
      terms: "/terms",
      privacy: "/privacy-policy",
      termsLabel: "Terms & Conditions",
      privacyLabel: "Privacy Policy",
    },

    footer: {
      brandDescription: "Reliable and easy rides.",
      email: "Email",
      linkedin: "LinkedIn",
      instagram: "Imstagram",
      facebook: "Facebook",
    
      terms: "Terms & Conditions",
      privacy: "Privacy Policy",
    },

    roadmap: {
      steps: {
        installed: "App Installed",
        driver_found: "Driver Found",
        in_progress: "Trip in Progress",
        arrived: "Arrived",
      },
    },
  },

  ar: {
    brand: "Carna",
    heroPrefix: "خلّيها",
    heroRotate: [...HERO_ROTATE_AR],

    tagline: "ابحث عن أقرب سائق… قدم سعرك… وابدأ رحلتك فوراً.",
    region: "مصممة خصيصاً لأسواق الشرق الأوسط.",

    social: {
      facebook: "https://facebook.com/carna",
      instagram: "https://instagram.com/carna",
      linkedin: "https://linkedin.com/company/carna",
    },

    contact: {
      email: "info@carnaapp.com",
      phone: "+963 991 870 618",
      askUs: "أرسل رقم هاتفك وسنتواصل معك مباشرة.",
      phonePlaceholder: "أدخل رقم هاتفك",
      sendLabel: "إرسال",
    },

    downloads: {
      passenger: {
        title: "تطبيق الراكب",
        android:
          "https://play.google.com/store/apps/details?id=carna.passenger",
        ios: "https://apps.apple.com/app/carna-passenger",
        gallery: "https://appgallery.huawei.com/#/app/CARNA_PASSENGER",
      },
      driver: {
        title: "تطبيق السائق",
        android: "https://play.google.com/store/apps/details?id=carna.driver",
        ios: "https://apps.apple.com/app/carna-driver",
        gallery: "https://appgallery.huawei.com/#/app/CARNA_DRIVER",
      },
    },

    legal: {
      terms: "/terms",
      privacy: "/privacy-policy",
      termsLabel: "الشروط والأحكام",
      privacyLabel: "سياسة الخصوصية",
    },

    footer: {
      brandDescription: "خدمة نقل موثوقة وسهلة.",
      email: "البريد الإلكتروني",
      linkedin: "لينكدإن",
      instagram: "انستغرام",
      facebook: "فيسبوك",
    
      terms: "الشروط والأحكام",
      privacy: "سياسة الخصوصية",
    },

    roadmap: {
      steps: {
        installed: "تم تثبيت التطبيق",
        driver_found: "تم العثور على سائق",
        in_progress: "الرحلة قيد التنفيذ",
        arrived: "وصلت لوجهتك",
      },
    },
  },
} as const;

//
// 4) Store Labels (full type safety)
//

export const STORE_LABELS: Record<
  Language,
  {
    apple: string;
    google: string;
    gallery: string;
  }
> = {
  en: {
    apple: "Download on the App Store",
    google: "Get it on Google Play",
    gallery: "Explore it on AppGallery",
  },
  ar: {
    apple: "حمّل من App Store",
    google: "حمّل من Google Play",
    gallery: "حمّل من AppGallery",
  },
} as const;





 export const PRIVACY_AR = `
آخر تحديث: 2025

توضح سياسة الخصوصية هذه كيفية قيام شركة Carna بجمع بياناتك الشخصية واستخدامها وتخزينها وحمايتها عند استخدام خدمات النقل والتوصيل والمزايدة عبر المنصة.

يُعد استخدامك للمنصة إقراراً منك بالاطلاع على هذه السياسة والموافقة على جميع أحكامها.

1. التعريفات
تشير Carna إلى الشركة المالكة والمشغلة للمنصة.
تشير المنصة إلى تطبيقات Carna والموقع الإلكتروني وجميع الأنظمة المرتبطة بها.
يشير المستخدم إلى أي شخص يقوم بإنشاء حساب أو استخدام المنصة.
يشير السائق أو الكابتن أو السفير إلى مقدم خدمة مستقل يقدم خدمات النقل أو التوصيل عبر المنصة.
تشير البيانات الشخصية إلى أي معلومات يمكن من خلالها تحديد هوية الشخص بشكل مباشر أو غير مباشر.

2. نطاق سياسة الخصوصية
تنطبق هذه السياسة على جميع المستخدمين وتشمل إنشاء الحساب، استخدام التطبيق، معالجة الطلبات، المزايدة بين السائقين والركاب، المدفوعات، التحقق من الهوية، الاتصالات داخل التطبيق، وأذونات الجهاز أو الموقع.

3. البيانات التي يتم جمعها
قد تجمع Carna البيانات التي يقدمها المستخدم مباشرة، مثل الاسم الكامل، رقم الهاتف، البريد الإلكتروني، صورة الملف الشخصي، معلومات المركبة للسائقين، مستندات الهوية، رخصة القيادة، ومستندات التحقق من الهوية.

كما قد يتم جمع بيانات تلقائية تشمل معلومات الجهاز، عنوان بروتوكول الإنترنت، سجلات الاستخدام، بيانات الموقع، سجل الرحلات، نشاط المزايدة، وبيانات الأداء.

وقد يتم جمع بيانات المعاملات، بما في ذلك تفاصيل الرحلات، الأسعار، وسائل الدفع، وتواريخ وأوقات المعاملات.

4. استخدام البيانات
تُستخدم البيانات الشخصية لتقديم الخدمات وتشغيل المنصة، والتحقق من الهوية، وتنفيذ عمليات المطابقة والمزايدة، ومعالجة المدفوعات، وتعزيز الأمان، ومنع الاحتيال، وتحسين أداء المنصة، والتواصل مع المستخدمين لأغراض خدمية. ويخضع التسويق لموافقة المستخدم.

5. مشاركة البيانات
قد تتم مشاركة البيانات بين السائق والراكب حسب متطلبات تنفيذ الخدمة. كما قد تتم مشاركة البيانات مع مزودي خدمات خارجيين، أو مع الجهات الحكومية عند الطلب القانوني، أو لأغراض الأمن ومنع الاحتيال.

6. حماية البيانات
تلتزم Carna بتطبيق إجراءات تقنية وتنظيمية لحماية البيانات الشخصية، بما في ذلك التشفير، والتخزين الآمن، وتقييد الوصول، وحماية الخوادم.

7. حقوق المستخدم
يحق للمستخدمين الوصول إلى بياناتهم الشخصية وتعديلها، حذف صورة الملف الشخصي، تعطيل أذونات الموقع، إيقاف الرسائل التسويقية، وطلب حذف الحساب، مع الالتزام بالمتطلبات القانونية للاحتفاظ بالبيانات.

8. الاحتفاظ بالبيانات
يتم الاحتفاظ بالبيانات الشخصية طوال مدة الحساب، وقد يتم الاحتفاظ بها بعد حذف الحساب إذا تطلب القانون ذلك.

9. تحديثات السياسة
يجوز لـ Carna تعديل سياسة الخصوصية في أي وقت. ويُعد الاستمرار في استخدام المنصة موافقة على السياسة المحدثة.
`;

export const PRIVACY_EN = `
Last Updated: 2025

This Privacy Policy explains how Carna collects, uses, stores, and protects personal data when using the transportation, delivery, and bidding services available on the Platform.

By using the Platform, you confirm that you have read and accepted this Privacy Policy.

1. Definitions
Carna refers to the company that owns and operates the Platform.
Platform refers to the Carna mobile applications, website, and all related systems.
User refers to any individual who registers or uses the Platform.
Driver, Captain, or Ambassador refers to an independent service provider offering transportation or delivery services through the Platform.
Personal Data refers to any information that identifies an individual directly or indirectly.

2. Scope of This Policy
This Policy applies to all users and covers account creation, application usage, request processing, bidding between drivers and passengers, payments, identity verification, in-app communication, and device or location permissions.

3. Data Collected
Carna may collect personal data provided directly by users, including full name, phone number, email address, profile photo, vehicle information for drivers, identity documents, driving licenses, and KYC documentation.

Carna may also collect data automatically, including device information, IP address, usage logs, location data, trip history, bidding activity, and performance data.

Transaction-related data may be collected, including trip details, prices, payment methods, and transaction timestamps.

4. Use of Data
Personal data is used to provide and operate services, verify identity, facilitate matching and bidding, process payments, enhance safety, prevent fraud, improve Platform performance, and communicate with users regarding service-related matters. Marketing communications are optional and subject to user consent.

5. Data Sharing
Personal data may be shared between drivers and passengers as required to complete services. Data may also be shared with third-party service providers, governmental authorities when legally required, or for security and fraud prevention purposes.

6. Data Protection
Carna applies technical and organizational measures to protect personal data, including encryption, secure storage, access controls, and server protection.

7. User Rights
Users have the right to access and update their personal data, remove profile images, disable location access, opt out of marketing communications, and request account deletion, subject to legal retention requirements.

8. Data Retention
Personal data is retained for the duration of the user account and may be retained after account deletion where required by applicable laws.

9. Updates to This Policy
Carna may update this Privacy Policy at any time. Continued use of the Platform constitutes acceptance of the updated Policy.
`;

  
  // --------------------------------------
  // TERMS (ARABIC & ENGLISH)
  // --------------------------------------
  
 export const TERMS_EN = `
Last Updated: 2025

Please read these Terms and Conditions carefully before using the Carna platform.
By accessing or using the Platform, you agree to be bound by these Terms.

1. Definitions
Carna refers to the company operating the platform.
Platform refers to the Carna website and mobile applications.
User refers to any person using the Platform.
Passenger refers to a user requesting transportation services.
Driver refers to a user offering transportation services.
Services refer to features provided through the Platform.
Bid refers to a proposed price for a trip.

2. Scope
These Terms govern the use of the Platform, including user rights and obligations, bidding, payments, conduct, and account suspension.

3. Eligibility
Users must be at least 18 years old or the legal age in their country.
Users must provide accurate and truthful information.
Fake or duplicate accounts are prohibited.

4. Role of Carna
Carna acts solely as a technology intermediary.
Carna does not provide transportation services and is not a transportation provider.

5. Bidding System
Passengers may propose a price for a trip.
Drivers may accept the price or submit a counteroffer.
A trip is confirmed only when both Passenger and Driver accept the same final price inside the Platform.
The bid price may change through the bidding system until both parties agree.
Agreements made outside the Platform are not recognized by Carna.

6. Trips
The Platform facilitates trip matching, cancellations, and expected user behavior.

7. Payments
Payments may be made in cash or through available digital methods.
The final price is confirmed only after acceptance by both Passenger and Driver inside the Platform.
Carna is not responsible for payments or disputes arising from transactions conducted outside the Platform.

8. Ratings
Users may rate each other to support safety, quality, and behavior evaluation.

9. Account Suspension
Carna may suspend or terminate accounts for fraud, misuse, manipulation, or repeated violations of these Terms.

10. Liability
Carna is not responsible for damages, delays, user behavior, or outcomes related to trips or bidding.

11. Privacy
Use of the Platform is subject to the Privacy Policy.

12. Updates
Carna may update these Terms at any time.
Continued use of the Platform constitutes acceptance of the updated Terms.

13. Governing Law
These Terms are governed by applicable local laws.
Disputes may be resolved through arbitration where permitted.
`;

export const TERMS_AR = `
آخر تحديث: 2025

يرجى قراءة هذه الشروط والأحكام بعناية قبل استخدام منصة Carna.
يُعد استخدامك للمنصة موافقة كاملة وملزمة على هذه الشروط.

1. التعريفات
تشير Carna إلى الشركة المشغلة للمنصة.
تشير المنصة إلى موقع وتطبيقات Carna.
يشير المستخدم إلى أي شخص يستخدم المنصة.
يشير الراكب إلى المستخدم الذي يطلب خدمة النقل.
يشير السائق إلى المستخدم الذي يقدم خدمة النقل.
تشير الخدمات إلى الميزات المقدمة عبر المنصة.
تشير المزايدة إلى السعر المقترح للرحلة.

2. النطاق
تنظم هذه الشروط استخدام المنصة، بما في ذلك حقوق والتزامات المستخدمين، وآلية المزايدة، والدفع، والسلوك، وإيقاف الحسابات.

3. الأهلية
يجب أن لا يقل عمر المستخدم عن 18 عاماً أو سن البلوغ القانوني في بلده.
يجب تقديم معلومات صحيحة ودقيقة.
يُمنع إنشاء حسابات مزيفة أو مكررة.

4. دور Carna
تعمل Carna كوسيط تقني فقط.
لا تقدم Carna خدمات النقل ولا تُعد مزوداً لها.

5. نظام المزايدة
يمكن للراكب اقتراح سعر للرحلة.
يمكن للسائق قبول السعر أو تقديم عرض مضاد.
لا يتم اعتماد الرحلة إلا بعد موافقة الطرفين على نفس السعر داخل المنصة.
قد يتغير السعر قبل موافقة الطرفين ضمن نظام المزايدة.
لا تُعترف بأي اتفاقات تتم خارج المنصة.

6. الرحلات
تسهل المنصة آلية المطابقة بين السائقين والركاب وتنظم الإلغاء والسلوكيات المتوقعة.

7. الدفع
قد يتم الدفع نقداً أو إلكترونياً حسب توفر وسائل الدفع.
لا يتم اعتماد السعر النهائي إلا بعد موافقة السائق والراكب داخل المنصة.
لا تتحمل Carna أي مسؤولية عن المدفوعات أو النزاعات الناتجة عن معاملات تمت خارج المنصة.

8. التقييمات
يتم استخدام التقييمات لتحسين السلامة وجودة الخدمة والسلوك.

9. إيقاف الحساب
يجوز لـ Carna إيقاف أو إنهاء الحساب في حال الاحتيال أو سوء الاستخدام أو التلاعب أو تكرار المخالفات.

10. المسؤولية
لا تتحمل Carna مسؤولية الأضرار أو التأخير أو سلوك المستخدمين أو نتائج الرحلات أو المزايدات.

11. الخصوصية
يخضع استخدام المنصة لسياسة الخصوصية.

12. التعديلات
يجوز لـ Carna تعديل هذه الشروط في أي وقت.
يُعد استمرار استخدام المنصة موافقة على الشروط المعدلة.

13. النزاعات
تخضع هذه الشروط للقوانين المحلية المعمول بها.
يمكن حل النزاعات عن طريق التحكيم حيثما يسمح القانون.
`;
