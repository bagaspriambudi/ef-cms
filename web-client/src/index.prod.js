import '@babel/polyfill';

import app from './app';
import applicationContext from './applicationContext';

/**
 * Initializes the app with prod environment context
 */
app.initialize(applicationContext);
