import { AdoptionApplication, Pet } from '../types';

const FAVORITES_KEY = 'pawhaven_favorites';
const APPLICATIONS_KEY = 'pawhaven_applications';

export function getStoredFavorites(): string[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse favorites from localStorage', e);
    return [];
  }
}

export function saveStoredFavorites(ids: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save favorites to localStorage', e);
  }
}

export function getStoredApplications(): AdoptionApplication[] {
  try {
    const data = localStorage.getItem(APPLICATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse applications from localStorage', e);
    return [];
  }
}

export function saveStoredApplication(app: AdoptionApplication): AdoptionApplication[] {
  try {
    const existing = getStoredApplications();
    const updated = [app, ...existing];
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save application to localStorage', e);
    return [];
  }
}
