import { Component } from '@angular/core';
import { UploadComponent } from './upload/upload.component';
import { ChatComponent } from './chat/chat.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UploadComponent, ChatComponent],
  template: `
    <h1>📄 PDF RAG Chatbot</h1>
    <app-upload></app-upload>
    <hr />
    <app-chat></app-chat>
  `,
})
export class AppComponent {}
