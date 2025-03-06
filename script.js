function _0xc298(_0x129fa9, _0x4d762e) {
  const _0x35dc74 = _0x35dc();
  return (
    (_0xc298 = function (_0xc2987a, _0xd4ce80) {
      _0xc2987a = _0xc2987a - 0xa4;
      let _0x17275b = _0x35dc74[_0xc2987a];
      return _0x17275b;
    }),
    _0xc298(_0x129fa9, _0x4d762e)
  );
}
const _0x57a1de = _0xc298;
(function (_0x1297cb, _0x17461c) {
  const _0x146562 = _0xc298,
    _0x1e88bf = _0x1297cb();
  while (!![]) {
    try {
      const _0x1bc5e3 =
        (-parseInt(_0x146562(0x1c8)) / 0x1) *
          (-parseInt(_0x146562(0x13d)) / 0x2) +
        parseInt(_0x146562(0xe2)) / 0x3 +
        (parseInt(_0x146562(0x10f)) / 0x4) *
          (-parseInt(_0x146562(0x10b)) / 0x5) +
        -parseInt(_0x146562(0xfc)) / 0x6 +
        parseInt(_0x146562(0xff)) / 0x7 +
        parseInt(_0x146562(0x1c5)) / 0x8 +
        -parseInt(_0x146562(0x168)) / 0x9;
      if (_0x1bc5e3 === _0x17461c) break;
      else _0x1e88bf["push"](_0x1e88bf["shift"]());
    } catch (_0x3a294e) {
      _0x1e88bf["push"](_0x1e88bf["shift"]());
    }
  }
})(_0x35dc, 0x9b7f2);
const SCRIPT_URL = _0x57a1de(0x1b0);
function parseDDMMYYYY(_0x400720) {
  const _0x1a31e7 = _0x57a1de,
    _0x232d01 = _0x400720[_0x1a31e7(0x1ca)]("/");
  return new Date(_0x232d01[0x2], _0x232d01[0x1] - 0x1, _0x232d01[0x0]);
}
function isSameDate(_0x5b0565, _0x1fbb45) {
  const _0x31eb46 = _0x57a1de;
  return (
    _0x5b0565[_0x31eb46(0xdb)]() === _0x1fbb45[_0x31eb46(0xdb)]() &&
    _0x5b0565[_0x31eb46(0x166)]() === _0x1fbb45["getMonth"]() &&
    _0x5b0565[_0x31eb46(0x182)]() === _0x1fbb45[_0x31eb46(0x182)]()
  );
}
function convertDDMMYYYYToFull(_0x3edf15) {
  const _0x1b396a = _0x57a1de,
    _0x2d3121 = parseDDMMYYYY(_0x3edf15);
  return _0x2d3121[_0x1b396a(0x1b3)]();
}
function formatDateToDDMMYYYY(_0x508af2) {
  const _0x46bbe1 = _0x57a1de;
  if (/^\d{2}\/\d{2}\/\d{4}$/[_0x46bbe1(0xc9)](_0x508af2)) return _0x508af2;
  if (_0x508af2[_0x46bbe1(0x185)]("T") !== -0x1) {
    const _0x1c9f70 = new Date(_0x508af2);
    if (isNaN(_0x1c9f70)) return _0x508af2;
    const _0x3abee9 = _0x1c9f70[_0x46bbe1(0x182)]()
        [_0x46bbe1(0x1b3)]()
        [_0x46bbe1(0x1c3)](0x2, "0"),
      _0x94c90c = (_0x1c9f70[_0x46bbe1(0x166)]() + 0x1)
        [_0x46bbe1(0x1b3)]()
        ["padStart"](0x2, "0"),
      _0x3cf421 = _0x1c9f70["getFullYear"]();
    return _0x3abee9 + "/" + _0x94c90c + "/" + _0x3cf421;
  }
  const _0x42ecab = parseDDMMYYYY(_0x508af2);
  if (isNaN(_0x42ecab)) return _0x508af2;
  const _0x3189de = _0x42ecab[_0x46bbe1(0x182)]()
      ["toString"]()
      [_0x46bbe1(0x1c3)](0x2, "0"),
    _0x2e5ae6 = (_0x42ecab["getMonth"]() + 0x1)
      ["toString"]()
      [_0x46bbe1(0x1c3)](0x2, "0"),
    _0x3701ab = _0x42ecab[_0x46bbe1(0xdb)]();
  return _0x3189de + "/" + _0x2e5ae6 + "/" + _0x3701ab;
}
function convertDDMMYYYYToFull(_0x4cdcae) {
  const _0x2c4296 = _0x57a1de,
    _0x2c2459 = _0x4cdcae[_0x2c4296(0x1ca)]("/");
  if (_0x2c2459[_0x2c4296(0x1d0)] !== 0x3) return _0x4cdcae;
  const _0x1a87ba = new Date(
    _0x2c2459[0x2],
    _0x2c2459[0x1] - 0x1,
    _0x2c2459[0x0]
  );
  return _0x1a87ba[_0x2c4296(0x1b3)]();
}
function getBlocks(_0x540457) {
  const _0x1cf65b = _0x57a1de,
    _0xfbbede = /(\[.*?\])\s*\((.*?)\)/g;
  let _0x297100 = [],
    _0x25668a;
  while ((_0x25668a = _0xfbbede[_0x1cf65b(0x1cb)](_0x540457)) !== null) {
    _0x297100[_0x1cf65b(0x129)]({
      json: _0x25668a[0x1],
      date: _0x25668a[0x2],
      fullBlock: _0x25668a[0x0],
    });
  }
  return _0x297100;
}
const contactItems = document[_0x57a1de(0x173)](_0x57a1de(0x16c)),
  notificationPopup = document[_0x57a1de(0x12b)](_0x57a1de(0x177)),
  showNotification = (_0x3d44ae) => {
    const _0x285a8d = _0x57a1de,
      _0x1ed994 = notificationPopup[_0x285a8d(0x107)]("p");
    if (_0x1ed994) _0x1ed994[_0x285a8d(0x113)] = _0x3d44ae;
    notificationPopup[_0x285a8d(0x134)][_0x285a8d(0x108)](_0x285a8d(0xbb)),
      notificationPopup[_0x285a8d(0x134)][_0x285a8d(0xe4)](_0x285a8d(0x127)),
      setTimeout(() => {
        const _0x2ea7fb = _0x285a8d;
        notificationPopup[_0x2ea7fb(0x134)][_0x2ea7fb(0x108)](_0x2ea7fb(0x127)),
          notificationPopup[_0x2ea7fb(0x134)]["remove"](_0x2ea7fb(0xbb));
      }, 0xbb8);
  };
