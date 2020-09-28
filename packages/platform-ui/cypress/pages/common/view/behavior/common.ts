import {TFieldValidation, TInputField} from "../../interfaces/IFields";
import {popUp} from "../selectors";

export const fillField = ({field, value}: TInputField) => {
  field().clear().type(value)
};

export const appendField = ({field, value}: TInputField) => {
  field().type(value)
};

export const checkValidation = ({element, text}: TFieldValidation) => {
  element().hasText(text);
};

export const checkPopUpMessage = (message: string) => {
  popUp().isVisible().hasText(message)
    .then(element => {
      element.next('button').click();
    });
};
