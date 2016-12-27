import './style.css';

import _ from 'lodash';
import { clearImages } from '../../js/api';
import actions from '../../js/actions';

import getStore from '../../js/store';

export default function(clearButtonTmplId, clearButtonContainerId) {
  const clearBtnTmpl = _.template(document.getElementById(clearButtonTmplId).innerHTML);
  const clearBtnContainer = document.getElementById(clearButtonContainerId);

  return function() {
    if (getStore().getState().images.length < 1) {
      clearBtnContainer.innerHTML = '';
      return;
    }
    clearBtnContainer.innerHTML = clearBtnTmpl();
    const clearBtn = document.getElementById('clear-button');
    if (clearBtn) {
      clearBtn.onclick = getClearBtnClickHandler(clearBtn, getStore());
    }
  };
}

function getClearBtnClickHandler (clearBtn, store) {
  return function() {
    clearBtn.disabled = true;
    store.dispatch(actions.creators.clearImages());
    clearImages(store);
  }
}