function getParticipantsCount(_0x35fb4e, _0x128ea4) {
  const _0x25e5e0 = _0x57a1de;
  let _0x13e164 = 0x0;
  if (_0x35fb4e[_0x25e5e0(0x15b)]) {
    const _0x4d5998 = /(\[.*?\])\s*\((.*?)\)/g;
    let _0x526920;
    const _0x45fe03 = parseDDMMYYYY(_0x128ea4);
    while (
      (_0x526920 = _0x4d5998[_0x25e5e0(0x1cb)](_0x35fb4e["participants"])) !==
      null
    ) {
      try {
        let _0xcaf793 = new Date(_0x526920[0x2]);
        if (isSameDate(_0xcaf793, _0x45fe03)) {
          const _0x46b9d4 = JSON[_0x25e5e0(0xa8)](_0x526920[0x1]);
          let _0x198634 = Array[_0x25e5e0(0xb1)](_0x46b9d4)
            ? _0x46b9d4
            : [_0x46b9d4];
          _0x13e164 += _0x198634[_0x25e5e0(0x1d0)];
        }
      } catch (_0x3525ed) {
        console[_0x25e5e0(0x1ce)](_0x25e5e0(0x1a8), _0x3525ed);
      }
    }
  }
  return _0x13e164;
}
document[_0x57a1de(0x1ae)](_0x57a1de(0x164), () => {
  const _0x4cbf8b = initNotifications();
  initNavigation(),
    initAdminPanel(),
    initAppointmentForm(_0x4cbf8b),
    initEmployeeTable(),
    runArchiveProcess(),
    fetchArchives(),
    fetchTasks(),
    fetchTasksHistory();
});
function initNavigation() {
  const _0x4ddc56 = _0x57a1de,
    _0x3b8ccc = document[_0x4ddc56(0x173)](".service-item"),
    _0x50f471 = document[_0x4ddc56(0x107)](_0x4ddc56(0x133)),
    _0xd8ecdc = document[_0x4ddc56(0x173)](_0x4ddc56(0xcc)),
    _0x30eabe = document[_0x4ddc56(0x12b)](_0x4ddc56(0x106)),
    _0xc13288 = document[_0x4ddc56(0x12b)](_0x4ddc56(0x1a9)),
    _0x2cf2cf = document[_0x4ddc56(0x12b)](_0x4ddc56(0x1e3)),
    _0x454e3c = document[_0x4ddc56(0x173)](_0x4ddc56(0x172)),
    _0x1bde0b = document[_0x4ddc56(0x173)](".menu-item"),
    _0x7b5751 = document["querySelectorAll"](_0x4ddc56(0x1d2)),
    _0x51de8b = document[_0x4ddc56(0x12b)](_0x4ddc56(0xd4)),
    _0x40248c = () => {
      const _0x48d0d1 = _0x4ddc56;
      _0xd8ecdc[_0x48d0d1(0x19a)]((_0x186d53) => {
        const _0x540c6c = _0x48d0d1;
        _0x186d53["style"][_0x540c6c(0xc3)] = _0x540c6c(0xcf);
      });
    };
  _0x3b8ccc[_0x4ddc56(0x19a)]((_0x325761) => {
    const _0x555d6c = _0x4ddc56;
    _0x325761[_0x555d6c(0x1ae)]("click", () => {
      const _0x59ec42 = _0x555d6c,
        _0x5e5f20 = _0x325761["id"][_0x59ec42(0x17d)](_0x59ec42(0x18c), ""),
        _0xbf05f4 = document[_0x59ec42(0x107)]("#" + _0x5e5f20);
      _0xbf05f4 &&
        ((_0xc13288[_0x59ec42(0x196)][_0x59ec42(0xc3)] = _0x59ec42(0xcf)),
        (_0x50f471[_0x59ec42(0x196)][_0x59ec42(0xc3)] = _0x59ec42(0xcf)),
        (_0x30eabe["style"][_0x59ec42(0xc3)] = _0x59ec42(0xcf)),
        _0x40248c(),
        (_0xbf05f4[_0x59ec42(0x196)][_0x59ec42(0xc3)] = _0x59ec42(0x13c)));
    });
  }),
    _0x454e3c[_0x4ddc56(0x19a)]((_0x31e46f) => {
      const _0x192d39 = _0x4ddc56;
      _0x31e46f[_0x192d39(0x1ae)](_0x192d39(0x170), () => {
        const _0x5a5a11 = _0x192d39;
        (_0x50f471[_0x5a5a11(0x196)]["display"] = _0x5a5a11(0x13c)),
          (_0xc13288[_0x5a5a11(0x196)][_0x5a5a11(0xc3)] = "none"),
          (_0x30eabe[_0x5a5a11(0x196)][_0x5a5a11(0xc3)] = _0x5a5a11(0xcf)),
          (_0x51de8b[_0x5a5a11(0x196)][_0x5a5a11(0xc3)] = _0x5a5a11(0xcf)),
          _0x40248c();
        const _0x2d9821 = document[_0x5a5a11(0x12b)](_0x5a5a11(0x19b));
        if (_0x2d9821) {
          const _0x216ff4 =
              _0x2d9821[_0x5a5a11(0x1de)]()["top"] + window["scrollY"],
            _0x16e215 = window[_0x5a5a11(0xda)] / 0xa;
          window["scrollTo"]({
            top: _0x216ff4 - _0x16e215,
            behavior: _0x5a5a11(0xd3),
          });
        }
      });
    }),
    _0x1bde0b[_0x4ddc56(0x19a)]((_0x3033b6) => {
      const _0x5eab44 = _0x4ddc56;
      _0x3033b6[_0x5eab44(0x1ae)](_0x5eab44(0x170), (_0x339867) => {
        const _0x538ebc = _0x5eab44;
        _0x339867["preventDefault"]();
        const _0x3cc15b = _0x3033b6[_0x538ebc(0x1db)]("data-target"),
          _0x4a6c84 = document[_0x538ebc(0x12b)](_0x3cc15b);
        _0x4a6c84 &&
          ((_0x50f471["style"][_0x538ebc(0xc3)] = _0x538ebc(0x13c)),
          (_0x30eabe["style"][_0x538ebc(0xc3)] = "none"),
          _0x40248c(),
          (_0xc13288["style"][_0x538ebc(0xc3)] = "none"),
          (_0x51de8b[_0x538ebc(0x196)]["display"] = _0x538ebc(0xcf)),
          setTimeout(() => {
            const _0x438668 = _0x538ebc,
              _0x363e76 =
                _0x4a6c84["getBoundingClientRect"]()[_0x438668(0x160)] +
                window[_0x438668(0x178)],
              _0x5c2e05 = window[_0x438668(0xda)] / 0xa;
            window["scrollTo"]({
              top: _0x363e76 - _0x5c2e05,
              behavior: _0x438668(0xd3),
            });
          }, 0x64));
      });
    }),
    _0x7b5751[_0x4ddc56(0x19a)]((_0x13df07) => {
      const _0x2b60a4 = _0x4ddc56;
      _0x13df07[_0x2b60a4(0x1ae)](_0x2b60a4(0x170), () => {
        const _0x2aa211 = _0x2b60a4;
        (_0x30eabe[_0x2aa211(0x196)][_0x2aa211(0xc3)] = _0x2aa211(0x13c)),
          _0x40248c(),
          (_0x50f471[_0x2aa211(0x196)][_0x2aa211(0xc3)] = _0x2aa211(0xcf)),
          (_0xc13288[_0x2aa211(0x196)][_0x2aa211(0xc3)] = _0x2aa211(0xcf)),
          (_0x51de8b[_0x2aa211(0x196)][_0x2aa211(0xc3)] = _0x2aa211(0xcf));
      });
    }),
    _0x2cf2cf["addEventListener"](_0x4ddc56(0x170), () => {
      const _0x5167af = _0x4ddc56;
      getCookie(_0x5167af(0x193)) === _0x5167af(0x1bd)
        ? ((document[_0x5167af(0x12b)](_0x5167af(0xd4))[_0x5167af(0x196)][
            _0x5167af(0xc3)
          ] = _0x5167af(0x13c)),
          (document["getElementById"]("adminLogin")[_0x5167af(0x196)][
            "display"
          ] = _0x5167af(0xcf)))
        : ((document[_0x5167af(0x12b)](_0x5167af(0x1a9))[_0x5167af(0x196)][
            _0x5167af(0xc3)
          ] = _0x5167af(0x13c)),
          (document["getElementById"](_0x5167af(0xd4))[_0x5167af(0x196)][
            "display"
          ] = _0x5167af(0xcf))),
        _0x40248c(),
        (_0x50f471[_0x5167af(0x196)][_0x5167af(0xc3)] = _0x5167af(0xcf)),
        (_0x30eabe[_0x5167af(0x196)][_0x5167af(0xc3)] = _0x5167af(0xcf));
    });
}
function initNotifications() {
  const _0x18b243 = _0x57a1de,
    _0x413cbc = document["querySelectorAll"](_0x18b243(0x16c)),
    _0x3c5f42 = document[_0x18b243(0x12b)](_0x18b243(0x177)),
    _0x2577b4 = (_0x11d187) => {
      const _0x5d18c2 = _0x18b243,
        _0xdf475d = _0x3c5f42[_0x5d18c2(0x107)]("p");
      if (_0xdf475d) _0xdf475d[_0x5d18c2(0x113)] = _0x11d187;
      _0x3c5f42[_0x5d18c2(0x134)][_0x5d18c2(0x108)](_0x5d18c2(0xbb)),
        _0x3c5f42[_0x5d18c2(0x134)]["remove"](_0x5d18c2(0x127)),
        setTimeout(() => {
          const _0x34e563 = _0x5d18c2;
          _0x3c5f42["classList"]["add"]("hidden"),
            _0x3c5f42[_0x34e563(0x134)][_0x34e563(0xe4)](_0x34e563(0xbb));
        }, 0xbb8);
    };
  return (
    _0x413cbc[_0x18b243(0x19a)]((_0x73f7ff) => {
      const _0x40b0ff = _0x18b243;
      _0x73f7ff["addEventListener"](_0x40b0ff(0x170), () => {
        const _0x34356b = _0x40b0ff,
          _0x538837 = _0x73f7ff[_0x34356b(0x1db)](_0x34356b(0x1aa));
        _0x538837 &&
          navigator[_0x34356b(0xe9)]
            [_0x34356b(0x192)](_0x538837)
            ["then"](() =>
              _0x2577b4("Adresse\x20mail\x20copiée\x20(" + _0x538837 + ")")
            )
            [_0x34356b(0x135)]((_0x452dc4) =>
              console[_0x34356b(0x1ce)](_0x34356b(0xe6), _0x452dc4)
            );
      });
    }),
    _0x2577b4
  );
}
function initAdminPanel() {
  const _0xbdf63c = _0x57a1de,
    _0x2088ec = document["getElementById"](_0xbdf63c(0xd4)),
    _0x3ce722 = document["getElementById"](_0xbdf63c(0x1a9)),
    _0x29345c = document[_0xbdf63c(0x12b)]("username"),
    _0x50fd61 = document[_0xbdf63c(0x12b)](_0xbdf63c(0x128)),
    _0x3bc2f2 = document[_0xbdf63c(0x12b)](_0xbdf63c(0x169)),
    _0x50d3cd = document[_0xbdf63c(0x12b)](_0xbdf63c(0x1a3)),
    _0x18a89e = document[_0xbdf63c(0x12b)](_0xbdf63c(0xb4)),
    _0x408cf3 = document["getElementById"](_0xbdf63c(0x1e5)),
    _0x334292 = document[_0xbdf63c(0x12b)](_0xbdf63c(0xea))["querySelector"](
      "tbody"
    ),
    _0x11ad68 = document[_0xbdf63c(0x12b)](_0xbdf63c(0x1df)),
    _0x5b10e5 = document[_0xbdf63c(0x12b)]("modalTitle"),
    _0x122e46 = document["getElementById"](_0xbdf63c(0x1af)),
    _0x1ecf12 = document["getElementById"](_0xbdf63c(0x15a)),
    _0xfb3380 = document[_0xbdf63c(0x12b)](_0xbdf63c(0x11d)),
    _0x2b576e = _0xbdf63c(0x197),
    _0x534f42 = _0xbdf63c(0x16b);
  let _0x23f0dc = [],
    _0x30daf0 = [];
  const _0x40b6ce = (_0x386906) => {
      const _0x916193 = _0xbdf63c;
      (_0x50d3cd["textContent"] = _0x386906),
        (_0x50d3cd[_0x916193(0x196)][_0x916193(0x16a)] = _0x916193(0x156));
    },
    _0x5efaeb = () => {
      const _0x1cf533 = _0xbdf63c;
      _0x50d3cd[_0x1cf533(0x113)] = "";
    },
    _0x4fc029 = async () => {
      const _0x1bbf5d = _0xbdf63c;
      try {
        const _0x332105 = await fetch(SCRIPT_URL + _0x1bbf5d(0x1d9)),
          _0xf71df7 = await _0x332105[_0x1bbf5d(0xa5)]();
        if (!_0xf71df7 || !_0xf71df7[_0x1bbf5d(0x116)]) {
          (_0x23f0dc = []), _0x53c7e8();
          return;
        }
        (_0x23f0dc = _0xf71df7["values"][_0x1bbf5d(0x1a7)]((_0x57d83a) => ({
          id: parseInt(_0x57d83a["id"]),
          name: _0x57d83a[_0x1bbf5d(0x13e)],
          availableDates: _0x57d83a[_0x1bbf5d(0x103)],
          participants: _0x57d83a[_0x1bbf5d(0x15b)],
        }))),
          (window[_0x1bbf5d(0x12c)] = _0x23f0dc),
          _0x53c7e8();
      } catch (_0x535672) {
        console["error"](_0x1bbf5d(0xcb), _0x535672["message"]);
      }
    };
  window["fetchFormations"] = _0x4fc029;
  const _0x37c58b = async (_0x35a49e, _0x5a6b29) => {
      const _0x5967ae = _0xbdf63c,
        _0x1ebe2c =
          _0x23f0dc[_0x5967ae(0x1d0)] > 0x0
            ? Math[_0x5967ae(0x1b9)](
                ..._0x23f0dc["map"]((_0x50161f) => _0x50161f["id"])
              ) + 0x1
            : 0x1;
      try {
        const _0x5a4477 =
            SCRIPT_URL +
            _0x5967ae(0x16e) +
            _0x1ebe2c +
            _0x5967ae(0xe7) +
            encodeURIComponent(_0x35a49e) +
            _0x5967ae(0x102) +
            encodeURIComponent(_0x5a6b29["join"](",")),
          _0x511817 = await fetch(_0x5a4477),
          _0x55a357 = await _0x511817[_0x5967ae(0xa5)]();
        console[_0x5967ae(0xaa)](_0x5967ae(0x125), _0x55a357),
          await _0x4fc029();
      } catch (_0x3e2d0a) {
        console[_0x5967ae(0x1ce)](_0x5967ae(0x19f), _0x3e2d0a["message"]);
      }
    },
    _0x45e8f0 = async (_0x947b1c, _0x37ffbe, _0x42da83) => {
      const _0x528800 = _0xbdf63c;
      try {
        const _0x180279 =
            SCRIPT_URL +
            _0x528800(0xf3) +
            _0x947b1c +
            _0x528800(0xe7) +
            encodeURIComponent(_0x37ffbe) +
            "&dates=" +
            encodeURIComponent(_0x42da83[_0x528800(0x188)](",")),
          _0x1a32fe = await fetch(_0x180279),
          _0x7331a4 = await _0x1a32fe[_0x528800(0xa5)]();
        console[_0x528800(0xaa)](_0x528800(0x1ab), _0x7331a4),
          await _0x4fc029();
      } catch (_0x2d753c) {
        console["error"](_0x528800(0xd0), _0x2d753c["message"]);
      }
    },
    _0x39b0a4 = async (_0x1ad337) => {
      const _0xc2cda0 = _0xbdf63c;
      try {
        const _0x5aa8bb = SCRIPT_URL + _0xc2cda0(0x1c2) + _0x1ad337,
          _0x208f07 = await fetch(_0x5aa8bb),
          _0xe389e9 = await _0x208f07[_0xc2cda0(0xa5)]();
        console[_0xc2cda0(0xaa)](_0xc2cda0(0xf1), _0xe389e9), await _0x4fc029();
      } catch (_0x5832d0) {
        console[_0xc2cda0(0x1ce)](
          _0xc2cda0(0x104),
          _0x5832d0[_0xc2cda0(0x175)]
        );
      }
    },
    _0x53c7e8 = () => {
      const _0x4ea2c6 = _0xbdf63c;
      (_0x334292["innerHTML"] = ""),
        _0x23f0dc[_0x4ea2c6(0x19a)]((_0xfa483b) => {
          const _0x2cfb49 = _0x4ea2c6,
            _0x3dec25 = document["createElement"]("tr");
          (_0x3dec25[_0x2cfb49(0x158)] =
            _0x2cfb49(0x121) +
            _0xfa483b["id"] +
            "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22data-formation\x22>" +
            _0xfa483b["name"] +
            _0x2cfb49(0x18d) +
            (_0xfa483b[_0x2cfb49(0x103)]
              ? _0x229c36(_0xfa483b[_0x2cfb49(0x103)], _0xfa483b)
              : "") +
            "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22edit-formation\x22\x20data-id=\x22" +
            _0xfa483b["id"] +
            _0x2cfb49(0x19d) +
            _0xfa483b["id"] +
            _0x2cfb49(0x11a)),
            _0x334292[_0x2cfb49(0xef)](_0x3dec25);
        }),
        document["querySelectorAll"](_0x4ea2c6(0x143))["forEach"](
          (_0x2092d8) => {
            const _0x1d3b83 = _0x4ea2c6;
            _0x2092d8[_0x1d3b83(0x1ae)](_0x1d3b83(0x170), () => {
              const _0x34d55a = _0x1d3b83,
                _0x47f326 = _0x2092d8[_0x34d55a(0x1db)](_0x34d55a(0xf5)),
                _0x310c97 = _0x2092d8[_0x34d55a(0x1db)]("data-date"),
                _0x4e25b9 = _0x23f0dc[_0x34d55a(0x1cd)](
                  (_0x23e07b) => _0x23e07b["id"] === parseInt(_0x47f326)
                );
              _0x4e25b9 && showParticipantsModal(_0x4e25b9, _0x310c97);
            });
          }
        );
    };
  window[_0xbdf63c(0x12c)] = _0x23f0dc;
  function _0x229c36(_0x340fc0, _0xf12e1c) {
    const _0x34a1fd = _0xbdf63c;
    if (!_0x340fc0) return "";
    let _0x1d5b7b = _0x340fc0[_0x34a1fd(0x1ca)](",");
    return _0x1d5b7b[_0x34a1fd(0x1a7)]((_0x44e432) => {
      const _0x4fa4cd = _0x34a1fd;
      let _0x426f45 = _0x44e432[_0x4fa4cd(0x151)](),
        _0xccdbec = formatDateToDDMMYYYY(_0x426f45),
        _0x5805c5 = _0xf12e1c
          ? getParticipantsCount(_0xf12e1c, _0xccdbec)
          : 0x0,
        _0xfa27e3 = _0x4fa4cd(0x110);
      if (_0x5805c5 > 0x0 && _0x5805c5 < 0x6) _0xfa27e3 = _0x4fa4cd(0x161);
      else _0x5805c5 >= 0x6 && (_0xfa27e3 = _0x4fa4cd(0x15e));
      return (
        _0x4fa4cd(0xb3) +
        _0xf12e1c["id"] +
        _0x4fa4cd(0xad) +
        _0xccdbec +
        _0x4fa4cd(0xb8) +
        _0xfa27e3 +
        _0x4fa4cd(0x1e1) +
        _0xccdbec +
        "\x20(" +
        _0x5805c5 +
        _0x4fa4cd(0x191)
      );
    })[_0x34a1fd(0x188)]("\x20");
  }
  const _0x445fc6 = async () => {
      const _0x358f4e = _0xbdf63c;
      try {
        const _0x4ddd50 = await fetch(SCRIPT_URL + _0x358f4e(0x1bf)),
          _0x1ffc77 = await _0x4ddd50["json"]();
        if (!_0x1ffc77 || !_0x1ffc77[_0x358f4e(0x116)]) {
          (_0x30daf0 = []), _0x5ca4d2();
          return;
        }
        (_0x30daf0 = _0x1ffc77[_0x358f4e(0x116)]), _0x5ca4d2();
      } catch (_0x283670) {
        console[_0x358f4e(0x1ce)](_0x358f4e(0xac), _0x283670[_0x358f4e(0x175)]);
      }
    },
    _0x5ca4d2 = () => {
      const _0x1a61e3 = _0xbdf63c,
        _0x48b28c = document["getElementById"](_0x1a61e3(0xa6));
      if (!_0x30daf0 || _0x30daf0[_0x1a61e3(0x1d0)] === 0x0)
        _0x48b28c[_0x1a61e3(0x158)] =
          "<h3>Demandes\x20en\x20attente</h3><p>Aucune\x20demande\x20de\x20formation\x20en\x20attente..\x20:(</p>";
      else {
        _0x48b28c["innerHTML"] = _0x1a61e3(0xca);
        const _0x4e8d8d = document[_0x1a61e3(0x12b)]("pendingRequestsTable"),
          _0x3fdf39 = _0x4e8d8d[_0x1a61e3(0x107)](_0x1a61e3(0x148));
        _0x30daf0[_0x1a61e3(0x19a)]((_0x54126f) => {
          const _0x436b54 = _0x1a61e3;
          let _0x29d6b4 = _0x54126f[_0x436b54(0x132)];
          if (_0x54126f[_0x436b54(0x132)]) {
            let _0x3a58d3 = new Date(_0x54126f[_0x436b54(0x132)]);
            if (!isNaN(_0x3a58d3)) {
              let _0x48fcf2 = _0x3a58d3[_0x436b54(0x182)]()
                  [_0x436b54(0x1b3)]()
                  [_0x436b54(0x1c3)](0x2, "0"),
                _0x5898e2 = (_0x3a58d3[_0x436b54(0x166)]() + 0x1)
                  [_0x436b54(0x1b3)]()
                  [_0x436b54(0x1c3)](0x2, "0"),
                _0x102d97 = _0x3a58d3[_0x436b54(0xdb)]();
              _0x29d6b4 = _0x48fcf2 + "/" + _0x5898e2 + "/" + _0x102d97;
            }
          }
          let _0x1e4495 = "";
          try {
            const _0x482876 = JSON[_0x436b54(0xa8)](
              _0x54126f[_0x436b54(0x11c)]
            );
            Array[_0x436b54(0xb1)](_0x482876)
              ? (_0x1e4495 = _0x482876[_0x436b54(0x1a7)](
                  (_0xdcd971) =>
                    _0xdcd971["matricule"] +
                    "\x20-\x20" +
                    _0xdcd971["nameEmployee"] +
                    "\x20(" +
                    _0xdcd971[_0x436b54(0x12a)] +
                    ")"
                )[_0x436b54(0x188)](_0x436b54(0x149)))
              : (_0x1e4495 = _0x54126f[_0x436b54(0x11c)]);
          } catch (_0x3924e5) {
            _0x1e4495 = _0x54126f[_0x436b54(0x11c)];
          }
          const _0x176dbf = document["createElement"]("tr");
          (_0x176dbf[_0x436b54(0x158)] =
            _0x436b54(0x194) +
            _0x54126f["id"] +
            _0x436b54(0x1ac) +
            _0x54126f[_0x436b54(0xdc)] +
            _0x436b54(0x1ac) +
            _0x54126f["email"] +
            _0x436b54(0x1ac) +
            _0x54126f[_0x436b54(0x1e2)] +
            _0x436b54(0x1ac) +
            _0x54126f[_0x436b54(0x111)] +
            _0x436b54(0x1ac) +
            _0x29d6b4 +
            "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
            _0x54126f[_0x436b54(0x175)] +
            _0x436b54(0x100) +
            _0x1e4495 +
            _0x436b54(0xc0) +
            _0x54126f["id"] +
            _0x436b54(0x176) +
            _0x54126f["id"] +
            "\x22>Refuser</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20"),
            _0x3fdf39["appendChild"](_0x176dbf);
        }),
          _0x3fdf39[_0x1a61e3(0x1ae)]("click", (_0x3ec203) => {
            const _0x28a6fb = _0x1a61e3,
              _0x1e3de2 = _0x3ec203[_0x28a6fb(0x157)],
              _0x50713c = parseInt(
                _0x1e3de2[_0x28a6fb(0x1db)](_0x28a6fb(0xfd))
              );
            _0x1e3de2["classList"][_0x28a6fb(0x1c1)](_0x28a6fb(0xb7)) &&
              _0x64a45(_0x50713c),
              _0x1e3de2["classList"][_0x28a6fb(0x1c1)]("btn-refuse") &&
                _0x1fe200(_0x50713c);
          });
      }
    },
    _0x64a45 = async (_0x35e409) => {
      const _0x116eee = _0xbdf63c;
      try {
        const _0x56ff00 = SCRIPT_URL + _0x116eee(0xd2) + _0x35e409,
          _0x5de0db = await fetch(_0x56ff00),
          _0x52ccea = await _0x5de0db["json"]();
        console[_0x116eee(0xaa)](_0x116eee(0xdf), _0x52ccea),
          await _0x445fc6(),
          await _0x4fc029(),
          showNotification(_0x116eee(0x137));
      } catch (_0xd8d16a) {
        console[_0x116eee(0x1ce)](
          _0x116eee(0x167),
          _0xd8d16a[_0x116eee(0x175)]
        );
      }
    },
    _0x1fe200 = async (_0x4c9e20) => {
      const _0x4556c3 = _0xbdf63c;
      try {
        const _0x48d7ed = SCRIPT_URL + _0x4556c3(0xbd) + _0x4c9e20,
          _0x3ef6f9 = await fetch(_0x48d7ed),
          _0x4cf67e = await _0x3ef6f9[_0x4556c3(0xa5)]();
        console[_0x4556c3(0xaa)](_0x4556c3(0xa4), _0x4cf67e),
          await _0x445fc6(),
          showNotification("Demande\x20refusée\x20avec\x20succès\x20!");
      } catch (_0x4a6ec4) {
        console[_0x4556c3(0x1ce)](
          _0x4556c3(0x16d),
          _0x4a6ec4[_0x4556c3(0x175)]
        );
      }
    };
  document[_0xbdf63c(0x12b)](_0xbdf63c(0xb5)) &&
    document[_0xbdf63c(0x12b)](_0xbdf63c(0xb5))[_0xbdf63c(0x1ae)](
      _0xbdf63c(0x170),
      (_0x4b09c0) => {
        const _0x50b288 = _0xbdf63c,
          _0x53c180 = _0x4b09c0[_0x50b288(0x157)],
          _0x2b685b = parseInt(_0x53c180[_0x50b288(0x1db)]("data-id"));
        _0x53c180[_0x50b288(0x134)]["contains"]("btn-accept") &&
          _0x64a45(_0x2b685b),
          _0x53c180[_0x50b288(0x134)]["contains"]("btn-refuse") &&
            _0x1fe200(_0x2b685b);
      }
    );
  let _0x16aaa2 = ![],
    _0x38e80d = null;
  const _0x2ba638 = (_0x34582d, _0x3f7de0 = null) => {
      const _0x27808f = _0xbdf63c;
      (_0x5b10e5[_0x27808f(0x113)] = _0x34582d),
        (_0x122e46["value"] = _0x3f7de0 ? _0x3f7de0[_0x27808f(0x13e)] : ""),
        _0x3f7de0 && _0x3f7de0["availableDates"]
          ? (_0x1ecf12[_0x27808f(0xba)] = _0x3f7de0[_0x27808f(0x103)]
              ["split"](",")
              [_0x27808f(0x1a7)]((_0x1ba6ea) =>
                formatDateToDDMMYYYY(_0x1ba6ea[_0x27808f(0x151)]())
              )
              [_0x27808f(0x188)](",\x20"))
          : (_0x1ecf12[_0x27808f(0xba)] = ""),
        (_0x16aaa2 = !!_0x3f7de0),
        (_0x38e80d = _0x3f7de0 ? _0x3f7de0["id"] : null),
        (_0x11ad68[_0x27808f(0x196)]["display"] = _0x27808f(0x13c));
    },
    _0x94cb59 = () => {
      const _0x428711 = _0xbdf63c;
      (_0x11ad68["style"][_0x428711(0xc3)] = _0x428711(0xcf)),
        formationForm["reset"]();
    };
  getCookie(_0xbdf63c(0x193)) === _0xbdf63c(0x1bd) &&
    (_0x4fc029(), _0x445fc6()),
    _0x3bc2f2["addEventListener"](_0xbdf63c(0x170), () => {
      const _0x138ddc = _0xbdf63c,
        _0x3759dc = _0x29345c[_0x138ddc(0xba)][_0x138ddc(0x151)](),
        _0x5b596f = _0x50fd61[_0x138ddc(0xba)];
      _0x3759dc === _0x2b576e && _0x5b596f === _0x534f42
        ? (_0x5efaeb(),
          setCookie(_0x138ddc(0x193), _0x138ddc(0x1bd), 0x7),
          (_0x3ce722[_0x138ddc(0x196)][_0x138ddc(0xc3)] = _0x138ddc(0xcf)),
          (document[_0x138ddc(0x12b)](_0x138ddc(0xd4))[_0x138ddc(0x196)][
            _0x138ddc(0xc3)
          ] = _0x138ddc(0x13c)),
          _0x4fc029(),
          _0x445fc6())
        : _0x40b6ce(_0x138ddc(0x14b));
    }),
    _0x18a89e[_0xbdf63c(0x1ae)](_0xbdf63c(0x170), () => {
      const _0x1d6825 = _0xbdf63c;
      (document[_0x1d6825(0x12b)](_0x1d6825(0xd4))[_0x1d6825(0x196)][
        "display"
      ] = "none"),
        (_0x3ce722[_0x1d6825(0x196)][_0x1d6825(0xc3)] = "flex"),
        (_0x29345c[_0x1d6825(0xba)] = ""),
        (_0x50fd61[_0x1d6825(0xba)] = ""),
        _0x5efaeb(),
        eraseCookie(_0x1d6825(0x193));
    }),
    _0x408cf3["addEventListener"](_0xbdf63c(0x170), () => {
      const _0x21ecf8 = _0xbdf63c;
      _0x2ba638(_0x21ecf8(0xfa));
    }),
    formationForm[_0xbdf63c(0x1ae)](_0xbdf63c(0x186), async (_0x18f87e) => {
      const _0x61e00f = _0xbdf63c;
      showNotification(_0x61e00f(0xb2)),
        setTimeout(() => {
          const _0x439b3d = _0x61e00f;
          showNotification(_0x439b3d(0x112));
        }, 0xfa0),
        _0x18f87e["preventDefault"]();
      const _0x1f8ca9 = _0x122e46[_0x61e00f(0xba)][_0x61e00f(0x151)](),
        _0x37e29b = _0x1ecf12[_0x61e00f(0xba)]
          [_0x61e00f(0x1ca)](",")
          [_0x61e00f(0x1a7)]((_0x35b325) => _0x35b325[_0x61e00f(0x151)]());
      _0x16aaa2
        ? await _0x45e8f0(_0x38e80d, _0x1f8ca9, _0x37e29b)
        : await _0x37c58b(_0x1f8ca9, _0x37e29b),
        _0x94cb59();
    }),
    _0xfb3380[_0xbdf63c(0x1ae)](_0xbdf63c(0x170), _0x94cb59),
    _0x334292[_0xbdf63c(0x1ae)](_0xbdf63c(0x170), async (_0x187059) => {
      const _0x13ba04 = _0xbdf63c,
        _0x321ade = _0x187059[_0x13ba04(0x157)],
        _0x2bacfe = parseInt(_0x321ade[_0x13ba04(0x1db)](_0x13ba04(0xfd)));
      if (_0x321ade[_0x13ba04(0x134)][_0x13ba04(0x1c1)](_0x13ba04(0x14f))) {
        const _0x2ca112 = _0x23f0dc["find"](
          (_0xcd01ee) => _0xcd01ee["id"] === _0x2bacfe
        );
        _0x2ba638(_0x13ba04(0x115), _0x2ca112);
      } else {
        if (_0x321ade["classList"][_0x13ba04(0x1c1)]("delete-formation")) {
          const _0x1491d4 = await customConfirm(_0x13ba04(0x141));
          _0x1491d4 &&
            (showNotification(_0x13ba04(0xd9)),
            setTimeout(() => {
              showNotification("Formation\x20supprimée\x20avec\x20succès\x20!");
            }, 0xfa0),
            await _0x39b0a4(_0x2bacfe));
        }
      }
    });
}
function customConfirm(_0xd8473f) {
  return new Promise((_0x411ec6) => {
    const _0x3c8b21 = _0xc298,
      _0x56c01a = document[_0x3c8b21(0x12b)](_0x3c8b21(0x199)),
      _0x49f77d = document[_0x3c8b21(0x12b)]("confirmMessage2"),
      _0x4b32f4 = document["getElementById"](_0x3c8b21(0xe0)),
      _0x27cbf4 = document[_0x3c8b21(0x12b)](_0x3c8b21(0x1ad));
    (_0x49f77d[_0x3c8b21(0x113)] = _0xd8473f),
      (_0x56c01a["style"][_0x3c8b21(0xc3)] = _0x3c8b21(0x123));
    function _0x13e628() {
      const _0x11a266 = _0x3c8b21;
      (_0x56c01a[_0x11a266(0x196)][_0x11a266(0xc3)] = _0x11a266(0xcf)),
        _0x4b32f4[_0x11a266(0x18a)](_0x11a266(0x170), _0x5ddfbe),
        _0x27cbf4[_0x11a266(0x18a)](_0x11a266(0x170), _0x19395b);
    }
    function _0x5ddfbe() {
      _0x13e628(), _0x411ec6(!![]);
    }
    function _0x19395b() {
      _0x13e628(), _0x411ec6(![]);
    }
    _0x4b32f4[_0x3c8b21(0x1ae)](_0x3c8b21(0x170), _0x5ddfbe),
      _0x27cbf4[_0x3c8b21(0x1ae)]("click", _0x19395b);
  });
}
function showParticipantsModal(_0x1ffd4e, _0x45d4b7) {
  const _0x446699 = _0x57a1de;
  console["log"](
    "Participants\x20pour\x20la\x20formation\x20:",
    _0x1ffd4e,
    _0x45d4b7
  );
  const _0x37b938 = document[_0x446699(0x12b)]("participantsModal"),
    _0x5788f7 = document[_0x446699(0x12b)]("modalDate"),
    _0x47a6b7 = document[_0x446699(0x12b)]("formation-name-modal"),
    _0x1f92c4 = document["getElementById"](_0x446699(0xb0));
  (_0x5788f7[_0x446699(0x113)] = _0x45d4b7),
    (_0x47a6b7[_0x446699(0x113)] = _0x1ffd4e["name"]);
  const _0x181e88 = /(\[.*?\])\s*\((.*?)\)/g;
  let _0x2064ae = [],
    _0x386a5b;
  const _0xa4547f = parseDDMMYYYY(_0x45d4b7);
  while ((_0x386a5b = _0x181e88["exec"](_0x1ffd4e["participants"])) !== null) {
    try {
      let _0x439743 = new Date(_0x386a5b[0x2]);
      isSameDate(_0x439743, _0xa4547f) && _0x2064ae["push"](_0x386a5b[0x0]);
    } catch (_0x4cfc30) {
      console[_0x446699(0x1ce)](_0x446699(0xd5), _0x4cfc30);
    }
  }
  let _0x512831 = [];
  _0x2064ae[_0x446699(0x19a)]((_0x24aaba) => {
    const _0x2f370e = _0x446699,
      _0xa9d84b = _0x24aaba[_0x2f370e(0xf7)](/(\[.*?\])\s*\((.*?)\)/);
    if (_0xa9d84b && _0xa9d84b[0x1])
      try {
        const _0xf53c67 = JSON[_0x2f370e(0xa8)](_0xa9d84b[0x1]);
        let _0x3d046c = Array[_0x2f370e(0xb1)](_0xf53c67)
          ? _0xf53c67
          : [_0xf53c67];
        _0x512831 = _0x512831[_0x2f370e(0x1cc)](_0x3d046c);
      } catch (_0x5424df) {
        console[_0x2f370e(0x1ce)](_0x2f370e(0x17a), _0x5424df);
      }
  });
  let _0x3c59d0 = "";
  if (_0x512831[_0x446699(0x1d0)] === 0x0)
    _0x3c59d0 += "<p>Aucun\x20participant\x20pour\x20cette\x20date.</p>";
  else {
    _0x3c59d0 +=
      "\x0a\x20\x20\x20\x20\x20\x20<table\x20style=\x22width:100%;\x20border-collapse:collapse;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20style=\x22background-color:#f9f9f9;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>N°</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>Matricule</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>Nom/Prenom</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>Entité</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>Action</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20";
    let _0xd07dba = getBlocks(_0x1ffd4e[_0x446699(0x15b)])[_0x446699(0x144)](
      (_0x29ca4e) => {
        let _0x401070 = new Date(_0x29ca4e["date"]);
        return isSameDate(_0x401070, _0xa4547f);
      }
    );
    _0xd07dba[_0x446699(0x19a)]((_0x3895ba, _0x145154) => {
      const _0x285120 = _0x446699;
      try {
        const _0x3a1b51 = JSON[_0x285120(0xa8)](_0x3895ba[_0x285120(0xa5)]),
          _0x2e5a7d = Array[_0x285120(0xb1)](_0x3a1b51)
            ? _0x3a1b51[0x0]
            : _0x3a1b51;
        _0x3c59d0 +=
          "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>" +
          (_0x145154 + 0x1) +
          "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>" +
          _0x2e5a7d["matricule"] +
          _0x285120(0x10e) +
          _0x2e5a7d[_0x285120(0xf6)] +
          _0x285120(0x10e) +
          _0x2e5a7d["entity"] +
          "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-remove-participant\x22\x20data-index=\x22" +
          _0x145154 +
          _0x285120(0x1d7);
      } catch (_0x3e9405) {
        console[_0x285120(0x1ce)](_0x285120(0x189), _0x3e9405);
      }
    }),
      (_0x3c59d0 += _0x446699(0x1b4));
  }
  (_0x3c59d0 +=
    "\x0a\x20\x20\x20\x20<div\x20id=\x22addParticipantSection\x22\x20style=\x22margin-top:15px;\x22>\x0a\x20\x20\x20\x20\x20\x20<h4>Ajouter\x20un\x20participant</h4>\x0a\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22newMatricule\x22\x20placeholder=\x22Matricule\x22\x20style=\x22margin-right:5px;\x22\x20/>\x0a\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22newName\x22\x20placeholder=\x22Nom/Prénom\x22\x20style=\x22margin-right:5px;\x22\x20/>\x0a\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22newEntity\x22\x20placeholder=\x22Entité\x22\x20style=\x22margin-right:5px;\x22\x20/>\x0a\x20\x20\x20\x20\x20\x20<button\x20id=\x22btnAddParticipant\x22>Ajouter\x20participant(e)</button>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20"),
    (_0x1f92c4[_0x446699(0x158)] = _0x3c59d0),
    (_0x37b938["style"]["display"] = _0x446699(0x13c)),
    document[_0x446699(0x12b)](_0x446699(0x14e))[_0x446699(0x1ae)](
      _0x446699(0x170),
      () => {
        const _0x4a7bbd = _0x446699;
        document[_0x4a7bbd(0x12b)]("btnAddParticipant")[_0x4a7bbd(0x1a2)] =
          !![];
        const _0x241daa = document[_0x4a7bbd(0x12b)](_0x4a7bbd(0x14c))[
            _0x4a7bbd(0xba)
          ][_0x4a7bbd(0x151)](),
          _0x10b79b = document[_0x4a7bbd(0x12b)](_0x4a7bbd(0x1a0))["value"][
            _0x4a7bbd(0x151)
          ](),
          _0x1abe47 = document[_0x4a7bbd(0x12b)](_0x4a7bbd(0x171))[
            _0x4a7bbd(0xba)
          ][_0x4a7bbd(0x151)]();
        if (!_0x241daa || !_0x10b79b || !_0x1abe47) {
          (document[_0x4a7bbd(0x12b)](_0x4a7bbd(0x14e))["disabled"] = ![]),
            showNotification(_0x4a7bbd(0xae));
          return;
        }
        showNotification("Ajout\x20en\x20cours,\x20veuillez\x20patienter..");
        const _0x3a9ea1 = {
          matricule: _0x241daa,
          nameEmployee: _0x10b79b,
          entity: _0x1abe47,
        };
        addParticipantToFormation(_0x1ffd4e, _0x45d4b7, _0x3a9ea1),
          setTimeout(() => {
            const _0x44a04f = _0x4a7bbd;
            (document["getElementById"](_0x44a04f(0x14e))[_0x44a04f(0x1a2)] =
              ![]),
              showNotification(_0x44a04f(0xf2)),
              window["fetchFormations"]();
          }, 0xfa0);
      }
    ),
    document["querySelectorAll"](".btn-remove-participant")["forEach"](
      (_0x4cf77f) => {
        const _0x50f750 = _0x446699;
        _0x4cf77f[_0x50f750(0x1ae)](_0x50f750(0x170), () => {
          const _0x5abdf2 = _0x50f750;
          showNotification(_0x5abdf2(0xf0));
          const _0x368450 = parseInt(
            _0x4cf77f[_0x5abdf2(0x1db)](_0x5abdf2(0x179))
          );
          removeParticipantFromFormation(_0x1ffd4e, _0x45d4b7, _0x368450),
            setTimeout(() => {
              const _0x158cad = _0x5abdf2;
              showNotification(_0x158cad(0x10c));
            }, 0xfa0);
        });
      }
    );
}
document["getElementById"](_0x57a1de(0xde))[_0x57a1de(0x1ae)](
  _0x57a1de(0x170),
  () => {
    const _0x11c991 = _0x57a1de;
    document[_0x11c991(0x12b)](_0x11c991(0x1be))[_0x11c991(0x196)]["display"] =
      "none";
  }
);
async function addParticipantToFormation(_0x494347, _0x509970, _0x5a389c) {
  const _0x2e9d3b = _0x57a1de,
    _0x21f238 = convertDDMMYYYYToFull(_0x509970),
    _0x4cb3cb = JSON[_0x2e9d3b(0x122)]([_0x5a389c]) + "\x20(" + _0x21f238 + ")";
  _0x494347["participants"] &&
  _0x494347[_0x2e9d3b(0x15b)]["trim"]()["length"] > 0x0
    ? (_0x494347[_0x2e9d3b(0x15b)] =
        _0x494347["participants"][_0x2e9d3b(0x151)]() + ",\x20" + _0x4cb3cb)
    : (_0x494347[_0x2e9d3b(0x15b)] = _0x4cb3cb);
  await updateFormationParticipantsInSheet(
    _0x494347["id"],
    _0x494347[_0x2e9d3b(0x15b)]
  );
  if (typeof window[_0x2e9d3b(0xa9)] === _0x2e9d3b(0x18b))
    await window[_0x2e9d3b(0xa9)]();
  else
    typeof fetchFormations === _0x2e9d3b(0x18b)
      ? await fetchFormations()
      : console["error"](_0x2e9d3b(0xee));
  const _0x32f1e6 = window[_0x2e9d3b(0x12c)][_0x2e9d3b(0x1cd)](
    (_0x580026) => _0x580026["id"] === _0x494347["id"]
  );
  showParticipantsModal(_0x32f1e6, _0x509970);
}
async function removeParticipantFromFormation(_0x577760, _0x5c5328, _0xbbb28) {
  const _0x59101f = _0x57a1de;
  let _0x480670 = getBlocks(_0x577760["participants"]),
    _0x3f8fe9 = [],
    _0x21d157 = 0x0;
  const _0x53e6ac = parseDDMMYYYY(_0x5c5328);
  function _0x77e0e3(_0x4ccc21) {
    const _0x1e5939 = _0xc298;
    return (
      (_0x4ccc21 = _0x4ccc21[_0x1e5939(0x151)]()),
      _0x4ccc21["endsWith"]("))") ? _0x4ccc21 : _0x4ccc21 + ")"
    );
  }
  for (
    let _0x363de0 = 0x0;
    _0x363de0 < _0x480670[_0x59101f(0x1d0)];
    _0x363de0++
  ) {
    let _0x46f798 = _0x480670[_0x363de0],
      _0x8f7ff7 = new Date(_0x46f798[_0x59101f(0x132)]);
    isSameDate(_0x8f7ff7, _0x53e6ac)
      ? (_0x21d157 !== _0xbbb28 &&
          _0x3f8fe9["push"](_0x77e0e3(_0x46f798[_0x59101f(0x195)])),
        _0x21d157++)
      : _0x3f8fe9[_0x59101f(0x129)](_0x77e0e3(_0x46f798[_0x59101f(0x195)]));
  }
  (_0x577760[_0x59101f(0x15b)] =
    _0x3f8fe9[_0x59101f(0x188)](",\x20")["trim"]()),
    await updateFormationParticipantsInSheet(
      _0x577760["id"],
      _0x577760["participants"]
    ),
    showParticipantsModal(_0x577760, _0x5c5328);
}
function escapeRegExp(_0x30b9f8) {
  return _0x30b9f8["replace"](/[.*+?^${}()|[\]\\]/g, "\x5c$&");
}
async function updateFormationParticipantsInSheet(_0x59c0b5, _0xa14f65) {
  const _0x4abe7b = _0x57a1de;
  try {
    const _0xc0d5b7 =
        SCRIPT_URL +
        _0x4abe7b(0x159) +
        _0x59c0b5 +
        _0x4abe7b(0x174) +
        encodeURIComponent(_0xa14f65),
      _0x504fdc = await fetch(_0xc0d5b7),
      _0x53a28f = await _0x504fdc[_0x4abe7b(0xa5)]();
    console[_0x4abe7b(0xaa)](_0x4abe7b(0xc7), _0x53a28f),
      typeof window[_0x4abe7b(0xa9)] === _0x4abe7b(0x18b) &&
        (await window["fetchFormations"]());
  } catch (_0x1917a1) {
    console[_0x4abe7b(0x1ce)](_0x4abe7b(0x1b5), _0x1917a1[_0x4abe7b(0x175)]);
  }
}
function initAppointmentForm(_0x252882) {
  const _0x2f0cf2 = _0x57a1de;
  emailjs[_0x2f0cf2(0x1b7)](_0x2f0cf2(0x130)),
    populateAppointmentFormFormations();
  const _0x207cca = document["getElementById"](_0x2f0cf2(0x1bc)),
    _0xee2c18 = document["getElementById"](_0x2f0cf2(0x11b));
  _0xee2c18["addEventListener"](_0x2f0cf2(0x170), (_0x435d67) => {
    const _0x460950 = _0x2f0cf2;
    _0x435d67[_0x460950(0x1a6)]();
    const _0x29cabc = document[_0x460950(0x12b)]("name")[_0x460950(0xba)],
      _0x15c61e = document[_0x460950(0x12b)](_0x460950(0x1a1))["value"],
      _0x20a474 = document[_0x460950(0x12b)](_0x460950(0x1d5))["value"],
      _0x4f0a4d = document[_0x460950(0x12b)](_0x460950(0x1e4)),
      _0x1c9dd8 = document[_0x460950(0x12b)]("dateSelect"),
      _0x121ca7 = _0x4f0a4d[_0x460950(0x181)][_0x4f0a4d[_0x460950(0x19e)]],
      _0x19c413 = _0x121ca7 ? _0x121ca7[_0x460950(0x17f)] : "",
      _0x351b7c = _0x1c9dd8[_0x460950(0xba)],
      _0x59fa84 = document[_0x460950(0x12b)](_0x460950(0x175))[_0x460950(0xba)],
      _0x3da63c = [],
      _0x2a76c5 = document["querySelectorAll"](_0x460950(0xd7));
    _0x2a76c5["forEach"]((_0x18028a) => {
      const _0x5d9c90 = _0x460950,
        _0x48a051 = _0x18028a["querySelector"](_0x5d9c90(0x1c7))[
          _0x5d9c90(0xba)
        ][_0x5d9c90(0x151)](),
        _0x27cce1 = _0x18028a[_0x5d9c90(0x107)](
          "input[name=\x22nameEmployee[]\x22]"
        )[_0x5d9c90(0xba)][_0x5d9c90(0x151)](),
        _0x17b68a = _0x18028a["querySelector"](_0x5d9c90(0x13a))[
          _0x5d9c90(0xba)
        ][_0x5d9c90(0x151)]();
      _0x48a051 &&
        _0x27cce1 &&
        _0x17b68a &&
        _0x3da63c[_0x5d9c90(0x129)]({
          matricule: _0x48a051,
          nameEmployee: _0x27cce1,
          entity: _0x17b68a,
        });
    });
    const _0x42c8a1 = window[_0x460950(0x145)][_0x460950(0x1cd)](
      (_0x5c87af) =>
        parseInt(_0x5c87af["id"]) === parseInt(_0x4f0a4d[_0x460950(0xba)])
    );
    let _0x36d475 = _0x42c8a1
      ? getParticipantsCount(_0x42c8a1, _0x351b7c)
      : 0x0;
    if (_0x36d475 + _0x3da63c[_0x460950(0x1d0)] > 0xc) {
      _0x252882(_0x460950(0xbc));
      return;
    }
    const _0x59e889 =
        _0x59fa84[_0x460950(0x151)]() === "" ? _0x460950(0xdd) : _0x59fa84,
      _0x4c8337 = _0x3da63c["map"](
        (_0x2b9242) =>
          _0x2b9242[_0x460950(0x1d4)] +
          _0x460950(0x11f) +
          _0x2b9242[_0x460950(0xf6)] +
          "\x20(" +
          _0x2b9242[_0x460950(0x12a)] +
          ")"
      )[_0x460950(0x188)]("\x0a"),
      _0x3a2bbd = {
        name: _0x29cabc,
        email: _0x15c61e,
        phone: _0x20a474,
        formation: _0x19c413,
        date: _0x351b7c,
        message: _0x59e889,
        employees: _0x4c8337,
      };
    emailjs["send"](_0x460950(0x1b1), "template_mhmywm3", _0x3a2bbd)
      [_0x460950(0x118)](() => {
        const _0x2b56e9 = _0x460950;
        _0x252882(
          "Merci,\x20votre\x20demande\x20a\x20été\x20envoyée\x20avec\x20succès\x20!"
        ),
          _0x207cca[_0x2b56e9(0xe3)]();
      })
      [_0x460950(0x135)]((_0xefd80b) => {
        const _0x380e1f = _0x460950;
        console[_0x380e1f(0x1ce)](
          "Erreur\x20lors\x20de\x20l\x27envoi\x20:",
          _0xefd80b
        ),
          alert(
            "Une\x20erreur\x20s\x27est\x20produite,\x20veuillez\x20réessayer."
          );
      }),
      addPendingRequest({
        manager: _0x29cabc,
        email: _0x15c61e,
        telephone: _0x20a474,
        formation: _0x19c413,
        date: _0x351b7c,
        message: _0x59fa84,
        employees: JSON["stringify"](_0x3da63c),
      });
  });
}
function addPendingRequest(_0x3e2005) {
  const _0x254595 = _0x57a1de,
    _0x2a2dd4 =
      SCRIPT_URL +
      _0x254595(0x131) +
      _0x254595(0xfe) +
      encodeURIComponent(_0x3e2005[_0x254595(0xdc)]) +
      _0x254595(0x1b2) +
      encodeURIComponent(_0x3e2005[_0x254595(0x1a1)]) +
      _0x254595(0x18e) +
      encodeURIComponent(_0x3e2005[_0x254595(0x1e2)]) +
      _0x254595(0x1d8) +
      encodeURIComponent(_0x3e2005[_0x254595(0x111)]) +
      "&date=" +
      encodeURIComponent(_0x3e2005["date"]) +
      _0x254595(0x15c) +
      encodeURIComponent(_0x3e2005[_0x254595(0x175)]) +
      _0x254595(0x1cf) +
      encodeURIComponent(_0x3e2005[_0x254595(0x11c)]);
  fetch(_0x2a2dd4)
    [_0x254595(0x118)]((_0x45b02d) => _0x45b02d["json"]())
    [_0x254595(0x118)]((_0x321a48) =>
      console["log"](_0x254595(0x10a), _0x321a48)
    )
    [_0x254595(0x135)]((_0x420902) =>
      console[_0x254595(0x1ce)](_0x254595(0x1e9), _0x420902)
    );
}
function populateAppointmentFormFormations() {
  const _0x1f3cc3 = _0x57a1de;
  window[_0x1f3cc3(0x109)] = function (_0x3b143e) {
    const _0x2e0d5f = _0x1f3cc3;
    let _0x12053c = [];
    _0x3b143e &&
      _0x3b143e[_0x2e0d5f(0x116)] &&
      (_0x12053c = _0x3b143e[_0x2e0d5f(0x116)]);
    window["currentFormationsData"] = _0x12053c;
    const _0x4d11d4 = document["getElementById"](_0x2e0d5f(0x1e4));
    (_0x4d11d4[_0x2e0d5f(0x158)] = ""),
      _0x12053c["forEach"]((_0x22ef9d) => {
        const _0x19fe17 = _0x2e0d5f,
          _0x45e25c = document[_0x19fe17(0x17e)](_0x19fe17(0xf9));
        (_0x45e25c["value"] = _0x22ef9d["id"]),
          (_0x45e25c["text"] = "" + _0x22ef9d["name"]),
          _0x4d11d4[_0x19fe17(0xef)](_0x45e25c);
      }),
      _0x4d11d4[_0x2e0d5f(0x1ae)]("change", () => {
        updateDateSelect(_0x4d11d4, window["currentFormationsData"]);
      }),
      updateDateSelect(_0x4d11d4, window["currentFormationsData"]);
  };
  const _0x51ece9 = document[_0x1f3cc3(0x17e)](_0x1f3cc3(0x19c));
  (_0x51ece9[_0x1f3cc3(0x1e8)] = SCRIPT_URL + _0x1f3cc3(0x15f)),
    document[_0x1f3cc3(0xc5)][_0x1f3cc3(0xef)](_0x51ece9);
}
function updateDateSelect(_0x1fd5d6, _0x269e92) {
  const _0x3802a5 = _0x57a1de,
    _0x290702 = document["getElementById"]("dateSelect");
  _0x290702[_0x3802a5(0x158)] = "";
  const _0x57fe9d = parseInt(_0x1fd5d6[_0x3802a5(0xba)]),
    _0x21cd68 = _0x269e92["find"](
      (_0x2756a1) => parseInt(_0x2756a1["id"]) === _0x57fe9d
    );
  if (_0x21cd68 && _0x21cd68[_0x3802a5(0x103)]) {
    let _0x3ff451 = _0x21cd68["availableDates"];
    typeof _0x3ff451 === _0x3802a5(0x1a5) &&
      (_0x3ff451 = _0x3ff451[_0x3802a5(0x1ca)](","));
    if (_0x3ff451["length"] > 0x0)
      _0x3ff451[_0x3802a5(0x19a)]((_0x1f165a) => {
        const _0x208c15 = _0x3802a5;
        let _0x1a4ef1 = _0x1f165a[_0x208c15(0x151)](),
          _0x5a4434 = formatDateToDDMMYYYY(_0x1a4ef1),
          _0x466062 = _0x21cd68
            ? getParticipantsCount(_0x21cd68, _0x5a4434)
            : 0x0;
        const _0x2bd4d5 = document[_0x208c15(0x17e)](_0x208c15(0xf9));
        (_0x2bd4d5[_0x208c15(0xba)] = _0x1a4ef1),
          (_0x2bd4d5["text"] =
            _0x5a4434 + "\x20(" + _0x466062 + _0x208c15(0x1e0)),
          _0x290702[_0x208c15(0xef)](_0x2bd4d5);
      });
    else {
      const _0x1479d6 = document[_0x3802a5(0x17e)]("option");
      (_0x1479d6[_0x3802a5(0xba)] = ""),
        (_0x1479d6[_0x3802a5(0x17f)] = _0x3802a5(0x17b)),
        _0x290702[_0x3802a5(0xef)](_0x1479d6);
    }
  } else {
    const _0x3e2147 = document[_0x3802a5(0x17e)](_0x3802a5(0xf9));
    (_0x3e2147[_0x3802a5(0xba)] = ""),
      (_0x3e2147[_0x3802a5(0x17f)] = _0x3802a5(0x17b)),
      _0x290702[_0x3802a5(0xef)](_0x3e2147);
  }
}
function setCookie(_0x273cf4, _0x17965c, _0x5b15de) {
  const _0x510434 = _0x57a1de;
  let _0x37760a = "";
  if (_0x5b15de) {
    const _0x503e0c = new Date();
    _0x503e0c["setTime"](
      _0x503e0c[_0x510434(0xe1)]() + _0x5b15de * 0x18 * 0x3c * 0x3c * 0x3e8
    ),
      (_0x37760a = ";\x20expires=" + _0x503e0c[_0x510434(0x152)]());
  }
  document[_0x510434(0x165)] =
    _0x273cf4 + "=" + (_0x17965c || "") + _0x37760a + _0x510434(0x13b);
}
function getCookie(_0x13d5c2) {
  const _0x5319d5 = _0x57a1de,
    _0x1a2de0 = _0x13d5c2 + "=",
    _0x26c6bf = document[_0x5319d5(0x165)]["split"](";");
  for (
    let _0xf90990 = 0x0;
    _0xf90990 < _0x26c6bf[_0x5319d5(0x1d0)];
    _0xf90990++
  ) {
    let _0xaf7a67 = _0x26c6bf[_0xf90990];
    while (_0xaf7a67[_0x5319d5(0x1b8)](0x0) === "\x20")
      _0xaf7a67 = _0xaf7a67[_0x5319d5(0x101)](0x1, _0xaf7a67["length"]);
    if (_0xaf7a67[_0x5319d5(0x185)](_0x1a2de0) === 0x0)
      return _0xaf7a67["substring"](
        _0x1a2de0[_0x5319d5(0x1d0)],
        _0xaf7a67[_0x5319d5(0x1d0)]
      );
  }
  return null;
}
function eraseCookie(_0x373bb9) {
  const _0x58240b = _0x57a1de;
  document[_0x58240b(0x165)] = _0x373bb9 + "=;\x20Max-Age=-99999999;";
}
function initEmployeeTable() {
  const _0x361341 = _0x57a1de,
    _0x403b96 = document[_0x361341(0x12b)](_0x361341(0x150)),
    _0x23681d = _0x403b96[_0x361341(0x107)](_0x361341(0x148)),
    _0x1463b4 = 0xc,
    _0x39e2f2 = 0x1;
  function _0x5018a7() {
    const _0x20f66d = _0x361341,
      _0x55f215 = _0x23681d[_0x20f66d(0x173)]("tr");
    _0x55f215[_0x20f66d(0x19a)]((_0x51bafb) => {
      const _0xa8d7d0 = _0x20f66d,
        _0x405535 = _0x51bafb["querySelector"](_0xa8d7d0(0xd8));
      _0x405535[_0xa8d7d0(0x1a2)] = _0x55f215[_0xa8d7d0(0x1d0)] <= _0x39e2f2;
    });
    const _0x118242 = _0x23681d[_0x20f66d(0x173)](_0x20f66d(0x10d));
    _0x118242[_0x20f66d(0x19a)]((_0x410cbe) => {
      const _0x25712d = _0x20f66d;
      _0x410cbe[_0x25712d(0x1a2)] =
        _0x23681d[_0x25712d(0x173)]("tr")[_0x25712d(0x1d0)] >= _0x1463b4;
    });
  }
  function _0x5c5f07() {
    const _0x5b369f = _0x361341,
      _0x20fd8a = _0x23681d["querySelectorAll"]("tr")[_0x5b369f(0x1d0)];
    if (_0x20fd8a < _0x1463b4) {
      const _0x36ef70 = _0x23681d[_0x5b369f(0x107)]("tr")[_0x5b369f(0xc4)](
        !![]
      );
      _0x36ef70[_0x5b369f(0x173)](_0x5b369f(0xce))[_0x5b369f(0x19a)](
        (_0x560f81) => {
          const _0x2fe77a = _0x5b369f;
          _0x560f81[_0x2fe77a(0xba)] = "";
        }
      ),
        _0x23681d[_0x5b369f(0xef)](_0x36ef70),
        _0x5018a7();
    }
  }
  function _0x52be01(_0x790650) {
    const _0x3f3b59 = _0x361341,
      _0x5c54e7 = _0x23681d[_0x3f3b59(0x173)]("tr")[_0x3f3b59(0x1d0)];
    _0x5c54e7 > _0x39e2f2 && (_0x790650["remove"](), _0x5018a7());
  }
  _0x23681d["addEventListener"](_0x361341(0x170), (_0x1c6494) => {
    const _0x191906 = _0x361341;
    _0x1c6494["target"][_0x191906(0x134)][_0x191906(0x1c1)](_0x191906(0x1ba)) &&
      _0x5c5f07();
    if (
      _0x1c6494["target"][_0x191906(0x134)][_0x191906(0x1c1)](_0x191906(0x154))
    ) {
      const _0x539525 = _0x1c6494["target"][_0x191906(0x147)]("tr");
      _0x52be01(_0x539525);
    }
  }),
    _0x5018a7();
}
function formatDateClient(_0x125588) {
  const _0x46d071 = _0x57a1de;
  if (
    _0x125588 &&
    _0x125588[_0x46d071(0x138)]("/") &&
    _0x125588["length"] === 0xa
  )
    return _0x125588;
  const _0x3f693f = new Date(_0x125588);
  if (!isNaN(_0x3f693f)) {
    const _0x207a5d = ("0" + _0x3f693f[_0x46d071(0x182)]())[_0x46d071(0xbe)](
        -0x2
      ),
      _0x98e19f = ("0" + (_0x3f693f["getMonth"]() + 0x1))["slice"](-0x2),
      _0x67b2a8 = _0x3f693f["getFullYear"]();
    return _0x207a5d + "/" + _0x98e19f + "/" + _0x67b2a8;
  }
  return _0x125588;
}
async function runArchiveProcess() {
  const _0x3c0c6d = _0x57a1de;
  try {
    const _0x3647c0 = await fetch(SCRIPT_URL + _0x3c0c6d(0x117)),
      _0x491d2d = await _0x3647c0[_0x3c0c6d(0xa5)]();
    _0x491d2d["success"]
      ? console[_0x3c0c6d(0xaa)]("Archiving\x20completed\x20successfully.")
      : console[_0x3c0c6d(0x1ce)](_0x3c0c6d(0xbf), _0x491d2d[_0x3c0c6d(0x1ce)]);
  } catch (_0x1832d2) {
    console["error"](_0x3c0c6d(0xd6), _0x1832d2);
  }
}
function filterArchives() {
  const _0x349502 = _0x57a1de,
    _0x3b1830 = document[_0x349502(0x12b)](_0x349502(0x18f))
      ["value"][_0x349502(0x151)]()
      [_0x349502(0x146)](),
    _0x296a75 =
      document["getElementById"]("archiveDateFilter")[_0x349502(0xba)],
    _0x39bc53 = document["getElementById"]("archivesTable")[_0x349502(0x107)](
      _0x349502(0x148)
    ),
    _0x5d6040 = _0x39bc53[_0x349502(0x12d)]("tr");
  for (let _0x1757cc = 0x0; _0x1757cc < _0x5d6040["length"]; _0x1757cc++) {
    const _0xab259a = _0x5d6040[_0x1757cc][_0x349502(0x12d)]("td"),
      _0x55e9b2 = _0xab259a[0x1][_0x349502(0x113)]["toLowerCase"](),
      _0x3703ed = _0xab259a[0x2][_0x349502(0x113)][_0x349502(0x151)](),
      _0x43c379 = _0xab259a[0x3][_0x349502(0x113)][_0x349502(0x146)](),
      _0x2b2dbd =
        _0x55e9b2[_0x349502(0x138)](_0x3b1830) ||
        _0x43c379[_0x349502(0x138)](_0x3b1830),
      _0x1ec399 = _0x296a75 === "" || _0x3703ed === _0x296a75;
    _0x5d6040[_0x1757cc][_0x349502(0x196)]["display"] =
      _0x2b2dbd && _0x1ec399 ? "" : _0x349502(0xcf);
  }
}
function populateArchiveDateFilter() {
  const _0x5e6b88 = _0x57a1de,
    _0x144d81 = document[_0x5e6b88(0x12b)](_0x5e6b88(0xcd))[_0x5e6b88(0x107)](
      _0x5e6b88(0x148)
    ),
    _0x360de5 = _0x144d81[_0x5e6b88(0x12d)]("tr"),
    _0x5ca101 = new Set();
  for (
    let _0x4217bd = 0x0;
    _0x4217bd < _0x360de5[_0x5e6b88(0x1d0)];
    _0x4217bd++
  ) {
    const _0x32160e =
      _0x360de5[_0x4217bd]["getElementsByTagName"]("td")[0x2]["textContent"][
        _0x5e6b88(0x151)
      ]();
    _0x32160e !== "" && _0x5ca101[_0x5e6b88(0x108)](_0x32160e);
  }
  const _0x5bba32 = document[_0x5e6b88(0x12b)]("archiveDateFilter");
  (_0x5bba32[_0x5e6b88(0x158)] = _0x5e6b88(0x183)),
    Array[_0x5e6b88(0x140)](_0x5ca101)
      [_0x5e6b88(0x180)]()
      [_0x5e6b88(0x19a)]((_0x2eab93) => {
        const _0x27d7e4 = _0x5e6b88,
          _0x278267 = document[_0x27d7e4(0x17e)]("option");
        (_0x278267["value"] = _0x2eab93),
          (_0x278267[_0x27d7e4(0x113)] = _0x2eab93),
          _0x5bba32[_0x27d7e4(0xef)](_0x278267);
      });
}
function _0x35dc() {
  const _0x29fafb = [
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "fullBlock",
    "style",
    "CampusCandor",
    "Veuillez\x20patienter..\x20Suppression\x20de\x20tâche\x20en\x20cours.",
    "confirmModal2",
    "forEach",
    "servicesSection",
    "script",
    "\x22>Modifier</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22delete-formation\x22\x20data-id=\x22",
    "selectedIndex",
    "Erreur\x20lors\x20de\x20l\x27ajout\x20de\x20la\x20formation\x20:",
    "newName",
    "email",
    "disabled",
    "errorMessage",
    "Erreur\x20lors\x20de\x20la\x20mise\x20à\x20jour\x20de\x20l\x27état\x20de\x20la\x20tâche:\x20",
    "string",
    "preventDefault",
    "map",
    "Erreur\x20lors\x20du\x20parsing\x20des\x20participants:",
    "adminLogin",
    "data-email",
    "Mise\x20à\x20jour\x20:",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "confirmNo2",
    "addEventListener",
    "formationName",
    "https://script.google.com/macros/s/AKfycbyTxVIekVUyRSUafBPEzQGaK2goS1zqMi8qLoeESNhvk3XXbPSFyyjyJkuBWjWG5btvAA/exec",
    "service_x5g594z",
    "&email=",
    "toString",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20",
    "Erreur\x20lors\x20de\x20la\x20mise\x20à\x20jour\x20des\x20participants\x20:",
    "&importance=",
    "init",
    "charAt",
    "max",
    "btn-add",
    "#tasksHistoryContainer\x20.btn-delete-task",
    "appointmentForm",
    "true",
    "participantsModal",
    "?action=readPending",
    "?action=readTasksHistory",
    "contains",
    "?action=delete&id=",
    "padStart",
    "calendar",
    "3367608fXGDiv",
    "success",
    "input[name=\x22matricule[]\x22]",
    "1NJESxe",
    "Erreur\x20lors\x20de\x20l\x27effacement\x20de\x20l\x27historique:",
    "split",
    "exec",
    "concat",
    "find",
    "error",
    "&employees=",
    "length",
    "Erreur\x20lors\x20de\x20la\x20suppression\x20de\x20la\x20tâche:",
    ".goToForm",
    "<tr\x20class=\x22task-history-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "matricule",
    "phone",
    "etat",
    "\x22>Retirer</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "&formation=",
    "?action=read",
    "Voulez-vous\x20vraiment\x20effacer\x20l\x27historique\x20des\x20tâches\x20accomplies\x20?",
    "getAttribute",
    "|||",
    "concerne",
    "getBoundingClientRect",
    "formationModal",
    "/12)",
    ";\x22>",
    "telephone",
    "menuAdmin",
    "formationSelect",
    "addFormationButton",
    "\x0a\x20\x20\x20\x20\x20\x20<table\x20class=\x22tasks-table\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>ID</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Concerne</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Tâche</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Importance</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>État</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Actions</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20",
    "#f49f42",
    "src",
    "Erreur\x20lors\x20de\x20l\x27ajout\x20de\x20la\x20demande\x20:",
    "activeTasksContainer",
    "Demande\x20refusée\x20:",
    "json",
    "pendingRequests",
    "?action=readArchives",
    "parse",
    "fetchFormations",
    "log",
    "event",
    "Erreur\x20lors\x20de\x20la\x20récupération\x20des\x20demandes\x20en\x20attente\x20:",
    "\x22\x20data-date=\x22",
    "Veuillez\x20remplir\x20tous\x20les\x20champs.",
    "<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "participantsList",
    "isArray",
    "Enregistrement\x20en\x20cours,\x20veuillez\x20patienter..",
    "<span\x20class=\x22clickable-date\x22\x20data-formation-id=\x22",
    "logoutButton",
    "pendingRequestsTable",
    "Veuillez\x20patienter..\x20Ajout\x20de\x20tâche\x20en\x20cours.",
    "btn-accept",
    "\x22\x20style=\x22cursor:pointer;\x20margin-right:5px;\x20background-color:",
    "prev,next\x20today",
    "value",
    "show",
    "La\x20limite\x20de\x20participants\x20pour\x20une\x20formation\x20est\x20de\x2012,\x20merci\x20de\x20retirer\x20des\x20participants\x20ou\x20de\x20reserver\x20une\x20autre\x20date.",
    "?action=deletePending&id=",
    "slice",
    "Archiving\x20error:",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-accept\x22\x20data-id=\x22",
    "</div>",
    "<tr><td\x20colspan=\x274\x27>Aucun\x20historique\x20disponible</td></tr>",
    "display",
    "cloneNode",
    "body",
    "dayGridMonth",
    "Participants\x20mis\x20à\x20jour\x20:",
    "&etat=Accomplie",
    "test",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<h3>Demandes\x20en\x20attente</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<table\x20id=\x22pendingRequestsTable\x22\x20border=\x221\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>ID</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Manager</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Email</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Téléphone</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Formation</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Date</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Message</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Employees</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Actions</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20\x20\x20",
    "Erreur\x20lors\x20de\x20la\x20récupération\x20des\x20formations\x20:",
    ".formation-container",
    "archivesTable",
    "input",
    "none",
    "Erreur\x20lors\x20de\x20la\x20mise\x20à\x20jour\x20de\x20la\x20formation\x20:",
    "Erreur\x20lors\x20de\x20la\x20récupération\x20de\x20l\x27historique:",
    "?action=accept&id=",
    "smooth",
    "adminPanel",
    "Erreur\x20lors\x20du\x20parsing\x20des\x20blocs\x20:",
    "Error\x20calling\x20archive\x20action:",
    "#employeeTable\x20tbody\x20tr",
    ".btn-remove",
    "Suppression\x20en\x20cours,\x20veuillez\x20patienter..",
    "innerHeight",
    "getFullYear",
    "manager",
    "Aucun\x20message",
    "closeParticipantsModal",
    "Demande\x20acceptée\x20:",
    "confirmYes2",
    "getTime",
    "1789047ChlUeW",
    "reset",
    "remove",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22historyTask\x22>",
    "Erreur\x20lors\x20de\x20la\x20copie\x20de\x20l\x27email\x20:\x20",
    "&name=",
    "</td>\x0a\x20\x20\x20\x20\x20\x20",
    "clipboard",
    "formationsTable",
    "</tbody></table>",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22importance-cell\x20importance-",
    "render",
    "fetchFormations\x20function\x20is\x20not\x20available.",
    "appendChild",
    "Effacement\x20en\x20cours,\x20veuillez\x20patienter..",
    "Suppression\x20:",
    "Participant\x20ajouté\x20avec\x20succès\x20!",
    "?action=update&id=",
    "tache",
    "data-formation-id",
    "nameEmployee",
    "match",
    "Erreur\x20de\x20parsing\x20du\x20participant:",
    "option",
    "Ajouter\x20une\x20Formation",
    "Due",
    "4000590ihiBAN",
    "data-id",
    "&manager=",
    "5133877huIoPd",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22employeesList\x22>",
    "substring",
    "&dates=",
    "availableDates",
    "Erreur\x20lors\x20de\x20la\x20suppression\x20de\x20la\x20formation\x20:",
    "closeCalendar",
    "appointment-section",
    "querySelector",
    "add",
    "handleFormationsData",
    "Demande\x20ajoutée\x20:",
    "5080yBPSJA",
    "Participant\x20retiré\x20avec\x20succès\x20!",
    ".btn-add",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>",
    "3504Vwghoq",
    "#3333",
    "formation",
    "Formation\x20enregistrée\x20avec\x20succès\x20!",
    "textContent",
    "tasksHistoryContainer",
    "Modifier\x20une\x20Formation",
    "values",
    "?action=archive",
    "then",
    "?action=clearTasksHistory",
    "\x22>Supprimer</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20",
    "submitForm",
    "employees",
    "closeModal",
    "\x22>Accompli</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-delete-task\x22\x20data-id=\x22",
    "\x20-\x20",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-complete-task\x22\x20data-id=\x22",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "stringify",
    "block",
    "has",
    "Ajout\x20:",
    ".btn-delete-task",
    "hidden",
    "password",
    "push",
    "entity",
    "getElementById",
    "formationsData",
    "getElementsByTagName",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "<p>Aucune\x20tâche\x20accomplie.</p>",
    "4sYz-WzrDCXInmUCl",
    "?action=addPending",
    "date",
    "#homePage",
    "classList",
    "catch",
    "taskForm",
    "Demande\x20acceptée\x20avec\x20succès\x20!",
    "includes",
    "Formation\x20not\x20found\x20for\x20ID:\x20",
    "input[name=\x22entity[]\x22]",
    ";\x20path=/;\x20SameSite=Lax",
    "flex",
    "2140678qQeGzu",
    "name",
    "Calendar",
    "from",
    "Êtes-vous\x20sûr\x20de\x20vouloir\x20supprimer\x20cette\x20formation\x20?",
    "openCalendarBtn",
    ".clickable-date",
    "filter",
    "currentFormationsData",
    "toLowerCase",
    "closest",
    "tbody",
    "<br>",
    "#formationsTable\x20tbody\x20tr",
    "Identifiant\x20ou\x20mot\x20de\x20passe\x20incorrect.",
    "newMatricule",
    "Erreur\x20lors\x20de\x20la\x20récupération\x20des\x20tâches\x20actives.",
    "btnAddParticipant",
    "edit-formation",
    "employeeTable",
    "trim",
    "toUTCString",
    "data-date",
    "btn-remove",
    "title",
    "red",
    "target",
    "innerHTML",
    "?action=updateParticipants&id=",
    "formationDates",
    "participants",
    "&message=",
    "?action=readTasks",
    "#37ec5f",
    "?action=read&callback=handleFormationsData",
    "top",
    "#FFA500",
    "?action=updateTaskState&id=",
    "\x0a\x20\x20\x20\x20\x20\x20<table\x20class=\x22tasks-table\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>ID</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Concerne</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Tâche</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22colorTask\x22>Importance</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>État</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Actions</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20",
    "DOMContentLoaded",
    "cookie",
    "getMonth",
    "Erreur\x20lors\x20de\x20l\x27acceptation\x20de\x20la\x20demande\x20:",
    "5646195JHJNto",
    "submitLogin",
    "color",
    "CC1234!",
    ".contact-item",
    "Erreur\x20lors\x20du\x20refus\x20de\x20la\x20demande\x20:",
    "?action=add&id=",
    "Erreur\x20lors\x20de\x20la\x20suppression\x20de\x20la\x20tâche:\x20",
    "click",
    "newEntity",
    ".back-button",
    "querySelectorAll",
    "&participants=",
    "message",
    "\x22>Accepter</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-refuse\x22\x20data-id=\x22",
    "notificationPopup",
    "scrollY",
    "data-index",
    "Erreur\x20lors\x20du\x20parsing\x20d\x27un\x20bloc\x20:",
    "Aucune\x20date\x20disponible",
    "start",
    "replace",
    "createElement",
    "text",
    "sort",
    "options",
    "getDate",
    "<option\x20value=\x22\x22>Toutes\x20les\x20dates</option>",
    "importance",
    "indexOf",
    "submit",
    "formationId",
    "join",
    "Erreur\x20lors\x20de\x20l\x27affichage\x20d\x27un\x20bloc\x20:",
    "removeEventListener",
    "function",
    "item-",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "&telephone=",
    "archiveSearch",
    "taskConcerne",
    "/12)</span>",
    "writeText",
    "adminAuth",
  ];
  _0x35dc = function () {
    return _0x29fafb;
  };
  return _0x35dc();
}
document[_0x57a1de(0x12b)](_0x57a1de(0x18f))["addEventListener"](
  _0x57a1de(0xce),
  filterArchives
),
  document[_0x57a1de(0x12b)]("archiveDateFilter")[_0x57a1de(0x1ae)](
    "change",
    filterArchives
  );
