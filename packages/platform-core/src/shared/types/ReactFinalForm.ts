import { InputHTMLAttributes} from 'react';

type HtmlInputAttrs<T, IA = InputHTMLAttributes<T>> = {
  [P in keyof IA]?: IA[P];
};

export interface FieldInputAttrs<T extends HTMLInputElement = HTMLInputElement> extends HtmlInputAttrs<T> {
  checked?: boolean;
  multiple?: boolean;
}
