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
import { AuthGuard } from './guards/auth-guard';
import { ForgetPassword } from './components/forget-password/forget-password';


export const routes: Routes = [
  { path: '', component: Home }, 
  { path: 'login', component: Login }, 
  { path: 'signup', component: SignUp },
  {path: 'forget', component: ForgetPassword },
  { path: 'notes', component: NotesDashboard, canActivate: [AuthGuard] }, 
  { path: 'archived', component: ArchivedNotes, canActivate: [AuthGuard] },
  { path: 'notes/:id', component: NoteDetails, canActivate: [AuthGuard] }, 
  { path: 'deleted', component: DeletedNotes, canActivate: [AuthGuard] }, 
  { path: 'settings', component: ProfileSettings, canActivate: [AuthGuard] }, 
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];