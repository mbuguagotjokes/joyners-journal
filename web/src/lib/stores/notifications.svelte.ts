import { writable } from "svelte/store";

let id = 0;

export const notifications = writable<{id: number, type: string, message: string}[]>([]);

export function sendLocalNotification(type: string, message: string, timeout: number = 5000) {
    if (message.length == 0) return; 
    notifications.update((notification) => [...notification, {id: id, type: type, message: message}]);
    id++;
    setTimeout(() => {
        notifications.update((notification) => {
            notification.shift()
            return notification
        });
    }, timeout);
}

export function clearNotificationX(id: number) {
    notifications.update((notification) => notification.filter(n => n.id != id));
}

export function sendBrowserNotification(title: string, message: string, icon = "", image = "") {
    const options = {
        body: message,
        icon: icon,
        image: image
    }
    if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            const notification = new Notification(title + " - LMV", options);
        }
    });
  }
}