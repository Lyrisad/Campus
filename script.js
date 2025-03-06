const _0x36280d = _0x51c6;
(function (_0x1f2dc2, _0x190e1b) {
  const _0x51dff9 = _0x51c6,
    _0x4c66d6 = _0x1f2dc2();
  while (!![]) {
    try {
      const _0x242770 =
        -parseInt(_0x51dff9(0x91)) / 0x1 +
        parseInt(_0x51dff9(0xed)) / 0x2 +
        parseInt(_0x51dff9(0x19d)) / 0x3 +
        (parseInt(_0x51dff9(0x93)) / 0x4) * (parseInt(_0x51dff9(0x112)) / 0x5) +
        -parseInt(_0x51dff9(0x190)) / 0x6 +
        (-parseInt(_0x51dff9(0x1a4)) / 0x7) *
          (parseInt(_0x51dff9(0x15f)) / 0x8) +
        parseInt(_0x51dff9(0x141)) / 0x9;
      if (_0x242770 === _0x190e1b) break;
      else _0x4c66d6["push"](_0x4c66d6["shift"]());
    } catch (_0x3299e6) {
      _0x4c66d6["push"](_0x4c66d6["shift"]());
    }
  }
})(_0x3a9c, 0xc7981);
const SCRIPT_URL = _0x36280d(0xbd);
function parseDDMMYYYY(_0x1a1ade) {
  const _0x4153b7 = _0x36280d,
    _0x52e838 = _0x1a1ade[_0x4153b7(0x1a0)]("/");
  return new Date(_0x52e838[0x2], _0x52e838[0x1] - 0x1, _0x52e838[0x0]);
}
function isSameDate(_0x21397c, _0xaa87bb) {
  const _0x137c2d = _0x36280d;
  return (
    _0x21397c[_0x137c2d(0x17a)]() === _0xaa87bb[_0x137c2d(0x17a)]() &&
    _0x21397c[_0x137c2d(0xc0)]() === _0xaa87bb[_0x137c2d(0xc0)]() &&
    _0x21397c["getDate"]() === _0xaa87bb[_0x137c2d(0xdd)]()
  );
}
function convertDDMMYYYYToFull(_0x653d71) {
  const _0x208364 = _0x36280d,
    _0x315518 = parseDDMMYYYY(_0x653d71);
  return _0x315518[_0x208364(0x174)]();
}
function formatDateToDDMMYYYY(_0xfdd475) {
  const _0x52bbfc = _0x36280d;
  if (/^\d{2}\/\d{2}\/\d{4}$/[_0x52bbfc(0x134)](_0xfdd475)) return _0xfdd475;
  if (_0xfdd475["indexOf"]("T") !== -0x1) {
    const _0x5be6b1 = new Date(_0xfdd475);
    if (isNaN(_0x5be6b1)) return _0xfdd475;
    const _0x5d3aad = _0x5be6b1[_0x52bbfc(0xdd)]()
        [_0x52bbfc(0x174)]()
        [_0x52bbfc(0x191)](0x2, "0"),
      _0x11fcfd = (_0x5be6b1["getMonth"]() + 0x1)
        [_0x52bbfc(0x174)]()
        ["padStart"](0x2, "0"),
      _0x46236e = _0x5be6b1[_0x52bbfc(0x17a)]();
    return _0x5d3aad + "/" + _0x11fcfd + "/" + _0x46236e;
  }
  const _0x1e9212 = parseDDMMYYYY(_0xfdd475);
  if (isNaN(_0x1e9212)) return _0xfdd475;
  const _0x278e95 = _0x1e9212[_0x52bbfc(0xdd)]()
      [_0x52bbfc(0x174)]()
      [_0x52bbfc(0x191)](0x2, "0"),
    _0x488071 = (_0x1e9212["getMonth"]() + 0x1)
      [_0x52bbfc(0x174)]()
      [_0x52bbfc(0x191)](0x2, "0"),
    _0x586010 = _0x1e9212["getFullYear"]();
  return _0x278e95 + "/" + _0x488071 + "/" + _0x586010;
}
function convertDDMMYYYYToFull(_0x26840c) {
  const _0x4c4f82 = _0x36280d,
    _0x395385 = _0x26840c[_0x4c4f82(0x1a0)]("/");
  if (_0x395385[_0x4c4f82(0xae)] !== 0x3) return _0x26840c;
  const _0x1de2ea = new Date(
    _0x395385[0x2],
    _0x395385[0x1] - 0x1,
    _0x395385[0x0]
  );
  return _0x1de2ea[_0x4c4f82(0x174)]();
}
function getBlocks(_0x2abf85) {
  const _0x33f4b0 = /(\[.*?\])\s*\((.*?)\)/g;
  let _0x2afc13 = [],
    _0x3a3160;
  while ((_0x3a3160 = _0x33f4b0["exec"](_0x2abf85)) !== null) {
    _0x2afc13["push"]({
      json: _0x3a3160[0x1],
      date: _0x3a3160[0x2],
      fullBlock: _0x3a3160[0x0],
    });
  }
  return _0x2afc13;
}
const contactItems = document[_0x36280d(0x119)](_0x36280d(0x197)),
  notificationPopup = document[_0x36280d(0x103)](_0x36280d(0x15d)),
  showNotification = (_0x201a04) => {
    const _0x58a6d8 = _0x36280d,
      _0xa9b413 = notificationPopup["querySelector"]("p");
    if (_0xa9b413) _0xa9b413["textContent"] = _0x201a04;
    notificationPopup[_0x58a6d8(0x168)]["add"](_0x58a6d8(0x147)),
      notificationPopup[_0x58a6d8(0x168)][_0x58a6d8(0x159)](_0x58a6d8(0xd4)),
      setTimeout(() => {
        const _0x56855c = _0x58a6d8;
        notificationPopup[_0x56855c(0x168)][_0x56855c(0x13c)]("hidden"),
          notificationPopup[_0x56855c(0x168)][_0x56855c(0x159)]("show");
      }, 0xbb8);
  };
