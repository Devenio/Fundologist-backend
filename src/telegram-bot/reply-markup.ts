import { PANEL_BUTTONS, START_BUTTONS } from './buttons';

export const loginMarkup = {
  keyboard: [[{ text: START_BUTTONS.LOGIN }]],
  resize_keyboard: true,
  one_time_keyboard: true,
};

export const panelMarkup = {
  keyboard: [[{ text: PANEL_BUTTONS.LOGOUT }]],
  resize_keyboard: true,
};