async function fetchArchives() {
  const _0x59c2b7 = _0x57a1de;
  try {
    const _0x5aa837 = await fetch(SCRIPT_URL + _0x59c2b7(0xa7)),
      _0x2417a8 = await _0x5aa837[_0x59c2b7(0xa5)](),
      _0x486147 = document["getElementById"](_0x59c2b7(0xcd))[_0x59c2b7(0x107)](
        "tbody"
      );
    if (
      !_0x2417a8 ||
      !_0x2417a8["values"] ||
      _0x2417a8[_0x59c2b7(0x116)][_0x59c2b7(0x1d0)] === 0x0
    ) {
      _0x486147[_0x59c2b7(0x158)] = _0x59c2b7(0xc2);
      return;
    }
    (_0x486147[_0x59c2b7(0x158)] = ""),
      _0x2417a8[_0x59c2b7(0x116)][_0x59c2b7(0x19a)]((_0xf066e5) => {
        const _0x27ff3f = _0x59c2b7,
          _0x1fea9c = formatDateClient(_0xf066e5[_0x27ff3f(0x132)]);
        let _0x318b0b = "";
        const _0x40901f = _0xf066e5[_0x27ff3f(0x15b)][_0x27ff3f(0x1ca)](
          _0x27ff3f(0x1dc)
        );
        _0x40901f[_0x27ff3f(0x19a)]((_0x5ae454) => {
          const _0x29c8a9 = _0x27ff3f;
          _0x5ae454 = _0x5ae454[_0x29c8a9(0x151)]();
          if (_0x5ae454)
            try {
              const _0x8bec1b = JSON["parse"](_0x5ae454);
              if (
                Array[_0x29c8a9(0xb1)](_0x8bec1b) &&
                _0x8bec1b[_0x29c8a9(0x1d0)] > 0x0
              ) {
                const _0x53bedf = _0x8bec1b[0x0];
                _0x318b0b +=
                  "<div>" +
                  _0x53bedf[_0x29c8a9(0x1d4)] +
                  _0x29c8a9(0x11f) +
                  _0x53bedf["nameEmployee"] +
                  _0x29c8a9(0x11f) +
                  _0x53bedf[_0x29c8a9(0x12a)] +
                  _0x29c8a9(0xc1);
              }
            } catch (_0x3aa5c3) {
              console[_0x29c8a9(0x1ce)](_0x29c8a9(0xf8), _0x3aa5c3);
            }
        });
        const _0x468a92 = document[_0x27ff3f(0x17e)]("tr");
        (_0x468a92[_0x27ff3f(0x158)] =
          _0x27ff3f(0x121) +
          _0xf066e5["id"] +
          _0x27ff3f(0x18d) +
          _0xf066e5[_0x27ff3f(0x111)] +
          _0x27ff3f(0x18d) +
          _0x1fea9c +
          _0x27ff3f(0x18d) +
          _0x318b0b +
          _0x27ff3f(0xe8)),
          _0x486147[_0x27ff3f(0xef)](_0x468a92);
      }),
      populateArchiveDateFilter();
  } catch (_0x56a45) {
    console[_0x59c2b7(0x1ce)](_0x59c2b7(0xd1), _0x56a45);
  }
}
function convertDMYToISO(_0x556878) {
  const _0x561cf0 = _0x57a1de,
    _0x51c7b0 = _0x556878["split"]("/");
  if (_0x51c7b0["length"] === 0x3) {
    const _0x31f9a7 = _0x51c7b0[0x0][_0x561cf0(0x1c3)](0x2, "0"),
      _0x29068d = _0x51c7b0[0x1][_0x561cf0(0x1c3)](0x2, "0"),
      _0x166b77 = _0x51c7b0[0x2];
    return _0x166b77 + "-" + _0x29068d + "-" + _0x31f9a7;
  }
  return _0x556878;
}
function getEventsFromFormations() {
  const _0x51d53d = _0x57a1de,
    _0x59771a = document["querySelectorAll"](_0x51d53d(0x14a)),
    _0x507ea4 = new Map();
  return (
    _0x59771a[_0x51d53d(0x19a)]((_0x4205bf) => {
      const _0x4e412f = _0x51d53d,
        _0x2e1f17 = _0x4205bf[_0x4e412f(0x107)]("td");
      if (!_0x2e1f17) return;
      const _0x14ae2b = _0x2e1f17[_0x4e412f(0x113)][_0x4e412f(0x151)](),
        _0x333c18 = _0x4205bf[_0x4e412f(0x107)](".data-formation");
      if (!_0x333c18) return;
      const _0x329be9 = _0x333c18[_0x4e412f(0x113)][_0x4e412f(0x151)](),
        _0x4896cd = window[_0x4e412f(0x12c)]
          ? window[_0x4e412f(0x12c)][_0x4e412f(0x1cd)](
              (_0x41ebd7) => _0x41ebd7["id"][_0x4e412f(0x1b3)]() === _0x14ae2b
            )
          : null,
        _0x24aad9 = _0x4205bf[_0x4e412f(0x173)](_0x4e412f(0x143));
      _0x24aad9[_0x4e412f(0x19a)]((_0x2871b8) => {
        const _0x501899 = _0x4e412f,
          _0x295941 = _0x2871b8["getAttribute"](_0x501899(0x153));
        if (!_0x295941) return;
        const _0x300e91 = convertDMYToISO(_0x295941);
        let _0x157fd7 = 0x0;
        if (_0x4896cd) _0x157fd7 = getParticipantsCount(_0x4896cd, _0x295941);
        else {
          let _0x43b738 = _0x2871b8[_0x501899(0x113)]["match"](/\((\d+)\/12\)/);
          _0x43b738 &&
            _0x43b738[0x1] &&
            (_0x157fd7 = parseInt(_0x43b738[0x1], 0xa));
        }
        let _0x1df562 = "grey";
        if (_0x157fd7 >= 0x1 && _0x157fd7 <= 0x5) _0x1df562 = _0x501899(0x1e7);
        else _0x157fd7 >= 0x6 && (_0x1df562 = _0x501899(0x15e));
        const _0x10851c = _0x329be9 + "\x20(" + _0x157fd7 + _0x501899(0x1e0),
          _0x58bac0 = _0x300e91 + "|" + _0x329be9;
        !_0x507ea4[_0x501899(0x124)](_0x58bac0) &&
          _0x507ea4["set"](_0x58bac0, {
            title: _0x10851c,
            start: _0x300e91,
            backgroundColor: _0x1df562,
            borderColor: _0x1df562,
            extendedProps: { formationId: _0x14ae2b, count: _0x157fd7 },
          });
      });
    }),
    Array[_0x51d53d(0x140)](_0x507ea4[_0x51d53d(0x116)]())
  );
}
function initCalendarFromFormations() {
  const _0xfe4c04 = _0x57a1de,
    _0x374827 = getEventsFromFormations(),
    _0x4082bd = document[_0xfe4c04(0x12b)](_0xfe4c04(0x1c4)),
    _0x2ff472 = new FullCalendar[_0xfe4c04(0x13f)](_0x4082bd, {
      locale: "fr",
      initialView: _0xfe4c04(0xc6),
      headerToolbar: {
        left: _0xfe4c04(0xb9),
        center: _0xfe4c04(0x155),
        right: "",
      },
      events: _0x374827,
      eventClick: function (_0x2898c4) {
        const _0x6af8a0 = _0xfe4c04,
          _0x464d48 = _0x2898c4[_0x6af8a0(0xab)][_0x6af8a0(0x17c)],
          _0x351b77 = ("0" + _0x464d48[_0x6af8a0(0x182)]())[_0x6af8a0(0xbe)](
            -0x2
          ),
          _0x35e587 = ("0" + (_0x464d48["getMonth"]() + 0x1))[_0x6af8a0(0xbe)](
            -0x2
          ),
          _0x2ecde6 = _0x464d48[_0x6af8a0(0xdb)](),
          _0x298867 = _0x351b77 + "/" + _0x35e587 + "/" + _0x2ecde6,
          _0x16bf92 = _0x2898c4["event"]["extendedProps"][_0x6af8a0(0x187)],
          _0xa94124 = window[_0x6af8a0(0x12c)][_0x6af8a0(0x1cd)](
            (_0x993029) => _0x993029["id"][_0x6af8a0(0x1b3)]() === _0x16bf92
          );
        _0xa94124
          ? showParticipantsModal(_0xa94124, _0x298867)
          : alert(_0x6af8a0(0x139) + _0x16bf92);
      },
    });
  _0x2ff472[_0xfe4c04(0xed)]();
}
const openCalendarBtn = document["getElementById"](_0x57a1de(0x142)),
  calendarModal = document[_0x57a1de(0x12b)]("calendarModal"),
  closeCalendar = document[_0x57a1de(0x12b)](_0x57a1de(0x105));
