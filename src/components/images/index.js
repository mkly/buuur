import './style.css';

import _ from 'lodash';
import { clearImages } from '../../js/imagesRepo';
import { actions } from '../../js/actions';

import getStore from '../../js/store';

export default function(imagesTmplId, imagesContainerId) {
  const imagesTmpl = _.template(document.getElementById(imagesTmplId).innerHTML);
  const imagesContainer = document.getElementById(imagesContainerId);
  
  return function() {
    const images = getStore().getState().images.map(obj => obj.image);
    imagesContainer.innerHTML = imagesTmpl({ images: images });
  }
}
