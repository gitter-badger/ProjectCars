var button = document.getElementById('calcBtn');

var calculateModule = (function () {

  var _init = function () {
    _eventListeners();
  };

  var _eventListeners = function () {
    button.addEventListener('click', _calculate)
  };

  var _calculate = function () {

    var _oldWidthSelect = document.getElementById('oldWidthSelect');
    var _oldHeightSelect = document.getElementById('oldHeightSelect');
    var _oldInnerDiameterSelect = document.getElementById('oldInnerDiameterSelect');

    var _newWidthSelect = document.getElementById('newWidthSelect');
    var _newHeightSelect = document.getElementById('newHeightSelect');
    var _newInnerDiameterSelect = document.getElementById('newInnerDiameterSelect');

    var _oldHeightSelectValue = +_oldHeightSelect.options[_oldHeightSelect.selectedIndex].value;
    var _newHeightSelectValue = +_newHeightSelect.options[_newHeightSelect.selectedIndex].value;

    var _oldWidthOutput = document.getElementById('oldWidthOutput');
    var _newWidthOutput = document.getElementById('newWidthOutput');
    var _differenceWidthOutput = document.getElementById('differenceWidthOutput');

    var _oldInnerDiameterOutput = document.getElementById('oldInnerDiameterOutput');
    var _newInnerDiameterOutput = document.getElementById('newInnerDiameterOutput');
    var _differenceInnerDiameterOutput = document.getElementById('differenceInnerDiameterOutput');

    var _oldOuterDiameterOutput = document.getElementById('oldOuterDiameterOutput');
    var _newOuterDiameterOutput = document.getElementById('newOuterDiameterOutput');
    var _differenceOuterDiameterOutput = document.getElementById('differenceOuterDiameterOutput');

    var _oldHeightOutput = document.getElementById('oldHeightOutput');
    var _newHeightOutput = document.getElementById('newHeightOutput');
    var _differenceHeightOutput = document.getElementById('differenceHeightOutput');

    var _clearance = document.getElementById('clearance');

    var _speedometerValue = document.getElementById('speedometerValue');
    var _speedometerTrueValue = document.getElementById('speedometerTrueValue');
    var _speedometerDifference = document.getElementById('speedometerDifference');

    _oldWidthOutput.value = _oldWidthSelect.options[_oldWidthSelect.selectedIndex].value;
    _newWidthOutput.value = _newWidthSelect.options[_newWidthSelect.selectedIndex].value;
    _differenceWidthOutput.value = _oldWidthOutput.value - _newWidthOutput.value;

    _oldInnerDiameterOutput.value = Math.round(_oldInnerDiameterSelect.options[_oldInnerDiameterSelect.selectedIndex].value * 25.4);
    _newInnerDiameterOutput.value = Math.round(_newInnerDiameterSelect.options[_newInnerDiameterSelect.selectedIndex].value * 25.4);
    _differenceInnerDiameterOutput.value = _oldInnerDiameterOutput.value - _newInnerDiameterOutput.value;

    _oldOuterDiameterOutput.value = +_oldWidthOutput.value + +_oldInnerDiameterOutput.value;
    _newOuterDiameterOutput.value = +_newWidthOutput.value + +_newInnerDiameterOutput.value;
    _differenceOuterDiameterOutput.value = +_differenceWidthOutput.value + +_differenceInnerDiameterOutput.value;

    _oldHeightOutput.value = (_oldOuterDiameterOutput.value - _oldInnerDiameterOutput.value) / 2;
    _newHeightOutput.value = (_newOuterDiameterOutput.value - _newInnerDiameterOutput.value) / 2;
    _differenceHeightOutput.value = (_differenceInnerDiameterOutput.value - _differenceOuterDiameterOutput.value) / 2;

    _clearance.value = _oldOuterDiameterOutput.value - _newOuterDiameterOutput.value;

    _speedometerTrueValue.value = Math.round(_speedometerValue.value / ((_oldWidthOutput.value * (_oldHeightSelectValue / 100) + _oldInnerDiameterOutput.value) / (_newWidthOutput.value * (_newHeightSelectValue / 100) + _newInnerDiameterOutput.value)));

    _speedometerDifference.value = _speedometerValue.value - _speedometerTrueValue.value;

  };

  return {
    init: _init
  };

})();

calculateModule.init();
