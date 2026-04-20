import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-select.component.html',
  styleUrl: './custom-select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectComponent),
      multi: true,
    },
  ],
})
export class CustomSelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder = 'Select an option';
  @Input() disabled = false;

  isOpen = false;
  value = '';

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get selectedLabel(): string {
    return this.options.find((option) => option.value === this.value)?.label ?? this.placeholder;
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleDropdown(): void {
    if (this.disabled) {
      return;
    }

    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.onTouched();
    }
  }

  selectOption(value: string): void {
    this.value = value;
    this.isOpen = false;
    this.onChange(value);
    this.onTouched();
  }

  @HostListener('document:click')
  closeDropdown(): void {
    if (this.isOpen) {
      this.isOpen = false;
      this.onTouched();
    }
  }
}
