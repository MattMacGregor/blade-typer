const pause = (s = 1) => {
    return new Promise(resolve => setTimeout(resolve, 1000 * Number(s)));
}

const type = async (text, setter) => {

    let queue = text.split("");
    let building = "";
    while (queue.length) {
        let c = queue.shift();
        building += c;
        await setter(building)
        await pause(0.01);
    }

    return;
}

export {type};
