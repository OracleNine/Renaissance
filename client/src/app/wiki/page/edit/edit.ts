import { Component, signal } from '@angular/core'
import {
  DomternalEditorComponent,
  DomternalToolbarComponent,
  DomternalBubbleMenuComponent,
} from '@domternal/angular'
import { Editor, StarterKit, BubbleMenu } from '@domternal/core'

@Component({
  selector: 'app-edit',
  imports: [DomternalEditorComponent, DomternalToolbarComponent, DomternalBubbleMenuComponent],
  templateUrl: './edit.html',
})
export class Edit {
  editor = signal<Editor | null>(null)
  extensions = [StarterKit, BubbleMenu]
  content = '<p>Hello from Angular!</p>'
}