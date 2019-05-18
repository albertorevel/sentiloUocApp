import { InjectionToken } from '@angular/core';

export interface ApplicationProperties {
    language: string;
    url: string
}

export const MY_CONFIG: ApplicationProperties = {
    language: 'ca',
    url: 'https://api-sentilo.diba.cat/'
}

export const CONFIG_TOKEN = new InjectionToken<ApplicationProperties>('config');