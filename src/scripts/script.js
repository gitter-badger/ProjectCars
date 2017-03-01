var button = document.getElementById('calcBtn');

var calculateModule = (function () {

  var _init = function () {
    _eventListeners();
  };

  var _eventListeners = function () {
    button.addEventListener('click', _calculate)
  };

  var _newTiresData = {
    diameters: {
      inner: 0,
      outer: 0
    },
    width: 0,
    sidewall: 0,
    height: 0,
    difference: {
      diameters: {
        inner: 0,
        outer: 0
      },
      width: 0,
      height: 0
    },
    clearance: 0,
    speedometer: 0
  };

  var _oldTiresData = {
    diameters: {
      inner: 0,
      outer: 0
    },
    width: 0,
    sidewall: 0,
    height: 0,
    speedometer: 0
  };

  var _calculate = function () {

    var _oldWidthSelect = document.getElementById('oldWidthSelect');
    var _oldSidewallSelect = document.getElementById('oldSidewallSelect');
    var _oldInnerDiameterSelect = document.getElementById('oldInnerDiameterSelect');

    var _newWidthSelect = document.getElementById('newWidthSelect');
    var _newSidewallSelect = document.getElementById('newSidewallSelect');
    var _newInnerDiameterSelect = document.getElementById('newInnerDiameterSelect');

    var _oldWidth = document.getElementById('oldWidth');
    var _newWidth = document.getElementById('newWidth');
    var _differenceWidth = document.getElementById('differenceWidth');

    var _oldSidewall = _oldSidewallSelect.options[_oldSidewallSelect.selectedIndex].value;
    var _newSidewall = _newSidewallSelect.options[_newSidewallSelect.selectedIndex].value;

    var _oldInnerDiameter = document.getElementById('oldInnerDiameter');
    var _newInnerDiameter = document.getElementById('newInnerDiameter');
    var _differenceInnerDiameter = document.getElementById('differenceInnerDiameter');

    var _oldOuterDiameter = document.getElementById('oldOuterDiameter');
    var _newOuterDiameter = document.getElementById('newOuterDiameter');
    var _differenceOuterDiameter = document.getElementById('differenceOuterDiameter');

    var _oldHeight = document.getElementById('oldHeight');
    var _newHeight = document.getElementById('newHeight');
    var _differenceHeight = document.getElementById('differenceHeight');

    var _clearance = document.getElementById('clearance');

    var _speedometer = document.getElementById('speedometer');
    var _speedometerTrue = document.getElementById('speedometerTrue');
    var _speedometerDifference = document.getElementById('speedometerDifference');

    _oldWidth.value = _oldWidthSelect.options[_oldWidthSelect.selectedIndex].value;
    _newWidth.value = _newWidthSelect.options[_newWidthSelect.selectedIndex].value;
    _differenceWidth.value = _oldWidth.value - _newWidth.value;

    _oldInnerDiameter.value = _getInnerDiameter(_oldInnerDiameterSelect);
    _newInnerDiameter.value = _getInnerDiameter(_newInnerDiameterSelect);
    _differenceInnerDiameter.value = _oldInnerDiameter.value - _newInnerDiameter.value;

    _oldOuterDiameter.value = _getOuterDiameter(_oldWidth, _oldInnerDiameter);
    _newOuterDiameter.value = _getOuterDiameter(_newWidth, _newInnerDiameter);
    _differenceOuterDiameter.value = _oldOuterDiameter.value - _newOuterDiameter.value;

    _oldHeight.value = _getHeight(_oldOuterDiameter, _oldInnerDiameter);
    _newHeight.value = _getHeight(_newOuterDiameter, _newInnerDiameter);
    _differenceHeight.value = _oldHeight.value - _newHeight.value;

    _clearance.value = _oldOuterDiameter.value - _newOuterDiameter.value;

    _speedometerTrue.value = Math.round(_speedometer.value / ((_oldWidth.value * (_oldSidewall / 100) + Number(_oldInnerDiameter.value)) / (_newWidth.value * (_newSidewall / 100) + Number(_newInnerDiameter.value))));

    _speedometerDifference.value = _speedometer.value - _speedometerTrue.value;

  };

  function _getInnerDiameter(diameter) {
    return Math.round(diameter.options[diameter.selectedIndex].value * 25.4);
  };

  function _getOuterDiameter(width, innerDiameter) {
    return Number(width.value) + Number(innerDiameter.value);
  };

  function _getHeight(outerDiameter, innerDiameter) {
    return (outerDiameter.value - innerDiameter.value) / 2;
  }

  return {
    init: _init
  };

})();

calculateModule.init();