function getParticipantsCount(_0x48c807, _0x536c10) {
  const _0x4628ff = _0x36280d;
  let _0x3e4a33 = 0x0;
  if (_0x48c807[_0x4628ff(0xe0)]) {
    const _0x4fdd10 = /(\[.*?\])\s*\((.*?)\)/g;
    let _0x40a8a1;
    const _0x139505 = parseDDMMYYYY(_0x536c10);
    while (
      (_0x40a8a1 = _0x4fdd10["exec"](_0x48c807[_0x4628ff(0xe0)])) !== null
    ) {
      try {
        let _0x5c088e = new Date(_0x40a8a1[0x2]);
        if (isSameDate(_0x5c088e, _0x139505)) {
          const _0xaf9584 = JSON[_0x4628ff(0x126)](_0x40a8a1[0x1]);
          let _0x5b8617 = Array[_0x4628ff(0xd5)](_0xaf9584)
            ? _0xaf9584
            : [_0xaf9584];
          _0x3e4a33 += _0x5b8617[_0x4628ff(0xae)];
        }
      } catch (_0xd5173b) {
        console[_0x4628ff(0x123)](_0x4628ff(0x12c), _0xd5173b);
      }
    }
  }
  return _0x3e4a33;
}
document[_0x36280d(0x1a8)](_0x36280d(0x180), () => {
  const _0x481fd7 = initNotifications();
  initNavigation(),
    initAdminPanel(),
    initAppointmentForm(_0x481fd7),
    initEmployeeTable(),
    runArchiveProcess(),
    fetchArchives(),
    fetchTasks(),
    fetchTasksHistory();
});
function initNavigation() {
  const _0x4be615 = _0x36280d,
    _0x158c75 = document["querySelectorAll"](_0x4be615(0x151)),
    _0x475075 = document[_0x4be615(0x9f)](_0x4be615(0x19e)),
    _0x49fe80 = document[_0x4be615(0x119)](_0x4be615(0xbc)),
    _0x2f1ffe = document[_0x4be615(0x103)](_0x4be615(0x184)),
    _0x4864ff = document[_0x4be615(0x103)]("adminLogin"),
    _0x4533b9 = document[_0x4be615(0x103)](_0x4be615(0x9e)),
    _0x4d4368 = document[_0x4be615(0x119)](".back-button"),
    _0x1ad00e = document[_0x4be615(0x119)](_0x4be615(0x158)),
    _0x25ef93 = document[_0x4be615(0x119)](_0x4be615(0x150)),
    _0x5b181a = document[_0x4be615(0x103)](_0x4be615(0x14a)),
    _0x558df1 = () => {
      const _0xccb499 = _0x4be615;
      _0x49fe80[_0xccb499(0x97)]((_0x3756d0) => {
        const _0xbaff8b = _0xccb499;
        _0x3756d0[_0xbaff8b(0xa4)]["display"] = _0xbaff8b(0x1b7);
      });
    };
  _0x158c75[_0x4be615(0x97)]((_0x27b8ec) => {
    const _0x489b97 = _0x4be615;
    _0x27b8ec["addEventListener"](_0x489b97(0x16c), () => {
      const _0x27603d = _0x489b97,
        _0x5a1148 = _0x27b8ec["id"][_0x27603d(0x1b8)](_0x27603d(0xc6), ""),
        _0x35359f = document[_0x27603d(0x9f)]("#" + _0x5a1148);
      _0x35359f &&
        ((_0x4864ff["style"][_0x27603d(0xce)] = _0x27603d(0x1b7)),
        (_0x475075[_0x27603d(0xa4)]["display"] = _0x27603d(0x1b7)),
        (_0x2f1ffe[_0x27603d(0xa4)][_0x27603d(0xce)] = _0x27603d(0x1b7)),
        _0x558df1(),
        (_0x35359f["style"][_0x27603d(0xce)] = _0x27603d(0xad)));
    });
  }),
    _0x4d4368[_0x4be615(0x97)]((_0x535309) => {
      const _0x510a22 = _0x4be615;
      _0x535309[_0x510a22(0x1a8)](_0x510a22(0x16c), () => {
        const _0x420d76 = _0x510a22;
        (_0x475075[_0x420d76(0xa4)]["display"] = "flex"),
          (_0x4864ff[_0x420d76(0xa4)][_0x420d76(0xce)] = "none"),
          (_0x2f1ffe[_0x420d76(0xa4)][_0x420d76(0xce)] = _0x420d76(0x1b7)),
          (_0x5b181a[_0x420d76(0xa4)][_0x420d76(0xce)] = _0x420d76(0x1b7)),
          _0x558df1();
        const _0x564d85 = document["getElementById"](_0x420d76(0x116));
        if (_0x564d85) {
          const _0xeafa76 =
              _0x564d85["getBoundingClientRect"]()["top"] +
              window[_0x420d76(0x157)],
            _0x52d0d8 = window[_0x420d76(0xc9)] / 0xa;
          window[_0x420d76(0x12f)]({
            top: _0xeafa76 - _0x52d0d8,
            behavior: _0x420d76(0x11f),
          });
        }
      });
    }),
    _0x1ad00e["forEach"]((_0x44adda) => {
      _0x44adda["addEventListener"]("click", (_0x4d8c8b) => {
        const _0x2e14d2 = _0x51c6;
        _0x4d8c8b[_0x2e14d2(0x95)]();
        const _0x362b7b = _0x44adda[_0x2e14d2(0x12d)](_0x2e14d2(0x1b2)),
          _0x5c2987 = document["getElementById"](_0x362b7b);
        _0x5c2987 &&
          ((_0x475075[_0x2e14d2(0xa4)][_0x2e14d2(0xce)] = _0x2e14d2(0xad)),
          (_0x2f1ffe[_0x2e14d2(0xa4)][_0x2e14d2(0xce)] = "none"),
          _0x558df1(),
          (_0x4864ff[_0x2e14d2(0xa4)][_0x2e14d2(0xce)] = _0x2e14d2(0x1b7)),
          (_0x5b181a[_0x2e14d2(0xa4)]["display"] = _0x2e14d2(0x1b7)),
          setTimeout(() => {
            const _0x393cdc = _0x2e14d2,
              _0x200ed8 =
                _0x5c2987["getBoundingClientRect"]()[_0x393cdc(0x1ac)] +
                window[_0x393cdc(0x157)],
              _0x14f45b = window[_0x393cdc(0xc9)] / 0xa;
            window[_0x393cdc(0x12f)]({
              top: _0x200ed8 - _0x14f45b,
              behavior: _0x393cdc(0x11f),
            });
          }, 0x64));
      });
    }),
    _0x25ef93["forEach"]((_0x253759) => {
      const _0x332c23 = _0x4be615;
      _0x253759["addEventListener"](_0x332c23(0x16c), () => {
        const _0xfcd10b = _0x332c23;
        (_0x2f1ffe["style"]["display"] = _0xfcd10b(0xad)),
          _0x558df1(),
          (_0x475075["style"][_0xfcd10b(0xce)] = _0xfcd10b(0x1b7)),
          (_0x4864ff["style"][_0xfcd10b(0xce)] = _0xfcd10b(0x1b7)),
          (_0x5b181a[_0xfcd10b(0xa4)]["display"] = _0xfcd10b(0x1b7));
      });
    }),
    _0x4533b9[_0x4be615(0x1a8)](_0x4be615(0x16c), () => {
      const _0x2b022a = _0x4be615;
      getCookie(_0x2b022a(0x1b6)) === _0x2b022a(0x182)
        ? ((document[_0x2b022a(0x103)](_0x2b022a(0x14a))["style"][
            _0x2b022a(0xce)
          ] = "flex"),
          (document[_0x2b022a(0x103)](_0x2b022a(0x164))[_0x2b022a(0xa4)][
            _0x2b022a(0xce)
          ] = _0x2b022a(0x1b7)))
        : ((document["getElementById"]("adminLogin")[_0x2b022a(0xa4)][
            "display"
          ] = _0x2b022a(0xad)),
          (document[_0x2b022a(0x103)](_0x2b022a(0x14a))[_0x2b022a(0xa4)][
            _0x2b022a(0xce)
          ] = "none")),
        _0x558df1(),
        (_0x475075[_0x2b022a(0xa4)]["display"] = _0x2b022a(0x1b7)),
        (_0x2f1ffe[_0x2b022a(0xa4)][_0x2b022a(0xce)] = _0x2b022a(0x1b7));
    });
}
function initNotifications() {
  const _0x595c5c = _0x36280d,
    _0x6c5054 = document[_0x595c5c(0x119)](_0x595c5c(0x197)),
    _0x3639f7 = document[_0x595c5c(0x103)](_0x595c5c(0x15d)),
    _0x32e4a2 = (_0x300fa7) => {
      const _0x368c12 = _0x595c5c,
        _0xe9ffb1 = _0x3639f7["querySelector"]("p");
      if (_0xe9ffb1) _0xe9ffb1[_0x368c12(0x87)] = _0x300fa7;
      _0x3639f7["classList"]["add"]("show"),
        _0x3639f7[_0x368c12(0x168)][_0x368c12(0x159)](_0x368c12(0xd4)),
        setTimeout(() => {
          const _0x47a469 = _0x368c12;
          _0x3639f7[_0x47a469(0x168)][_0x47a469(0x13c)](_0x47a469(0xd4)),
            _0x3639f7[_0x47a469(0x168)][_0x47a469(0x159)](_0x47a469(0x147));
        }, 0xbb8);
    };
  return (
    _0x6c5054[_0x595c5c(0x97)]((_0x25c772) => {
      const _0x4dafb7 = _0x595c5c;
      _0x25c772[_0x4dafb7(0x1a8)]("click", () => {
        const _0x31e94c = _0x4dafb7,
          _0x57f674 = _0x25c772[_0x31e94c(0x12d)](_0x31e94c(0x18d));
        _0x57f674 &&
          navigator[_0x31e94c(0xe3)]
            ["writeText"](_0x57f674)
            [_0x31e94c(0x140)](() =>
              _0x32e4a2(_0x31e94c(0x1b1) + _0x57f674 + ")")
            )
            [_0x31e94c(0xef)]((_0x20a9ec) =>
              console["error"](_0x31e94c(0xbf), _0x20a9ec)
            );
      });
    }),
    _0x32e4a2
  );
}
function initAdminPanel() {
  const _0x5564fb = _0x36280d,
    _0x262fbb = document["getElementById"](_0x5564fb(0x14a)),
    _0x21eabe = document[_0x5564fb(0x103)](_0x5564fb(0x164)),
    _0x35397e = document["getElementById"]("username"),
    _0x1426f0 = document["getElementById"]("password"),
    _0x1fc390 = document[_0x5564fb(0x103)]("submitLogin"),
    _0x895dd5 = document["getElementById"]("errorMessage"),
    _0x50b232 = document[_0x5564fb(0x103)](_0x5564fb(0x176)),
    _0x246bd1 = document[_0x5564fb(0x103)](_0x5564fb(0xb3)),
    _0x94b758 = document[_0x5564fb(0x103)](_0x5564fb(0xc2))["querySelector"](
      _0x5564fb(0x11a)
    ),
    _0x487d40 = document["getElementById"](_0x5564fb(0x130)),
    _0x4c6425 = document[_0x5564fb(0x103)](_0x5564fb(0xd0)),
    _0x32efcb = document["getElementById"](_0x5564fb(0x171)),
    _0x1cb753 = document[_0x5564fb(0x103)](_0x5564fb(0x10a)),
    _0x3d7870 = document[_0x5564fb(0x103)]("closeModal"),
    _0x51b6ac = "CampusCandor",
    _0x4824a9 = _0x5564fb(0x163);
  let _0x2325fc = [],
    _0x50fe90 = [];
  const _0x39ae89 = (_0x48b685) => {
      const _0xb02008 = _0x5564fb;
      (_0x895dd5[_0xb02008(0x87)] = _0x48b685),
        (_0x895dd5[_0xb02008(0xa4)]["color"] = "red");
    },
    _0x55deaf = () => {
      const _0x176ffd = _0x5564fb;
      _0x895dd5[_0x176ffd(0x87)] = "";
    },
    _0x30a2cc = async () => {
      const _0x3accb7 = _0x5564fb;
      try {
        const _0x2f898e = await fetch(SCRIPT_URL + _0x3accb7(0x1ba)),
          _0x3106e4 = await _0x2f898e[_0x3accb7(0xfd)]();
        if (!_0x3106e4 || !_0x3106e4[_0x3accb7(0x178)]) {
          (_0x2325fc = []), _0x418532();
          return;
        }
        (_0x2325fc = _0x3106e4[_0x3accb7(0x178)][_0x3accb7(0x9d)](
          (_0x4c1369) => ({
            id: parseInt(_0x4c1369["id"]),
            name: _0x4c1369[_0x3accb7(0x1a1)],
            availableDates: _0x4c1369[_0x3accb7(0xb8)],
            participants: _0x4c1369[_0x3accb7(0xe0)],
          })
        )),
          (window[_0x3accb7(0x188)] = _0x2325fc),
          _0x418532();
      } catch (_0x10790c) {
        console[_0x3accb7(0x123)](
          "Erreur\x20lors\x20de\x20la\x20récupération\x20des\x20formations\x20:",
          _0x10790c["message"]
        );
      }
    };
  window["fetchFormations"] = _0x30a2cc;
  const _0x174101 = async (_0x164a97, _0x533a61) => {
      const _0x1e60fc = _0x5564fb,
        _0x317bc3 =
          _0x2325fc[_0x1e60fc(0xae)] > 0x0
            ? Math[_0x1e60fc(0x142)](
                ..._0x2325fc[_0x1e60fc(0x9d)]((_0x35c66d) => _0x35c66d["id"])
              ) + 0x1
            : 0x1;
      try {
        const _0x2be3e3 =
            SCRIPT_URL +
            _0x1e60fc(0xf4) +
            _0x317bc3 +
            "&name=" +
            encodeURIComponent(_0x164a97) +
            "&dates=" +
            encodeURIComponent(_0x533a61[_0x1e60fc(0x8a)](",")),
          _0x7573a8 = await fetch(_0x2be3e3),
          _0x3aff6c = await _0x7573a8[_0x1e60fc(0xfd)]();
        console["log"]("Ajout\x20:", _0x3aff6c), await _0x30a2cc();
      } catch (_0x57528b) {
        console["error"](
          "Erreur\x20lors\x20de\x20l\x27ajout\x20de\x20la\x20formation\x20:",
          _0x57528b[_0x1e60fc(0xf9)]
        );
      }
    },
    _0x323e44 = async (_0x329678, _0xaab575, _0x12be44) => {
      const _0x53ec25 = _0x5564fb;
      try {
        const _0x3c561d =
            SCRIPT_URL +
            _0x53ec25(0x139) +
            _0x329678 +
            _0x53ec25(0xd6) +
            encodeURIComponent(_0xaab575) +
            _0x53ec25(0x146) +
            encodeURIComponent(_0x12be44["join"](",")),
          _0x1ac031 = await fetch(_0x3c561d),
          _0x3910e1 = await _0x1ac031[_0x53ec25(0xfd)]();
        console[_0x53ec25(0xe4)](_0x53ec25(0x10d), _0x3910e1),
          await _0x30a2cc();
      } catch (_0x147455) {
        console[_0x53ec25(0x123)](
          "Erreur\x20lors\x20de\x20la\x20mise\x20à\x20jour\x20de\x20la\x20formation\x20:",
          _0x147455[_0x53ec25(0xf9)]
        );
      }
    },
    _0xdbd446 = async (_0x5ba23c) => {
      const _0x10fe8e = _0x5564fb;
      try {
        const _0x200410 = SCRIPT_URL + "?action=delete&id=" + _0x5ba23c,
          _0x4dadc8 = await fetch(_0x200410),
          _0x175717 = await _0x4dadc8["json"]();
        console["log"](_0x10fe8e(0xb0), _0x175717), await _0x30a2cc();
      } catch (_0x118487) {
        console[_0x10fe8e(0x123)](_0x10fe8e(0x131), _0x118487[_0x10fe8e(0xf9)]);
      }
    },
    _0x418532 = () => {
      const _0x3b0479 = _0x5564fb;
      (_0x94b758["innerHTML"] = ""),
        _0x2325fc[_0x3b0479(0x97)]((_0x479d63) => {
          const _0x3dd8c3 = _0x3b0479,
            _0x545ba9 = document[_0x3dd8c3(0xc1)]("tr");
          (_0x545ba9[_0x3dd8c3(0xb7)] =
            _0x3dd8c3(0x129) +
            _0x479d63["id"] +
            _0x3dd8c3(0x162) +
            _0x479d63["name"] +
            "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
            (_0x479d63[_0x3dd8c3(0xb8)]
              ? _0x52e048(_0x479d63[_0x3dd8c3(0xb8)], _0x479d63)
              : "") +
            "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22edit-formation\x22\x20data-id=\x22" +
            _0x479d63["id"] +
            _0x3dd8c3(0xca) +
            _0x479d63["id"] +
            _0x3dd8c3(0xd3)),
            _0x94b758[_0x3dd8c3(0x172)](_0x545ba9);
        }),
        document[_0x3b0479(0x119)](_0x3b0479(0x16b))["forEach"]((_0x56b58b) => {
          const _0xf0e294 = _0x3b0479;
          _0x56b58b[_0xf0e294(0x1a8)](_0xf0e294(0x16c), () => {
            const _0x20d6ee = _0xf0e294,
              _0x49265d = _0x56b58b["getAttribute"](_0x20d6ee(0x175)),
              _0x555a67 = _0x56b58b[_0x20d6ee(0x12d)](_0x20d6ee(0x125)),
              _0xb1385a = _0x2325fc["find"](
                (_0xc49920) => _0xc49920["id"] === parseInt(_0x49265d)
              );
            _0xb1385a && showParticipantsModal(_0xb1385a, _0x555a67);
          });
        });
    };
  window[_0x5564fb(0x188)] = _0x2325fc;
  function _0x52e048(_0x436c68, _0x4296f8) {
    const _0x2e1a52 = _0x5564fb;
    if (!_0x436c68) return "";
    let _0x5c0d6a = _0x436c68[_0x2e1a52(0x1a0)](",");
    return _0x5c0d6a[_0x2e1a52(0x9d)]((_0x103834) => {
      const _0x248ceb = _0x2e1a52;
      let _0x478938 = _0x103834[_0x248ceb(0x15a)](),
        _0x35a6db = formatDateToDDMMYYYY(_0x478938),
        _0x25c974 = _0x4296f8
          ? getParticipantsCount(_0x4296f8, _0x35a6db)
          : 0x0,
        _0x3abed9 = "#3333";
      if (_0x25c974 > 0x0 && _0x25c974 < 0x6) _0x3abed9 = "#FFA500";
      else _0x25c974 >= 0x6 && (_0x3abed9 = _0x248ceb(0x9b));
      return (
        _0x248ceb(0x10e) +
        _0x4296f8["id"] +
        _0x248ceb(0xb2) +
        _0x35a6db +
        _0x248ceb(0xa8) +
        _0x3abed9 +
        _0x248ceb(0x179) +
        _0x35a6db +
        "\x20(" +
        _0x25c974 +
        _0x248ceb(0xe5)
      );
    })["join"]("\x20");
  }
  const _0x10d8f7 = async () => {
      const _0x2e2e86 = _0x5564fb;
      try {
        const _0x590938 = await fetch(SCRIPT_URL + _0x2e2e86(0x101)),
          _0x117a60 = await _0x590938[_0x2e2e86(0xfd)]();
        if (!_0x117a60 || !_0x117a60[_0x2e2e86(0x178)]) {
          (_0x50fe90 = []), _0x58d6ef();
          return;
        }
        (_0x50fe90 = _0x117a60[_0x2e2e86(0x178)]), _0x58d6ef();
      } catch (_0x29461f) {
        console[_0x2e2e86(0x123)](_0x2e2e86(0x89), _0x29461f[_0x2e2e86(0xf9)]);
      }
    },
    _0x58d6ef = () => {
      const _0x3d6cf2 = _0x5564fb,
        _0x5abf7b = document["getElementById"](_0x3d6cf2(0x192));
      if (!_0x50fe90 || _0x50fe90["length"] === 0x0)
        _0x5abf7b[_0x3d6cf2(0xb7)] = _0x3d6cf2(0x11c);
      else {
        _0x5abf7b[_0x3d6cf2(0xb7)] = _0x3d6cf2(0x17d);
        const _0x36d683 = document["getElementById"](_0x3d6cf2(0x137)),
          _0x4232f1 = _0x36d683[_0x3d6cf2(0x9f)](_0x3d6cf2(0x11a));
        _0x50fe90[_0x3d6cf2(0x97)]((_0xd2def9) => {
          const _0x34bb3b = _0x3d6cf2;
          let _0x7e1c2a = _0xd2def9["date"];
          if (_0xd2def9["date"]) {
            let _0x260809 = new Date(_0xd2def9[_0x34bb3b(0x94)]);
            if (!isNaN(_0x260809)) {
              let _0x5bdb8f = _0x260809[_0x34bb3b(0xdd)]()
                  [_0x34bb3b(0x174)]()
                  [_0x34bb3b(0x191)](0x2, "0"),
                _0x5f34e7 = (_0x260809[_0x34bb3b(0xc0)]() + 0x1)
                  ["toString"]()
                  ["padStart"](0x2, "0"),
                _0x1cb59a = _0x260809[_0x34bb3b(0x17a)]();
              _0x7e1c2a = _0x5bdb8f + "/" + _0x5f34e7 + "/" + _0x1cb59a;
            }
          }
          let _0x203295 = "";
          try {
            const _0x31ea60 = JSON[_0x34bb3b(0x126)](
              _0xd2def9[_0x34bb3b(0xf5)]
            );
            Array[_0x34bb3b(0xd5)](_0x31ea60)
              ? (_0x203295 = _0x31ea60[_0x34bb3b(0x9d)](
                  (_0x18340d) =>
                    _0x18340d[_0x34bb3b(0xaa)] +
                    "\x20-\x20" +
                    _0x18340d[_0x34bb3b(0x195)] +
                    "\x20(" +
                    _0x18340d["entity"] +
                    ")"
                )["join"](_0x34bb3b(0x18a)))
              : (_0x203295 = _0xd2def9[_0x34bb3b(0xf5)]);
          } catch (_0x384222) {
            _0x203295 = _0xd2def9[_0x34bb3b(0xf5)];
          }
          const _0x43a567 = document[_0x34bb3b(0xc1)]("tr");
          (_0x43a567[_0x34bb3b(0xb7)] =
            "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
            _0xd2def9["id"] +
            _0x34bb3b(0x10b) +
            _0xd2def9[_0x34bb3b(0x17b)] +
            _0x34bb3b(0x10b) +
            _0xd2def9[_0x34bb3b(0x128)] +
            _0x34bb3b(0x10b) +
            _0xd2def9[_0x34bb3b(0x106)] +
            _0x34bb3b(0x10b) +
            _0xd2def9[_0x34bb3b(0x115)] +
            _0x34bb3b(0x10b) +
            _0x7e1c2a +
            "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
            _0xd2def9[_0x34bb3b(0xf9)] +
            "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22employeesList\x22>" +
            _0x203295 +
            _0x34bb3b(0x104) +
            _0xd2def9["id"] +
            _0x34bb3b(0x88) +
            _0xd2def9["id"] +
            "\x22>Refuser</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20"),
            _0x4232f1["appendChild"](_0x43a567);
        }),
          _0x4232f1[_0x3d6cf2(0x1a8)](_0x3d6cf2(0x16c), (_0x2cb74d) => {
            const _0x219efb = _0x3d6cf2,
              _0x4ce9ad = _0x2cb74d[_0x219efb(0xa2)],
              _0x3598a5 = parseInt(_0x4ce9ad[_0x219efb(0x12d)]("data-id"));
            _0x4ce9ad["classList"][_0x219efb(0x13f)]("btn-accept") &&
              _0x368a92(_0x3598a5),
              _0x4ce9ad[_0x219efb(0x168)]["contains"](_0x219efb(0x19a)) &&
                _0x51d84e(_0x3598a5);
          });
      }
    },
    _0x368a92 = async (_0x5e2061) => {
      const _0x1d4a46 = _0x5564fb;
      try {
        const _0x3a891b = SCRIPT_URL + "?action=accept&id=" + _0x5e2061,
          _0x1ff73a = await fetch(_0x3a891b),
          _0x5aa736 = await _0x1ff73a[_0x1d4a46(0xfd)]();
        console[_0x1d4a46(0xe4)](_0x1d4a46(0x154), _0x5aa736),
          await _0x10d8f7(),
          await _0x30a2cc(),
          showNotification(_0x1d4a46(0x1a7));
      } catch (_0x319072) {
        console[_0x1d4a46(0x123)](
          "Erreur\x20lors\x20de\x20l\x27acceptation\x20de\x20la\x20demande\x20:",
          _0x319072["message"]
        );
      }
    },
    _0x51d84e = async (_0x3e76f7) => {
      const _0x1a3523 = _0x5564fb;
      try {
        const _0x535351 = SCRIPT_URL + _0x1a3523(0x9a) + _0x3e76f7,
          _0xbf6868 = await fetch(_0x535351),
          _0x2a58e8 = await _0xbf6868[_0x1a3523(0xfd)]();
        console[_0x1a3523(0xe4)](_0x1a3523(0x153), _0x2a58e8),
          await _0x10d8f7(),
          showNotification(_0x1a3523(0xa3));
      } catch (_0x2a612e) {
        console[_0x1a3523(0x123)](_0x1a3523(0xfc), _0x2a612e[_0x1a3523(0xf9)]);
      }
    };
  document[_0x5564fb(0x103)]("pendingRequestsTable") &&
    document[_0x5564fb(0x103)](_0x5564fb(0x137))["addEventListener"](
      _0x5564fb(0x16c),
      (_0x38a028) => {
        const _0x5b8581 = _0x5564fb,
          _0x403e42 = _0x38a028[_0x5b8581(0xa2)],
          _0x4df37c = parseInt(_0x403e42[_0x5b8581(0x12d)](_0x5b8581(0xe7)));
        _0x403e42[_0x5b8581(0x168)][_0x5b8581(0x13f)](_0x5b8581(0x181)) &&
          _0x368a92(_0x4df37c),
          _0x403e42[_0x5b8581(0x168)][_0x5b8581(0x13f)](_0x5b8581(0x19a)) &&
            _0x51d84e(_0x4df37c);
      }
    );
  let _0x595c9a = ![],
    _0x1a98c6 = null;
  const _0x193a1b = (_0x1afc06, _0x26dfce = null) => {
      const _0x35edf5 = _0x5564fb;
      (_0x4c6425["textContent"] = _0x1afc06),
        (_0x32efcb["value"] = _0x26dfce ? _0x26dfce["name"] : ""),
        _0x26dfce && _0x26dfce[_0x35edf5(0xb8)]
          ? (_0x1cb753[_0x35edf5(0x1a6)] = _0x26dfce[_0x35edf5(0xb8)]
              [_0x35edf5(0x1a0)](",")
              ["map"]((_0x27bd98) => formatDateToDDMMYYYY(_0x27bd98["trim"]()))
              ["join"](",\x20"))
          : (_0x1cb753["value"] = ""),
        (_0x595c9a = !!_0x26dfce),
        (_0x1a98c6 = _0x26dfce ? _0x26dfce["id"] : null),
        (_0x487d40[_0x35edf5(0xa4)][_0x35edf5(0xce)] = _0x35edf5(0xad));
    },
    _0x34d9e9 = () => {
      const _0x20138b = _0x5564fb;
      (_0x487d40[_0x20138b(0xa4)][_0x20138b(0xce)] = _0x20138b(0x1b7)),
        formationForm[_0x20138b(0xbb)]();
    };
  getCookie("adminAuth") === _0x5564fb(0x182) && (_0x30a2cc(), _0x10d8f7()),
    _0x1fc390[_0x5564fb(0x1a8)](_0x5564fb(0x16c), () => {
      const _0x5a78af = _0x5564fb,
        _0x1608c8 = _0x35397e[_0x5a78af(0x1a6)][_0x5a78af(0x15a)](),
        _0x35d094 = _0x1426f0[_0x5a78af(0x1a6)];
      _0x1608c8 === _0x51b6ac && _0x35d094 === _0x4824a9
        ? (_0x55deaf(),
          setCookie("adminAuth", _0x5a78af(0x182), 0x7),
          (_0x21eabe[_0x5a78af(0xa4)]["display"] = _0x5a78af(0x1b7)),
          (document[_0x5a78af(0x103)](_0x5a78af(0x14a))["style"][
            _0x5a78af(0xce)
          ] = _0x5a78af(0xad)),
          _0x30a2cc(),
          _0x10d8f7())
        : _0x39ae89("Identifiant\x20ou\x20mot\x20de\x20passe\x20incorrect.");
    }),
    _0x50b232[_0x5564fb(0x1a8)](_0x5564fb(0x16c), () => {
      const _0x2f3c90 = _0x5564fb;
      (document[_0x2f3c90(0x103)]("adminPanel")[_0x2f3c90(0xa4)]["display"] =
        _0x2f3c90(0x1b7)),
        (_0x21eabe[_0x2f3c90(0xa4)]["display"] = "flex"),
        (_0x35397e[_0x2f3c90(0x1a6)] = ""),
        (_0x1426f0[_0x2f3c90(0x1a6)] = ""),
        _0x55deaf(),
        eraseCookie(_0x2f3c90(0x1b6));
    }),
    _0x246bd1[_0x5564fb(0x1a8)](_0x5564fb(0x16c), () => {
      const _0x2e8087 = _0x5564fb;
      _0x193a1b(_0x2e8087(0x138));
    }),
    formationForm["addEventListener"](_0x5564fb(0x199), async (_0x23adb0) => {
      const _0x1fd119 = _0x5564fb;
      showNotification(
        "Enregistrement\x20en\x20cours,\x20veuillez\x20patienter.."
      ),
        setTimeout(() => {
          showNotification("Formation\x20enregistrée\x20avec\x20succès\x20!");
        }, 0xfa0),
        _0x23adb0[_0x1fd119(0x95)]();
      const _0x1bd43f = _0x32efcb["value"][_0x1fd119(0x15a)](),
        _0x33f3fa = _0x1cb753[_0x1fd119(0x1a6)]
          ["split"](",")
          [_0x1fd119(0x9d)]((_0x350d27) => _0x350d27[_0x1fd119(0x15a)]());
      _0x595c9a
        ? await _0x323e44(_0x1a98c6, _0x1bd43f, _0x33f3fa)
        : await _0x174101(_0x1bd43f, _0x33f3fa),
        _0x34d9e9();
    }),
    _0x3d7870[_0x5564fb(0x1a8)](_0x5564fb(0x16c), _0x34d9e9),
    _0x94b758["addEventListener"](_0x5564fb(0x16c), async (_0x5e2247) => {
      const _0x5f46c1 = _0x5564fb,
        _0x2daab9 = _0x5e2247[_0x5f46c1(0xa2)],
        _0x16d966 = parseInt(_0x2daab9[_0x5f46c1(0x12d)](_0x5f46c1(0xe7)));
      if (_0x2daab9["classList"][_0x5f46c1(0x13f)]("edit-formation")) {
        const _0x3ef9d0 = _0x2325fc["find"](
          (_0x13ce7f) => _0x13ce7f["id"] === _0x16d966
        );
        _0x193a1b(_0x5f46c1(0xfe), _0x3ef9d0);
      } else {
        if (_0x2daab9[_0x5f46c1(0x168)][_0x5f46c1(0x13f)](_0x5f46c1(0x187))) {
          const _0x53532b = await customConfirm(_0x5f46c1(0x185));
          _0x53532b &&
            (showNotification(
              "Suppression\x20en\x20cours,\x20veuillez\x20patienter.."
            ),
            setTimeout(() => {
              const _0x146d18 = _0x5f46c1;
              showNotification(_0x146d18(0x189));
            }, 0xfa0),
            await _0xdbd446(_0x16d966));
        }
      }
    });
}
function customConfirm(_0x5ddd3c) {
  return new Promise((_0x1567ef) => {
    const _0x6a4453 = _0x51c6,
      _0xd3a489 = document[_0x6a4453(0x103)](_0x6a4453(0x99)),
      _0x5dbed8 = document[_0x6a4453(0x103)](_0x6a4453(0xcf)),
      _0x3f182e = document["getElementById"]("confirmYes2"),
      _0x3820c0 = document["getElementById"](_0x6a4453(0x1ad));
    (_0x5dbed8[_0x6a4453(0x87)] = _0x5ddd3c),
      (_0xd3a489[_0x6a4453(0xa4)][_0x6a4453(0xce)] = "block");
    function _0x5404db() {
      const _0x36d539 = _0x6a4453;
      (_0xd3a489[_0x36d539(0xa4)][_0x36d539(0xce)] = _0x36d539(0x1b7)),
        _0x3f182e[_0x36d539(0x118)](_0x36d539(0x16c), _0x1c1a8b),
        _0x3820c0["removeEventListener"](_0x36d539(0x16c), _0x262e67);
    }
    function _0x1c1a8b() {
      _0x5404db(), _0x1567ef(!![]);
    }
    function _0x262e67() {
      _0x5404db(), _0x1567ef(![]);
    }
    _0x3f182e[_0x6a4453(0x1a8)](_0x6a4453(0x16c), _0x1c1a8b),
      _0x3820c0[_0x6a4453(0x1a8)](_0x6a4453(0x16c), _0x262e67);
  });
}
function showParticipantsModal(_0x28b04c, _0x403f9a) {
  const _0x5ddd5f = _0x36280d;
  console[_0x5ddd5f(0xe4)](_0x5ddd5f(0x1b4), _0x28b04c, _0x403f9a);
  const _0x330c89 = document[_0x5ddd5f(0x103)]("participantsModal"),
    _0x1b9ef4 = document["getElementById"](_0x5ddd5f(0x9c)),
    _0x26e8f9 = document[_0x5ddd5f(0x103)](_0x5ddd5f(0x1b5)),
    _0x32355f = document[_0x5ddd5f(0x103)](_0x5ddd5f(0x17e));
  (_0x1b9ef4["textContent"] = _0x403f9a),
    (_0x26e8f9["textContent"] = _0x28b04c[_0x5ddd5f(0x1a1)]);
  const _0x4b138d = /(\[.*?\])\s*\((.*?)\)/g;
  let _0x3b746e = [],
    _0x27b883;
  const _0x4a5147 = parseDDMMYYYY(_0x403f9a);
  while (
    (_0x27b883 = _0x4b138d[_0x5ddd5f(0x8b)](_0x28b04c[_0x5ddd5f(0xe0)])) !==
    null
  ) {
    try {
      let _0x4fa2f1 = new Date(_0x27b883[0x2]);
      isSameDate(_0x4fa2f1, _0x4a5147) && _0x3b746e["push"](_0x27b883[0x0]);
    } catch (_0x4b2018) {
      console[_0x5ddd5f(0x123)](
        "Erreur\x20lors\x20du\x20parsing\x20des\x20blocs\x20:",
        _0x4b2018
      );
    }
  }
  let _0x4465dc = [];
  _0x3b746e[_0x5ddd5f(0x97)]((_0x594705) => {
    const _0x5a4049 = _0x5ddd5f,
      _0x26bf4d = _0x594705["match"](/(\[.*?\])\s*\((.*?)\)/);
    if (_0x26bf4d && _0x26bf4d[0x1])
      try {
        const _0x970c18 = JSON[_0x5a4049(0x126)](_0x26bf4d[0x1]);
        let _0x3d586f = Array[_0x5a4049(0xd5)](_0x970c18)
          ? _0x970c18
          : [_0x970c18];
        _0x4465dc = _0x4465dc[_0x5a4049(0x117)](_0x3d586f);
      } catch (_0x485741) {
        console["error"](
          "Erreur\x20lors\x20du\x20parsing\x20d\x27un\x20bloc\x20:",
          _0x485741
        );
      }
  });
  let _0x4adba2 = "";
  if (_0x4465dc[_0x5ddd5f(0xae)] === 0x0) _0x4adba2 += _0x5ddd5f(0xda);
  else {
    _0x4adba2 += _0x5ddd5f(0xd8);
    let _0x1644b3 = getBlocks(_0x28b04c["participants"])[_0x5ddd5f(0x8e)](
      (_0x51a6eb) => {
        const _0xe59eb2 = _0x5ddd5f;
        let _0x525d9c = new Date(_0x51a6eb[_0xe59eb2(0x94)]);
        return isSameDate(_0x525d9c, _0x4a5147);
      }
    );
    _0x1644b3[_0x5ddd5f(0x97)]((_0x50b886, _0x168c9c) => {
      const _0x43e7ce = _0x5ddd5f;
      try {
        const _0x5ca17c = JSON["parse"](_0x50b886[_0x43e7ce(0xfd)]),
          _0x10458d = Array["isArray"](_0x5ca17c) ? _0x5ca17c[0x0] : _0x5ca17c;
        _0x4adba2 +=
          _0x43e7ce(0xe8) +
          (_0x168c9c + 0x1) +
          _0x43e7ce(0x173) +
          _0x10458d[_0x43e7ce(0xaa)] +
          _0x43e7ce(0x173) +
          _0x10458d["nameEmployee"] +
          "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>" +
          _0x10458d[_0x43e7ce(0x8d)] +
          _0x43e7ce(0x149) +
          _0x168c9c +
          _0x43e7ce(0x1a5);
      } catch (_0xf9c2c0) {
        console[_0x43e7ce(0x123)](_0x43e7ce(0xdb), _0xf9c2c0);
      }
    }),
      (_0x4adba2 += _0x5ddd5f(0x186));
  }
  (_0x4adba2 += _0x5ddd5f(0xc7)),
    (_0x32355f[_0x5ddd5f(0xb7)] = _0x4adba2),
    (_0x330c89[_0x5ddd5f(0xa4)][_0x5ddd5f(0xce)] = _0x5ddd5f(0xad)),
    document["getElementById"]("btnAddParticipant")[_0x5ddd5f(0x1a8)](
      _0x5ddd5f(0x16c),
      () => {
        const _0x189685 = _0x5ddd5f;
        document["getElementById"](_0x189685(0xff))[_0x189685(0x1b0)] = !![];
        const _0x363e6c =
            document[_0x189685(0x103)]("newMatricule")[_0x189685(0x1a6)][
              _0x189685(0x15a)
            ](),
          _0x34ab12 = document[_0x189685(0x103)](_0x189685(0xeb))[
            _0x189685(0x1a6)
          ]["trim"](),
          _0x3e2d02 =
            document[_0x189685(0x103)]("newEntity")[_0x189685(0x1a6)][
              _0x189685(0x15a)
            ]();
        if (!_0x363e6c || !_0x34ab12 || !_0x3e2d02) {
          (document["getElementById"](_0x189685(0xff))[_0x189685(0x1b0)] = ![]),
            showNotification(_0x189685(0x148));
          return;
        }
        showNotification(_0x189685(0xa9));
        const _0x415ac7 = {
          matricule: _0x363e6c,
          nameEmployee: _0x34ab12,
          entity: _0x3e2d02,
        };
        addParticipantToFormation(_0x28b04c, _0x403f9a, _0x415ac7),
          setTimeout(() => {
            const _0x274268 = _0x189685;
            (document[_0x274268(0x103)](_0x274268(0xff))["disabled"] = ![]),
              showNotification(_0x274268(0xe9)),
              window["fetchFormations"]();
          }, 0xfa0);
      }
    ),
    document["querySelectorAll"](_0x5ddd5f(0x16e))[_0x5ddd5f(0x97)](
      (_0x4a9b9d) => {
        const _0x2d0dc9 = _0x5ddd5f;
        _0x4a9b9d[_0x2d0dc9(0x1a8)]("click", () => {
          const _0x5aed43 = _0x2d0dc9;
          showNotification(_0x5aed43(0xcc));
          const _0x6f6106 = parseInt(
            _0x4a9b9d[_0x5aed43(0x12d)](_0x5aed43(0x194))
          );
          removeParticipantFromFormation(_0x28b04c, _0x403f9a, _0x6f6106),
            setTimeout(() => {
              const _0x2a2a59 = _0x5aed43;
              showNotification(_0x2a2a59(0x144));
            }, 0xfa0);
        });
      }
    );
}
document[_0x36280d(0x103)](_0x36280d(0x14f))["addEventListener"](
  _0x36280d(0x16c),
  () => {
    const _0x1d33dc = _0x36280d;
    document[_0x1d33dc(0x103)](_0x1d33dc(0xdc))[_0x1d33dc(0xa4)]["display"] =
      _0x1d33dc(0x1b7);
  }
);
async function addParticipantToFormation(_0x1a6118, _0x47d84a, _0x23b11d) {
  const _0x6b307a = _0x36280d,
    _0x30a91e = convertDDMMYYYYToFull(_0x47d84a),
    _0x39311f = JSON[_0x6b307a(0xe6)]([_0x23b11d]) + "\x20(" + _0x30a91e + ")";
  _0x1a6118[_0x6b307a(0xe0)] &&
  _0x1a6118[_0x6b307a(0xe0)][_0x6b307a(0x15a)]()[_0x6b307a(0xae)] > 0x0
    ? (_0x1a6118["participants"] =
        _0x1a6118["participants"][_0x6b307a(0x15a)]() + ",\x20" + _0x39311f)
    : (_0x1a6118[_0x6b307a(0xe0)] = _0x39311f);
  await updateFormationParticipantsInSheet(
    _0x1a6118["id"],
    _0x1a6118["participants"]
  );
  if (typeof window["fetchFormations"] === _0x6b307a(0x143))
    await window[_0x6b307a(0xaf)]();
  else
    typeof fetchFormations === "function"
      ? await fetchFormations()
      : console[_0x6b307a(0x123)](
          "fetchFormations\x20function\x20is\x20not\x20available."
        );
  const _0x22f621 = window[_0x6b307a(0x188)][_0x6b307a(0x1af)](
    (_0x8a8fd6) => _0x8a8fd6["id"] === _0x1a6118["id"]
  );
  showParticipantsModal(_0x22f621, _0x47d84a);
}
async function removeParticipantFromFormation(_0x11c096, _0x165482, _0x1eee6e) {
  const _0x41a26c = _0x36280d;
  let _0x2f3a85 = getBlocks(_0x11c096[_0x41a26c(0xe0)]),
    _0xb17a8 = [],
    _0x216f2a = 0x0;
  const _0x3da029 = parseDDMMYYYY(_0x165482);
  function _0x52df9d(_0x134632) {
    const _0xf9bb20 = _0x41a26c;
    return (
      (_0x134632 = _0x134632[_0xf9bb20(0x15a)]()),
      _0x134632[_0xf9bb20(0xcd)]("))") ? _0x134632 : _0x134632 + ")"
    );
  }
  for (let _0x1bb5f5 = 0x0; _0x1bb5f5 < _0x2f3a85["length"]; _0x1bb5f5++) {
    let _0x146263 = _0x2f3a85[_0x1bb5f5],
      _0x283304 = new Date(_0x146263[_0x41a26c(0x94)]);
    isSameDate(_0x283304, _0x3da029)
      ? (_0x216f2a !== _0x1eee6e &&
          _0xb17a8[_0x41a26c(0x11e)](_0x52df9d(_0x146263[_0x41a26c(0xec)])),
        _0x216f2a++)
      : _0xb17a8[_0x41a26c(0x11e)](_0x52df9d(_0x146263[_0x41a26c(0xec)]));
  }
  (_0x11c096[_0x41a26c(0xe0)] = _0xb17a8[_0x41a26c(0x8a)](",\x20")["trim"]()),
    await updateFormationParticipantsInSheet(
      _0x11c096["id"],
      _0x11c096["participants"]
    ),
    showParticipantsModal(_0x11c096, _0x165482);
}
function escapeRegExp(_0x12485b) {
  return _0x12485b["replace"](/[.*+?^${}()|[\]\\]/g, "\x5c$&");
}
async function updateFormationParticipantsInSheet(_0x5577d1, _0x57f675) {
  const _0xebfe98 = _0x36280d;
  try {
    const _0x6a4cc5 =
        SCRIPT_URL +
        _0xebfe98(0x16a) +
        _0x5577d1 +
        _0xebfe98(0x102) +
        encodeURIComponent(_0x57f675),
      _0x2a9c65 = await fetch(_0x6a4cc5),
      _0x3b143b = await _0x2a9c65[_0xebfe98(0xfd)]();
    console[_0xebfe98(0xe4)](_0xebfe98(0x1ab), _0x3b143b),
      typeof window[_0xebfe98(0xaf)] === "function" &&
        (await window["fetchFormations"]());
  } catch (_0x57f1b7) {
    console[_0xebfe98(0x123)](_0xebfe98(0x19b), _0x57f1b7[_0xebfe98(0xf9)]);
  }
}
function initAppointmentForm(_0x3b00b7) {
  const _0xa6f0f0 = _0x36280d;
  emailjs[_0xa6f0f0(0xea)](_0xa6f0f0(0xab)),
    populateAppointmentFormFormations();
  const _0x432e7e = document[_0xa6f0f0(0x103)]("appointmentForm"),
    _0x537935 = document[_0xa6f0f0(0x103)](_0xa6f0f0(0x155));
  _0x537935[_0xa6f0f0(0x1a8)](_0xa6f0f0(0x16c), (_0x5627ee) => {
    const _0x2fb259 = _0xa6f0f0;
    _0x5627ee[_0x2fb259(0x95)]();
    const _0x53342c = document[_0x2fb259(0x103)](_0x2fb259(0x1a1))[
        _0x2fb259(0x1a6)
      ],
      _0x4b5f4f = document[_0x2fb259(0x103)]("email")["value"],
      _0x40ad4d = document["getElementById"]("phone")[_0x2fb259(0x1a6)],
      _0x5e73ca = document["getElementById"](_0x2fb259(0xb1)),
      _0x3e1556 = document[_0x2fb259(0x103)]("dateSelect"),
      _0x217215 = _0x5e73ca[_0x2fb259(0x170)][_0x5e73ca["selectedIndex"]],
      _0x1469c6 = _0x217215 ? _0x217215[_0x2fb259(0x15c)] : "",
      _0x51dca6 = _0x3e1556[_0x2fb259(0x1a6)],
      _0x52016c = document["getElementById"](_0x2fb259(0xf9))["value"],
      _0x475a08 = [],
      _0x14a2e6 = document[_0x2fb259(0x119)](_0x2fb259(0xf7));
    _0x14a2e6[_0x2fb259(0x97)]((_0x5187da) => {
      const _0x1f596d = _0x2fb259,
        _0x27b15f = _0x5187da[_0x1f596d(0x9f)](_0x1f596d(0x16f))[
          _0x1f596d(0x1a6)
        ][_0x1f596d(0x15a)](),
        _0x3b7245 = _0x5187da[_0x1f596d(0x9f)](_0x1f596d(0x122))[
          _0x1f596d(0x1a6)
        ][_0x1f596d(0x15a)](),
        _0x3d889a = _0x5187da[_0x1f596d(0x9f)](_0x1f596d(0x10f))[
          _0x1f596d(0x1a6)
        ][_0x1f596d(0x15a)]();
      _0x27b15f &&
        _0x3b7245 &&
        _0x3d889a &&
        _0x475a08[_0x1f596d(0x11e)]({
          matricule: _0x27b15f,
          nameEmployee: _0x3b7245,
          entity: _0x3d889a,
        });
    });
    const _0x3175a8 = window[_0x2fb259(0x11b)][_0x2fb259(0x1af)](
      (_0xc8e6db) =>
        parseInt(_0xc8e6db["id"]) === parseInt(_0x5e73ca[_0x2fb259(0x1a6)])
    );
    let _0x287d2d = _0x3175a8
      ? getParticipantsCount(_0x3175a8, _0x51dca6)
      : 0x0;
    if (_0x287d2d + _0x475a08["length"] > 0xc) {
      _0x3b00b7(
        "La\x20limite\x20de\x20participants\x20pour\x20une\x20formation\x20est\x20de\x2012,\x20merci\x20de\x20retirer\x20des\x20participants\x20ou\x20de\x20reserver\x20une\x20autre\x20date."
      );
      return;
    }
    const _0x169fc5 =
        _0x52016c[_0x2fb259(0x15a)]() === "" ? _0x2fb259(0x10c) : _0x52016c,
      _0x5f2bbe = _0x475a08[_0x2fb259(0x9d)](
        (_0x5c9427) =>
          _0x5c9427["matricule"] +
          _0x2fb259(0x1b3) +
          _0x5c9427[_0x2fb259(0x195)] +
          "\x20(" +
          _0x5c9427[_0x2fb259(0x8d)] +
          ")"
      )[_0x2fb259(0x8a)]("\x0a"),
      _0x53c705 = {
        name: _0x53342c,
        email: _0x4b5f4f,
        phone: _0x40ad4d,
        formation: _0x1469c6,
        date: _0x51dca6,
        message: _0x169fc5,
        employees: _0x5f2bbe,
      };
    emailjs[_0x2fb259(0x110)](_0x2fb259(0x16d), _0x2fb259(0x120), _0x53c705)
      [_0x2fb259(0x140)](() => {
        const _0x4518e4 = _0x2fb259;
        _0x3b00b7(_0x4518e4(0x108)), _0x432e7e[_0x4518e4(0xbb)]();
      })
      [_0x2fb259(0xef)]((_0x5206d9) => {
        const _0x47a486 = _0x2fb259;
        console[_0x47a486(0x123)](_0x47a486(0x18e), _0x5206d9),
          alert(_0x47a486(0xcb));
      }),
      addPendingRequest({
        manager: _0x53342c,
        email: _0x4b5f4f,
        telephone: _0x40ad4d,
        formation: _0x1469c6,
        date: _0x51dca6,
        message: _0x52016c,
        employees: JSON[_0x2fb259(0xe6)](_0x475a08),
      });
  });
}
function addPendingRequest(_0x36fe20) {
  const _0x1b179b = _0x36280d,
    _0x444f5d =
      SCRIPT_URL +
      "?action=addPending" +
      "&manager=" +
      encodeURIComponent(_0x36fe20[_0x1b179b(0x17b)]) +
      _0x1b179b(0xa1) +
      encodeURIComponent(_0x36fe20[_0x1b179b(0x128)]) +
      _0x1b179b(0xc4) +
      encodeURIComponent(_0x36fe20[_0x1b179b(0x106)]) +
      _0x1b179b(0xba) +
      encodeURIComponent(_0x36fe20[_0x1b179b(0x115)]) +
      _0x1b179b(0x145) +
      encodeURIComponent(_0x36fe20[_0x1b179b(0x94)]) +
      _0x1b179b(0x1aa) +
      encodeURIComponent(_0x36fe20[_0x1b179b(0xf9)]) +
      _0x1b179b(0x13e) +
      encodeURIComponent(_0x36fe20[_0x1b179b(0xf5)]);
  fetch(_0x444f5d)
    [_0x1b179b(0x140)]((_0x4481c1) => _0x4481c1[_0x1b179b(0xfd)]())
    ["then"]((_0x2b5789) =>
      console[_0x1b179b(0xe4)](_0x1b179b(0xb9), _0x2b5789)
    )
    [_0x1b179b(0xef)]((_0x42f163) =>
      console[_0x1b179b(0x123)](_0x1b179b(0xee), _0x42f163)
    );
}
function populateAppointmentFormFormations() {
  const _0x262d79 = _0x36280d;
  window[_0x262d79(0x124)] = function (_0x4a1cfc) {
    const _0x42b092 = _0x262d79;
    let _0x2017ce = [];
    _0x4a1cfc &&
      _0x4a1cfc[_0x42b092(0x178)] &&
      (_0x2017ce = _0x4a1cfc["values"]);
    window[_0x42b092(0x11b)] = _0x2017ce;
    const _0x44e1ee = document["getElementById"]("formationSelect");
    (_0x44e1ee["innerHTML"] = ""),
      _0x2017ce["forEach"]((_0x59e21a) => {
        const _0x51d859 = _0x42b092,
          _0x282d0d = document["createElement"]("option");
        (_0x282d0d["value"] = _0x59e21a["id"]),
          (_0x282d0d[_0x51d859(0x15c)] = "" + _0x59e21a[_0x51d859(0x1a1)]),
          _0x44e1ee[_0x51d859(0x172)](_0x282d0d);
      }),
      _0x44e1ee["addEventListener"](_0x42b092(0x1ae), () => {
        updateDateSelect(_0x44e1ee, window["currentFormationsData"]);
      }),
      updateDateSelect(_0x44e1ee, window[_0x42b092(0x11b)]);
  };
  const _0xbd65a8 = document[_0x262d79(0xc1)](_0x262d79(0x152));
  (_0xbd65a8[_0x262d79(0x12a)] = SCRIPT_URL + _0x262d79(0x183)),
    document["body"]["appendChild"](_0xbd65a8);
}
function updateDateSelect(_0x294c0b, _0x18096e) {
  const _0x320b00 = _0x36280d,
    _0xfe7144 = document[_0x320b00(0x103)](_0x320b00(0x113));
  _0xfe7144[_0x320b00(0xb7)] = "";
  const _0x180550 = parseInt(_0x294c0b[_0x320b00(0x1a6)]),
    _0x1bfb11 = _0x18096e["find"](
      (_0x100e79) => parseInt(_0x100e79["id"]) === _0x180550
    );
  if (_0x1bfb11 && _0x1bfb11[_0x320b00(0xb8)]) {
    let _0x2fb50e = _0x1bfb11[_0x320b00(0xb8)];
    typeof _0x2fb50e === _0x320b00(0x196) &&
      (_0x2fb50e = _0x2fb50e["split"](","));
    if (_0x2fb50e["length"] > 0x0)
      _0x2fb50e[_0x320b00(0x97)]((_0x281d11) => {
        const _0x39d6a1 = _0x320b00;
        let _0x314e6f = _0x281d11["trim"](),
          _0x131425 = formatDateToDDMMYYYY(_0x314e6f),
          _0x27c9ae = _0x1bfb11
            ? getParticipantsCount(_0x1bfb11, _0x131425)
            : 0x0;
        const _0x37fedc = document[_0x39d6a1(0xc1)]("option");
        (_0x37fedc[_0x39d6a1(0x1a6)] = _0x314e6f),
          (_0x37fedc[_0x39d6a1(0x15c)] =
            _0x131425 + "\x20(" + _0x27c9ae + _0x39d6a1(0x18b)),
          _0xfe7144["appendChild"](_0x37fedc);
      });
    else {
      const _0x2e6d0d = document[_0x320b00(0xc1)](_0x320b00(0x105));
      (_0x2e6d0d["value"] = ""),
        (_0x2e6d0d["text"] = _0x320b00(0x133)),
        _0xfe7144[_0x320b00(0x172)](_0x2e6d0d);
    }
  } else {
    const _0x1b2987 = document[_0x320b00(0xc1)](_0x320b00(0x105));
    (_0x1b2987[_0x320b00(0x1a6)] = ""),
      (_0x1b2987[_0x320b00(0x15c)] = "Aucune\x20date\x20disponible"),
      _0xfe7144[_0x320b00(0x172)](_0x1b2987);
  }
}
function setCookie(_0x171da5, _0x1a52c7, _0x6254f) {
  const _0x5cea98 = _0x36280d;
  let _0x17c7a5 = "";
  if (_0x6254f) {
    const _0x2f265e = new Date();
    _0x2f265e[_0x5cea98(0xfb)](
      _0x2f265e["getTime"]() + _0x6254f * 0x18 * 0x3c * 0x3c * 0x3e8
    ),
      (_0x17c7a5 = ";\x20expires=" + _0x2f265e["toUTCString"]());
  }
  document[_0x5cea98(0xc8)] =
    _0x171da5 +
    "=" +
    (_0x1a52c7 || "") +
    _0x17c7a5 +
    ";\x20path=/;\x20SameSite=Lax";
}
function getCookie(_0x5d4995) {
  const _0x3870f7 = _0x36280d,
    _0xb9fcef = _0x5d4995 + "=",
    _0x30858c = document[_0x3870f7(0xc8)]["split"](";");
  for (let _0x6b8d02 = 0x0; _0x6b8d02 < _0x30858c["length"]; _0x6b8d02++) {
    let _0x2794e8 = _0x30858c[_0x6b8d02];
    while (_0x2794e8["charAt"](0x0) === "\x20")
      _0x2794e8 = _0x2794e8["substring"](0x1, _0x2794e8[_0x3870f7(0xae)]);
    if (_0x2794e8[_0x3870f7(0x100)](_0xb9fcef) === 0x0)
      return _0x2794e8[_0x3870f7(0xdf)](
        _0xb9fcef[_0x3870f7(0xae)],
        _0x2794e8["length"]
      );
  }
  return null;
}
function eraseCookie(_0x4a2b99) {
  document["cookie"] = _0x4a2b99 + "=;\x20Max-Age=-99999999;";
}
function initEmployeeTable() {
  const _0x4131bf = _0x36280d,
    _0x332ad6 = document[_0x4131bf(0x103)]("employeeTable"),
    _0x2dcef8 = _0x332ad6["querySelector"](_0x4131bf(0x11a)),
    _0x51c833 = 0xc,
    _0x314f7f = 0x1;
  function _0x5c980b() {
    const _0xdb39f4 = _0x4131bf,
      _0xd443c5 = _0x2dcef8[_0xdb39f4(0x119)]("tr");
    _0xd443c5["forEach"]((_0xb8e810) => {
      const _0xa1b390 = _0xdb39f4,
        _0x210251 = _0xb8e810[_0xa1b390(0x9f)](_0xa1b390(0x14b));
      _0x210251["disabled"] = _0xd443c5[_0xa1b390(0xae)] <= _0x314f7f;
    });
    const _0x32923a = _0x2dcef8["querySelectorAll"](".btn-add");
    _0x32923a["forEach"]((_0x275c2d) => {
      const _0x40cf3d = _0xdb39f4;
      _0x275c2d["disabled"] =
        _0x2dcef8[_0x40cf3d(0x119)]("tr")["length"] >= _0x51c833;
    });
  }
  function _0x335ab8() {
    const _0x170ba6 = _0x4131bf,
      _0x2ec6d0 = _0x2dcef8[_0x170ba6(0x119)]("tr")["length"];
    if (_0x2ec6d0 < _0x51c833) {
      const _0x44ebaa = _0x2dcef8[_0x170ba6(0x9f)]("tr")[_0x170ba6(0x12e)](
        !![]
      );
      _0x44ebaa[_0x170ba6(0x119)](_0x170ba6(0xf8))[_0x170ba6(0x97)](
        (_0xd7e76c) => {
          const _0x32ea97 = _0x170ba6;
          _0xd7e76c[_0x32ea97(0x1a6)] = "";
        }
      ),
        _0x2dcef8[_0x170ba6(0x172)](_0x44ebaa),
        _0x5c980b();
    }
  }
  function _0x49ee37(_0x2e34b0) {
    const _0x5d1ec0 = _0x4131bf,
      _0x29025c = _0x2dcef8["querySelectorAll"]("tr")["length"];
    _0x29025c > _0x314f7f && (_0x2e34b0[_0x5d1ec0(0x159)](), _0x5c980b());
  }
  _0x2dcef8["addEventListener"]("click", (_0x442fdf) => {
    const _0x12fa01 = _0x4131bf;
    _0x442fdf[_0x12fa01(0xa2)][_0x12fa01(0x168)]["contains"](
      _0x12fa01(0x1a2)
    ) && _0x335ab8();
    if (
      _0x442fdf[_0x12fa01(0xa2)][_0x12fa01(0x168)][_0x12fa01(0x13f)](
        "btn-remove"
      )
    ) {
      const _0x394842 = _0x442fdf[_0x12fa01(0xa2)][_0x12fa01(0xd1)]("tr");
      _0x49ee37(_0x394842);
    }
  }),
    _0x5c980b();
}
function formatDateClient(_0x32be83) {
  const _0x8be7b7 = _0x36280d;
  if (
    _0x32be83 &&
    _0x32be83[_0x8be7b7(0x135)]("/") &&
    _0x32be83[_0x8be7b7(0xae)] === 0xa
  )
    return _0x32be83;
  const _0x1afb25 = new Date(_0x32be83);
  if (!isNaN(_0x1afb25)) {
    const _0x40689d = ("0" + _0x1afb25[_0x8be7b7(0xdd)]())[_0x8be7b7(0x136)](
        -0x2
      ),
      _0x3faefe = ("0" + (_0x1afb25["getMonth"]() + 0x1))[_0x8be7b7(0x136)](
        -0x2
      ),
      _0xae8b44 = _0x1afb25[_0x8be7b7(0x17a)]();
    return _0x40689d + "/" + _0x3faefe + "/" + _0xae8b44;
  }
  return _0x32be83;
}
function _0x51c6(_0x53076a, _0x20a07f) {
  const _0x3a9c6b = _0x3a9c();
  return (
    (_0x51c6 = function (_0x51c62b, _0x42665a) {
      _0x51c62b = _0x51c62b - 0x87;
      let _0x1272a9 = _0x3a9c6b[_0x51c62b];
      return _0x1272a9;
    }),
    _0x51c6(_0x53076a, _0x20a07f)
  );
}
async function runArchiveProcess() {
  const _0x1f4478 = _0x36280d;
  try {
    const _0x50a589 = await fetch(SCRIPT_URL + "?action=archive"),
      _0x197ded = await _0x50a589[_0x1f4478(0xfd)]();
    _0x197ded[_0x1f4478(0x193)]
      ? console[_0x1f4478(0xe4)](_0x1f4478(0xf1))
      : console["error"]("Archiving\x20error:", _0x197ded[_0x1f4478(0x123)]);
  } catch (_0x5a455a) {
    console["error"](_0x1f4478(0x156), _0x5a455a);
  }
}
function filterArchives() {
  const _0x586c46 = _0x36280d,
    _0x51226e = document[_0x586c46(0x103)](_0x586c46(0x114))
      [_0x586c46(0x1a6)][_0x586c46(0x15a)]()
      [_0x586c46(0xc3)](),
    _0x4223f3 =
      document[_0x586c46(0x103)]("archiveDateFilter")[_0x586c46(0x1a6)],
    _0x4fb2ae = document["getElementById"](_0x586c46(0xf0))[_0x586c46(0x9f)](
      _0x586c46(0x11a)
    ),
    _0x7f1357 = _0x4fb2ae[_0x586c46(0xe2)]("tr");
  for (
    let _0x2091e1 = 0x0;
    _0x2091e1 < _0x7f1357[_0x586c46(0xae)];
    _0x2091e1++
  ) {
    const _0x16bb80 = _0x7f1357[_0x2091e1][_0x586c46(0xe2)]("td"),
      _0x181987 = _0x16bb80[0x1][_0x586c46(0x87)][_0x586c46(0xc3)](),
      _0x3fdc90 = _0x16bb80[0x2][_0x586c46(0x87)][_0x586c46(0x15a)](),
      _0x2def4e = _0x16bb80[0x3]["textContent"][_0x586c46(0xc3)](),
      _0x14b651 =
        _0x181987["includes"](_0x51226e) ||
        _0x2def4e[_0x586c46(0x135)](_0x51226e),
      _0x4df385 = _0x4223f3 === "" || _0x3fdc90 === _0x4223f3;
    _0x7f1357[_0x2091e1][_0x586c46(0xa4)][_0x586c46(0xce)] =
      _0x14b651 && _0x4df385 ? "" : _0x586c46(0x1b7);
  }
}
function populateArchiveDateFilter() {
  const _0x4ec417 = _0x36280d,
    _0x26ea83 = document[_0x4ec417(0x103)](_0x4ec417(0xf0))[_0x4ec417(0x9f)](
      "tbody"
    ),
    _0x2072dd = _0x26ea83[_0x4ec417(0xe2)]("tr"),
    _0x207eb8 = new Set();
  for (
    let _0x20c07e = 0x0;
    _0x20c07e < _0x2072dd[_0x4ec417(0xae)];
    _0x20c07e++
  ) {
    const _0x172685 =
      _0x2072dd[_0x20c07e][_0x4ec417(0xe2)]("td")[0x2]["textContent"]["trim"]();
    _0x172685 !== "" && _0x207eb8[_0x4ec417(0x13c)](_0x172685);
  }
  const _0xf7afca = document[_0x4ec417(0x103)](_0x4ec417(0xf3));
  (_0xf7afca[_0x4ec417(0xb7)] = _0x4ec417(0xb5)),
    Array["from"](_0x207eb8)
      [_0x4ec417(0x177)]()
      ["forEach"]((_0xd7032f) => {
        const _0x28a7da = _0x4ec417,
          _0x1fef2b = document[_0x28a7da(0xc1)](_0x28a7da(0x105));
        (_0x1fef2b["value"] = _0xd7032f),
          (_0x1fef2b[_0x28a7da(0x87)] = _0xd7032f),
          _0xf7afca[_0x28a7da(0x172)](_0x1fef2b);
      });
}
document[_0x36280d(0x103)](_0x36280d(0x114))[_0x36280d(0x1a8)](
  _0x36280d(0xf8),
  filterArchives
),
  document[_0x36280d(0x103)](_0x36280d(0xf3))[_0x36280d(0x1a8)](
    _0x36280d(0x1ae),
    filterArchives
  );
