import updateStratification from './onPreprocess/updateStratification';
import highlightSelectedOptions from './onPreprocess/highlightSelectedOptions';
import updateRangeBand from './onPreprocess/updateRangeBand';

export default function onPreprocess() {
    highlightSelectedOptions.call(this);
    updateStratification.call(this);
    updateRangeBand.call(this);
}
