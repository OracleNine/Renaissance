import { Component, inject, signal } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import {
  DomternalEditorComponent,
  DomternalToolbarComponent,
  DomternalBubbleMenuComponent,
} from '@domternal/angular'
import { Editor, StarterKit, BubbleMenu } from '@domternal/core'
import { Markdown } from '@domternal/extension-markdown';

@Component({
  selector: 'app-edit',
  imports: [DomternalEditorComponent, DomternalToolbarComponent, DomternalBubbleMenuComponent],
  templateUrl: './edit.html',
})
export class Edit {
  protected route = inject(ActivatedRoute)
  editor = signal<Editor | null>(null)
  extensions = [StarterKit, BubbleMenu, Markdown]
  content = '# Hello from Angular!'

  ngOnInit() {
    this.route.data.subscribe((response: any) => {
      if (response.page) {
        this.editor()?.commands.setMarkdownContent('# Testing 123')
      }
    })
  }
}