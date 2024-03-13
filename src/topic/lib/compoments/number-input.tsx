// https://github.com/mui/material-ui/issues/19154#issuecomment-1758395129

import React, { useState } from "react";

import { AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
  Typography,
} from "@mui/material";

interface NumberInputProps
    extends Omit<OutlinedInputProps, "value" | "onChange"> {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  decimalScale?: number;
  unit?: string;
  singularUnit?: string;
  helperText?: string;
  onChange?: (value: number) => void;
  onInvalidInput?: (value: string | null) => void;
}

/*
 * author: https://github.com/nameer
 * source: https://gist.github.com/nameer/664abb9d4e261a210de1f1ba814a0ad2
 */

const NumberInput: React.FC<NumberInputProps> = ({
                                                   initialValue,
                                                   min = 0,
                                                   max = Infinity,
                                                   step = 1,
                                                   decimalScale = 0,
                                                   unit,
                                                   singularUnit: singleUnit,
                                                   helperText,
                                                   onChange,
                                                   onInvalidInput,
                                                   ...props
                                                 }) => {
  const [value, setValue] = useState(initialValue?.toString());
  const [addBtnFocus, setAddBtnFocus] = useState(false);
  // Allow decimal if any of props is decimal
  // num can be Infinity: num%1 || 0
  // num%1 can give numbers like 0 and 0.1: hence length-2
  // decimalScale cannot be negative: floor to 0 with Max
  const propDecimalScale = Math.max(
      ...[min, max, step].map((num) => (num % 1 || 0).toString().length - 2),
      0,
  );
  const allowDecimal = decimalScale > 0 || propDecimalScale > 0;
  // Update decimalScale to allow decimal
  decimalScale = decimalScale > 0 ? decimalScale : propDecimalScale;
  // Regex to match value with
  const numberRegex = generateNumberRegex(min, max, allowDecimal);

  const formatValue = (val: any) => clampNumber(val, min, max, decimalScale);
  const getKeyDownChar = (e: KeyboardEvent): string | undefined => {
    /* Returns the event's key if it's a character. */

    if (e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.key === "ArrowUp") {
      updateValue(step);
      return;
    } else if (e.key === "ArrowDown") {
      updateValue(-step);
      return;
    }
    const char = e.key;
    if (char.length > 1)
        // Not character
      return;
    const charCode = char.charCodeAt(0);
    if (charCode < 32 || (charCode > 126 && charCode < 160) || charCode > 255)
        // Not printable character
      return;
    return char;
  };

  const updateChange = (value: string) => {
    setValue(value);
    onInvalidInput?.(null);
    const formattedValue = formatValue(value);
    if (formattedValue.toString() === value) onChange?.(formattedValue);
  };
  const updateValue = (diff: number) =>
      updateChange(formatValue(formatValue(value) + diff).toString());
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      updateChange((e.target as HTMLInputElement).value);
  const handlePaste = (e: ClipboardEvent) => {
    const text = e.clipboardData?.getData("Text");
    if (
        !text?.trim().match(numberRegex) ||
        Number(text) < min ||
        Number(text) > max
    ) {
      onInvalidInput?.(text);
      e.preventDefault();
    }
  };
  const handleBlur = (e: FocusEvent) => {
    handleAddBtnFocus(e);
    updateChange(formatValue((e.target as HTMLInputElement).value).toString());
  };
  const handleAddBtnFocus = (e: FocusEvent) =>
      setAddBtnFocus(e.type === "focus");
  const handleKeyDown = (e: KeyboardEvent) => {
    const char = getKeyDownChar(e);
    if (!char)
        // No character
      return;
    const target = e.target as HTMLInputElement;
    if (target.selectionStart === null || target.selectionEnd === null)
        // No selection
      return;
    const resultingStr =
        target.value.substring(0, target.selectionStart) +
        char +
        target.value.substring(target.selectionEnd);
    if (
        !resultingStr.match(numberRegex) ||
        Number(resultingStr) < min ||
        Number(resultingStr) > max
    ) {
      onInvalidInput?.(resultingStr);
      e.preventDefault();
    }
  };

  props ??= {};
  props.sx ??= {};
  props.sx = { ...props.sx, width: "25.3ch" };
  props.inputProps ??= {};
  props.inputProps.style ??= {};
  props.inputProps.style = props.inputProps.style as React.CSSProperties;
  props.inputProps.style.textAlign = "center";
  props.placeholder ??= Math.min(max, Math.max(min, 0)).toString();
  const formControlProps = getFormControlProps(props);

  const actionsDisabled = props.readOnly || props.disabled;
  singleUnit ??= unit;
  unit ??= singleUnit;

  return (
      <FormControl {...formControlProps} variant="outlined">
        <InputLabel htmlFor="number-input">{props.label}</InputLabel>
        <OutlinedInput
            {...props}
            value={value}
            id="number-input"
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onFocus={handleAddBtnFocus}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                    aria-label="decrease value"
                    onClick={updateValue.bind(null, -step)}
                    edge="start"
                    disabled={actionsDisabled || formatValue(value) <= min}
                >
                  <RemoveCircle />
                </IconButton>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Typography className="cursor-default select-none">
                  {formatValue(value) === 1 ? singleUnit : unit}
                </Typography>
                <IconButton
                    aria-label="increase value"
                    onClick={updateValue.bind(null, step)}
                    edge="end"
                    disabled={actionsDisabled || formatValue(value) >= max}
                    color={addBtnFocus ? props.color || "primary" : undefined}
                    onFocus={handleAddBtnFocus}
                    onBlur={handleAddBtnFocus}
                >
                  <AddCircle />
                </IconButton>
              </InputAdornment>
            }
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
  );
};

export default NumberInput;

const clampNumber = (
    val: any,
    min: number = -Infinity,
    max: number = Infinity,
    decimalScale: number = 0,
): number => {
  let v = typeof val === "number" ? val : Number(val);
  v = Math.min(max, Math.max(min, isNaN(v) ? 0 : v));
  return Number(v.toFixed(decimalScale));
};

const generateNumberRegex = (
    min: number,
    max: number,
    allowDecimal: boolean,
): RegExp => {
  const floatRegexStr = "(\\.[0-9]*)?";
  const negativeIntRegexStr = "-[0-9]*";
  const positiveIntRegexStr = "[0-9]+";
  const positiveOrNegativeIntRegexStr = "-?[0-9]*";

  let regexStr = "^";
  if (max < 0) regexStr += negativeIntRegexStr;
  else if (min > 0) regexStr += positiveIntRegexStr;
  else regexStr += positiveOrNegativeIntRegexStr;
  if (allowDecimal) regexStr += floatRegexStr;
  regexStr += "$";
  return new RegExp(regexStr);
};

const getFormControlProps = (props: any) => {
  return {
    color: props.color,
    disabled: props.disabled,
    error: props.error,
    fullWidth: props.fullWidth,
    required: props.required,
    variant: props.variant,
  };
};
