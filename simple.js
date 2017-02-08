var pManager, rdr, bg, font;

function preload() {

  bg = loadImage('data/page.png');
  font = loadFont('fonts/Baskerville.ttf');
}

function setup() {

  createCanvas(900, 480);

  RiText.defaultFont(font, 17);
  RiText.defaults.paragraphIndent = 20;

  RiTa.loadString('data/image.txt', function (txt) {

    // do the layout
    pManager = PageManager.getInstance(Reader.APP);
    pManager.storePerigrams(3, trigrams);
    pManager.layout(txt, 25, 40, 400, 400);

    // add some readers
    rdr = new Reader(pManager.verso, 1, 8, .4);

    // set page-turner/logger
    pManager.focus(rdr);
  });
}


function draw() {

  background(bg);
	pManager && (pManager.draw());
}
