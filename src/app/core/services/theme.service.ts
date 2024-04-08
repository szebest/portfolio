import { Injectable, effect, signal } from '@angular/core';

import { Theme } from '@models';

const THEME_LOCAL_STORAGE_KEY = 'theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal<Theme | undefined>(undefined);

  constructor() {
    if (typeof window !== 'undefined') {
      effect(
        () => {
          const themeValue = this.theme();
          if (themeValue === undefined) {
            const localStorageValue = window.localStorage.getItem(
              THEME_LOCAL_STORAGE_KEY
            ) as Theme | undefined;

            this.theme.set(localStorageValue ?? this.getUsersPreferredTheme());

            return;
          }

          window.localStorage.setItem(THEME_LOCAL_STORAGE_KEY, themeValue);

          document.body.dataset['theme'] = themeValue;
        },
        { allowSignalWrites: true }
      );
    }
  }

  toggleTheme() {
    this.theme.update((x) => (x === 'light' ? 'dark' : 'light'));
  }

  private getUsersPreferredTheme(): Theme {
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: light)').matches)
        return 'light';
    }

    return 'dark';
  }
}
