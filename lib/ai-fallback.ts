export interface DemoAnalysis {
  insight: string;
  nodes: string[];
  risk: number;
}

function hashSeed(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function generateDemoAnalysis(input: string): DemoAnalysis {
  const topic = input.trim() || 'your operation';
  const lower = topic.toLowerCase();
  const seed = hashSeed(lower);

  let nodes = [
    'Workflow orchestration & follow-up automation',
    'Offline-first data capture and sync',
    'Operator dashboards for daily decisions',
  ];

  if (/(clinic|health|medical|hospital|patient)/.test(lower)) {
    nodes = [
      'Patient intake and appointment routing',
      'Low-bandwidth record sync between sites',
      'Staff assist for triage and follow-up messaging',
    ];
  } else if (/(real estate|property|listing|agent)/.test(lower)) {
    nodes = [
      'Lead response and nurture sequences',
      'Listing content and market brief generation',
      'CRM-to-inbox workflow automation',
    ];
  } else if (/(retail|shop|ecommerce|store)/.test(lower)) {
    nodes = [
      'Inventory-aware customer reply automation',
      'Order status and support ticket routing',
      'Campaign content tied to stock and seasonality',
    ];
  } else if (/(logistics|shipping|warehouse|supply)/.test(lower)) {
    nodes = [
      'Dispatch exception detection and alerts',
      'Route and handoff documentation automation',
      'Edge capture for scans in low-connectivity yards',
    ];
  } else if (/(saas|software|startup|scale)/.test(lower)) {
    nodes = [
      'Onboarding and support copilot for operators',
      'Usage-to-expansion signal detection',
      'Internal ops runbooks turned into automations',
    ];
  }

  const insight = `For "${topic}", the highest-leverage move is not a bigger model — it is wiring AI into the moments your team already repeats daily. Peculiar AI would prioritize ${nodes[0].toLowerCase()} first, then layer ${nodes[1].toLowerCase()} so gains hold up in constrained connectivity environments.`;

  return {
    insight,
    nodes,
    risk: 18 + (seed % 35),
  };
}

export function generateReadinessSnapshot(businessType: string, goals: string): string {
  const type = businessType.trim() || 'your work';
  const goal = goals.trim() || 'saving time with AI';

  return `Here's a practical starting path for ${type}:

1. Quick win this week — Pick one repetitive part of "${goal}" and automate just that step (e.g. draft replies, summarize notes, or tag incoming requests). Test it for 3 days before expanding.

2. Bigger opportunity — Connect that win to your main workflow (email, CRM, or spreadsheets) so the handoff is automatic instead of copy-paste.

3. Next step — Document what currently takes the most time, then book a call with Peculiar AI Labs for a tailored implementation plan: https://calendly.com/peculiarai`;
}