openCalendarBtn["addEventListener"](_0x57a1de(0x170), () => {
  const _0x168242 = _0x57a1de;
  (calendarModal[_0x168242(0x196)][_0x168242(0xc3)] = _0x168242(0x123)),
    initCalendarFromFormations();
}),
  closeCalendar[_0x57a1de(0x1ae)]("click", () => {
    const _0x30fdab = _0x57a1de;
    calendarModal[_0x30fdab(0x196)]["display"] = _0x30fdab(0xcf);
  }),
  window[_0x57a1de(0x1ae)](_0x57a1de(0x170), (_0x33f7f0) => {
    const _0x17e8aa = _0x57a1de;
    _0x33f7f0[_0x17e8aa(0x157)] === calendarModal &&
      (calendarModal[_0x17e8aa(0x196)]["display"] = _0x17e8aa(0xcf));
  }),
  document[_0x57a1de(0x12b)](_0x57a1de(0x136))[_0x57a1de(0x1ae)](
    _0x57a1de(0x186),
    async (_0x504571) => {
      const _0x1b1fa7 = _0x57a1de;
      showNotification(_0x1b1fa7(0xb6)), _0x504571[_0x1b1fa7(0x1a6)]();
      const _0x4761fc = document[_0x1b1fa7(0x12b)](_0x1b1fa7(0x190))[
          _0x1b1fa7(0xba)
        ][_0x1b1fa7(0x151)](),
        _0x2dad9c =
          document[_0x1b1fa7(0x12b)]("taskDescription")["value"][
            _0x1b1fa7(0x151)
          ](),
        _0x536584 =
          document["getElementById"]("taskImportance")[_0x1b1fa7(0xba)],
        _0x4ba7ee = _0x1b1fa7(0xfb),
        _0x42a866 =
          SCRIPT_URL +
          "?action=addTask&concerne=" +
          encodeURIComponent(_0x4761fc) +
          "&tache=" +
          encodeURIComponent(_0x2dad9c) +
          _0x1b1fa7(0x1b6) +
          encodeURIComponent(_0x536584) +
          "&etat=" +
          encodeURIComponent(_0x4ba7ee);
      try {
        const _0x1ed264 = await fetch(_0x42a866),
          _0x4fa24b = await _0x1ed264["json"]();
        _0x4fa24b[_0x1b1fa7(0x1c6)]
          ? (await fetchTasks(),
            await fetchTasksHistory(),
            document["getElementById"]("taskForm")[_0x1b1fa7(0xe3)](),
            showNotification("Tâche\x20ajoutée\x20avec\x20succès\x20!"))
          : showNotification(
              "Erreur\x20lors\x20de\x20l\x27ajout\x20de\x20la\x20tâche:\x20" +
                _0x4fa24b["error"]
            );
      } catch (_0x29f4dc) {
        console[_0x1b1fa7(0x1ce)](_0x29f4dc);
      }
    }
  );
