import {TUser} from "../../../common/interfaces/ICommon";
import {checkValidation, fillField} from "../../../common/view/behavior/common";
import {emailField, emailValidation, passwordField, passwordValidation} from "../selectors";

export const fillEmailPassword = ({email, password}: TUser) => {
  fillField({field: emailField, value: email});
  checkValidation({element: emailValidation, text: ''});
  fillField({field: passwordField, value: password});
  checkValidation({element: passwordValidation, text: ''});
};
