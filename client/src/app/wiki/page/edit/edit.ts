import { Component, inject, signal } from '@angular/core'
import { MatButton } from '@angular/material/button';
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
  imports: [DomternalEditorComponent, DomternalToolbarComponent, DomternalBubbleMenuComponent, MatButton],
  templateUrl: './edit.html',
})
export class Edit {
  protected route = inject(ActivatedRoute)
  editor = signal<Editor | null>(null)
  extensions = [StarterKit, BubbleMenu, Markdown]

  onEditorCreated(editor: Editor) {
    this.editor.set(editor);

    this.route.data.subscribe((response: any) => {
      if (response.page) {
        editor.commands.setMarkdownContent(response.page.content);
      }
    })
  }
}