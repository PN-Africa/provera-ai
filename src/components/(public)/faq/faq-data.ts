export type FAQItem = {
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  title: string;
  items: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    title: "Getting started",
    items: [
      {
        question: "What is Provera AI?",
        answer:
          "Provera AI helps your team review transaction data, identify unusual activity, and understand the indicators behind each flag. Review the evidence before making a decision.",
      },
      {
        question: "Can I try it without uploading my own data?",
        answer:
          "Yes. Choose Explore sample data on the landing page to view synthetic transactions and sample results. The sample does not contain real customer activity.",
      },
    ],
  },
  {
    id: "uploading-data",
    title: "Uploading data",
    items: [
      {
        question: "What should my CSV include?",
        answer:
          "Include transaction_id, amount, currency, date_time, and transaction_type. Customer ID, location, and payment method add context. Download the template from the upload screen.",
      },
      {
        question: "What happens if my file has validation errors?",
        answer:
          "Review the validation messages, correct the affected records, and upload your CSV again. Analysis starts after validation passes. The upload screen shows current file limits.",
      },
    ],
  },
  {
    id: "risk-signals",
    title: "Risk signals",
    items: [
      {
        question: "Does a flagged transaction mean fraud?",
        answer:
          "No. A flag highlights a transaction that needs closer review. Inspect the transaction details and detection explanation before deciding your next action.",
      },
      {
        question: "How can I understand why a transaction was flagged?",
        answer:
          "Open the transaction details to see the indicators that were triggered, such as a high amount, unusual frequency, or a deviation from earlier activity. Historical comparisons need sufficient earlier records.",
      },
    ],
  },
  {
    id: "account-access",
    title: "Account & access",
    items: [
      {
        question: "How do I create an account and join a workspace?",
        answer:
          "Sign up with your work email and a password, then request access to your team workspace. An administrator reviews your request and assigns the appropriate permissions.",
      },
      {
        question: "Who manages permissions and detection settings?",
        answer:
          "Authorized administrators manage workspace permissions and available detection settings. Speak with your workspace administrator if you need access or want to request a change.",
      },
    ],
  },
];
