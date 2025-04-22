import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numberOnly]',
 })
export class NumberOnlyDirective {
  
  constructor(private el: ElementRef) { }
  
  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const initialValue = this.el.nativeElement.value;
    // Replace any non-digit character with an empty string
    this.el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    
    // If the value was changed, dispatch an input event
    if (initialValue !== this.el.nativeElement.value) {
      event.stopPropagation();
      this.el.nativeElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
  
  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    // Allow only numbers (0-9)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    
    // Filter out non-numeric characters
    const filteredText = pastedText.replace(/[^0-9]/g, '');
    
    // Insert the filtered text at cursor position
    document.execCommand('insertText', false, filteredText);
  }
}