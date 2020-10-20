import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

type HtmlInputAttrs<T, IA = InputHTMLAttributes<T>> = {
  [P in keyof IA]?: IA[P];
};

type HtmlTextareaAttrs<T, TA = TextareaHTMLAttributes<T>> = {
  [P in keyof TA]?: TA[P];
};

export interface FieldInputAttrs extends HtmlInputAttrs<HTMLInputElement> {
  checked?: boolean;
  multiple?: boolean;
}

export interface FieldTextareaAttrs extends HtmlTextareaAttrs<HTMLTextAreaElement> {
  checked?: boolean;
  multiple?: boolean;
}
