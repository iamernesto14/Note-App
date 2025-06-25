import { Routes } from '@angular/router';
   import { Home } from './components/home/home';
   import { Login } from './components/login/login';
   import { SignUp } from './components/signup/signup';
   import { NotesDashboard } from './components/notes-dashboard/notes-dashboard';
   import { ArchivedNotes } from './components/archived-notes/archived-notes';
   import { NoteDetails } from './components/note-details/note-details';
   import { NoteCreate } from './components/note-create/note-create';
   import { DeletedNotes } from './components/deleted-notes/deleted-notes';
import { ProfileSettings } from './components/profile-settings/profile-settings';

   export const routes: Routes = [
     { path: '', component: Home },
     { path: 'login', component: Login },
     { path: 'signup', component: SignUp },
     { path: 'notes', component: NotesDashboard },
     { path: 'archived', component: ArchivedNotes },
     { path: 'notes/:id', component: NoteDetails },
       { path: 'deleted', component: DeletedNotes },
     {path: 'settings', component: ProfileSettings},
     { path: '**', redirectTo: '', pathMatch: 'full' },
     
   ];