async function fetchArchives() {
  const _0x45594e = _0x36280d;
  try {
    const _0x4c9826 = await fetch(SCRIPT_URL + "?action=readArchives"),
      _0x2b0124 = await _0x4c9826[_0x45594e(0xfd)](),
      _0x237a44 = document["getElementById"](_0x45594e(0xf0))["querySelector"](
        _0x45594e(0x11a)
      );
    if (
      !_0x2b0124 ||
      !_0x2b0124[_0x45594e(0x178)] ||
      _0x2b0124["values"]["length"] === 0x0
    ) {
      _0x237a44[_0x45594e(0xb7)] =
        "<tr><td\x20colspan=\x274\x27>Aucun\x20historique\x20disponible</td></tr>";
      return;
    }
    (_0x237a44[_0x45594e(0xb7)] = ""),
      _0x2b0124[_0x45594e(0x178)][_0x45594e(0x97)]((_0x29758a) => {
        const _0x597fba = _0x45594e,
          _0x5a34f9 = formatDateClient(_0x29758a[_0x597fba(0x94)]);
        let _0x43ee96 = "";
        const _0x343daa = _0x29758a[_0x597fba(0xe0)][_0x597fba(0x1a0)]("|||");
        _0x343daa[_0x597fba(0x97)]((_0x5b6927) => {
          const _0x41e8ec = _0x597fba;
          _0x5b6927 = _0x5b6927[_0x41e8ec(0x15a)]();
          if (_0x5b6927)
            try {
              const _0x8c659b = JSON[_0x41e8ec(0x126)](_0x5b6927);
              if (
                Array[_0x41e8ec(0xd5)](_0x8c659b) &&
                _0x8c659b[_0x41e8ec(0xae)] > 0x0
              ) {
                const _0x4a7ce2 = _0x8c659b[0x0];
                _0x43ee96 +=
                  "<div>" +
                  _0x4a7ce2[_0x41e8ec(0xaa)] +
                  _0x41e8ec(0x1b3) +
                  _0x4a7ce2[_0x41e8ec(0x195)] +
                  _0x41e8ec(0x1b3) +
                  _0x4a7ce2[_0x41e8ec(0x8d)] +
                  _0x41e8ec(0xb6);
              }
            } catch (_0x59037c) {
              console["error"](_0x41e8ec(0x14d), _0x59037c);
            }
        });
        const _0x38774a = document["createElement"]("tr");
        (_0x38774a["innerHTML"] =
          _0x597fba(0x129) +
          _0x29758a["id"] +
          _0x597fba(0x127) +
          _0x29758a[_0x597fba(0x115)] +
          _0x597fba(0x127) +
          _0x5a34f9 +
          _0x597fba(0x127) +
          _0x43ee96 +
          "</td>\x0a\x20\x20\x20\x20\x20\x20"),
          _0x237a44[_0x597fba(0x172)](_0x38774a);
      }),
      populateArchiveDateFilter();
  } catch (_0xdadd69) {
    console[_0x45594e(0x123)](_0x45594e(0x98), _0xdadd69);
  }
}
function convertDMYToISO(_0xe71427) {
  const _0x522ded = _0x36280d,
    _0x4e7247 = _0xe71427[_0x522ded(0x1a0)]("/");
  if (_0x4e7247[_0x522ded(0xae)] === 0x3) {
    const _0x216b36 = _0x4e7247[0x0][_0x522ded(0x191)](0x2, "0"),
      _0xe5dbde = _0x4e7247[0x1]["padStart"](0x2, "0"),
      _0x419cee = _0x4e7247[0x2];
    return _0x419cee + "-" + _0xe5dbde + "-" + _0x216b36;
  }
  return _0xe71427;
}
function getEventsFromFormations() {
  const _0xaf54d7 = _0x36280d,
    _0x3b0994 = document[_0xaf54d7(0x119)](_0xaf54d7(0x160)),
    _0x4f1189 = new Map();
  return (
    _0x3b0994[_0xaf54d7(0x97)]((_0x5a73f1) => {
      const _0x55dbd1 = _0xaf54d7,
        _0xcd56b2 = _0x5a73f1[_0x55dbd1(0x9f)]("td");
      if (!_0xcd56b2) return;
      const _0x435de0 = _0xcd56b2[_0x55dbd1(0x87)][_0x55dbd1(0x15a)](),
        _0x1ed25a = _0x5a73f1[_0x55dbd1(0x9f)](_0x55dbd1(0x109));
      if (!_0x1ed25a) return;
      const _0x15d2aa = _0x1ed25a[_0x55dbd1(0x87)][_0x55dbd1(0x15a)](),
        _0x5e849c = window[_0x55dbd1(0x188)]
          ? window[_0x55dbd1(0x188)]["find"](
              (_0x40af31) => _0x40af31["id"][_0x55dbd1(0x174)]() === _0x435de0
            )
          : null,
        _0x474d93 = _0x5a73f1[_0x55dbd1(0x119)](_0x55dbd1(0x16b));
      _0x474d93[_0x55dbd1(0x97)]((_0xb52c1) => {
        const _0x2c8246 = _0x55dbd1,
          _0x3deaef = _0xb52c1[_0x2c8246(0x12d)](_0x2c8246(0x125));
        if (!_0x3deaef) return;
        const _0x3ef7d9 = convertDMYToISO(_0x3deaef);
        let _0x8d4704 = 0x0;
        if (_0x5e849c) _0x8d4704 = getParticipantsCount(_0x5e849c, _0x3deaef);
        else {
          let _0x5bef8a =
            _0xb52c1["textContent"][_0x2c8246(0x161)](/\((\d+)\/12\)/);
          _0x5bef8a &&
            _0x5bef8a[0x1] &&
            (_0x8d4704 = parseInt(_0x5bef8a[0x1], 0xa));
        }
        let _0x3005f1 = "grey";
        if (_0x8d4704 >= 0x1 && _0x8d4704 <= 0x5) _0x3005f1 = _0x2c8246(0xd7);
        else _0x8d4704 >= 0x6 && (_0x3005f1 = "#37ec5f");
        const _0x15ab4b = _0x15d2aa + "\x20(" + _0x8d4704 + _0x2c8246(0x18b),
          _0x52edd4 = _0x3ef7d9 + "|" + _0x15d2aa;
        !_0x4f1189[_0x2c8246(0x19f)](_0x52edd4) &&
          _0x4f1189[_0x2c8246(0x14e)](_0x52edd4, {
            title: _0x15ab4b,
            start: _0x3ef7d9,
            backgroundColor: _0x3005f1,
            borderColor: _0x3005f1,
            extendedProps: { formationId: _0x435de0, count: _0x8d4704 },
          });
      });
    }),
    Array["from"](_0x4f1189[_0xaf54d7(0x178)]())
  );
}
function _0x3a9c() {
  const _0x59ffac = [
    "426147Tmtjng",
    "#homePage",
    "has",
    "split",
    "name",
    "btn-add",
    "Erreur\x20lors\x20de\x20la\x20suppression\x20de\x20la\x20tâche:\x20",
    "413RipcRF",
    "\x22>Retirer</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20",
    "value",
    "Demande\x20acceptée\x20avec\x20succès\x20!",
    "addEventListener",
    "Erreur\x20lors\x20de\x20l\x27effacement\x20de\x20l\x27historique:\x20",
    "&message=",
    "Participants\x20mis\x20à\x20jour\x20:",
    "top",
    "confirmNo2",
    "change",
    "find",
    "disabled",
    "Adresse\x20mail\x20copiée\x20(",
    "data-target",
    "\x20-\x20",
    "Participants\x20pour\x20la\x20formation\x20:",
    "formation-name-modal",
    "adminAuth",
    "none",
    "replace",
    "calendar",
    "?action=read",
    "?action=addTask&concerne=",
    "textContent",
    "\x22>Accepter</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-refuse\x22\x20data-id=\x22",
    "Erreur\x20lors\x20de\x20la\x20récupération\x20des\x20demandes\x20en\x20attente\x20:",
    "join",
    "exec",
    "activeTasksContainer",
    "entity",
    "filter",
    "taskImportance",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td><button\x20class=\x22btn-delete-task\x22\x20data-id=\x22",
    "1454712wYDeEZ",
    "Tâche\x20supprimée\x20avec\x20succès\x20!",
    "22396xGSwaj",
    "date",
    "preventDefault",
    "Voulez-vous\x20vraiment\x20effacer\x20l\x27historique\x20des\x20tâches\x20accomplies\x20?",
    "forEach",
    "Erreur\x20lors\x20de\x20la\x20récupération\x20de\x20l\x27historique:",
    "confirmModal2",
    "?action=deletePending&id=",
    "#37ec5f",
    "modalDate",
    "map",
    "menuAdmin",
    "querySelector",
    "\x22>Accompli</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-delete-task\x22\x20data-id=\x22",
    "&email=",
    "target",
    "Demande\x20refusée\x20avec\x20succès\x20!",
    "style",
    "Erreur\x20lors\x20de\x20l\x27ajout\x20de\x20la\x20tâche:\x20",
    "extendedProps",
    "taskDescription",
    "\x22\x20style=\x22cursor:pointer;\x20margin-right:5px;\x20background-color:",
    "Ajout\x20en\x20cours,\x20veuillez\x20patienter..",
    "matricule",
    "4sYz-WzrDCXInmUCl",
    "prev,next\x20today",
    "flex",
    "length",
    "fetchFormations",
    "Suppression\x20:",
    "formationSelect",
    "\x22\x20data-date=\x22",
    "addFormationButton",
    "calendarModal",
    "<option\x20value=\x22\x22>Toutes\x20les\x20dates</option>",
    "</div>",
    "innerHTML",
    "availableDates",
    "Demande\x20ajoutée\x20:",
    "&formation=",
    "reset",
    ".formation-container",
    "https://script.google.com/macros/s/AKfycbyTxVIekVUyRSUafBPEzQGaK2goS1zqMi8qLoeESNhvk3XXbPSFyyjyJkuBWjWG5btvAA/exec",
    "\x22>Supprimer</button></td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>",
    "Erreur\x20lors\x20de\x20la\x20copie\x20de\x20l\x27email\x20:\x20",
    "getMonth",
    "createElement",
    "formationsTable",
    "toLowerCase",
    "&telephone=",
    "event",
    "item-",
    "\x0a\x20\x20\x20\x20<div\x20id=\x22addParticipantSection\x22\x20style=\x22margin-top:15px;\x22>\x0a\x20\x20\x20\x20\x20\x20<h4>Ajouter\x20un\x20participant</h4>\x0a\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22newMatricule\x22\x20placeholder=\x22Matricule\x22\x20style=\x22margin-right:5px;\x22\x20/>\x0a\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22newName\x22\x20placeholder=\x22Nom/Prénom\x22\x20style=\x22margin-right:5px;\x22\x20/>\x0a\x20\x20\x20\x20\x20\x20<input\x20type=\x22text\x22\x20id=\x22newEntity\x22\x20placeholder=\x22Entité\x22\x20style=\x22margin-right:5px;\x22\x20/>\x0a\x20\x20\x20\x20\x20\x20<button\x20id=\x22btnAddParticipant\x22>Ajouter\x20participant(e)</button>\x0a\x20\x20\x20\x20</div>\x0a\x20\x20",
    "cookie",
    "innerHeight",
    "\x22>Modifier</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22delete-formation\x22\x20data-id=\x22",
    "Une\x20erreur\x20s\x27est\x20produite,\x20veuillez\x20réessayer.",
    "Effacement\x20en\x20cours,\x20veuillez\x20patienter..",
    "endsWith",
    "display",
    "confirmMessage2",
    "modalTitle",
    "closest",
    "#tasksHistoryContainer\x20.btn-delete-task",
    "\x22>Supprimer</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20",
    "hidden",
    "isArray",
    "&name=",
    "#f49f42",
    "\x0a\x20\x20\x20\x20\x20\x20<table\x20style=\x22width:100%;\x20border-collapse:collapse;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr\x20style=\x22background-color:#f9f9f9;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>N°</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>Matricule</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>Nom/Prenom</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>Entité</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>Action</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20",
    "etat",
    "<p>Aucun\x20participant\x20pour\x20cette\x20date.</p>",
    "Erreur\x20lors\x20de\x20l\x27affichage\x20d\x27un\x20bloc\x20:",
    "participantsModal",
    "getDate",
    "start",
    "substring",
    "participants",
    "Formation\x20not\x20found\x20for\x20ID:\x20",
    "getElementsByTagName",
    "clipboard",
    "log",
    "/12)</span>",
    "stringify",
    "data-id",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>",
    "Participant\x20ajouté\x20avec\x20succès\x20!",
    "init",
    "newName",
    "fullBlock",
    "2387334ZHhLiP",
    "Erreur\x20lors\x20de\x20l\x27ajout\x20de\x20la\x20demande\x20:",
    "catch",
    "archivesTable",
    "Archiving\x20completed\x20successfully.",
    "<p>Aucune\x20tâche\x20active.</p>",
    "archiveDateFilter",
    "?action=add&id=",
    "employees",
    "\x0a\x20\x20\x20\x20\x20\x20<table\x20class=\x22tasks-table\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>ID</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Concerne</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Tâche</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Importance</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>État</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Actions</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20",
    "#employeeTable\x20tbody\x20tr",
    "input",
    "message",
    "tache",
    "setTime",
    "Erreur\x20lors\x20du\x20refus\x20de\x20la\x20demande\x20:",
    "json",
    "Modifier\x20une\x20Formation",
    "btnAddParticipant",
    "indexOf",
    "?action=readPending",
    "&participants=",
    "getElementById",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-accept\x22\x20data-id=\x22",
    "option",
    "telephone",
    "&etat=Accomplie",
    "Merci,\x20votre\x20demande\x20a\x20été\x20envoyée\x20avec\x20succès\x20!",
    ".data-formation",
    "formationDates",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "Aucun\x20message",
    "Mise\x20à\x20jour\x20:",
    "<span\x20class=\x22clickable-date\x22\x20data-formation-id=\x22",
    "input[name=\x22entity[]\x22]",
    "send",
    "?action=readTasks",
    "755YXGnPq",
    "dateSelect",
    "archiveSearch",
    "formation",
    "servicesSection",
    "concat",
    "removeEventListener",
    "querySelectorAll",
    "tbody",
    "currentFormationsData",
    "<h3>Demandes\x20en\x20attente</h3><p>Aucune\x20demande\x20de\x20formation\x20en\x20attente..\x20:(</p>",
    ".btn-complete-task",
    "push",
    "smooth",
    "template_mhmywm3",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-complete-task\x22\x20data-id=\x22",
    "input[name=\x22nameEmployee[]\x22]",
    "error",
    "handleFormationsData",
    "data-date",
    "parse",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "email",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "src",
    "Erreur\x20lors\x20de\x20la\x20récupération\x20de\x20l\x27historique\x20des\x20tâches\x20:",
    "Erreur\x20lors\x20du\x20parsing\x20des\x20participants:",
    "getAttribute",
    "cloneNode",
    "scrollTo",
    "formationModal",
    "Erreur\x20lors\x20de\x20la\x20suppression\x20de\x20la\x20formation\x20:",
    "formationId",
    "Aucune\x20date\x20disponible",
    "test",
    "includes",
    "slice",
    "pendingRequestsTable",
    "Ajouter\x20une\x20Formation",
    "?action=update&id=",
    "</tbody></table>",
    "<p>Aucune\x20tâche\x20accomplie.</p>",
    "add",
    "clearHistoryBtn",
    "&employees=",
    "contains",
    "then",
    "23757237SWQRGv",
    "max",
    "function",
    "Participant\x20retiré\x20avec\x20succès\x20!",
    "&date=",
    "&dates=",
    "show",
    "Veuillez\x20remplir\x20tous\x20les\x20champs.",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<button\x20class=\x22btn-remove-participant\x22\x20data-index=\x22",
    "adminPanel",
    ".btn-remove",
    "Calendar",
    "Erreur\x20de\x20parsing\x20du\x20participant:",
    "set",
    "closeParticipantsModal",
    ".goToForm",
    ".service-item",
    "script",
    "Demande\x20refusée\x20:",
    "Demande\x20acceptée\x20:",
    "submitForm",
    "Error\x20calling\x20archive\x20action:",
    "scrollY",
    ".menu-item",
    "remove",
    "trim",
    "Erreur\x20lors\x20de\x20la\x20mise\x20à\x20jour\x20de\x20l\x27état\x20de\x20la\x20tâche:\x20",
    "text",
    "notificationPopup",
    "Erreur\x20updateTaskState:",
    "205464fcLePD",
    "#formationsTable\x20tbody\x20tr",
    "match",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22data-formation\x22>",
    "CC1234!",
    "adminLogin",
    "?action=deleteTask&id=",
    "?action=clearTasksHistory",
    "importance",
    "classList",
    "\x22>Supprimer</button>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>",
    "?action=updateParticipants&id=",
    ".clickable-date",
    "click",
    "service_x5g594z",
    ".btn-remove-participant",
    "input[name=\x22matricule[]\x22]",
    "options",
    "formationName",
    "appendChild",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20style=\x22padding:8px;\x20border:1px\x20solid\x20#ddd;\x22>",
    "toString",
    "data-formation-id",
    "logoutButton",
    "sort",
    "values",
    ";\x22>",
    "getFullYear",
    "manager",
    "Tâche\x20ajoutée\x20avec\x20succès\x20!",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20<h3>Demandes\x20en\x20attente</h3>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<table\x20id=\x22pendingRequestsTable\x22\x20border=\x221\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>ID</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Manager</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Email</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Téléphone</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Formation</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Date</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Message</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Employees</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Actions</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20\x20\x20",
    "participantsList",
    "Veuillez\x20patienter..\x20Suppression\x20de\x20tâche\x20en\x20cours.",
    "DOMContentLoaded",
    "btn-accept",
    "true",
    "?action=read&callback=handleFormationsData",
    "appointment-section",
    "Êtes-vous\x20sûr\x20de\x20vouloir\x20supprimer\x20cette\x20formation\x20?",
    "\x0a\x20\x20\x20\x20\x20\x20\x20\x20</tbody>\x0a\x20\x20\x20\x20\x20\x20</table>\x0a\x20\x20\x20\x20",
    "delete-formation",
    "formationsData",
    "Formation\x20supprimée\x20avec\x20succès\x20!",
    "<br>",
    "/12)",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "data-email",
    "Erreur\x20lors\x20de\x20l\x27envoi\x20:",
    "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td\x20class=\x22importance-cell\x20importance-",
    "6199872tPhMqT",
    "padStart",
    "pendingRequests",
    "success",
    "data-index",
    "nameEmployee",
    "string",
    ".contact-item",
    "<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>",
    "submit",
    "btn-refuse",
    "Erreur\x20lors\x20de\x20la\x20mise\x20à\x20jour\x20des\x20participants\x20:",
    "concerne",
  ];
  _0x3a9c = function () {
    return _0x59ffac;
  };
  return _0x3a9c();
}
function initCalendarFromFormations() {
  const _0x1f8f80 = _0x36280d,
    _0x419690 = getEventsFromFormations(),
    _0x31db7e = document[_0x1f8f80(0x103)](_0x1f8f80(0x1b9)),
    _0x1af48c = new FullCalendar[_0x1f8f80(0x14c)](_0x31db7e, {
      locale: "fr",
      initialView: "dayGridMonth",
      headerToolbar: { left: _0x1f8f80(0xac), center: "title", right: "" },
      events: _0x419690,
      eventClick: function (_0x12a17b) {
        const _0x220224 = _0x1f8f80,
          _0x3691a8 = _0x12a17b[_0x220224(0xc5)][_0x220224(0xde)],
          _0x3b5aed = ("0" + _0x3691a8[_0x220224(0xdd)]())[_0x220224(0x136)](
            -0x2
          ),
          _0x2d2958 = ("0" + (_0x3691a8[_0x220224(0xc0)]() + 0x1))["slice"](
            -0x2
          ),
          _0x31d1d9 = _0x3691a8[_0x220224(0x17a)](),
          _0x58223c = _0x3b5aed + "/" + _0x2d2958 + "/" + _0x31d1d9,
          _0x98072b =
            _0x12a17b[_0x220224(0xc5)][_0x220224(0xa6)][_0x220224(0x132)],
          _0x2e7968 = window[_0x220224(0x188)][_0x220224(0x1af)](
            (_0xf43f98) => _0xf43f98["id"][_0x220224(0x174)]() === _0x98072b
          );
        _0x2e7968
          ? showParticipantsModal(_0x2e7968, _0x58223c)
          : alert(_0x220224(0xe1) + _0x98072b);
      },
    });
  _0x1af48c["render"]();
}
const openCalendarBtn = document[_0x36280d(0x103)]("openCalendarBtn"),
  calendarModal = document[_0x36280d(0x103)](_0x36280d(0xb4)),
  closeCalendar = document[_0x36280d(0x103)]("closeCalendar");
