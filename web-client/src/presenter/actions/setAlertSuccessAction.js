import { state } from 'cerebral';

/**
 * sets the state.alertSuccess based on the props.alertSuccess passed in
 *
 * @param {Object} providers the providers object
 * @param {Object} providers.store the cerebral store used for setting the state.alertSuccess
 * @param {Object} providers.props the cerebral props object used for passing the props.alertSuccess
 */
export const setAlertSuccessAction = ({ props, store }) => {
  store.set(state.alertSuccess, props.alertSuccess);
};
