import React from 'react';
import {
  Rocket,
  CheckCircle2,
  LayoutDashboard,
  Cpu,
  Box,
  MessageSquare,
  Database,
  ShieldCheck,
  FileText,
  DollarSign,
  Clock,
  ArrowRight,
  XCircle,
  ChevronRight,
  ExternalLink,
  Github,
  Eraser,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  CheckCircle2,
  LayoutDashboard,
  Cpu,
  Box,
  MessageSquare,
  Database,
  ShieldCheck,
  FileText,
  DollarSign,
  Clock,
  ArrowRight,
  XCircle,
  ChevronRight,
  ExternalLink,
  Github,
  Eraser,
};

interface IconResolverProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const IconResolver: React.FC<IconResolverProps> = ({ name, size = 20, className, style }) => {
  const Icon = iconMap[name] || CheckCircle2;
  return <Icon size={size} className={className} style={style as any} />;
};

export default IconResolver;
