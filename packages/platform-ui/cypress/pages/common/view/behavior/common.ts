import {FieldValidation, InputField} from "../../interfaces/Fields";
import {popUp} from "../selectors";

export const fillField = ({field, value}: InputField) => {
  field().clear().type(value)
};

export const appendField = ({field, value}: InputField) => {
  field().type(value)
};

export const checkValidation = ({element, text}: FieldValidation) => {
  element().hasText(text);
};

export const checkPopUpMessage = (message: string) => {
  popUp().isVisible().hasText(message)
    .then(element => {
      element.next('button').click();
    });
};
