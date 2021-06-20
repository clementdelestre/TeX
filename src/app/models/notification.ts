export interface AppNotification {
    title: string;
    body: string;
    type: AppNotificationType;
}

export enum AppNotificationType {
    error,
    success
}