import {Toast} from 'native-base';
export function showError(error) {
  Toast.show({
    text: error.message,
    buttonText: 'Okay',
    position: 'center',
    type: 'danger',
    duration: 2000,
  });
}

export function showErrorNumber(error) {
  Toast.show({
    text: 'just a number, please.',
    buttonText: 'Okay',
    position: 'center',
    type: 'danger',
    duration: 2000,
  });
}
