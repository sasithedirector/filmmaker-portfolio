/// <reference types="vite/client" />
declare module '*.css';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.mp4';
declare module '*.webm';

// EmailJS global loaded via CDN in index.html
declare const emailjs: {
  init(key: string): void;
  send(serviceId: string, templateId: string, templateParams: Record<string, string>): Promise<string>;
};
