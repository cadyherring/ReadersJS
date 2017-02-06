var pManager, rdr, font;

function preload() {

  bg = loadImage('data/page.png');
  font = loadFont('fonts/times.ttf');
}

function setup() {

  createCanvas(900, 480);

  RiText.defaultFill(255);
  RiText.defaultFont(font, 17);
  RiText.defaults.paragraphIndent = 20;

  RiTa.loadString('data/image.txt', function (txt) {

    // do the layout
    pManager = PageManager.getInstance(Reader.APP);
    pManager.storePerigrams(3, trigrams);
    pManager.layout(txt, 25, 40, 400, 400); // grid-rect

    // add some readers
    rdr = new Reader(pManager.recto, 1, 8, .4);
    rdr = new PerigramReader(pManager.recto);
    rdr = new MesosticReader(pManager.verso, 1.1);

    // set page-turner/logger
    pManager.focus(rdr);
  });
}


function draw() {

  background(0);
	pManager && (pManager.draw());
}

function keyPressed() {

	keyCode == 39 && (pManager.nextPage());
	keyCode == 37 && (pManager.lastPage());
}
