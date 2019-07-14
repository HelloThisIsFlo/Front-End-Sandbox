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
  paragraphsDiv.classList.add("paragraphs");
  return paragraphsDiv;
}
function buildParagraphTemplate() {
  return document.createElement("p");
}
function buildParagraphFromTemplate(template, index) {
  const paragraph = template.cloneNode();
  paragraph.textContent = `This is paragraph #${index}`;
  paragraph.setAttribute("data-position", index);
  return paragraph;
}

const params = {
  paragraphsPerGroup: 5000,
  triesForEachVersion: 100,
  only: [
    "containingDivAndCloneTemplateAndAppendInTheLoop",
    "noContainingDivAndCloneTemplateAndAppendInTheLoop"
  ]
};

const versions = {
  containingDivAndCreatingNewElementEachTime() {
    const allParagraphsDiv = buildContainingDiv();

    const paragraphs = new Array();
    for (let i = 0; i < params.paragraphsPerGroup; ) {
      const paragraph = document.createElement("p");
      paragraph.textContent = `This is paragraph #${++i}`;
      paragraph.setAttribute("data-position", i);
      paragraphs.push(paragraph);
    }

    allParagraphsDiv.append(...paragraphs);
    document.body.append(allParagraphsDiv);
  },

  containingDivAndCloneTemplateAndAppendAllAtOnce() {
    const allParagraphsDiv = buildContainingDiv();
    const template = buildParagraphTemplate();
    const paragraphs = [];

    for (let i = 0; i < params.paragraphsPerGroup; ) {
      paragraphs.push(buildParagraphFromTemplate(template, ++i));
    }

    allParagraphsDiv.append(...paragraphs);
    document.body.append(allParagraphsDiv);
  },

  containingDivAndCloneTemplateAndAppendInTheLoop() {
    const allParagraphsDiv = buildContainingDiv();
    const template = buildParagraphTemplate();
    for (let i = 0; i < params.paragraphsPerGroup; ) {
      allParagraphsDiv.appendChild(buildParagraphFromTemplate(template, ++i));
    }
    document.body.append(allParagraphsDiv);
  },

  noContainingDivAndCloneTemplateAndAppendInTheLoop() {
    const template = buildParagraphTemplate();
    for (let i = 0; i < params.paragraphsPerGroup; ) {
      document.body.appendChild(buildParagraphFromTemplate(template, ++i));
    }
  }
};

function clean() {
  const paragraphDivs = [];
  for (p of document.getElementsByClassName("paragraphs")) {
    paragraphDivs.push(p);
  }
  for (paragraphDiv of paragraphDivs) {
    paragraphDiv.remove();
  }
  console.log(`Cleaned ${paragraphDivs.length} groups of paragraphs`);
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

testAllVersions();
