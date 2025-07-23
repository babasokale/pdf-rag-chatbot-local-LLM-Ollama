import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) { }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  openFileDialog() {
    this.fileInput.nativeElement.click();
  }

  upload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    this.http.post('http://127.0.0.1:8000/upload', formData).subscribe({
      next: (res: any) => this.snackbar.open(res.message, 'Close', { duration: 3000 }),
      error: () => this.snackbar.open('Upload failed', 'Close', { duration: 3000 }),
    });
  }
}
