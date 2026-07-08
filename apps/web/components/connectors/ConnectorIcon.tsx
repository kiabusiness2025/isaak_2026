import {
  Receipt,
  Landmark,
  FileText,
  Mail,
  CalendarDays,
  Building2,
  BellRing,
  ShieldCheck,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';

const CONNECTOR_ICONS: Record<string, LucideIcon> = {
  programas: Receipt,
  bancos: Landmark,
  documentos: FileText,
  correo: Mail,
  calendario: CalendarDays,
  sedes: Building2,
  notificaciones: BellRing,
  certificado: ShieldCheck,
  mensajeria: MessageCircle,
};

type ConnectorIconProps = {
  categoryId: string;
  className?: string;
};

export function ConnectorIcon({ categoryId, className }: ConnectorIconProps) {
  const Icon = CONNECTOR_ICONS[categoryId] ?? FileText;
  return <Icon className={className} aria-hidden="true" />;
}
