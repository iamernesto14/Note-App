import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../services/note';
import { ToasterService } from '../../services/toaster';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './note-create.html',
  styleUrls: ['./note-create.scss']
})
export class NoteCreate {
  noteForm: FormGroup;
  formError: string | null = null;
  tagInput: string = '';
  @Output() saveNote = new EventEmitter<{ title: string; content: string; tags: string[] }>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private toasterService: ToasterService
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: [[]]
    });
  }

  addTag() {
    if (this.tagInput.trim()) {
      const tags = [...this.noteForm.get('tags')?.value, this.tagInput.trim()];
      this.noteForm.get('tags')?.setValue(tags);
      this.tagInput = '';
    }
  }

  removeTag(index: number) {
    const tags = this.noteForm.get('tags')?.value.filter((_: string, i: number) => i !== index);
    this.noteForm.get('tags')?.setValue(tags);
  }

  onSubmit() {
    if (this.noteForm.valid) {
      const newNote = {
        title: this.noteForm.value.title,
        content: this.noteForm.value.content,
        tags: this.noteForm.value.tags || []
      };
      this.saveNote.emit(newNote);
      this.formError = null;
      this.noteForm.reset({ tags: [] });
      this.tagInput = '';
      this.toasterService.showToast('Note created successfully!', 'success');
    } else {
      this.formError = 'Please fill out all required fields';
    }
  }

  onCancel() {
    this.noteForm.reset({ tags: [] });
    this.tagInput = '';
    this.formError = null;
    this.cancel.emit();
  }
}