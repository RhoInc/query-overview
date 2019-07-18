import removeHeaderlessColumns from './onInit/removeHeaderlessColumns';
import applyVariableMetadata from './onInit/applyVariableMetadata';

export default function onInit() {
    removeHeaderlessColumns.call(this);
    applyVariableMetadata.call(this);
}