openCalendarBtn[_0x36280d(0x1a8)]("click", () => {
  const _0x237d0d = _0x36280d;
  (calendarModal["style"][_0x237d0d(0xce)] = "block"),
    initCalendarFromFormations();
}),
  closeCalendar[_0x36280d(0x1a8)](_0x36280d(0x16c), () => {
    const _0x5b1682 = _0x36280d;
    calendarModal[_0x5b1682(0xa4)][_0x5b1682(0xce)] = _0x5b1682(0x1b7);
  }),
  window["addEventListener"](_0x36280d(0x16c), (_0x397d06) => {
    const _0x5bf2a5 = _0x36280d;
    _0x397d06[_0x5bf2a5(0xa2)] === calendarModal &&
      (calendarModal[_0x5bf2a5(0xa4)]["display"] = _0x5bf2a5(0x1b7));
  }),
  document["getElementById"]("taskForm")[_0x36280d(0x1a8)](
    _0x36280d(0x199),
    async (_0x4b4f66) => {
      const _0x25c63f = _0x36280d;
      showNotification(
        "Veuillez\x20patienter..\x20Ajout\x20de\x20tâche\x20en\x20cours."
      ),
        _0x4b4f66[_0x25c63f(0x95)]();
      const _0x153b84 =
          document[_0x25c63f(0x103)]("taskConcerne")["value"][
            _0x25c63f(0x15a)
          ](),
        _0x1d1b26 = document[_0x25c63f(0x103)](_0x25c63f(0xa7))[
          _0x25c63f(0x1a6)
        ]["trim"](),
        _0x23a9a2 = document[_0x25c63f(0x103)](_0x25c63f(0x8f))[
          _0x25c63f(0x1a6)
        ],
        _0x27c752 = "Due",
        _0x34f569 =
          SCRIPT_URL +
          _0x25c63f(0x1bb) +
          encodeURIComponent(_0x153b84) +
          "&tache=" +
          encodeURIComponent(_0x1d1b26) +
          "&importance=" +
          encodeURIComponent(_0x23a9a2) +
          "&etat=" +
          encodeURIComponent(_0x27c752);
      try {
        const _0x3f861d = await fetch(_0x34f569),
          _0x27136e = await _0x3f861d[_0x25c63f(0xfd)]();
        _0x27136e[_0x25c63f(0x193)]
          ? (await fetchTasks(),
            await fetchTasksHistory(),
            document[_0x25c63f(0x103)]("taskForm")["reset"](),
            showNotification(_0x25c63f(0x17c)))
          : showNotification(_0x25c63f(0xa5) + _0x27136e["error"]);
      } catch (_0x443684) {
        console[_0x25c63f(0x123)](_0x443684);
      }
    }
  );
