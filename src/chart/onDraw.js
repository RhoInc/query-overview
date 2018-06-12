import setYDomain from './onDraw/setYDomain';
import setChartHeight from './onDraw/setChartHeight';

export default function onDraw() {
    setYDomain.call(this);
    setChartHeight.call(this);
}
