import actions from '../../js/actions';
import getStore from '../../js/store';

export default function(roomFormId, roomFormInputId) {
  const roomForm = document.getElementById(roomFormId);
  const roomFormInput = document.getElementById(roomFormInputId);

  roomForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const store = getStore();
    store.dispatch(actions.creators.setRoom(roomFormInput.value));
    store.dispatch(actions.creators.setView('image-booth'));
  });
}
