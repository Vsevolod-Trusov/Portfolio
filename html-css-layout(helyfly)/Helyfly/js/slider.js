const SLIDES_TO_SHOW = 1;
const SLIDES_TO_SCROLL = 1;
const START_MIN_WIDTH = 220;
const START_POSITION = 0;
let position = 0;
let currentItemIndex = 0;

const NEXT_BUTTON_CLASSNAME = '.next_button';
const PREVIOUS_BUTTON_CLASSNAME = '.previous_button';
const NUMBER_WITH_SWITCH_BUTTONS_CLASSNAME = '.number-with-switch-buttons';
const SLIDERS_ITEMS_CLASSNAME = '.slider-item-container';
const CIRCLE_BACKGROUND_COLOR = '#fc9b09';
const CIRCLE_BACKGROUND_TRANSPARENT = 'transparent';

const nextButton = document.querySelector(NEXT_BUTTON_CLASSNAME);
const previousButton = document.querySelector(PREVIOUS_BUTTON_CLASSNAME);
const track = document.querySelector(NUMBER_WITH_SWITCH_BUTTONS_CLASSNAME);
const sliderItems = document.querySelectorAll(SLIDERS_ITEMS_CLASSNAME);

const ITEMS_COUNT = sliderItems.length;
const ITEM_WIDTH = track.clientWidth || START_MIN_WIDTH;
const MOVE_POSITION = SLIDES_TO_SCROLL * ITEM_WIDTH;

const sliderItemsArray = Array.from(sliderItems);

sliderItemsArray.map((slide) => (slide.style.minWidth = `${ITEM_WIDTH}px`));

const checkButtons = () => {
  previousButton.disabled = position === START_POSITION;
  nextButton.disabled =
    position <= -(ITEMS_COUNT - SLIDES_TO_SHOW) * ITEM_WIDTH;
};

const setPosition = (currentItem) => {
  let circleContainerIndex = currentItem;
  circleContainerIndex++;
  const counterContainers = document.querySelectorAll(
    `.counter-${circleContainerIndex}`,
  );
  const circlesContainerArray = Array.from(counterContainers);

  circlesContainerArray.map(
    (circleElement, index) =>
      (circleElement.style.background =
        index === currentItem
          ? CIRCLE_BACKGROUND_COLOR
          : CIRCLE_BACKGROUND_TRANSPARENT),
  );

  sliderItemsArray.map(
    (slide) => (slide.style.transform = `translateX(${position}px)`),
  );
};

const handleClickNextButton = () => {
  position -= MOVE_POSITION;
  setPosition(++currentItemIndex);
  checkButtons();
};

const handleClickPreviousButton = () => {
  position += MOVE_POSITION;
  setPosition(--currentItemIndex);
  checkButtons();
};

checkButtons();
