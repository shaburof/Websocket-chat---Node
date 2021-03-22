module.exports.getIp = (address) => {
    let ip = (address.match(/\d{0,3}\.\d{0,3}\.\d{0,3}\.\d{0,3}/));
    if (ip) return ip[0];
    return false;
};

const CSS_COLOR_NAMES = [
    "Azure",
    "Black",
    "Blue",
    "BlueViolet",
    "Brown",
    "Crimson",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGreen",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrchid",
    "DarkRed",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkViolet",
    "DeepPink",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "ForestGreen",
    "Fuchsia",
    "Green",
    "IndianRed",
    "Indigo",
    "Magenta",
    "Maroon",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSlateBlue",
    "MediumVioletRed",
    "MidnightBlue",
    "Navy",
    "OrangeRed",
    "Orchid",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RoyalBlue",
    "SaddleBrown",
    "SeaGreen",
    "Sienna",
    "SlateBlue",
    "SlateGrey",
    "SteelBlue",
    "Teal",
];

module.exports.getRandomColor = () => {
    let color = CSS_COLOR_NAMES[Math.floor(Math.random() * CSS_COLOR_NAMES.length)];

    return typeof color !== 'undefined' ? color : 'black';
}

module.exports.setStartDate = () => {
    let date = new Date();
    date.setHours(23, 59, 0, 0);
    return date;
}