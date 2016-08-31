import {noOfGridLayoutColumns} from 'dashboard-app/config/widgets-config'
const generateUUID = () => {
    let dateTime = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        dateTime += performance.now();
    }
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (str) => {
        let random = (dateTime + Math.random() * 16) % 16 | 0;
        dateTime = Math.floor(dateTime / 16);
        return (str == 'x' ? random : (random & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
const createLayoutForNewWidget = (newWidget, widgetsConf) => {
    //need to improve this algo
    let x = 0;
    let y = 25;
    let maxHeightWidget = _.max(widgetsConf, (widgetConf) => {
        return widgetConf.layout.h + widgetConf.layout.y
    })
    let maxWidthWidget = _.max(widgetsConf, (widgetConf) => {
        return widgetConf.layout.w + widgetConf.layout.x
    })
    if (maxHeightWidget && maxHeightWidget.layout && maxWidthWidget && maxWidthWidget.layout) {
        let availableWidth = noOfGridLayoutColumns - (maxWidthWidget.layout.w + maxWidthWidget.layout.x)
        if (availableWidth >= newWidget.layout.w) {
            x = maxWidthWidget.layout.x + maxWidthWidget.layout.w;
            y = maxHeightWidget.layout.y + maxHeightWidget.layout.h
        }
        else {
            x = 0;
            y = maxHeightWidget.layout.y + maxHeightWidget.layout.h
        }
    }
    //need to calculate x and y
    return {
        i: newWidget.id,
        x: x,
        y: y, // puts it at the bottom
        w: newWidget.layout.w,
        h: newWidget.layout.h,
        minW: newWidget.layout.minW,
        minH: newWidget.layout.minH
    }
}
export {generateUUID, createLayoutForNewWidget}