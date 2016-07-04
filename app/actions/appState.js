'use strict';

import { TYPES } from './types';

export const changeAppStateAttributeValues = (names,values) => {
  return {
    type: TYPES.CHANGE_APPSTATE_ATTRIBUTEVALUES,
    names,
    values
  };
}
