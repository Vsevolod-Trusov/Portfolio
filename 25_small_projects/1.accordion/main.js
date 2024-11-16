const data = [
  {
    id: "1",
    question: "What are accordion components?",
    answer:
      "Accordion components are user interface elements used for organizing and presenting content in a collapsible manner. They typically consist of a header, content, and an expand/collapse action.",
  },
  {
    id: "2",
    question: "What are they used for?",
    answer:
      "They are commonly employed in various contexts, including FAQs, product descriptions, navigation menus, settings panels, and data tables, to save screen space and provide a structured and user-friendly interface for presenting information or options.",
  },
  {
    id: "3",
    question: "Accordion as a musical instrument",
    answer:
      "The accordion is a musical instrument with a keyboard and bellows. It produces sound by air passing over reeds when the player expands or compresses the bellows, used in various music genres.",
  },
  {
    id: "4",
    question: "Can I create an accordion component with a different framework?",
    answer:
      "Yes of course, it is very possible to create an accordion component with another framework.",
  },
];
const Classes = {
  accordion: "accordion",
  accordionItem: "accordion_item",
  accordionTitle: "accordion_title",
  accordionAnswer: "accordion_answer",
  active: "active",
  close: "close",
};
const EMPTY_SPACE = " ";

function createAccordionData() {
  const accordion = document.querySelector(`.${Classes.accordion}`);
  accordion.innerHTML = data
    .map(
      ({ question, answer }) => `
  <div class='${Classes.accordionItem}'>
    <div class='${Classes.accordionTitle}'>
        <h3>${question}</h3>
        <i class='fa-solid fa-arrow-down'></i>
    </div>
    <div class='${Classes.accordionAnswer}'>
      <p>${answer}</p>
    </div>
  </div>
  `
    )
    .join(EMPTY_SPACE);
}

function addAccordionListeners() {
  const accordionTitles = document.querySelectorAll(
    `.${Classes.accordionTitle}`
  );

  console.log("====================================");
  console.log(accordionTitles);
  console.log("====================================");

  accordionTitles.forEach((currentItem) => {
    currentItem.addEventListener("click", () => {
      if (currentItem.classList.contains(Classes.active)) {
        currentItem.classList.remove(Classes.active);
        currentItem.classList.add(Classes.close);
      } else if (currentItem.classList.contains(Classes.close)) {
        currentItem.classList.remove(Classes.close);
        currentItem.classList.add(Classes.active);
      } else {
        let getAlreadyAddedActiveClasses = document.querySelectorAll(
          `.${Classes.active}`
        );
        let getAlreadyAddedCloseClasses = document.querySelectorAll(
          `.${Classes.close}`
        );

        getAlreadyAddedActiveClasses.forEach((item) => {
          item.classList.remove(Classes.active);
        });

        getAlreadyAddedCloseClasses.forEach((item) => {
          item.classList.remove(Classes.close);
        });

        if (currentItem.classList.contains(Classes.close)) {
          currentItem.classList.remove(Classes.close);
        }

        currentItem.classList.add(Classes.active);
      }
    });
  });
}

function main() {
  createAccordionData();
  addAccordionListeners();
}

main();
