// by issamweeb
(function(){
  var PropTypes, ref$, button, dd, div, dt, dl, i, li, span, ul, CSSTransitionGroup, availableVolumes, MorphButtonToModal, DeviceInfoButtonModal, slice$ = [].slice;
  PropTypes = React.PropTypes;
  ref$ = React.DOM, button = ref$.button, dd = ref$.dd, div = ref$.div, dt = ref$.dt, dl = ref$.dl, i = ref$.i, li = ref$.li, span = ref$.span, ul = ref$.ul;
  CSSTransitionGroup = React.addons.CSSTransitionGroup;
  availableVolumes = [
    {
      name: "iPhoto"
    }, {
      name: "LightRoom"
    }, {
      name: "Macintosh HD",
      subdirs: ["Users/lucius"]
    }, {
      name: "Lucius's Biig Hard Drive Name"
    }, {
      name: "MOVIES"
    }, {
      name: "Music"
    }, {
      name: "OnePlus Two"
    }, {
      name: "NSFW",
      subdirs: ["latina", "teen", "twins", "snakes"]
    }, {
      name: "Lucius Thumb"
    }, {
      name: "Snakes"
    }, {
      name: "Animu"
    }
  ];
  MorphButtonToModal = React.createClass({
    name: "MorphButtonToModal",
    propTypes: {
      buttonDom: PropTypes.node,
      titleDom: PropTypes.node
    },
    getInitialState: function getInitialState(){
      return {
        isOpen: false,
        mainTranslateCoord: {
          x: 0,
          y: 0
        }
      };
    },
    componentWillUnmount: function componentWillUnmount(){
      window.cancelAnimationFrame(this.mainTranslateAnim);
      window.removeEventListener("resize", this.boundResizeHandler, false);
      document.removeEventListener("click", this.clickOutClose, false);
    },
    mainTranslateDuration: 600,
    coordToTranslate: function coordToTranslate(arg$){
      var x, y;
      x = arg$.x, y = arg$.y;
      return "translate(" + x + "px, " + y + "px)";
    },
    quadInOut: function quadInOut(time, begin, end, duration){
      if ((time = time / (duration / 2)) < 1) {
        return (end - begin) / 2 * time * time + begin;
      } else {
        return (end - begin) * -1 / 2 * ((time -= 1) * (time - 2) - 1) + begin;
      }
    },
    mainTranslateBack: function mainTranslateBack(){
      var startTime, startX, startY, duration, translate, this$ = this;
      startTime = window.performance.now();
      startX = this.state.mainTranslateCoord.x;
      startY = this.state.mainTranslateCoord.y;
      duration = this.mainTranslateDuration;
      translate = function(t){
        var deltaTime, newCoord;
        deltaTime = window.performance.now() - startTime;
        newCoord = {
          x: this$.quadInOut(deltaTime, startX, 0, duration),
          y: this$.quadInOut(deltaTime, startY, 0, duration)
        };
        this$.setState({
          mainTranslateCoord: newCoord
        });
        if (deltaTime < duration) {
          return this$.mainTranslateAnim = window.requestAnimationFrame(translate);
        }
      };
      translate();
    },
    mainTranslateToCenter: function mainTranslateToCenter(){
      var morphMain, startTime, rect, startX, startY, duration, translate, this$ = this;
      morphMain = this.refs.morphMain;
      startTime = window.performance.now();
      rect = morphMain.getBoundingClientRect();
      startX = rect.left;
      startY = rect.top;
      duration = this.mainTranslateDuration;
      translate = function(t){
        var deltaTime, ref$, width, height, newCoord;
        deltaTime = window.performance.now() - startTime;
        ref$ = morphMain.getBoundingClientRect(), width = ref$.width, height = ref$.height;
        newCoord = {
          x: this$.quadInOut(deltaTime, 0, (window.innerWidth - width) * 0.5 - startX, duration),
          y: this$.quadInOut(deltaTime, 0, (window.innerHeight - height) * 0.5 - startY, duration)
        };
        this$.setState({
          mainTranslateCoord: newCoord
        });
        if (deltaTime < duration) {
          return this$.mainTranslateAnim = window.requestAnimationFrame(translate);
        }
      };
      translate();
    },
    resizeHandler: function resizeHandler(event){
      var ref$, top, left, width, height, newCoord;
      ref$ = this.refs.morphWrapper.getBoundingClientRect(), top = ref$.top, left = ref$.left;
      ref$ = this.refs.morphMain.getBoundingClientRect(), width = ref$.width, height = ref$.height;
      newCoord = {
        x: (window.innerWidth - width) * 0.5 - left,
        y: (window.innerHeight - height) * 0.5 - top
      };
      this.setState({
        mainTranslateCoord: newCoord
      });
    },
    toggleClickOutClose: function toggleClickOutClose(){
      var this$ = this;
      if (this.state.isOpen) {
        this.boundResizeHandler = this.resizeHandler.bind(this);
        this.clickOutClose = function(event){
          if (!event.target.closest(".morph-modal-container")) {
            return this$.closeModal();
          }
        };
        window.addEventListener("resize", this.boundResizeHandler, false);
        document.addEventListener("click", this.clickOutClose, false);
      } else {
        window.removeEventListener("resize", this.boundResizeHandler, false);
        document.removeEventListener("click", this.clickOutClose, false);
      }
    },
    openModal: function openModal(event){
      this.mainTranslateToCenter();
      this.setState({
        isOpen: true
      }, this.toggleClickOutClose);
    },
    closeModal: function closeModal(event){
      this.mainTranslateBack();
      this.setState({
        isOpen: false
      }, this.toggleClickOutClose);
    },
    renderButton: function renderButton(){
      return div({
        ref: "morphButtonContainer",
        className: "morph-button-container"
      }, button({
        ref: "morphButton",
        className: "morph-button",
        onClick: this.openModal
      }, this.props.buttonDom));
    },
    renderModal: function renderModal(){
      return div({
        ref: "morphModalContainer",
        className: "morph-modal-container"
      }, div({
        ref: "morphModalTitle",
        className: "morph-modal-title"
      }, this.props.titleDom, button({
        ref: "morphCloseButton",
        className: "btn-close",
        onClick: this.closeModal
      }, i({
        ref: "morphCloseButtonIcon",
        className: "fa fa-times"
      }), span({
        ref: "morphCloseButtonLabel",
        className: "sr-only"
      }, "Close"))), div({
        ref: "morphModalBody",
        className: "morph-modal-body"
      }, this.props.children));
    },
    render: function render(){
      var classNames, wrapperClassNames;
      classNames = ["morph-button-to-modal", this.state.isOpen ? "open" : "closed", this.props.className].join(" ").trim();
      wrapperClassNames = classNames.split(" ").map(function(s){
        return s + "-wrapper";
      }).join(" ");
      return div({
        ref: "morphWrapper",
        className: wrapperClassNames
      }, div({
        ref: "morphMain",
        key: "morphButtonToModal",
        className: classNames,
        style: {
          transform: this.coordToTranslate(this.state.mainTranslateCoord)
        }
      }, React.createElement(CSSTransitionGroup, {
        key: "morphButtonTrans",
        transitionName: "morph-button",
        transitionEnterTimeout: 700,
        transitionLeaveTimeout: 200
      }, this.state.isOpen
        ? null
        : this.renderButton()), React.createElement(CSSTransitionGroup, {
        key: "morphModalTrans",
        transitionName: "morph-modal",
        transitionEnterTimeout: 1200,
        transitionLeaveTimeout: 200
      }, this.state.isOpen ? this.renderModal() : null)));
    }
  });
  DeviceInfoButtonModal = React.createClass({
    name: "DeviceInfoButtonModal",
    propTypes: {
      volumes: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        subdirs: PropTypes.arrayOf(PropTypes.string)
      }))
    },
    renderVolume: function renderVolume(colIdx, vol, idx){
      var this$ = this;
      idx == null && (idx = 0);
      return div({
        key: "vol" + colIdx + "." + idx,
        className: "device-volume"
      }, [dl({
        key: colIdx + "." + idx,
        className: "info-key-value"
      }, dt({
        key: "key",
        className: "info-key"
      }, vol.name), dd({
        key: "value",
        className: "info-value"
      }, "Available"))].concat(!vol.subdirs || !vol.subdirs.length
        ? []
        : vol.subdirs.map(function(sub, idx){
          return dl({
            key: idx,
            className: "info-key-value"
          }, [
            dt({
              key: "subkey" + idx,
              className: "sub info-key"
            }, sub), dd({
              key: "subvalue" + idx,
              className: "sub info-value"
            }, "Available")
          ]);
        })));
    },
    renderVolumes: function renderVolumes(volumes, count){
      var splitAt, splitVolumes, this$ = this;
      count = count || this['this'].props.volumes.reduce(function(acc, vol){
        return acc + 1 + (vol.subdirs ? vol.subdirs.length : 0);
      }, 0);
      if (count < 7) {
        return div({
          key: "vol-list-0",
          className: "device-volume-list",
          style: {
            flexBasis: "50%",
            maxWidth: "50%",
            paddingLeft: "9rem"
          }
        }, volumes.map(this.renderVolume.bind(this, 0)));
      } else {
        splitAt = Math.ceil(count * 0.5);
        splitVolumes = function(arg$, count_, acc){
          var head, tail;
          head = arg$[0], tail = slice$.call(arg$, 1);
          count_ == null && (count_ = 0);
          acc == null && (acc = [[], []]);
          acc[count_ < splitAt ? 0 : 1].push(head);
          if (deepEq$(tail.length, 0, '===')) {
            return acc;
          } else {
            return splitVolumes(tail, count_ + 1 + (head.subdirs ? head.subdirs.length : 0), acc);
          }
        };
        return splitVolumes(volumes).map(function(volColumn, idx){
          return div({
            key: "vol-list-" + idx,
            className: "device-volume-list"
          }, volColumn.map(this$.renderVolume.bind(this$, idx)));
        });
      }
    },
    renderDeviceDetailsInfo: function renderDeviceDetailsInfo(){
      var volCount;
      volCount = this.props.volumes.reduce(function(acc, vol){
        return acc + 1 + (vol.subdirs ? vol.subdirs.length : 0);
      }, 0);
      return div({
        className: "device-details-info"
      }, [div({
        key: "os-conn-0",
        className: "device-os-and-connection",
        style: volCount < 7
          ? {
            flexBasis: "50%",
            maxWidth: "50%",
            paddingRight: "9rem"
          }
          : {}
      }, dl({
        className: "info-key-value"
      }, dt({
        className: "info-key"
      }, "Operating System"), dd({
        className: "info-value"
      }, "OS X")), dl({
        className: "info-key-value"
      }, dt({
        className: "info-key"
      }, i({
        className: "fa fa-check"
      }, null), span(null, " LAN")), dd({
        className: "info-value"
      }, "192.168.1.1:8111")), dl({
        className: "info-key-value"
      }, dt({
        className: "info-key"
      }, i({
        className: "fa fa-times"
      }, null), span(null, " P2P")), dd({
        className: "info-value"
      }, "none")), dl({
        className: "info-key-value"
      }, dt({
        className: "info-key"
      }, i({
        className: "fa fa-check"
      }, null), span(null, " Relay")), dd({
        className: "info-value"
      }, "toast.al")))].concat(this.renderVolumes(availableVolumes, volCount)));
    },
    renderButtonDom: [
      i({
        key: "buttonIcon",
        className: "info-icon fa fa-info"
      }, null), span({
        key: "buttonLabel",
        className: "info-label sr-only"
      }, "Device Info")
    ],
    renderTitleDom: [
      i({
        key: "titleIcon",
        className: "title-icon fa fa-desktop",
        style: {
          paddingRight: "0.5em"
        }
      }, null), span({
        key: "titleLabel",
        className: "title-label"
      }, "Devices Info")
    ],
    render: function render(){
      return React.createElement(MorphButtonToModal, {
        key: "deviceEntryInfoModal",
        className: "device-entry-info-modal",
        buttonDom: this.renderButtonDom,
        titleDom: this.renderTitleDom
      }, div({
        key: "deviceDetailsInfoContainer",
        className: "device-details-info-container"
      }, div({
        className: "device-details-info-header"
      }, i({
        className: "device-image fa fa-desktop"
      }, null), div({
        className: "device-label"
      }, span({
        className: "device-name"
      }, "Lucius Desktop"), span({
        className: "device-online-status"
      }, "Online"))), this.renderDeviceDetailsInfo()));
    }
  });
  ReactDOM.render(React.createElement(DeviceInfoButtonModal, {
    volumes: availableVolumes
  }), document.getElementById("app"));
  function deepEq$(x, y, type){
    var toString = {}.toString, hasOwnProperty = {}.hasOwnProperty,
        has = function (obj, key) { return hasOwnProperty.call(obj, key); };
    var first = true;
    return eq(x, y, []);
    function eq(a, b, stack) {
      var className, length, size, result, alength, blength, r, key, ref, sizeB;
      if (a == null || b == null) { return a === b; }
      if (a.__placeholder__ || b.__placeholder__) { return true; }
      if (a === b) { return a !== 0 || 1 / a == 1 / b; }
      className = toString.call(a);
      if (toString.call(b) != className) { return false; }
      switch (className) {
        case '[object String]': return a == String(b);
        case '[object Number]':
          return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
        case '[object Date]':
        case '[object Boolean]':
          return +a == +b;
        case '[object RegExp]':
          return a.source == b.source &&
                 a.global == b.global &&
                 a.multiline == b.multiline &&
                 a.ignoreCase == b.ignoreCase;
      }
      if (typeof a != 'object' || typeof b != 'object') { return false; }
      length = stack.length;
      while (length--) {if (window.CP.shouldStopExecution(1)){break;} if (stack[length] == a) { return true; } }
window.CP.exitedLoop(1);

      stack.push(a);
      size = 0;
      result = true;
      if (className == '[object Array]') {
        alength = a.length;
        blength = b.length;
        if (first) {
          switch (type) {
          case '===': result = alength === blength; break;
          case '<==': result = alength <= blength; break;
          case '<<=': result = alength < blength; break;
          }
          size = alength;
          first = false;
        } else {
          result = alength === blength;
          size = alength;
        }
        if (result) {
          while (size--) {if (window.CP.shouldStopExecution(2)){break;}
            if (!(result = size in a == size in b && eq(a[size], b[size], stack))){ break; }
          }
window.CP.exitedLoop(2);

        }
      } else {
        if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
          return false;
        }
        for (key in a) {if (window.CP.shouldStopExecution(3)){break;}
          if (has(a, key)) {
            size++;
            if (!(result = has(b, key) && eq(a[key], b[key], stack))) { break; }
          }
        }
window.CP.exitedLoop(3);

        if (result) {
          sizeB = 0;
          for (key in b) {if (window.CP.shouldStopExecution(4)){break;}
            if (has(b, key)) { ++sizeB; }
          }
window.CP.exitedLoop(4);

          if (first) {
            if (type === '<<=') {
              result = size < sizeB;
            } else if (type === '<==') {
              result = size <= sizeB
            } else {
              result = size === sizeB;
            }
          } else {
            first = false;
            result = size === sizeB;
          }
        }
      }
      stack.pop();
      return result;
    }
  }
}).call(this);
