function logAllClickPosition() {
  document.addEventListener("click", event => {
    console.log(event);
    console.log("event.clientX :", event.clientX);
    console.log("event.clientY :", event.clientY);
    console.log("event.screenX :", event.screenX);
    console.log("event.screenY :", event.screenY);
    console.log("event.pageX :", event.pageX);
    console.log("event.pageY :", event.pageY);
  });
}

function paragraphClickListener(event) {
  if (event.target.nodeName === "P") {
    let position = Number(event.target.getAttribute("data-position"));
    console.log(`paragraph #${position} was clicked`);
  }
}
function buildContainingDiv() {
  const paragraphsDiv = document.createElement("div");
  paragraphsDiv.addEventListener("click", paragraphClickListener);
  return paragraphsDiv;
}
function buildParagraphTemplate() {
  return document.createElement("p");
}
function buildParagraphFromTemplate(template, index) {
  const paragraph = template.cloneNode();
  paragraph.textContent = `This is paragraph #${index}`;
  paragraph.setAttribute("data-position", index);
  paragraph.classList.add("paragraph");
  return paragraph;
}

const params = {
  paragraphsPerGroup: 1000,
  triesForEachVersion: 100,
  only: [
    "containingDiv_cloneTemplate_appendInTheLoop",
    "noContainingDiv_cloneTemplate_appendInTheLoop",
    "documentFragmentInsteadOfContainingDiv_cloneTemplate_appendInTheLoop"
  ]
};

const versions = {
  containingDiv_createNewElementEachTime() {
    const allParagraphsDiv = buildContainingDiv();

    const paragraphs = new Array();
    for (let i = 0; i < params.paragraphsPerGroup; ) {
      const paragraph = document.createElement("p");
      paragraph.textContent = `This is paragraph #${++i}`;
      paragraph.setAttribute("data-position", i);
      paragraph.classList.add("paragraph");
      paragraphs.push(paragraph);
    }

    allParagraphsDiv.append(...paragraphs);
    document.body.append(allParagraphsDiv);
  },

  containingDiv_cloneTemplate_appendAllAtOnce() {
    const allParagraphsDiv = buildContainingDiv();
    const template = buildParagraphTemplate();
    const paragraphs = [];

    for (let i = 0; i < params.paragraphsPerGroup; ) {
      paragraphs.push(buildParagraphFromTemplate(template, ++i));
    }

    allParagraphsDiv.append(...paragraphs);
    document.body.append(allParagraphsDiv);
  },

  containingDiv_cloneTemplate_appendInTheLoop() {
    const allParagraphsDiv = buildContainingDiv();
    const template = buildParagraphTemplate();
    for (let i = 0; i < params.paragraphsPerGroup; ) {
      allParagraphsDiv.appendChild(buildParagraphFromTemplate(template, ++i));
    }
    document.body.append(allParagraphsDiv);
  },

  noContainingDiv_cloneTemplate_appendInTheLoop() {
    const template = buildParagraphTemplate();
    for (let i = 0; i < params.paragraphsPerGroup; ) {
      document.body.appendChild(buildParagraphFromTemplate(template, ++i));
    }
  },
  documentFragmentInsteadOfContainingDiv_cloneTemplate_appendInTheLoop() {
    const allParagraphsFragment = document.createDocumentFragment();
    const template = buildParagraphTemplate();
    for (let i = 0; i < params.paragraphsPerGroup; ) {
      allParagraphsFragment.appendChild(
        buildParagraphFromTemplate(template, ++i)
      );
    }
    document.body.appendChild(allParagraphsFragment);
  }
};

function clean() {
  const paragraphs = [];
  for (p of document.getElementsByClassName("paragraph")) {
    paragraphs.push(p);
  }
  for (paragraphDiv of paragraphs) {
    paragraphDiv.remove();
  }
  console.log(`Cleaned ${paragraphs.length} paragraphs`);
}

function testAllVersions() {
  for (version in versions) {
    if (params.only && params.only.includes(version)) {
      let durationSum = 0;
      for (let i = 0; i < params.triesForEachVersion; i++) {
        const start = performance.now();
        versions[version]();
        const end = performance.now();

        durationSum += end - start;
      }

      const avgDuration = durationSum / params.triesForEachVersion;
      console.log(`${version}\n-> ${avgDuration}`);
    }
  }

  clean();
}

const n = 30000;
function buildHugeAmountOfParagraphs() {
  const template = buildParagraphTemplate();
  for (let i = 0; i < n; ++i) {
    document.body.appendChild(buildParagraphFromTemplate(template, i));
  }
}
function buildHugeAmountOfParagraphs_inAsyncBlocks() {
  function doBuild() {
    const template = buildParagraphTemplate();
    for (let i = 0; i < chunk; ++i) {
      built += 1;
      document.body.appendChild(buildParagraphFromTemplate(template, built));
      if (built >= n) {
        return;
      }
    }
    setTimeout(doBuild, 0);
  }

  let chunk = 10;
  let built = 0;
  setTimeout(doBuild, 0);
}


const nanodegreeSection = document.getElementById("individual-nanodegree-programs");
nanodegreeSection.addEventListener("mouseenter", () => {
  nanodegreeSection.style.backgroundColor = "red";
});
nanodegreeSection.addEventListener("mouseleave", () => {
  nanodegreeSection.style.backgroundColor = "";
});

// testAllVersions();
