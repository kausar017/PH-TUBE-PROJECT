function getTimeString(time) {
    const hour = parseInt(time/3600);
    let secend = time%3600;
    let minit = parseInt(secend/60);
    secend = secend % 60;
    return `${hour} hour ${minit} minit ${secend} secend ago`;
}
console.log(getTimeString(6546));
