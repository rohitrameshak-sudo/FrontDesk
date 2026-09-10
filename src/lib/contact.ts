export const BUSINESS_EMAIL = "rohit@get-front-desk.com";
export const MAIL_LINK = `mailto:${BUSINESS_EMAIL}?subject=FrontDesk%20enquiry&body=${encodeURIComponent("Hey, I'd love to know more about FrontDesk.")}`;
export const WHATSAPP_LINK = "https://wa.me/918660569516?text=Hey,%20i'd%20love%20to%20know%20more%20about%20FrontDesk";
export function enquiryLink() { return "#contact-options"; }
