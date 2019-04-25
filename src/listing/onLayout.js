import addResetButton from './onLayout/addResetButton';
import addTableContainer from './onLayout/addTableContainer';

export default function onLayout() {
    addResetButton.call(this);
    addTableContainer.call(this);
}
