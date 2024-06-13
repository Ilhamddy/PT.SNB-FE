
const getColorCSS = (color) => {
    let newValue = color.replace(" ", "");
    if (newValue.indexOf(",") === -1) {
        let color = getComputedStyle(document.documentElement).getPropertyValue(newValue);

        if (color.indexOf("#") !== -1)
            color = color.replace(" ", "");
        if (color) return color;
        else return newValue;
    } else {
        let val = color.split(',');
        if (val.length === 2) {
            let rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
            rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
            return rgbaColor;
        } else {
            return newValue;
        }
    }
};

export default getColorCSS;