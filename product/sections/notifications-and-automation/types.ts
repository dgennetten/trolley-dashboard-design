// Notifications & Automation — TypeScript interfaces

export interface NotificationScheduleItem {
  label: string;
  timing: string;
}

export interface NotificationType {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
  schedule: NotificationScheduleItem[];
  supportsManualTrigger: boolean;
  lastTriggered: string | null;
}

export type DeliveryStatus = "sent" | "delivered" | "failed";

export interface NotificationLogEntry {
  id: string;
  typeId: string;
  typeName: string;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  sentAt: string;
  status: DeliveryStatus;
}

export interface MemberRecipient {
  id: string;
  name: string;
  email: string;
  paymentStatus: "current" | "past_due" | "expiring_soon";
}

export interface NotificationsConfigProps {
  notificationTypes: NotificationType[];
  memberRecipients: MemberRecipient[];
  onToggle: (typeId: string, enabled: boolean) => void;
  onSendManualReminder: (memberIds: string[]) => void;
}

export interface NotificationsLogProps {
  log: NotificationLogEntry[];
  notificationTypes: NotificationType[];
}

export interface NotificationsPageProps {
  notificationTypes: NotificationType[];
  log: NotificationLogEntry[];
  memberRecipients: MemberRecipient[];
  onToggle: (typeId: string, enabled: boolean) => void;
  onSendManualReminder: (memberIds: string[]) => void;
}
