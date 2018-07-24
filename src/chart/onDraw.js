import setLeftMargin from './onDraw/setLeftMargin';
import setYDomain from './onDraw/setYDomain';
import setChartHeight from './onDraw/setChartHeight';

export default function onDraw() {
    setLeftMargin.call(this);
    setYDomain.call(this);
    setChartHeight.call(this);
}
