const detectGesture = (landmarks) => {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const palmBase = landmarks[0];
    const indexBase = landmarks[5];
    const middleBase = landmarks[9];
    const ringBase = landmarks[13];
    const pinkyBase = landmarks[17];

    // Peace sign (✌️)
    const indexUp = indexTip.y < indexBase.y - 0.1;
    const middleUp = middleTip.y < middleBase.y - 0.1;
    const ringDown = ringTip.y > ringBase.y - 0.05;
    const pinkyDown = pinkyTip.y > pinkyBase.y - 0.05;

    if (indexUp && middleUp && ringDown && pinkyDown) {
    return 'peace';
    }

    // Thumbs up (👍)
    const thumbUp = thumbTip.y < palmBase.y - 0.1;
    const fingersDown = 
    indexTip.y > indexBase.y &&
    middleTip.y > middleBase.y &&
    ringTip.y > ringBase.y &&
    pinkyTip.y > pinkyBase.y;

    if (thumbUp && fingersDown) {
    return 'thumbsUp';
    }

    // Open palm (✋)
    const allFingersUp = 
    indexTip.y < indexBase.y - 0.05 &&
    middleTip.y < middleBase.y - 0.05 &&
    ringTip.y < ringBase.y - 0.05 &&
    pinkyTip.y < pinkyBase.y - 0.05;

    if (allFingersUp) {
    return 'openPalm';
    }

    // Fist (✊)
    const allFingersDown = 
    indexTip.y > indexBase.y &&
    middleTip.y > middleBase.y &&
    ringTip.y > ringBase.y &&
    pinkyTip.y > pinkyBase.y &&
    Math.abs(thumbTip.x - indexBase.x) < 0.1;

    if (allFingersDown) {
    return 'fist';
    }

    return 'none';
};

export default detectGesture;