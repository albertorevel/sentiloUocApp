import { InjectionToken } from '@angular/core';

export interface ApplicationProperties {
    language: string;
    providerId: string,
    providerToken: string,
    providerToken2: string,
    url: string
}

export const MY_CONFIG: ApplicationProperties = {
    language: 'ca',
    providerId: 'uoc@arevelproveidor',
    providerToken: '8de83e2f39505b22c237b92093c7ed01e671f01b479d6706d7cc68b2b3a82bf2',
    providerToken2: '81d0e9c5d1b0dcc9ee9a15333774da126744ca3ee80c1254d58375f73d1b4095',
    url: 'https://api-sentilo.diba.cat/'
}

export const CONFIG_TOKEN = new InjectionToken<ApplicationProperties>('config');