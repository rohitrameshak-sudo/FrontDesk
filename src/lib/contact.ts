export const BUSINESS_EMAIL = "rohit@get-front-desk.com";
export function enquiryLink(topic = "A FrontDesk walkthrough") {
  const body = `Hi Rohit,\n\nI'd like to learn about ${topic.toLowerCase()} for my properties.\n\nProperty type:\nNumber of units:\nWhat I'd like help with:\n\nMy name:\nPreferred time to connect:\n`;
  return `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
}
