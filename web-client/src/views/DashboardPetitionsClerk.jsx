import React from 'react';

import { ErrorNotification } from './ErrorNotification';
import { SuccessNotification } from './SuccessNotification';
import { WorkQueue } from './WorkQueue';

export const DashboardPetitionsClerk = () => (
  <section className="usa-section usa-grid">
    <SuccessNotification />
    <ErrorNotification />
    <WorkQueue />
  </section>
);
