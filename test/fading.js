var pManager, font, bgColor, readers = {};


///////////////////////////////////////////////////////////////////////

function test() {

  var stone = pManager.verso.cellAt(6,3);
  stone.fill([255,0,0,255]);

  stone.colorTo([0,255,0,255],4);
  stone.colorTo([0,0,255,255],4, 2);
}

///////////////////////////////////////////////////////////////////////


function preload() {

  font = loadFont('../fonts/Baskerville.ttf');
}

function setup() {

  createCanvas(1280, 720);

  RiText.defaultFont(font, 24);
  RiText.defaultFill(STYLE.Gray);
  RiText.defaults.paragraphIndent = 20;

  loadTexts(function () {

    // do the layout
    pManager = PageManager.getInstance(Reader.APP);
    pManager.layout(TEXTS[0], 25, 40, 580, 650);
    test();
  });
};

function draw() {

  background(bgColor || 0);
  pManager && (pManager.draw());
}

function loadTexts(callback) {
  var count = 0;
  var total = TEXTS.length;
  TEXTS.forEach(function (text) {
    RiTa.loadString('../'+text.file, function (txt) {
      text.contents = txt;
      if (++count === total)
        callback();
    });
  });
}

///////////////////////////////////////////////////////////////////////

function resetText(textName) {

  Reader.pauseAll(true);

  pManager.layout(textFromName(textName), 25, 40, 580, 650);

  allReaders().forEach(function(r) {

    // focused reader on verso, others distributed across pages
    var idx = (r.hasFocus()) ? 0 : (r.id % Grid.instances.length);
    r.position(Grid.instances[idx], 0, 0);
  });

  Reader.pauseAll(false);
}

function allReaders(activeOnly) {

  var all = [];
  Object.keys(readers).forEach(function(name) {
    var reader = readerFromName(name);
    if (!activeOnly || !reader.hidden)
      all.push(reader);
  })
  return all;
}

function randomReader(activeOnly) {

  var rdrs = allReaders(activeOnly);
  if (rdrs && rdrs.length) {
    return rdrs[Math.floor(random(rdrs.length))];
  }
}

function textFromName(textName) {

  var result;
  TEXTS.forEach(function (text) {
    if (text.title == textName)
      result = text;
  });
  return result;
}

function readerFromName(name) {

  if (name && readers[name])
    return readers[name].reader;
}

function textChanged() {
    var textName = textSelect.value();
    log("[UI] TEXT: " + textName);
    if ( ifTrigramReady(textName) )
       resetText(textName);
    else {
      notify = textName;
      overlay.classList.toggle('fade');

    }
}
