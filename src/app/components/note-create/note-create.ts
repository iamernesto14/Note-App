import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoteService } from '../../services/note';
import { ToasterService } from '../../services/toaster';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../models/note.interface';

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
  @Input() isEditMode: boolean = false;
  @Input() noteToEdit: Note | null = null;
  @Output() saveNote = new EventEmitter<{ title: string; content: string; tags: string[] }>();
  @Output() updateNote = new EventEmitter<{ id: string; title: string; content: string; tags: string[] }>();
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

  ngOnChanges() {
    if (this.isEditMode && this.noteToEdit) {
      this.noteForm.patchValue({
        title: this.noteToEdit.title,
        content: this.noteToEdit.content,
        tags: [...this.noteToEdit.tags]
      });
    }
  }

  addTag() {
    const trimmedTag = this.tagInput.trim();
    if (trimmedTag && !this.noteForm.get('tags')?.value.includes(trimmedTag)) {
      const tags = [...this.noteForm.get('tags')?.value, trimmedTag];
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
      const noteData = {
        title: this.noteForm.value.title,
        content: this.noteForm.value.content,
        tags: this.noteForm.value.tags || []
      };
      if (this.isEditMode && this.noteToEdit) {
        this.updateNote.emit({ id: this.noteToEdit.id, ...noteData });
      } else {
        this.saveNote.emit(noteData);
      }
      this.formError = null;
      this.noteForm.reset({ tags: [] });
      this.tagInput = '';
      if (!this.isEditMode) {
        this.toasterService.showToast('Note created successfully!', 'success');
      }
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