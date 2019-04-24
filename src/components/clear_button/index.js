import './style.css';

import _ from 'lodash';
import { clearImages } from '../../js/imagesRepo';
import actions from '../../js/actions';

import getStore from '../../js/store';

import fontawesome from '@fortawesome/fontawesome';
import faEraser from '@fortawesome/fontawesome-free-solid/faEraser';
import faImages from '@fortawesome/fontawesome-free-solid/faImages';
fontawesome.library.add(faEraser);
fontawesome.library.add(faImages);

export default function(clearButtonTmplId, clearButtonContainerId) {
  const clearBtnTmpl = _.template(document.getElementById(clearButtonTmplId).innerHTML);
  const clearBtnContainer = document.getElementById(clearButtonContainerId);

  return function() {
    if (getStore().getState().images.images.length < 1) {
      clearBtnContainer.innerHTML = '';
      return;
    }
    clearBtnContainer.innerHTML = clearBtnTmpl();
    const clearBtn = document.getElementById('clear-button');
    if (clearBtn) {
      clearBtn.appendChild(fontawesome.icon(faImages).node[0]);
      clearBtn.appendChild(fontawesome.icon(faEraser).node[0]);
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
