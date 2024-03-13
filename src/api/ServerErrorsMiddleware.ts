/* eslint-disable import/prefer-default-export */
import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import * as Sentry from '@sentry/nextjs';
// import { appGlobalSettingsActions } from '../store/slices/appGlobalSettings';
// import { NotificationServerFailure } from '../utils/notificationsObjects';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = (_api: MiddlewareAPI) => (next) => (action: any) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    if (action.payload.status.toString().startsWith('5')) {
      // ? Available levels are "fatal", "critical", "error", "warning", "log", "info", and "debug".
      // * Show a notification if the server responds with a 5xx error but not 500 because the server throws 500 when data couldn't be created
      // if (action.payload.status.toString() !== '500') {
      //   api.dispatch(appGlobalSettingsActions.setActiveNotification(NotificationServerFailure));
      // }
      Sentry.captureMessage(`Server Error: ${JSON.stringify(action.payload, null, 4)}`, 'error');
    }
  }
  return next(action);
};
