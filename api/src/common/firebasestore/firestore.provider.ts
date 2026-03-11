import { Provider } from '@nestjs/common';
import { applicationDefault, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

export const FIRESTORE = Symbol('FIRESTORE');

export const firestoreProvider: Provider = {
  provide: FIRESTORE,
  useFactory: () => {
    if (getApps().length === 0) {
      initializeApp({
        credential: applicationDefault(), // ✅ Cloud Run 上用 ADC；本地也可用 gcloud ADC→GCP認証
      });
    }
    return getFirestore();
  },
};