async function fetchTasks() {
  const _0x2bd677 = _0x36280d;
  try {
    const _0x2772b8 = await fetch(SCRIPT_URL + _0x2bd677(0x111)),
      _0x583201 = await _0x2772b8[_0x2bd677(0xfd)](),
      _0xe53625 = document[_0x2bd677(0x103)](_0x2bd677(0x8c));
    if (
      !_0x583201 ||
      !_0x583201["values"] ||
      _0x583201["values"][_0x2bd677(0xae)] === 0x0
    ) {
      _0xe53625["innerHTML"] = _0x2bd677(0xf2);
      return;
    }
    let _0x2fe18a = _0x2bd677(0xf6);
    _0x583201[_0x2bd677(0x178)][_0x2bd677(0x97)]((_0x5a3097) => {
      const _0x1ee15c = _0x2bd677;
      _0x2fe18a +=
        _0x1ee15c(0x198) +
        _0x5a3097["id"] +
        _0x1ee15c(0x18c) +
        _0x5a3097[_0x1ee15c(0x19c)] +
        _0x1ee15c(0x18c) +
        _0x5a3097[_0x1ee15c(0xfa)] +
        _0x1ee15c(0x18f) +
        _0x5a3097[_0x1ee15c(0x167)][_0x1ee15c(0xc3)]() +
        "\x22>" +
        _0x5a3097[_0x1ee15c(0x167)] +
        _0x1ee15c(0x18c) +
        _0x5a3097[_0x1ee15c(0xd9)] +
        _0x1ee15c(0x121) +
        _0x5a3097["id"] +
        _0x1ee15c(0xa0) +
        _0x5a3097["id"] +
        _0x1ee15c(0x169);
    }),
      (_0x2fe18a += _0x2bd677(0x13a)),
      (_0xe53625[_0x2bd677(0xb7)] = _0x2fe18a),
      document[_0x2bd677(0x119)](_0x2bd677(0x11d))["forEach"]((_0x33a4aa) => {
        const _0x2866c2 = _0x2bd677;
        _0x33a4aa[_0x2866c2(0x1a8)]("click", async (_0x720409) => {
          const _0x59363d = _0x2866c2,
            _0x26fd60 = _0x720409[_0x59363d(0xa2)][_0x59363d(0x12d)](
              _0x59363d(0xe7)
            );
          try {
            const _0x1cc0cc = await fetch(
                SCRIPT_URL +
                  "?action=updateTaskState&id=" +
                  _0x26fd60 +
                  _0x59363d(0x107)
              ),
              _0x2fd278 = await _0x1cc0cc[_0x59363d(0xfd)]();
            !_0x2fd278["success"] &&
              alert(_0x59363d(0x15b) + _0x2fd278[_0x59363d(0x123)]),
              await fetchTasks(),
              await fetchTasksHistory();
          } catch (_0xac5da8) {
            console[_0x59363d(0x123)](_0x59363d(0x15e), _0xac5da8);
          }
        });
      }),
      document[_0x2bd677(0x119)](".btn-delete-task")["forEach"]((_0x38a899) => {
        const _0x7ac12 = _0x2bd677;
        _0x38a899[_0x7ac12(0x1a8)](_0x7ac12(0x16c), async (_0x3bf16b) => {
          const _0x21a6b0 = _0x7ac12;
          showNotification(_0x21a6b0(0x17f));
          const _0x3f9cb0 = _0x3bf16b[_0x21a6b0(0xa2)][_0x21a6b0(0x12d)](
            _0x21a6b0(0xe7)
          );
          await deleteTask(_0x3f9cb0),
            await fetchTasks(),
            setTimeout(() => {
              const _0x5cb5f1 = _0x21a6b0;
              showNotification(_0x5cb5f1(0x92));
            }, 0x3e8);
        });
      });
  } catch (_0x236958) {
    showNotification(
      "Erreur\x20lors\x20de\x20la\x20récupération\x20des\x20tâches\x20actives."
    );
  }
}
async function fetchTasksHistory() {
  const _0x1e1fda = _0x36280d;
  try {
    const _0x948aea = await fetch(SCRIPT_URL + "?action=readTasksHistory"),
      _0x746a9e = await _0x948aea[_0x1e1fda(0xfd)](),
      _0xe801dc = document[_0x1e1fda(0x103)]("tasksHistoryContainer");
    if (
      !_0x746a9e ||
      !_0x746a9e[_0x1e1fda(0x178)] ||
      _0x746a9e[_0x1e1fda(0x178)][_0x1e1fda(0xae)] === 0x0
    ) {
      _0xe801dc[_0x1e1fda(0xb7)] = _0x1e1fda(0x13b);
      return;
    }
    let _0xe047a4 =
      "\x0a\x20\x20\x20\x20\x20\x20<table\x20class=\x22tasks-table\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>ID</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Concerne</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Tâche</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th\x20class=\x22colorTask\x22>Importance</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>État</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<th>Actions</th>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20</tr>\x0a\x20\x20\x20\x20\x20\x20\x20\x20</thead>\x0a\x20\x20\x20\x20\x20\x20\x20\x20<tbody>\x0a\x20\x20\x20\x20";
    _0x746a9e[_0x1e1fda(0x178)][_0x1e1fda(0x97)]((_0x45a1ef) => {
      const _0x5098a1 = _0x1e1fda;
      _0xe047a4 +=
        "<tr\x20class=\x22task-history-row\x22>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
        _0x45a1ef["id"] +
        "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
        _0x45a1ef[_0x5098a1(0x19c)] +
        _0x5098a1(0x18c) +
        _0x45a1ef[_0x5098a1(0xfa)] +
        _0x5098a1(0x18f) +
        _0x45a1ef[_0x5098a1(0x167)][_0x5098a1(0xc3)]() +
        "\x22>" +
        _0x45a1ef[_0x5098a1(0x167)] +
        "</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>" +
        _0x45a1ef[_0x5098a1(0xd9)] +
        _0x5098a1(0x90) +
        _0x45a1ef["id"] +
        _0x5098a1(0xbe);
    }),
      (_0xe047a4 += _0x1e1fda(0x13a)),
      (_0xe801dc[_0x1e1fda(0xb7)] = _0xe047a4),
      document[_0x1e1fda(0x119)](_0x1e1fda(0xd2))[_0x1e1fda(0x97)](
        (_0x613b13) => {
          const _0x319e2b = _0x1e1fda;
          _0x613b13[_0x319e2b(0x1a8)](_0x319e2b(0x16c), async (_0x24d1a1) => {
            const _0x4548ff = _0x319e2b,
              _0x5e888b = _0x24d1a1["target"][_0x4548ff(0x12d)]("data-id");
            await deleteTask(_0x5e888b), await fetchTasksHistory();
          });
        }
      );
  } catch (_0x558ac2) {
    console[_0x1e1fda(0x123)](_0x1e1fda(0x12b), _0x558ac2);
  }
}
async function deleteTask(_0x4cde4c) {
  const _0x583756 = _0x36280d;
  try {
    const _0x16687b = await fetch(SCRIPT_URL + _0x583756(0x165) + _0x4cde4c),
      _0x74c66b = await _0x16687b[_0x583756(0xfd)]();
    !_0x74c66b[_0x583756(0x193)] &&
      console[_0x583756(0xe4)](_0x583756(0x1a3) + _0x74c66b["error"]);
  } catch (_0x2d5e7f) {
    console[_0x583756(0x123)](
      "Erreur\x20lors\x20de\x20la\x20suppression\x20de\x20la\x20tâche:",
      _0x2d5e7f
    );
  }
}
document[_0x36280d(0x103)](_0x36280d(0x13d))["addEventListener"](
  "click",
  async () => {
    const _0x2e93d7 = _0x36280d;
    if (confirm(_0x2e93d7(0x96)))
      try {
        const _0x42e55f = await fetch(SCRIPT_URL + _0x2e93d7(0x166)),
          _0x2759b7 = await _0x42e55f[_0x2e93d7(0xfd)]();
        _0x2759b7["success"]
          ? await fetchTasksHistory()
          : alert(_0x2e93d7(0x1a9) + _0x2759b7[_0x2e93d7(0x123)]);
      } catch (_0x453805) {
        console[_0x2e93d7(0x123)](
          "Erreur\x20lors\x20de\x20l\x27effacement\x20de\x20l\x27historique:",
          _0x453805
        );
      }
  }
);
