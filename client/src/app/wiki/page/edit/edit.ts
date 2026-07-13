import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-editor',
  standalone: true,
  template: `<div #editor></div>`
})
export class Edit implements AfterViewInit {

  @ViewChild('editor', { static: true })
  editor!: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const { EditorState } = await import('@codemirror/state');
    const { EditorView } = await import('@codemirror/view');
    const { basicSetup } = await import('codemirror');

    const state = EditorState.create({
      doc: '',
      extensions: [basicSetup]
    });

    new EditorView({
      state,
      parent: this.editor.nativeElement
    });
  }
}