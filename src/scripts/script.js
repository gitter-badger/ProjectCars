var button = document.getElementById('calcBtn');

var calculateModule = (function () {

  var _init = function () {
    _eventListeners();
  };

  var _eventListeners = function () {
    button.addEventListener('click', _calculate)
  };

  var _tiresData = {
    oldData: {
      diameters: {
        inner: 0,
        outer: 0
      },
      width: 0,
      sidewall: 0,
      height: 0,
      speedometer: 0
    },
    newData: {
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
    }
  };

  function _calculate () {

    _getDataFromUser(_tiresData);

    _pushDataToInputs(_tiresData);

  };

  function _getDataFromUser(tiresData) {

    var _oldWidthSelect = document.getElementById('oldWidthSelect');
    var _oldSidewallSelect = document.getElementById('oldSidewallSelect');
    var _oldInnerDiameterSelect = document.getElementById('oldInnerDiameterSelect');

    var _newWidthSelect = document.getElementById('newWidthSelect');
    var _newSidewallSelect = document.getElementById('newSidewallSelect');
    var _newInnerDiameterSelect = document.getElementById('newInnerDiameterSelect');

    var _speedometer = document.getElementById('speedometer');

    tiresData.oldData.width = _oldWidthSelect.options[_oldWidthSelect.selectedIndex].value;
    tiresData.oldData.sidewall = _oldSidewallSelect.options[_oldSidewallSelect.selectedIndex].value;
    tiresData.oldData.diameters.inner = _getInnerDiameter(_oldInnerDiameterSelect);

    tiresData.newData.width = _newWidthSelect.options[_newWidthSelect.selectedIndex].value;
    tiresData.newData.sidewall = _newSidewallSelect.options[_newSidewallSelect.selectedIndex].value;
    tiresData.newData.diameters.inner = _getInnerDiameter(_newInnerDiameterSelect);

    tiresData.oldData.speedometer = _speedometer.value;
  }
  
  function _pushDataToInputs(tiresData) {

    var _oldWidth = document.getElementById('oldWidth');
    var _newWidth = document.getElementById('newWidth');
    var _differenceWidth = document.getElementById('differenceWidth');

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

    var _speedometerTrue = document.getElementById('speedometerTrue');
    var _speedometerDifference = document.getElementById('speedometerDifference');

    _oldWidth.value = tiresData.oldData.width;
    _newWidth.value = tiresData.newData.width;
    _differenceWidth.value = _getDifference(_oldWidth, _newWidth);

    _oldInnerDiameter.value = tiresData.oldData.diameters.inner;
    _newInnerDiameter.value = tiresData.newData.diameters.inner;
    _differenceInnerDiameter.value = _getDifference(_oldInnerDiameter, _newInnerDiameter);

    tiresData.oldData.diameters.outer = _getOuterDiameter(_oldWidth, _oldInnerDiameter);
    _oldOuterDiameter.value = tiresData.oldData.diameters.outer;

    tiresData.newData.diameters.outer = _getOuterDiameter(_newWidth, _newInnerDiameter);
    _newOuterDiameter.value = tiresData.newData.diameters.outer;

    _differenceOuterDiameter.value = _getDifference(_oldOuterDiameter, _newOuterDiameter);

    tiresData.oldData.height = _getHeight(_oldOuterDiameter, _oldInnerDiameter);
    _oldHeight.value = tiresData.oldData.height;

    tiresData.newData.height = _getHeight(_newOuterDiameter, _newInnerDiameter);
    _newHeight.value = tiresData.newData.height;

    _differenceHeight.value = _getDifference(_oldHeight, _newHeight);

    _clearance.value = _getDifference(_oldOuterDiameter, _newOuterDiameter);

    tiresData.newData.speedometer = _getSpeed(_tiresData);
    _speedometerTrue.value = tiresData.newData.speedometer;

    _speedometerDifference.value = tiresData.oldData.speedometer - tiresData.newData.speedometer;
  }

  function _getInnerDiameter(diameter) {
    return Math.round(diameter.options[diameter.selectedIndex].value * 25.4);
  };

  function _getOuterDiameter(width, innerDiameter) {
    return Number(width.value) + Number(innerDiameter.value);
  };

  function _getHeight(outerDiameter, innerDiameter) {
    return (outerDiameter.value - innerDiameter.value) / 2;
  }

  function _getDifference(oldValue, newValue) {
    return oldValue.value - newValue.value;
  }

  function _getSpeed(tiresData) {
    return Math.round(tiresData.oldData.speedometer / ((tiresData.oldData.width * (tiresData.oldData.sidewall / 100) + Number(tiresData.oldData.diameters.inner)) / (tiresData.newData.width * (tiresData.newData.sidewall / 100) + Number(tiresData.newData.diameters.inner))));
  }

  return {
    init: _init
  };

})();

calculateModule.init();

calcBtn.onclick = function() {
  if (document.getElementById('speedometer').value == "" || document.getElementById('speedometer').value < 0) {
    document.getElementById('speed').innerHTML="Введите скорость";
    return false;
  }else{
    document.getElementById('speed').innerHTML="";
  }
};