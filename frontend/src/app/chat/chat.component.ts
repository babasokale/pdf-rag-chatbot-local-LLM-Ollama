import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  question = '';
  answer = '';
  loading = false;

  constructor(private http: HttpClient) {}

  ask() {
    if (!this.question.trim()) return;
    this.loading = true;
    this.answer = '';

    this.http
      .post<any>('http://127.0.0.1:8000/ask', { question: this.question })
      .subscribe({
        next: (res) => {
          this.answer = res.answer?.result || 'No response available.';
          this.loading = false;
        },
        error: () => {
          this.answer = 'Something went wrong.';
          this.loading = false;
        },
      });
  }
}