async function fetchTasks() {
  const _0x4dc57b = _0x57a1de;
  try {
    const _0xdc696e = await fetch(SCRIPT_URL + _0x4dc57b(0x15d)),
      _0x5ccc4a = await _0xdc696e[_0x4dc57b(0xa5)](),
      _0x4c6799 = document["getElementById"](_0x4dc57b(0x1ea));
    if (
      !_0x5ccc4a ||
      !_0x5ccc4a["values"] ||
      _0x5ccc4a[_0x4dc57b(0x116)][_0x4dc57b(0x1d0)] === 0x0
    ) {
      _0x4c6799["innerHTML"] = "<p>Aucune\x20tâche\x20active.</p>";
      return;
    }
    let _0xeefe7 = _0x4dc57b(0x1e6);
    _0x5ccc4a[_0x4dc57b(0x116)][_0x4dc57b(0x19a)]((_0xaeb5fa) => {
      const _0xed02a0 = _0x4dc57b;
      _0xeefe7 +=
        _0xed02a0(0xaf) +
        _0xaeb5fa["id"] +
        "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
        _0xaeb5fa[_0xed02a0(0x1dd)] +
        _0xed02a0(0x12e) +
        _0xaeb5fa[_0xed02a0(0xf4)] +
        _0xed02a0(0xec) +
        _0xaeb5fa[_0xed02a0(0x184)][_0xed02a0(0x146)]() +
        "\x22>" +
        _0xaeb5fa[_0xed02a0(0x184)] +
        _0xed02a0(0x12e) +
        _0xaeb5fa[_0xed02a0(0x1d6)] +
        _0xed02a0(0x120) +
        _0xaeb5fa["id"] +
        _0xed02a0(0x11e) +
        _0xaeb5fa["id"] +
        "\x22>Supprimer</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>";
    }),
      (_0xeefe7 += _0x4dc57b(0xeb)),
      (_0x4c6799[_0x4dc57b(0x158)] = _0xeefe7),
      document[_0x4dc57b(0x173)](".btn-complete-task")[_0x4dc57b(0x19a)](
        (_0x247af7) => {
          const _0x771f0a = _0x4dc57b;
          _0x247af7[_0x771f0a(0x1ae)]("click", async (_0x5bf16c) => {
            const _0x2c6c51 = _0x771f0a,
              _0x2b3217 =
                _0x5bf16c[_0x2c6c51(0x157)][_0x2c6c51(0x1db)]("data-id");
            try {
              const _0x26507e = await fetch(
                  SCRIPT_URL + _0x2c6c51(0x162) + _0x2b3217 + _0x2c6c51(0xc8)
                ),
                _0x5648c5 = await _0x26507e[_0x2c6c51(0xa5)]();
              !_0x5648c5[_0x2c6c51(0x1c6)] &&
                alert(_0x2c6c51(0x1a4) + _0x5648c5[_0x2c6c51(0x1ce)]),
                await fetchTasks(),
                await fetchTasksHistory();
            } catch (_0x31cd38) {
              console[_0x2c6c51(0x1ce)](
                "Erreur\x20updateTaskState:",
                _0x31cd38
              );
            }
          });
        }
      ),
      document[_0x4dc57b(0x173)](_0x4dc57b(0x126))[_0x4dc57b(0x19a)](
        (_0xa6e908) => {
          const _0x28a09a = _0x4dc57b;
          _0xa6e908[_0x28a09a(0x1ae)](_0x28a09a(0x170), async (_0x2c8a9f) => {
            const _0x5b5d19 = _0x28a09a;
            showNotification(_0x5b5d19(0x198));
            const _0x8551d1 = _0x2c8a9f[_0x5b5d19(0x157)][_0x5b5d19(0x1db)](
              _0x5b5d19(0xfd)
            );
            await deleteTask(_0x8551d1),
              await fetchTasks(),
              setTimeout(() => {
                showNotification("Tâche\x20supprimée\x20avec\x20succès\x20!");
              }, 0x3e8);
          });
        }
      );
  } catch (_0x54c057) {
    showNotification(_0x4dc57b(0x14d));
  }
}
async function fetchTasksHistory() {
  const _0x156210 = _0x57a1de;
  try {
    const _0x5e5fb6 = await fetch(SCRIPT_URL + _0x156210(0x1c0)),
      _0x2d6602 = await _0x5e5fb6[_0x156210(0xa5)](),
      _0xaccf91 = document[_0x156210(0x12b)](_0x156210(0x114));
    if (
      !_0x2d6602 ||
      !_0x2d6602[_0x156210(0x116)] ||
      _0x2d6602[_0x156210(0x116)][_0x156210(0x1d0)] === 0x0
    ) {
      _0xaccf91[_0x156210(0x158)] = _0x156210(0x12f);
      return;
    }
    let _0x236d60 = _0x156210(0x163);
    _0x2d6602[_0x156210(0x116)]["forEach"]((_0x2307c2) => {
      const _0x192ddc = _0x156210;
      _0x236d60 +=
        _0x192ddc(0x1d3) +
        _0x2307c2["id"] +
        _0x192ddc(0x12e) +
        _0x2307c2["concerne"] +
        _0x192ddc(0xe5) +
        _0x2307c2["tache"] +
        _0x192ddc(0xec) +
        _0x2307c2[_0x192ddc(0x184)][_0x192ddc(0x146)]() +
        "\x22>" +
        _0x2307c2[_0x192ddc(0x184)] +
        _0x192ddc(0x12e) +
        _0x2307c2[_0x192ddc(0x1d6)] +
        "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td><button\x20class=\x22btn-delete-task\x22\x20data-id=\x22" +
        _0x2307c2["id"] +
        "\x22>Supprimer</button></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>";
    }),
      (_0x236d60 += "</tbody></table>"),
      (_0xaccf91["innerHTML"] = _0x236d60),
      document[_0x156210(0x173)](_0x156210(0x1bb))[_0x156210(0x19a)](
        (_0x1b81bd) => {
          const _0x14562a = _0x156210;
          _0x1b81bd[_0x14562a(0x1ae)](_0x14562a(0x170), async (_0x483a0c) => {
            const _0x345734 = _0x14562a,
              _0x52fb82 = _0x483a0c["target"][_0x345734(0x1db)]("data-id");
            await deleteTask(_0x52fb82), await fetchTasksHistory();
          });
        }
      );
  } catch (_0x216718) {
    console[_0x156210(0x1ce)](
      "Erreur\x20lors\x20de\x20la\x20récupération\x20de\x20l\x27historique\x20des\x20tâches\x20:",
      _0x216718
    );
  }
}
async function deleteTask(_0x3e8526) {
  const _0x9e982d = _0x57a1de;
  try {
    const _0x5d97b8 = await fetch(
        SCRIPT_URL + "?action=deleteTask&id=" + _0x3e8526
      ),
      _0x559a07 = await _0x5d97b8[_0x9e982d(0xa5)]();
    !_0x559a07[_0x9e982d(0x1c6)] &&
      console[_0x9e982d(0xaa)](_0x9e982d(0x16f) + _0x559a07[_0x9e982d(0x1ce)]);
  } catch (_0x7a8191) {
    console[_0x9e982d(0x1ce)](_0x9e982d(0x1d1), _0x7a8191);
  }
}
document[_0x57a1de(0x12b)]("clearHistoryBtn")["addEventListener"](
  _0x57a1de(0x170),
  async () => {
    const _0x540e9a = _0x57a1de;
    if (confirm(_0x540e9a(0x1da)))
      try {
        const _0x5bcc78 = await fetch(SCRIPT_URL + _0x540e9a(0x119)),
          _0x24932e = await _0x5bcc78[_0x540e9a(0xa5)]();
        _0x24932e[_0x540e9a(0x1c6)]
          ? await fetchTasksHistory()
          : alert(
              "Erreur\x20lors\x20de\x20l\x27effacement\x20de\x20l\x27historique:\x20" +
                _0x24932e[_0x540e9a(0x1ce)]
            );
      } catch (_0x5573aa) {
        console[_0x540e9a(0x1ce)](_0x540e9a(0x1c9), _0x5573aa);
      }
  }
);
