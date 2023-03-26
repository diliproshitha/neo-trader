
(function run() {
    const getTradeInfo = (positionWindow, type) => {
        let position = {};
        position.type = type;
        position.instrument = getInstrument();
        position.entryPrice = getPrice(positionWindow, `Risk/Reward${type.toLowerCase()}EntryPrice`);
        position.takeProfitPrice = getPrice(positionWindow, `Risk/Reward${type.toLowerCase()}ProfitLevelPrice`);
        position.stopLossPrice = getPrice(positionWindow, `Risk/Reward${type.toLowerCase()}StopLevelPrice`);
        return position;
    }

    const getPrice = (positionWindow, elementDataPropertyId) => {
        let entryPriceInputList = positionWindow.querySelectorAll(`[data-property-id="${elementDataPropertyId}"]`)
        return entryPriceInputList.length > 0 ? entryPriceInputList[0].value : null;
    }

    const getInstrument = () => {
        return document.title.split(" ")[0];
    }

    const getPosition = () => {
        let longPositionWindowList = document.body.querySelectorAll('[data-dialog-name="Long Position"]');
        let shortPositionWindowList = document.body.querySelectorAll('[data-dialog-name="Short Position"]');

        let position = null;
        if (longPositionWindowList.length > 0) {
            position = getTradeInfo(longPositionWindowList[0], "LONG");
        } else if (shortPositionWindowList.length > 0) {
            position = getTradeInfo(shortPositionWindowList[0], "SHORT");
        }
        return position;
    }

    return getPosition();
})();
