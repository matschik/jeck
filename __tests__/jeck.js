import jeck from "../src";

function cloneJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

test("Handling `null`", () => {
  expect(jeck(null, null)).toBe(true);
});

test("Handling `undefined`", () => {
  expect(jeck(undefined, undefined)).toBe(true);
});

describe("Array with primitive types: String, Number, Boolean", () => {
  test("Compare non array values", () => {
    const a = "hello";
    const b = ["orange"];
    expect(jeck(a, b)).toBe(null);
  });

  test("Strictly compare two different arrays to be false", () => {
    const a = ["orange", "apple", "ananas"];
    const b = ["mango"];
    expect(jeck(a, b)).toBe(false);
  });

  test("Strictly compare two arrays with same values and same order", () => {
    const a = ["mango", true, 42];
    const b = ["mango", true, 42];
    expect(jeck(a, b)).toBe(true);
  });

  describe("Order tolerancy", () => {
    test("Compare two arrays with same values but different order", () => {
      const a = ["mango", true, 42];
      const b = [42, "mango", true];
      expect(jeck(a, b, { orderTolerant: true })).toBe(true);
    });
  });
});

describe("Array with simple nested structures", () => {
  test("Exact same arrays must be true", () => {
    const a = [
      { type: "fire", powers: [157, 12] },
      { type: "water", powers: [67], isWeak: false, isNull: null }
    ];

    const b = [
      { type: "fire", powers: [157, 12] },
      { type: "water", powers: [67], isWeak: false, isNull: null }
    ];
    expect(jeck(a, b)).toBe(true);
  });

  test("Different arrays must be false", () => {
    const a = [{ type: "shadow" }, { type: "grass", isStrong: true }];
    const b = [{ type: "fire" }, { type: "water", isWeak: false }];

    expect(jeck(a, b)).toBe(false);
  });
});

// TODO: add deep object nested structure
describe("Object with nested structure", () => {
  const a = {
    a: { lot: { of: { nested: { levels: { in: { this: "object" } } } } } }
  };
  const b = {
    a: { lot: { of: { nested: { levels: { in: { this: {object: true} } } } } } }
  };

  test('equality with same object', () => {
    expect(jeck(a, a)).toBe(true);
  })

  test('diff between objects', () => {
    expect(jeck(a, b)).toBe(false);
  })
});

