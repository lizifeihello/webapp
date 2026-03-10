"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestoreProvider = exports.FIRESTORE = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
exports.FIRESTORE = Symbol('FIRESTORE');
exports.firestoreProvider = {
    provide: exports.FIRESTORE,
    useFactory: () => {
        if ((0, app_1.getApps)().length === 0) {
            (0, app_1.initializeApp)({
                credential: (0, app_1.applicationDefault)(),
            });
        }
        return (0, firestore_1.getFirestore)();
    },
};
//# sourceMappingURL=firestore.provider.js.map