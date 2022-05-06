/*
  TWEENS
  Copy/paste this script in the script property of the layer
*/

var introTime = 1;
var introDatas = [0, 0, 0];
var introTween = easeOutQuint;

var endTime = 1;
var endDatas = [0, 0, 0];
var endTween = easeInQuint;

var dontStop = false;
var relative = false;

/*
  List of transitions:

    easeNone
    easeInQuad
    easeInOutQuad
    easeInCubic
    easeOutCubic
    easeInOutCubic
    easeOutInCubic
    easeInQuart
    easeOutQuart
    easeInOutQuart
    easeOutInQuart
    easeOutQuart
    easeInQuint
    easeOutQuint
    easeInOutQuint
    easeOutInQuint
    easeInSine
    easeOutSine
    easeInOutSine
    easeOutInSine
    easeInExpo
    easeOutExpo
    easeInOutExpo
    easeOutInExpo
    easeInCirc
    easeOutCirc
    easeInOutCirc
    easeOutInCirc
    easeInElastic
    easeOutElastic
    easeInOutElastic
    easeOutInElastic
    easeInCushion
    easeOutCushion
    easeInOutCushion
    easeInBack
    easeOutBack
    easeInOutBack
    easeOutInBack
    easeInBounce
    easeOutBounce
    easeInOutBounce
    easeOutInBounce

  
  Parameters of transitions:

    t - current time of tween
    b - starting value of property
    c - change needed in value
    d - total duration of tween
*/

/*
  FUNCTIONS
*/

function easeNone(t, b, c, d) {
  return (c * t) / d + b;
}
function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
}
function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}
function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
}
function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}
function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}
function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t + 2) + b;
}
function easeOutInCubic(t, b, c, d) {
  if (t < d / 2) return easeOutCubic(t * 2, b, c / 2, d);
  return easeInCubic(t * 2 - d, b + c / 2, c / 2, d);
}
function easeInQuart(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
}
function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}
function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
  return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
}
function easeOutInQuart(t, b, c, d) {
  if (t < d / 2) return easeOutQuart(t * 2, b, c / 2, d);
  return easeInQuart(t * 2 - d, b + c / 2, c / 2, d);
}
function easeInQuint(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
}
function easeOutQuint(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}
function easeInOutQuint(t, b, c, d) {
  if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
  return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
}
function easeOutInQuint(t, b, c, d) {
  if (t < d / 2) return easeOutQuint(t * 2, b, c / 2, d);
  return easeInQuint(t * 2 - d, b + c / 2, c / 2, d);
}
function easeInSine(t, b, c, d) {
  return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
}
function easeOutSine(t, b, c, d) {
  return c * Math.sin((t / d) * (Math.PI / 2)) + b;
}
function easeInOutSine(t, b, c, d) {
  return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
}
function easeOutInSine(t, b, c, d) {
  if (t < d / 2) return easeOutSine(t * 2, b, c / 2, d);
  return easeInSine(t * 2 - d, b + c / 2, c / 2, d);
}
function easeInExpo(t, b, c, d) {
  return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b - c * 0.001;
}
function easeOutExpo(t, b, c, d) {
  return t == d ? b + c : c * 1.001 * (-Math.pow(2, (-10 * t) / d) + 1) + b;
}
function easeInOutExpo(t, b, c, d) {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1)
    return (c / 2) * Math.pow(2, 10 * (t - 1)) + b - c * 0.0005;
  return (c / 2) * 1.0005 * (-Math.pow(2, -10 * --t) + 2) + b;
}
function easeOutInExpo(t, b, c, d) {
  if (t < d / 2) return easeOutExpo(t * 2, b, c / 2, d);
  return easeInExpo(t * 2 - d, b + c / 2, c / 2, d);
}
function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}
function easeOutCirc(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
}
function easeInOutCirc(t, b, c, d) {
  if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
  return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}
