
export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface StatItem {
  label: string;
  value: string;
  color: string;
}

export interface NavItem {
  id: string;
  icon: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