describe("Array with big JSON objects", () => {
  const bigJSON1 = [
    {
      _id: "5e5d5d7190d28451dc41665b",
      index: 0,
      guid: "f9b930ac-4e15-4c6e-9ea3-5cfda95466b3",
      isActive: true,
      balance: "$2,553.18",
      picture: "http://placehold.it/32x32",
      age: 28,
      eyeColor: "blue",
      name: {
        first: "Mcconnell",
        last: "Alston"
      },
      company: "OMNIGOG",
      email: "mcconnell.alston@omnigog.ca",
      phone: "+1 (854) 530-3583",
      address: "631 Knickerbocker Avenue, Thermal, Washington, 3729",
      about:
        "Proident duis sit nulla consectetur minim pariatur Lorem. Labore veniam elit adipisicing incididunt ut fugiat tempor irure officia nisi amet ea eu sit. Elit duis veniam tempor incididunt. Eu esse magna duis occaecat.",
      registered: "Sunday, January 27, 2019 1:11 AM",
      latitude: "7.37338",
      longitude: "146.042023",
      tags: ["velit", "qui", "pariatur", "in", "magna"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Morris Underwood"
        },
        {
          id: 1,
          name: "Bowman Gibbs"
        },
        {
          id: 2,
          name: "Burnett Turner"
        }
      ],
      greeting: "Hello, Mcconnell! You have 8 unread messages.",
      favoriteFruit: "strawberry"
    },
    {
      _id: "5e5d5d71dd329351a5f5f7bc",
      index: 1,
      guid: "1d9f6818-8f61-471c-b9a5-78b8828c071d",
      isActive: true,
      balance: "$3,559.51",
      picture: "http://placehold.it/32x32",
      age: 31,
      eyeColor: "brown",
      name: {
        first: "Wilkins",
        last: "Williamson"
      },
      company: "BEZAL",
      email: "wilkins.williamson@bezal.org",
      phone: "+1 (839) 417-3869",
      address: "651 Borinquen Pl, Wintersburg, Missouri, 7389",
      about:
        "Deserunt est consequat sint ut consequat ipsum exercitation ullamco aute fugiat aliquip. Laborum nulla velit non enim. Pariatur adipisicing non veniam sunt mollit officia irure sit nulla id consectetur ad non et. Commodo tempor quis dolore veniam minim voluptate cupidatat labore cillum commodo esse pariatur incididunt Lorem. In anim non sit eiusmod ex. Eu deserunt tempor deserunt pariatur aliqua laborum. Excepteur dolore nostrud consectetur sunt anim veniam anim ut cillum.",
      registered: "Friday, March 13, 2015 8:06 PM",
      latitude: "-85.886071",
      longitude: "-84.970562",
      tags: ["excepteur", "elit", "officia", "voluptate", "qui"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Gay Wade"
        },
        {
          id: 1,
          name: "Amanda Hood"
        },
        {
          id: 2,
          name: "Aguirre Burris"
        }
      ],
      greeting: "Hello, Wilkins! You have 6 unread messages.",
      favoriteFruit: "strawberry"
    },
    {
      _id: "5e5d5d71759ce8e5c786b9dc",
      index: 2,
      guid: "5bfc6e11-f901-4c4b-93b0-3585de6b49d1",
      isActive: false,
      balance: "$3,431.39",
      picture: "http://placehold.it/32x32",
      age: 37,
      eyeColor: "brown",
      name: {
        first: "Blanche",
        last: "Stevenson"
      },
      company: "GEEKOL",
      email: "blanche.stevenson@geekol.net",
      phone: "+1 (980) 497-3424",
      address: "241 Troy Avenue, Westerville, Montana, 2118",
      about:
        "Amet ad sit anim incididunt magna consequat. Cillum non magna eiusmod voluptate ipsum cillum et. Laborum Lorem nisi quis tempor aliquip qui fugiat ut ipsum magna.",
      registered: "Sunday, November 24, 2019 6:59 PM",
      latitude: "32.44144",
      longitude: "-119.097916",
      tags: ["velit", "minim", "cupidatat", "non", "dolor"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Romero Valencia"
        },
        {
          id: 1,
          name: "Sutton Rowe"
        },
        {
          id: 2,
          name: "Alison Guthrie"
        }
      ],
      greeting: "Hello, Blanche! You have 5 unread messages.",
      favoriteFruit: "apple"
    },
    {
      _id: "5e5d5d712295d8e883b1a0cd",
      index: 3,
      guid: "1e393f88-4951-44e4-951e-4fe342c0bf7f",
      isActive: true,
      balance: "$1,098.68",
      picture: "http://placehold.it/32x32",
      age: 23,
      eyeColor: "brown",
      name: {
        first: "Holloway",
        last: "Torres"
      },
      company: "ZERBINA",
      email: "holloway.torres@zerbina.info",
      phone: "+1 (944) 524-2088",
      address: "848 Temple Court, Interlochen, Ohio, 6679",
      about:
        "Minim veniam duis officia non aliqua ex sunt irure adipisicing duis duis quis. Incididunt enim veniam amet culpa deserunt deserunt incididunt aliqua ut. Quis aute ad fugiat id mollit eiusmod adipisicing. Consequat velit duis quis et dolore consequat. In velit Lorem veniam aute sint in officia reprehenderit dolor anim sint.",
      registered: "Thursday, October 30, 2014 4:54 PM",
      latitude: "-53.461446",
      longitude: "-166.238374",
      tags: ["in", "velit", "est", "amet", "enim"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Sweet Williams"
        },
        {
          id: 1,
          name: "Morrison Spence"
        },
        {
          id: 2,
          name: "Higgins Mueller"
        }
      ],
      greeting: "Hello, Holloway! You have 10 unread messages.",
      favoriteFruit: "banana"
    },
    {
      _id: "5e5d5d715809b905884561d9",
      index: 4,
      guid: "19f106a4-6ae8-4bfb-92c0-8b84fd702f1e",
      isActive: true,
      balance: "$3,043.29",
      picture: "http://placehold.it/32x32",
      age: 30,
      eyeColor: "brown",
      name: {
        first: "Dodson",
        last: "Bowman"
      },
      company: "CENTREXIN",
      email: "dodson.bowman@centrexin.com",
      phone: "+1 (964) 449-3854",
      address: "501 Lefferts Avenue, Brenton, Alabama, 5273",
      about:
        "Et dolore adipisicing commodo sint elit ullamco quis aute. Reprehenderit ea nostrud aliquip fugiat magna veniam. Et sunt voluptate ipsum laboris ipsum Lorem adipisicing nulla elit sunt ullamco sunt non nisi. Cillum ullamco fugiat in Lorem ut dolor qui sit cillum culpa.",
      registered: "Sunday, March 5, 2017 11:27 PM",
      latitude: "-69.420501",
      longitude: "-156.653004",
      tags: ["ad", "occaecat", "Lorem", "non", "culpa"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Vaughn Mitchell"
        },
        {
          id: 1,
          name: "Mcgee Ball"
        },
        {
          id: 2,
          name: "House Stewart"
        }
      ],
      greeting: "Hello, Dodson! You have 7 unread messages.",
      favoriteFruit: "apple"
    },
    {
      _id: "5e5d5d717b39f25e88adec50",
      index: 5,
      guid: "cedb045b-e08d-46b9-b2fe-4e161125557f",
      isActive: false,
      balance: "$2,562.70",
      picture: "http://placehold.it/32x32",
      age: 24,
      eyeColor: "blue",
      name: {
        first: "Deidre",
        last: "Walters"
      },
      company: "SLUMBERIA",
      email: "deidre.walters@slumberia.biz",
      phone: "+1 (979) 554-2336",
      address: "132 Bayview Avenue, Faywood, Nevada, 3313",
      about:
        "In occaecat officia fugiat ullamco veniam sint mollit incididunt excepteur amet mollit proident officia. Laboris nostrud cupidatat exercitation dolore. Proident do nisi aliqua labore ea incididunt. Fugiat nulla in nisi exercitation ex reprehenderit deserunt eiusmod qui cillum deserunt. Proident anim sint esse ea qui eu est quis cupidatat aliquip proident aliqua.",
      registered: "Sunday, July 31, 2016 8:41 AM",
      latitude: "-52.669806",
      longitude: "157.415633",
      tags: ["elit", "duis", "irure", "est", "et"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Sharpe Joseph"
        },
        {
          id: 1,
          name: "Carey Sullivan"
        },
        {
          id: 2,
          name: "Randall Mccoy"
        }
      ],
      greeting: "Hello, Deidre! You have 10 unread messages.",
      favoriteFruit: "strawberry"
    },
    {
      _id: "5e5d5d7180d5c40ac7c1cc55",
      index: 6,
      guid: "e3506d65-433b-454d-b4c3-a851717d7c00",
      isActive: true,
      balance: "$3,064.52",
      picture: "http://placehold.it/32x32",
      age: 27,
      eyeColor: "brown",
      name: {
        first: "Verna",
        last: "Chan"
      },
      company: "ACUSAGE",
      email: "verna.chan@acusage.tv",
      phone: "+1 (920) 435-2738",
      address: "656 Vandam Street, Oasis, Connecticut, 3084",
      about:
        "Nisi culpa exercitation eu mollit et officia. Esse incididunt minim dolore occaecat. Commodo nulla reprehenderit amet adipisicing ex ea eu. Minim Lorem aute dolore ullamco reprehenderit eiusmod cillum. Nisi duis officia nisi aute velit sint sit magna. Incididunt nostrud ea exercitation magna sunt ullamco culpa excepteur.",
      registered: "Friday, April 18, 2014 11:01 AM",
      latitude: "82.917415",
      longitude: "113.712107",
      tags: ["incididunt", "excepteur", "ut", "enim", "dolore"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Hull Beard"
        },
        {
          id: 1,
          name: "Nola Carlson"
        },
        {
          id: 2,
          name: "Tate Guzman"
        }
      ],
      greeting: "Hello, Verna! You have 9 unread messages.",
      favoriteFruit: "apple"
    },
    {
      _id: "5e5d5d71805df4d0b5e480fa",
      index: 7,
      guid: "1e3a2bb4-0d74-4c7f-b6df-faf8dce26920",
      isActive: false,
      balance: "$2,983.04",
      picture: "http://placehold.it/32x32",
      age: 32,
      eyeColor: "brown",
      name: {
        first: "Maynard",
        last: "Frazier"
      },
      company: "COMTRAK",
      email: "maynard.frazier@comtrak.co.uk",
      phone: "+1 (982) 505-2420",
      address: "399 Buffalo Avenue, Forestburg, Puerto Rico, 4369",
      about:
        "Et culpa exercitation irure sit cillum. Do exercitation adipisicing velit culpa. Ut dolore nostrud sint aliqua elit esse quis enim excepteur aliqua cupidatat pariatur.",
      registered: "Thursday, April 18, 2019 6:17 AM",
      latitude: "10.367151",
      longitude: "43.689405",
      tags: ["nostrud", "amet", "nostrud", "consequat", "deserunt"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Mueller Tanner"
        },
        {
          id: 1,
          name: "Gutierrez Valentine"
        },
        {
          id: 2,
          name: "Gertrude Stevens"
        }
      ],
      greeting: "Hello, Maynard! You have 6 unread messages.",
      favoriteFruit: "strawberry"
    },
    {
      _id: "5e5d5d714ebc1de4247b91c4",
      index: 8,
      guid: "f12e2cb2-ef4d-4f8f-b5fd-f87987428571",
      isActive: false,
      balance: "$1,636.39",
      picture: "http://placehold.it/32x32",
      age: 37,
      eyeColor: "blue",
      name: {
        first: "Mattie",
        last: "Nielsen"
      },
      company: "HOUSEDOWN",
      email: "mattie.nielsen@housedown.biz",
      phone: "+1 (939) 570-2051",
      address: "762 Grove Street, Walton, Alaska, 3291",
      about:
        "Qui labore minim veniam reprehenderit do nisi ad minim. Cupidatat quis aute aute enim exercitation enim et proident. Minim veniam occaecat officia id aute in et sunt dolor quis. Deserunt dolore consequat ea voluptate non commodo ea. Dolore culpa et dolore mollit in eiusmod consectetur ipsum laboris cillum duis tempor. Esse exercitation irure adipisicing esse exercitation Lorem eu proident cupidatat officia cillum excepteur.",
      registered: "Tuesday, March 7, 2017 5:48 PM",
      latitude: "43.608842",
      longitude: "6.294789",
      tags: ["deserunt", "esse", "elit", "sunt", "ullamco"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Roach Cannon"
        },
        {
          id: 1,
          name: "Cleo Mooney"
        },
        {
          id: 2,
          name: "Gladys Hays"
        }
      ],
      greeting: "Hello, Mattie! You have 7 unread messages.",
      favoriteFruit: "apple"
    }
  ];

  const bigJSON2 = [
    {
      _id: "5e5d5d7190d28451dc41665b",
      index: 0,
      guid: "f9b930ac-4e15-4c6e-9ea3-5cfda95466b3",
      isActive: true,
      balance: "$2,553.18",
      picture: "http://placehold.it/32x32",
      age: 28,
      eyeColor: "blue",
      name: {
        first: "Mcconnell",
        last: "Alston"
      },
      company: "OMNIGOG",
      email: "mcconnell.alston@omnigog.ca",
      phone: "+1 (854) 530-3583",
      address: "631 Knickerbocker Avenue, Thermal, Washington, 3729",
      about:
        "Proident duis sit nulla consectetur minim pariatur Lorem. Labore veniam elit adipisicing incididunt ut fugiat tempor irure officia nisi amet ea eu sit. Elit duis veniam tempor incididunt. Eu esse magna duis occaecat.",
      registered: "Sunday, January 27, 2019 1:11 AM",
      latitude: "7.37338",
      longitude: "146.042023",
      tags: ["velit", "qui", "pariatur", "in", "magna"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Morris Underwood"
        },
        {
          id: 1,
          name: "Bowman Gibbs"
        },
        {
          id: 2,
          name: "Burnett Turner"
        }
      ],
      greeting: "Hello, Mcconnell! You have 8 unread messages.",
      favoriteFruit: "strawberry"
    },
    {
      _id: "5e5d5d71dd329351a5f5f7bc",
      index: 1,
      guid: "1d9f6818-8f61-471c-b9a5-78b8828c071d",
      isActive: true,
      balance: "$3,559.51",
      picture: "http://placehold.it/32x32",
      age: 31,
      eyeColor: "brown",
      name: {
        first: "Wilkins",
        last: "Williamson"
      },
      company: "BEZAL",
      email: "wilkins.williamson@bezal.org",
      phone: "+1 (839) 417-3869",
      address: "651 Borinquen Pl, Wintersburg, Missouri, 7389",
      about:
        "Deserunt est consequat sint ut consequat ipsum exercitation ullamco aute fugiat aliquip. Laborum nulla velit non enim. Pariatur adipisicing non veniam sunt mollit officia irure sit nulla id consectetur ad non et. Commodo tempor quis dolore veniam minim voluptate cupidatat labore cillum commodo esse pariatur incididunt Lorem. In anim non sit eiusmod ex. Eu deserunt tempor deserunt pariatur aliqua laborum. Excepteur dolore nostrud consectetur sunt anim veniam anim ut cillum.",
      registered: "Friday, March 13, 2015 8:06 PM",
      latitude: "-85.886071",
      longitude: "-84.970562",
      tags: ["excepteur", "elit", "officia", "voluptate", "qui"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Gay Wade"
        },
        {
          id: 1,
          name: "Amanda Hood"
        },
        {
          id: 2,
          name: "Aguirre Burris"
        }
      ],
      greeting: "Hello, Wilkins! You have 6 unread messages.",
      favoriteFruit: "strawberry"
    },
    {
      _id: "5e5d5d71759ce8e5c786b9dc",
      index: 2,
      guid: "5bfc6e11-f901-4c4b-93b0-3585de6b49d1",
      isActive: false,
      balance: "$3,431.39",
      picture: "http://placehold.it/32x32",
      age: 37,
      eyeColor: "brown",
      name: {
        first: "Blanche",
        last: "Stevenson"
      },
      company: "GEEKOL",
      email: "blanche.stevenson@geekol.net",
      phone: "+1 (980) 497-3424",
      address: "241 Troy Avenue, Westerville, Montana, 2118",
      about:
        "Amet ad sit anim incididunt magna consequat. Cillum non magna eiusmod voluptate ipsum cillum et. Laborum Lorem nisi quis tempor aliquip qui fugiat ut ipsum magna.",
      registered: "Sunday, November 24, 2019 6:59 PM",
      latitude: "32.44144",
      longitude: "-119.097916",
      tags: ["velit", "minim", "cupidatat", "non", "dolor"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Romero Valencia"
        },
        {
          id: 1,
          name: "Sutton Rowe"
        },
        {
          id: 2,
          name: "Alison Guthrie"
        }
      ],
      greeting: "Hello, Blanche! You have 5 unread messages.",
      favoriteFruit: "apple"
    },
    {
      _id: "5e5d5d712295d8e883b1a0cd",
      index: 3,
      guid: "1e393f88-4951-44e4-951e-4fe342c0bf7f",
      isActive: true,
      balance: "$1,098.68",
      picture: "http://placehold.it/32x32",
      age: 23,
      eyeColor: "brown",
      name: {
        first: "Holloway",
        last: "Torres"
      },
      company: "ZERBINA",
      email: "holloway.torres@zerbina.info",
      phone: "+1 (944) 524-2088",
      address: "848 Temple Court, Interlochen, Ohio, 6679",
      about:
        "Minim veniam duis officia non aliqua ex sunt irure adipisicing duis duis quis. Incididunt enim veniam amet culpa deserunt deserunt incididunt aliqua ut. Quis aute ad fugiat id mollit eiusmod adipisicing. Consequat velit duis quis et dolore consequat. In velit Lorem veniam aute sint in officia reprehenderit dolor anim sint.",
      registered: "Thursday, October 30, 2014 4:54 PM",
      latitude: "-53.461446",
      longitude: "-166.238374",
      tags: ["in", "velit", "est", "amet", "enim"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Sweet Williams"
        },
        {
          id: 1,
          name: "Morrison Spence"
        },
        {
          id: 2,
          name: "Higgins Mueller"
        }
      ],
      greeting: "Hello, Holloway! You have 10 unread messages.",
      favoriteFruit: "banana"
    },
    {
      _id: "5e5d5d715809b905884561d9",
      index: 4,
      guid: "19f106a4-6ae8-4bfb-92c0-8b84fd702f1e",
      isActive: true,
      balance: "$3,043.29",
      picture: "http://placehold.it/32x32",
      age: 30,
      eyeColor: "brown",
      name: {
        first: "Dodson",
        last: "Bowman"
      },
      company: "CENTREXIN",
      email: "dodson.bowman@centrexin.com",
      phone: "+1 (964) 449-3854",
      address: "501 Lefferts Avenue, Brenton, Alabama, 5273",
      about:
        "Et dolore adipisicing commodo sint elit ullamco quis aute. Reprehenderit ea nostrud aliquip fugiat magna veniam. Et sunt voluptate ipsum laboris ipsum Lorem adipisicing nulla elit sunt ullamco sunt non nisi. Cillum ullamco fugiat in Lorem ut dolor qui sit cillum culpa.",
      registered: "Sunday, March 5, 2017 11:27 PM",
      latitude: "-69.420501",
      longitude: "-156.653004",
      tags: ["ad", "occaecat", "Lorem", "non", "culpa"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Vaughn Mitchell"
        },
        {
          id: 1,
          name: "Mcgee Ball"
        },
        {
          id: 2,
          name: "House Stewart"
        }
      ],
      greeting: "Hello, Dodson! You have 7 unread messages.",
      favoriteFruit: "apple"
    },
    {
      _id: "5e5d5d717b39f25e88adec50",
      index: 5,
      guid: "cedb045b-e08d-46b9-b2fe-4e161125557f",
      isActive: false,
      balance: "$2,562.70",
      picture: "http://placehold.it/32x32",
      age: 24,
      eyeColor: "blue",
      name: {
        first: "Deidre",
        last: "Walters"
      },
      company: "SLUMBERIA",
      email: "deidre.walters@slumberia.biz",
      phone: "+1 (979) 554-2336",
      address: "132 Bayview Avenue, Faywood, Nevada, 3313",
      about:
        "In occaecat officia fugiat ullamco veniam sint mollit incididunt excepteur amet mollit proident officia. Laboris nostrud cupidatat exercitation dolore. Proident do nisi aliqua labore ea incididunt. Fugiat nulla in nisi exercitation ex reprehenderit deserunt eiusmod qui cillum deserunt. Proident anim sint esse ea qui eu est quis cupidatat aliquip proident aliqua.",
      registered: "Sunday, July 31, 2016 8:41 AM",
      latitude: "-52.669806",
      longitude: "157.415633",
      tags: ["elit", "duis", "irure", "est", "et"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Sharpe Joseph"
        },
        {
          id: 1,
          name: "Carey Sullivan"
        },
        {
          id: 2,
          name: "Randall Mccoy"
        }
      ],
      greeting: "Hello, Deidre! You have 10 unread messages.",
      favoriteFruit: "strawberry"
    },
    {
      _id: "5e5d5d7180d5c40ac7c1cc55",
      index: 6,
      guid: "e3506d65-433b-454d-b4c3-a851717d7c00",
      isActive: true,
      balance: "$3,064.52",
      picture: "http://placehold.it/32x32",
      age: 27,
      eyeColor: "brown",
      name: {
        first: "Verna",
        last: "Chan"
      },
      company: "ACUSAGE",
      email: "verna.chan@acusage.tv",
      phone: "+1 (920) 435-2738",
      address: "656 Vandam Street, Oasis, Connecticut, 3084",
      about:
        "Nisi culpa exercitation eu mollit et officia. Esse incididunt minim dolore occaecat. Commodo nulla reprehenderit amet adipisicing ex ea eu. Minim Lorem aute dolore ullamco reprehenderit eiusmod cillum. Nisi duis officia nisi aute velit sint sit magna. Incididunt nostrud ea exercitation magna sunt ullamco culpa excepteur.",
      registered: "Friday, April 18, 2014 11:01 AM",
      latitude: "82.917415",
      longitude: "113.712107",
      tags: ["incididunt", "excepteur", "ut", "enim", "dolore"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Hull Beard"
        },
        {
          id: 1,
          name: "Nola Carlson"
        },
        {
          id: 2,
          name: "Tate Guzman"
        }
      ],
      greeting: "Hello, Verna! You have 9 unread messages.",
      favoriteFruit: "apple"
    },
    {
      _id: "5e5d5d71805df4d0b5e480fa",
      index: 7,
      guid: "1e3a2bb4-0d74-4c7f-b6df-faf8dce26920",
      isActive: false,
      balance: "$2,983.04",
      picture: "http://placehold.it/32x32",
      age: 32,
      eyeColor: "brown",
      name: {
        first: "Maynard",
        last: "Frazier"
      },
      company: "COMTRAK",
      email: "maynard.frazier@comtrak.co.uk",
      phone: "+1 (982) 505-2420",
      address: "399 Buffalo Avenue, Forestburg, Puerto Rico, 4369",
      about:
        "Et culpa exercitation irure sit cillum. Do exercitation adipisicing velit culpa. Ut dolore nostrud sint aliqua elit esse quis enim excepteur aliqua cupidatat pariatur.",
      registered: "Thursday, April 18, 2019 6:17 AM",
      latitude: "10.367151",
      longitude: "43.689405",
      tags: ["nostrud", "amet", "nostrud", "consequat", "deserunt"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Mueller Tanner"
        },
        {
          id: 1,
          name: "Gutierrez Valentine"
        },
        {
          id: 2,
          name: "Gertrude Stevens"
        }
      ],
      greeting: "Hello, Maynard! You have 6 unread messages.",
      favoriteFruit: "strawberry"
    },
    {
      _id: "5e5d5d714ebc1de4247b91c4",
      index: 8,
      guid: "f12e2cb2-ef4d-4f8f-b5fd-f87987428571",
      isActive: false,
      balance: "$1,636.39",
      picture: "http://placehold.it/32x32",
      age: 37,
      eyeColor: "blue",
      name: {
        first: "Mattie",
        last: "Nielsen"
      },
      company: "HOUSEDOWN",
      email: "mattie.nielsen@housedown.biz",
      phone: "+1 (939) 570-2051",
      address: "762 Grove Street, Walton, Alaska, 3291",
      about:
        "Qui labore minim veniam reprehenderit do nisi ad minim. Cupidatat quis aute aute enim exercitation enim et proident. Minim veniam occaecat officia id aute in et sunt dolor quis. Deserunt dolore consequat ea voluptate non commodo ea. Dolore culpa et dolore mollit in eiusmod consectetur ipsum laboris cillum duis tempor. Esse exercitation irure adipisicing esse exercitation Lorem eu proident cupidatat officia cillum excepteur.",
      registered: "Tuesday, March 7, 2017 5:48 PM",
      latitude: "43.608842",
      longitude: "6.294789",
      tags: ["deserunt", "esse", "elit", "sunt", "ullamco"],
      range: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      friends: [
        {
          id: 0,
          name: "Roach Cannon"
        },
        {
          id: 1,
          name: "Cleo Mooney"
        },
        {
          id: 2,
          name: "Gladys Hays"
        }
      ],
      greeting: "Hello, Mattie! You have 7 unread messages.",
      favoriteFruit: "apple"
    }
  ];

  test("Equal nested structures", () => {
    expect(jeck(bigJSON1, bigJSON2)).toBe(true);
  });

  test("With additional array item, equality must be false", () => {
    const bigJSON2Clone = cloneJSON(bigJSON2);
    bigJSON2Clone.push({ test: null, random: "string" });
    expect(jeck(bigJSON1, bigJSON2Clone)).toBe(false);
  });

  test("Add property to first item, equality must be false", () => {
    const bigJSON2Clone = cloneJSON(bigJSON2);
    bigJSON2Clone[0].random = 42;
    expect(jeck(bigJSON1, bigJSON2Clone)).toBe(false);
  });

  describe("With a different order", () => {
    const bigJSON2Reordered = cloneJSON(bigJSON2);
    const firstItem = cloneJSON(bigJSON2Reordered[0]);
    const lastItem = cloneJSON(bigJSON2Reordered[bigJSON2Reordered.length - 1]);
    bigJSON2Reordered[0] = lastItem;
    bigJSON2Reordered[bigJSON2Reordered.length - 1] = firstItem;

    test("With order tolerancy, equality must be true", () => {
      expect(jeck(bigJSON1, bigJSON2Reordered, { orderTolerant: true })).toBe(
        true
      );
    });

    test("Without order tolerancy, equality must be false", () => {
      expect(jeck(bigJSON1, bigJSON2Reordered)).toBe(false);
    });
  });
});