function easeOutInCirc(t, b, c, d) {
  if (t < d / 2) return easeOutCirc(t * 2, b, c / 2, d);
  return easeInCirc(t * 2 - d, b + c / 2, c / 2, d);
}
function easeInElastic(t, b, c, d, a, p) {
  var s;
  if (t == 0) return b;
  if ((t /= d) == 1) return b + c;
  if (!p) p = d * 0.3;
  if (!a || a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  return (
    -(
      a *
      Math.pow(2, 10 * (t -= 1)) *
      Math.sin(((t * d - s) * (2 * Math.PI)) / p)
    ) + b
  );
}
function easeOutElastic(t, b, c, d, a, p) {
  var s;
  if (t == 0) return b;
  if ((t /= d) == 1) return b + c;
  if (!p) p = d * 0.3;
  if (!a || a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  return (
    a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
    c +
    b
  );
}
function easeInOutElastic(t, b, c, d, a, p) {
  var s;
  if (t == 0) return b;
  if ((t /= d / 2) == 2) return b + c;
  if (!p) p = d * (0.3 * 1.5);
  if (!a || a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  if (t < 1)
    return (
      -0.5 *
        (a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
      b
    );
  return (
    a *
      Math.pow(2, -10 * (t -= 1)) *
      Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
      0.5 +
    c +
    b
  );
}
function easeOutInElastic(t, b, c, d, a, p) {
  if (t < d / 2) return easeOutElastic(t * 2, b, c / 2, d, a, p);
  return easeInElastic(t * 2 - d, b + c / 2, c / 2, d, a, p);
}
function easeInCushion(t, b, c, d, a, p) {
  var s;
  if (t == 0) return b;
  if ((t /= d) == 1) return b + c;
  if (!p) p = d * 0.7;
  if (!a || a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  return (
    -(
      a *
      Math.pow(2, 10 * (t -= 1)) *
      Math.sin(((t * d - s) * (2 * Math.PI)) / p)
    ) + b
  );
}
function easeOutCushion(t, b, c, d, a, p) {
  var s;
  if (t == 0) return b;
  if ((t /= d) == 1) return b + c;
  if (!p) p = d * 0.7;
  if (!a || a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  return (
    a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
    c +
    b
  );
}
function easeInOutCushion(t, b, c, d, a, p) {
  var s;
  if (t == 0) return b;
  if ((t /= d / 2) == 2) return b + c;
  if (!p) p = d * (0.7 * 1.5);
  if (!a || a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = (p / (2 * Math.PI)) * Math.asin(c / a);
  if (t < 1)
    return (
      -0.5 *
        (a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
      b
    );
  return (
    a *
      Math.pow(2, -10 * (t -= 1)) *
      Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
      0.5 +
    c +
    b
  );
}
function easeInBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c * (t /= d) * t * ((s + 1) * t - s) + b;
}
function easeOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}
function easeInOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  if ((t /= d / 2) < 1)
    return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
  return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
}
function easeOutInBack(t, b, c, d, s) {
  if (t < d / 2) return easeOutBack(t * 2, b, c / 2, d, s);
  return easeInBack(t * 2 - d, b + c / 2, c / 2, d, s);
}
function easeInBounce(t, b, c, d) {
  return c - easeOutBounce(d - t, 0, c, d) + b;
}
function easeOutBounce(t, b, c, d) {
  if ((t /= d) < 1 / 2.75) {
    return c * (7.5625 * t * t) + b;
  } else if (t < 2 / 2.75) {
    return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
  } else if (t < 2.5 / 2.75) {
    return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
  } else {
    return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
  }
}
function easeInOutBounce(t, b, c, d) {
  if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * 0.5 + b;
  else return easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
}
function easeOutInBounce(t, b, c, d) {
  if (t < d / 2) return easeOutBounce(t * 2, b, c / 2, d);
  return easeInBounce(t * 2 - d, b + c / 2, c / 2, d);
}

/*
  CALCULATION
*/

var newDatas = [];
var depth = Number(thisProperty.value) != thisProperty.value ? thisProperty.value.length : 1;
var datas = depth < 2 ? new Array(thisProperty) : thisProperty.value;

var i;
if (dontStop) {
  var totalTime = outPoint - inPoint;
  var ratio = introTime / (introTime + endTime);
  introTime = totalTime * ratio;
  endTime = totalTime * (1 - ratio);
}
if (relative) {
  for (i = 0; i < depth; i++) {
    introDatas[i] += datas[i];
    endDatas[i] += datas[i];
  }
}

if (time < inPoint) {
  for (i = 0; i < depth; i++) newDatas[i] = introDatas[i];
} else if (time < inPoint + introTime) {
  for (i = 0; i < depth; i++)
    newDatas[i] = introTween(
      time - inPoint,
      introDatas[i],
      datas[i] - introDatas[i],
      introTime
    );
} else if (time > outPoint) {
  for (i = 0; i < depth; i++) newDatas[i] = endDatas[i];
} else if (time > outPoint - endTime) {
  for (i = 0; i < depth; i++)
    newDatas[i] = endTween(
      time + endTime - outPoint,
      datas[i],
      endDatas[i] - datas[i],
      endTime
    );
} else {
  for (i = 0; i < depth; i++) newDatas[i] = datas[i];
}

if (depth < 2) value = newDatas[0];
else value = newDatas;
