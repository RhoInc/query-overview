import setLeftMargin from './onDraw/setLeftMargin';
import setXDomain from './onDraw/setXDomain';
import setYDomain from './onDraw/setYDomain';
import setChartHeight from './onDraw/setChartHeight';
import updateXAxisLabel from './onDraw/updateXAxisLabel';
import resetYAxisTickLabels from './onDraw/resetYAxisTickLabels';
import updateYAxisLabel from './onDraw/updateYAxisLabel';

export default function onDraw() {
    setLeftMargin.call(this);
    setXDomain.call(this);
    setYDomain.call(this);
    setChartHeight.call(this);
    updateXAxisLabel.call(this);
    resetYAxisTickLabels.call(this);
    updateYAxisLabel.call(this);
}
